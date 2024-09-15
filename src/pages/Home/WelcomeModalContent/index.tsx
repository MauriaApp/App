import { useContext } from "react";
import styles from "../../../components/common/Layout/Modal/modal.module.scss";
import Button from "../../../components/common/Layout/Button/Button";
import { ModalContext, ModalContextType } from "../../../contexts/modalContext";
import { fetchAbsences, fetchNotes } from "../../../utils/api/api";

const WelcomeModalContent = () => {
  const { closeModal } = useContext(ModalContext) as ModalContextType;

  fetchAbsences();
  fetchNotes();

  return (
    <>
      <div className={styles["headerModal"]}>
        <h2 className={"sectionTitle text-primary no-margins"}>
          Bienvenue sur Mauria !
        </h2>
      </div>
      <p className={styles["modalText"]}>
        <strong style={{ color: "#f17853" }}>Salut !</strong> On a remarqué que
        c'était ta première fois sur l'application. On te propose de t'expliquer
        comment ça marche et comment t'y retrouver.
        <br />
        <br />
        <strong style={{ color: "#f17853" }}>
          Mauria ne remplace pas Aurion ! 
        </strong> Mauria est un outil complémentaire à Aurion, il ne remplace pas le site et ses données.
        <br />
        <br />
        L'application est divisée en plusieurs onglets, tu peux les retrouver en
        bas de l'écran. Il y a aussi un menu en haut à droite avec des options
        supplémentaires.
        <br />
        <br />
        L'application n'enregistre rien sur des serveurs, tout est stocké sur ton téléphone. De
        ce fait, tu peux l'utiliser sans connexion internet ! (Mais tu ne
        pourras pas actualiser les données)
        <br />
        Le Planning, les Notes et les Absences sont récupérées automatiquement à la connexion, et à chaque fois que tu ouvres l'application
        <br />
        Tu peux toujours le faire manuellement : il suffit de faire un
        geste vers le bas sur la page (un swipe)
        <br />
        <br />
        Si tu as des questions, n'hésite pas à nous contacter dans l'onglet
        "Support" !
        <br />
        <br />
        Par{" "}
        <strong style={{ color: "#f17853" }}>Milo Montuori</strong>{" "}et{" "}<strong style={{ color: "#f17853" }}>Louis Lecouturier</strong> 👍
      </p>
      <Button size={"md"} variant={"accent"} onClick={closeModal}>
        C'est parti !
      </Button>
    </>
  );
};

export default WelcomeModalContent;
