import { z } from "zod";
import { boothSizeOptions } from "./exhibitorEnquiry";

const optionalText = (max: number) =>
  z.string().trim().max(max).optional().default("");

/** Drafts are intentionally not subject to final-submit required-field validation. */
export const exhibitorDraftSchema = z.object({
  draftId: z.string().uuid(),
  // Require explicit acknowledgement of a displayed passive disclosure;
  // this is not a consent flag and does not establish a lawful basis.
  companyName: optionalText(150),
  contactPerson: optionalText(160),
  designation: optionalText(100),
  mobile: optionalText(40),
  email: optionalText(254),
  country: optionalText(100),
  productsServices: optionalText(1000),
  preferredBoothSize: z.union([z.enum(boothSizeOptions), z.literal("")]).optional().default(""),
  website_hp: optionalText(120),
  landingPage: optionalText(300),
}).strict();

export type ExhibitorDraftInput = z.input<typeof exhibitorDraftSchema>;
