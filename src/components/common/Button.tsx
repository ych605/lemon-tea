import { Button as NextUIButton } from "@nextui-org/button";
import { PropsWithChildren } from "react";

interface ButtonProps {
  className?: string;
  onPress?: () => void;
  isLoading?: boolean;
}

const Button: React.FC<PropsWithChildren<ButtonProps>> = (props) => {
  const { className, onPress, isLoading, children } = props;

  return (
    <NextUIButton className={className} onPress={onPress} isLoading={isLoading}>
      {children}
    </NextUIButton>
  );
};

export default Button;
