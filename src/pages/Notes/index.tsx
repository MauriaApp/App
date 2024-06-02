import React, { useContext } from "react";
import { useEffectOnce, useLocalStorage, useReadLocalStorage, } from "usehooks-ts";
import { fetchNotes } from "../../utils/api/api";
import { MauriaNoteStatsType, MauriaNoteType } from "../../types/note";
import { getCurrentYearMergedNotesData, mergeNewNotesData, mergeNotesData } from "./logic";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Note from "../../components/Pages/Notes/Note";
import { ToastContext, ToastContextType } from "../../contexts/toastContext";
import PageTemplate from "../Template";
import YearSelector from "../../components/common/Features/YearSelector";


// Récupère l'année scolaire actuelle
const currentDate = new Date(); // Date actuelle, vous pouvez la changer pour tester
let currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1; // Les mois sont indexés de 0 à 11
// Si le mois actuel est après septembre (10 correspond à octobre)
if (currentMonth >= 9) {
  currentYear++; // Passe à l'année suivante
}
// Maintenant, vous pouvez calculer l'année scolaire
const lastYear = currentYear % 100; // Obtenez les deux derniers chiffres de l'année
const schoolYear = (lastYear - 1) * 100 + lastYear;
// console.log(schoolYear); // Cela affichera l'année scolaire correcte, par exemple, 2023 pour l'année 2023-2024


//  Récupère les notes de l'année scolaire actuelle
const notesQuery = async (localNote: MauriaNoteType[], isThisYear: boolean) => {
  if (localNote && localNote.length > 0) {
    return mergeNotesData(isThisYear, schoolYear);
  }
  await fetchNotes();
  return mergeNotesData(isThisYear, schoolYear);
};

const Notes: React.FC = () => {
  const thisYear = useReadLocalStorage<boolean>("thisYear") ?? true;

  const currentNotes = useReadLocalStorage<MauriaNoteType[]>(
    "notes"
  ) as MauriaNoteType[];

  const [newNotes, setNewNotes] = useLocalStorage<MauriaNoteType[]>(
    "newNotes",
    []
  );

  const { openToast } = useContext(ToastContext) as ToastContextType;

  const queryClient = useQueryClient();

  const { isLoading, data } = useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      return await notesQuery(currentNotes, thisYear);
    },
    networkMode: "always",
    cacheTime: 0, // https://tanstack.com/query/latest/docs/react/guides/caching?from=reactQueryV3&original=https%3A%2F%2Ftanstack.com%2Fquery%2Fv3%2Fdocs%2Fguides%2Fcaching
  });

  const refreshMutation = useMutation({
    mutationFn: async (isThisYear: boolean) => {
      await fetchNotes();
      return mergeNotesData(isThisYear, schoolYear);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["notes"], data);
      setNewNotes(JSON.parse(localStorage.getItem("newNotes") || "[]"));

      openToast({
        type: "success",
        title: "Et hop !",
        content: "Notes actualisées avec succès",
      });
    },
  });

  const yearFilterMutation = useMutation({
    mutationFn: async () => {
      const newYearState = !thisYear;
      return mergeNotesData(newYearState, schoolYear);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["notes"], data);
    },
  });

  const handleRefresh = (event: CustomEvent) => {
    refreshMutation.mutateAsync(thisYear).then(() => event.detail.complete());
  };

  const handleToggle = () => {
    yearFilterMutation.mutate();
  };


  if (isLoading) {
    return <PageTemplate title={"Notes"} isLoading />;
  }

  return (
    <PageTemplate title={"Notes"} onRefresh={handleRefresh}>
      <YearSelector handleToggle={handleToggle} />

      {(((getCurrentYearMergedNotesData(data ?? [], schoolYear) ?? []).length === 0) && thisYear) ? (
        <div className={"no-content-container"}>
          <span className={"no-content-text"}>
            Aucune note cette année !
          </span>
        </div>
      ) : (
        <>
          {newNotes.length > 0 && (
            <section>
              <h2 className="sectionTitle text-primary">Nouvelles notes ! </h2>
              <div className={"list"}>
                {mergeNewNotesData(thisYear, schoolYear)?.map(
                  (element, index: number) => (
                    <Note
                      key={element.note.code}
                      index={index}
                      exam={element.note}
                    />
                  )
                )}
              </div>
            </section>
          )}

          <section>
            {newNotes.length > 0 && (
              <h2 className="sectionTitle text-primary">Toutes les notes : </h2>
            )}
            <div className={"list"}>
              {data ? (
                data.map((element, index: number) => (
                  <Note
                    key={element.note.code}
                    index={newNotes.length + index}
                    exam={element.note}
                  />
                ))
              ) : (
                <div className={"no-content-container"}>
                  <span className={"no-content-text"}>
                    Aucune note à afficher pour le moment !
                  </span>
                </div>
              )}
            </div>
          </section>

        </>
      )}
    </PageTemplate>
  );
};

export default Notes;