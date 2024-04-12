import { FormProvider } from "./context/form-context";
import { ModalProvider } from "./context/modal-context";
import Form from "./components/Form";
import Map from "./components/Map";

const App: React.FC = () => {
  return (
    <ModalProvider>
      <FormProvider>
        <Form />
        <Map />
      </FormProvider>
    </ModalProvider>
  );
};

export default App;
