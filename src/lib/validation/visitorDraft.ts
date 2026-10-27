import { z } from "zod";
const text = (max: number) => z.string().trim().max(max).optional().default("");
export const visitorDraftSchema = z.object({
  draftId: z.string().uuid(),
  fullName: text(160),
  company: text(150),
  designation: text(100),
  mobile: text(40),
  email: text(254),
  businessCategory: text(150),
  country: text(100),
  landingPage: text(300),
  website_hp: text(120),
}).strict();
