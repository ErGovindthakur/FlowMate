import { z } from "zod";

export const createLeadSchema = z.object({
  companyName: z.string().min(2),
  website: z.string().url(),
  email: z.string().email(),
  industry: z.string().optional(),
});