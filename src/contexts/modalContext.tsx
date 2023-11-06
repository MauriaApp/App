import { createContext, ReactNode, useState } from "react";
import { useHaptics } from "../utils/hooks/useHaptics";

export type ModalContextType = {
  isOpen: boolean;
  onClose: (() => void) | undefined;
  content: ReactNode | undefined;
  openModal: (content: ReactNode, onClose?: () => void) => void;
  closeModal: () => void;
  setIsOpen?: (a: boolean) => void;
};

export const ModalContext = createContext<ModalContextType | null>(null);

export const ModalContextProvider = ({
  children,
}: {
  children?: ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ReactNode | undefined>(undefined);
  const [onClose, setOnClose] = useState<(() => void) | undefined>(undefined);

  const { hapticsImpactHeavy } = useHaptics();

  const openModal = (content: ReactNode, onClose?: () => void) => {
    setContent(content);
    setIsOpen(true);
    setOnClose(onClose);
    setTimeout(async () => {
      await hapticsImpactHeavy();
    }, 150);
  };

  const closeModal = () => {
    setIsOpen(false);
    setContent(undefined);
    setOnClose(undefined);
  };

  return (
    <ModalContext.Provider
      value={{ isOpen, content, onClose, openModal, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};
