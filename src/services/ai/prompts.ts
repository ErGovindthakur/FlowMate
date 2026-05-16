export function generateBusinessAnalysisPrompt(
  websiteContent: string
) {
  return `
You are an expert AI business analyst.

Analyze the company website content below and generate professional business insights.

Return ONLY valid JSON.

Website Content:
${websiteContent}

Required JSON Structure:

{
  "companyOverview": "string",

  "strengths": ["string"],

  "weaknesses": ["string"],

  "growthOpportunities": ["string"],

  "automationSuggestions": ["string"],

  "marketingSuggestions": ["string"],

  "seoImprovements": ["string"]
}
`;
}