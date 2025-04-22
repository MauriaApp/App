// src/contexts/SchoolYearContext.tsx
import React, { createContext, useContext, useMemo, useState, useCallback } from "react";

type SchoolYearContextType = {
  schoolYear: number;
  thisYear: boolean;
  toggleYear: () => void;
};

const SchoolYearContext = createContext<SchoolYearContextType | undefined>(undefined);

export const SchoolYearProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [thisYear, setThisYear] = useState<boolean>(true);

  const toggleYear = useCallback(() => {
    setThisYear((prev) => !prev);
  }, []);

  const schoolYear = useMemo(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    let currentYear = currentDate.getFullYear();
    if (currentMonth >= 9) currentYear++;
    const lastYear = currentYear % 100;
    return (lastYear - 1) * 100 + lastYear;
  }, []);

  const value = useMemo(() => ({ schoolYear, thisYear, toggleYear }), [schoolYear, thisYear, toggleYear]);

  return (
    <SchoolYearContext.Provider value={value}>
      {children}
    </SchoolYearContext.Provider>
  );
};

export const useSchoolYear = (): SchoolYearContextType => {
  const context = useContext(SchoolYearContext);
  if (!context) throw new Error("useSchoolYear must be used within a SchoolYearProvider");
  return context;
};
