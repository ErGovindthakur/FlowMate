import { prisma } from "@/lib/prisma";

export async function createEmailLog(data: {
  leadId: string;

  recipient: string;

  subject: string;

  status: "SENT" | "FAILED";

  error?: string;
}) {
  return prisma.emailLog.create({
    data,
  });
}