import { Badge } from "@nextui-org/badge";
import { ModalBody, ModalFooter } from "@nextui-org/modal";
import { BiLemon } from "react-icons/bi";
import Button from "../../common/Button";
import { useAPIContext } from "../../../hooks/useAPIContext";
import { useCallback } from "react";
import { useFormContext } from "react-hook-form";

interface FailureStepProps {
  errorMessage: string;
}

const FailureStep: React.FC<FailureStepProps> = (props) => {
  const { errorMessage } = props;
  const { reset } = useFormContext();
  const { submitRoutingRequest } = useAPIContext();

  const onResubmit = useCallback(() => {
    submitRoutingRequest?.reset();
    reset();
  }, [submitRoutingRequest?.reset, reset]);

  return (
    <>
      <ModalBody className="pb-1">
        <Badge content="✖" size="lg" color="danger" placement="bottom-right">
          <BiLemon size={40} className="-mb-2" />
        </Badge>
        <p className="text-sm">{errorMessage}</p>
      </ModalBody>
      <ModalFooter>
        <Button
          className="bg-gradient-to-tr from-[#ffdede] to-[#ffffff] text-[#ec7c68] shadow-lg focus:!outline-[#810202]"
          onPress={onResubmit}
        >
          {"Resubmit"}
        </Button>
      </ModalFooter>
    </>
  );
};

export default FailureStep;
