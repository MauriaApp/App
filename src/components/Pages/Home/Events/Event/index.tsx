import React, { useContext } from "react";

import styles from "./Event.module.scss";
import clsx from "clsx";
import { DateTimeFormatOptions } from 'intl';
import EventModalContent from "./EventModalContent";
import { ModalContext, ModalContextType } from "../../../../../contexts/modalContext";


type EventProps = {
  id: number;
  title: string;
  description: string;
  start: string;
  end: string;
  duration: string;
  location: string;
  image: string;
};

const options: DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };


const Event: React.FC<EventProps> = (props) => {

  const { openModal } = useContext(ModalContext) as ModalContextType;


  const showEventModal = (props : EventProps) => {
    openModal(<EventModalContent event={props} />);
  };
  const startDateTime = new Date(props.start);
  startDateTime.setHours(startDateTime.getHours() - 1);
  const formattedStart = startDateTime.toLocaleDateString('fr-FR', options);

  return (
    <article
      key={props.id}
      className={clsx(
        "card shadow animateApparition glassy",
        styles["event"]
      )}
      onClick={() => showEventModal(props)}
    >
      <div className={styles["inner"]}>
        <div className={styles["content"]}>
          <h2 className={clsx("text-primary", styles["title"])}>
            {props.title}
          </h2>
          <h3 className={styles["infos"]}>
            <span className={styles["time"]}>
              {
                formattedStart}
            </span>
            <div className={styles["separator"]} />
            <span className={clsx("text-accent", styles["room"])}>
              {props.location}
            </span>{" "}
          </h3>

          <h4 className={styles["teacher"]}>
            Clique pour plus d'info !
          </h4>
        </div>
      </div>
    </article>
  );
};

export default Event;
