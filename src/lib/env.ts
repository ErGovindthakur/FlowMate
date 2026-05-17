import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string(),
  GROQ_API_KEY: z.string(),
  EMAIL_USER: z.string(),
  EMAIL_PASS: z.string(),
  RESEND_API_KEY:z.string().min(1)
});

export const env = envSchema.parse(process.env);