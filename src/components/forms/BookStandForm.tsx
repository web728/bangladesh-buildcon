
"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ReCAPTCHA from "react-google-recaptcha";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import {
  exhibitorEnquirySchema,
  type ExhibitorEnquiryInput,
  companyTypeOptions,
  participationOptions,
  areaOptions,
  yesNoOptions,
  yesNoMaybeOptions,
} from "@/lib/validation/exhibitorEnquiry";

import { FieldWrapper, inputClasses } from "./fields";
import { SuccessPanel } from "./SuccessPanel";
import {
  useLeadSubmit,
  getUtmFromLocation,
} from "@/hooks/useLeadSubmit";
import { countries } from "@/data/countries";
import { exhibitionSectors } from "@/data/exhibitionProfile";

const EASE = [0.22, 1, 0.36, 1] as const;

const SITE_KEY =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

const UNIQUE_COUNTRIES = Array.from(
  new Set(
    countries.map((c) => c.trim()).filter(Boolean)
  )
);

const sectionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: EASE,
    },
  },
};

const staggerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
      aria-hidden="true"
    >
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      aria-hidden="true"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
      aria-hidden="true"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function LoaderIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5 animate-spin"
      aria-hidden="true"
    >
      <path
        d="M12 3a9 9 0 1 0 9 9"
        strokeOpacity="0.25"
      />
      <path d="M12 3a9 9 0 0 1 9 9" />
    </svg>
  );
}

function SectionHeading({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-7 flex items-start gap-4 border-b border-[#E9EAF0] pb-5">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 font-heading text-[13px] font-extrabold text-brand-primary">
        {number}
      </span>

      <div>
        <h3 className="font-heading text-[18px] font-extrabold tracking-[-0.03em] text-brand-dark sm:text-[20px]">
          {title}
        </h3>

        <p className="mt-1 text-[12px] leading-relaxed text-[#7A8290] sm:text-[13px]">
          {description}
        </p>
      </div>
    </div>
  );
}

function premiumInput(hasError = false) {
  return [
    inputClasses(hasError),
    "w-full min-w-0 rounded-xl border",
    "bg-[#FAFAFC] text-[#20242E]",
    "placeholder:text-[#A1A7B2]",
    "transition-[border-color,background-color,box-shadow] duration-300",
    "hover:border-[#BBC0CB]",
    "focus:bg-white focus:outline-none focus:ring-2",
    hasError
      ? "!border-red-400 focus:!border-red-500 focus:ring-red-500/10"
      : "border-[#E1E4EA] focus:!border-[#BA1D82] focus:ring-[#BA1D82]/10",
  ].join(" ");
}

function MotionSection({
  children,
  reducedMotion,
}: {
  children: React.ReactNode;
  reducedMotion: boolean;
}) {
  return (
    <motion.section
      variants={sectionVariants}
      initial={reducedMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.08,
      }}
      className="min-w-0"
    >
      {children}
    </motion.section>
  );
}

