import { useForm as useHookForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export interface FormBody {
  origin: string;
  destination: string;
}

export const formDefaultValue = { origin: "", destination: "" };

const formValidationSchema = yup
  .object({
    origin: yup.string().required(),
    destination: yup.string().required(),
  })
  .required();

export const useForm = () => {
  const formMethods = useHookForm<FormBody>({
    defaultValues: formDefaultValue,
    resolver: yupResolver(formValidationSchema),
  });

  return formMethods;
};
