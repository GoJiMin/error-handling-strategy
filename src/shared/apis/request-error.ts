import {ErrorHandlingType, RequestErrorProps, WithErrorHandlingType} from './type';

export class RequestError extends Error {
  requestBody;
  status;
  endpoint;
  method;

  constructor({name, message, status, endpoint, method, requestBody}: RequestErrorProps) {
    super(message);

    this.name = name;
    this.status = status;
    this.endpoint = endpoint;
    this.method = method;
    this.requestBody = requestBody;
  }
}

export class RequestGetError extends RequestError {
  errorHandlingType: ErrorHandlingType;

  constructor({errorHandlingType = 'errorBoundary', ...rest}: WithErrorHandlingType<RequestErrorProps>) {
    super(rest);

    this.errorHandlingType = errorHandlingType;
  }
}
