
import "server-only";

import mongoose, {
  Schema,
  type Model,
  type HydratedDocument,
} from "mongoose";

/* ==========================================
   EXHIBITOR TYPES
========================================== */

export interface ExhibitorDoc {
  companyName: string;
  slug: string;

  description?: string;
  logo?: string;
  website?: string;

  country?: string;
  city?: string;

  category?: string;
  productCategories?: string[];
  productsServices?: string;

  featured: boolean;
  published: boolean;
  sortOrder: number;

  createdAt?: Date;
  updatedAt?: Date;
}

export type ExhibitorDocument =
  HydratedDocument<ExhibitorDoc>;

/* ==========================================
   EXHIBITOR SCHEMA
========================================== */

const exhibitorSchema = new Schema<ExhibitorDoc>(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    logo: {
      type: String,
      default: "",
    },

    website: {
      type: String,
      default: "",
    },

    country: {
      type: String,
      default: "",
    },

    city: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      default: "",
    },

    productCategories: {
      type: [String],
      default: [],
    },

    productsServices: {
      type: String,
      default: "",
    },

    featured: {
      type: Boolean,
      default: false,
    },

    published: {
      type: Boolean,
      default: false,
    },

    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    collection: "exhibitors",
    versionKey: false,
  }
);

/* ==========================================
   INDEXES
========================================== */

exhibitorSchema.index({
  published: 1,
  sortOrder: 1,
  companyName: 1,
});

exhibitorSchema.index({
  featured: 1,
  published: 1,
});

/* ==========================================
   EXHIBITOR MODEL
========================================== */

export const Exhibitor: Model<ExhibitorDoc> =
  (mongoose.models.Exhibitor as
    | Model<ExhibitorDoc>
    | undefined) ??
  mongoose.model<ExhibitorDoc>(
    "Exhibitor",
    exhibitorSchema
  );
