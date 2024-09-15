import { AurionEventType, MauriaEventType } from "../types/event";
import moment from "moment-timezone";

const TODAYDATE : Date = new Date();

// POUR TESTER ONLY
// const TODAYDATE : Date = new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000);

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
  const todayDate = TODAYDATE

  return (
    eventDate.getDate() === todayDate.getDate() &&
    eventDate.getMonth() === todayDate.getMonth() &&
    eventDate.getFullYear() === todayDate.getFullYear()
  );
};

const isTomorrow = (date: Date) => {
  const tomorrow = new Date(TODAYDATE.getTime() + 1 * 24 * 60 * 60 * 1000);
  const day = new Date(date);

  return (
    day.getDate() === tomorrow.getDate() &&
    day.getMonth() === tomorrow.getMonth() &&
    day.getFullYear() === tomorrow.getFullYear()
  );
};

export const isInInterval = (start: Date, end: Date) => {
  const currentTime = TODAYDATE.getTime();

  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();

  return startTime <= currentTime && currentTime <= endTime;
};

export const fetchLivePlanning = (): { planning: MauriaEventType[], isTomorrow: boolean } => {
  let data = JSON.parse(localStorage.getItem("planning") || "[]");

  const currentTime = TODAYDATE.getTime();
  let isTomorrowPlanning = true;

  let livePlanning = data
    .filter((event: any) => {
      const endTime = new Date(event.end).getTime();

      return isToday(event.end) && currentTime <= endTime;
    })
    .map((event: any) => {
      const newEvent = fetchEvent(event);

      newEvent.start = moment(newEvent.start).tz('Europe/Paris').format('HH:mm');
      newEvent.end = moment(newEvent.end).tz('Europe/Paris').format('HH:mm');     

      return newEvent;
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

  const currentTime = TODAYDATE.getTime();

  return data
    .filter((event: any) => {
      const endTime = new Date(event.end).getTime();

      return isTomorrow(event.end) && currentTime <= endTime;
    })
    .map((event: any) => {
      const newEvent = fetchEvent(event);

      newEvent.start = moment(newEvent.start).tz('Europe/Paris').format('HH:mm');
      newEvent.end = moment(newEvent.end).tz('Europe/Paris').format('HH:mm');     

      return newEvent;
    });
};


export const fetchEvent = (event: AurionEventType): MauriaEventType => {

  // Diviser tout le titre sur les sauts de ligne simples "\n"
  const data = event.title.split("\n").filter(Boolean); // On retire les éléments vides

  const salle = data.length > 0 ? data[0] : "Salle inconnue";   // Première ligne : la salle
  const teacher = data.length > 1 ? data[data.length - 1] : "Professeur inconnu";  // Dernière ligne : le professeur
  const title = data.length > 2 ? data.slice(1, data.length - 2).join(" ") : "Titre inconnu";  // Tout ce qui est entre la salle et le prof

  const isCurrent = isInInterval(event.start, event.end);

  const startTime = event.start;
  const endTime = event.end;

  const cours = Object.assign({
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
