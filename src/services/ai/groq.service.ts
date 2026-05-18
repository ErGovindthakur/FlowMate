import Groq from "groq-sdk";

import { AppError } from "@/lib/errors";

import { env } from "@/lib/env";

import { generateBusinessAnalysisPrompt } from "./prompts";

import { AIInsights } from "./ai.types";

import { aiInsightsSchema } from "./ai.schema";

const groq = new Groq({
  apiKey: env.GROQ_API_KEY,
});

export async function generateAIInsights(
  websiteContent: string
): Promise<AIInsights> {

  try {

    const prompt =
      generateBusinessAnalysisPrompt(
        websiteContent
      );

    const completion =
      await groq.chat.completions.create({
        model:
          "llama-3.3-70b-versatile",

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

    const response =
      completion.choices?.[0]
        ?.message?.content;

    if (!response) {

      throw new AppError(
        "Empty AI response received",
        500
      );
    }

    let parsedResponse;

    try {

      parsedResponse =
        JSON.parse(response);

    } catch {

      throw new AppError(
        "Invalid AI JSON response",
        500
      );
    }

    const validatedData =
      aiInsightsSchema.parse(
        parsedResponse
      );

    return validatedData;

  } catch (error) {

    console.error(
      "AI generation error:",
      error
    );

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      "Failed to generate AI insights",
      500
    );
  }
}