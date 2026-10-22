"use client";

import { useEffect, useRef, useState } from "react";

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

  brochureDownloadSchema,

  type BrochureDownloadInput,

} from "@/lib/validation/brochureDownload";

import { FieldWrapper, inputClasses } from "./fields";

import {

  useLeadSubmit,

  getUtmFromLocation,

} from "@/hooks/useLeadSubmit";

import { countries } from "@/data/countries";

/* ========================================

   BROCHURE CONFIG

======================================== */

const BROCHURE_FILE_URL =

  "/downloads/Bangladesh-Buildcon-Expo-Brochure-2027.pdf";

const BROCHURE_FILE_NAME =

  "Bangladesh-Buildcon-Expo-Brochure-2027.pdf";

const RECAPTCHA_SITE_KEY =

  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

const UNIQUE_COUNTRIES = Array.from(

  new Set(

    countries

      .map((country) => country.trim())

      .filter(Boolean)

  )

);

/* ========================================

   ANIMATION CONFIG

======================================== */

const EASE = [0.22, 1, 0.36, 1] as const;

const formVariants: Variants = {

  hidden: {},

  visible: {

    transition: {

      staggerChildren: 0.075,

      delayChildren: 0.05,

    },

  },

};

const revealVariants: Variants = {

  hidden: {

    opacity: 0,

    y: 15,

  },

  visible: {

    opacity: 1,

    y: 0,

    transition: {

      duration: 0.6,

      ease: EASE,

    },

  },

};

/* ========================================

   ICONS

======================================== */

function DownloadIcon() {

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

      <path d="M12 3v12m-5-5 5 5 5-5" />

      <path d="M4 17v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" />

    </svg>

  );

}

