import { createContext, FC, PropsWithChildren, useContext } from "react";
import { RequestPayload } from ".";

interface FetchContextProps {
    url?: string;
    credentials?: RequestCredentials;
    transformResponse?: (response: any) => any;
    isSuccess?: (response: any) => boolean;
    isError?: (response: any) => boolean;
    onRequest?: (request: RequestPayload) => void;
    onSuccess?: (response: any) => void;
    onError?: (error: any) => void;
    getAuthorizationHeader?: () => string;
}

const FetchContext = createContext({} as FetchContextProps);

const FetchProvider: FC<PropsWithChildren<FetchContextProps>> = ({ children, getAuthorizationHeader = () => "", ...rest }) => {
    return (
        <FetchContext.Provider value={{
            getAuthorizationHeader,
            ...rest
        }}>
            {children}
        </FetchContext.Provider>
    )
}

FetchProvider.defaultProps = {

}

export const useFetchContext = () => {
    const context = useContext(FetchContext);
    if (context === undefined) {
        throw new Error('useFetchContext must be used within an FetchContext.Provider');
    }
    return context;
};

export default FetchProvider;
