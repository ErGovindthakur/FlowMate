import fs from "fs";

import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest
) {

  const path =
    req.nextUrl.searchParams.get("path");

  if (!path) {
    return new Response(
      "Missing path",
      {
        status: 400,
      }
    );
  }

  const file =
    fs.readFileSync(path);

  return new Response(file, {
    headers: {
      "Content-Type":
        "application/pdf",
    },
  });
}