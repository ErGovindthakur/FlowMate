import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { runAutomation } from "@/modules/automation/automation.service";

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

    await prisma.lead.update({
      where: {
        id: lead.id,
      },

      data: {
        status: "PENDING",

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
            : "Retry failed",
      },

      {
        status: 500,
      }
    );
  }
}