import { NextRequest } from "next/server";

import { z } from "zod";

import { sendMail } from "@/services/email/mail.service";

import { generateReportEmailTemplate } from "@/services/email/mail.templates";

import {
  successResponse,
} from "@/lib/api-response";

import { handleError } from "@/lib/handle-error";

const sendEmailSchema =
  z.object({
    leadId: z.string().min(1),

    to: z
      .string()
      .email("Invalid email address"),

    companyName: z.string().min(1),

    attachmentPath:
      z.string().optional(),
  });

export async function POST(
  req: NextRequest
): Promise<Response> {

  try {

    const body = await req.json();

    const validatedData =
      sendEmailSchema.parse(body);

    await sendMail({
      leadId:
        validatedData.leadId,

      to: validatedData.to,

      subject:
        "Your AI Business Intelligence Report",

      html:
        generateReportEmailTemplate(
          validatedData.companyName
        ),

      attachmentPath:
        validatedData.attachmentPath,

      attachmentName:
        "AI_Report.pdf",
    });

    return successResponse(
      null,
      "Email sent successfully"
    );

  } catch (error) {

    return handleError(error);

  }
}