import React, { FC } from "react";
import styles from "./YearSelector.module.scss";
import { IonToggle } from "@ionic/react";
import { useLocalStorage } from "usehooks-ts";

type YearSelectorProps = {
  handleToggle: () => void;
};

const YearSelector: FC<YearSelectorProps> = (props) => {
  const [thisYear, setThisYear] = useLocalStorage("thisYear", true);

  const handleToggle = () => {
    setThisYear(prev => !prev);
    props.handleToggle();
  };

  return (
    <div className={styles["year-row"]}>
      <h2 className="sectionTitle text-primary no-margins">Année actuelle</h2>
      <IonToggle mode="ios" checked={thisYear} onIonChange={handleToggle} placeholder={undefined} />
    </div>
  );
};

export default YearSelector;
