// logic.ts
import { Calendar, CapacitorCalendar } from '@ebarooni/capacitor-calendar'; // Assurez-vous que le bon chemin d'importation est utilisé
import { AurionEventType } from '../../types/event';


// Fonction pour exporter les événements du calendrier vers le calendrier natif de l'appareil
export const exportCalendar = async (events: AurionEventType[], calendar: Calendar) => {
  try {
    // Demande de permission d'accès au calendrier
    const hasPermissions = await CapacitorCalendar.checkAllPermissions();

    if (hasPermissions.writeCalendar !== "granted" || hasPermissions.readCalendar !== "granted") {
      const permissions = await CapacitorCalendar.requestAllPermissions();

      if (permissions.writeCalendar !== "granted") {
        alert('Permission d\'écriture sur le calendrier refusée.');
        return;
      }
    }

    // Suppression des événements MAURIA de l'année précédente et de l'année suivante
    const eventsList = await CapacitorCalendar.listEventsInRange({
      startDate: new Date().setFullYear(new Date().getFullYear() - 1),
      endDate: new Date().setFullYear(new Date().getFullYear() + 1),
    });

    const eventsToDelete = eventsList.result.filter((event) => event.location === 'Mauria');
    const options = { ids: eventsToDelete.map((event) => event.id) };
    CapacitorCalendar.deleteEventsById(options);

    // Boucle sur chaque événement pour l'ajouter au calendrier natif
    const currentDate = new Date();
    const endDate = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days from now

    for (const event of events) {
      if (new Date(event.start) <= endDate) {
        await CapacitorCalendar.createEvent({
          calendarId: calendar.id,
          title: event.title || 'Événement sans titre',
          location: 'Mauria', // Ajouter l'emplacement si disponible
          notes: event.className || '', // Ajouter des notes si disponibles
          startDate: new Date(event.start).valueOf(),
          endDate: new Date(event.end).valueOf(),
          isAllDay: event.allDay || false,
        });
      }
    }

    alert(`Les événements ont été exportés avec succès vers ${calendar.title}`);
  } catch (error) {
    console.error('Erreur lors de l\'exportation des événements :', error);
    alert('Une erreur est survenue lors de l\'exportation du calendrier.');
  }
};


