import { NextRequest, NextResponse } from "next/server";

import { sendMail } from "@/services/email/mail.service";

import { generateReportEmailTemplate } from "@/services/email/mail.templates";

export async function POST(
  req: NextRequest
) {

  try {

    const body = await req.json();

    // Validation
    if (
      !body.leadId ||
      !body.to ||
      !body.companyName
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Missing required fields",
        },
        { status: 400 }
      );
    }

    await sendMail({
      leadId: body.leadId,

      to: body.to,

      subject:
        "Your AI Business Intelligence Report",

      html:
        generateReportEmailTemplate(
          body.companyName
        ),

      attachmentPath:
        body.attachmentPath,

      attachmentName:
        "AI_Report.pdf",
    });

    return NextResponse.json({
      success: true,
      message:
        "Email sent successfully",
    });

  } catch (error: unknown) {

    console.error(error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : "Unknown error";

    return NextResponse.json(
      {
        success: false,
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}