import { createContext, PropsWithChildren } from "react";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import env from "../constants/env";
import { API } from "../types/api";

interface APIContextValue {
  submitRoutingRequest?: UseMutationResult<
    AxiosResponse<API.SubmitRouting.Response, any>,
    Error,
    API.SubmitRouting.RequestBody,
    unknown
  >;
}

export const APIContext = createContext<APIContextValue>({});

const mainAPIBase = axios.create({
  baseURL: env.API_ENDPOINT,
});

export const APIProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const submitRoutingRequest = useMutation({
    mutationFn: (body: API.SubmitRouting.RequestBody) => {
      const { origin, destination } = body;
      if (origin === destination) throw Error("Origin and destination cannot be the same.");

      return mainAPIBase.post<API.SubmitRouting.Response>("route", { origin, destination });
      // return mainAPIBase.post<API.SubmitRouting.Response>("mock/route/success", {
      //   origin,
      //   destination,
      // });
      // return mainAPIBase.post<API.SubmitRouting.Response>("mock/route/500", {
      //   origin,
      //   destination,
      // });
    },
  });

  return <APIContext.Provider value={{ submitRoutingRequest }}>{children}</APIContext.Provider>;
};
