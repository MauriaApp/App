import { IonHeader } from "@ionic/react";
import styles from "./Header.module.scss";

import { ReactComponent as Moon } from "../../../../../assets/svg/icons/Moon.svg";
import { ReactComponent as Question } from "../../../../../assets/svg/icons/Question.svg";
import { ReactComponent as Logout } from "../../../../../assets/svg/icons/Logout.svg";
import { ReactComponent as Settings } from "../../../../../assets/svg/icons/Settings.svg";
import { ReactComponent as Associations } from "../../../../../assets/svg/icons/Association.svg";
import { ReactComponent as Aurion } from "../../../../../assets/svg/icons/Grade.svg";
import { ReactComponent as Basketball } from "../../../../../assets/svg/icons/Sport.svg";
import { ReactComponent as BookAtlas } from "../../../../../assets/svg/icons/book-atlas.svg";
import { useRef, useState } from "react";
import { Browser } from "@capacitor/browser";

import { Link } from "react-router-dom";

import { useDarkMode, useOnClickOutside } from "usehooks-ts";
import { logout } from "../../../../../utils/logout";
import { useHaptics } from "../../../../../utils/hooks/useHaptics";
import clsx from "clsx";

const Header = ({ isAuth }: { isAuth?: boolean }) => {
  const navRef = useRef(null);

  const { hapticsImpactLight } = useHaptics();
  const { isDarkMode, toggle } = useDarkMode();

  const [isShown, setIsShown] = useState(false);

  useOnClickOutside(navRef, () => {
    if (isShown) {
      setIsShown(false);
    }
  });

  const onTabClick = async () => {
    await hapticsImpactLight();
    setIsShown(false);
  };

  if (!isAuth) {
    return (
      <IonHeader className={styles["header-container"]} placeholder={undefined}>
        <header className={styles["header"]}>
          <div className={styles["logo"]}>Mauria</div>
        </header>
      </IonHeader>
    );
  }

  return (
    <>
      <IonHeader
        className={clsx(
          styles["header-container"],
          isShown && styles["isShown"]
        )}
        ref={navRef} placeholder={undefined}      >
        <header className={styles["header"]}>
          <div className={styles["logo"]}>Mauria</div>
          <div
            className={clsx(styles["hamburger"], isShown && styles["isShown"])}
            onClick={() => setIsShown(!isShown)}
          >
            <div />
            <div />
            <div />
          </div>
        </header>

        <nav className={clsx(styles["nav"], isShown && styles["isShown"])}>
          <div
            className={styles["nav-element"]}
            onMouseDown={async () => {
              await hapticsImpactLight();
              toggle();
            }}
          >
            <Moon
              className={clsx(styles["moon"], isDarkMode && styles["on"])}
            />
            <span>Changer le thème</span>
          </div>

          <Link
            to={"associations"}
            className={styles["nav-element"]}
            onClick={onTabClick}
          >
            <Associations />
            <span>Associations</span>
          </Link>

          <div
            className={styles["nav-element"]}
            onClick={async () => {
              await hapticsImpactLight();
              await Browser.open({ url: "https://www.asjunia.com/" });
            }}
          >
            <Basketball />
            <span>AS (sports)</span>
          </div>

          <div
            className={styles["nav-element"]}
            onClick={async () => {
              await hapticsImpactLight();
              await Browser.open({ url: "https://aurion.junia.com" });
            }}
          >
            <Aurion />
            <span>Aurion</span>
          </div>

          <div
            className={styles["nav-element"]}
            onClick={async () => {
              await hapticsImpactLight();
              await Browser.open({ url: "https://junia-learning.com" });
            }}
          >
            <BookAtlas />
            <span>Junia-Learning</span>
          </div>

          <Link
            to={"settings"}
            className={styles["nav-element"]}
            onClick={onTabClick}
          >
            <Settings />
            <span>Paramètres</span>
          </Link>

          <Link
            to={"support"}
            className={styles["nav-element"]}
            onClick={onTabClick}
          >
            <Question />
            <span>Support</span>
          </Link>

          <div className={styles["nav-element"]} onClick={logout}>
            <Logout />
            <span>Déconnexion</span>
          </div>
        </nav>
      </IonHeader>
      <div
        className={clsx(
          styles["background"],
          isShown && styles["show-background"]
        )}
        onClick={() => setIsShown(false)}
      ></div>
    </>
  );
};

export default Header;
