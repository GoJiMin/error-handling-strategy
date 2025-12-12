import {RequestError} from '../apis';
import {CLIENT_ERROR_MESSAGE, ClientErrorCode, SERVER_ERROR_MESSAGE} from '../consts/errorMessage';
import {ClientError} from './client-error';

export function isRequestError(error: Error): error is RequestError {
  return error instanceof RequestError;
}

export function isPredictableServerError(error: Error) {
  return isRequestError(error) && SERVER_ERROR_MESSAGE[error.name] !== undefined;
}

export function isClientError(error: Error): error is ClientError {
  return error instanceof ClientError && CLIENT_ERROR_MESSAGE[error.name] !== undefined;
}

export function createClientError(code: ClientErrorCode) {
  return new ClientError(code);
}
