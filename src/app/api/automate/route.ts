import { NextRequest } from "next/server";
import { ratelimit } from "@/lib/rate-limit";
import { createLeadSchema } from "@/modules/lead/lead.schema";

import { createLeadController } from "@/modules/lead/lead.controller";

import { automateLeadController } from "@/modules/automation/automation.controller";

import { errorResponse, successResponse } from "@/lib/api-response";

import { handleError } from "@/lib/handle-error";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "anonymous";

    const { success } = await ratelimit.limit(ip);

    if (!success) {
      return errorResponse("Too many requests", 429);
    }
    const body = await req.json();

    const validatedData = createLeadSchema.parse(body);

    const lead = await createLeadController(validatedData);

    await automateLeadController(lead);

    return successResponse(lead, "Automation completed successfully");
  } catch (error) {
    return handleError(error);
  }
}
