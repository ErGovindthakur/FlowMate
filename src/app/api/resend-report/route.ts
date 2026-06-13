import { NextRequest } from "next/server";

import { z } from "zod";

import { prisma } from "@/lib/prisma";

import { AppError } from "@/lib/errors";

import { successResponse } from "@/lib/api-response";

import { handleError } from "@/lib/handle-error";

import { sendMail } from "@/services/email/mail.service";

import { generateReportEmailTemplate } from "@/services/email/mail.templates";

const resendReportSchema = z.object({
  leadId: z.string().min(1),
});

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const body = await req.json();

    const validatedData = resendReportSchema.parse(body);

    const lead = await prisma.lead.findUnique({
      where: {
        id: validatedData.leadId,
      },
    });

    if (!lead) {
      throw new AppError("Lead not found", 404);
    }

    if (!lead.pdfPath) {
      throw new AppError("PDF report not found", 404);
    }

    await sendMail({
      leadId: lead.id,

      to: lead.email,

      subject: `${lead.companyName} - AI Business Intelligence Report`,

      html: generateReportEmailTemplate(lead.companyName, lead.pdfPath),
    });

    return successResponse(null, "Report resent successfully");
  } catch (error) {
    return handleError(error);
  }
}
