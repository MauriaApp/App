import React, { useContext } from "react";

import { Redirect, Route } from "react-router-dom";

import Planning from "./Planning";
import Home from "./Home";
import { IonRouterOutlet } from "@ionic/react";

import Grades from "./Notes";
import Absences from "./Absences";
import Settings from "./Settings";
import Support from "./Support";
import Associations from "./Associations";
import { ModalContext, ModalContextType } from "../contexts/modalContext";

import Footer from "../components/common/Layout/Navbars/Footer";
import Header from "../components/common/Layout/Navbars/Header/Header";
import { RouterAnimation } from "../utils/animations/transition";
import Toast from "../components/common/Layout/Toast";
import Modal from "../components/common/Layout/Modal";
import { ToastContext, ToastContextType } from "../contexts/toastContext";

const AppRouter = ({ match }: { match: any }) => {
  const modalContext = useContext(ModalContext) as ModalContextType;
  const {
    icon: toastIcon,
    type: toastType,
    title: toastTitle,
    content: toastContent,
    isOpen: toastIsOpen,
    setIsOpen: setToastIsOpen,
  } = useContext(ToastContext) as ToastContextType;

  if (!localStorage.getItem("email") || !localStorage.getItem("password")) {
    return <Redirect to={"/login"} />;
  }

  return (
    <>
      <Header isAuth />
      <IonRouterOutlet animated={true} animation={RouterAnimation}>
        <Route path={`${match.url}/home`} component={Home} />
        <Route path={`${match.url}/planning`} component={Planning} />
        <Route path={`${match.url}/notes`} component={Grades} />
        <Route path={`${match.url}/absences`} component={Absences} />
        <Route path={`${match.url}/settings`} component={Settings} />
        <Route path={`${match.url}/support`} component={Support} />
        <Route path={`${match.url}/associations`} component={Associations} />
        <Route
          exact
          path={`${match.url}/`}
          render={() => <Redirect to={`${match.url}/home`} />}
        />
      </IonRouterOutlet>
      <Modal {...modalContext} />

      <Toast
        icon={toastIcon}
        type={toastType}
        isOpen={toastIsOpen}
        setIsOpen={setToastIsOpen}
        title={toastTitle}
        content={toastContent}
      />
      <Footer />
    </>
  );
};

export default AppRouter;
