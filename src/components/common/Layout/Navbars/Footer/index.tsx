import { IonFooter } from "@ionic/react";

import { ReactComponent as Home } from "../../../../../assets/svg/icons/Home.svg";
import { ReactComponent as Planning } from "../../../../../assets/svg/icons/Calendar.svg";
import { ReactComponent as Notes } from "../../../../../assets/svg/icons/Notes.svg";
import { ReactComponent as Absence } from "../../../../../assets/svg/icons/Absence.svg";
import { ReactComponent as Agenda } from "../../../../../assets/svg/icons/Agenda.svg";

import { ReactComponent as HomeSelected } from "../../../../../assets/svg/icons/HomeFilled.svg";
import { ReactComponent as PlanningSelected } from "../../../../../assets/svg/icons/CalendarFilled.svg";
import { ReactComponent as NotesSelected } from "../../../../../assets/svg/icons/NotesFilled.svg";
import { ReactComponent as AbsenceSelected } from "../../../../../assets/svg/icons/AbsenceFilled.svg";
import { ReactComponent as AgendaSelected } from "../../../../../assets/svg/icons/AgendaFilled.svg";

import styles from "./Footer.module.scss";
import { NavLink, useHistory } from "react-router-dom";
import { useState } from "react";
import { useEffectOnce } from "usehooks-ts";
import clsx from "clsx";
import { Location } from "history";
import { useHaptics } from "../../../../../utils/hooks/useHaptics";

const Footer = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  const { hapticsImpactLight } = useHaptics();

  const history = useHistory();
  useEffectOnce(() => {
    const unlisten = history.listen((location: Location) => {
      setCurrentPath(location.pathname);
    });

    return () => {
      unlisten();
    };
  });

  const handleClick = async () => {
    await hapticsImpactLight();
  };

  return (
    <IonFooter className={styles["footer"]} placeholder={undefined}>
      <nav className={styles["footer-nav"]}>
        <NavLink
          onClick={handleClick}
          to="/app/home"
          className={(isActive: boolean) =>
            clsx(styles["nav-link"], isActive && styles["active"])
          }
        >
          {currentPath.includes("/home") ? <HomeSelected /> : <Home />}
        </NavLink>
        <NavLink
          to="/app/planning"
          onClick={handleClick}
          className={(isActive: boolean) =>
            clsx(styles["nav-link"], isActive && styles["active"])
          }
        >
          {currentPath.includes("/planning") ? (
            <PlanningSelected />
          ) : (
            <Planning />
          )}
        </NavLink>
        <NavLink
          to="/app/notes"
          onClick={handleClick}
          className={(isActive: boolean) =>
            clsx(styles["nav-link"], isActive && styles["active"])
          }
        >
          {currentPath.includes("/notes") ? <NotesSelected /> : <Notes />}
        </NavLink>
        <NavLink
          to="/app/absences"
          onClick={handleClick}
          className={(isActive: boolean) =>
            clsx(styles["nav-link"], isActive && styles["active"])
          }
        >
          {currentPath.includes("/absences") ? (
            <AbsenceSelected />
          ) : (
            <Absence />
          )}
        </NavLink>

        <NavLink
          to="/app/agenda"
          onClick={handleClick}
          className={(isActive: boolean) =>
            clsx(styles["nav-link"], isActive && styles["active"])
          }
        >
          {currentPath.includes("/agenda") ? (
            <AgendaSelected />
          ) : (
            <Agenda style={{fill: "none"}}/>
          )}
        </NavLink>
      </nav>
    </IonFooter>
  );
};

export default Footer;
