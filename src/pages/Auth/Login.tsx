import styles from "./Login.module.scss";
import Input from "../../components/common/Layout/Input/Input";
import Button from "../../components/common/Layout/Button/Button";
import {ReactComponent as Mail} from "../../assets/svg/icons/Message.svg";
import {ReactComponent as Lock} from "../../assets/svg/icons/Lock.svg";
import React from "react";

import {useForm} from "react-hook-form";

import {IonContent, IonPage} from "@ionic/react";
import {login} from "../../utils/api/api";
import {useHistory} from "react-router-dom";
import Header from "../../components/common/Layout/Navbars/Header/Header";
import clsx from "clsx";

// const mailRegex =
//   /^[a-zA-Z-]+\.[a-zA-Z-]+@[a-zA-Z-]+\.[a-zA-Z-]+(\.[a-zA-Z-]+)?$/;
//  ATTENTION, ne prends pas les - et ' et autres caractères spéciaux alors qu'ils sont autorisés dans les mails JUNIA

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = React.useState<string | null>(null);

  const history = useHistory();

  const onSubmit = async (data: any) => {
    let isLoggedIn = await login(data.email.toLowerCase(), data.password);

    if (isLoggedIn) {
      history.push("/app/home");
      return;
    }

    localStorage.removeItem("email");
    localStorage.removeItem("password");

    setError("Adresse mail ou mot de passe incorrect.");
    return;
  };

  return (
    <IonPage>
      <Header />
      <IonContent className={styles["content"]}>
        <h1 className={clsx("text-primary", styles["title"])}>
          Bienvenue sur <span style={{ whiteSpace: "nowrap" }}>Mauria !</span>
        </h1>

        <form className={styles["form"]} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles["form-group"]}>
            <Input
              placeholder={"Adresse JUNIA"}
              icon={<Mail />}
              register={register("email", {
                required: "Ce champ est requis",
              })}
            />
            {errors.email && (
              <span className={styles["error-message"]}>
                {errors.email.message?.toString()}
              </span>
            )}
          </div>
          <div className={styles["form-group"]}>
            <Input
              type={"password"}
              placeholder={"Mot de passe"}
              register={register("password", {
                required: "Ce champ est requis",
              })}
              icon={<Lock />}
            />
            {errors.password && (
              <span className={styles["error-message"]}>
                {errors.password.message?.toString()}
              </span>
            )}
          </div>
          <div className={styles["form-group"]}>
            <div className={styles["CGU"]}>
              <input
                {...register("cgu", {
                  required:
                    "Vous devez accepter les termes et conditions d'utilisation.",
                })}
                type={"checkbox"}
              />
              <span>
                J'accepte{" "}
                <a
                  href="https://mylow.fr/CGU.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  les termes et conditions d'utilisation.
                </a>
              </span>
            </div>
            {errors.cgu && (
              <span className={styles["error-message"]}>
                {errors.cgu.message?.toString()}
              </span>
            )}
          </div>
          {error && <span className={styles["error-message"]}>{error}</span>}
          <Button
            size={"lg"}
            variant={"accent"}
            round={true}
            className={styles["submit"]}
            type="submit"
          >
            Se connecter
          </Button>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Login;
