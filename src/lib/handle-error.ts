import { ZodError } from "zod";

import { errorResponse } from "./api-response";

import { AppError } from "./errors";

export function handleError(
  error: unknown
) {

  console.error(error);

  // Custom App Error
  if (error instanceof AppError) {

    return errorResponse(
      error.message,
      error.statusCode
    );
  }

  // Zod Validation Error
  if (error instanceof ZodError) {

    const firstError =
      error.issues[0]?.message ||
      "Validation failed";

    return errorResponse(
      firstError,
      400
    );
  }

  // Generic Error
  if (error instanceof Error) {

    return errorResponse(
      error.message,
      500
    );
  }

  // Unknown Error
  return errorResponse(
    "Internal Server Error",
    500
  );
}