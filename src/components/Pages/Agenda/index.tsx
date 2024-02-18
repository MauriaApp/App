import React, { useContext, useRef } from "react";

import styles from "./Agenda.module.scss";
import { useIntersectionObserver } from "usehooks-ts";
import { DateTimeFormatOptions } from 'intl';

import clsx from "clsx";
import ModifyTaskModalContent from "../../../pages/Agenda/ModifyTaskModal";
import { ModalContext, ModalContextType } from "../../../contexts/modalContext";

type TaskProps = {
    index: number;
    id: number;
    title: string;
    start: string;
};


const Task: React.FC<TaskProps> = (props) => {

    const { openModal } = useContext(ModalContext) as ModalContextType;

    const absenceRef = useRef(null);
    const entry = useIntersectionObserver(absenceRef, {});
    const isVisible = !!entry?.isIntersecting;


    const options: DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const date = new Date(props.start);
    const date2 = date.toLocaleDateString('fr-FR', options);

    const isPast = date < new Date();    

    const openModifyTaskModal = (task: any) => {
        openModal(<ModifyTaskModalContent {...task} />);
    }

    return (
        <article
            ref={absenceRef}
            className={clsx(
                "card shadow",
                isVisible && "glassy",
                !isVisible && "hidden",
                styles["container"],
                isPast && styles["past"]
            )}
            onClick={() => {
                openModifyTaskModal(props);
            }}
        >

            <div>
                <h3
                    className={clsx(
                        "text-primary",
                        styles["title"]
                    )}
                >
                    {props.title}
                </h3>
                {isPast && <span className={styles["class"]}>Déjà passé !</span>}
                <span className={styles["class"]}>Avant le {date2}</span>
            </div>
        </article>
    );
};

export default Task;