import { useCallback, useMemo } from "react";
import { ModalBody, ModalFooter } from "@nextui-org/modal";
import { useFormContext } from "react-hook-form";
import { PiFlagDuotone, PiMapPinDuotone } from "react-icons/pi";
import { FormBody } from "../../../hooks/useForm";
import { useAPIContext } from "../../../hooks/useAPIContext";
import FormInput from "../components/FormInput";
import SubmitButton from "../components/SubmitButton";
import { AxiosError } from "axios";

const InputStep: React.FC = () => {
  const { submitRoutingRequest, getRoute } = useAPIContext();
  const { watch, setValue, handleSubmit } = useFormContext<FormBody>();

  const { origin, destination } = watch();

  const onInputValueChange = useCallback(
    (key: keyof FormBody) => (value: string) => setValue(key, value),
    [setValue],
  );

  const onOriginChange = useMemo(() => onInputValueChange("origin"), [onInputValueChange]);
  const onDestinationChange = useMemo(
    () => onInputValueChange("destination"),
    [onInputValueChange],
  );

  const onFormSubmit = useMemo(
    () =>
      handleSubmit((formData) => {
        const { origin, destination } = formData;

        submitRoutingRequest?.mutate({ origin, destination });
      }),
    [submitRoutingRequest?.mutate],
  );

  const renderError = useCallback((error?: Error) => {
    if (error instanceof AxiosError) return "Oops, something went wrong! Please try again later.";

    return error?.message || "";
  }, []);

  const isLoading = submitRoutingRequest?.isPending || getRoute?.isFetching;

  return (
    <form autoFocus={false} onSubmit={onFormSubmit}>
      <ModalBody className="pb-1">
        <FormInput
          autoFocus
          label="From"
          placeholder="Enter your origin"
          endContent={<PiMapPinDuotone className="pointer-events-none text-xl" />}
          value={origin}
          onValueChange={onOriginChange}
          isDisabled={isLoading}
        />
        <FormInput
          label="To"
          placeholder="Enter your destination"
          endContent={<PiFlagDuotone className="pointer-events-none text-xl" />}
          value={destination}
          onValueChange={onDestinationChange}
          isDisabled={isLoading}
        />
        {submitRoutingRequest?.isError && (
          <p
            data-testid="error-message"
            className="w-full rounded-medium bg-red-100 p-4 text-xs font-semibold text-red-400"
          >
            {renderError(submitRoutingRequest?.error)}
          </p>
        )}
      </ModalBody>
      <ModalFooter>
        <SubmitButton isLoading={isLoading} />
      </ModalFooter>
    </form>
  );
};

export default InputStep;
