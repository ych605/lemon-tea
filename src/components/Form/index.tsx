import { useMemo } from "react";
import { Modal, ModalContent, ModalHeader } from "@nextui-org/modal";
import { Image } from "@nextui-org/image";
import { useFormContext } from "react-hook-form";
import LemonTeaIcon from "../../assets/lemon_tea.svg";
import { useModalContext } from "../../hooks/useModalContext";
import { useAPIContext } from "../../hooks/useAPIContext";
import InputStep from "./steps/InputStep";

const Form: React.FC = () => {
  const { isOpen } = useModalContext();
  const { submitRoutingRequest } = useAPIContext();
  const { handleSubmit } = useFormContext();

  const onFormSubmit = useMemo(
    () =>
      handleSubmit((formData) => {
        const { origin, destination } = formData;

        submitRoutingRequest?.mutate({ origin, destination });
      }),
    [submitRoutingRequest?.mutate],
  );

  return (
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
        <form onSubmit={onFormSubmit}>
          <ModalHeader>
            <Image src={LemonTeaIcon} width={25} height={25} radius="none" />
            <span>{"Welcome, Enjoy your lemon tea!"}</span>
          </ModalHeader>
          <InputStep />
        </form>
      </ModalContent>
    </Modal>
  );
};

export default Form;
