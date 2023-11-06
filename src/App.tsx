import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Theme variables */
import "./theme/variables.css";
import "./theme/globals.scss";

import Login from "./pages/Auth/Login";

import { ReactComponent as Shape } from "./assets/svg/layout/shape.svg";

import { StatusBar, Style } from "@capacitor/status-bar";
import { useDarkMode } from "usehooks-ts";
import { ModalContextProvider } from "./contexts/modalContext";
import { ToastContextProvider } from "./contexts/toastContext";

import AppRouter from "./pages/Router";
import { RouterAnimation } from "./utils/animations/transition";
import { fetchPlanning } from "./utils/api/api";
import { useEffect } from "react";
import dayjs from "dayjs";

import "dayjs/locale/fr";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.locale("fr");
dayjs.extend(relativeTime);
setupIonicReact();

StatusBar.setStyle({ style: Style.Dark });
StatusBar.setBackgroundColor({ color: "#3f2a56" });


// Locks screeb orientation to portrait
// window.screen.orientation.lock('portrait');

const queryClient = new QueryClient();


const App = () => {
  const { isDarkMode } = useDarkMode();
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContextProvider>
        <ModalContextProvider>
          <IonApp className={isDarkMode ? "dark" : ""}>
            <IonReactRouter>
              <IonRouterOutlet animation={RouterAnimation}>
                <Route exact path="/login">
                  <Login />
                </Route>
                <Route
                  path="/app"
                  render={(props) => <AppRouter {...props} />}
                />
                <Route render={() => <Redirect to={"/app/home"} />} />
              </IonRouterOutlet>
            </IonReactRouter>
            <div className="app-background">
              <Shape className={"shape top"} />
              <Shape className={"shape bottom"} />
            </div>
          </IonApp>
        </ModalContextProvider>
      </ToastContextProvider>
    </QueryClientProvider>
  );
};
export default App;
