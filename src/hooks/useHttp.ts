import axios, { AxiosResponse } from "axios";

import { useState } from "react";
import { HttpMethod, StatusCode } from "../common/enums/http";

interface HttpRequest {
  response: AxiosResponse | null;
  isLoading: boolean;
  errors?: any;
}

const httpRequestInit: HttpRequest = {
  response: null,
  isLoading: false,
  errors: null,
};

const useHttp = (
  url: string,
  method: HttpMethod
): [
  (payload?: any, queryParam?: string, config?: any) => void,
  HttpRequest
] => {
  const [httpRequestState, setHttpRequestState] = useState(httpRequestInit);

  const handleError = (response: AxiosResponse) => {
    const { status, data } = response;

    switch (status) {
      case StatusCode.Unauthorized:
        console.error({ message: "Forbidden: Unauthorized" });
        break;
      case StatusCode.Forbidden:
        console.error({
          message:
            "Forbidden: You do not have permission to access. Please contact your admin",
        });
        break;
      case StatusCode.InternalServerError:
        console.error({
          message:
            "Internal server error: Somthing went wrong. Please try again later",
        });
        break;
      case StatusCode.BadRequest:
        setHttpRequestState({
          response: null,
          isLoading: false,
          errors: data.errors,
        });
        break;
      default:
        break;
    }

    return Promise.reject(response);
  };

  const http = axios.create({
    baseURL: import.meta.env.BASE_URL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Cache-Control": "max-age=14400",
    },
  });

  http.interceptors.response.use(undefined, (error) => {
    const { response } = error;

    return handleError(response);
  });

  const setReponseData = async (httpClient: Promise<AxiosResponse>) => {
    try {
      const response = await httpClient;
      setHttpRequestState({
        response: response,
        isLoading: false,
        errors: null,
      });
    } finally {
      setHttpRequestState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const invokeRequest = (payload?: any, queryParam = "", config?: any) => {
    setHttpRequestState((prev) => ({ ...prev, isLoading: true }));

    switch (method) {
      case HttpMethod.GET:
        setReponseData(http.get(`${url}/${queryParam}`));
        break;
      case HttpMethod.POST:
        setReponseData(http.post(url, payload, config));
        break;
      default:
        setHttpRequestState((prev) => ({
          ...prev,
          loading: false,
          errors: "Invalid http method",
        }));
        break;
    }
  };

  return [invokeRequest, httpRequestState];
};

export default useHttp;
