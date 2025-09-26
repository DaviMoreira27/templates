import type { BaseInterface } from "../interfaces/config.interface";

export enum HttpCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  NOT_ACCEPTABLE = 406,
  UNPROCESSABLE_CONTENT = 422,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
}

export type Services = "google" | "worker";

export interface BaseHttpErrorResponse {
  code: string;
  httpCode: HttpCode;
  message: string;
}

export interface HttpExternalServiceError extends BaseHttpErrorResponse {
  type: Services;
}

export interface HttpConfigInterface {
  redirect?: URL;
}

export interface HttpErrorArgs extends BaseHttpErrorResponse {
  externalError?: HttpExternalServiceError;
  validationErrors?: object;
  config?: HttpConfigInterface;
}

export class HttpError extends Error {
  public readonly code: string;
  public readonly httpCode: HttpCode;
  public readonly externalError: HttpExternalServiceError | undefined;
  public readonly validationErrors: object | undefined;
  public readonly config: HttpConfigInterface | undefined;

  constructor(args: HttpErrorArgs) {
    super(args.message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.code = args.code;
    this.httpCode = args.httpCode;
    this.externalError = args.externalError;
    this.validationErrors = args.validationErrors;
    this.config = args.config;

    this.stack = new Error().stack;
  }

  toJSON(c: BaseInterface) {
    return {
      code: this.code,
      message: this.message,
      httpCode: this.httpCode,
      validationErrors: this.validationErrors,
      externalError:
        c.environment !== "production" ? this.externalError : undefined,
    };
  }
}
