import { useCallback } from "react";
import { applicationJSONHeader } from "../../utils/constants";
import {
  IFetchResponseType,
  IUseFetchProps,
  IUseFetchResponse,
  RequestPayload,
} from "../../utils/types";
import useFetch from "../useFetch";

const usePost: <T extends IFetchResponseType>(
  params?: IUseFetchProps,
) => IUseFetchResponse<T> = <T extends IFetchResponseType>(
  params?: IUseFetchProps,
) => {
  const { request, ...rest } = useFetch<T>(params);
  const postRequest = useCallback(
    (payload: RequestPayload<T>) => {
      return request({
        headers: applicationJSONHeader,
        ...payload,
        method: "POST",
      });
    },
    [request],
  );

  return {
    request: postRequest,
    ...rest,
  };
};

export default usePost;
