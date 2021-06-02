export declare type ResponseContentType = "JSON" | "BLOB" | "FORM-DATA" | "TEXT" | "ARRAY-BUFFER" | "RAW";
export interface IFetch extends RequestInit {
    url: string;
    body?: any;
    method?: string;
    onSuccess: (response: any) => void;
    onError: (error: any) => void;
    stringify?: boolean;
    responseContentType?: ResponseContentType;
}
export declare const applicationJSONHeader: {
    "Content-Type": string;
};
export declare const iFetch: (payload: IFetch) => Promise<Response>;
