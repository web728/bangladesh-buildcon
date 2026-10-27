import { z } from "zod";
import { emailSchema, phoneSchema, honeypotSchema, utmSchema } from "./shared";

export const visitorRegistrationSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name").max(160),
  company: z.string().trim().min(2, "Enter your company / organisation").max(150),
  designation: z.string().trim().min(2, "Enter your designation").max(100),
  mobile: phoneSchema,
  email: emailSchema,
  businessCategory: z.string().trim().max(150).optional().or(z.literal("")),
  country: z.string().trim().min(2, "Select a country").max(100),
  draftId: z.string().uuid().optional(),
  website_hp: honeypotSchema,
  startedAt: z.number().optional(),
  utm: utmSchema,
  landingPage: z.string().max(300).optional(),
});
export type VisitorRegistrationInput = z.infer<typeof visitorRegistrationSchema>;
