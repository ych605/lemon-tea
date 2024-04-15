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
import { renderError } from "../../utils/error";

const Form: React.FC = () => {
  const { isOpen } = useModalContext();
  const { getRoute } = useAPIContext();
  const isFailure =
    !getRoute?.isFetching &&
    (getRoute?.data?.data.status === API.GetRoute.ResponseStatus.FAILURE || getRoute?.isError);
  const isFirstGettingRoute =
    getRoute?.isFetching && getRoute?.data?.data.status !== API.GetRoute.ResponseStatus.IN_PROGRESS;

  const renderedHeaderLine = useMemo(() => {
    if (isFailure) return "Oops, submit another lemon tea!";

    return "Welcome, enjoy this lemon tea!";
  }, [isFailure]);

  const renderedStep = useMemo(() => {
    if (isFailure && getRoute?.data?.data.status !== API.GetRoute.ResponseStatus.FAILURE)
      return (
        <FailureStep
          errorMessage={renderError(
            getRoute?.error,
            "Sorry, We cannot process your routing. Please try again later.",
          )}
        />
      );

    if (isFirstGettingRoute) return <InputStep />;

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
  }, [isFailure, getRoute?.error, isFirstGettingRoute, getRoute?.data?.data.status]);

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
          "!overflow-visible",
        ],
        header: [
          ...(isFailure ? ["bg-[#ffcaca]"] : ["bg-[#f5e9a9]"]),
          "items-start",
          "gap-2",
          "pt-5",
          "rounded-large",
          "rounded-b-none",
        ],
        body: ["items-center", "py-5", "gap-5"],
        footer: "pb-5",
      }}
      placement="center"
    >
      <ModalContent>
        <ModalHeader>
          <Image src={LemonTeaIcon} width={25} height={25} radius="none" />
          <span>{renderedHeaderLine}</span>
        </ModalHeader>
        {renderedStep}
      </ModalContent>
    </Modal>
  );
};

export default Form;
