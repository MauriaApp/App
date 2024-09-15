import { FC } from "react";
import styles from "./statsModal.module.scss";
import { MauriaNoteType } from "../../../types/note";
import modalStyles from "../../../components/common/Layout/Modal/modal.module.scss";
import clsx from "clsx";

type StatsModalProps = {
  exam: MauriaNoteType;
};

const StatsModalContent: FC<StatsModalProps> = ({
  exam,
}) => {

  return (
    <>
      <header
        className={clsx(modalStyles["headerModal"], modalStyles["column"])}
      >
        <h2 className={"sectionTitle text-primary no-margins"}>
          {exam.epreuve}
        </h2>
        <span className={styles["date"]}>{exam.date}</span>
      </header>
      <div className={modalStyles["content"]}>
        <section>
          <h3 className={clsx(styles["note"], "no-margins text-accent")}>
            {exam.note}
          </h3>
          <span className={styles["coefficient"]}>
            Coeff : {exam.coefficient}
          </span>
          <br></br>
          {exam.commentaire ? (
            <span className={styles["coefficient"]}>Commentaire : {exam.commentaire}</span>
          ) : (
            <></>
          )}
        </section>

        <section>
          <h3 className={"sectionTitle text-primary"}>Statistiques :</h3>
              <>
                <p className={styles["disclaimer"]}>
                  Ces statistiques proviennent d'Aurion
                </p>
                <ul className={styles["stats"]}>
                  <li>
                    <span className={styles["label"]}>Moyenne</span>
                    <span className={styles["value"]}>{exam.moyenne ? exam.moyenne : ""}</span>
                  </li>
                  <li>
                    <span className={styles["label"]}>Médiane</span>
                    <span className={styles["value"]}>{exam.mediane ? exam.mediane : ""}</span>
                  </li>
                  <li>
                    <span className={styles["label"]}>Écart-type</span>
                    <span className={styles["value"]}>
                      {exam.ecartType ? exam.ecartType : ""}
                    </span>
                  </li>
                  <li>
                    <span className={styles["label"]}>Minimum</span>
                    <span className={styles["value"]}>{exam.min ? exam.min : ""}</span>
                  </li>
                  <li>
                    <span className={styles["label"]}>Maximum</span>
                    <span className={styles["value"]}>{exam.max ? exam.max : ""}</span>
                  </li>
                </ul>
              </>
        </section>
      </div>

      <footer className={styles["footer"]}>
        <span className={styles["code"]}>{exam.code}</span>
      </footer>
    </>
  );
};

export default StatsModalContent;
