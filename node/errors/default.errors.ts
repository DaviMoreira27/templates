import {
  HttpCode,
  HttpError,
  type HttpErrorArgs,
  type ServiceFailureError,
} from "./app.errors.ts";
import type { ZodError } from "zod";

export class InternalError extends HttpError {
  constructor(args: HttpErrorArgs) {
    const fullArgs: HttpErrorArgs = {
      ...args,
      code: `INTERNAL_ERROR-${args.code}`,
    };
    super(fullArgs);
  }
}

export class ConfigError extends InternalError {
  constructor(
    message = "An unexpected error occurred",
    serviceFailure?: ServiceFailureError,
  ) {
    super({
      httpCode: HttpCode.INTERNAL_SERVER_ERROR,
      message,
      serviceFailure,
      code: "CONFIG_ERROR",
    });
  }
}

export class UnknowInternalError extends InternalError {
  constructor(
    message = "An unexpected error occurred",
    validationErrors?: ZodError, // Pay attention to the current zod version being used, for v3 is this 'typeToFlattenedError'
    serviceFailure?: ServiceFailureError,
  ) {
    super({
      httpCode: HttpCode.INTERNAL_SERVER_ERROR,
      message,
      code: "UNKNOW_INTERNAL_ERROR",
      validationErrors,
      serviceFailure,
    });
  }
}
