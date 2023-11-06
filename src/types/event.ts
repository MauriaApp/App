export type AurionEventType = {
  id: number;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  className: string;
  editable: boolean;
};

export type MauriaEventType = {
  id: number;
  data: AurionEventType;
  isCurrent?: boolean;
  title: string;
  type: string;
  start: string;
  end: string;
  teacher: string;
  room: string;
  allDay: boolean;
  className: string;
};
