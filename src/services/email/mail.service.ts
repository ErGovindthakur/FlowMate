import fs from "fs";
// import path from "path";

import { Resend } from "resend";

import { SendMailInput } from "./mail.types";

import { env } from "@/lib/env";

import { createEmailLog } from "@/modules/email/email.repository";

const resend = new Resend(env.RESEND_API_KEY);

export async function sendMail(
  data: SendMailInput
) {

  const {
    leadId,
    to,
    subject,
    html,
    attachmentPath,
    attachmentName,
  } = data;

  try {

    let attachments:
      | {
          filename: string;
          content: string;
        }[]
      = [];

    if (attachmentPath) {

  // Use direct absolute path
  const fullPath = attachmentPath;

  // Check file exists
  if (!fs.existsSync(fullPath)) {
    throw new Error(
      `File not found: ${fullPath}`
    );
  }

  attachments = [
    {
      filename:
        attachmentName || "report.pdf",

      content: fs
        .readFileSync(fullPath)
        .toString("base64"),
    },
  ];
}

    const info = await resend.emails.send({
      from:
        "AI Automation System <onboarding@resend.dev>",

      to,

      subject,

      html,

      attachments,
    });

    await createEmailLog({
      leadId,
      recipient: to,
      subject,
      status: "SENT",
    });

    return info;

  } catch (error: unknown) {

    console.error("Mail error:", error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : "Unknown error";

    await createEmailLog({
      leadId,
      recipient: to,
      subject,
      status: "FAILED",
      error: errorMessage,
    });

    throw new Error(errorMessage);
  }
}