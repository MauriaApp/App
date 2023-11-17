import React, { useContext, useRef } from "react";
import styles from "./Note.module.scss";
import { useIntersectionObserver } from "usehooks-ts";
import {
  ModalContext,
  ModalContextType,
} from "../../../../contexts/modalContext";
import StatsModalContent from "../../../../pages/Notes/StatsModalContent";
import { MauriaNoteStatsType, MauriaNoteType } from "../../../../types/note";
import clsx from "clsx";

type NoteProps = {
  index?: number;
  exam: MauriaNoteType;
  stats?: MauriaNoteStatsType;
  notesShared: boolean;
  isNew?: boolean;
  className?: string;
};

const Note: React.FC<NoteProps> = ({ exam, stats, notesShared, ...props }) => {
  const noteRef = useRef(null);
  const entry = useIntersectionObserver(noteRef, {});
  const isVisible = entry?.isIntersecting!!;

  const { openModal } = useContext(ModalContext) as ModalContextType;

  const openNoteModal = () =>
    openModal(
      <StatsModalContent
        exam={exam}
        stats={stats}
        notesShared={notesShared ?? false}
      />
    );

  if (props.index!! && props.index < 8) {
    return (
      <article
        ref={noteRef}
        style={{ animationDelay: `${props.index * 0.05}s` }}
        className={clsx(
          "card",
          styles["container"],
          styles["animate"],
          !isVisible && "hidden",
          isVisible && "glassy shadow"
        )}
        onClick={openNoteModal}
      >
        <div className={styles["note-container"]}>
          <h2 className={clsx(styles["note"], "text-accent")}>{exam.note}</h2>

          <span className={styles["coefficient"]}>
            Coeff {exam.coefficient}
          </span>
        </div>
        <div className={styles["informations"]}>
          <h3 className={clsx(styles["title"], "text-primary")}>
            {exam.epreuve}
          </h3>
          <span className={styles["date"]}>{exam.date}</span>
        </div>
      </article>
    );
  }

  return (
    <article
      ref={noteRef}
      className={clsx(
        "card",
        styles["container"],
        !isVisible && "hidden",
        isVisible && "glassy shadow"
      )}
      onClick={openNoteModal}
    >
      <div className={styles["note-container"]}>
        <h2 className={clsx(styles["note"], "text-accent")}>{exam.note}</h2>
        <span className={styles["coefficient"]}>Coeff {exam.coefficient}</span>
      </div>
      <div className={styles["informations"]}>
        <h3 className={clsx(styles["title"], "text-primary")}>
          {exam.epreuve}
        </h3>
        <span className={styles["date"]}>{exam.date}</span>
      </div>
    </article>
  );
};

export default Note;
