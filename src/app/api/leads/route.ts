import { NextRequest, NextResponse } from "next/server";

import { createLeadController } from "@/modules/lead/lead.controller";
import { createLeadSchema } from "@/modules/lead/lead.schema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const validatedData = createLeadSchema.parse(body);

    const lead = await createLeadController(validatedData);

    return NextResponse.json(
      {
        success: true,
        message: "Lead created successfully",
        data: lead,
      },
      { status: 201 }
    );
  } catch (error) {
     if(error instanceof Error){
          console.error("Error from Leads route : ",error.message);
     }
     console.log("Error from Leads route : ",error)

    return NextResponse.json(
      {
        success: false,
        message: error || "Something went wrong",
      },
      { status: 500 }
    );
  }
}