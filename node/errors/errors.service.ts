import {
  HttpCode,
  type BaseHttpErrorResponse,
  type ServiceFailureError,
  type Services,
} from "./app.errors.ts";

export function handleServiceFailure(
  type: Services,
  errorData: Partial<BaseHttpErrorResponse>,
): ServiceFailureError {
  return {
    httpCode: errorData.httpCode ?? HttpCode.INTERNAL_SERVER_ERROR,
    code: errorData.code ?? "INTERNAL_SERVER_ERROR",
    message: errorData.message ?? "Unexpected error occurred",
    type: type,
  };
}
