import { ReactNode } from "react";
import { Input as NextUIInput } from "@nextui-org/input";

interface InputProps {
  autoFocus?: boolean;
  endContent?: ReactNode;
  label?: ReactNode;
  placeholder?: string;
}

const Input: React.FC<InputProps> = (props) => {
  const { autoFocus, endContent, label, placeholder } = props;

  return (
    <NextUIInput
      isRequired
      autoFocus={autoFocus}
      endContent={endContent}
      label={label}
      placeholder={placeholder}
      variant="bordered"
      classNames={{
        label: ["!text-[#816c02]", "after:hidden"],
        inputWrapper: [
          "bg-transparent",
          "data-[focus=true]:bg-[#f7e5cc]",
          "border-[#cbbe7c]",
          "hover:!border-[#816c02]",
          "data-[focus=true]:!border-[#816c02]",
        ],
        input: ["text-black/90", "placeholder:text-default-700/30"],
      }}
    />
  );
};

export default Input;
