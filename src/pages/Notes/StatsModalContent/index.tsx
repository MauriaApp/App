import React, { FC, useContext } from "react";
import styles from "./statsModal.module.scss";
import Button from "../../../components/common/Layout/Button/Button";
import { MauriaNoteStatsType, MauriaNoteType } from "../../../types/note";
import { ModalContext, ModalContextType } from "../../../contexts/modalContext";
import modalStyles from "../../../components/common/Layout/Modal/modal.module.scss";
import clsx from "clsx";

type StatsModalProps = {
  exam: MauriaNoteType;
  stats?: MauriaNoteStatsType;
  notesShared?: boolean;
};

const StatsModalContent: FC<StatsModalProps> = ({
  exam,
  stats,
  notesShared,
}) => {
  const { closeModal } = useContext(ModalContext) as ModalContextType;

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
            Coeff {exam.coefficient}
          </span>
        </section>

        <section>
          <h3 className={"sectionTitle text-primary"}>Statistiques :</h3>
          {notesShared ? (
            stats ? (
              <>
                <p className={styles["disclaimer"]}>
                  Ces statistiques se basent uniquement sur les notes des
                  utilisateurs ayant partagé leurs données.
                </p>
                <ul className={styles["stats"]}>
                  <li>
                    <span className={styles["label"]}>Nombre de notes</span>
                    <span className={styles["value"]}>{stats.sampleSize}</span>
                  </li>
                  <li>
                    <span className={styles["label"]}>Mon rang</span>
                    <span className={styles["value"]}>
                      {`${stats.myRank} / ${stats.sampleSize}`}
                    </span>
                  </li>
                  <li>
                    <span className={styles["label"]}>Moyenne</span>
                    <span className={styles["value"]}>{stats.average}</span>
                  </li>
                  <li>
                    <span className={styles["label"]}>Médiane</span>
                    <span className={styles["value"]}>{stats.median}</span>
                  </li>
                  <li>
                    <span className={styles["label"]}>Écart-type</span>
                    <span className={styles["value"]}>
                      {stats.standardDeviation}
                    </span>
                  </li>
                  <li>
                    <span className={styles["label"]}>Minimum</span>
                    <span className={styles["value"]}>{stats.minimum}</span>
                  </li>
                  <li>
                    <span className={styles["label"]}>Maximum</span>
                    <span className={styles["value"]}>{stats.maximum}</span>
                  </li>
                </ul>
              </>
            ) : (
              <div className={"no-content-container"}>
                <span className={"no-content-text"}>
                  Aucune statistiques à afficher pour le moment
                </span>
              </div>
            )
          ) : (
            <div className={styles["notShared"]}>
              <div className={styles["text"]}>
                <span className={styles["message"]}>
                  Vous pouvez voir les statistiques de cette évaluation en
                  partageant vos notes avec Mauria !
                </span>
                <span className={styles["tip"]}>
                  Vous pouvez changer cela dans l'onglet "Paramètres" de
                  l'application
                </span>
              </div>
              <Button
                size={"sm"}
                variant={"primary"}
                href={"/app/settings"}
                onClick={closeModal}
              >
                Partager mes notes
              </Button>
            </div>
          )}
        </section>
      </div>

      <footer className={styles["footer"]}>
        <span className={styles["code"]}>{exam.code}</span>
      </footer>
    </>
  );
};

export default StatsModalContent;
