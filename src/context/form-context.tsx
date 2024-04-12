import { createContext, PropsWithChildren } from "react";

interface FormContextValue {}

export const FormContext = createContext<FormContextValue>({});

export const FormProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <FormContext.Provider value={{}}>{children}</FormContext.Provider>;
};
