import { scrapeWebsite } from "@/services/scraper/scraper.service";

import { generateAIInsights } from "@/services/ai/groq.service";

import { generatePDF } from "@/services/pdf/pdf.service";

import { sendMail } from "@/services/email/mail.service";

import {
  createAutomationLog,
  saveAIInsights,
  savePDFPath,
  saveScrapedData,
  updateLeadStatus,
} from "./automation.repository";

export async function runAutomation(lead: {
  id: string;

  companyName: string;

  website: string;

  email: string;
}) {
  try {
    await updateLeadStatus(lead.id, "SCRAPING");

    await createAutomationLog(lead.id, "SCRAPING", "IN_PROGRESS");

    const scrapedData = await scrapeWebsite(lead.website);

    await saveScrapedData(lead.id, scrapedData);

    await createAutomationLog(lead.id, "SCRAPING", "SUCCESS");
    // await createAutomationLog(lead.id, "SCRAPING", "FAILED");
    await updateLeadStatus(lead.id, "GENERATING_INSIGHTS");

    await createAutomationLog(lead.id, "AI_INSIGHTS", "IN_PROGRESS");

    const insights = await generateAIInsights(scrapedData.cleanContent);

    await saveAIInsights(lead.id, insights);

    await createAutomationLog(lead.id, "AI_INSIGHTS", "SUCCESS");
    await updateLeadStatus(lead.id, "GENERATING_PDF");

    await createAutomationLog(lead.id, "PDF_GENERATION", "IN_PROGRESS");

    const pdfPath = await generatePDF({
      companyName: lead.companyName,

      website: lead.website,

      email: lead.email,

      insights,
    });

    await savePDFPath(lead.id, pdfPath);

    await createAutomationLog(lead.id, "PDF_GENERATION", "SUCCESS");

    await updateLeadStatus(lead.id, "SENDING_EMAIL");

    await createAutomationLog(lead.id, "EMAIL_SENDING", "IN_PROGRESS");

    await sendMail({
      leadId: lead.id,

      to: lead.email,

      subject: `${lead.companyName} - AI Business Intelligence Report`,

      html: `
  <div style="font-family: Arial, sans-serif; line-height: 1.7;">

    <h1 style="color: #2563EB;">
      AI Business Intelligence Report
    </h1>

    <p>
      Hello,
    </p>

    <p>
      Your AI-generated analysis for
      <strong>${lead.companyName}</strong>
      is ready.
    </p>

    <h2>Company Overview</h2>

    <p>
      ${insights.companyOverview}
    </p>

    <h2>Business Strengths</h2>

    <ul>
      ${insights.strengths.map((strength) => `<li>${strength}</li>`).join("")}
    </ul>

    <h2>Growth Opportunities</h2>

    <ul>
      ${insights.growthOpportunities
        .map((opportunity) => `<li>${opportunity}</li>`)
        .join("")}
    </ul>

    <h2>AI Automation Suggestions</h2>

    <ul>
      ${insights.automationSuggestions
        .map((suggestion) => `<li>${suggestion}</li>`)
        .join("")}
    </ul>

    <p>
      Please find the detailed PDF report attached.
    </p>

    <br />

    <p>
      — AI Automation System
    </p>

  </div>
`,

      attachmentPath: pdfPath,

      attachmentName: "AI_Report.pdf",
    });

    await createAutomationLog(lead.id, "EMAIL_SENDING", "SUCCESS");
    await updateLeadStatus(lead.id, "COMPLETED");

    return {
      success: true,
    };
  } catch (error: unknown) {
    console.error(error);

    await updateLeadStatus(lead.id, "FAILED");

    throw error;
  }
}