function FileIcon() {

  return (

    <svg

      viewBox="0 0 24 24"

      fill="none"

      stroke="currentColor"

      strokeWidth="1.7"

      strokeLinecap="round"

      strokeLinejoin="round"

      className="size-6 shrink-0"

      aria-hidden="true"

    >

      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />

      <path d="M14 2v6h6M8 13h8M8 17h6" />

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

      className="size-5 shrink-0"

      aria-hidden="true"

    >

      <path d="m5 12 4 4L19 6" />

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

      className="size-4 shrink-0"

      aria-hidden="true"

    >

      <path d="M5 12h14m-6-6 6 6-6 6" />

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

/* ========================================

   INPUT STYLES

======================================== */

function premiumInput(hasError: boolean) {

  return [

    inputClasses(hasError),

    "w-full min-w-0 rounded-xl",

    "bg-[#FAFAFC] text-[#20242E]",

    "placeholder:text-[#A0A6B1]",

    "transition-[border-color,background-color,box-shadow]",

    "duration-300",

    "hover:border-[#BBC0CB]",

    "focus:bg-white focus:outline-none focus:ring-2",

    hasError

      ? "!border-red-400 focus:!border-red-500 focus:ring-red-500/10"

      : "border-[#E1E4EA] focus:!border-[#BA1D82] focus:ring-[#BA1D82]/10",

  ].join(" ");

}

/* ========================================

   MAIN COMPONENT

======================================== */

export function BrochureDownloadForm() {

  const reducedMotion = !!useReducedMotion();

  const [startedAt] = useState(() => Date.now());

  const [recaptchaToken, setRecaptchaToken] =

    useState<string | null>(null);

  const [captchaError, setCaptchaError] =

    useState<string | null>(null);

  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const downloadLinkRef =

    useRef<HTMLAnchorElement>(null);

  /*

    Prevent duplicate automatic downloads

    during re-renders / Strict Mode effects.

  */

  const downloadedReferenceRef =

    useRef<string | null>(null);

  const {

    submit,

    status,

    referenceId,

    errorMessage,

  } = useLeadSubmit("/api/brochure-download");

  const {

    register,

    handleSubmit,

    formState: { errors, isSubmitting },

  } = useForm<BrochureDownloadInput>({

    resolver: zodResolver(brochureDownloadSchema),

    mode: "onSubmit",

    reValidateMode: "onChange",

  });

  const isBusy =

    status === "submitting" || isSubmitting;

  const isSuccess =

    status === "success" && Boolean(referenceId);

  /* ======================================

     AUTOMATIC BROCHURE DOWNLOAD

  ====================================== */

  useEffect(() => {

    if (!isSuccess || !referenceId) return;

    if (

      downloadedReferenceRef.current ===

      referenceId

    ) {

      return;

    }

    downloadedReferenceRef.current = referenceId;

    downloadLinkRef.current?.click();

  }, [isSuccess, referenceId]);

  /* ======================================

     CAPTCHA

  ====================================== */

  function handleRecaptchaChange(

    token: string | null

  ) {

    setRecaptchaToken(token);

    if (token) {

      setCaptchaError(null);

    }

  }

  function handleRecaptchaExpired() {

    setRecaptchaToken(null);

    setCaptchaError(

      "Verification expired. Please complete reCAPTCHA again."

    );

  }

  function handleRecaptchaError() {

    setRecaptchaToken(null);

    setCaptchaError(

      "Security verification could not load. Please retry."

    );

  }

  /*

    On failed API submission, reCAPTCHA v2

    tokens may no longer be valid.

  */

  useEffect(() => {

    if (status !== "error") return;

    recaptchaRef.current?.reset();

    // Intentional: invalidate the token when an asynchronous API submission fails.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRecaptchaToken(null);

  }, [status]);

  /* ======================================

     SUBMISSION

  ====================================== */

  function onSubmit(data: BrochureDownloadInput) {

    if (isBusy) return;

    if (!recaptchaToken) {

      setCaptchaError(

        "Complete the security verification before downloading."

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

  }

  /* ======================================

     SUCCESS PANEL

  ====================================== */

  if (isSuccess) {

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

        role="status"

        className="relative overflow-hidden rounded-2xl border border-brand-primary/15 bg-white p-6 text-center shadow-[0_18px_50px_rgba(5,7,9,0.06)] sm:p-9"

      >

        <div

          aria-hidden="true"

          className="pointer-events-none absolute -right-24 -top-28 size-72 rounded-full bg-brand-primary/[0.07] blur-[85px]"

        />

        <div className="relative z-10 flex flex-col items-center">

          <motion.div

            initial={

              reducedMotion

                ? false

                : {

                    scale: 0.75,

                    opacity: 0,

                  }

            }

            animate={{

              scale: 1,

              opacity: 1,

            }}

            transition={{

              duration: 0.6,

              ease: EASE,

            }}

            className="flex size-16 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary"

          >

            <CheckIcon />

          </motion.div>

          <span className="mt-5 font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-brand-primary">

            Request Completed

          </span>

          <h3 className="mt-2 font-heading text-[23px] font-extrabold tracking-[-0.035em] text-brand-dark sm:text-[27px]">

            Your Brochure Is Ready

          </h3>

          <p className="mt-3 max-w-[440px] text-[13px] leading-[1.85] text-[#69717E]">

            Thank you for your interest in Bangladesh

            Buildcon International Expo. Your brochure

            download should begin automatically.

          </p>

          <a

            href={BROCHURE_FILE_URL}

            download={BROCHURE_FILE_NAME}

            className="group mt-7 inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-brand-primary px-7 py-3.5 font-heading text-[13px] font-bold text-white shadow-[0_10px_25px_rgba(186,29,130,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#9F176D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"

          >

            <DownloadIcon />

            Download Brochure

            <span className="transition-transform duration-300 group-hover:translate-x-1">

              <ArrowRightIcon />

            </span>

          </a>

          <p className="mt-4 text-[11px] leading-relaxed text-[#89909B]">

            Download did not start? Use the button above.

          </p>

          <p className="mt-3 text-[11px] text-[#9A9FAA]">

            Reference ID:{" "}

            <span className="font-semibold text-[#4B5260]">

              {referenceId}

            </span>

          </p>

          {/* Browser download trigger */}

          <a

            ref={downloadLinkRef}

            href={BROCHURE_FILE_URL}

            download={BROCHURE_FILE_NAME}

            className="hidden"

            tabIndex={-1}

            aria-hidden="true"

          >

            Download PDF

          </a>

        </div>

        <div

          aria-hidden="true"

          className="absolute inset-x-0 top-0 h-[3px] bg-brand-primary"

        />

      </motion.div>

    );

  }

  /* ======================================

     PREMIUM BROCHURE FORM

  ====================================== */

  return (

    <div className="relative w-full">

      <motion.div

        variants={formVariants}

        initial={reducedMotion ? false : "hidden"}

        whileInView="visible"

        viewport={{

          once: true,

          amount: 0.1,

        }}

        className="w-full"

      >

        {/* Heading */}

        <motion.div

          variants={revealVariants}

          className="mb-7 flex items-start gap-4 border-b border-brand-dark/10 pb-6"

        >

          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-primary/[0.08] text-brand-primary">

            <FileIcon />

          </span>

          <div className="min-w-0">

            <p className="font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-brand-primary">

              Official Event Brochure

            </p>

            <h3 className="mt-1.5 font-heading text-[19px] font-extrabold tracking-[-0.035em] text-brand-dark sm:text-[23px]">

              Get the Expo Brochure

            </h3>

            <p className="mt-2 text-[12px] leading-[1.8] text-[#707987] sm:text-[13px]">

              Enter your business details to request

              the Bangladesh Buildcon 2027 brochure.

            </p>

          </div>

        </motion.div>

        <form

          onSubmit={handleSubmit(onSubmit)}

          noValidate

          aria-busy={isBusy}

          className="flex flex-col gap-6"

        >

          {/* Anti-spam honeypot */}

          <div

            aria-hidden="true"

            className="absolute -left-[10000px] h-px w-px overflow-hidden"

          >

            <label htmlFor="b-website_hp">

              Website

            </label>

            <input

              id="b-website_hp"

              type="text"

              tabIndex={-1}

              autoComplete="off"

              {...register("website_hp")}

            />

          </div>

          {/* Field grid */}

          <motion.div

            variants={formVariants}

            className="grid gap-x-5 gap-y-6 sm:grid-cols-2"

          >

            {/* Name */}

            <motion.div variants={revealVariants}>

              <FieldWrapper

                label="Full Name"

                htmlFor="b-name"

                required

                error={errors.name}

              >

                <input

                  id="b-name"

                  type="text"

                  autoComplete="name"

                  placeholder="e.g. John Doe"

                  aria-invalid={!!errors.name}

                  className={premiumInput(

                    !!errors.name

                  )}

                  {...register("name")}

                />

              </FieldWrapper>

            </motion.div>

            {/* Company */}

            <motion.div variants={revealVariants}>

              <FieldWrapper

                label="Company Name"

                htmlFor="b-company"

                required

                error={errors.company}

              >

                <input

                  id="b-company"

                  type="text"

                  autoComplete="organization"

                  placeholder="e.g. Acme Construction"

                  aria-invalid={!!errors.company}

                  className={premiumInput(

                    !!errors.company

                  )}

                  {...register("company")}

                />

              </FieldWrapper>

            </motion.div>

            {/* Country */}

            <motion.div variants={revealVariants}>

              <FieldWrapper

                label="Country"

                htmlFor="b-country"

                required

                error={errors.country}

              >

                <select

                  id="b-country"

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

            </motion.div>

            {/* Email */}

            <motion.div variants={revealVariants}>

              <FieldWrapper

                label="Business Email"

                htmlFor="b-email"

                required

                error={errors.email}

              >

                <input

                  id="b-email"

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

            </motion.div>

            {/* Mobile */}

            <motion.div

              variants={revealVariants}

              className="sm:col-span-2"

            >

              <FieldWrapper

                label="Mobile / WhatsApp"

                htmlFor="b-mobile"

                required

                error={errors.mobile}

              >

                <input

                  id="b-mobile"

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

            </motion.div>

          </motion.div>

          {/* Privacy consent */}

          <motion.div

            variants={revealVariants}

            className="rounded-xl border border-[#E5E7ED] bg-[#FAFAFC] p-4 sm:p-5"

          >

            <label className="flex cursor-pointer items-start gap-3.5">

              <input

                type="checkbox"

                aria-invalid={!!errors.consent}

                className="mt-1 size-4 shrink-0 cursor-pointer accent-[#BA1D82] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"

                {...register("consent")}

              />

              <span className="text-[12px] leading-[1.85] text-[#667080] sm:text-[13px]">

                I agree that{" "}

                <strong className="font-semibold text-brand-dark">

                  Bangladesh Buildcon International Expo

                </strong>{" "}

                may contact me regarding my enquiry,

                in line with the{" "}

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

          </motion.div>

          {/* Security verification */}

          <motion.div

            variants={revealVariants}

          >

            <div className="mb-3 flex items-center gap-2.5">

              <span className="text-brand-primary">

                <ShieldIcon />

              </span>

              <p className="font-heading text-[12px] font-bold text-brand-dark">

                Security Verification

              </p>

            </div>

            <div className="rounded-xl border border-[#E5E7ED] bg-[#FAFAFC] p-3 sm:p-4">

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

                  className="text-[12px] text-amber-700"

                >

                  Security verification is not configured.

                  Please set

                  NEXT_PUBLIC_RECAPTCHA_SITE_KEY.

                </p>

              )}

              {recaptchaToken && (

                <p className="mt-3 flex items-center gap-2 text-[11px] font-semibold text-emerald-700">

                  <CheckIcon />

                  Verification completed

                </p>

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

          </motion.div>

          {/* Submission error */}

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

              role="alert"

              className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-[13px] leading-[1.7] text-red-700"

            >

              <AlertIcon />

              <span>{errorMessage}</span>

            </motion.div>

          )}

          {/* Submit footer */}

          <motion.div

            variants={revealVariants}

            className="flex flex-col gap-4 border-t border-brand-dark/10 pt-6 sm:flex-row sm:items-center sm:justify-between"

          >

            <div className="flex items-start gap-2.5 text-[#87909C]">

              <ShieldIcon />

              <p className="max-w-[250px] text-[11px] leading-[1.7]">

                The brochure will be available

                after successful submission.

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

                  : {

                      scale: 0.97,

                    }

              }

              transition={{

                duration: 0.3,

                ease: EASE,

              }}

              className="group inline-flex min-h-[52px] w-full shrink-0 items-center justify-center gap-3 rounded-xl bg-brand-primary px-7 py-3.5 font-heading text-[13px] font-bold text-white shadow-[0_12px_28px_rgba(186,29,130,0.2)] transition-colors duration-300 hover:bg-[#9F176D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none sm:w-auto"

            >

              {isBusy ? (

                <>

                  <LoaderIcon />

                  Submitting...

                </>

              ) : (

                <>

                  <DownloadIcon />

                  Download Brochure

                  <span className="transition-transform duration-300 group-hover:translate-x-1">

                    <ArrowRightIcon />

                  </span>

                </>

              )}

            </motion.button>

          </motion.div>

        </form>

      </motion.div>

    </div>

  );

}
