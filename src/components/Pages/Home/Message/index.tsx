import React from "react";
import styles from "./Message.module.scss";
import clsx from "clsx";

type MessageProps = {
  loading?: boolean;
  title?: string;
  content?: string;
};

const Message: React.FC<MessageProps> = ({ title, content, loading }) => {
  if (loading) {
    return (
      <article
        className={clsx(
          styles["message"],
          styles["loading"],
          "shadow-accent glassy"
        )}
      >
        <div className={styles["title"]} />
        <p className={styles["content"]}>
          <span className={styles["fake-line"]}></span>
          <span className={styles["fake-line"]}></span>
          <span className={styles["fake-line"]}></span>
        </p>
      </article>
    );
  }

  return (
    <article className={clsx(styles["message"], "shadow-accent glassy")}>
      {title && <h2 className={styles["title"]}>{title}</h2>}
      <p className={styles["content"]}>{content}</p>
    </article>
  );
};

export default Message;
