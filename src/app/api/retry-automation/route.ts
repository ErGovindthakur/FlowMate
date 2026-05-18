import { NextRequest } from "next/server";

import { z } from "zod";

import { prisma } from "@/lib/prisma";

import { AppError } from "@/lib/errors";

import {
  successResponse,
} from "@/lib/api-response";

import { handleError } from "@/lib/handle-error";

import { runAutomation } from "@/modules/automation/automation.service";

const retryAutomationSchema =
  z.object({
    leadId: z.string().min(1),
  });

export async function POST(
  req: NextRequest
): Promise<Response> {

  try {

    const body = await req.json();

    const validatedData =
      retryAutomationSchema.parse(body);

    const lead =
      await prisma.lead.findUnique({
        where: {
          id: validatedData.leadId,
        },
      });

    if (!lead) {

      throw new AppError(
        "Lead not found",
        404
      );
    }

    await prisma.lead.update({
      where: {
        id: lead.id,
      },

      data: {
        status: "SCRAPING",

        retryCount: {
          increment: 1,
        },
      },
    });

    await runAutomation({
      id: lead.id,

      companyName:
        lead.companyName,

      website: lead.website,

      email: lead.email,
    });

    return successResponse(
      null,
      "Automation retry started"
    );

  } catch (error) {

    return handleError(error);

  }
}