import React, { useContext, useEffect, useState } from "react";
import Absence from "../../components/Pages/Absences/Absence";
import { fetchAbsences } from "../../utils/api/api";
import { useReadLocalStorage } from "usehooks-ts";
import { useMutation } from "@tanstack/react-query";
import {
  filterAbsencesBySchoolYear,
  getJustifiedAbsencesDuration,
  getTotalAbsencesDuration,
  getUnjustifiedAbsencesDuration,
} from "./logic";
import { AurionAbsenceType } from "../../types/absence";
import Stats from "../../components/Pages/Absences/Stats";
import { ToastContext, ToastContextType } from "../../contexts/toastContext";
import PageTemplate from "../Template";
import YearSelector from "../../components/common/Features/YearSelector";
import { useSchoolYear } from "../../contexts/schoolYearContext";


const Absences = () => {
  const { schoolYear, thisYear } = useSchoolYear();

  const { openToast } = useContext(ToastContext) as ToastContextType;

  const absences = useReadLocalStorage<AurionAbsenceType[] | null>("absences");

  const [data, setData] = useState<AurionAbsenceType[] | null>(absences);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      // setIsLoading(true);
      const absencesData = async () => {
        if (absences) {
          return filterAbsencesBySchoolYear(absences, schoolYear, thisYear);
        }
        const apiAbsences = await fetchAbsences();

        return filterAbsencesBySchoolYear(apiAbsences, schoolYear, thisYear);
      }

      setData(await absencesData());
      setIsLoading(false);
    };
    fetchData();
  }, [absences, thisYear, schoolYear]);


  const refreshMutation = useMutation({
    mutationFn: async (isThisYear: boolean) => {
      const apiAbsences = await fetchAbsences();

      return filterAbsencesBySchoolYear(apiAbsences, schoolYear, isThisYear);
    },
    onSuccess: (data) => {
      openToast({
        type: "success",
        title: "Et hop !",
        content: "Absences actualisées avec succès !",
      });

      setData(data);
      setIsLoading(false);
    },
  });

  const handleRefresh = (event: CustomEvent) => {
    refreshMutation.mutateAsync(thisYear).then(() => {
      event.detail.complete();
    });
  };

  if (isLoading) {
    return <PageTemplate title={"Absences"} isLoading={true} />;
  }

  return (
    <PageTemplate title={"Absences"} onRefresh={handleRefresh}>
      <YearSelector />
      {data && data.length > 0 ? (
        <>
          <Stats
            total={getTotalAbsencesDuration(data, schoolYear, thisYear)}
            justified={getJustifiedAbsencesDuration(data, schoolYear, thisYear)}
            unjustified={getUnjustifiedAbsencesDuration(data, schoolYear, thisYear)}
          />
          <div className={"list"}>
            {data.map((absence: AurionAbsenceType, index: number) => (
              <Absence
                key={absence.date + index}
                index={index}
                title={absence.type}
                class={absence.classe}
                duration={absence.duree}
                date={absence.date}
                interval={absence.heure}
              />
            ))}
          </div>
        </>
      ) : (
        <div className={"no-content-container"}>
          <span className={"no-content-text"}>
            Aucune absence à afficher pour le moment !
          </span>
        </div>
      )}
    </PageTemplate>
  );
};

export default Absences;
