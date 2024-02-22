import React from "react";
import styles from "./Events.module.scss";
import clsx from "clsx";
import EventComponent from "./Event";


type EventJuniaProps = {
  events?: any;
  loading?: boolean;
};

const EventJunia: React.FC<EventJuniaProps> = ({ events, loading }) => {
  // events = [];
  if (loading) {
    return (
      <>
        <h2 className={clsx("sectionTitle text-primary", styles["day-title"])} style={{ marginBottom: 0 }}>
          Prochains événements
        </h2>
        <div className="sectionContent">
          <p className=" no-content-text">
            Chargement...
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <h2 className={clsx("sectionTitle text-primary", styles["day-title"])} style={{ marginBottom: 0 }}>
        Prochains événements
      </h2>

      {!events || events.length === 0 ? (
        <div className={"no-content-container"}>
          <span className={"no-content-text"}>
            Aucun événements à venir...
          </span>
        </div>
      ) : (
        <div className="sectionContent">
          {events.map((event: any) => (
            <EventComponent
              id={event.id}
              title={event.title}
              description={event.description}
              start={event.start}
              end={event.end}
              duration={event.duration}
              location={event.location}
              image={event.image}
            />
          ))}
        </div>
      )
      }
    </>
  );
};

export default EventJunia;
