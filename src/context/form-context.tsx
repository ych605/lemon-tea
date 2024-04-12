import {
  ChangeEvent,
  createContext,
  PropsWithChildren,
  useCallback,
  useMemo,
} from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormValue {
  origin: string;
  destination: string;
}

interface FormState {
  isSubmitting: boolean;
}

interface FormActions {
  onInputValueChange: (
    key: keyof FormValue
  ) => (e: ChangeEvent<HTMLInputElement>) => void;
  submitForm: () => void;
}

interface FormContextValue {
  value: FormValue;
  state: FormState;
  actions: FormActions;
}

const formDefaultValue = { origin: "", destination: "" };

export const FormContext = createContext<FormContextValue>({
  value: formDefaultValue,
  state: {
    isSubmitting: false,
  },
  actions: {
    onInputValueChange: () => () => {},
    submitForm: () => {},
  },
});

export const FormProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const formMethods = useForm<FormValue>({
    defaultValues: formDefaultValue,
  });

  const { handleSubmit, watch, setValue, formState } = formMethods;

  const formValue = watch();

  const { isSubmitting } = formState;

  const onInputValueChange = useCallback(
    (key: keyof FormValue) => (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      setValue(key, value);
    },
    [setValue]
  );

  const onSubmit = useCallback<SubmitHandler<FormValue>>(async (data) => {
    console.log(data);

    await new Promise((r) => {
      setTimeout(() => r(1), 3000);
    });

    console.log("done");
  }, []);

  const submitForm = useMemo(
    () => handleSubmit(onSubmit),
    [handleSubmit, onSubmit]
  );

  return (
    <FormContext.Provider
      value={{
        value: formValue,
        state: { isSubmitting },
        actions: { onInputValueChange, submitForm },
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
