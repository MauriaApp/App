import { IonToggle } from "@ionic/react";
import { useContext } from "react";

import styles from "./Settings.module.scss";
import { useDarkMode, useEffectOnce } from "usehooks-ts";
import Input from "../../components/common/Layout/Input/Input";
import { useForm } from "react-hook-form";
import { getFirstName } from "../../utils/api/api";
import { ReactComponent as Check } from "../../assets/svg/icons/Checkmark.svg";
import Button from "../../components/common/Layout/Button/Button";
import { logout } from "../../utils/logout";
import { ToastContext, ToastContextType } from "../../contexts/toastContext";
import { useHaptics } from "../../utils/hooks/useHaptics";
import PageTemplate from "../Template";

const Settings = () => {
  const { register, handleSubmit, reset } = useForm();
  const { isDarkMode, toggle } = useDarkMode();
  const { haptics, toggle: toggleHaptics } = useHaptics();

  const { openToast } = useContext(ToastContext) as ToastContextType;

  useEffectOnce(() => {
    reset({ name: getFirstName() });
  });

  const onSubmit = (data: any) => {
    localStorage.setItem("name", data.name);

    openToast({
      type: "success",
      title: "Nom modifié avec succès !",
    });
  };

  return (
    <PageTemplate title={"Paramètres"}>
      <section>
        <h2 className={"sectionTitle text-primary"}>Interface</h2>
        <div className={styles["section-content"]}>
          <div className={styles["setting-group"]}>
            <label className={"label"}>Activer le mode sombre</label>
            <IonToggle mode={"ios"} checked={isDarkMode} onIonChange={toggle} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
          </div>
          <div className={styles["setting-group"]}>
            <label className={"label"}>
              Activer les retours haptiques (vibrations)
            </label>
            <IonToggle
              mode={"ios"}
              checked={haptics}
              onIonChange={toggleHaptics} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            />
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles["setting-group"]}
          >
            <label className={"label"}>Modifie ton prénom</label>
            <div className={styles["input-container"]}>
              <Input placeholder={"Votre prénom"} register={register("name")} />
              <Button
                type={"submit"}
                variant={"accent"}
                className={styles["edit-button"]}
              >
                <Check />
              </Button>
            </div>
          </form>
        </div>
      </section>
      {/* <section>
        <h2 className={"sectionTitle text-primary"}>Données</h2>
        <div className={styles["section-content"]}>
          <div className={styles["setting-group"]}>
            <label className={"label"}>Partager mes notes (Statistiques)</label>
            <IonToggle
              mode={"ios"}
              checked={notesShared}
              onIonChange={toggleNoteShared} placeholder={undefined}            />
          </div>
        </div>
      </section> */}
      <div className={styles["buttons-column"]}>
        <Button size={"lg"} round={true} onClick={logout} variant={"primary"}>
          Se déconnecter
        </Button>
        <Button size={"lg"} round={true} onClick={logout} variant={"accent"}>
          Supprimer les données
        </Button>
      </div>
    </PageTemplate>
  );
};

export default Settings;
