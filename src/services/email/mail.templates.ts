export function generateReportEmailTemplate(
  companyName: string
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
        The attached PDF includes:
      </p>

      <ul>
        <li>Business Overview</li>
        <li>Growth Opportunities</li>
        <li>AI Automation Suggestions</li>
        <li>Marketing Recommendations</li>
        <li>SEO Improvements</li>
      </ul>

      <p>
        Please find the report attached with this email.
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