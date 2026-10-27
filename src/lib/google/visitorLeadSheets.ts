import "server-only";
import { upsertLeadRow } from "@/lib/google/sheets";

export type VisitorSheetLead = {
  referenceId: string;
  registerAs: string;
  fullName: string;
  company: string;
  designation: string;
  mobile: string;
  email: string;
  businessCategory: string;
  country: string;
  landingPage?: string;
  status: "Draft - Not Submitted" | "Submitted";
};

/** Same Sheet tab and columns A:P; Q:Y (staff statuses) remain untouched. */
export async function upsertVisitorLeadRow(key: string, row: VisitorSheetLead): Promise<void> {
  if (!/^VISITOR:(?:[a-f0-9-]{36}|TBVR[A-Za-z0-9_-]{3,80})$/i.test(key)) {
    throw new Error("Invalid visitor key");
  }
  await upsertLeadRow(key, {
    referenceId: row.referenceId,
    registerAs: row.registerAs,
    companyName: row.company,
    contactPerson: row.fullName,
    designation: row.designation,
    mobile: row.mobile,
    email: row.email,
    country: row.country,
    areaOfInterest: row.businessCategory,
    landingPage: row.landingPage,
    message: row.status,
  });
}
