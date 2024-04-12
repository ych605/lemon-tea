import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { PiMapPinDuotone, PiFlagDuotone } from "react-icons/pi";
import { useModalContext } from "../../hooks/useModalContext";
import Button from "../common/Button";
import Input from "./Input";

interface FormProps {}

const Form: React.FC<FormProps> = () => {
  const { isOpen } = useModalContext();

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
          header: ["bg-[#f5e9a9]", "items-center", "gap-2"],
          body: ["py-6", "gap-5"],
        }}
      >
        <ModalContent>
          <ModalHeader>
            <span>{"Welcome, Enjoy your lemon tea!"}</span>
          </ModalHeader>
          <ModalBody>
            <Input
              autoFocus
              label="From"
              placeholder="Enter your origin"
              endContent={
                <PiMapPinDuotone className="text-xl pointer-events-none" />
              }
            />
            <Input
              label="To"
              placeholder="Enter your destination"
              endContent={
                <PiFlagDuotone className="text-xl pointer-events-none" />
              }
            />
          </ModalBody>
          <ModalFooter>
            {/* <Button onPress={onOpenChange}>
              Reset
            </Button> */}
            <Button
              className="bg-gradient-to-tr from-[#a9c45e] to-[#f9ab00] text-white shadow-lg"
              // onPress={onOpenChange}
              isDisabled={false}
            >
              {"Go"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Form;
