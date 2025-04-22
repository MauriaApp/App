// src/contexts/ErrorContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

type ErrorContextType = {
    setError: (message: string) => void;
};

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (error) {
            console.error("Erreur captée :", error);
        }
    }, [error]);

    if (error) {
        return <Redirect to="/app/home" />;
    }

    return (
        <ErrorContext.Provider value={{ setError }}>
            {children}
        </ErrorContext.Provider>
    );
};

export const useErrorContext = () => {
    const context = useContext(ErrorContext);
    if (!context) {
        throw new Error("useErrorContext must be used within an ErrorProvider");
    }
    return context;
};
