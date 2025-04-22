import { AurionAbsenceType } from "../../types/absence";
import { parse } from "date-fns";

// Filtre les absences par année scolaire
export const filterAbsencesBySchoolYear = (
  absences: AurionAbsenceType[] | null,
  schoolYear: number | null,
  thisYear: boolean
): AurionAbsenceType[] => {
  if (!absences || !schoolYear) return absences ?? [];

  if (!thisYear) return absences ?? [];

  const formattedYear = parseInt(`20${schoolYear.toString().slice(-2)}`);

  const schoolYearStart = new Date(`${formattedYear -1}-09-01`);
  const schoolYearEnd = new Date(`${formattedYear}-08-31`);

  // console.log(schoolYearStart, schoolYearEnd);

  return absences.filter((absence) => {
    const absenceDate = parse(absence.date, "dd/MM/yy", new Date());
    return absenceDate >= schoolYearStart && absenceDate <= schoolYearEnd;
  });
};

// Calcule la durée totale des absences selon un filtre facultatif
export const computeAbsenceDuration = (
  absences: AurionAbsenceType[] | null,
  schoolYear: number,
  thisYear: boolean,
  typeFilter?: (absence: AurionAbsenceType) => boolean
): string => {
  let filtered = thisYear ? filterAbsencesBySchoolYear(absences, schoolYear, thisYear) : absences ?? [];

  if (typeFilter) {
    filtered = filtered.filter(typeFilter);
  }

  const total = filtered.reduce(
    (acc, absence) => {
      const [h, m] = absence.duree.split(":").map(Number);
      return { hours: acc.hours + h, minutes: acc.minutes + m };
    },
    { hours: 0, minutes: 0 }
  );

  const hoursCarry = Math.floor(total.minutes / 60);
  const minutesLeft = total.minutes % 60;

  return `${total.hours + hoursCarry}h${minutesLeft.toString().padStart(2, "0")}`;
};

// Total toutes absences
export const getTotalAbsencesDuration = (
  absences: AurionAbsenceType[] | null,
  schoolYear: number,
  thisYear = false
) => computeAbsenceDuration(absences, schoolYear, thisYear);

// Absences justifiées (type sans "non")
export const getJustifiedAbsencesDuration = (
  absences: AurionAbsenceType[] | null,
  schoolYear: number,
  thisYear = false
) =>
  computeAbsenceDuration(
    absences,
    schoolYear,
    thisYear,
    (absence) => !absence.type.includes(" non ")
  );

// Absences non justifiées (type contient "non")
export const getUnjustifiedAbsencesDuration = (
  absences: AurionAbsenceType[] | null,
  schoolYear: number,
  thisYear = false
) =>
  computeAbsenceDuration(
    absences,
    schoolYear,
    thisYear,
    (absence) => absence.type.includes(" non ")
  );
