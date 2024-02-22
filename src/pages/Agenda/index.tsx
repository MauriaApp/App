import Button from "../../components/common/Layout/Button/Button";
import PageTemplate from "../Template";
import styles from "./Agenda.module.scss";
import AddTaskModalContent from "./AddTaskModal";
import { useContext } from "react";
import { ModalContext, ModalContextType } from "../../contexts/modalContext";
import Task from "../../components/Pages/Agenda";

export default function Agenda() {
  const { openModal } = useContext(ModalContext) as ModalContextType;


  const openAddEventModal = () => {
    openModal(<AddTaskModalContent />);
  };

  const AddEventButton = () => (
    <Button
      className={styles["create-event-button"]}
      onClick={openAddEventModal}
      variant={"accent"}
      round={true}
    >
      +
    </Button>
  );


  const data = JSON.parse(localStorage.getItem("userTasks") ?? "[]");


  return (
    <PageTemplate title={"Agenda"} header={<AddEventButton />}>
      <section>
        <div>
          <label className={"label"}>Une notification sera envoyée 24h avant et 1h avant chaque tâche.</label>
        </div>
      </section>

      {data.length > 0 ? (
        <div className={"list"}>
          {data.map((task: any, index: number) => (
            <Task
              key={task.date + index}
              index={index}
              id={task.id}
              title={task.title}
              start={task.start}
            />
          ))}
        </div>
      ) : (
        <div className={"no-content-container"}>
          <span className={"no-content-text"}>
            Aucune tâche n'a été ajoutée
          </span>
        </div>
      )}

    </PageTemplate>
  );
}

