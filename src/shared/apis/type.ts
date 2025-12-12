export type Method = 'GET' | 'POST';
export type Headers = Record<string, string>;
export type Body = BodyInit | object | null;
export type QueryParams = Record<string, string | number | boolean>;
export type RequestInitWithMethod = Omit<RequestInit, 'method'> & {
  method: Method;
};

export type CreateRequestInitProps = {
  body?: Body;
  method: Method;
  headers?: Headers;
};

export type RequestProps = {
  baseUrl?: string;
  endpoint: string;
  method: Method;
  headers?: Headers;
  body?: Body;
  queryParams?: QueryParams;
  withResponse?: boolean;
};

export type RequestPropsWithoutMethod = Omit<RequestProps, 'method'>;

export type RequestErrorProps = Error & {
  status: number;
  endpoint: string;
  method?: Method;
  requestBody: Body;
};

export type ErrorHandlingType = 'toast' | 'errorBoundary';

export type WithErrorHandlingType<P = unknown> = P & {
  errorHandlingType?: ErrorHandlingType;
};

export type CreateErrorProps = {
  response: Response;
  requestInit: RequestInitWithMethod;
  body: Body;
};

export type ErrorInfo = {
  status: number;
  title: string;
  detail: string;
};
