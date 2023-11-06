import Button from "../../components/common/Layout/Button/Button";
import styles from "./Support.module.scss";
import { logout } from "../../utils/logout";
import PageTemplate from "../Template";
import Updates from "./Updates";
import clsx from "clsx";

const Support = () => {
  return (
    <PageTemplate title={"Support"}>
      <section>
        <h2 className={"sectionTitle text-primary"}>Informations</h2>
        <div className={clsx("card  shadow glassy", styles["info-card"])}>
          <div>
            <h3 className={"cardTitle text-primary"}>Mauria, c'est quoi ?</h3>
            <p className={"text"}>
              Mauria est une application permettant l'accès aux données des
              étudiants JUNIA. Cette dernière est l'accomplissement de plusieurs
              projets passé.
              <br></br>
              Vous pouvez consulter vos informations étudiantes ainsi que des
              renseignements sur JUNIA (comme les associations).
            </p>
          </div>
          <div>
            <h3 className={"cardTitle text-primary"}>Par qui ?</h3>
            <p className={"text"}>
              L'application Mauria a été initialement imaginée et développée par
              Milo Montuori.
              <br></br>
              La dernière version de Mauria est co-développée par Milo Montuori
              et Louis Lecouturier, 2 étudiants JUNIA ISEN Lille. Merci spécial
              à Audran Tourneur pour les Statistiques des notes !<br></br>
              N'hésitez pas à nous contacter avec le bouton ci-dessous si vous
              avez des questions ou des idées d'améliorations, nous serons ravis
              de faire évoluer l'application !
            </p>
          </div>
        </div>
      </section>
      <section>
        <h2 className={"sectionTitle text-primary"}>Un problème ?</h2>
        <Button round variant={"accent"} onClick={logout}>
          Supprimer les données
        </Button>
      </section>
      <section>
        <h2 className={"sectionTitle text-primary"}>Une question/idée ?</h2>
        <a href="mailto:milo.montuori@student.junia.com">
          <Button round variant={"primary"}>
            Nous contacter
          </Button>
        </a>
      </section>
      <Updates />
    </PageTemplate>
  );
};

export default Support;
