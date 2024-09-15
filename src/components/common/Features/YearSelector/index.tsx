import { FC } from "react";
import styles from "./YearSelector.module.scss";
import { IonToggle } from "@ionic/react";
import { useLocalStorage } from "usehooks-ts";

type YearSelectorProps = {
  handleToggle: () => void;
};

const YearSelector: FC<YearSelectorProps> = ({ handleToggle }) => {
  const [thisYear, setThisYear] = useLocalStorage("thisYear", true);

  // Handler for toggle change
  const onToggleChange = () => {
    // Toggle the state and ensure it is stored correctly in localStorage
    setThisYear((prev) => !prev);

    // Call the parent component's handler if it doesn't trigger re-renders
    if (typeof handleToggle === 'function') {
      handleToggle();
    }
  };

  return (
    <div className={styles["year-row"]}>
      <h2 className="sectionTitle text-primary no-margins">Année actuelle</h2>
      <IonToggle
        mode="ios"
        checked={thisYear}
        onIonChange={onToggleChange} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}      />
    </div>
  );
};

export default YearSelector;
