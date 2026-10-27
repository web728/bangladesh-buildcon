import { z } from "zod";
import {
  phoneSchema,
  emailSchema,
  honeypotSchema,
  utmSchema,
} from "./shared";

export const boothSizeOptions = [
  "9 sqm", "12 sqm", "18 sqm", "24 sqm", "36 sqm", "48 sqm",
  "54 sqm", "72 sqm", "90 sqm+",
] as const;

export const exhibitorEnquirySchema = z.object({
  companyName: z.string().trim().min(2, "Enter company name").max(150),
  contactPerson: z.string().trim().min(2, "Enter contact person").max(160),
  designation: z.string().trim().min(2, "Enter designation").max(100),
  mobile: phoneSchema,
  email: emailSchema,
  country: z.string().trim().min(2, "Select a country").max(100),
  productsServices: z.string().trim().min(2, "Describe your products or services").max(1000),
  preferredBoothSize: z.union([z.enum(boothSizeOptions), z.literal("")]).optional(),
  website_hp: honeypotSchema,
  startedAt: z.number().optional(),
  utm: utmSchema,
  landingPage: z.string().max(300).optional(),
});

export type ExhibitorEnquiryInput = z.infer<typeof exhibitorEnquirySchema>;
