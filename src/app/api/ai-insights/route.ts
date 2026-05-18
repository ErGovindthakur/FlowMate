import { NextRequest } from "next/server";

import { z } from "zod";

import { generateAIInsights } from "@/services/ai/groq.service";

import {
  successResponse,
} from "@/lib/api-response";

import { handleError } from "@/lib/handle-error";

const generateInsightsSchema = z.object({
  websiteContent: z
    .string()
    .min(20, "Website content is too short"),
});

export async function POST(
  req: NextRequest
): Promise<Response> {

  try {

    const body = await req.json();

    const validatedData =
      generateInsightsSchema.parse(body);

    const insights =
      await generateAIInsights(
        validatedData.websiteContent
      );

    return successResponse(
      insights,
      "AI insights generated successfully"
    );

  } catch (error) {

    return handleError(error);

  }
}