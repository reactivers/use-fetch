export declare type ResponseContentType = "JSON" | "BLOB" | "FORM-DATA" | "TEXT" | "ARRAY-BUFFER" | "RAW"

export interface IFetch extends RequestInit {
    url: string,
    body?: any,
    method?: string,
    onSuccess: (response: any) => void,
    onError: (error: any) => void,
    stringify?: boolean;
    responseContentType?: ResponseContentType,
}

export const applicationJSONHeader = { "Content-Type": "application/json" }

export const iFetch = async (payload: IFetch) => {
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
        const httpResponse = await fetch(url, {
            body,
            method,
            ...rest
        })
        const statusCode = `${httpResponse.status}`;

        if (statusCode.startsWith('4', 0) || statusCode.startsWith('5', 0)) {
            onError(httpResponse);
            return;
        }

        switch (responseContentType) {
            case "JSON":
                const responseJson = await httpResponse.json();
                onSuccess(responseJson);
                break;
            case "BLOB":
                const responseBlob = await httpResponse.blob();
                onSuccess(responseBlob);
                break;
            case "FORM-DATA":
                const responseFormData = await httpResponse.formData();
                onSuccess(responseFormData);
                break;
            case "TEXT":
                const responseText = await httpResponse.text();
                onSuccess(responseText);
                break;
            case "ARRAY-BUFFER":
                const responseArrayBuffer = await httpResponse.arrayBuffer();
                onSuccess(responseArrayBuffer);
                break;
            default:
                onSuccess(httpResponse);
        }

        return httpResponse;

    } catch (error) {
        onError(error)
    }

}