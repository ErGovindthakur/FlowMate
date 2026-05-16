import { z } from "zod";

export const aiInsightsSchema = z.object({
  companyOverview: z.string(),

  strengths: z.array(z.string()),

  weaknesses: z.array(z.string()),

  growthOpportunities: z.array(z.string()),

  automationSuggestions: z.array(z.string()),

  marketingSuggestions: z.array(z.string()),

  seoImprovements: z.array(z.string()),
});