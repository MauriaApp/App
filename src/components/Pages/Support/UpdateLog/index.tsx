import React, { FC } from "react";
import styles from "./UpdateLog.module.scss";
import clsx from "clsx";

type UpdateProps = {
  version: string;
  date: string;
  titleVisu: string;
  contentVisu: string;
  titleDev: string;
  contentDev: string;
};

const UpdateLog: FC<UpdateProps> = (props) => {
  return (
    <article className={clsx("card glassy shadow", styles["container"])}>
      <header>
        <span className={styles["date"]}>{props.date}</span>
        <span className={clsx("text-accent", styles["version"])}>
          {props.version}
        </span>
      </header>

      <section>
        <h3 className={"cardTitle text-primary"}>{props.titleVisu}</h3>
        <p className={"text"}>- {props.contentVisu}</p>
      </section>
      <section>
        <h3 className={"cardTitle text-primary"}>{props.titleDev}</h3>
        <p className={"text"}>- {props.contentDev}</p>
      </section>
    </article>
  );
};

export default UpdateLog;
