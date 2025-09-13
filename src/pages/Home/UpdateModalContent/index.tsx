import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import styles from "../../../components/common/Layout/Modal/modal.module.scss";
import Button from "../../../components/common/Layout/Button/Button";
import { ModalContext, ModalContextType } from "../../../contexts/modalContext";
import { fetchUpdates } from "../../../utils/api/api";
import { formatUpdatesContent } from "../../../utils/updates";
import { MauriaUpdateLogType } from "../../../types/updateLog";

const UpdateModalContent = () => {
  const { closeModal } = useContext(ModalContext) as ModalContextType;

  const { data: updates, isLoading } = useQuery<MauriaUpdateLogType[]>({
    queryKey: ["updates-modal"],
    queryFn: fetchUpdates,
  });

  if (isLoading) {
    return (
      <>
        <div className={styles["headerModal"]}>
          <h2 className={"sectionTitle text-primary no-margins"}>
            Y'a du nouveau sur Mauria !
          </h2>
        </div>
        <p className={styles["modalText"]}>Chargement des infos de la mise à jour...</p>
        <Button size={"md"} variant={"accent"} onClick={closeModal}>
          Passer
        </Button>
      </>
    );
  }

  if (updates === undefined || updates.length === 0) {
    return (
      <>
        <div className={styles["headerModal"]}>
          <h2 className={"sectionTitle text-primary no-margins"}>
            Y'a du nouveau sur Mauria !
          </h2>
        </div>
        <p className={styles["modalText"]}>Aucune information de mise à jour disponible.</p>
        <Button size={"md"} variant={"accent"} onClick={closeModal}>
          Continuer
        </Button>
      </>
    );
  }

  return (
    <>
      <div className={styles["headerModal"]}>
        <h2 className={"sectionTitle text-primary no-margins"}>
          Y'a du nouveau sur Mauria !
        </h2>
      </div>
      <p className={styles["modalText"]}>
        <strong style={{ color: "#f17853" }}>
          Date de la mise à jour :
          </strong> {updates[0].date}
        <br />
        <br />
        <strong style={{ color: "#f17853" }}>
          {updates[0].titleVisu}
        </strong>
        <br />
        <p style={{ whiteSpace: "pre-line" }}>
          {formatUpdatesContent(updates[0].contentVisu)}
        </p>
        <br />
        <br />
        <strong style={{ color: "#f17853" }}>
          {updates[0].titleDev}
        </strong>
        <br />
        <p style={{ whiteSpace: "pre-line" }}>
          {formatUpdatesContent(updates[0].contentDev)}
        </p>
      </p>
      <Button size={"md"} variant={"accent"} onClick={closeModal}>
        D'accord !
      </Button>
    </>
  );
};

export default UpdateModalContent;
