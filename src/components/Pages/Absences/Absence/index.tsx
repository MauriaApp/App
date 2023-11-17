import React, { useRef } from "react";

import styles from "./Absence.module.scss";
import { useIntersectionObserver } from "usehooks-ts";

import clsx from "clsx";

type AbsenceProps = {
  index?: number;
  className?: string;
  title: string;
  duration: string;
  interval: string;
  class: string;
  date: string;
};

const Absence: React.FC<AbsenceProps> = (props) => {
  const absenceRef = useRef(null);
  const entry = useIntersectionObserver(absenceRef, {});
  const isVisible = !!entry?.isIntersecting;

  if (props.index!! && props.index < 8) {
    return (
      <article
        ref={absenceRef}
        style={{ animationDelay: `${props.index * 0.05 + 0.05}s` }}
        className={clsx(
          "card shadow",
          isVisible && "glassy",
          !isVisible && "hidden",
          styles["container"],
          styles["animate"]
        )}
      >
        <div className={styles["time-container"]}>
          <h2 className={clsx("text-accent", styles["duration"])}>
            {props.duration.replace(":", "h")}
          </h2>
          <span className={styles["interval"]}>{props.interval}</span>
        </div>
        <div>
          <h3
            className={clsx(
              "text-primary",
              styles["title"],
              props.title.includes(" non ") && "text-accent"
            )}
          >
            {props.title}
          </h3>
          <span className={styles["class"]}>{props.class.split(" -")[0]}</span>
          <span className={styles["date"]}>{props.date}</span>
        </div>
      </article>
    );
  }

  return (
    <article
      ref={absenceRef}
      className={clsx(
        "card shadow",
        isVisible && "glassy",
        !isVisible && "hidden",
        styles["container"]
      )}
    >
      <div className={styles["time-container"]}>
        <h2 className={clsx("text-accent", styles["duration"])}>
          {props.duration.replace(":", "h")}
        </h2>
        <span className={styles["interval"]}>{props.interval}</span>
      </div>
      <div>
        <h3
          className={clsx(
            "text-primary",
            styles["title"],
            props.title.includes(" non ") && "text-accent"
          )}
        >
          {props.title}
        </h3>
        <span className={styles["class"]}>{props.class.split(" -")[0]}</span>
        <span className={styles["date"]}>{props.date}</span>
      </div>
    </article>
  );
};

export default Absence;
