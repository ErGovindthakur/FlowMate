import { NextRequest } from "next/server";

import { z } from "zod";

import { generatePDF } from "@/services/pdf/pdf.service";

import {
  successResponse,
} from "@/lib/api-response";

import { handleError } from "@/lib/handle-error";

const generatePDFSchema = z.object({
  companyName: z.string(),
  website: z.string(),
  email: z.string().email(),

  insights: z.object({
    companyOverview: z.string(),

    strengths: z.array(z.string()),

    weaknesses: z.array(z.string()),

    growthOpportunities: z.array(
      z.string()
    ),

    automationSuggestions:
      z.array(z.string()),

    marketingSuggestions:
      z.array(z.string()),

    seoImprovements:
      z.array(z.string()),
  }),
});

export async function POST(
  req: NextRequest
): Promise<Response> {

  try {

    const body = await req.json();

    const validatedData =
      generatePDFSchema.parse(body);

    const pdfPath =
      await generatePDF(
        validatedData
      );

    return successResponse(
      { pdfPath },
      "PDF generated successfully"
    );

  } catch (error) {

    return handleError(error);

  }
}