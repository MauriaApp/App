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
import Agenda from "./Agenda";
import { ModalContext, ModalContextType } from "../contexts/modalContext";

import Footer from "../components/common/Layout/Navbars/Footer";
import Header from "../components/common/Layout/Navbars/Header/Header";
import Toast from "../components/common/Layout/Toast";
import Modal from "../components/common/Layout/Modal";
import { ToastContext, ToastContextType } from "../contexts/toastContext";
import Outils from "./Outils";

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
      <IonRouterOutlet placeholder={undefined}>
        <Route path="/app/home" component={Home} />
        <Route path="/app/planning" component={Planning} />
        <Route path="/app/notes" component={Grades} />
        <Route path="/app/absences" component={Absences} />
        <Route path="/app/settings" component={Settings} />
        <Route path="/app/support" component={Support} />
        <Route path="/app/associations" component={Associations} />
        <Route path="/app/agenda" component={Agenda} />
        <Route path="/app/outils" component={Outils} />
        <Route exact path="/app/" render={() => <Redirect to="/app/home" />} />
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
