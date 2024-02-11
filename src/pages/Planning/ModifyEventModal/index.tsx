import styles from "./ModifyEventModal.module.scss";
import { AurionEventType, MauriaEventType } from "../../../types/event";
import modalStyles from "../../../components/common/Layout/Modal/modal.module.scss";
import clsx from "clsx";
import { fetchEvent } from "../../../utils/calendar";
import Button from "../../../components/common/Layout/Button/Button";
import { useContext } from "react";
import { ModalContext, ModalContextType } from "../../../contexts/modalContext";

const ModifyEventModalContent = ({ setUserEvents, ...event }: any) => {
  const { closeModal } = useContext(ModalContext) as ModalContextType;

  const id = event._def.publicId;
  const title = event._def.title;
  const start = event._instance.range.start;
  const end = event._instance.range.end;
  const allDay = event._def.allDay;
  const className = event._def.ui.classNames[0];
  const editable = event._def.ui.editable;

  const currentEvent: AurionEventType = {
    id,
    title,
    start,
    end,
    allDay,
    className,
    editable,
  };

  const newCurrentEvent = fetchEvent(currentEvent)


  function deleteUserEvent(event: MauriaEventType) {
    return () => {
      const userEvents = JSON.parse(localStorage.getItem("userEvents") || "[]");
      const eventId = parseInt(String(event.id));

      const updatedEvents = userEvents.filter((e: any) => e.id !== eventId);
      localStorage.setItem("userEvents", JSON.stringify(updatedEvents));

      // Mettez à jour l'état local des userEvents
      setUserEvents(updatedEvents);

      closeModal();
    };
  }

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
      <div className={modalStyles["content"]}>
        {newCurrentEvent.type === "est-perso" && (
          <Button
            variant={"accent"}
            onClick={deleteUserEvent(newCurrentEvent)}
            disabled={newCurrentEvent.title.length === 0}
          >
            Supprimer
          </Button>
        )}
      </div>

      <footer className={clsx(styles["footer"], styles["code"])}>
        <h3 className={styles["rawDataTitle"]}>Données brutes:</h3>
        <p className={"no-margins"}>{event._def.title}</p>
      </footer>
    </>
  );
};

export default ModifyEventModalContent;
