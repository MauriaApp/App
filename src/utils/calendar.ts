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
  const data = event.title.split("\n\n");

  const isCurrent = isInInterval(event.start, event.end);

  const startTime = event.start;
  const endTime = event.end;

  // const title = data[2] ? (data[2].length > 0 ? data[2] : data[1]) : data[1];
  const salle = data[0];
  const reste = data[1].split("\n");

  const title = reste[0];
  const teacher = reste[reste.length - 1];

  const cours =  Object.assign({
    id: event.id,
    isCurrent,
    data: event,
    title: title,
    type: event.className,
    room: salle,
    teacher: teacher,
    start: startTime,
    end: endTime,
  });

  return cours;
};
