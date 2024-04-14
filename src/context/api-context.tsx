import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from "@tanstack/react-query";
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
  getRoute?: UseQueryResult<AxiosResponse<API.GetRoute.Response, any>, Error>;
}

export const APIContext = createContext<APIContextValue>({});

const mainAPIBase = axios.create({
  baseURL: env.API_ENDPOINT,
  timeout: 5000,
});

export const APIProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [refetchInterval, setRefetchInterval] = useState<false | number>(false);

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

  const token = submitRoutingRequest.data?.data.token || "";

  const getRoute = useQuery({
    queryKey: ["route", token],
    queryFn: ({ queryKey }) => {
      const [_, token] = queryKey;

      return mainAPIBase.get<API.GetRoute.Response>(`route/${token}`);
      // return mainAPIBase.get<API.GetRoute.Response>(`mock/route/500`);
      // return mainAPIBase.get<API.GetRoute.Response>(`mock/route/inprogress`);
      // return mainAPIBase.get<API.GetRoute.Response>(`mock/route/failure`);
      // return mainAPIBase.get<API.GetRoute.Response>(`mock/route/success`);
    },
    retry: false,
    enabled: !!token,
    refetchInterval,
  });

  useEffect(() => {
    if (getRoute.data?.data.status === API.GetRoute.ResponseStatus.IN_PROGRESS && !getRoute.isError)
      return setRefetchInterval(1000);

    setRefetchInterval(false);
  }, [getRoute.data?.data.status, getRoute?.isError]);

  return (
    <APIContext.Provider value={{ submitRoutingRequest, getRoute }}>{children}</APIContext.Provider>
  );
};
