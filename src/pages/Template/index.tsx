import {
  IonContent,
  IonPage,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/react";
import { FC, useContext } from "react";
import Loader from "../../components/common/Layout/Loader";
import { ToastContext, ToastContextType } from "../../contexts/toastContext";

type TemplateProps = {
  title: string;
  isLoading?: boolean;
  onRefresh?: (e: CustomEvent) => void;
  children?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
};

export const PageTemplate: FC<TemplateProps> = (props) => {
  const { openToast } = useContext(ToastContext) as ToastContextType;

  if (props.isLoading) {
    return (
      <IonPage placeholder={undefined}>
        <div className="mock-header"></div>
        {props.header}
        <IonContent placeholder={undefined}>
          <header>
            <h1 className="title">{props.title}</h1>
          </header>
          <main className={"content"}>
            {props.children}
            <div className={"loader-container"}>
              <Loader />
            </div>
          </main>
        </IonContent>
        {props.footer}
        <div className="mock-footer"></div>
      </IonPage>
    );
  }

  return (
    <IonPage placeholder={undefined}>
      <div className="mock-header"></div>
      {props.header}
      <IonContent placeholder={undefined}>
        {props.onRefresh && (
          <IonRefresher
            slot="fixed"
            onIonRefresh={(e: CustomEvent) => {
              openToast({
                type: "information",
                title: "Actualisation en cours...",
                content: "",
              });
              props.onRefresh?.(e);
            }}
            pullFactor={0.5}
            pullMin={40}
            pullMax={160}
            closeDuration="400ms"
            snapbackDuration="400ms" placeholder={undefined}>
            <IonRefresherContent
              pullingText="Tirer pour actualiser..."
              refreshingSpinner="crescent" placeholder={undefined}></IonRefresherContent>
          </IonRefresher>
        )}
        <header >
          <h1 className="title">{props.title}</h1>
        </header>
        <main className={"content"}>{props.children}</main>
      </IonContent>
      {props.footer}
      <div className="mock-footer"></div>
    </IonPage>
  );
};

export default PageTemplate;
