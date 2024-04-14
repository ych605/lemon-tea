import { FormProvider } from "react-hook-form";
import { ModalProvider } from "../context/modal-context";
import { APIProvider } from "../context/api-context";
import { useForm } from "../hooks/useForm";
import Form from "../components/Form";
import Map from "../components/Map";

const MainPage: React.FC = () => {
  const formMethods = useForm();

  return (
    <ModalProvider>
      <APIProvider>
        <FormProvider {...formMethods}>
          <Form />
          <Map />
        </FormProvider>
      </APIProvider>
    </ModalProvider>
  );
};

export default MainPage;
