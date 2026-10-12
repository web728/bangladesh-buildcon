
"use client";

import { useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ReCAPTCHA from "react-google-recaptcha";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import {
  visitorRegistrationSchema,
  type VisitorRegistrationInput,
  purchasingResponsibilityOptions,
  purposeOfVisitOptions,
  natureOfBusinessOptions,
} from "@/lib/validation/visitorRegistration";

import { FieldWrapper, inputClasses } from "./fields";
import { SuccessPanel } from "./SuccessPanel";

import {
  useLeadSubmit,
  getUtmFromLocation,
} from "@/hooks/useLeadSubmit";

import { countries } from "@/data/countries";
import { exhibitionSectors } from "@/data/exhibitionProfile";

/* ==========================================
   CONFIGURATION
========================================== */

const EASE = [0.22, 1, 0.36, 1] as const;

const RECAPTCHA_SITE_KEY =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

/*
  Prevent duplicate React keys and
  repeated dropdown country options.
*/
const UNIQUE_COUNTRIES = Array.from(
  new Set(
    countries
      .map((country) => country.trim())
      .filter(Boolean)
  )
);

/*
  Preserve sector values while ensuring
  there are no duplicate sector checkboxes.
*/
const UNIQUE_SECTORS = exhibitionSectors.filter(
  (sector, index, sectors) =>
    sectors.findIndex(
      (item) => item.name === sector.name
    ) === index
);

/* ==========================================
   ANIMATIONS
========================================== */

const sectionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: EASE,
    },
  },
};

const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.045,
      delayChildren: 0.06,
    },
  },
};

const sectorVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: EASE,
    },
  },
};

/* ==========================================
   SVG ICONS
========================================== */

function ArrowRightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5 shrink-0"
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
      className="size-4 shrink-0"
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
      className="size-5 shrink-0"
      aria-hidden="true"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5 shrink-0"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5 shrink-0"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5 shrink-0"
      aria-hidden="true"
    >
      <rect x="3" y="7" width="18" height="14" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12a23 23 0 0 0 18 0" />
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

function AlertIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5 shrink-0"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v6m0 4h.01" />
    </svg>
  );
}

/* ==========================================
   PREMIUM FIELD STYLING
========================================== */

function premiumInput(hasError = false) {
  return [
    inputClasses(hasError),
    "w-full min-w-0 rounded-xl border",
    "bg-[#FAFAFC] text-[#20242E]",
    "placeholder:text-[#A1A7B2]",
    "transition-[border-color,background-color,box-shadow]",
    "duration-300",
    "hover:border-[#BBC0CB]",
    "focus:bg-white focus:outline-none",
    "focus:ring-2",
    hasError
      ? "!border-red-400 focus:!border-red-500 focus:ring-red-500/10"
      : "border-[#E1E4EA] focus:!border-[#BA1D82] focus:ring-[#BA1D82]/10",
  ].join(" ");
}

/* ==========================================
   ANIMATED SECTION WRAPPER
========================================== */

function FormSection({
  number,
  title,
  description,
  icon,
  children,
  reducedMotion,
}: {
  number: string;
  title: string;
  description: string;
  icon: ReactNode;
  children: ReactNode;
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
      <div className="mb-7 flex items-start gap-4 border-b border-[#E9EAF0] pb-5">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-primary/[0.075] text-brand-primary">
          {icon}
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-1.5 flex items-center gap-2.5">
            <span className="font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-brand-primary">
              Step {number}
            </span>
          </div>

          <h3 className="font-heading text-[18px] font-extrabold leading-[1.3] tracking-[-0.03em] text-brand-dark sm:text-[21px]">
            {title}
          </h3>

          <p className="mt-1.5 text-[12px] leading-[1.8] text-[#7B8390] sm:text-[13px]">
            {description}
          </p>
        </div>
      </div>

      {children}
    </motion.section>
  );
}

/* ==========================================
   MAIN VISITOR REGISTRATION FORM
========================================== */

