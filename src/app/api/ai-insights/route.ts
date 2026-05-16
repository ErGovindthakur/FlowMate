import { NextRequest, NextResponse } from "next/server";

import { generateAIInsights } from "@/services/ai/groq.service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const insights = await generateAIInsights(
      body.websiteContent
    );

    return NextResponse.json({
      success: true,
      data: insights,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}