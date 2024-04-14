import { useMemo } from "react";
import { Modal, ModalContent, ModalHeader } from "@nextui-org/modal";
import { Image } from "@nextui-org/image";
import LemonTeaIcon from "../../assets/lemon_tea.svg";
import { API } from "../../types/api";
import { useModalContext } from "../../hooks/useModalContext";
import { useAPIContext } from "../../hooks/useAPIContext";
import InputStep from "./steps/InputStep";
import InProgressStep from "./steps/InProgressStep";
import SuccessStep from "./steps/SuccessStep";
import FailureStep from "./steps/FailedStep";

const Form: React.FC = () => {
  const { isOpen } = useModalContext();
  const { getRoute } = useAPIContext();
  const isFailure =
    getRoute?.data?.data.status === API.GetRoute.ResponseStatus.FAILURE || getRoute?.isError;

  const renderedHeader = useMemo(() => {
    if (isFailure)
      return (
        <ModalHeader>
          <Image src={LemonTeaIcon} width={25} height={25} radius="none" />
          <span>{"Oops, submit another lemon tea!"}</span>
        </ModalHeader>
      );

    return (
      <ModalHeader>
        <Image src={LemonTeaIcon} width={25} height={25} radius="none" />
        <span>{"Welcome, enjoy this lemon tea!"}</span>
      </ModalHeader>
    );
  }, [isFailure]);

  const renderedStep = useMemo(() => {
    if (getRoute?.isError)
      return (
        <FailureStep errorMessage={"We cannot process your routing, please try again later."} />
      );

    switch (getRoute?.data?.data.status) {
      case API.GetRoute.ResponseStatus.IN_PROGRESS:
        return <InProgressStep />;

      case API.GetRoute.ResponseStatus.SUCCESS:
        return <SuccessStep />;

      case API.GetRoute.ResponseStatus.FAILURE:
        return <FailureStep errorMessage={getRoute?.data?.data.error} />;

      default:
        return <InputStep />;
    }
  }, [getRoute?.data?.data.status, getRoute?.isError]);

  return (
    <Modal
      isOpen={isOpen}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      backdrop="blur"
      closeButton={<></>}
      classNames={{
        backdrop: "bg-black/20",
        base: [
          ...(isFailure ? ["bg-[#ffe8e5]", "text-[#ec7c68]"] : ["bg-[#fff4e5]", "text-[#aa9947]"]),
          "shadow-2xl",
        ],
        header: [
          ...(isFailure ? ["bg-[#ffcaca]"] : ["bg-[#f5e9a9]"]),
          "items-start",
          "gap-2",
          "pt-5",
        ],
        body: ["items-center", "py-5", "gap-5"],
        footer: "pb-5",
      }}
    >
      <ModalContent>
        {renderedHeader}
        {renderedStep}
      </ModalContent>
    </Modal>
  );
};

export default Form;
