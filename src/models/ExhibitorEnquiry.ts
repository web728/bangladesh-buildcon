
import mongoose, {
  Schema,
  type InferSchemaType,
  type Model,
} from "mongoose";

const exhibitorEnquirySchema = new Schema(
  {
    referenceId: {
      type: String,
      required: true,
      unique: true,
    },

    draftId: {
      type: String,
      default: undefined,
    },

    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    contactPerson: {
      type: String,
      required: true,
      trim: true,
    },

    designation: {
      type: String,
      required: true,
      trim: true,
    },

    mobile: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    country: {
      type: String,
      required: true,
      trim: true,
    },

    productsServices: {
      type: String,
      required: true,
      trim: true,
    },

    preferredBoothSize: {
      type: String,
      default: undefined,
    },

    utm: {
      type: Schema.Types.Mixed,
    },

    landingPage: {
      type: String,
      default: "",
    },

    userAgent: {
      type: String,
      default: "",
    },

    sheetsSyncStatus: {
      type: String,
      enum: ["pending", "synced", "failed"],
      default: "pending",
    },

    emailStatus: {
      type: String,
      enum: ["pending", "sent", "failed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

exhibitorEnquirySchema.index(
  { draftId: 1 },
  {
    unique: true,
    partialFilterExpression: {
      draftId: { $type: "string" },
    },
  },
);

export type ExhibitorEnquiryDocument =
  InferSchemaType<typeof exhibitorEnquirySchema>;

export const ExhibitorEnquiry: Model<ExhibitorEnquiryDocument> =
  (mongoose.models.ExhibitorEnquiry as
    | Model<ExhibitorEnquiryDocument>
    | undefined) ??
  mongoose.model<ExhibitorEnquiryDocument>(
    "ExhibitorEnquiry",
    exhibitorEnquirySchema,
  );
