import fs from "fs";

import path from "path";

import { NextRequest } from "next/server";

import { handleError } from "@/lib/handle-error";

import { AppError } from "@/lib/errors";

const PDF_DIRECTORY = path.join(
  process.cwd(),
  "src",
  "generated",
  "pdfs"
);

export async function GET(
  req: NextRequest
): Promise<Response> {

  try {

    const filePath =
      req.nextUrl.searchParams.get("path");

    if (!filePath) {

      throw new AppError(
        "PDF path is required",
        400
      );
    }

    // Get safe filename only
    const safeFileName =
      path.basename(filePath);

    // Build safe absolute path
    const absolutePath = path.join(
      PDF_DIRECTORY,
      safeFileName
    );

    // Check if file exists
    if (
      !fs.existsSync(absolutePath)
    ) {

      throw new AppError(
        "PDF file not found",
        404
      );
    }

    const file =
      fs.readFileSync(
        absolutePath
      );

    return new Response(file, {
      status: 200,

      headers: {
        "Content-Type":
          "application/pdf",

        "Content-Disposition":
          `attachment; filename="${safeFileName}"`,
      },
    });

  } catch (error) {

    return handleError(error);

  }
}