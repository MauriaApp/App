import styles from "./ModifyEventModal.module.scss";
import modalStyles from "../../../../../common/Layout/Modal/modal.module.scss";
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

const ModifyEventModalContent = ({ ...event }: EventProps) => {


  return (
    <>
      <header
        className={clsx(modalStyles["headerModal"], modalStyles["column"])}
      >
        <h2 className={clsx("sectionTitle no-margins text-primary")}>
          {event.title}
        </h2>

        <div className={clsx(styles["eventMainInfos"], "text-primary")}>
          <span className={clsx(styles["room"], "text-accent")}>
            {event.room}
          </span>

          <div className={clsx(styles["date"], "text-primary")}>
            De {event.startTime} à {event.endTime}{" "}
          </div>
        </div>
      </header>
      <span className={styles["date"]}>
        {event.type} avec {event.teacher || "Professeur non renseigné"}
      </span>
      <div className={modalStyles["content"]}>

      </div>
      <footer className={styles["footer"]} >
        <span className={styles["code"]}>Si vous n'êtes pas sûr(e), il y a possiblement plus d'infos dans le planning.<br></br>{}</span>
      </footer>
    </>
  );
};

export default ModifyEventModalContent;
