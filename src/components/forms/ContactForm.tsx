
"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ReCAPTCHA from "react-google-recaptcha";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import {
  contactEnquirySchema,
  type ContactEnquiryInput,
  contactInterestOptions,
} from "@/lib/validation/contactEnquiry";

import { FieldWrapper, inputClasses } from "./fields";
import { SuccessPanel } from "./SuccessPanel";
import {
  useLeadSubmit,
  getUtmFromLocation,
} from "@/hooks/useLeadSubmit";
import { countries } from "@/data/countries";

/* ========================================
   CONFIG
======================================== */

const EASE = [0.22, 1, 0.36, 1] as const;

const RECAPTCHA_SITE_KEY =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

/*
  Deduplicate countries without changing
  their original ordering or display names.

  Fixes React duplicate-key warning:
  "Bangladesh" appearing more than once.
*/
const UNIQUE_COUNTRIES = Array.from(
  new Set(
    countries
      .map((country) => country.trim())
      .filter(Boolean)
  )
);

const UNIQUE_INTEREST_OPTIONS = Array.from(
  new Set(contactInterestOptions)
);

/* ========================================
   ANIMATION VARIANTS
======================================== */

const formVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.05,
    },
  },
};

const fieldVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: EASE,
    },
  },
};

/* ========================================
   ICONS
======================================== */

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

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4 shrink-0"
      aria-hidden="true"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
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

/* ========================================
   PREMIUM FIELD WRAPPER
======================================== */