export function BookStandForm() {
  const reducedMotion = !!useReducedMotion();

  const [startedAt] = useState(() => Date.now());

  const [recaptchaToken, setRecaptchaToken] =
    useState<string | null>(null);

  const [captchaError, setCaptchaError] =
    useState<string | null>(null);

  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const {
    submit,
    status,
    referenceId,
    errorMessage,
  } = useLeadSubmit("/api/exhibitor-enquiry");

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ExhibitorEnquiryInput>({
    resolver: zodResolver(exhibitorEnquirySchema),
    defaultValues: {
      preferredParticipation: participationOptions[0],
      requiredArea: areaOptions[0],
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const selectedParticipation = useWatch({
    control,
    name: "preferredParticipation",
  });

  const selectedArea = useWatch({
    control,
    name: "requiredArea",
  });

  const isBusy =
    status === "submitting" || isSubmitting;

  const handleRecaptchaChange = (
    token: string | null
  ) => {
    setRecaptchaToken(token);

    if (token) {
      setCaptchaError(null);
    }
  };

  const onSubmit = (data: ExhibitorEnquiryInput) => {
    if (isBusy) return;

    if (!recaptchaToken) {
      setCaptchaError(
        "Please complete the reCAPTCHA verification."
      );
      return;
    }

    setCaptchaError(null);

    submit({
      ...data,
      recaptchaToken,
      startedAt,
      utm: getUtmFromLocation(),
      landingPage: window.location.pathname,
    });
  };

  if (status === "success" && referenceId) {
    return (
      <motion.div
        initial={
          reducedMotion
            ? false
            : { opacity: 0, y: 20 }
        }
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: EASE,
        }}
      >
        <SuccessPanel
          title="Exhibitor Enquiry Received"
          message="Thank you for your interest in exhibiting at Bangladesh Buildcon International Expo. Our exhibition sales team will contact you shortly with participation details."
          referenceId={referenceId}
        />
      </motion.div>
    );
  }

  return (
    <div className="relative w-full">
      {/* Form introduction */}
      <motion.div
        initial={
          reducedMotion
            ? false
            : { opacity: 0, y: 16 }
        }
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{ once: true }}
        transition={{
          duration: 0.7,
          ease: EASE,
        }}
        className="mb-9 flex flex-wrap items-center justify-between gap-4 border-b border-brand-dark/10 pb-7"
      >
        <div>
          <div className="mb-3 flex items-center gap-2.5">
            <span className="h-[2px] w-7 bg-brand-primary" />

            <span className="font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-brand-primary">
              Exhibitor Participation
            </span>
          </div>

          <h2 className="font-heading text-[clamp(1.45rem,2.5vw,2rem)] font-extrabold tracking-[-0.04em] text-brand-dark">
            Book Your Exhibition Stand
          </h2>

          <p className="mt-2 max-w-[600px] text-[13px] leading-[1.8] text-[#727A87]">
            Share your company details and exhibition
            requirements with our organising team.
          </p>
        </div>

        <span className="inline-flex items-center gap-2 rounded-full border border-brand-primary/15 bg-brand-primary/[0.06] px-3 py-2 text-[11px] font-semibold text-brand-primary">
          <span className="size-1.5 rounded-full bg-brand-primary" />
          * Required fields
        </span>
      </motion.div>

      <motion.form
        variants={staggerVariants}
        initial={reducedMotion ? false : "hidden"}
        animate="visible"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        aria-busy={isBusy}
        className="space-y-10 sm:space-y-12"
      >
        {/* Honeypot */}
        <div
          aria-hidden="true"
          className="absolute -left-[10000px] h-px w-px overflow-hidden"
        >
          <label htmlFor="website_hp">
            Website
          </label>

          <input
            id="website_hp"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("website_hp")}
          />
        </div>

        {/* ===================================
            01 COMPANY INFORMATION
        ==================================== */}

        <MotionSection reducedMotion={reducedMotion}>
          <SectionHeading
            number="01"
            title="Company Information"
            description="Tell us about your organisation and business profile."
          />

          <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2">
            <FieldWrapper
              label="Company Name"
              htmlFor="companyName"
              required
              error={errors.companyName}
            >
              <input
                id="companyName"
                autoComplete="organization"
                placeholder="e.g. Acme Construction Ltd."
                aria-invalid={!!errors.companyName}
                className={premiumInput(
                  !!errors.companyName
                )}
                {...register("companyName")}
              />
            </FieldWrapper>

            <FieldWrapper
              label="Country"
              htmlFor="country"
              required
              error={errors.country}
            >
              <select
                id="country"
                defaultValue=""
                aria-invalid={!!errors.country}
                className={premiumInput(!!errors.country)}
                {...register("country")}
              >
                <option value="" disabled>
                  Select your country
                </option>

                {UNIQUE_COUNTRIES.map((country) => (
                  <option
                    key={country}
                    value={country}
                  >
                    {country}
                  </option>
                ))}
              </select>
            </FieldWrapper>

            <FieldWrapper
              label="City"
              htmlFor="city"
              error={errors.city}
            >
              <input
                id="city"
                autoComplete="address-level2"
                placeholder="e.g. Dhaka"
                aria-invalid={!!errors.city}
                className={premiumInput(!!errors.city)}
                {...register("city")}
              />
            </FieldWrapper>

            <FieldWrapper
              label="Company Website"
              htmlFor="website"
              error={errors.website}
            >
              <input
                id="website"
                type="url"
                autoComplete="url"
                placeholder="https://example.com"
                aria-invalid={!!errors.website}
                className={premiumInput(!!errors.website)}
                {...register("website")}
              />
            </FieldWrapper>

            <FieldWrapper
              label="Company Type"
              htmlFor="companyType"
              required
              error={errors.companyType}
              className="sm:col-span-2"
            >
              <select
                id="companyType"
                defaultValue=""
                aria-invalid={!!errors.companyType}
                className={premiumInput(
                  !!errors.companyType
                )}
                {...register("companyType")}
              >
                <option value="" disabled>
                  Select company type
                </option>

                {companyTypeOptions.map((option) => (
                  <option
                    key={option}
                    value={option}
                  >
                    {option}
                  </option>
                ))}
              </select>
            </FieldWrapper>
          </div>
        </MotionSection>

        {/* ===================================
            02 CONTACT INFORMATION
        ==================================== */}

        <MotionSection reducedMotion={reducedMotion}>
          <SectionHeading
            number="02"
            title="Primary Contact Person"
            description="Who should our exhibition sales team contact?"
          />

          <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2">
            <FieldWrapper
              label="First Name"
              htmlFor="firstName"
              required
              error={errors.firstName}
            >
              <input
                id="firstName"
                autoComplete="given-name"
                placeholder="John"
                aria-invalid={!!errors.firstName}
                className={premiumInput(
                  !!errors.firstName
                )}
                {...register("firstName")}
              />
            </FieldWrapper>

            <FieldWrapper
              label="Last Name"
              htmlFor="lastName"
              required
              error={errors.lastName}
            >
              <input
                id="lastName"
                autoComplete="family-name"
                placeholder="Doe"
                aria-invalid={!!errors.lastName}
                className={premiumInput(
                  !!errors.lastName
                )}
                {...register("lastName")}
              />
            </FieldWrapper>

            <FieldWrapper
              label="Designation / Job Title"
              htmlFor="designation"
              required
              error={errors.designation}
            >
              <input
                id="designation"
                autoComplete="organization-title"
                placeholder="e.g. Sales Director"
                aria-invalid={!!errors.designation}
                className={premiumInput(
                  !!errors.designation
                )}
                {...register("designation")}
              />
            </FieldWrapper>

            <FieldWrapper
              label="Business Email"
              htmlFor="email"
              required
              error={errors.email}
            >
              <input
                id="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                placeholder="john@company.com"
                aria-invalid={!!errors.email}
                className={premiumInput(!!errors.email)}
                {...register("email")}
              />
            </FieldWrapper>

            <FieldWrapper
              label="Mobile / WhatsApp Number"
              htmlFor="mobile"
              required
              error={errors.mobile}
              className="sm:col-span-2"
            >
              <input
                id="mobile"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                placeholder="+880 1XXXXXXXXX"
                aria-invalid={!!errors.mobile}
                className={premiumInput(!!errors.mobile)}
                {...register("mobile")}
              />
            </FieldWrapper>
          </div>
        </MotionSection>

        {/* ===================================
            03 EXHIBITION REQUIREMENTS
        ==================================== */}

        <MotionSection reducedMotion={reducedMotion}>
          <SectionHeading
            number="03"
            title="Stand & Exhibition Preferences"
            description="Select your product sector, stand type, and preferred exhibition area."
          />

          <div className="space-y-8">
            {/* Product sector */}
            <FieldWrapper
              label="Product Category / Sector"
              htmlFor="productCategory"
              required
              error={errors.productCategory}
            >
              <select
                id="productCategory"
                defaultValue=""
                aria-invalid={!!errors.productCategory}
                className={premiumInput(
                  !!errors.productCategory
                )}
                {...register("productCategory")}
              >
                <option value="" disabled>
                  Select sector category
                </option>

                {exhibitionSectors.map((sector) => (
                  <option
                    key={sector.slug}
                    value={sector.name}
                  >
                    {sector.name}
                  </option>
                ))}
              </select>
            </FieldWrapper>

            {/* Register custom selections with React Hook Form */}
            <input
              type="hidden"
              {...register("preferredParticipation")}
            />

            <input
              type="hidden"
              {...register("requiredArea")}
            />

            {/* Participation cards */}
            <div>
              <p
                id="participation-label"
                className="mb-3 font-heading text-[12px] font-bold text-[#343B47]"
              >
                Preferred Participation Type{" "}
                <span className="text-brand-primary">*</span>
              </p>

              <div
                role="group"
                aria-labelledby="participation-label"
                className="grid gap-3 sm:grid-cols-2"
              >
                {participationOptions.map((option) => {
                  const isSelected =
                    selectedParticipation === option;

                  return (
                    <motion.button
                      key={option}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() =>
                        setValue(
                          "preferredParticipation",
                          option,
                          {
                            shouldValidate: true,
                            shouldDirty: true,
                            shouldTouch: true,
                          }
                        )
                      }
                      whileHover={
                        reducedMotion
                          ? undefined
                          : { y: -4 }
                      }
                      whileTap={
                        reducedMotion
                          ? undefined
                          : { scale: 0.985 }
                      }
                      transition={{
                        duration: 0.3,
                        ease: EASE,
                      }}
                      className={`relative min-h-[122px] overflow-hidden rounded-xl border p-5 text-left transition-[border-color,background-color,box-shadow] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary ${
                        isSelected
                          ? "border-brand-primary bg-brand-primary/[0.055] shadow-[0_10px_28px_rgba(186,29,130,0.09)]"
                          : "border-[#E2E5EC] bg-white hover:border-brand-primary/40 hover:bg-[#FCFAFD]"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span
                          className={`font-heading text-[14px] font-bold ${
                            isSelected
                              ? "text-brand-primary"
                              : "text-brand-dark"
                          }`}
                        >
                          {option}
                        </span>

                        <span
                          className={`flex size-6 shrink-0 items-center justify-center rounded-full border transition-colors ${
                            isSelected
                              ? "border-brand-primary bg-brand-primary text-white"
                              : "border-[#CBD0DA] bg-white text-transparent"
                          }`}
                        >
                          <CheckIcon />
                        </span>
                      </div>

                      <p className="mt-3 text-[12px] leading-[1.7] text-[#707987]">
                        {option.includes("Shell")
                          ? "Pre-built stand configuration"
                          : "Space for a custom stand design"}
                      </p>

                      {isSelected && (
                        <motion.div
                          layoutId="participation-active-line"
                          className="absolute inset-x-0 bottom-0 h-[3px] bg-brand-primary"
                          transition={{
                            type: "spring",
                            stiffness: 350,
                            damping: 30,
                          }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {errors.preferredParticipation && (
                <p
                  role="alert"
                  className="mt-2 text-[12px] font-medium text-red-600"
                >
                  {errors.preferredParticipation.message}
                </p>
              )}
            </div>

            {/* Stand size */}
            <div>
              <p
                id="area-label"
                className="mb-3 font-heading text-[12px] font-bold text-[#343B47]"
              >
                Required Area Space{" "}
                <span className="text-brand-primary">*</span>
              </p>

              <div
                role="group"
                aria-labelledby="area-label"
                className="flex flex-wrap gap-2.5"
              >
                {areaOptions.map((area) => {
                  const isSelected = selectedArea === area;

                  return (
                    <motion.button
                      key={area}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() =>
                        setValue(
                          "requiredArea",
                          area,
                          {
                            shouldValidate: true,
                            shouldDirty: true,
                            shouldTouch: true,
                          }
                        )
                      }
                      whileHover={
                        reducedMotion
                          ? undefined
                          : { y: -2 }
                      }
                      whileTap={
                        reducedMotion
                          ? undefined
                          : { scale: 0.96 }
                      }
                      transition={{
                        duration: 0.25,
                        ease: EASE,
                      }}
                      className={`min-h-11 rounded-lg border px-5 py-2.5 font-heading text-[12px] font-bold transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary ${
                        isSelected
                          ? "border-brand-primary bg-brand-primary text-white shadow-[0_8px_20px_rgba(186,29,130,0.2)]"
                          : "border-[#E1E4EA] bg-white text-[#5D6674] hover:border-brand-primary/40 hover:text-brand-primary"
                      }`}
                    >
                      {area}
                    </motion.button>
                  );
                })}
              </div>

              {errors.requiredArea && (
                <p
                  role="alert"
                  className="mt-2 text-[12px] font-medium text-red-600"
                >
                  {errors.requiredArea.message}
                </p>
              )}
            </div>

            {/* Products */}
            <FieldWrapper
              label="Key Products / Services to Display"
              htmlFor="productsServices"
              required
              error={errors.productsServices}
            >
              <textarea
                id="productsServices"
                rows={4}
                placeholder="Briefly describe the products, materials, equipment, or technology you would like to showcase..."
                aria-invalid={!!errors.productsServices}
                className={`${premiumInput(
                  !!errors.productsServices
                )} resize-y`}
                {...register("productsServices")}
              />
            </FieldWrapper>

            {/* Business intentions */}
            <div className="grid gap-5 rounded-xl border border-[#E5E7ED] bg-[#FAFAFC] p-5 sm:grid-cols-2 sm:p-6">
              <FieldWrapper
                label="Existing business in Bangladesh?"
                htmlFor="existingBusinessInBangladesh"
                error={errors.existingBusinessInBangladesh}
              >
                <select
                  id="existingBusinessInBangladesh"
                  defaultValue=""
                  className={premiumInput(
                    !!errors.existingBusinessInBangladesh
                  )}
                  {...register(
                    "existingBusinessInBangladesh"
                  )}
                >
                  <option value="">Select option</option>

                  {yesNoOptions.map((option) => (
                    <option
                      key={option}
                      value={option}
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </FieldWrapper>

              <FieldWrapper
                label="Looking for local distributors?"
                htmlFor="lookingForDistributor"
                error={errors.lookingForDistributor}
              >
                <select
                  id="lookingForDistributor"
                  defaultValue=""
                  className={premiumInput(
                    !!errors.lookingForDistributor
                  )}
                  {...register(
                    "lookingForDistributor"
                  )}
                >
                  <option value="">Select option</option>

                  {yesNoMaybeOptions.map((option) => (
                    <option
                      key={option}
                      value={option}
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </FieldWrapper>
            </div>

            {/* Additional message */}
            <FieldWrapper
              label="Additional Messages / Custom Requirements"
              htmlFor="message"
              error={errors.message}
            >
              <textarea
                id="message"
                rows={4}
                placeholder="Share any booth location preferences, custom requirements, or questions..."
                aria-invalid={!!errors.message}
                className={`${premiumInput(
                  !!errors.message
                )} resize-y`}
                {...register("message")}
              />
            </FieldWrapper>
          </div>
        </MotionSection>

        {/* ===================================
            04 CONSENT & SUBMISSION
        ==================================== */}

        <MotionSection reducedMotion={reducedMotion}>
          <SectionHeading
            number="04"
            title="Verification & Submission"
            description="Review your preferences and complete the security check."
          />

          {/* Consent */}
          <div className="rounded-xl border border-[#E5E7ED] bg-[#FAFAFC] p-5">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                aria-invalid={!!errors.consent}
                className="mt-1 size-4 shrink-0 cursor-pointer accent-[#BA1D82] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
                {...register("consent")}
              />

              <span className="text-[12px] leading-[1.85] text-[#647080] sm:text-[13px]">
                I agree that{" "}
                <strong className="font-semibold text-brand-dark">
                  Bangladesh Buildcon International Expo
                </strong>{" "}
                may contact me regarding my exhibitor
                enquiry in accordance with the{" "}
                <Link
                  href="/privacy-policy"
                  className="font-semibold text-brand-primary underline decoration-brand-primary/35 underline-offset-4 hover:text-[#9F176D]"
                >
                  Privacy Policy
                </Link>
                .
              </span>
            </label>

            {errors.consent && (
              <p
                role="alert"
                className="mt-3 text-[12px] font-medium text-red-600"
              >
                {errors.consent.message}
              </p>
            )}
          </div>

          {/* CAPTCHA */}
          <div className="mt-6">
            <div className="mb-3 flex items-center gap-2.5">
              <span className="text-brand-primary">
                <ShieldIcon />
              </span>

              <p className="font-heading text-[12px] font-bold text-brand-dark">
                Security Verification
              </p>
            </div>

            <div className="rounded-xl border border-[#E5E7ED] bg-[#FAFAFC] p-4">
              {SITE_KEY ? (
                <div className="max-w-full overflow-x-auto">
                  <div className="w-[304px]">
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={SITE_KEY}
                      onChange={handleRecaptchaChange}
                      onExpired={() => {
                        setRecaptchaToken(null);
                        setCaptchaError(
                          "Verification expired. Please complete reCAPTCHA again."
                        );
                      }}
                      onErrored={() => {
                        setRecaptchaToken(null);
                        setCaptchaError(
                          "Verification failed to load. Please retry."
                        );
                      }}
                    />
                  </div>
                </div>
              ) : (
                <p
                  role="alert"
                  className="text-[12px] leading-relaxed text-amber-700"
                >
                  Security verification is not configured.
                  Please add
                  NEXT_PUBLIC_RECAPTCHA_SITE_KEY.
                </p>
              )}

              {recaptchaToken && (
                <div className="mt-3 inline-flex items-center gap-2 text-[11px] font-semibold text-emerald-700">
                  <CheckIcon />
                  Verification completed
                </div>
              )}

              {captchaError && (
                <p
                  role="alert"
                  className="mt-3 text-[12px] font-medium text-red-600"
                >
                  {captchaError}
                </p>
              )}
            </div>
          </div>

          {/* API error */}
          {status === "error" && errorMessage && (
            <motion.div
              initial={
                reducedMotion
                  ? false
                  : { opacity: 0, y: 10 }
              }
              animate={{ opacity: 1, y: 0 }}
              role="alert"
              className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-[13px] leading-relaxed text-red-700"
            >
              {errorMessage}
            </motion.div>
          )}

          {/* Submit bar */}
          <div className="mt-8 flex flex-col gap-5 border-t border-brand-dark/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3 text-[#87909C]">
              <ShieldIcon />

              <p className="max-w-[360px] text-[11px] leading-[1.8]">
                Your exhibitor enquiry will be submitted
                for review by the exhibition team.
              </p>
            </div>

            <motion.button
              type="submit"
              disabled={
                isBusy ||
                !recaptchaToken ||
                !SITE_KEY
              }
              whileHover={
                reducedMotion || isBusy
                  ? undefined
                  : { y: -3, scale: 1.015 }
              }
              whileTap={
                reducedMotion || isBusy
                  ? undefined
                  : { scale: 0.97 }
              }
              transition={{
                duration: 0.3,
                ease: EASE,
              }}
              className="group inline-flex min-h-[54px] w-full shrink-0 items-center justify-center gap-3 rounded-xl bg-brand-primary px-7 py-4 font-heading text-[13px] font-bold text-white shadow-[0_12px_30px_rgba(186,29,130,0.2)] transition-colors duration-300 hover:bg-[#9F176D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none sm:w-auto sm:min-w-[250px]"
            >
              {isBusy ? (
                <>
                  <LoaderIcon />
                  Submitting Application...
                </>
              ) : (
                <>
                  Submit Exhibitor Application

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowIcon />
                  </span>
                </>
              )}
            </motion.button>
          </div>
        </MotionSection>
      </motion.form>
    </div>
  );
}
