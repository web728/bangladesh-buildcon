import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const visitorDraftSchema = new Schema({
  draftId: { type: String, required: true, unique: true },
  status: { type: String, enum: ["draft", "submitted"], default: "draft", index: true },
  fullName: { type: String, default: "" },
  company: { type: String, default: "" },
  designation: { type: String, default: "" },
  mobile: { type: String, default: "" },
  email: { type: String, default: "" },
  businessCategory: { type: String, default: "" },
  country: { type: String, default: "" },
  landingPage: { type: String, default: "" },
  referenceId: { type: String, default: "" },
  lastInputAt: { type: Date, default: Date.now, index: true },
  expiresAt: { type: Date },
  sheetsSyncStatus: { type: String, enum: ["pending", "processing", "synced"], default: "pending", index: true },
  sheetsAttempts: { type: Number, default: 0 },
  sheetsLeaseUntil: Date,
  sheetsSyncedAt: Date,
  sheetsLastError: String,
}, { timestamps: true, versionKey: false });
visitorDraftSchema.index({ status: 1, sheetsSyncStatus: 1, lastInputAt: 1 });
visitorDraftSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
export type VisitorDraftDoc = InferSchemaType<typeof visitorDraftSchema>;
export const VisitorDraft: Model<VisitorDraftDoc> =
  (mongoose.models.VisitorDraft as Model<VisitorDraftDoc> | undefined) ??
  mongoose.model<VisitorDraftDoc>("VisitorDraft", visitorDraftSchema);
