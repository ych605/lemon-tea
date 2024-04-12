import { useDisclosure } from "@nextui-org/use-disclosure";
import { createContext, PropsWithChildren } from "react";

interface ModalContextValue {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onOpenChange: () => void;
}

export const ModalContext = createContext<ModalContextValue>({
  isOpen: false,
  onOpen: () => {},
  onClose: () => {},
  onOpenChange: () => {},
});

export const ModalProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure({
    defaultOpen: true,
  });

  return (
    <ModalContext.Provider value={{ isOpen, onOpen, onClose, onOpenChange }}>
      {children}
    </ModalContext.Provider>
  );
};
