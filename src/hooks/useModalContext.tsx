import { useContext } from "react";
import { ModalContext } from "../context/modal-context";

export const useModalContext = () => {
  const context = useContext(ModalContext);

  if (context === undefined) {
    throw new Error("useModalContext must be used within a ModalContext");
  }

  return context;
};
