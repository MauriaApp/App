import { ReactNode, useRef, useState } from "react";
import { useEffectOnce, useOnClickOutside } from "usehooks-ts";
import { createGesture } from "@ionic/react";
import clsx from "clsx";

import styles from "./modal.module.scss";

type ModalProps = {
  content: ReactNode;
  isOpen: boolean;
  onClose?: () => void;
  closeModal?: () => void;
  className?: string;
};

export const Modal: React.FC<ModalProps> = ({
  content,
  isOpen,
  closeModal,
  ...props
}) => {
  const modalRef = useRef<HTMLInputElement>(null);
  const handleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLInputElement>(null);
  const [disappear, setDisappear] = useState<boolean>(false);


  const handleClickOutside = () => {
    if (!isOpen) {
      return;
    }
    const modal = modalRef.current;
    const content = contentRef.current;

    if (modal) {
      modal.style.transform = "";
      modal.style.transition = "transform 0.4s ease";

      if (content) {
        content.scrollTo(0, 0);
      }
    }

    props.onClose?.();

    setDisappear(true);
  };

  useOnClickOutside(modalRef, handleClickOutside);

  useEffectOnce(() => gestureInit());

  const gestureInit = () => {
    const handle = handleRef.current;
    const modal = modalRef.current;

    if (handle && modal) {
      const gesture = createGesture({
        el: handle,
        direction: "y",
        gestureName: "modal-swipe",
        onStart: () => {
          modal.style.transition = "";
        },
        onMove: (detail) => {
          modal.style.transform = `translateY(${detail.deltaY}px)`;
        },
        onEnd: (detail) => {
          const windowHeight = window.innerHeight;
          const content = contentRef.current;
          modal.style.transition = "transform 0.2s ease";

          if (detail.deltaY > windowHeight / 5) {
            modal.style.transition = "transform 0.4s ease";
            modal.style.transform = "";
            props.onClose?.();
            setDisappear(true);

            content?.scrollTo(0, 0);
            return;
          }
          modal.style.transform = "";
        },
      });

      gesture.enable();
    }
  };

  return (
    <div className={clsx(styles["container"], isOpen && styles["isShown"])}>
      <div
        className={clsx(
          styles["modalContainer"],
          isOpen && styles["isOpen"],
          disappear && styles["disappear"]
        )}
        onAnimationEnd={() => {
          if (contentRef.current) {
            contentRef.current.scrollTo(0, 0);
          }

          if (disappear) {
            setDisappear(false);
            closeModal?.();
          }
        }}
      >
        <div ref={modalRef} className={`${styles["modal"]} glassy`}>
          <div ref={handleRef} className={styles["handleContainer"]}>
            <div className={styles["handle"]}></div>
          </div>
          <div ref={contentRef} className={styles["modalContent"]}>
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
