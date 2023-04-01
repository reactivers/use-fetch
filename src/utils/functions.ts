import { IFetch, IFetchResponseType } from "./types";

export const iFetch = async <T extends IFetchResponseType>(
  payload: IFetch<T>,
) => {
  const {
    url,
    body: _body,
    stringify = true,
    onSuccess,
    onError,
    responseContentType = "JSON",
    method = "GET",
    ...rest
  } = payload;

  if (url === undefined) {
    throw new Error("No URL Found in the request");
  }

  const body = stringify ? JSON.stringify(_body) : _body;

  try {
    const _httpResponse = await fetch(url, {
      body,
      method,
      ...rest,
    });
    const httpResponse = _httpResponse.clone();
    const statusCode = `${httpResponse.status}`;

    if (statusCode.startsWith("4", 0) || statusCode.startsWith("5", 0)) {
      onError(httpResponse);
      return;
    }

    if (responseContentType === "JSON") {
      const responseJson = await httpResponse.json();
      onSuccess(responseJson);
    } else if (responseContentType === "BLOB") {
      const responseBlob = await httpResponse.blob();
      onSuccess(responseBlob as T);
    } else if (responseContentType === "FORM-DATA") {
      const responseFormData = await httpResponse.formData();
      onSuccess(responseFormData as T);
    } else if (responseContentType === "TEXT") {
      const responseText = await httpResponse.text();
      onSuccess(responseText as T);
    } else if (responseContentType === "ARRAY-BUFFER") {
      const responseArrayBuffer = await httpResponse.arrayBuffer();
      onSuccess(responseArrayBuffer as T);
    } else {
      onSuccess(httpResponse as T);
    }

    return _httpResponse;
  } catch (error) {
    onError(error);
  }
};
