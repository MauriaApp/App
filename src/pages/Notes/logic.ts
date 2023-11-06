import { MauriaNoteStatsType, MauriaNoteType } from "../../types/note";

export const getCurrentYearMergedNotesData = (
  mergedNotesData: { note: MauriaNoteType; stats?: MauriaNoteStatsType }[],
  currentYear: number
) => {
  // remove all undefined values
  return mergedNotesData.filter((noteData) => {
    const noteDate = Number(noteData.note.code.split("_")[0]);
    return noteDate === currentYear;
  });
};

export const mergeNotesData = (
  getThisYearNotes: boolean,
  currentYear: number
) => {
  const userStats = JSON.parse(
    localStorage.getItem("userStats") || "null"
  ) as MauriaNoteStatsType[];
  const notes = JSON.parse(
    localStorage.getItem("notes") || "null"
  ) as MauriaNoteType[];

  if (!notes) {
    return null;
  }

  const mergedNotesData: {
    note: MauriaNoteType;
    stats?: MauriaNoteStatsType;
  }[] = [];

  const notesCodes = notes.map(({ code }) => code);

  // Remove all notes duplicates having the same code
  const mergedNotes = notes.filter(
    ({ code }, index) => !notesCodes.includes(code, index + 1)
  );

  mergedNotes.forEach((note) => {
    const stats = userStats?.find((stat) => (stat.code === note.code));
    return mergedNotesData.push({ note, stats });
  });


  if (getThisYearNotes) {
    return getCurrentYearMergedNotesData(mergedNotesData, currentYear);
  }

  return mergedNotesData;
};



export const mergeNewNotesData = (
  getThisYearNotes: boolean,
  currentYear: number
) => {
  const userStats = JSON.parse(
    localStorage.getItem("userStats") || "null"
  ) as MauriaNoteStatsType[];
  const notes = JSON.parse(
    localStorage.getItem("newNotes") || "null"
  ) as MauriaNoteType[];

  if (!notes) {
    return null;
  }

  const mergedNotesData: {
    note: MauriaNoteType;
    stats?: MauriaNoteStatsType;
  }[] = [];

  const notesCodes = notes.map(({ code }) => code);

  // Remove all notes duplicates having the same code
  const mergedNotes = notes.filter(
    ({ code }, index) => !notesCodes.includes(code, index + 1)
  );

  mergedNotes.forEach((note) => {
    const stats = userStats?.find((stat) => (stat.code === note.code));
    return mergedNotesData.push({ note, stats });
  });


  if (getThisYearNotes) {
    return getCurrentYearMergedNotesData(mergedNotesData, currentYear);
  }

  return mergedNotesData;
};
