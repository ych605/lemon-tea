import { AxiosError } from "axios";

export const renderError = (
  error?: Error | null,
  errorPlaceholder = "Oops, something went wrong! Please try again later.",
) => {
  if (error instanceof AxiosError) return `${errorPlaceholder} (Error: ${error.message})`;

  return error?.message || errorPlaceholder;
};