export function VisitorRegistrationForm() {
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
  } = useLeadSubmit("/api/visitor-registration");

  const {
    register,
    handleSubmit,
    control,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<VisitorRegistrationInput>({
    resolver: zodResolver(visitorRegistrationSchema),
    defaultValues: {
      productsInterested: [],
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });

  const isBusy =
    status === "submitting" || isSubmitting;

  /* ---------------------------------------
     CAPTCHA HANDLERS
  ---------------------------------------- */

  const handleRecaptchaChange = (
    token: string | null
  ) => {
    setRecaptchaToken(token);

    if (token) {
      setCaptchaError(null);
    }
  };

  const handleRecaptchaExpired = () => {
    setRecaptchaToken(null);
    setCaptchaError(
      "Verification expired. Please complete reCAPTCHA again."
    );
  };

  const handleRecaptchaError = () => {
    setRecaptchaToken(null);
    setCaptchaError(
      "Security verification failed to load. Please try again."
    );
  };

  /* ---------------------------------------
     SUBMISSION
  ---------------------------------------- */

  const onSubmit = (
    data: VisitorRegistrationInput
  ) => {
    if (isBusy) return;

    if (!recaptchaToken) {
      setCaptchaError(
        "Please complete the reCAPTCHA verification before submitting."
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

  /* ---------------------------------------
     SUCCESS
  ---------------------------------------- */

  if (status === "success" && referenceId) {
    return (
      <motion.div
        initial={
          reducedMotion
            ? false
            : { opacity: 0, y: 18 }
        }
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.65,
          ease: EASE,
        }}
      >
        <SuccessPanel
          title="Visitor Registration Received"
          message="Thank you for registering to visit Bangladesh Buildcon International Expo. Please keep this reference for your records and entry badge collection."
          referenceId={referenceId}
        />
      </motion.div>
    );
  }

  return (
    <div className="relative w-full">
      {/* FORM INTRODUCTION */}
      <motion.div
        initial={
          reducedMotion
            ? false
            : { opacity: 0, y: 18 }
        }
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{ once: true }}
        transition={{
          duration: 0.75,
          ease: EASE,
        }}
        className="mb-9 flex flex-col justify-between gap-5 border-b border-brand-dark/10 pb-7 sm:flex-row sm:items-end"
      >
        <div className="max-w-[660px]">
          <div className="mb-3 flex items-center gap-3">
            <span className="h-[2px] w-8 bg-brand-primary" />

            <span className="font-heading text-[11px] font-bold uppercase tracking-[0.16em] text-brand-primary">
              Trade Visitor Registration
            </span>
          </div>

          <h2 className="font-heading text-[clamp(1.6rem,2.8vw,2.2rem)] leading-[1.2] font-extrabold tracking-[-0.04em] text-brand-dark">
            Register Your Visit
          </h2>

          <p className="mt-3 text-[13px] leading-[1.85] text-[#747D8B] sm:text-[14px]">
            Tell us about your professional background,
            products of interest and visit objectives.
          </p>
        </div>

        <span className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-brand-primary/15 bg-brand-primary/[0.055] px-4 py-2 font-heading text-[11px] font-semibold text-brand-primary">
          <span className="size-1.5 rounded-full bg-brand-primary" />
          * Required fields
        </span>
      </motion.div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        aria-busy={isBusy}
        className="space-y-11 sm:space-y-14"
      >
        {/* Honeypot */}
        <div
          aria-hidden="true"
          className="absolute -left-[10000px] h-px w-px overflow-hidden"
        >
          <label htmlFor="visitor-website-hp">
            Website
          </label>

          <input
            id="visitor-website-hp"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("website_hp")}
          />
        </div>

        {/* ==================================
            01 PERSONAL & COMPANY DETAILS
        =================================== */}

        <FormSection
          number="01"
          title="Contact & Professional Details"
          description="Provide your contact information and business profile."
          icon={<UserIcon />}
          reducedMotion={reducedMotion}
        >
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
                placeholder="e.g. Project Manager, Architect"
                aria-invalid={!!errors.designation}
                className={premiumInput(
                  !!errors.designation
                )}
                {...register("designation")}
              />
            </FieldWrapper>

            <FieldWrapper
              label="Company / Organization"
              htmlFor="company"
              required
              error={errors.company}
            >
              <input
                id="company"
                autoComplete="organization"
                placeholder="e.g. BuildTech Solutions"
                aria-invalid={!!errors.company}
                className={premiumInput(
                  !!errors.company
                )}
                {...register("company")}
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
                className={premiumInput(
                  !!errors.country
                )}
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
              required
              error={errors.city}
            >
              <input
                id="city"
                autoComplete="address-level2"
                placeholder="e.g. Dhaka"
                aria-invalid={!!errors.city}
                className={premiumInput(
                  !!errors.city
                )}
                {...register("city")}
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
                className={premiumInput(
                  !!errors.email
                )}
                {...register("email")}
              />
            </FieldWrapper>

            <FieldWrapper
              label="Mobile / WhatsApp Number"
              htmlFor="mobile"
              required
              error={errors.mobile}
            >
              <input
                id="mobile"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                placeholder="+880 1XXXXXXXXX"
                aria-invalid={!!errors.mobile}
                className={premiumInput(
                  !!errors.mobile
                )}
                {...register("mobile")}
              />
            </FieldWrapper>

            <FieldWrapper
              label="Nature of Business"
              htmlFor="natureOfBusiness"
              required
              error={errors.natureOfBusiness}
              className="sm:col-span-2"
            >
              <select
                id="natureOfBusiness"
                defaultValue=""
                aria-invalid={!!errors.natureOfBusiness}
                className={premiumInput(
                  !!errors.natureOfBusiness
                )}
                {...register("natureOfBusiness")}
              >
                <option value="" disabled>
                  Select primary business focus
                </option>

                {natureOfBusinessOptions.map(
                  (option) => (
                    <option
                      key={option}
                      value={option}
                    >
                      {option}
                    </option>
                  )
                )}
              </select>
            </FieldWrapper>
          </div>
        </FormSection>

        {/* ==================================
            02 PRODUCTS / SECTORS
        =================================== */}

        <FormSection
          number="02"
          title="Products & Sectors Interested In"
          description="Select the exhibition sectors relevant to your business. Multiple selections are allowed."
          icon={<GridIcon />}
          reducedMotion={reducedMotion}
        >
          <Controller
            name="productsInterested"
            control={control}
            render={({ field }) => {
              const selectedProducts =
                field.value ?? [];

              return (
                <div>
                  {/* Selected sector count */}
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <p className="font-heading text-[12px] font-semibold text-[#5D6675]">
                      Select product categories{" "}
                      <span className="text-brand-primary">
                        *
                      </span>
                    </p>

                    <span
                      role="status"
                      aria-live="polite"
                      className="rounded-full border border-brand-primary/15 bg-brand-primary/[0.055] px-3 py-1.5 text-[11px] font-bold text-brand-primary"
                    >
                      {selectedProducts.length} selected
                    </span>
                  </div>

                  {/* Selection grid */}
                  <motion.div
                    variants={gridVariants}
                    initial={
                      reducedMotion
                        ? false
                        : "hidden"
                    }
                    whileInView="visible"
                    viewport={{
                      once: true,
                      amount: 0.08,
                    }}
                    className="grid gap-3 sm:grid-cols-2"
                  >
                    {UNIQUE_SECTORS.map((sector) => {
                      const checked =
                        selectedProducts.includes(
                          sector.name
                        );

                      return (
                        <motion.label
                          key={sector.slug}
                          variants={sectorVariants}
                          whileHover={
                            reducedMotion
                              ? undefined
                              : {
                                  y: -3,
                                  scale: 1.008,
                                }
                          }
                          whileTap={
                            reducedMotion
                              ? undefined
                              : {
                                  scale: 0.99,
                                }
                          }
                          transition={{
                            duration: 0.28,
                            ease: EASE,
                          }}
                          className={`group relative flex min-h-[68px] cursor-pointer items-center gap-3.5 overflow-hidden rounded-xl border p-4 transition-[border-color,background-color,box-shadow] duration-300 ${
                            checked
                              ? "border-brand-primary bg-brand-primary/[0.055] shadow-[0_6px_18px_rgba(186,29,130,0.07)]"
                              : "border-[#E2E5EB] bg-white hover:border-brand-primary/35 hover:bg-[#FCFAFD]"
                          }`}
                        >
                          <input
                            type="checkbox"
                            name={field.name}
                            ref={field.ref}
                            checked={checked}
                            onBlur={field.onBlur}
                            onChange={(event) => {
                              const next =
                                event.target.checked
                                  ? [
                                      ...selectedProducts,
                                      sector.name,
                                    ]
                                  : selectedProducts.filter(
                                      (value) =>
                                        value !==
                                        sector.name
                                    );

                              field.onChange(next);
                            }}
                            aria-invalid={
                              !!errors.productsInterested
                            }
                            className="size-[17px] shrink-0 cursor-pointer accent-[#BA1D82] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
                          />

                          <span
                            className={`min-w-0 flex-1 font-heading text-[12px] font-semibold leading-[1.55] transition-colors sm:text-[13px] ${
                              checked
                                ? "text-brand-primary"
                                : "text-[#4D5562] group-hover:text-brand-dark"
                            }`}
                          >
                            {sector.name}
                          </span>

                          <span
                            aria-hidden="true"
                            className={`flex size-6 shrink-0 items-center justify-center rounded-full border transition-colors ${
                              checked
                                ? "border-brand-primary bg-brand-primary text-white"
                                : "border-[#D7DBE2] bg-white text-transparent"
                            }`}
                          >
                            <CheckIcon />
                          </span>

                          {checked && (
                            <motion.span
                              layoutId={undefined}
                              aria-hidden="true"
                              className="absolute inset-x-0 bottom-0 h-[2px] bg-brand-primary"
                            />
                          )}
                        </motion.label>
                      );
                    })}
                  </motion.div>

                  {errors.productsInterested && (
                    <p
                      role="alert"
                      className="mt-3 text-[12px] font-medium text-red-600"
                    >
                      {errors.productsInterested.message}
                    </p>
                  )}
                </div>
              );
            }}
          />
        </FormSection>

        {/* ==================================
            03 PURCHASE INTENT
        =================================== */}

        <FormSection
          number="03"
          title="Purchasing Intent"
          description="Help us understand your role in purchasing and your reason for visiting."
          icon={<BriefcaseIcon />}
          reducedMotion={reducedMotion}
        >
          <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2">
            <FieldWrapper
              label="Purchasing Responsibility"
              htmlFor="purchasingResponsibility"
              required
              error={errors.purchasingResponsibility}
            >
              <select
                id="purchasingResponsibility"
                defaultValue=""
                aria-invalid={
                  !!errors.purchasingResponsibility
                }
                className={premiumInput(
                  !!errors.purchasingResponsibility
                )}
                {...register(
                  "purchasingResponsibility"
                )}
              >
                <option value="" disabled>
                  Select decision level
                </option>

                {purchasingResponsibilityOptions.map(
                  (option) => (
                    <option
                      key={option}
                      value={option}
                    >
                      {option}
                    </option>
                  )
                )}
              </select>
            </FieldWrapper>

            <FieldWrapper
              label="Primary Purpose of Visit"
              htmlFor="purposeOfVisit"
              required
              error={errors.purposeOfVisit}
            >
              <select
                id="purposeOfVisit"
                defaultValue=""
                aria-invalid={
                  !!errors.purposeOfVisit
                }
                className={premiumInput(
                  !!errors.purposeOfVisit
                )}
                {...register("purposeOfVisit")}
              >
                <option value="" disabled>
                  Select visit goal
                </option>

                {purposeOfVisitOptions.map(
                  (option) => (
                    <option
                      key={option}
                      value={option}
                    >
                      {option}
                    </option>
                  )
                )}
              </select>
            </FieldWrapper>
          </div>
        </FormSection>

        {/* ==================================
            04 CONSENT & SUBMISSION
        =================================== */}

        <FormSection
          number="04"
          title="Verification & Registration"
          description="Review your details, confirm consent and complete the security check."
          icon={<ShieldIcon />}
          reducedMotion={reducedMotion}
        >
          {/* Privacy consent */}
          <div className="rounded-xl border border-[#E3E6ED] bg-[#FAFAFC] p-5">
            <label className="flex cursor-pointer items-start gap-3.5">
              <input
                type="checkbox"
                aria-invalid={!!errors.consent}
                className="mt-1 size-4 shrink-0 cursor-pointer accent-[#BA1D82] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
                {...register("consent")}
              />

              <span className="text-[12px] leading-[1.85] text-[#657080] sm:text-[13px]">
                I agree that{" "}
                <strong className="font-semibold text-brand-dark">
                  Bangladesh Buildcon International
                  Expo
                </strong>{" "}
                may contact me regarding my visitor
                registration, in accordance with the{" "}
                <Link
                  href="/privacy-policy"
                  className="font-semibold text-brand-primary underline decoration-brand-primary/35 underline-offset-4 transition-colors hover:text-[#9F176D]"
                >
                  Privacy Policy
                </Link>
                .
              </span>
            </label>

            {errors.consent && (
              <p
                role="alert"
                className="mt-3 pl-7 text-[12px] font-medium text-red-600"
              >
                {errors.consent.message}
              </p>
            )}
          </div>

          {/* Security verification */}
          <div className="mt-7">
            <div className="mb-3 flex items-center gap-2.5">
              <span className="text-brand-primary">
                <ShieldIcon />
              </span>

              <p className="font-heading text-[12px] font-bold text-brand-dark">
                Security Verification
              </p>
            </div>

            <div className="rounded-xl border border-[#E3E6ED] bg-[#FAFAFC] p-4">
              {RECAPTCHA_SITE_KEY ? (
                <div className="max-w-full overflow-x-auto">
                  <div className="w-[304px]">
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={RECAPTCHA_SITE_KEY}
                      onChange={handleRecaptchaChange}
                      onExpired={handleRecaptchaExpired}
                      onErrored={handleRecaptchaError}
                    />
                  </div>
                </div>
              ) : (
                <p
                  role="alert"
                  className="text-[12px] leading-relaxed text-amber-700"
                >
                  reCAPTCHA is not configured.
                  Please add
                  NEXT_PUBLIC_RECAPTCHA_SITE_KEY.
                </p>
              )}

              {recaptchaToken && (
                <div className="mt-3 flex items-center gap-2 text-[11px] font-semibold text-emerald-700">
                  <CheckIcon />
                  Verification completed
                </div>
              )}

              {captchaError && (
                <p
                  role="alert"
                  className="mt-3 text-[12px] font-medium leading-relaxed text-red-600"
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
                  : {
                      opacity: 0,
                      y: 10,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.4,
                ease: EASE,
              }}
              role="alert"
              className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-[13px] leading-relaxed text-red-700"
            >
              <AlertIcon />
              <span>{errorMessage}</span>
            </motion.div>
          )}

          {/* Submit footer */}
          <div className="mt-8 flex flex-col gap-5 border-t border-brand-dark/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3 text-[#87909C]">
              <ShieldIcon />

              <p className="max-w-[330px] text-[11px] leading-[1.8]">
                Your registration details will be
                submitted for review by the event team.
              </p>
            </div>

            <motion.button
              type="submit"
              disabled={
                isBusy ||
                !recaptchaToken ||
                !RECAPTCHA_SITE_KEY
              }
              whileHover={
                reducedMotion ||
                isBusy ||
                !recaptchaToken
                  ? undefined
                  : {
                      y: -3,
                      scale: 1.015,
                    }
              }
              whileTap={
                reducedMotion ||
                isBusy ||
                !recaptchaToken
                  ? undefined
                  : { scale: 0.97 }
              }
              transition={{
                duration: 0.3,
                ease: EASE,
              }}
              className="group inline-flex min-h-[54px] w-full shrink-0 items-center justify-center gap-3 rounded-xl bg-brand-primary px-7 py-4 font-heading text-[13px] font-bold text-white shadow-[0_12px_30px_rgba(186,29,130,0.20)] transition-colors duration-300 hover:bg-[#9F176D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none sm:w-auto sm:min-w-[260px]"
            >
              {isBusy ? (
                <>
                  <LoaderIcon />
                  Registering Visitor...
                </>
              ) : (
                <>
                  Complete Visitor Registration

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRightIcon />
                  </span>
                </>
              )}
            </motion.button>
          </div>
        </FormSection>
      </form>
    </div>
  );
}
