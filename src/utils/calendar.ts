import { AurionEventType, MauriaEventType } from "../types/event";

export const getRoom = (event: AurionEventType): string => {
  return event.title.split("\n\n")[0];
};

export const getName = (event: AurionEventType): string => {
  return event.className;
};

export const formatTime = (time: Date): string => {
  return time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const isToday = (date: Date) => {
  const eventDate = new Date(date);
  const todayDate = new Date();

  return (
    eventDate.getDate() === todayDate.getDate() &&
    eventDate.getMonth() === todayDate.getMonth() &&
    eventDate.getFullYear() === todayDate.getFullYear()
  );
};
const isTomorrow = (date: Date) => {
  const tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  const day = new Date(date);

  return (
    day.getDate() === tomorrow.getDate() &&
    day.getMonth() === tomorrow.getMonth() &&
    day.getFullYear() === tomorrow.getFullYear()
  );
};

export const isInInterval = (start: Date, end: Date) => {
  const currentTime = new Date().getTime();

  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();

  return startTime <= currentTime && currentTime <= endTime;
};

export const fetchLivePlanning = (): { planning: MauriaEventType[], isTomorrow: boolean } => {
  let data = JSON.parse(localStorage.getItem("planning") || "[]");

  const currentTime = new Date().getTime();
  let isTomorrowPlanning = true;

  let livePlanning = data
    .filter((event: any) => {
      const endTime = new Date(event.end).getTime();

      return isToday(event.end) && currentTime <= endTime;
    })
    .map((event: any) => {
      const data = event.title.split("\n");

      const isCurrent = isInInterval(event.start, event.end);

      const startTime = new Date(event.start);
      const endTime = new Date(event.end);

      return Object.assign({
        id: parseInt(event.id),
        isCurrent,
        data: event,
        title: data[2],
        type: event.className,
        room: data[0],
        teacher: data[5],
        start: `${("0" + startTime.getHours()).slice(-2)}:${(
          "0" + startTime.getMinutes()
        ).slice(-2)}`,
        end: `${("0" + endTime.getHours()).slice(-2)}:${(
          "0" + endTime.getMinutes()
        ).slice(-2)}`,
      });
    });

  // console.log(livePlanning);

  localStorage.setItem("livePlanning", JSON.stringify(livePlanning));

  if (livePlanning.length > 0) {
    if (isTomorrow(livePlanning[0].data.end)) {
      return { planning: livePlanning, isTomorrow: isTomorrowPlanning };
    }
    isTomorrowPlanning = false;
    return { planning: livePlanning, isTomorrow: isTomorrowPlanning };
  }

  if (livePlanning.length === 0) {
    livePlanning = fetchTomorrowLessons();
    isTomorrowPlanning = true;
  }

  return { planning: livePlanning, isTomorrow: isTomorrowPlanning };
};

export const fetchTomorrowLessons = (): MauriaEventType[] => {
  let data = JSON.parse(localStorage.getItem("planning") || "[]");

  const currentTime = new Date().getTime();

  return data
    .filter((event: any) => {
      const endTime = new Date(event.end).getTime();

      return isTomorrow(event.end) && currentTime <= endTime;
    })
    .map((event: any) => {
      const data = event.title.split("\n");

      const startTime = new Date(event.start);
      const endTime = new Date(event.end);

      return Object.assign({
        id: parseInt(event.id),
        isCurrent: false,
        data: event,
        title: data[2],
        type: event.className,
        room: data[0],
        teacher: data[5],
        start: `${("0" + (startTime.getHours())).slice(-2)}:${(
          "0" + startTime.getMinutes()
        ).slice(-2)}`,
        end: `${("0" + (endTime.getHours())).slice(-2)}:${(
          "0" + endTime.getMinutes()
        ).slice(-2)}`,
      });
    });
};


export const fetchEvent = (event: AurionEventType): MauriaEventType => {
  // Exemple d'event :
  // {
  //   id: "67476251",
  //   title: "IC2 C406 - Salle Prépa OZANAM - VidéoProj\n\nMathématiques - 1er  semestre\nCOURS_TD\nMonsieur LUQUET",
  //       OU "\nInterrogation en C854\nMathématiques - 1er  semestre\nDS_SURV\n "
  //       OU "Je suis un test\n 14:15:00 - 14:45:00"
  //   start: "10:10",
  //   end: "12:00",
  //   allDay: false,
  //   className: "COURS_TD",
  //           OU "est_epreuve"
  //           OU "est_perso"
  //   editable: undefined
  // }
  
  const isCurrent = isInInterval(event.start, event.end);
  const startTime = event.start;
  const endTime = event.end;

  let salle = "";
  let title = "";
  let teacher = "";

  // SI C'EST UNE EPREUVE --------------------------------------------------------------------------------------------------------------------
  if (event.className === "est-epreuve") {
    const data = strip(event.title).split("\n");  // ["\nInterrogation en C854", "Mathématiques - 1er  semestre", "DS_SURV", " "]

    const reste = data[0].split(" en ");          // ["Interrogation", "C854"]
    salle = "Salle " + reste[1];                  // Salle C854
    title = data[1] + " - " + reste[0];           // Mathématiques - 1er  semestre - Interrogation
  
  // SI C'EST UN EVENEMENT PERSO -------------------------------------------------------------------------------------------------------------
  } else if (event.className === "est-perso") {
    title = event.title.split("\n")[0]; // "Je suis un test"
  
  // AUTRE (COURS, TD, ATERLIERS) ------------------------------------------------------------------------------------------------------------
  } else {
    const data = event.title.split("\n\n"); // ["Salle Prépa OZANAM - VidéoProj", "Mathématiques - 1er  semestre\nCOURS_TD\nMonsieur LUQUET"]

    salle = data[0];                        // "Salle Prépa OZANAM - VidéoProj"
    const reste = data[1].split("\n");      // ["Mathématiques - 1er  semestre", "COURS_TD", "Monsieur LUQUET"]

    title = reste[0];                       // "Mathématiques - 1er  semestre"
    teacher = reste[reste.length - 1];      // "Monsieur LUQUET"
  }

  const cours =  Object.assign({
    id: event.id,
    isCurrent,
    data: event,
    title: title,
    type: formatClassName(event.className),
    room: salle,
    teacher: teacher,
    start: startTime,
    end: endTime,
  });

  return cours;
};

function formatClassName(input: string): string {
  return input
  .replace("COURS_TD", "Cours / TD")
  .replace("ATELIER", "Atelier");
}

function strip(input: string): string {
  return input.replace(/^\s+|\s+$/g, "");
}
