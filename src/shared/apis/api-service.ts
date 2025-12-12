import {isProduction} from '../lib/isProduction';
import {RequestError, RequestGetError} from './request-error';
import {
  CreateErrorProps,
  CreateRequestInitProps,
  ErrorInfo,
  RequestInitWithMethod,
  RequestProps,
  RequestPropsWithoutMethod,
  WithErrorHandlingType,
} from './type';

function createRequestInit({method, body, headers}: CreateRequestInitProps) {
  const requestInit: RequestInitWithMethod = {
    credentials: 'include',
    method,
  };

  if (body instanceof FormData) {
    return {...requestInit, body};
  } else {
    return {
      ...requestInit,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : null,
    };
  }
}

function prepareRequest({
  baseUrl = isProduction ? 'https://error-handling-strategy.vercel.app/api' : 'http://localhost:3000/api',
  endpoint,
  method,
  headers,
  body,
  queryParams,
}: RequestProps) {
  let url = baseUrl + endpoint;

  if (queryParams) {
    const queryString = Object.entries(queryParams)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');

    url += `?${queryString}`;
  }

  const requestInit = createRequestInit({method, body, headers});

  return {url, requestInit};
}

async function handleRequestError({
  response,
  requestInit,
  body,
  errorHandlingType,
}: WithErrorHandlingType<CreateErrorProps>) {
  const defaultErrorInfo: ErrorInfo = {
    title: 'UNKNOWN_ERROR',
    detail: '알 수 없는 에러가 발생했어요.',
    status: response.status,
  };

  let parsedErrorInfo: Partial<ErrorInfo> = {};

  try {
    parsedErrorInfo = await response.json();
  } catch {
    // 실패 시 defaultErrorInfo 사용
  }

  const {title, detail, status} = {...defaultErrorInfo, ...parsedErrorInfo};

  if (requestInit.method === 'GET') {
    return new RequestGetError({
      name: title,
      message: detail,
      status,
      requestBody: body,
      endpoint: response.url,
      method: requestInit.method,
      errorHandlingType,
    });
  }

  return new RequestError({
    name: title,
    message: detail,
    status,
    method: requestInit.method,
    endpoint: response.url,
    requestBody: body,
  });
}

async function request<T>(props: WithErrorHandlingType<RequestProps>): Promise<T> {
  const {url, requestInit} = prepareRequest(props);

  let response: Response = await fetch(url, requestInit);

  if (!response.ok) {
    throw await handleRequestError({
      response,
      requestInit,
      body: requestInit.body ?? null,
      errorHandlingType: props.errorHandlingType,
    });
  }

  if (props.withResponse) {
    return await response.json();
  }

  return undefined as T;
}

export async function requestGet<T>({
  headers = {},
  errorHandlingType = 'errorBoundary',
  withResponse = true,
  ...args
}: WithErrorHandlingType<RequestPropsWithoutMethod>): Promise<T> {
  return request<T>({
    ...args,
    method: 'GET',
    headers,
    withResponse,
    errorHandlingType,
  });
}

export async function requestPost<T = void>({
  headers = {},
  withResponse = false,
  ...args
}: RequestPropsWithoutMethod): Promise<T> {
  return request<T>({
    ...args,
    method: 'POST',
    headers,
    withResponse,
  });
}
