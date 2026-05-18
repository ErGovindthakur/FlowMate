import { NextRequest } from "next/server";

import { createLeadController } from "@/modules/lead/lead.controller";

import { createLeadSchema } from "@/modules/lead/lead.schema";

import {
  successResponse,
} from "@/lib/api-response";

import { handleError } from "@/lib/handle-error";

export async function POST(
  req: NextRequest
): Promise<Response> {

  try {

    const body = await req.json();

    const validatedData =
      createLeadSchema.parse(body);

    const lead =
      await createLeadController(
        validatedData
      );

    return successResponse(
      lead,
      "Lead created successfully",
      201
    );

  } catch (error) {

    return handleError(error);

  }
}