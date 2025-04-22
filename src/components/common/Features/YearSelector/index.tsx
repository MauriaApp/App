import styles from "./YearSelector.module.scss";
// import { IonToggle } from "@ionic/react";   ==> Implique des erreurs 
import Switch from 'react-ios-switch';   // Corrige les erreurs, mais c'est un package js donc erreur de déclaration
import { useSchoolYear } from "../../../../contexts/schoolYearContext";


const YearSelector = () => {
  const { thisYear, toggleYear } = useSchoolYear();


  return (
    <div className={styles["year-row"]}>
      <h2 className="sectionTitle text-primary no-margins">Année actuelle</h2>
      <Switch
        checked={thisYear}
        onChange={toggleYear}
        onColor="rgb(240, 107, 66)"
        offColor="grey"
      />
    </div>
  );
};

export default YearSelector;
