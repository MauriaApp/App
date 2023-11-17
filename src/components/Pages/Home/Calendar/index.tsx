import React, { useMemo } from "react";
import EventComponent from "./Event";

import { MauriaEventType } from "../../../../types/event";

type CalendarProps = {
  className?: string;
  events: MauriaEventType[];
};

const HomeCalendar: React.FC<CalendarProps> = (props) => {
  const futureEvents = useMemo(
    () => props.events.filter((event) => !event.isCurrent),
    [props.events]
  );

  if (props.events.length === 0) {
    return (
      <div className={"no-content-container"}>
        <span className={"no-content-text"}>
          Aucun cours à venir pour le moment
        </span>
      </div>
    );
  }

  return (
    <section className={"list"}>
      {futureEvents.map((event: MauriaEventType, index) => {
        return (
          <EventComponent
            key={event.id}
            index={index + 1}
            id={event.id}
            data={JSON.stringify(event.data)}
            type={event.type}
            title={event.title}
            startTime={event.start}
            endTime={event.end}
            teacher={event.teacher}
            room={event.room}
          />
        );
      })}
    </section>
  );
};

export default HomeCalendar;
