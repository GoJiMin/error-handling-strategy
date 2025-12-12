import {CLIENT_ERROR_MESSAGE, ClientErrorCode} from '../consts/errorMessage';

export class ClientError extends Error {
  name: ClientErrorCode;

  constructor(code: ClientErrorCode) {
    super(CLIENT_ERROR_MESSAGE[code]);

    this.name = code;
  }
}
