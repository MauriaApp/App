import React from "react";
import styles from "./Stats.module.scss";
import clsx from "clsx";

type StatsProps = {
  total: string;
  justified: string;
  unjustified: string;
};

const Stats: React.FC<StatsProps> = (props) => {
  return (
    <div className={`${styles["container"]} card glassy shadow`}>
      <div className={styles["top-row"]}>
        <div>
          <span className={clsx("text-primary", styles["total"])}>
            {props.total}
          </span>
          <span className={styles["label"]}>Total</span>
        </div>
      </div>
      <div className={styles["row-separator"]} />
      <div className={styles["bottom-row"]}>
        <div>
          <span className={clsx("text-success", styles["justified"])}>
            {props.justified}
          </span>
          <span className={styles["label"]}>Justifiées</span>
        </div>
        <div className={styles["separator"]}></div>
        <div>
          <span className={clsx("text-accent", styles["unjustified"])}>
            {props.unjustified}
          </span>
          <span className={styles["label"]}>Non-justifiées</span>
        </div>
      </div>
    </div>
  );
};

export default Stats;