function AnimatedField({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={fieldVariants}
      className={`group min-w-0 ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ========================================
   FORM INPUT STYLES
======================================== */

function premiumInputClasses(hasError: boolean) {
  return [
    inputClasses(hasError),
    "w-full min-w-0 rounded-xl",
    "border border-[#E3E5EA]",
    "bg-[#FAFAFC]",
    "text-[#13151D]",
    "placeholder:text-[#A0A6B1]",
    "transition-[border-color,background-color,box-shadow]",
    "duration-300",
    "hover:border-[#C4C7D0]",
    "focus:border-[#BA1D82]",
    "focus:bg-white",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-[#BA1D82]/10",
    "focus-visible:outline-none",
    "disabled:cursor-not-allowed",
    "disabled:opacity-60",
    hasError
      ? "!border-red-400 !focus:border-red-500 !focus:ring-red-500/10"
      : "",
  ]
    .filter(Boolean)
    .join(" ");
}

/* ========================================
   MAIN CONTACT FORM
======================================== */

export function ContactForm({
  defaultInterest,
}: {
  defaultInterest?: (typeof contactInterestOptions)[number];
}) {
  const reducedMotion = !!useReducedMotion();

  const [startedAt] = useState(() => Date.now());

  const [recaptchaToken, setRecaptchaToken] =
    useState<string | null>(null);

  const [captchaMessage, setCaptchaMessage] =
    useState<string | null>(null);

  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const {
    submit,
    status,
    referenceId,
    errorMessage,
  } = useLeadSubmit("/api/contact");

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<ContactEnquiryInput>({
    resolver: zodResolver(contactEnquirySchema),
    defaultValues: defaultInterest
      ? { interest: defaultInterest }
      : undefined,
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const isBusy =
    status === "submitting" || isSubmitting;

  const canSubmit =
    !isBusy &&
    Boolean(recaptchaToken) &&
    Boolean(RECAPTCHA_SITE_KEY);

  /* ------------------------------------
     RECAPTCHA HANDLERS
  ------------------------------------- */

  const handleRecaptchaChange = (
    token: string | null
  ) => {
    setRecaptchaToken(token);

    if (token) {
      setCaptchaMessage(null);
    }
  };

  const handleRecaptchaExpired = () => {
    setRecaptchaToken(null);
    setCaptchaMessage(
      "Verification expired. Please complete reCAPTCHA again."
    );
  };

  const handleRecaptchaError = () => {
    setRecaptchaToken(null);
    setCaptchaMessage(
      "Security verification could not load. Please refresh the page and try again."
    );
  };

  /* ------------------------------------
     FORM SUBMISSION
  ------------------------------------- */

  const onSubmit = (data: ContactEnquiryInput) => {
    if (isBusy) return;

    if (!recaptchaToken) {
      setCaptchaMessage(
        "Please complete the security verification before submitting."
      );

      return;
    }

    if (!RECAPTCHA_SITE_KEY) {
      setCaptchaMessage(
        "Security verification is not configured. Please contact the organiser directly."
      );

      return;
    }

    setCaptchaMessage(null);

    submit({
      ...data,
      recaptchaToken,
      startedAt,
      utm: getUtmFromLocation(),
      landingPage: window.location.pathname,
    });
  };

  /* ------------------------------------
     SUCCESS STATE
  ------------------------------------- */

  if (status === "success" && referenceId) {
    return (
      <motion.div
        initial={
          reducedMotion
            ? false
            : {
                opacity: 0,
                y: 18,
                scale: 0.985,
              }
        }
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.65,
          ease: EASE,
        }}
      >
        <SuccessPanel
          title="Enquiry Received"
          message="Thank you for contacting Bangladesh Buildcon International Expo. Our team will respond to your enquiry shortly."
          referenceId={referenceId}
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={formVariants}
      initial={reducedMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.08,
      }}
      className="relative w-full"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        aria-busy={isBusy}
        className="flex flex-col gap-7"
      >
        {/* Honeypot field */}
        <div
          aria-hidden="true"
          className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden"
        >
          <label htmlFor="c-website_hp">
            Website
          </label>

          <input
            id="c-website_hp"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("website_hp")}
          />
        </div>

        {/* Intro */}
        <motion.div
          variants={fieldVariants}
          className="flex flex-wrap items-center justify-between gap-3"
        >
          <div>
            <p className="font-heading text-[12px] font-bold text-[#252A35]">
              Your Enquiry Details
            </p>

            <p className="mt-1 text-[12px] leading-relaxed text-[#858C98]">
              Please provide accurate contact information.
            </p>
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E9D5E2] bg-[#FCF3F9] px-3 py-1.5 text-[10px] font-bold text-brand-primary">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-brand-primary"
            />

            * Required Fields
          </span>
        </motion.div>

        {/* =====================================
            CONTACT INPUTS
        ====================================== */}

        <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2">
          {/* Name */}
          <AnimatedField>
            <FieldWrapper
              label="Full Name"
              htmlFor="name"
              required
              error={errors.name}
            >
              <input
                id="name"
                type="text"
                autoComplete="name"
                placeholder="e.g. John Doe"
                aria-invalid={!!errors.name}
                className={premiumInputClasses(
                  !!errors.name
                )}
                {...register("name")}
              />
            </FieldWrapper>
          </AnimatedField>

          {/* Company */}
          <AnimatedField>
            <FieldWrapper
              label="Company Name"
              htmlFor="company"
              required
              error={errors.company}
            >
              <input
                id="company"
                type="text"
                autoComplete="organization"
                placeholder="e.g. Acme Corporation"
                aria-invalid={!!errors.company}
                className={premiumInputClasses(
                  !!errors.company
                )}
                {...register("company")}
              />
            </FieldWrapper>
          </AnimatedField>

          {/* Country */}
          <AnimatedField>
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
                className={premiumInputClasses(
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
          </AnimatedField>

          {/* Email */}
          <AnimatedField>
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
                className={premiumInputClasses(
                  !!errors.email
                )}
                {...register("email")}
              />
            </FieldWrapper>
          </AnimatedField>

          {/* Phone */}
          <AnimatedField>
            <FieldWrapper
              label="Mobile / WhatsApp"
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
                className={premiumInputClasses(
                  !!errors.mobile
                )}
                {...register("mobile")}
              />
            </FieldWrapper>
          </AnimatedField>

          {/* Interest */}
          <AnimatedField>
            <FieldWrapper
              label="Area of Interest"
              htmlFor="interest"
              required
              error={errors.interest}
            >
              <select
                id="interest"
                defaultValue={defaultInterest ?? ""}
                aria-invalid={!!errors.interest}
                className={premiumInputClasses(
                  !!errors.interest
                )}
                {...register("interest")}
              >
                <option value="" disabled>
                  Select interest area
                </option>

                {UNIQUE_INTEREST_OPTIONS.map(
                  (interest) => (
                    <option
                      key={interest}
                      value={interest}
                    >
                      {interest}
                    </option>
                  )
                )}
              </select>
            </FieldWrapper>
          </AnimatedField>

          {/* Message */}
          <AnimatedField className="sm:col-span-2">
            <FieldWrapper
              label="Your Message"
              htmlFor="message"
              required
              error={errors.message}
            >
              <textarea
                id="message"
                rows={5}
                placeholder="Tell us about your exhibition enquiry, business requirements, or questions..."
                aria-invalid={!!errors.message}
                className={`${premiumInputClasses(
                  !!errors.message
                )} resize-y`}
                {...register("message")}
              />
            </FieldWrapper>
          </AnimatedField>
        </div>

        {/* =====================================
            PRIVACY CONSENT
        ====================================== */}

        <motion.div
          variants={fieldVariants}
          className="rounded-xl border border-[#E7E7EC] bg-[#FAFAFC] px-4 py-4 transition-colors duration-300 focus-within:border-brand-primary/30 sm:px-5"
        >
          <label className="flex cursor-pointer items-start gap-3.5">
            <input
              type="checkbox"
              aria-invalid={!!errors.consent}
              className="mt-0.5 size-4 shrink-0 cursor-pointer rounded border-[#C7CBD3] accent-[#BA1D82] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
              {...register("consent")}
            />

            <span className="text-[12px] leading-[1.8] text-[#66707F] sm:text-[13px]">
              I agree that{" "}
              <strong className="font-semibold text-[#252A35]">
                Bangladesh Buildcon International Expo
              </strong>{" "}
              may contact me regarding my enquiry,
              in line with the{" "}
              <Link
                href="/privacy-policy"
                className="font-semibold text-brand-primary underline decoration-brand-primary/35 underline-offset-4 transition-colors hover:text-[#95156A]"
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
        </motion.div>

        {/* =====================================
            RECAPTCHA
        ====================================== */}

        <motion.div
          variants={fieldVariants}
          className="min-w-0"
        >
          <div className="mb-3 flex items-center gap-2">
            <span className="text-brand-primary">
              <ShieldIcon />
            </span>

            <span className="font-heading text-[12px] font-bold text-[#252A35]">
              Security Verification
            </span>
          </div>

          <div className="rounded-xl border border-[#E7E7EC] bg-[#FAFAFC] p-3 sm:p-4">
            {RECAPTCHA_SITE_KEY ? (
              <div className="w-full overflow-x-auto">
                <div className="w-[304px] origin-top-left max-[359px]:scale-[0.88] max-[359px]:-mb-[9px]">
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
              <div
                role="alert"
                className="flex items-start gap-2 text-[12px] leading-relaxed text-amber-700"
              >
                <AlertIcon />

                <p>
                  reCAPTCHA site key is missing.
                  Please configure
                  NEXT_PUBLIC_RECAPTCHA_SITE_KEY.
                </p>
              </div>
            )}

            {recaptchaToken && (
              <div className="mt-3 inline-flex items-center gap-2 text-[11px] font-semibold text-emerald-700">
                <CheckIcon />
                Verification completed
              </div>
            )}

            {captchaMessage && (
              <p
                role="alert"
                className="mt-3 text-[12px] font-medium leading-relaxed text-red-600"
              >
                {captchaMessage}
              </p>
            )}
          </div>
        </motion.div>

        {/* =====================================
            API ERROR MESSAGE
        ====================================== */}

        {status === "error" && errorMessage && (
          <motion.div
            initial={
              reducedMotion
                ? false
                : { opacity: 0, y: 10 }
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
            aria-live="assertive"
            className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-4 text-[13px] leading-relaxed text-red-700"
          >
            <AlertIcon />

            <span>{errorMessage}</span>
          </motion.div>
        )}

        {/* =====================================
            SUBMIT ACTION
        ====================================== */}

        <motion.div
          variants={fieldVariants}
          className="flex flex-col gap-4 border-t border-brand-dark/10 pt-7 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-start gap-2.5 text-[#8C939E]">
            <ShieldIcon />

            <p className="max-w-[320px] text-[11px] leading-[1.65]">
              Your enquiry will be submitted securely
              for review by the organising team.
            </p>
          </div>

          <motion.button
            type="submit"
            disabled={!canSubmit}
            whileHover={
              reducedMotion || !canSubmit
                ? undefined
                : {
                    y: -3,
                    scale: 1.015,
                  }
            }
            whileTap={
              reducedMotion || !canSubmit
                ? undefined
                : {
                    scale: 0.97,
                  }
            }
            transition={{
              duration: 0.28,
              ease: EASE,
            }}
            className="group relative inline-flex min-h-[52px] w-full shrink-0 items-center justify-center gap-3 overflow-hidden rounded-xl bg-brand-primary px-7 py-3.5 font-heading text-[13px] font-bold text-white shadow-[0_12px_30px_rgba(186,29,130,0.20)] transition-colors duration-300 hover:bg-[#9F176D] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand-primary disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none sm:w-auto sm:min-w-[190px]"
          >
            {isBusy ? (
              <>
                <LoaderIcon />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <span>Send Message</span>

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRightIcon />
                </span>
              </>
            )}
          </motion.button>
        </motion.div>
      </form>
    </motion.div>
  );
}
