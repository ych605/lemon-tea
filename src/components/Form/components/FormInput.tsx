import { ReactNode, useCallback } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { useGoogleMapAPIContext } from "../../../hooks/useGoogleMapAPIContext";

interface FormInputProps {
  autoFocus?: boolean;
  endContent?: ReactNode;
  label?: ReactNode;
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  isDisabled?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
}

const FormInput: React.FC<FormInputProps> = (props) => {
  const {
    autoFocus,
    endContent,
    label,
    placeholder,
    value,
    onValueChange,
    isDisabled,
    isInvalid,
    errorMessage,
  } = props;
  const { url: googleMapsScriptBaseUrl } = useGoogleMapAPIContext();
  const { placePredictions, getPlacePredictions } = usePlacesService({
    googleMapsScriptBaseUrl,
    debounce: 100,
    options: {
      input: "",
      componentRestrictions: { country: "hk" }, // restrict to Hong Kong for convenience
    },
  });

  const onInputValueChange = useCallback(
    (value: string) => {
      onValueChange?.(value);
      getPlacePredictions({ input: value });
    },
    [onValueChange, getPlacePredictions],
  );

  return (
    <Autocomplete
      isRequired
      allowsCustomValue
      disableAnimation
      allowsEmptyCollection
      isClearable={false}
      menuTrigger="input"
      autoFocus={autoFocus}
      defaultItems={placePredictions}
      label={label}
      placeholder={placeholder}
      value={value}
      onInputChange={onInputValueChange}
      defaultFilter={() => true}
      onKeyDown={(e: any) => e?.continuePropagation?.()}
      endContent={endContent}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      errorMessage={errorMessage}
      classNames={{
        selectorButton: "hidden",
        endContentWrapper: ["items-end", "m-0"],
      }}
      inputProps={{
        variant: "bordered",
        classNames: {
          label: ["!text-[#816c02]", "after:hidden"],
          inputWrapper: [
            "bg-transparent",
            "data-[focus=true]:bg-[#f7e5cc]",
            "border-[#cbbe7c]",
            "hover:!border-[#816c02]",
            "data-[focus=true]:!border-[#816c02]",
          ],
          input: ["text-black/90", "placeholder:text-default-700/30"],
        },
      }}
      listboxProps={{
        itemClasses: {
          base: [
            "select-none",
            "!outline-none",
            "data-[focus=true]:!bg-[#efddc4]",
            "hover:!bg-[#efddc4]",
            "!text-[#816c02]",
          ],
        },
      }}
    >
      {({ description }) => (
        <AutocompleteItem key={description} tabIndex={-1} aria-label={description}>
          {description}
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
};

export default FormInput;
