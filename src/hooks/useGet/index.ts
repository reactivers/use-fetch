import { useCallback } from "react";
import {
  IFetchJSONType,
  IUseFetchProps,
  IUseFetchResponse,
  RequestPayload,
} from "../../utils/types";
import useFetch from "../useFetch";

const useGet: <T extends IFetchJSONType>(
  params?: IUseFetchProps,
) => IUseFetchResponse<T> = <T extends IFetchJSONType>(
  params?: IUseFetchProps,
) => {
  const { request, ...rest } = useFetch<T>(params);

  const getRequest = useCallback(
    (payload: RequestPayload<T>) => {
      return request({ ...payload, method: "GET" });
    },
    [request],
  );

  return {
    request: getRequest,
    ...rest,
  };
};

export default useGet;
