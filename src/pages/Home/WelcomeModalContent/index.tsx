import React, { useContext } from "react";
import styles from "../../../components/common/Layout/Modal/modal.module.scss";
import Button from "../../../components/common/Layout/Button/Button";
import { ModalContext, ModalContextType } from "../../../contexts/modalContext";

const WelcomeModalContent = () => {
  const { closeModal } = useContext(ModalContext) as ModalContextType;

  return (
    <>
      <div className={styles["headerModal"]}>
        <h2 className={"sectionTitle text-primary no-margins"}>
          Bienvenue sur Mauria (version web) !
        </h2>
      </div>
      <p className={styles["modalText"]}>
        <strong style={{ color: "#f17853" }}>Salut !</strong> On a remarqué que
        c'était ta première fois sur le site. On te propose de t'expliquer
        comment ça marche et comment t'y retrouver.
        <br />
        <br />
        <strong style={{ color: "#f17853" }}>
          Mauria ne remplace pas Aurion !
        </strong> C'est un outil complémentaire à Aurion, il ne remplace pas le site et ses données.
        <br />
        <br />
        Le site est divisé en plusieurs onglets, tu peux les retrouver en
        bas de l'écran. Il y a aussi un menu en haut à droite avec des options
        supplémentaires.
        <br />
        <br />
        Le site n'enregistre rien, tout est stocké sur ton navigateur.
        Donc, si tu changes de navigateur, tu n'auras plus rien. Pareil si tu es en navigation privée.
        <br />
        <br />
        <strong style={{ color: "#f17853" }}>
          RIEN<span> </span>
        </strong>
        n'est mis à jour automatiquement, il faut donc cliquer sur le bouton "Actualiser"
        disponible dans chaque onglet pour mettre à jour les données.
        <br />
        <strong style={{ color: "#f17853" }}>
          Pitié actualises de temps en temps... Ça prend quelques secondes et ça évite les problèmes.
        </strong>
        <br />
        <br />
        Si tu as des questions, n'hésite pas à nous contacter dans l'onglet
        "Support" !
        <br />
        <br />
        Tout le code de Mauria est disponible sur   https://github.com/MauriaApp
        <br />
        <br />
        Par Milo Montuori et Louis Lecouturier 👍
      </p>
      <Button size={"md"} variant={"accent"} onClick={closeModal}>
        C'est parti !
      </Button>
    </>
  );
};

export default WelcomeModalContent;
