import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string().min(3).max(200),
  message: z.string().min(10).max(5000),
  company: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
