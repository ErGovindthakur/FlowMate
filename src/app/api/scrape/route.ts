import { NextRequest, NextResponse } from "next/server";

import { scrapeWebsite } from "@/services/scraper/scraper.service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate input
    if (!body.url) {
      return NextResponse.json(
        {
          success: false,
          message: "URL is required",
        },
        { status: 400 },
      );
    }

    const result = await scrapeWebsite(body.url);

    return NextResponse.json(
      {
        success: true,
        data: result,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Scrape API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Something went wrong",
      },
      { status: 500 },
    );
  }
}