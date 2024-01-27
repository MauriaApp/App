import styles from "./ModifyTaskModal.module.scss" ;
import modalStyles from "../../../components/common/Layout/Modal/modal.module.scss";
import clsx from "clsx";
import Button from "../../../components/common/Layout/Button/Button";
import { useContext } from "react";
import { ModalContext, ModalContextType } from "../../../contexts/modalContext";
import { DateTimeFormatOptions } from "intl";


const ModifyTaskModalContent = ({
  setUserTasks,
  ...task
}: any) => {
  const { closeModal } = useContext(ModalContext) as ModalContextType;

  const id = task.id
  const title = task.title

  const options: DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  const date = new Date(task.start);
  const start = date.toLocaleDateString('fr-FR', options);

  const currentTask: any = {
    id: id,
    title: title,
    start: start
  }


  function deleteUserEvent(task: any) {
    return () => {
      const userTasks = JSON.parse(localStorage.getItem("userTasks") || "[]");
      const taskId = parseInt(String(task.id));

      const updatedTasks = userTasks.filter((e: any) => e.id !== taskId);
      localStorage.setItem("userTasks", JSON.stringify(updatedTasks));


      closeModal();
    };
  }




  return (
    <>
      <header
        className={clsx(modalStyles["headerModal"], modalStyles["column"])}
      >
        <h2 className={"sectionTitle text-primary no-margins"}>
          {currentTask.teacher}

        </h2>
        <span className={styles["date"]}> {currentTask.start} </span>
      </header>
      <div className={modalStyles["content"]}>
        <section>
          <h3 className={clsx(styles["note"], "no-margins text-accent")}>
            {currentTask.title}
          </h3>

        </section>


          <section className={styles["section"]}>
            <Button variant={"accent"} onClick={deleteUserEvent(currentTask)} disabled={title.length === 0}>
              Supprimer
            </Button>
          </section>




      </div>

      <footer className={styles["footer"]}>
        <span className={styles["code"]}>ID: {id}</span>
      </footer>
    </>
  );
};

export default ModifyTaskModalContent;
