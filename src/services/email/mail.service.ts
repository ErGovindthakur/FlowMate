// import fs from "fs";

// import path from "path";

// import { Resend } from "resend";

// import { SendMailInput } from "./mail.types";

// import { env } from "@/lib/env";

// import { AppError } from "@/lib/errors";

// import { createEmailLog } from "@/modules/email/email.repository";

// const resend = new Resend(
//   env.RESEND_API_KEY
// );

// export async function sendMail(
//   data: SendMailInput
// ) {

//   const {
//     leadId,
//     to,
//     subject,
//     html,
//     attachmentPath,
//     attachmentName,
//   } = data;

//   try {

//     const attachments: {
//       filename: string;
//       content: string;
//     }[] = [];

//     if (attachmentPath) {

//       const safePath =
//         path.resolve(
//           attachmentPath
//         );

//       if (
//         !fs.existsSync(safePath)
//       ) {

//         throw new AppError(
//           "Attachment file not found",
//           404
//         );
//       }

//       const fileBuffer =
//         fs.readFileSync(
//           safePath
//         );

//       if (!fileBuffer.length) {

//         throw new AppError(
//           "Attachment file is empty",
//           400
//         );
//       }

//       attachments.push({
//         filename:
//           attachmentName ||
//           "report.pdf",

//         content:
//           fileBuffer.toString(
//             "base64"
//           ),
//       });
//     }

//     const info =
//       await resend.emails.send({
//         from:
//           "AI Automation System <onboarding@resend.dev>",

//         to,

//         subject,

//         html,

//         attachments,
//       });

//     if (info.error) {

//       throw new AppError(
//         info.error.message ||
//           "Email sending failed",
//         500
//       );
//     }

//     await createEmailLog({
//       leadId,

//       recipient: to,

//       subject,

//       status: "SENT",
//     });

//     return info;

//   } catch (error) {

//     console.error(
//       "Mail error:",
//       error
//     );

//     const errorMessage =
//       error instanceof Error
//         ? error.message
//         : "Unknown email error";

//     await createEmailLog({
//       leadId,

//       recipient: to,

//       subject,

//       status: "FAILED",

//       error: errorMessage,
//     });

//     if (error instanceof AppError) {
//       throw error;
//     }

//     throw new AppError(
//       errorMessage,
//       500
//     );
//   }
// }


import { Resend } from "resend";

import { SendMailInput } from "./mail.types";

import { env } from "@/lib/env";

import { AppError } from "@/lib/errors";

import { createEmailLog } from "@/modules/email/email.repository";

const resend = new Resend(
  env.RESEND_API_KEY
);

export async function sendMail(
  data: SendMailInput
) {
  const {
    leadId,
    to,
    subject,
    html,
  } = data;

  try {
    const info =
      await resend.emails.send({
        from:
          "AI Automation System <onboarding@resend.dev>",

        to,

        subject,

        html,
      });

    if (info.error) {
      throw new AppError(
        info.error.message ||
          "Email sending failed",
        500
      );
    }

    await createEmailLog({
      leadId,

      recipient: to,

      subject,

      status: "SENT",
    });

    return info;
  } catch (error) {
    console.error(
      "Mail error:",
      error
    );

    const errorMessage =
      error instanceof Error
        ? error.message
        : "Unknown email error";

    await createEmailLog({
      leadId,

      recipient: to,

      subject,

      status: "FAILED",

      error: errorMessage,
    });

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      errorMessage,
      500
    );
  }
}