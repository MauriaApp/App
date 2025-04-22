import React, { useContext, useEffect, useState } from "react";
import { useLocalStorage, useReadLocalStorage } from "usehooks-ts";
import { fetchNotes } from "../../utils/api/api";
import { MauriaNoteStatsType, MauriaNoteType } from "../../types/note";
import { getCurrentYearMergedNotesData, mergeNewNotesData, mergeNotesData } from "./logic";
import Note from "../../components/Pages/Notes/Note";
import { ToastContext, ToastContextType } from "../../contexts/toastContext";
import PageTemplate from "../Template";
import YearSelector from "../../components/common/Features/YearSelector";
import Input from "../../components/common/Layout/Input/Input";
import { useSchoolYear } from "../../contexts/schoolYearContext";

const Notes: React.FC = () => {
  const { schoolYear, thisYear } = useSchoolYear();

  const currentNotes = useReadLocalStorage<MauriaNoteType[]>("notes") as MauriaNoteType[] || [];
  const [newNotes, setNewNotes] = useLocalStorage<MauriaNoteType[]>("newNotes", []);

  const { openToast } = useContext(ToastContext) as ToastContextType;

  const [notes, setNotes] = useState<{ note: MauriaNoteType, stats?: MauriaNoteStatsType }[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<{ note: MauriaNoteType, stats?: MauriaNoteStatsType }[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);


  // Fetch initial notes (local then remote)
  const loadNotes = async () => {
    setIsLoading(true);
    // console.log(newNotes.length, currentNotes.length, "new notes", "current notes");

    if (currentNotes.length > 0) {
      const merged = mergeNotesData(thisYear, schoolYear);      
      if (!merged) {
        setIsLoading(false);
        return;
      }
      setNotes(merged);

    } else {
      await fetchNotes();
      const merged = mergeNotesData(thisYear, schoolYear);
      if (!merged) {
        setIsLoading(false);
        return;
      }
      setNotes(merged);
    }
    setIsLoading(false);
  };

  useEffect(() => { loadNotes(); }, [schoolYear, thisYear]);

  useEffect(() => {
    setFilteredNotes(notes);
  }, [notes]);

  const handleRefresh = async (event: CustomEvent) => {
    await fetchNotes();
    const merged = mergeNotesData(thisYear, schoolYear);
    if (!merged) {
      setIsLoading(false);
      return;
    }
    setNotes(merged);
    setNewNotes(JSON.parse(localStorage.getItem("newNotes") || "[]")); // re-sync
    openToast({
      type: "success",
      title: "Et hop !",
      content: "Notes actualisées avec succès",
    });
    event.detail.complete();
  };

  const handleSearch = (e: any) => {
    const search = e.target.value.toLowerCase();
    if (search !== "") {
      setFilteredNotes(
        notes.filter((note) => note.note.epreuve.toLowerCase().includes(search))
      );
    } else {
      setFilteredNotes(notes);
    }
  };

  if (isLoading) {
    return <PageTemplate title={"Notes"} isLoading />;
  }

  const currentYearNotes = getCurrentYearMergedNotesData(notes, schoolYear) ?? [];

  return (
    <PageTemplate title={"Notes"} onRefresh={handleRefresh}>
      <YearSelector />

      {(currentYearNotes.length === 0 && thisYear) ? (
        <div className={"no-content-container"}>
          <span className={"no-content-text"}>
            Aucune note cette année !
          </span>
        </div>
      ) : (
        <>
          <Input placeholder={"Chercher une note..."} onChange={handleSearch} />

          {newNotes.length > 0 && (
            <section>
              <h2 className="sectionTitle text-primary">Nouvelles notes !</h2>
              <div className={"list"}>
                {mergeNewNotesData(thisYear, schoolYear)?.map((element, index: number) => (
                  <Note key={element.note.code} index={index} exam={element.note} />
                ))}
              </div>
            </section>
          )}

          <section>
            {newNotes.length > 0 && (
              <h2 className="sectionTitle text-primary">Toutes les notes :</h2>
            )}
            <div className={"list"}>
              {filteredNotes.length > 0 ? (
                filteredNotes.map((element, index) => (
                  <Note key={element.note.code} index={newNotes.length + index} exam={element.note} />
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