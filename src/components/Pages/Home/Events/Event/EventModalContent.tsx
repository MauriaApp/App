import { FC } from "react";
import styles from "./EventModal.module.scss";
import clsx from "clsx";
import modalStyles from "../../../../../components/common/Layout/Modal/modal.module.scss";
import Button from "../../../../common/Layout/Button/Button";
import { DateTimeFormatOptions } from "intl";

// import Button from "../../../../common/Layout/Button/Button";

type Event = {
  event: EventProps;
};

type EventProps = {
  id: number;
  title: string;
  description: string;
  start: string;
  end: string;
  duration: string;
  location: string;
  image: string;
};

const EventModalContent: FC<Event> = ({
  event: { title, start, end, location, description },
}) => {

  const options: DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };



    const startDateTime = new Date(start);
    startDateTime.setHours(startDateTime.getHours() - 1);
    const formattedStart = startDateTime.toLocaleDateString('fr-FR', options);

    const endDateTime = new Date(end);
    endDateTime.setHours(endDateTime.getHours() - 1);
    const formattedEnd = endDateTime.toLocaleDateString('fr-FR', options);


    return (
      <>
        <header
          className={clsx(modalStyles["headerModal"], modalStyles["column"])}
        >
          <h3 className={clsx(styles["note"], "no-margins text-accent")}>
            {title}
          </h3>

          <span className={styles["texte"]}>
          <span className={styles["date"]}>De </span>{formattedStart} <br></br>
          <span className={styles["date"]}>à </span> {formattedEnd}</span>
        </header>
        <div className={modalStyles["content"]}>
          <section>
            <h2 className={styles["texte"]}>
              <span className={styles["date"]}>Localisation :  </span>
              {location}
            </h2>

            <div style={{ marginTop: "20px" }}>
              <h2 className={styles["texte"]}>
                <span className={styles["date"]}>Description : </span>
                {description}
              </h2>
            </div>

          </section>


          <section className={styles["section"]}>
            <Button variant={"accent"} onClick={() => { }}>
              Voir plus
            </Button>
          </section>

        </div>
      </>
    );
  };

  export default EventModalContent;
