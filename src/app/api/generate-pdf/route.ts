import { NextRequest, NextResponse } from "next/server";

import { generatePDF } from "@/services/pdf/pdf.service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const pdfPath = await generatePDF(body);

    return NextResponse.json(
      {
        success: true,
        pdfPath,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("PDF Route Error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error.message || "Failed to generate PDF",
      },
      { status: 500 },
    );
  }
}