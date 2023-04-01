export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export declare type IFetchJSONType = Record<never, never>;
export declare type IFetchResponseContentType =
  | "JSON"
  | "BLOB"
  | "FORM-DATA"
  | "TEXT"
  | "ARRAY-BUFFER"
  | "RAW";

export declare type IFetchResponseType =
  | IFetchJSONType
  | Blob
  | FormData
  | string
  | ArrayBuffer
  | Response;

export declare type IFetchResponseGenericType<T extends IFetchJSONType> =
  | T
  | Blob
  | FormData
  | string
  | ArrayBuffer
  | Response;

export interface IFetchOnSuccess<T extends IFetchJSONType> {
  (response: T): void;
}

export interface IFetchOnError {
  (error: never | unknown): void;
}

export interface IFetch<T extends IFetchJSONType> extends RequestInit {
  url: string;
  onSuccess: (response: T) => void;
  onError(error: never | unknown): void;
  stringify?: boolean;
  responseContentType?: IFetchResponseContentType;
}

export interface GenericRequestPayload<T extends IFetchJSONType>
  extends Optional<IFetch<T>, "url" | "onSuccess" | "onError"> {
  endpoint: string;
}

export interface RequestPayload<T extends IFetchJSONType>
  extends GenericRequestPayload<T> {
  bodyStringify?: boolean;
}

export interface FetchController<T extends IFetchJSONType> {
  firstTimeFetched: boolean;
  fetched: boolean;
  fetching: boolean;
  success?: boolean;
  response: T;
}

export interface IUseFetchProps {
  abortOnUnmount?: boolean;
}

export interface IUseFetchResponse<T extends IFetchJSONType>
  extends FetchController<T> {
  request: (params: RequestPayload<T>) => Promise<Response>;
}

export interface FetchContextProps {
  url?: string;
  credentials?: RequestCredentials;
  transformResponse?: (response: never | unknown) => never | unknown;
  isSuccess?: (response: never | unknown) => boolean;
  isError?: (response: never | unknown) => boolean;
  onRequest?: (request: RequestPayload<never>) => void;
  onSuccess?: (response: never | unknown) => void;
  onError?: (error: never) => void;
  getAuthorizationHeader?: () => string;
}
