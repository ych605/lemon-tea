import { ModalBody } from "@nextui-org/modal";
import { Progress } from "@nextui-org/progress";
import { BiLemon } from "react-icons/bi";

const InProgressStep: React.FC = () => {
  return (
    <ModalBody>
      <BiLemon size={40} className="-mb-2 animate-pulse" />
      <p className="text-sm">{"We are processing your routing, stay tuned!"}</p>
      <div className="w-8/12">
        <Progress
          size="sm"
          classNames={{
            indicator: "bg-[#d8ca86]",
          }}
          isIndeterminate
          aria-label="In progress..."
        />
      </div>
    </ModalBody>
  );
};

export default InProgressStep;
