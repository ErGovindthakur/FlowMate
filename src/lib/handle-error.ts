import { ZodError } from "zod";

import { errorResponse } from "./api-response";

import { AppError } from "./errors";

export function handleError(
  error: unknown
) {

  console.error(error);

  // Custom application errors
  if (error instanceof AppError) {

    if (
      error.statusCode === 403
    ) {

      return errorResponse(
        "This website blocks automated scraping requests.",
        403
      );
    }

    return errorResponse(
      error.message,
      error.statusCode
    );
  }

  // Validation errors
  if (error instanceof ZodError) {

    const firstError =
      error.issues[0]?.message ||
      "Validation failed";

    return errorResponse(
      firstError,
      400
    );
  }

  // Unknown/internal errors
  return errorResponse(
  "Something unexpected happened. Please try again later.",
  500
);
}