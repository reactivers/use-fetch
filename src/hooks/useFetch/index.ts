import { useCallback, useEffect, useMemo, useState } from "react";
import { iFetch } from "../../utils/functions";
import {
  FetchController,
  IFetchJSONType,
  IFetchOnError,
  IFetchOnSuccess,
  IUseFetchProps,
  IUseFetchResponse,
  RequestPayload,
} from "../../utils/types";
import { useFetchContext } from "./hook";

const useFetch: <T extends IFetchJSONType>(
  params?: IUseFetchProps,
) => IUseFetchResponse<T> = <T extends IFetchJSONType>(
  params?: IUseFetchProps,
) => {
  const { abortOnUnmount } = params || { abortOnUnmount: true };
  const {
    url: contextURL,
    onSuccess: contextOnSuccess,
    onError: contextOnError,
    onRequest,
    isError,
    isSuccess,
    credentials,
    transformResponse,
    getAuthorizationHeader,
  } = useFetchContext();

  const [data, setData] = useState<FetchController<T>>({
    success: undefined,
    firstTimeFetched: false,
    fetched: false,
    fetching: false,
    response: {} as T,
  });

  const abortController = useMemo(() => new AbortController(), []);

  const onSuccess: (params: {
    onSuccess?: IFetchOnSuccess<T>;
    response: T;
  }) => void = useCallback(
    ({ onSuccess: payloadOnSuccess, response }) => {
      response = transformResponse
        ? (transformResponse(response) as T)
        : response;

      if (contextOnSuccess) contextOnSuccess(response);
      if (payloadOnSuccess) payloadOnSuccess(response);

      setData((oldData) => ({
        ...oldData,
        success: true,
        response: response,
        fetching: false,
        fetched: true,
        firstTimeFetched: true,
      }));
    },
    [contextOnSuccess, transformResponse],
  );

  const onError: (params: { onError?: IFetchOnError; response: T }) => void =
    useCallback(
      ({ onError: payloadOnError, response }) => {
        if (transformResponse) response = transformResponse(response) as T;

        if (contextOnError) contextOnError(response as never);
        if (payloadOnError) payloadOnError(response);

        setData((oldData) => ({
          ...oldData,
          success: false,
          response,
          fetching: false,
          fetched: true,
          firstTimeFetched: true,
        }));
      },
      [contextOnError, transformResponse],
    );

  const checkParams = (payload: RequestPayload<T>) => {
    if (payload.url === undefined && contextURL) {
      throw Error(
        "@reactivers/use-fetch => URL is undefined. Make sure you defined the url in the context or hook!",
      );
    }
    if (payload.endpoint === undefined) {
      throw Error(
        "@reactivers/use-fetch => Endpoint is undefined. If you don't want to use it pass empty string",
      );
    }
  };

  const request = useCallback(
    (payload: RequestPayload<T>) => {
      checkParams(payload);
      const {
        url: _url,
        endpoint,
        onSuccess: payloadOnSuccess,
        onError: payloadOnError,
        headers: payloadHeaders,
        credentials: _credentials,
        ...rest
      } = payload;
      const url = `${_url || contextURL}${endpoint}`;

      if (onRequest) onRequest({ ...payload, url });

      setData((old) => ({ ...old, fetching: true, fetched: false }));

      const authorizationHeader = getAuthorizationHeader
        ? getAuthorizationHeader()
        : undefined;

      const headers: Record<string, string | undefined> = {
        Authorization: authorizationHeader,
        ...((payloadHeaders || {}) as Record<string, string | undefined>),
      };

      if (!headers["Authorization"]) delete headers["Authorization"];

      return iFetch<T>({
        ...rest,
        url,
        headers: headers as HeadersInit,
        credentials: _credentials || credentials,
        onSuccess: (response) => {
          if (!isSuccess || isSuccess(response)) {
            onSuccess({
              onSuccess: payloadOnSuccess,
              response: response as T,
            });
          } else {
            onError({
              onError: payloadOnError,
              response,
            });
          }
        },
        onError: (response) => {
          if (!isError || isError(response)) {
            onError({
              onError: payloadOnError,
              response: response as T,
            });
          } else {
            onSuccess({
              onSuccess: payloadOnSuccess,
              response: response as T,
            });
          }
        },
        signal: abortController.signal,
      });
    },
    [
      isError,
      isSuccess,
      credentials,
      getAuthorizationHeader,
      contextURL,
      onSuccess,
      onError,
      setData,
      onRequest,
      abortController.signal,
    ],
  );

  useEffect(() => {
    return () => {
      if (abortOnUnmount) abortController.abort();
    };
  }, [abortController.abort, abortOnUnmount]);

  return {
    request,
    ...data,
  } as IUseFetchResponse<T>;
};

export default useFetch;
