import { ChangeEventHandler, ReactNode } from "react";
import { Input as NextUInput } from "@nextui-org/input";

interface FormInputProps {
  autoFocus?: boolean;
  endContent?: ReactNode;
  label?: ReactNode;
  placeholder?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const FormInput: React.FC<FormInputProps> = (props) => {
  const { autoFocus, endContent, label, placeholder, value, onChange } = props;

  return (
    <NextUInput
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
      value={value}
      onChange={onChange}
    />
  );
};

export default FormInput;
