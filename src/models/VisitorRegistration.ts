import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const visitorRegistrationSchema = new Schema({
  referenceId: { type: String, required: true, unique: true },
  // Unique only if a real draftId string is supplied. Missing values are allowed.
  draftId: { type: String, default: undefined },
  fullName: { type: String, required: true, trim: true },
  company: { type: String, required: true, trim: true },
  designation: { type: String, required: true, trim: true },
  mobile: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true, index: true },
  businessCategory: { type: String, default: "" },
  country: { type: String, required: true },
  utm: { source: String, medium: String, campaign: String },
  landingPage: String,
  userAgent: String,
  status: {
    type: String,
    enum: ["New", "Contacted", "Qualified", "Follow-Up", "Confirmed", "Closed", "Invalid"],
    default: "New",
  },
  notes: [{ text: String, createdAt: { type: Date, default: Date.now } }],
  sheetsSyncStatus: { type: String, enum: ["pending", "synced", "failed"], default: "pending" },
  emailStatus: { type: String, enum: ["pending", "sent", "failed"], default: "pending" },
}, { timestamps: true });

visitorRegistrationSchema.index({ draftId: 1 }, {
  unique: true,
  partialFilterExpression: { draftId: { $type: "string" } },
});

export type VisitorRegistrationDoc = InferSchemaType<typeof visitorRegistrationSchema>;
export const VisitorRegistration: Model<VisitorRegistrationDoc> =
  (mongoose.models.VisitorRegistration as Model<VisitorRegistrationDoc> | undefined) ??
  mongoose.model<VisitorRegistrationDoc>("VisitorRegistration", visitorRegistrationSchema);
