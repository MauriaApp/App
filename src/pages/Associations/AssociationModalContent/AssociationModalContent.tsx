import React, { FC } from "react";
import styles from "../../../components/common/Layout/Modal/modal.module.scss";
import Button from "../../../components/common/Layout/Button/Button";
import { AssociationType } from "../../../types/association";

type AssociationModalContentProps = {
  association?: AssociationType;
};

const AssociationModalContent: FC<AssociationModalContentProps> = ({
  association,
}) => {
  if (association) {
    return (
      <>
        <div className={styles["headerModal"]}>
          <img
            src={association.image}
            alt={association.name}
            className={styles["modalImage"]}
          />
          <h2 className={"sectionTitle no-margins"}>{association.name}</h2>
        </div>
        <p className={styles["modalText"]}>{association.desc}</p>
        <Button
          size={"md"}
          variant={"accent"}
          onClick={() => {
            window.open(
              `${association.contact}`,
              "_blank"
            );
          }}
        >
          Instagram
        </Button>
      </>
    );
  }

  return (
    <>
      <div className={styles["headerModal"]}>
        <img
          className={styles["modalImage"]}
          src="https://mylow.fr/mauria/api/mauria/0.jpg"
          alt="Ajoute ton asso !"
        />
        <h2 className={"sectionTitle no-margins"}>
          Ajoute / Modifie ton asso !
        </h2>
      </div>
      <p className={styles["modalText"]}>
        Cet annulaire des assos a pour but d'aider un maximum de personnes...
        Alors pourquoi ne pas ajouter ton association ? Pour l'ajouter, merci de
        remplir le formulaire en cliquant sur le gros bouton ! Une fois validé,
        nous nous chargerons de l'ajouter à la liste des associations ! Tu peux
        également remplir ce formulaire si tu souhaites modifier les
        informations de ton association ! (ou la supprimer 😥)
      </p>
      <Button
        size={"md"}
        variant={"accent"}
        onClick={() => {
          window.open(`https://forms.office.com/e/Kpx2fP8Gh1`, "_blank");
        }}
      >
        Lien vers le form
      </Button>
    </>
  );
};

export default AssociationModalContent;
