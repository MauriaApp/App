// CalendarSelectModal.tsx
import React, { useState, useEffect } from 'react';
import { CapacitorCalendar, Calendar } from '@ebarooni/capacitor-calendar';
import Button from '../../../components/common/Layout/Button/Button';

interface CalendarSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (calendar: Calendar) => void;
}

const CalendarSelectModal: React.FC<CalendarSelectModalProps> = ({ isOpen, onClose, onSelect }) => {
  const [calendars, setCalendars] = useState<Calendar[]>([]);

  useEffect(() => {
    const fetchCalendars = async () => {
      try {
        const result = await CapacitorCalendar.listCalendars();
        setCalendars(result.result || []);
      } catch (error) {
        console.error("Erreur lors de la récupération des calendriers :", error);
      }
    };

    if (isOpen) {
      fetchCalendars();
    }

  }, [isOpen]);

  const handleSelect = (calendar: Calendar) => {
    onSelect(calendar);
    onClose();
  };

  return (
    <>
      <p>
        En cliquant, les anciennes données seront supprimées et les nouvelles données seront ajoutées à ce calendrier.
        <br/>
        Essayez d'utiliser le même calendrier pour éviter les doublons.
      </p>
      {calendars
        .filter((calendar) => calendar.title.includes('@'))
        .map((calendar) => (
          <Button
            key={calendar.id}
            size={"md"}
            variant={"accent"}
            onClick={() => handleSelect(calendar)}
          >
            {calendar.title}
          </Button>
        ))}
    </>
  );
};

export default CalendarSelectModal;
