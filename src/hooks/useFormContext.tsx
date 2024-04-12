import { useContext } from "react";
import { FormContext } from "../context/form-context";

export const useFormContext = () => {
  const context = useContext(FormContext);

  if (context === undefined) {
    throw new Error("useFormContext must be used within a FormContext");
  }

  return context;
};
