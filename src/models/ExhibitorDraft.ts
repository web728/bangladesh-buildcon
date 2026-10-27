import mongoose, { Schema, type InferSchemaType } from "mongoose";

const exhibitorDraftSchema = new Schema(
  {
    draftId: { type: String, required: true, unique: true },
    kind: { type: String, default: "exhibitor", immutable: true },
    status: {
      type: String,
      enum: ["draft", "submitted"],
      default: "draft",
      index: true,
    },
    companyName: { type: String, default: "" },
    contactPerson: { type: String, default: "" },
    designation: { type: String, default: "" },
    mobile: { type: String, default: "" },
    email: { type: String, default: "" },
    country: { type: String, default: "" },
    productsServices: { type: String, default: "" },
    preferredBoothSize: { type: String, default: "" },
    landingPage: { type: String, default: "" },
    referenceId: { type: String, default: "" },
    sheetsSyncStatus: {
      type: String,
      enum: ["pending", "processing", "synced"],
      default: "pending",
      index: true,
    },
    sheetsAttempts: { type: Number, default: 0 },
    sheetsLeaseUntil: { type: Date },
    sheetsLastError: { type: String, default: "" },
    sheetsSyncedAt: { type: Date },
    lastInputAt: { type: Date, default: Date.now, index: true },
    expiresAt: { type: Date },
  },
  { timestamps: true, versionKey: false },
);

exhibitorDraftSchema.index({ status: 1, sheetsSyncStatus: 1, lastInputAt: 1 });
exhibitorDraftSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export type ExhibitorDraftDocument = InferSchemaType<typeof exhibitorDraftSchema>;

// Use the singular schema type instead of passing a Schema object to model().
export const ExhibitorDraft =
  (mongoose.models.ExhibitorDraft as mongoose.Model<ExhibitorDraftDocument> | undefined) ??
  mongoose.model<ExhibitorDraftDocument>("ExhibitorDraft", exhibitorDraftSchema);
