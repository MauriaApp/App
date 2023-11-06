import React, { ReactNode, useState } from "react";
import styles from "./Toast.module.scss";


type ToastProps = {
    type: "information" | "error" | "success";
    isOpen: boolean;
    setIsOpen: (a: boolean) => void;
    icon?: ReactNode;
    title: string;
    content?: string;
};

const Toast: React.FC<ToastProps> = ({type, icon, isOpen, setIsOpen, title, content}) => {

    const [isAnimated, setIsAnimated] = useState(false);


    return (
        <div
            className={`${styles["container"]} glassy ${styles[type]} ${isOpen ? styles["isOpen"] : "" } ${isAnimated ? styles["isAnimated"] : ""}`} onAnimationEnd={() => {
                if (isOpen) {
                    setIsAnimated(true);
                    setIsOpen(false)
                    setTimeout(() => {
                        setIsAnimated(false);
                    }, 2500);
                }
            }
        }>
            {icon ?? ""}
            <div className={styles["content"]}>
                <h3 className={styles["title"]}>{title}</h3>
                {content && <span className={styles["text"]}>{content}</span>}
            </div>
        </div>
    );
};

export default Toast;
