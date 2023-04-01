import { useCallback } from "react";
import { applicationJSONHeader } from "../../utils/constants";
import {
  IFetchJSONType,
  IUseFetchProps,
  IUseFetchResponse,
  RequestPayload,
} from "../../utils/types";
import useFetch from "../useFetch";

const useDelete: <T extends IFetchJSONType>(
  params?: IUseFetchProps,
) => IUseFetchResponse<T> = <T extends IFetchJSONType>(
  params?: IUseFetchProps,
) => {
  const { request, ...rest } = useFetch<T>(params);
  const deleteRequest = useCallback(
    (payload: RequestPayload<T>) => {
      return request({
        headers: applicationJSONHeader,
        ...payload,
        method: "DELETE",
      });
    },
    [request],
  );

  return {
    request: deleteRequest,
    ...rest,
  };
};

export default useDelete;
