import { useEffect } from "react";
import { ModalBody } from "@nextui-org/modal";
import { Progress } from "@nextui-org/progress";
import { BiLemon } from "react-icons/bi";
import { useModalContext } from "../../../hooks/useModalContext";

const SuccessStep: React.FC = () => {
  const { onClose } = useModalContext();

  useEffect(() => {
    const timerId = setTimeout(onClose, 1500);

    return () => {
      clearTimeout(timerId);
    };
  }, [onClose]);

  return (
    <ModalBody>
      <BiLemon size={40} className="-mb-2 animate-bounce" />
      <p className="text-sm">{"Process success!"}</p>
      <div className="w-8/12">
        <Progress
          size="sm"
          value={100}
          classNames={{
            indicator: "bg-[#d8ca86]",
          }}
          aria-label="Success!"
        />
      </div>
    </ModalBody>
  );
};

export default SuccessStep;
