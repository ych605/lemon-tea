import { useContext } from "react";
import { APIContext } from "../context/api-context";

export const useAPIContext = () => {
  const context = useContext(APIContext);

  if (context === undefined) {
    throw new Error("useAPIContext must be used within a APIContext");
  }

  return context;
};
