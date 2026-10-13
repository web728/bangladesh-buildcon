
"use client";

import { useRef, useState, type ReactNode } from "react";
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
  partnerEnquirySchema,
  type PartnerEnquiryInput,
} from "@/lib/validation/partnerEnquiry";

import { FieldWrapper, inputClasses } from "./fields";
import { SuccessPanel } from "./SuccessPanel";

import {
  useLeadSubmit,
  getUtmFromLocation,
} from "@/hooks/useLeadSubmit";

import { countries } from "@/data/countries";

/* ============================================
   CONFIGURATION
============================================ */

const EASE = [0.22, 1, 0.36, 1] as const;

const RECAPTCHA_SITE_KEY =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

/*
  Fix duplicated country options and React keys.
  Original country order and actual values are kept.
*/
const UNIQUE_COUNTRIES = Array.from(
  new Set(
    countries
      .map((country) => country.trim())
      .filter(Boolean)
  )
);

/* ============================================
   ANIMATIONS
============================================ */

const sectionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
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
      staggerChildren: 0.055,
      delayChildren: 0.05,
    },
  },
};

const fieldVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.52,
      ease: EASE,
    },
  },
};

/* ============================================
   ICONS
============================================ */

function OrganisationIcon() {
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
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M9 7h2m3 0h1M9 11h2m3 0h1M9 15h2m3 0h1M10 21v-4h4v4" />
    </svg>
  );
}

