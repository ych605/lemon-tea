import { useContext } from "react";
import { GoogleMapAPIContext } from "../context/google-map-api-context";

export const useGoogleMapAPIContext = () => {
  const context = useContext(GoogleMapAPIContext);

  if (context === undefined) {
    throw new Error("useGoogleMapAPIContext must be used within a GoogleMapAPIContext");
  }

  return context;
};
