import { useCallback } from "react";
import { applicationJSONHeader } from "../../utils/constants";
import {
  IFetchResponseType,
  IUseFetchProps,
  IUseFetchResponse,
  RequestPayload,
} from "../../utils/types";
import useFetch from "../useFetch";

const usePut: <T extends IFetchResponseType>(
  params?: IUseFetchProps,
) => IUseFetchResponse<T> = <T extends IFetchResponseType>(
  params?: IUseFetchProps,
) => {
  const { request, ...rest } = useFetch<T>(params);

  const putRequest = useCallback(
    (payload: RequestPayload<T>) => {
      return request({
        headers: applicationJSONHeader,
        ...payload,
        method: "PUT",
      });
    },
    [request],
  );

  return {
    request: putRequest,
    ...rest,
  };
};

export default usePut;
