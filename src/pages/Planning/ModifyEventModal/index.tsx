import styles from "./ModifyEventModal.module.scss";
import { AurionEventType, MauriaEventType } from "../../../types/event";
import modalStyles from "../../../components/common/Layout/Modal/modal.module.scss";
import clsx from "clsx";
import { fetchEvent } from "../../../utils/calendar";
import Button from "../../../components/common/Layout/Button/Button";
import { useContext } from "react";
import { ModalContext, ModalContextType } from "../../../contexts/modalContext";

const ModifyEventModalContent = ({
  setUserEvents,
  ...event
}: any) => {
  const { closeModal } = useContext(ModalContext) as ModalContextType;

  const id = event._def.publicId
  const title = event._def.title
  const start = event._instance.range.start
  const end = event._instance.range.end
  const allDay = event._def.allDay
  const className = event._def.ui.classNames[0]
  const editable = event._def.ui.editable

  const currentEvent: AurionEventType = {
    id: id,
    title: title,
    start: start,
    end: end,
    allDay: allDay,
    className: className,
    editable: editable
  }

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
        <h3 className={clsx(styles["note"], "no-margins text-accent")}>
          {newCurrentEvent.type}
          {" - "}
          {newCurrentEvent.title}
        </h3>

        <span className={styles["date"]}>De {newCurrentEvent.start} à {newCurrentEvent.end}</span>
      </header>
      <div className={modalStyles["content"]}>
        <section>
          <h2 className={"sectionTitle text-primary no-margins"}>
          <span className={styles["date"]}>En salle </span>
            {newCurrentEvent.room}
          </h2>

          <div style={{marginTop: "20px"}}>
            <h2 className={"sectionTitle text-primary no-margins"} >
            <span className={styles["date"]}>Avec </span>
              {newCurrentEvent.teacher}
            </h2>
          </div>

        </section>


        {newCurrentEvent.type === "est-perso" ? (
          <section className={styles["section"]}>
            <Button variant={"accent"} onClick={deleteUserEvent(newCurrentEvent)} disabled={title.length === 0}>
              Supprimer
            </Button>
          </section>
        ) : null}




      </div>

      <footer className={styles["footer"]} >
        <span className={styles["code"]}>Données brutes: <br></br>{event._def.title}</span>
      </footer>
    </>
  );
};

export default ModifyEventModalContent;
