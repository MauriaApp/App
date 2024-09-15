import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import FullCalendar from "@fullcalendar/react";
import FrLocale from "@fullcalendar/core/locales/fr";

import { useContext, useRef, useState } from "react";
import Button from "../../components/common/Layout/Button/Button";
import { fetchPlanning } from "../../utils/api/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useReadLocalStorage } from "usehooks-ts";
import { AurionEventType } from "../../types/event";
import { ToastContext, ToastContextType } from "../../contexts/toastContext";
import "./planning.scss";
import styles from "./planning.module.scss";
import { ModalContext, ModalContextType } from "../../contexts/modalContext";
import { exportCalendar } from "./logic";
import AddEventModalContent from "./AddEventModal";
import ModifyEventModalContent from "./ModifyEventModal";
import dayjs from "dayjs";
import PageTemplate from "../Template";
import moment from "moment-timezone";
import CalendarSelectModal from "./Calendar";
import { Calendar } from "@ebarooni/capacitor-calendar";


const calendarQuery = async (planning: AurionEventType[] | null) => {
  if (planning) {
    return planning;
  }
  return await fetchPlanning();
};

const Planning = () => {
  const queryClient = useQueryClient();

  const storedPlanning = useReadLocalStorage<AurionEventType[] | null>(
    "planning"
  );

  const [userEvents, setUserEvents] = useState(
    JSON.parse(localStorage.getItem("userEvents") || "[]")
  );


  const { isLoading, data } = useQuery({
    queryKey: ["planning"], // Ajoutez userEvents comme dépendance
    queryFn: async () => await calendarQuery(storedPlanning),
    networkMode: "always",
  });

  const { openToast } = useContext(ToastContext) as ToastContextType;

  const refreshMutation = useMutation({
    mutationFn: async () => {
      return fetchPlanning();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["planning"], data);
      openToast({
        type: "success",
        title: "Et hop !",
        content: "Planning actualisé avec succès",
      });
    },
  });

  const handleRefresh = (event: CustomEvent) => {
    refreshMutation.mutateAsync().then(() => {
      event.detail.complete();
    });
  };

  const { openModal } = useContext(ModalContext) as ModalContextType;
  const { closeModal } = useContext(ModalContext) as ModalContextType;


  const calendarRef = useRef<FullCalendar>(null);
  // const lastUpdate = useReadLocalStorage<Date>("lastPlanningUpdate");

  // problème avec la date, le type était pas lu par useReadLocalStorage (v2.9.1 de usehooks-ts)
  const lastUpdate = localStorage.getItem("lastPlanningUpdate");

  const openAddEventModal = () => {
    openModal(<AddEventModalContent setUserEvents={setUserEvents} />);
  };

  const openModifyModal = (event: any) => {
    openModal(
      <ModifyEventModalContent {...event} setUserEvents={setUserEvents} />
    );
  };

  const AddEventButton = () => (
    <Button
      className={styles["create-event-button"]}
      onClick={openAddEventModal}
      variant={"accent"}
      round
    >
      +
    </Button>
  );

  // Gestion de l'export du calendrier
  const handleExportCalendar = () => {
    openModal(<CalendarSelectModal
        isOpen={true}
        onClose={() => closeModal()}
        onSelect={handleSelectCalendar}
      />);
  };

  const handleSelectCalendar = async (calendar: Calendar) => {
    if (data) {
      await exportCalendar(data, calendar); // Passez le calendrier sélectionné à exportCalendar
    }
    closeModal();
  };

  if (isLoading) {
    return (
      <PageTemplate
        title={"Planning"}
        onRefresh={handleRefresh}
        isLoading
      />
    );
  }

  return (
    <PageTemplate
      title={"Planning"}
      onRefresh={handleRefresh}
      header={<AddEventButton />}
    >
      <section>
        <FullCalendar
          datesSet={() => {
            window.dispatchEvent(new Event('resize'));
          }}
          ref={calendarRef}
          locale={FrLocale}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: "today",
            center: "timeGridWeek,timeGridDay",
            right: "prev,next",
          }}
          slotMinTime="07:00:00"
          slotMaxTime="22:00:00"
          titleFormat={{ month: "short", day: "numeric" }}
          allDaySlot={false}
          firstDay={0}
          hiddenDays={[0]}
          eventSources={[data, userEvents]}
          eventColor="#3f2a56"
          contentHeight="auto"
          nowIndicator={true}
          stickyHeaderDates={false}
          editable={false}
          eventAllow={() => false}
          droppable={false}
          eventStartEditable={false}
          eventDurationEditable={false}
          eventResizableFromStart={false}
          // eventDragMinDistance={0}

          eventClick={(info) => {
            const startTime = moment(info.event.start).tz('Europe/Paris').format('HH:mm');
            const endTime = moment(info.event.end).tz('Europe/Paris').format('HH:mm');

            const newEvent = { ...info.event, start: startTime, end: endTime };

            openModifyModal(newEvent);
          }}
        />
        <div className="last-update">
          Dernière actualisation :{" "}
          {lastUpdate ? dayjs(lastUpdate).fromNow() : "jamais"}
        </div>
      </section>

      <Button size="sm" round onClick={handleExportCalendar}>
        Exporter le planning
      </Button>


    </PageTemplate>
  );
};

export default Planning;
