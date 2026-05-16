import Groq from "groq-sdk";
import { generateBusinessAnalysisPrompt } from "./prompts";

import { AIInsights } from "./ai.types";
import { aiInsightsSchema } from "./ai.schema";

import { env } from "@/lib/env";

const groq = new Groq({
  apiKey: env.GROQ_API_KEY,
});

export async function generateAIInsights(
  websiteContent: string,
): Promise<AIInsights> {
  try {
    const prompt = generateBusinessAnalysisPrompt(websiteContent);

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],

      temperature: 0.5,

      response_format: {
        type: "json_object",
      },
    });

    const response = completion.choices[0]?.message?.content;

    if (!response) {
      throw new Error("No AI response");
    }

    const parsedResponse = JSON.parse(response);

    const validatedData = aiInsightsSchema.parse(parsedResponse);

    return validatedData;
  } catch (error) {
    console.error("AI generation error:", error);

    throw new Error("Failed to generate AI insights");
  }
}
