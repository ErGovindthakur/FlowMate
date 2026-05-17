import { NextRequest, NextResponse } from "next/server";

import { createLeadController } from "@/modules/lead/lead.controller";

import { createLeadSchema } from "@/modules/lead/lead.schema";

import { automateLeadController } from "@/modules/automation/automation.controller";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const validatedData =
      createLeadSchema.parse(body);

    const lead =
      await createLeadController(
        validatedData
      );

    await automateLeadController(lead);

    return NextResponse.json({
      success: true,

      message:
        "Automation completed successfully",
    });

  } catch (error: unknown) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Something went wrong",
      },

      {
        status: 500,
      }
    );
  }
}