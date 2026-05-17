import { AIInsights } from "../ai/ai.types";

export interface GeneratePDFInput {
  companyName: string;
  website: string;
  email: string;

  insights: AIInsights;
}