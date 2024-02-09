import React from "react";

import styles from "./Event.module.scss";
import clsx from "clsx";
import { DateTimeFormatOptions } from 'intl';


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
  const showDataModal = () => {

  };

  return (
    <article
      key={props.id}
      className={clsx(
        "card shadow animateApparition glassy",
        styles["event"]
      )}
      onClick={showDataModal}
    >
      <div className={styles["inner"]}>
        <div className={styles["content"]}>
          <h2 className={clsx("text-primary", styles["title"])}>
            {props.title}
          </h2>
          <h3 className={styles["infos"]}>
            <span className={styles["time"]}>
              {new Date(props.start).toLocaleDateString('fr-FR', options)}
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
