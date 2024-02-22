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
import { scheduleNotification } from "../../../utils/notifications";

export const AddTaskModalContent = () => {

  const userTask = JSON.parse(localStorage.getItem("userTasks") ?? "[]");

  const { isDarkMode } = useDarkMode();
  const pickerRef = useRef<null | HTMLIonDatetimeElement>(null);

  const initialStartDate = new Date();

  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<string>(new Date().toISOString());
  const [currentPicker, setCurrentPicker] = useState<"start" | "end">("start");
  const [pickerIsOpen, setPickerIsOpen] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<string>(
    initialStartDate.toISOString()
  );

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

  const newEvent = async (event: any) => {
    let tempDate = new Date(event.date);
    let tempTimeStart = new Date(event.timeStart);

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

    const newEvent = {
      id: Math.floor(Math.random() * 1000000000),
      title: event.title,
      start: new Date(eventDate + "T" + eventStart),
    };

    localStorage.setItem(
      "userTasks",
      JSON.stringify([...(userTask ?? []), newEvent])
    );

    try {
      // new Date(event.start + "T" + eventStart) - 1h
      const date1 = new Date(newEvent.start);
      date1.setHours(date1.getHours() - 1);

      await scheduleNotification(
        event.title,
        "Tâche à faire dans 1h !",
        newEvent.id,
        date1
      );
    } catch (e) {
      console.error(e);
    }

    
    try {
      // new Date(event.start + "T" + eventStart) - 24h
      const date2 = new Date(newEvent.start);
      date2.setHours(date2.getHours() - 24);

      await scheduleNotification(
        event.title,
        "Tâche à faire dans 24h !",
        newEvent.id * 2,
        date2
      );
    } catch (e) {
      console.error(e);
    }






    openToast({
      type: "success",
      title: "Tâche ajoutée !",
      content: "",
    });
  };

  const handlePickerChange = (value: any) => {
    setPickerIsOpen(false);

    if (currentPicker === "start") {
      setStartTime(value.detail.value);
      return;
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(data.name, date, timeStart, timeEnd);
    if ([title, date, startTime].includes("")) {
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
          Ajouter une tâche
        </h2>
      </header>
      <Input
        placeholder={"Description de la tâche"}
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
            À
            <div
              className={styles["time-value-container"]}
              onClick={() => openPicker("start")}
            >
              {getTime(startTime)}
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
        />
      )}

      <Button variant={"accent"} type={"submit"} disabled={title.length === 0}>
        Ajouter
      </Button>
    </form>
  );
};

export default AddTaskModalContent;
