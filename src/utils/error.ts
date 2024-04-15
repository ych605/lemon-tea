import { AxiosError } from "axios";

export const defaultErrorPlaceholder = "Oops, something went wrong! Please try again later.";

export const renderError = (error?: Error | null, errorPlaceholder = defaultErrorPlaceholder) => {
  if (error instanceof AxiosError) return `${errorPlaceholder} (Error: ${error.message})`;

  return error?.message || errorPlaceholder;
};
