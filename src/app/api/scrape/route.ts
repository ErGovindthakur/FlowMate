import { NextRequest } from "next/server";

import { z } from "zod";

import { scrapeWebsite } from "@/services/scraper/scraper.service";

import {
  successResponse,
} from "@/lib/api-response";

import { handleError } from "@/lib/handle-error";

const scrapeSchema = z.object({
  url: z
    .string()
    .url("Invalid website URL"),
});

export async function POST(
  req: NextRequest
): Promise<Response> {

  try {

    const body = await req.json();

    const validatedData =
      scrapeSchema.parse(body);

    const result =
      await scrapeWebsite(
        validatedData.url
      );

    return successResponse(
      result,
      "Website scraped successfully"
    );

  } catch (error) {

    return handleError(error);

  }
}