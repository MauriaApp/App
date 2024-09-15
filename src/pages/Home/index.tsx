import React, { useCallback, useContext } from "react";

import {
  fetchAbsences,
  fetchEventJunia,
  fetchImportantMessage,
  fetchNotes,
  fetchPlanning,
  getFirstName,
} from "../../utils/api/api";

import HomeCalendar from "../../components/Pages/Home/Calendar";
import Message from "../../components/Pages/Home/Message";
import { fetchLivePlanning } from "../../utils/calendar";
import { MauriaEventType } from "../../types/event";
import EventComponent from "../../components/Pages/Home/Calendar/Event";

import {
  useEffectOnce,
  useLocalStorage,
  useReadLocalStorage,
} from "usehooks-ts";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { ToastContext, ToastContextType } from "../../contexts/toastContext";
import { ModalContext, ModalContextType } from "../../contexts/modalContext";
import WelcomeModalContent from "./WelcomeModalContent";
import PageTemplate from "../Template";

import styles from "./Home.module.scss";
import clsx from "clsx";
import EventJunia from "../../components/Pages/Home/Events";
import { Capacitor } from "@capacitor/core";
import { LocalNotifications } from "@capacitor/local-notifications";
import { AppUpdate } from "@capawesome/capacitor-app-update";
import { MauriaNoteType } from "../../types/note";


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
    fetchNotes();
    // console.log("Données en cours d'actualisation...");
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
    // console.log("Données actualisées avec succès");
  } catch (e) {
    console.log("Erreur lors de l'actualisation automatique des données");
  }
  // interval de 4h pour les fetchs
  setTimeout(intervalFetch, 14400000);

  // setTimeout(intervalFetch, 30000);
  // if (Capacitor) {
  //   const available = await AppUpdate.getAppUpdateInfo();
  //   console.log(available);
  // }
}

const calendarQuery = async (planning: MauriaEventType[] | null) => {
  if (!planning) {
    await fetchPlanning();
  }

  return fetchLivePlanning();
};

const messageQueryFunction = async () => {
  return await fetchImportantMessage();
};

const eventJuniaQueryFunction = async () => {
  return await fetchEventJunia();
};

const Home: React.FC = () => {

  const queryClient = useQueryClient();
  const livePlanning = useReadLocalStorage<MauriaEventType[] | null>(
    "livePlanning"
  );

  const [isFirstLaunch, setIsFirstLaunch] = useLocalStorage(
    "isFirstLaunch",
    true
  );

  const { openToast } = useContext(ToastContext) as ToastContextType;
  const { openModal } = useContext(ModalContext) as ModalContextType;

  const [messageQuery, planningQuery, eventQuery] = useQueries({
    queries: [
      {
        queryKey: ["message"],
        queryFn: async () => await messageQueryFunction(),
        networkMode: "always",
      },
      {
        queryKey: ["livePlanning"],
        queryFn: async () => await calendarQuery(livePlanning),
        networkMode: "always",
      },
      {
        queryKey: ["eventJunia"],
        queryFn: async () => await eventJuniaQueryFunction(),
        networkMode: "always",
      },
    ],
  });

  const refreshMutation = useMutation({
    mutationFn: async () => {
      const newPlanning = await fetchPlanning();
      return calendarQuery(newPlanning);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["livePlanning"], data);
      openToast({
        type: "success",
        title: "Et hop !",
        content: "Planning actualisé avec succès !",
      });
    },
  });

  const handleRefresh = useCallback((event: CustomEvent) => {
    refreshMutation.mutateAsync().then(() => {
      event.detail.complete();
    });
  }, [refreshMutation]);

  const updateMutation = useMutation({
    mutationFn: async () => {
      return fetchLivePlanning();
    },
    onSuccess: (data) => queryClient.setQueryData(["livePlanning"], data),
  });

  useEffectOnce(() => {

    console.log("isFirstLaunch", isFirstLaunch);

    
    if (!isFirstLaunch) {
      intervalFetch(); // Appel initial de la fonction intervalFetch
    }

    if (isFirstLaunch) {
      openModal(<WelcomeModalContent />, () => setIsFirstLaunch(false));
    }

    const interval = setInterval(() => {
      updateMutation.mutate();
    }, 10000);

    return () => clearInterval(interval);
  });

  const getIncomingEvents = (data: MauriaEventType[]) => {
    if (data) {
      return <HomeCalendar events={data} />;
    }

    return (
      <div className={"no-content-container"}>
        <span className={"no-content-text"}>
          Aucun cours à venir pour le moment
        </span>
      </div>
    );
  };

  if (planningQuery.isLoading || !planningQuery.data) {
    return (
      <PageTemplate title={`Hello ${getFirstName()} !`} isLoading={true}>
        {messageQuery.isLoading ? (
          <Message loading />
        ) : (
          <Message
            title={messageQuery.data?.title}
            content={messageQuery.data?.message}
          />
        )}
        <h2 className="sectionTitle text-primary">À venir...</h2>
      </PageTemplate>
    );
  }

  const data = planningQuery.data;

  return (
    <PageTemplate title={`Hello ${getFirstName()} !`} onRefresh={handleRefresh}>
      {messageQuery.isLoading ? (
        <Message loading />
      ) : (
        <Message
          title={messageQuery.data?.title}
          content={messageQuery.data?.message}
        />
      )}
      {data.planning &&
        data.planning.length > 0 &&
        data.planning[0].isCurrent && (
          <section>
            <h2
              className={clsx("sectionTitle text-primary", styles["day-title"])}
            >
              En ce moment
            </h2>
            <div className="sectionContent">
              <EventComponent
                id={data.planning[0].id}
                data={JSON.stringify(data.planning[0].data)}
                isCurrent={data.planning[0].isCurrent}
                title={data.planning[0].title}
                type={data.planning[0].type}
                startTime={data.planning[0].start}
                endTime={data.planning[0].end}
                teacher={data.planning[0].teacher}
                room={data.planning[0].room}
              />
            </div>
          </section>
        )}
      <section>
        <h2 className={clsx("sectionTitle text-primary", styles["day-title"])}>
          À venir {planningQuery.data.isTomorrow ? "demain" : "aujourd'hui"}
        </h2>
        {getIncomingEvents(data.planning)}
      </section>

      {eventQuery.isLoading ? (
        <EventJunia loading />
      ) : (
        <EventJunia events={eventQuery.data} />
      )}
    </PageTemplate>
  );
};

export default Home;
