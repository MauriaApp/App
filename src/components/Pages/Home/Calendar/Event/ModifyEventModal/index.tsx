import styles from "./ModifyEventModal.module.scss";
import modalStyles from "../../../../../common/Layout/Modal/modal.module.scss";
import clsx from "clsx";
import { fetchEvent } from "../../../../../../utils/calendar";


type EventProps = {
  id: number;
  index?: number;
  className?: string;
  isCurrent?: boolean;
  data: any;
  title: string;
  room: string;
  teacher: string;
  startTime: string;
  endTime: string;
  type: string;
};

const ModifyEventModalContent = ({ ...event }: EventProps) => {

  // console.log(event);
  

  const id = event.id;
  const title = JSON.parse(event.data).title;
  const start = event.startTime
  const end = event.endTime
  const allDay = false; // event._def.allDay;
  const className = event.className || "";
  const editable = false; // event._def.ui.editable;

  const currentEvent: any = {
    id,
    title,
    start,
    end,
    allDay,
    className,
    editable,
  };

  const newCurrentEvent = fetchEvent(currentEvent)

  return (
    <>
      <header
        className={clsx(modalStyles["headerModal"], modalStyles["column"])}
      >
        <h2 className={clsx("sectionTitle no-margins text-primary")}>
          {newCurrentEvent.title}
        </h2>

        <div className={clsx(styles["eventMainInfos"], "text-primary")}>
          <span className={clsx(styles["room"], "text-accent")}>
            {newCurrentEvent.room}
          </span>

          <div className={clsx(styles["date"], "text-primary")}>
            De {newCurrentEvent.start} à {newCurrentEvent.end}{" "}
          </div>
        </div>
      </header>
      <span className={styles["date"]}>
        {newCurrentEvent.type} avec {newCurrentEvent.teacher || "Professeur non renseigné"}
      </span>

      <footer className={clsx(styles["footer"], styles["code"])}>
        <h3 className={styles["rawDataTitle"]}>Données brutes:</h3>
        <p className={"no-margins"}>{currentEvent.title}</p>
      </footer>
    </>
  );
};

export default ModifyEventModalContent;
