import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { IonDatetime } from "@ionic/react";
import Input from "../../../components/common/Layout/Input/Input";
import Button from "../../../components/common/Layout/Button/Button";
import modalStyles from "../../../components/common/Layout/Modal/modal.module.scss";
import styles from "./AddEventModal.module.scss";
import { ToastContext, ToastContextType } from "../../../contexts/toastContext";
import { ModalContext, ModalContextType } from "../../../contexts/modalContext";
import { useDarkMode } from "usehooks-ts";
import clsx from "clsx";
import dayjs from "dayjs";
import Recap from "./Recap";
import {
  datePickerStyling,
  timePickerStyling,
} from "./timePickerStylingFunctions";

export const AddEventModalContent = ({setUserEvents}:any) => {

  const userEvents = JSON.parse(localStorage.getItem("userEvents") || "[]");

  const { isDarkMode } = useDarkMode();
  const pickerRef = useRef<null | HTMLIonDatetimeElement>(null);


  const initialStartDate = new Date();
  const initialEndDate = new Date(initialStartDate.getTime() + 30 * 60000);

  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<string>(new Date().toISOString());
  const [currentPicker, setCurrentPicker] = useState<"start" | "end">("start");
  const [pickerIsOpen, setPickerIsOpen] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<string>(
    initialStartDate.toISOString()
  );
  const [endTime, setEndTime] = useState<string>(initialEndDate.toISOString());

  const cancel = () => {
    pickerRef.current?.cancel();
    setPickerIsOpen(false);
  };
  const confirm = () => {
    pickerRef.current?.confirm();
    setPickerIsOpen(false);
  };

  const openPicker = (time: "start" | "end") => {
    if (time === currentPicker && pickerIsOpen) {
      setPickerIsOpen(false);
      return;
    }

    setCurrentPicker(time);
    setPickerIsOpen(true);
  };

  const { closeModal } = useContext(ModalContext) as ModalContextType;
  const { openToast } = useContext(ToastContext) as ToastContextType;

  const newEvent = (event: any) => {
    let tempDate = new Date(event.date);
    let tempTimeStart = new Date(event.timeStart);
    let tempTimeEnd = new Date(event.timeEnd);

    const eventDate =
      tempDate.getFullYear() +
      "-" +
      ("0" + (tempDate.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + tempDate.getDate()).slice(-2);
    const eventStart =
      ("0" + tempTimeStart.getHours()).slice(-2) +
      ":" +
      ("0" + tempTimeStart.getMinutes()).slice(-2) +
      ":00";
    const eventEnd =
      ("0" + tempTimeEnd.getHours()).slice(-2) +
      ":" +
      ("0" + tempTimeEnd.getMinutes()).slice(-2) +
      ":00";

    const newEvent = {
      id: new Date(eventDate + "T" + eventStart).getTime(),
      title: event.title + "\n " + eventStart + " - " + eventEnd,
      start: new Date(eventDate + "T" + eventStart),
      end: new Date(eventDate + "T" + eventEnd),
      allDay: false,
      editable: false,
      className: "est-perso",
    };

    localStorage.setItem(
      "userEvents",
      JSON.stringify([...(userEvents ?? []), newEvent])
    );
    
    setUserEvents([...(userEvents ?? []), newEvent]);

    //    if (calendarRef.current) {
    //      calendarRef.current.getApi().refetchEvents();
    //    }

    openToast({
      type: "success",
      title: "Événement ajouté !",
      content: "",
    });
  };

  const handlePickerChange = (value: any) => {
    setPickerIsOpen(false);

    if (currentPicker === "start") {
      setStartTime(value.detail.value);
      return;
    }
    setEndTime(value.detail.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(data.name, date, timeStart, timeEnd);
    if ([title, date, startTime, endTime].includes("") || startTime > endTime) {
      openToast({
        type: "error",
        title: "Erreur lors de l'ajout",
        content: "Vérifiez les champs !",
      });
    } else {
      newEvent({
        title,
        date,
        timeStart: startTime,
        timeEnd: endTime,
      });
      closeModal();
    }
  };

  const getTime = (time: string) => {
    return dayjs(time).format("HH:mm");
  };

  useEffect(() => {
    datePickerStyling(isDarkMode);
    timePickerStyling(isDarkMode);
  }, [isDarkMode]);

  return (
    <form className={styles["form"]} onSubmit={handleSubmit}>
      <header className={modalStyles["headerModal"]}>
        <h2 className={"sectionTitle text-primary no-margins"}>
          Ajouter un événement
        </h2>
      </header>
      <Input
        placeholder={"Titre de l'événement"}
        type={"text"}
        value={title}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
      />

      <IonDatetime
        locale="fr-FR"
        mode={"ios"}
        id={"datePicker"}
        className={styles["datepicker"]}
        placeholder="Date de début"
        firstDayOfWeek={1}
        min={new Date().toISOString()}
        onIonChange={(value) => setDate((value.detail.value as string) ?? "")}
        presentation="date"
      />
      <div className={styles["time-container"]}>
        <div className={styles["time-header"]}>
          <div className={styles["time-group"]}>
            De
            <div
              className={styles["time-value-container"]}
              onClick={() => openPicker("start")}
            >
              {getTime(startTime)}
            </div>
          </div>

          <div className={styles["time-group"]}>
            jusqu'à
            <div
              className={styles["time-value-container"]}
              onClick={() => openPicker("end")}
            >
              {getTime(endTime)}
            </div>
          </div>
        </div>
        <div
          className={clsx(
            styles["time-picker"],
            pickerIsOpen && styles["is-open"]
          )}
        >
          <IonDatetime
            ref={pickerRef}
            className={styles["picker"]}
            mode={"ios"}
            locale="fr-FR"
            id={"timePicker"}
            onIonChange={handlePickerChange}
            presentation="time"
            color="primary" placeholder={undefined}          >
            <span slot={"title"} className={styles["time-picker-title"]}>
              Horaire de {currentPicker === "start" ? "début" : "fin"}
            </span>
            <div slot="buttons" className={styles["datetime-buttons"]}>
              <div onClick={cancel} className={styles["cancel"]}>
                Annuler
              </div>
              <div onClick={confirm} className={styles["confirm"]}>
                Confirmer
              </div>
            </div>
          </IonDatetime>
        </div>
      </div>

      {title !== "" && (
        <Recap
          title={"On récapitule :"}
          eventTitle={title}
          date={date}
          startTime={startTime}
          endTime={endTime}
        />
      )}

      <Button variant={"accent"} type={"submit"} disabled={title.length === 0}>
        Ajouter
      </Button>
    </form>
  );
};

export default AddEventModalContent;
