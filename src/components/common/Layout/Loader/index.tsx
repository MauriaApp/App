import React from "react";
import { IonSpinner } from "@ionic/react";
import styles from "./Loader.module.scss";

const Loader = () => {
  return (
    <div className={styles["spinner"]}>
      <IonSpinner name={"crescent"} />
      <span>Chargement...</span>
    </div>
  );
};

export default Loader;
