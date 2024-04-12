import { Button as NextUIButton } from "@nextui-org/button";
import { PropsWithChildren } from "react";

interface ButtonProps {
  className?: string;
  onPress?: () => void;
  isDisabled?: boolean;
}

const Button: React.FC<PropsWithChildren<ButtonProps>> = (props) => {
  const { className, onPress, isDisabled, children } = props;

  return (
    <NextUIButton
      className={className}
      onPress={onPress}
      isDisabled={isDisabled}
    >
      {children}
    </NextUIButton>
  );
};

export default Button;
