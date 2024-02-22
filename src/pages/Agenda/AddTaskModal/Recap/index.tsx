import React, { FC } from "react";
import styles from "./Recap.module.scss";
import dayjs from "dayjs";

type RecapProps = {
  title: string;
  eventTitle: string;
  date: string;
  startTime: string;
};

const Recap: FC<RecapProps> = ({
  title,
  eventTitle,
  date,
  startTime,
}) => {
  return (
    <div className={styles["recap-container"]}>
      <h2 className={styles["recap-title"]}>{title}</h2>
      <div className={styles["recap-event-container"]}>
        <div className={styles["bar"]}></div>
        <div className={styles["recap-content"]}>
          <h3 className={styles["recap-event-title"]}>{eventTitle}</h3>
          <div className={styles["recap-time"]}>
            <div>
              Pour le{" "}
              <strong>{dayjs(date.toString()).format("dddd DD MMMM")}</strong>
            </div>
            <div>
              À <strong>{dayjs(startTime).format("HH:mm")}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recap;
