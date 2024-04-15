import { createContext, PropsWithChildren } from "react";
import { Libraries } from "@react-google-maps/api";

interface GoogleMapAPIProviderProps {
  isLoaded: boolean;
  loadError?: Error;
  url: string;
}

interface GoogleMapAPIContextValue {
  isLoaded: boolean;
  loadError?: Error;
  url: string;
}

export const GoogleMapAPIContext = createContext<GoogleMapAPIContextValue>({
  isLoaded: false,
  url: "",
});

export const googleMapLibraries: Libraries = ["places"];

export const GoogleMapAPIProvider: React.FC<PropsWithChildren<GoogleMapAPIProviderProps>> = (
  props,
) => {
  const { isLoaded, loadError, url, children } = props;

  return (
    <GoogleMapAPIContext.Provider value={{ isLoaded, loadError, url }}>
      {children}
    </GoogleMapAPIContext.Provider>
  );
};
