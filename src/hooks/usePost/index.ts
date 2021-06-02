import { useCallback } from 'react';
import { applicationJSONHeader } from '../../utils/functions';
import useFetch, { RequestPayload, IUseFetchProps, IUseFetchResponse } from '../useFetch';

interface PostRequestPayload extends RequestPayload {
}

const usePost: <T extends {}>(params?: IUseFetchProps) => IUseFetchResponse<T> = <T extends {}>(params = { abortOnUnmount: true }) => {
    const { request, ...rest } = useFetch<T>(params)
    const postRequest = useCallback((payload: PostRequestPayload = {}) => {
        return request({ headers: applicationJSONHeader, ...payload, method: "POST" })
    }, [request])

    return {
        request: postRequest,
        ...rest
    }
}

export default usePost