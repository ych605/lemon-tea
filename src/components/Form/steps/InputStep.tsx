import { useCallback } from "react";
import { ModalBody, ModalFooter } from "@nextui-org/modal";
import { useFormContext } from "react-hook-form";
import { PiFlagDuotone, PiMapPinDuotone } from "react-icons/pi";
import { FormBody } from "../../../hooks/useForm";
import { useAPIContext } from "../../../hooks/useAPIContext";
import FormInput from "../components/FormInput";
import SubmitButton from "../components/SubmitButton";
import { AxiosError } from "axios";

interface InputStepProps {}

const InputStep: React.FC<InputStepProps> = () => {
  const { submitRoutingRequest } = useAPIContext();
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<FormBody>();

  const { origin, destination } = watch();

  const onInputValueChange = useCallback(
    (key: keyof FormBody) => (value: string) => setValue(key, value),
    [setValue],
  );

  const renderError = useCallback((error?: Error) => {
    if (error instanceof AxiosError) return "Oops, something went wrong! Please try again later.";

    return error?.message || "";
  }, []);

  return (
    <>
      <ModalBody>
        <FormInput
          autoFocus
          label="From"
          placeholder="Enter your origin"
          endContent={<PiMapPinDuotone className="pointer-events-none text-xl" />}
          value={origin}
          onValueChange={onInputValueChange("origin")}
          isDisabled={submitRoutingRequest?.isPending}
          isInvalid={!!errors.origin}
          errorMessage={errors.origin?.message}
        />
        <FormInput
          label="To"
          placeholder="Enter your destination"
          endContent={<PiFlagDuotone className="pointer-events-none text-xl" />}
          value={destination}
          onValueChange={onInputValueChange("destination")}
          isDisabled={submitRoutingRequest?.isPending}
          isInvalid={!!errors.destination}
          errorMessage={errors.destination?.message}
        />
        {submitRoutingRequest?.isError && (
          <p className="rounded-medium bg-red-100 p-4 text-xs font-semibold text-red-400">
            {renderError(submitRoutingRequest?.error)}
          </p>
        )}
      </ModalBody>
      <ModalFooter>
        <SubmitButton isLoading={submitRoutingRequest?.isPending} />
      </ModalFooter>
    </>
  );
};

export default InputStep;
