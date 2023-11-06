import { AurionAbsenceType } from "../../types/absence";
import { parse } from 'date-fns';

export const getCurrentYearAbsences = (
    absences: AurionAbsenceType[] | null
  ) => {
    if (!absences) {
      return null;
    }
  
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();  // janvier = 0, décembre = 11
    const currentYear = currentDate.getFullYear();
  
    // Définir la date de début et de fin de l'année scolaire
    let schoolYearStart: Date, schoolYearEnd : Date;

    if (currentMonth >= 8) {
      schoolYearStart = new Date(currentYear, 8, 1); // septembre = 8
      schoolYearEnd = new Date(currentYear + 1, 6, 31); // juillet = 6
    } else {
      schoolYearStart = new Date(currentYear - 1, 8, 1);
      schoolYearEnd = new Date(currentYear, 6, 31);
    }
    
  
    if (currentMonth >= 8) {
      // Si le mois actuel est août ou plus tard, l'année scolaire commence en septembre de cette année
      schoolYearStart = new Date(currentYear, 8, 1); // septembre = 8
      schoolYearEnd = new Date(currentYear + 1, 6, 31); // juillet = 6
    } else {
      // Si le mois actuel est antérieur à août, l'année scolaire commence en septembre de l'année précédente
      schoolYearStart = new Date(currentYear - 1, 8, 1);
      schoolYearEnd = new Date(currentYear, 6, 31);
    }
  
    return absences.filter((absence: AurionAbsenceType) => {
      const absenceDate = parse(absence.date, 'dd/MM/yy', new Date());    
      return (
        absenceDate >= schoolYearStart && absenceDate <= schoolYearEnd
      );
    });
  };
  



export const getTotalAbsencesDuration = (
  absences: AurionAbsenceType[] | null,
  thisYear?: boolean
) => {
  let absenceList: AurionAbsenceType[] | null = absences;

  if (thisYear) {
    absenceList = getCurrentYearAbsences(absences);
  }

  if (!absenceList) {
    return "00h00";
  }

  const hours = absenceList.reduce((accumulator, absence) => {
    return accumulator + parseInt(absence.duree.split(":")[0]);
  }, 0);
  const minutes = absenceList.reduce((accumulator, absence) => {
    return accumulator + parseInt(absence.duree.split(":")[1]);
  }, 0);

  const timeCarry = handleTimeCarry(minutes);
  return `${hours + timeCarry.hoursCarry}h${formatMinutes(
    timeCarry.minutesLeft
  )}`;
};

export const getJustifiedAbsencesDuration = (
  absences: AurionAbsenceType[] | null,
  thisYear?: boolean
) => {
  let absenceList: AurionAbsenceType[] | null = absences;

  if (thisYear) {
    absenceList = getCurrentYearAbsences(absences);
  }

  if (!absenceList) {
    return "00h00";
  }

  const hours = absenceList.reduce((accumulator, absence) => {
    if (absence.type.includes(" non ")) {
      return accumulator;
    }

    return accumulator + parseInt(absence.duree.split(":")[0]);
  }, 0);
  const minutes = absenceList.reduce((accumulator, absence) => {
    if (absence.type.includes(" non ")) {
      return accumulator;
    }
    return accumulator + parseInt(absence.duree.split(":")[1]);
  }, 0);

  const timeCarry = handleTimeCarry(minutes);
  return `${hours + timeCarry.hoursCarry}h${formatMinutes(
    timeCarry.minutesLeft
  )}`;
};

export const getUnjustifiedAbsencesDuration = (
  absences: AurionAbsenceType[] | null,
  thisYear?: boolean
) => {
  let absenceList: AurionAbsenceType[] | null = absences;

  if (thisYear) {
    absenceList = getCurrentYearAbsences(absences);
  }

  if (!absenceList) {
    return "00h00";
  }

  const hours = absenceList.reduce((accumulator, absence) => {
    if (!absence.type.includes(" non ")) {
      return accumulator;
    }

    return accumulator + parseInt(absence.duree.split(":")[0]);
  }, 0);
  const minutes = absenceList.reduce((accumulator, absence) => {
    if (!absence.type.includes(" non ")) {
      return accumulator;
    }
    return accumulator + parseInt(absence.duree.split(":")[1]);
  }, 0);

  const timeCarry = handleTimeCarry(minutes);

  return `${hours + timeCarry.hoursCarry}h${formatMinutes(
    timeCarry.minutesLeft
  )}`;
};

const handleTimeCarry = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const minutesLeft = minutes % 60;

  return { hoursCarry: hours, minutesLeft };
};

const formatMinutes = (minutes: number) => {
  if (minutes < 10) {
    return "0" + minutes;
  }

  return minutes;
};