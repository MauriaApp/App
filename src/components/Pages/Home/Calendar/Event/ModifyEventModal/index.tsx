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
        <h3 className={clsx(styles["note"], "no-margins text-accent")}>
          {event.type}
          {" - "}
          {event.title}
        </h3>

        <span className={styles["date"]}>De {event.startTime} à {event.endTime}</span>
      </header>
      <div className={modalStyles["content"]}>
        <section>
          <h2 className={"sectionTitle text-primary no-margins"}>
            <span className={styles["date"]}>En salle </span>
            {event.room}
          </h2>

          <div style={{ marginTop: "20px" }}>
            <h2 className={"sectionTitle text-primary no-margins"} >
              <span className={styles["date"]}>Avec </span>
              {event.teacher}
            </h2>
          </div>

        </section>
      </div>

      <footer className={styles["footer"]} >
        <span className={styles["code"]}>Si vous n'êtes pas sûr(e), il y a possiblement plus d'infos dans le planning.<br></br>{}</span>
      </footer>
    </>
  );
};

export default ModifyEventModalContent;
