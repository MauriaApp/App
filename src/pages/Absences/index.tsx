import React, { useContext } from "react";
import Absence from "../../components/Pages/Absences/Absence";
import { fetchAbsences, getAbsences } from "../../utils/api/api";
import { useReadLocalStorage } from "usehooks-ts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCurrentYearAbsences,
  getJustifiedAbsencesDuration,
  getTotalAbsencesDuration,
  getUnjustifiedAbsencesDuration,
} from "./logic";
import { AurionAbsenceType } from "../../types/absence";
import Stats from "../../components/Pages/Absences/Stats";
import { ToastContext, ToastContextType } from "../../contexts/toastContext";
import PageTemplate from "../Template";
import YearSelector from "../../components/common/Features/YearSelector";

const absencesQuery = async (
  absences: AurionAbsenceType[] | null,
  isThisYear: boolean | null
) => {
  if (absences) {
    if (isThisYear) {
      return getCurrentYearAbsences(absences);
    }
    return absences;
  }
  const apiAbsences = await fetchAbsences();

  if (isThisYear) {
    return getCurrentYearAbsences(apiAbsences);
  }

  return apiAbsences;
};

const Absences = () => {
  const thisYear = useReadLocalStorage<boolean>("thisYear") ?? true;
  const absences = useReadLocalStorage<AurionAbsenceType[] | null>("absences");

  const { openToast } = useContext(ToastContext) as ToastContextType;

  const queryClient = useQueryClient();

  const { isLoading, data } = useQuery({
    queryKey: ["absences"],
    queryFn: async () => await absencesQuery(absences, thisYear),
    networkMode: "always",
  });

  const refreshMutation = useMutation({
    mutationFn: async (isThisYear: boolean) => {
      const apiAbsences = await fetchAbsences();

      if (isThisYear) {
        return getCurrentYearAbsences(apiAbsences);
      }

      return apiAbsences;
    },
    onSuccess: (data) => {
      openToast({
        type: "success",
        title: "Et hop !",
        content: "Absences actualisées avec succès !",
      });

      queryClient.setQueryData(["absences"], data);
    },
  });

  const yearFilterMutation = useMutation({
    mutationFn: async () => {
      const newYearState = !thisYear;
      if (newYearState) {
        return getCurrentYearAbsences(getAbsences());
      }

      return getAbsences();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["absences"], data);
    },
  });


  const handleRefresh = () => {
    refreshMutation.mutateAsync(thisYear).then(() => {
      absencesQuery(null, thisYear).then((data) => {
        queryClient.setQueryData(["absences"], data);
      });
    });
  };

  const handleToggle = () => {
    yearFilterMutation.mutate();
  };

  if (isLoading) {
    return <PageTemplate title={"Absences"} isLoading={true} />;
  }

  return (
    <PageTemplate title={"Absences"} onRefresh={handleRefresh}>
      <YearSelector handleToggle={handleToggle} />
      <Stats
        total={getTotalAbsencesDuration(data)}
        justified={getJustifiedAbsencesDuration(data)}
        unjustified={getUnjustifiedAbsencesDuration(data)}
      />

      {data.length > 0 ? (
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
