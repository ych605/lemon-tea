import { FormProvider } from "react-hook-form";
import { useLoadScript } from "@react-google-maps/api";
import env from "../constants/env";
import { GoogleMapAPIProvider, googleMapLibraries } from "../context/google-map-api-context";
import { ModalProvider } from "../context/modal-context";
import { APIProvider } from "../context/api-context";
import { useForm } from "../hooks/useForm";
import Form from "../components/Form";
import Map from "../components/Map";

const MainPage: React.FC = () => {
  const formMethods = useForm();
  const { isLoaded, loadError, url } = useLoadScript({
    googleMapsApiKey: env.GOOGLE_MAP_API_ENDPOINT,
    libraries: googleMapLibraries,
  });

  return (
    <GoogleMapAPIProvider isLoaded={isLoaded} loadError={loadError} url={url}>
      <ModalProvider>
        <APIProvider>
          <FormProvider {...formMethods}>
            {isLoaded && (
              <>
                <Map />
                <Form />
              </>
            )}
          </FormProvider>
        </APIProvider>
      </ModalProvider>
    </GoogleMapAPIProvider>
  );
};

export default MainPage;
