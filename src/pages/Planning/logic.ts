import {Calendar} from "@awesome-cordova-plugins/calendar";
import {AurionEventType} from "../../types/event";

// Fonction pour ajouter un événement au calendrier
export const getICS = async (planning: AurionEventType[] | null) => {
  try {
    // Vérifier si l'application a les autorisations nécessaires pour accéder au calendrier
    const autorisation = await Calendar.hasReadWritePermission();
    if (!autorisation) {
      // Si l'application n'a pas les autorisations, demander l'accès
      const demandeAutorisation = await Calendar.requestReadWritePermission();
      if (!demandeAutorisation) {
        // Si l'utilisateur refuse, sortir de la fonction
        return;
      }
    }

    // on récupère les cours
    let formatPlannings = planning ? planning : [];

    // trouver le lundi de la semaine actuelle
    let d = new Date();
    let day = d.getDay();
    let diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    let monday = new Date(d.setDate(diff));

    // on ajoute 12 jours pour avoir le samedi de la semaine +2
    let saturday = new Date(monday);
    saturday.setDate(monday.getDate() + 12);

    // on filtre les cours pour ne garder que ceux de la semaine actuelle
    formatPlannings = formatPlannings.filter(
      (event) =>
        new Date(event.start).getTime() >= monday.getTime() &&
        new Date(event.start).getTime() <= saturday.getTime()
    );

    // on supprime le calendrier avec le nom "Mauria" s'il existe
    const calendars = await Calendar.listCalendars();
    for (let calendar of calendars) {
      if (calendar.name === "Mauria") {
        await Calendar.deleteCalendar(calendar.name);
        // console.log("Calendrier supprimé");
      }
    }

    // on crée un calendar avec awesome-cordova-plugins/calendar
    const calendarName = "Mauria";
    const calendarOptions = {
      calendarName: calendarName,
      calendarColor: "#3F2A56",
    };

    for (let event of formatPlannings) {
      let d = new Date(event.start);
      let heureDebut = new Date(
        d.getFullYear(),
        d.getMonth(),
        d.getDate(),
        d.getHours(),
        d.getMinutes(),
        d.getSeconds()
      );

      d = new Date(event.end);
      let heureFin = new Date(
        d.getFullYear(),
        d.getMonth(),
        d.getDate(),
        d.getHours(),
        d.getMinutes(),
        d.getSeconds()
      );

      try {
        await Calendar.createEventWithOptions(
          event.title,
          "",
          event.title,
          heureDebut,
          heureFin,
          calendarOptions
        );
        // console.log("Événement ajouté au calendrier");
        // alert("Événement ajouté au calendrier !");
      } catch (error) {
        console.log("Error adding event to calendar:", error);
      }

    }
    console.log("Événements ajoutés au calendrier");
    alert("Événements ajoutés au calendrier !");
  } catch (erreur) {
    console.error("Erreur lors de l'ajout de l'événement au calendrier: ",erreur);
    alert("Erreur lors de l'ajout de l'événement au calendrier.");
  }
};
