import React from "react";

import styles from "./Event.module.scss";
import clsx from "clsx";

type EventProps = {
  id: number;
  index?: number;
  className?: string;
  isCurrent?: boolean;
  data?: string;
  title: string;
  room: string;
  teacher: string;
  startTime: string;
  endTime: string;
  type: string;
};

const Event: React.FC<EventProps> = (props) => {
  const showDataModal = () => {
    props.data && window.alert(JSON.parse(props.data).title);
  };

  return (
    <article
      key={props.id}
      className={clsx(
        "card shadow animateApparition glassy",
        styles["event"],
        props.isCurrent && styles["current"],
        props.className
      )}
      style={{ animationDelay: `${props.index && props.index * 0.05}s` }}
      onClick={showDataModal}
    >
      <div className={styles["inner"]}>
        {props.isCurrent && <div className={styles["live"]}></div>}
        <div className={styles["content"]}>
          <h2 className={clsx("text-primary", styles["title"])}>
            {props.title}
          </h2>
          <h3 className={styles["infos"]}>
            <span className={styles["time"]}>
              {props.startTime} - {props.endTime}
            </span>
            <div className={styles["separator"]}></div>
            <span className={clsx("text-accent", styles["room"])}>
              {props.room}
            </span>{" "}
          </h3>

          <h4 className={styles["teacher"]}>
            {props.type}{" "}
            {props.teacher && props.teacher !== " " && `avec ${props.teacher}`}
          </h4>
        </div>
      </div>
    </article>
  );
};

export default Event;
