import { useCallback, useRef } from "react";
import Button from "../common/Button";

interface SubmitButtonProps {
  isLoading?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = (props) => {
  const { isLoading } = props;
  const submitRef = useRef<HTMLInputElement>(null);

  const onButtonPress = useCallback(() => {
    submitRef.current?.click();
  }, []);

  return (
    <Button
      className="bg-gradient-to-tr from-[#a9c45e] to-[#f9ab00] text-white shadow-lg focus:!outline-[#816c02]"
      onPress={onButtonPress}
      isLoading={isLoading}
    >
      <input
        ref={submitRef}
        type="submit"
        value="Go"
        className="select-none pointer-events-none"
        tabIndex={-1}
      />
    </Button>
  );
};

export default SubmitButton;
