import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { sendMail } from "@/services/email/mail.service";

import { generateReportEmailTemplate } from "@/services/email/mail.templates";

export async function POST(
  req: NextRequest
) {

  try {

    const body =
      await req.json();

    const lead =
      await prisma.lead.findUnique({
        where: {
          id: body.leadId,
        },
      });

    if (!lead) {
      throw new Error(
        "Lead not found"
      );
    }

    if (!lead.pdfPath) {
      throw new Error(
        "PDF not found"
      );
    }

    await sendMail({
      leadId: lead.id,

      to: lead.email,

      subject:
        `${lead.companyName} - AI Business Intelligence Report`,

      html:
        generateReportEmailTemplate(
          lead.companyName
        ),

      attachmentPath:
        lead.pdfPath,

      attachmentName:
        "AI_Report.pdf",
    });

    return NextResponse.json({
      success: true,
    });

  } catch (error: unknown) {

    return NextResponse.json(
      {
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Resend failed",
      },

      {
        status: 500,
      }
    );
  }
}