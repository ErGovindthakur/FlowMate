export function generateReportEmailTemplate(
  companyName: string,
  pdfPath: string
) {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #111827;">

      <h1 style="color: #2563EB;">
        AI Business Intelligence Report
      </h1>

      <p>
        Hello ${companyName} Team,
      </p>

      <p>
        We analyzed your business website and generated a professional AI-powered business intelligence report.
      </p>

      <p>
        The report includes:
      </p>

      <ul>
        <li>Business Overview</li>
        <li>Growth Opportunities</li>
        <li>AI Automation Suggestions</li>
        <li>Marketing Recommendations</li>
        <li>SEO Improvements</li>
      </ul>

      <p>
        Your report is ready and can be downloaded using the link below:
      </p>

      <p>
        <a
          href="${pdfPath}"
          target="_blank"
          style="
            display:inline-block;
            padding:12px 20px;
            background:#2563EB;
            color:white;
            text-decoration:none;
            border-radius:8px;
          "
        >
          Download PDF Report
        </a>
      </p>

      <br />

      <p>
        Regards,
      </p>

      <p>
        AI Automation System
      </p>

    </div>
  `;
}