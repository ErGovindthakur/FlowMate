import { prisma } from "@/lib/prisma";

import {
  AutomationStep,
  LeadStatus,
  LogStatus,
  Prisma
} from "@prisma/client";

export async function updateLeadStatus(
  leadId: string,
  status: LeadStatus
) {
  return prisma.lead.update({
    where: {
      id: leadId,
    },

    data: {
      status,
    },
  });
}

export async function saveScrapedData(
  leadId: string,
  scrapedData: unknown
) {
  return prisma.lead.update({
    where: {
      id: leadId,
    },

    data: {
      scrapedData:scrapedData as Prisma.InputJsonValue,
    },
  });
}

export async function saveAIInsights(
  leadId: string,
  aiInsights: unknown
) {
  return prisma.lead.update({
    where: {
      id: leadId,
    },

    data: {
      aiInsights:aiInsights as Prisma.InputJsonValue,
    },
  });
}

export async function savePDFPath(
  leadId: string,
  pdfPath: string
) {
  return prisma.lead.update({
    where: {
      id: leadId,
    },

    data: {
      pdfPath,
    },
  });
}

export async function createAutomationLog(
  leadId: string,

  step: AutomationStep,

  status: LogStatus,

  message?: string
) {
  return prisma.automationLog.create({
    data: {
      leadId,
      step,
      status,
      message,
    },
  });
}