import { useCallback } from 'react';
import { applicationJSONHeader } from '../../utils/functions';
import useFetch, { RequestPayload, IUseFetchProps, IUseFetchResponse } from '../useFetch';

interface PutRequestPayload extends RequestPayload {
    params?: any;
}

const usePut: <T extends {}>(params?: IUseFetchProps) => IUseFetchResponse<T> = <T extends {}>(params = { abortOnUnmount: true }) => {
    const { request, ...rest } = useFetch<T>(params)

    const putRequest = useCallback((payload: PutRequestPayload = {}) => {
        return request({ headers: applicationJSONHeader, ...payload, method: "PUT" })
    }, [request])

    return {
        request: putRequest,
        ...rest
    }
}

export default usePut