function ContactIcon() {
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
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20v-2a6 6 0 0 1 12 0v2M17 8h4m-4 4h4m-4 4h3" />
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

function ArrowRightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
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

/* ============================================
   PREMIUM INPUT STYLE
   Uses your existing shared fields.tsx
============================================ */

function premiumInput(hasError = false) {
  return [
    inputClasses(hasError),
    "w-full min-w-0 rounded-xl",
    "bg-[#FAFAFC]",
    "text-[#20242E]",
    "placeholder:text-[#9DA5B2]",
    "transition-[border-color,background-color,box-shadow]",
    "duration-300",
    "hover:border-[#BEC3CE]",
    "focus:bg-white",
    "focus:outline-none",
    "focus:ring-2",
    hasError
      ? "!border-red-400 focus:!border-red-500 focus:ring-red-500/10"
      : "border-[#E2E5EB] focus:!border-[#BA1D82] focus:ring-[#BA1D82]/10",
  ].join(" ");
}

/* ============================================
   REUSABLE SECTION WRAPPER
============================================ */

function FormSection({
  number,
  title,
  description,
  icon,
  reducedMotion,
  children,
}: {
  number: string;
  title: string;
  description: string;
  icon: ReactNode;
  reducedMotion: boolean;
  children: ReactNode;
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
      <div className="mb-6 flex items-start gap-4 border-b border-[#E9EAF0] pb-5">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-primary/[0.075] text-brand-primary">
          {icon}
        </span>

        <div className="min-w-0">
          <span className="font-heading text-[10px] font-bold uppercase tracking-[0.15em] text-brand-primary">
            Section {number}
          </span>

          <h3 className="mt-1 font-heading text-[17px] font-extrabold tracking-[-0.025em] text-brand-dark sm:text-[19px]">
            {title}
          </h3>

          <p className="mt-1 text-[12px] leading-[1.75] text-[#7B8390]">
            {description}
          </p>
        </div>
      </div>

      {children}
    </motion.section>
  );
}

/* ============================================
   ANIMATED FIELD
============================================ */

function AnimatedField({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={fieldVariants}
      className={`min-w-0 ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ============================================
   MAIN PARTNER ENQUIRY FORM
============================================ */

export function PartnerEnquiryForm() {
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
  } = useLeadSubmit("/api/partner-enquiry");

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<PartnerEnquiryInput>({
    resolver: zodResolver(partnerEnquirySchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });

  const isBusy =
    status === "submitting" || isSubmitting;

  const canSubmit =
    !isBusy &&
    Boolean(recaptchaToken) &&
    Boolean(RECAPTCHA_SITE_KEY);

  /* ======================================
     CAPTCHA HANDLERS
  ====================================== */

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
      "Security verification expired. Please complete reCAPTCHA again."
    );
  };

  const handleRecaptchaError = () => {
    setRecaptchaToken(null);

    setCaptchaError(
      "Security verification failed to load. Please retry."
    );
  };

  /* ======================================
     SUBMISSION
  ====================================== */

  const onSubmit = (data: PartnerEnquiryInput) => {
    if (isBusy) return;

    if (!recaptchaToken) {
      setCaptchaError(
        "Please complete the security verification before submitting."
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

  /* ======================================
     SUCCESS STATE
  ====================================== */

  if (status === "success" && referenceId) {
    return (
      <motion.div
        initial={
          reducedMotion
            ? false
            : {
                opacity: 0,
                y: 18,
              }
        }
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
          ease: EASE,
        }}
      >
        <SuccessPanel
          title="Partnership Enquiry Received"
          message="Thank you for your interest in partnering with Bangladesh Buildcon International Expo 2027. Our secretariat will review your enquiry and get in touch shortly."
          referenceId={referenceId}
        />
      </motion.div>
    );
  }

  return (
    <div className="relative w-full">
      {/* ==================================
          FORM INTRODUCTION
      =================================== */}

      <motion.div
        initial={
          reducedMotion
            ? false
            : {
                opacity: 0,
                y: 14,
              }
        }
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{ once: true }}
        transition={{
          duration: 0.65,
          ease: EASE,
        }}
        className="mb-9 flex flex-col gap-3 border-b border-brand-dark/10 pb-7 sm:flex-row sm:items-end sm:justify-between"
      >
        <div className="max-w-[660px]">
          <div className="mb-3 flex items-center gap-3">
            <span className="h-[2px] w-8 bg-brand-primary" />

            <span className="font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-brand-primary">
              Strategic Partnerships
            </span>
          </div>

          <h2 className="font-heading text-[clamp(1.55rem,2.5vw,2rem)] font-extrabold leading-[1.2] tracking-[-0.045em] text-brand-dark">
            Partner with Bangladesh Buildcon
          </h2>

          <p className="mt-3 text-[13px] leading-[1.8] text-[#737C89]">
            Share your organisation profile and
            proposed collaboration with our event team.
          </p>
        </div>

        <span className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-brand-primary/15 bg-brand-primary/[0.055] px-3 py-2 text-[11px] font-semibold text-brand-primary">
          <span className="size-1.5 rounded-full bg-brand-primary" />
          * Required fields
        </span>
      </motion.div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        aria-busy={isBusy}
        className="space-y-10 sm:space-y-12"
      >
        {/* Anti-spam honeypot */}
        <div
          aria-hidden="true"
          className="absolute -left-[10000px] h-px w-px overflow-hidden"
        >
          <label htmlFor="p-website_hp">
            Website
          </label>

          <input
            id="p-website_hp"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("website_hp")}
          />
        </div>

        {/* ==================================
            SECTION 01
            ORGANISATION PROFILE
        =================================== */}

        <FormSection
          number="01"
          title="Organisation Profile"
          description="Tell us about your organisation and the industries you represent."
          icon={<OrganisationIcon />}
          reducedMotion={reducedMotion}
        >
          <motion.div
            variants={staggerVariants}
            initial={reducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-x-5 gap-y-6 sm:grid-cols-2"
          >
            <AnimatedField>
              <FieldWrapper
                label="Organisation Name"
                htmlFor="organisation"
                required
                error={errors.organisation}
              >
                <input
                  id="organisation"
                  type="text"
                  autoComplete="organization"
                  placeholder="e.g. Bangladesh Chamber of Commerce"
                  aria-invalid={!!errors.organisation}
                  aria-describedby={
                    errors.organisation
                      ? "organisation-error"
                      : undefined
                  }
                  className={premiumInput(
                    !!errors.organisation
                  )}
                  {...register("organisation")}
                />
              </FieldWrapper>
            </AnimatedField>

            <AnimatedField>
              <FieldWrapper
                label="Organisation Type"
                htmlFor="organisationType"
                required
                error={errors.organisationType}
              >
                <input
                  id="organisationType"
                  type="text"
                  placeholder="e.g. Trade Association, Ministry, Media"
                  aria-invalid={!!errors.organisationType}
                  aria-describedby={
                    errors.organisationType
                      ? "organisationType-error"
                      : undefined
                  }
                  className={premiumInput(
                    !!errors.organisationType
                  )}
                  {...register("organisationType")}
                />
              </FieldWrapper>
            </AnimatedField>

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
                  aria-describedby={
                    errors.country
                      ? "country-error"
                      : undefined
                  }
                  className={premiumInput(
                    !!errors.country
                  )}
                  {...register("country")}
                >
                  <option value="" disabled>
                    Select base country
                  </option>

                  {UNIQUE_COUNTRIES.map(
                    (country) => (
                      <option
                        key={country}
                        value={country}
                      >
                        {country}
                      </option>
                    )
                  )}
                </select>
              </FieldWrapper>
            </AnimatedField>

            <AnimatedField>
              <FieldWrapper
                label="Website URL"
                htmlFor="website"
                error={errors.website}
              >
                <input
                  id="website"
                  type="url"
                  autoComplete="url"
                  placeholder="https://example.org"
                  aria-invalid={!!errors.website}
                  aria-describedby={
                    errors.website
                      ? "website-error"
                      : undefined
                  }
                  className={premiumInput(
                    !!errors.website
                  )}
                  {...register("website")}
                />
              </FieldWrapper>
            </AnimatedField>

            <AnimatedField>
              <FieldWrapper
                label="Approximate Membership"
                htmlFor="approximateMembership"
                error={errors.approximateMembership}
              >
                <input
                  id="approximateMembership"
                  type="text"
                  placeholder="e.g. 500+ Corporate Members"
                  aria-invalid={
                    !!errors.approximateMembership
                  }
                  className={premiumInput(
                    !!errors.approximateMembership
                  )}
                  {...register("approximateMembership")}
                />
              </FieldWrapper>
            </AnimatedField>

            <AnimatedField>
              <FieldWrapper
                label="Industry Sector Represented"
                htmlFor="industryRepresented"
                error={errors.industryRepresented}
              >
                <input
                  id="industryRepresented"
                  type="text"
                  placeholder="e.g. Architecture, Civil Contractors"
                  aria-invalid={
                    !!errors.industryRepresented
                  }
                  className={premiumInput(
                    !!errors.industryRepresented
                  )}
                  {...register("industryRepresented")}
                />
              </FieldWrapper>
            </AnimatedField>
          </motion.div>
        </FormSection>

        {/* ==================================
            SECTION 02
            CONTACT & COLLABORATION
        =================================== */}

        <FormSection
          number="02"
          title="Contact & Partnership Details"
          description="Provide the primary contact and outline your collaboration proposal."
          icon={<ContactIcon />}
          reducedMotion={reducedMotion}
        >
          <motion.div
            variants={staggerVariants}
            initial={reducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-x-5 gap-y-6 sm:grid-cols-2"
          >
            <AnimatedField>
              <FieldWrapper
                label="Contact Person"
                htmlFor="contactPerson"
                required
                error={errors.contactPerson}
              >
                <input
                  id="contactPerson"
                  type="text"
                  autoComplete="name"
                  placeholder="Full Name"
                  aria-invalid={!!errors.contactPerson}
                  className={premiumInput(
                    !!errors.contactPerson
                  )}
                  {...register("contactPerson")}
                />
              </FieldWrapper>
            </AnimatedField>

            <AnimatedField>
              <FieldWrapper
                label="Designation / Role"
                htmlFor="designation"
                error={errors.designation}
              >
                <input
                  id="designation"
                  type="text"
                  autoComplete="organization-title"
                  placeholder="e.g. Secretary General, Director"
                  aria-invalid={!!errors.designation}
                  className={premiumInput(
                    !!errors.designation
                  )}
                  {...register("designation")}
                />
              </FieldWrapper>
            </AnimatedField>

            <AnimatedField>
              <FieldWrapper
                label="Corporate Email"
                htmlFor="email"
                required
                error={errors.email}
              >
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="partner@organisation.org"
                  aria-invalid={!!errors.email}
                  className={premiumInput(
                    !!errors.email
                  )}
                  {...register("email")}
                />
              </FieldWrapper>
            </AnimatedField>

            <AnimatedField>
              <FieldWrapper
                label="Phone / Mobile"
                htmlFor="phone"
                required
                error={errors.phone}
              >
                <input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="+880 1XXXXXXXXX"
                  aria-invalid={!!errors.phone}
                  className={premiumInput(
                    !!errors.phone
                  )}
                  {...register("phone")}
                />
              </FieldWrapper>
            </AnimatedField>

            <AnimatedField className="sm:col-span-2">
              <FieldWrapper
                label="Nature of Partnership"
                htmlFor="natureOfEnquiry"
                required
                error={errors.natureOfEnquiry}
              >
                <input
                  id="natureOfEnquiry"
                  type="text"
                  placeholder="e.g. Trade Delegation, Media Partnership, Institutional Support"
                  aria-invalid={!!errors.natureOfEnquiry}
                  className={premiumInput(
                    !!errors.natureOfEnquiry
                  )}
                  {...register("natureOfEnquiry")}
                />
              </FieldWrapper>
            </AnimatedField>

            <AnimatedField className="sm:col-span-2">
              <FieldWrapper
                label="Proposed Collaboration Message"
                htmlFor="message"
                error={errors.message}
              >
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Tell us how your organisation would like to collaborate with Bangladesh Buildcon 2027..."
                  aria-invalid={!!errors.message}
                  className={`${premiumInput(
                    !!errors.message
                  )} resize-y`}
                  {...register("message")}
                />
              </FieldWrapper>
            </AnimatedField>
          </motion.div>
        </FormSection>

        {/* ==================================
            SECTION 03
            VERIFICATION
        =================================== */}

        <FormSection
          number="03"
          title="Security & Submission"
          description="Complete the security verification before sending your proposal."
          icon={<ShieldIcon />}
          reducedMotion={reducedMotion}
        >
          <div className="rounded-xl border border-[#E5E7ED] bg-[#FAFAFC] p-4 sm:p-5">
            <div className="mb-4 flex items-center gap-2.5">
              <span className="flex size-8 items-center justify-center rounded-lg bg-brand-primary/[0.08] text-brand-primary">
                <ShieldIcon />
              </span>

              <div>
                <p className="font-heading text-[12px] font-bold text-brand-dark">
                  Verify Your Submission
                </p>

                <p className="mt-0.5 text-[11px] text-[#838B98]">
                  Required to prevent automated enquiries
                </p>
              </div>
            </div>

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
              <div
                role="alert"
                className="flex items-start gap-2.5 rounded-lg border border-amber-200 bg-amber-50 p-3 text-[12px] leading-[1.7] text-amber-800"
              >
                <AlertIcon />

                <span>
                  reCAPTCHA is not configured.
                  Set{" "}
                  <code className="font-semibold">
                    NEXT_PUBLIC_RECAPTCHA_SITE_KEY
                  </code>
                  .
                </span>
              </div>
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

          {/* API ERROR */}
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
              className="mt-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-[12px] leading-relaxed text-red-700 sm:text-[13px]"
            >
              <AlertIcon />
              <span>{errorMessage}</span>
            </motion.div>
          )}

          {/* SUBMISSION BAR */}
          <div className="mt-7 flex flex-col gap-5 border-t border-brand-dark/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-2.5 text-[#858E9B]">
              <ShieldIcon />

              <p className="max-w-[310px] text-[11px] leading-[1.7]">
                Your partnership proposal will be
                reviewed by the event secretariat.
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
                  : { scale: 0.97 }
              }
              transition={{
                duration: 0.3,
                ease: EASE,
              }}
              className="group inline-flex min-h-[52px] w-full shrink-0 items-center justify-center gap-3 rounded-xl bg-brand-primary px-7 py-3.5 font-heading text-[12px] font-bold text-white shadow-[0_12px_28px_rgba(186,29,130,0.20)] transition-colors duration-300 hover:bg-[#9F176D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none sm:w-auto"
            >
              {isBusy ? (
                <>
                  <LoaderIcon />
                  Submitting Application...
                </>
              ) : (
                <>
                  Submit Partnership Enquiry

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
