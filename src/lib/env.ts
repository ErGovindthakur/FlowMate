import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string(),
  GROQ_API_KEY: z.string(),
  RESEND_API_KEY:z.string().min(1),
  UPSTASH_REDIS_REST_URL:z.string(),
  UPSTASH_REDIS_REST_TOKEN:z.string()
});

export const env = envSchema.parse(process.env);