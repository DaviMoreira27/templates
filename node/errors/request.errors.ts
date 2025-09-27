import type { $ZodFlattenedError } from "zod/v4/core";
import { HttpCode, HttpError, type HttpErrorArgs } from "./app.errors.ts";

export class RequestError extends HttpError {
  constructor(args: HttpErrorArgs) {
    const fullArgs: HttpErrorArgs = {
      ...args,
      code: `REQUEST_ERROR-${args.code}`,
    };
    super(fullArgs);
  }
}

export class InvalidRequestParameterError extends RequestError {
  constructor(
    message = "One or multiple invalid request parameters were provided",
    validationErrors?: $ZodFlattenedError<any>,
  ) {
    super({
      httpCode: HttpCode.BAD_REQUEST,
      message,
      validationErrors,
      code: "INVALID_REQUEST_PARAMETER",
    });
  }
}
