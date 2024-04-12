import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Image } from "@nextui-org/image";
import { PiMapPinDuotone, PiFlagDuotone } from "react-icons/pi";
import LemonTeaIcon from "../../assets/lemon_tea.svg";
import { useModalContext } from "../../hooks/useModalContext";
import { useFormContext } from "../../hooks/useFormContext";
import FormInput from "./FormInput";
import SubmitButton from "./SubmitButton";

const Form: React.FC = () => {
  const { isOpen } = useModalContext();
  const {
    value: { origin, destination },
    state: { isSubmitting },
    actions: { onInputValueChange, submitForm },
  } = useFormContext();

  return (
    <>
      <Modal
        isOpen={isOpen}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        backdrop="blur"
        closeButton={<></>}
        classNames={{
          backdrop: "bg-black/20",
          base: ["bg-[#fff4e5]", "text-[#aa9947]", "shadow-2xl"],
          header: ["bg-[#f5e9a9]", "items-start", "gap-2", "pt-5"],
          body: ["py-5", "gap-5", "pb-1"],
          footer: ["pb-5"],
        }}
      >
        <ModalContent>
          <form onSubmit={submitForm}>
            <ModalHeader>
              <Image src={LemonTeaIcon} width={25} height={25} radius="none" />
              <span>{"Welcome, Enjoy your lemon tea!"}</span>
            </ModalHeader>
            <ModalBody>
              <FormInput
                autoFocus
                label="From"
                placeholder="Enter your origin"
                endContent={
                  <PiMapPinDuotone className="text-xl pointer-events-none" />
                }
                value={origin}
                onChange={onInputValueChange("origin")}
              />
              <FormInput
                label="To"
                placeholder="Enter your destination"
                endContent={
                  <PiFlagDuotone className="text-xl pointer-events-none" />
                }
                value={destination}
                onChange={onInputValueChange("destination")}
              />
            </ModalBody>
            <ModalFooter>
              <SubmitButton isLoading={isSubmitting} />
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Form;
