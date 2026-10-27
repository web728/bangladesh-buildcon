
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

  // Logo fields
  logo?: string;
  logoUrl?: string;

  website?: string;

  country?: string;
  city?: string;

  category?: string;

  // Product fields
  products: string[];
  productCategories?: string[];
  productsServices?: string;

  // Exhibition details
  standNumber?: string;

  // Directory visibility
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

    /* ======================================
       BRANDING
    ====================================== */

    logo: {
      type: String,
      trim: true,
      default: "",
    },

    logoUrl: {
      type: String,
      trim: true,
      default: "",
    },

    website: {
      type: String,
      trim: true,
      default: "",
    },

    /* ======================================
       LOCATION
    ====================================== */

    country: {
      type: String,
      trim: true,
      default: "",
    },

    city: {
      type: String,
      trim: true,
      default: "",
    },

    /* ======================================
       PRODUCTS & CATEGORY
    ====================================== */

    category: {
      type: String,
      trim: true,
      default: "",
    },

    products: {
      type: [String],
      default: [],
    },

    productCategories: {
      type: [String],
      default: [],
    },

    productsServices: {
      type: String,
      trim: true,
      default: "",
    },

    /* ======================================
       EXHIBITION DETAILS
    ====================================== */

    standNumber: {
      type: String,
      trim: true,
      default: "",
    },

    /* ======================================
       DIRECTORY SETTINGS
    ====================================== */

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
  },
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
   MODEL EXPORT
========================================== */

export const Exhibitor: Model<ExhibitorDoc> =
  (mongoose.models.Exhibitor as
    | Model<ExhibitorDoc>
    | undefined) ??
  mongoose.model<ExhibitorDoc>(
    "Exhibitor",
    exhibitorSchema,
  );
