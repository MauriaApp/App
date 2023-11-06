import { createContext, ReactNode, useState } from "react";

type ToastType = "error" | "success" | "information";

export type ToastContextType = {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  icon: ReactNode | null;
  type: ToastType;
  title: string;
  content: string;

  openToast: ({
    type,
    title,
    content,
    icon,
  }: {
    type: ToastType;
    title: string;
    content?: string;
    icon?: ReactNode;
  }) => void;
};

export const ToastContext = createContext<ToastContextType | null>(null);

export const ToastContextProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [icon, setIcon] = useState<ReactNode | null>(null);
  const [type, setType] = useState<"error" | "success" | "information">(
    "information"
  );
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const openToast = ({
    type,
    title,
    content,
    icon,
  }: {
    type: ToastType;
    title: string;
    content?: string;
    icon?: ReactNode;
  }) => {
    setType(type);
    setTitle(title);
    setContent(content || "");
    icon && setIcon(icon);
    setIsOpen(true);
  };

  return (
    <ToastContext.Provider
      value={{
        isOpen,
        setIsOpen,
        icon,
        type,
        title,
        content,
        openToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};
