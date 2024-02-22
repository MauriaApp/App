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

import { StatusBar, Style } from "@capacitor/status-bar";
import { useDarkMode } from "usehooks-ts";
import { ModalContextProvider } from "./contexts/modalContext";
import { ToastContextProvider } from "./contexts/toastContext";

import AppRouter from "./pages/Router";
import dayjs from "dayjs";

import "dayjs/locale/fr";
import relativeTime from "dayjs/plugin/relativeTime";
import AppBackground from "./theme/AppBackground";

import { LocalNotifications } from "@capacitor/local-notifications";
import { fetchAbsences, fetchPlanning, fetchNotes } from "./utils/api/api";
import { MauriaNoteType } from "./types/note";
import { useEffect } from "react";
import { RouterAnimation } from "./utils/animations/transition";

dayjs.locale("fr");
dayjs.extend(relativeTime);
setupIonicReact();

StatusBar.setStyle({ style: Style.Dark });
StatusBar.setBackgroundColor({ color: "#3f2a56" });

// Locks screen orientation to portrait
// window.screen.orientation.lock('portrait');

const queryClient = new QueryClient();

LocalNotifications.checkPermissions().then((permission) => {
  if (permission.display !== "granted") {
    LocalNotifications.requestPermissions()
  }
});


let notificationCounter = 1; // Compteur pour générer des IDs uniques

const intervalFetch = async () => {
  try {
    fetchAbsences();
    fetchPlanning();
    await fetchNotes();
    if (localStorage.getItem("newNotes") !== null) {
      const newNotes = JSON.parse(localStorage.getItem("newNotes") || "[]");
      if (newNotes.length > 0) {
        const existingNotifications = JSON.parse(localStorage.getItem("scheduledNotifications") || "[]");
        const notificationsToSchedule = newNotes.slice(0, 5).filter((note: MauriaNoteType) => {
          return !existingNotifications.includes(note.code); // Vérifie si la notification est déjà planifiée
        });
        const notifications = notificationsToSchedule.map((note: MauriaNoteType) => {
          const date = new Date();
          date.setSeconds(date.getSeconds() + 10);
          return {
            title: "Nouvelle note !",
            body: `Vous avez une nouvelle note en ${note.epreuve}`,
            id: notificationCounter++, // Utilise un compteur pour générer des IDs uniques
            schedule: { at: date, allowWhileIdle: true },
          };
        });
        await LocalNotifications.schedule({
          notifications: notifications,
        });
        localStorage.setItem("scheduledNotifications", JSON.stringify([...existingNotifications, ...notificationsToSchedule.map((note: MauriaNoteType) => note.code)]));
      }
    }
    console.log("Données actualisées avec succès");
  } catch (e) {
    console.log("Erreur lors de l'actualisation automatique des données");
  }
  // interval de 4h pour les fetchs
  setTimeout(intervalFetch, 14400000);

  // setTimeout(intervalFetch, 30000);
}


const App = () => {
  useEffect(() => {
    intervalFetch(); // Appel initial de la fonction intervalFetch
  }, []);
  const { isDarkMode } = useDarkMode();
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContextProvider>
        <ModalContextProvider>
          <IonApp className={isDarkMode ? "dark" : ""}>
            <IonReactRouter>
              <IonRouterOutlet animation={RouterAnimation} placeholder={undefined}>
                <Route exact path="/login">
                  <Login />
                </Route>
                <Route
                  path="/app"
                  render={(props) => <AppRouter {...props} />}
                />
                <Route render={() => <Redirect to="/app/home" />} />
              </IonRouterOutlet>
            </IonReactRouter>
            <AppBackground />
          </IonApp>
        </ModalContextProvider>
      </ToastContextProvider>
    </QueryClientProvider>
  );
};
export default App;
