"use client";

import { useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useExhibitorDraftAutosave } from "@/hooks/useExhibitorDraftAutosave";
import { zodResolver } from "@hookform/resolvers/zod";
import ReCAPTCHA from "react-google-recaptcha";
import { motion, useReducedMotion } from "framer-motion";

import {
  exhibitorEnquirySchema,
  boothSizeOptions,
  type ExhibitorEnquiryInput,
} from "@/lib/validation/exhibitorEnquiry";
import { FieldWrapper, inputClasses } from "./fields";
import { SuccessPanel } from "./SuccessPanel";
import { useLeadSubmit, getUtmFromLocation } from "@/hooks/useLeadSubmit";
import { countries } from "@/data/countries";

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";
const EASE = [0.22, 1, 0.36, 1] as const;
const UNIQUE_COUNTRIES = Array.from(
  new Set(countries.map((country) => country.trim()).filter(Boolean)),
);

function fieldClass(hasError: boolean) {
  return [
    inputClasses(hasError),
    "w-full min-w-0 rounded-lg border bg-[#FAFAFC] text-brand-dark",
    "placeholder:text-[#A1A7B2] transition-[border-color,box-shadow,background-color] duration-200",
    "focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/10",
    hasError
      ? "!border-red-400 focus:!border-red-500"
      : "border-[#E1E4EA] hover:border-[#C4B9C5] focus:!border-brand-primary",
  ].join(" ");
}

export function BookStandForm() {
  const reducedMotion = !!useReducedMotion();
  const [startedAt] = useState(() => Date.now());
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const { submit, status, referenceId, errorMessage } =
    useLeadSubmit("/api/exhibitor-enquiry");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ExhibitorEnquiryInput>({
    resolver: zodResolver(exhibitorEnquirySchema),
    defaultValues: { preferredBoothSize: "" },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const watched = useWatch({ control });
  const { draftId, saveStatus } = useExhibitorDraftAutosave(
    watched,
    status !== "success" && status !== "submitting",
  );

  const isBusy = status === "submitting" || isSubmitting;

  const onSubmit = (data: ExhibitorEnquiryInput) => {
    if (isBusy) return;
    if (SITE_KEY && !recaptchaToken) {
      setCaptchaError("Please complete the reCAPTCHA verification.");
      return;
    }
    setCaptchaError(null);
    submit({
      ...data,
      draftId: draftId || undefined,
      preferredBoothSize: data.preferredBoothSize || undefined,
      recaptchaToken: recaptchaToken || "",
      startedAt,
      utm: getUtmFromLocation(),
      landingPage: window.location.pathname,
    });
  };

  if (status === "success" && referenceId) {
    return (
      <SuccessPanel
        title="Exhibitor Enquiry Received"
        message="Thank you for your interest in exhibiting at Bangladesh Buildcon International Expo. Our exhibition team will contact you about participation arrangements."
        referenceId={referenceId}
      />
    );
  }

  return (
    <div className="w-full">
     

      <form onSubmit={handleSubmit(onSubmit)} noValidate aria-busy={isBusy} className="space-y-6">
        {/* Anti-spam only. */}
        <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
          <label htmlFor="website_hp">Website</label>
          <input
            id="website_hp"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("website_hp")}
          />
        </div>

        <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
          <FieldWrapper label="Company Name" htmlFor="companyName" required error={errors.companyName}>
            <input
              id="companyName"
              autoComplete="organization"
              placeholder="Enter company name"
              aria-invalid={!!errors.companyName}
              className={fieldClass(!!errors.companyName)}
              {...register("companyName")}
            />
          </FieldWrapper>

          <FieldWrapper label="Contact Person" htmlFor="contactPerson" required error={errors.contactPerson}>
            <input
              id="contactPerson"
              autoComplete="name"
              placeholder="Enter full name"
              aria-invalid={!!errors.contactPerson}
              className={fieldClass(!!errors.contactPerson)}
              {...register("contactPerson")}
            />
          </FieldWrapper>

          <FieldWrapper label="Designation" htmlFor="designation" required error={errors.designation}>
            <input
              id="designation"
              autoComplete="organization-title"
              placeholder="e.g. Director"
              aria-invalid={!!errors.designation}
              className={fieldClass(!!errors.designation)}
              {...register("designation")}
            />
          </FieldWrapper>

          <FieldWrapper label="Mob/WhatsApp No." htmlFor="mobile" required error={errors.mobile}>
            <input
              id="mobile"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="Enter Your Working Number"
              aria-invalid={!!errors.mobile}
              className={fieldClass(!!errors.mobile)}
              {...register("mobile")}
            />
          </FieldWrapper>

          <FieldWrapper label="Email Address" htmlFor="email" required error={errors.email}>
            <input
              id="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="name@company.com"
              aria-invalid={!!errors.email}
              className={fieldClass(!!errors.email)}
              {...register("email")}
            />
          </FieldWrapper>

          <FieldWrapper label="Country" htmlFor="country" required error={errors.country}>
            <select
              id="country"
              defaultValue=""
              aria-invalid={!!errors.country}
              className={fieldClass(!!errors.country)}
              {...register("country")}
            >
              <option value="" disabled>Select country</option>
              {UNIQUE_COUNTRIES.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </FieldWrapper>

          <FieldWrapper
            label="Preferred Booth Size"
            htmlFor="preferredBoothSize"
            error={errors.preferredBoothSize}
          >
            <select
              id="preferredBoothSize"
              defaultValue=""
              aria-invalid={!!errors.preferredBoothSize}
              className={fieldClass(!!errors.preferredBoothSize)}
              {...register("preferredBoothSize")}
            >
              <option value="">Not decided / Discuss with team</option>
              {boothSizeOptions.map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </FieldWrapper>

          <div className="sm:col-span-2">
            <FieldWrapper
              label="Products & Services"
              htmlFor="productsServices"
              required
              error={errors.productsServices}
            >
              <textarea
                id="productsServices"
                rows={4}
                placeholder="Describe the products or services you want to exhibit..."
                aria-invalid={!!errors.productsServices}
                className={`${fieldClass(!!errors.productsServices)} resize-y`}
                {...register("productsServices")}
              />
            </FieldWrapper>
          </div>
        </div>

        <div aria-live="polite" className="text-[11px] text-[#807782]">
          {saveStatus === "saving" && "Saving draft…"}
          {saveStatus === "saved" && "Draft saved"}
          {saveStatus === "offline" && "Offline — draft not saved yet"}
          {saveStatus === "error" && "Draft could not be saved; submission is still available"}
        </div>

        {/* Existing reCAPTCHA v2 verification. */}
        <div className="border-t border-[#E9E4EB] pt-5">
          <h3 className="mb-3 font-heading text-[12px] font-bold text-brand-dark">
            Security Verification
          </h3>
          {SITE_KEY ? (
            <div className="max-w-full overflow-x-auto">
              <div className="w-[304px]">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={SITE_KEY}
                  onChange={(token) => {
                    setRecaptchaToken(token);
                    if (token) setCaptchaError(null);
                  }}
                  onExpired={() => {
                    setRecaptchaToken(null);
                    setCaptchaError("Verification expired. Please verify again.");
                  }}
                  onErrored={() => {
                    setRecaptchaToken(null);
                    setCaptchaError("Verification could not load. Please retry.");
                  }}
                />
              </div>
            </div>
          ) : (
            <p role="alert" className="text-[12px] text-amber-700">
              Security verification is not configured. Set NEXT_PUBLIC_RECAPTCHA_SITE_KEY.
            </p>
          )}
          {captchaError && <p role="alert" className="mt-2 text-[12px] text-red-600">{captchaError}</p>}
        </div>

        {status === "error" && errorMessage && (
          <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-3 text-[12px] text-red-700">
            {errorMessage}
          </p>
        )}

        <div className="flex flex-col justify-between gap-4 border-t border-[#E9E4EB] pt-5 sm:flex-row sm:items-center">
          <p className="max-w-[340px] text-[11px] leading-[1.7] text-[#7A7280]">
            Your enquiry will be shared with the exhibition team for follow-up.
          </p>
          <motion.button
            type="submit"
            disabled={isBusy || !SITE_KEY || !recaptchaToken}
            whileHover={reducedMotion || isBusy ? undefined : { y: -2 }}
            className="min-h-11 w-full rounded-lg bg-brand-primary px-6 py-3 font-heading text-[12px] font-bold text-white transition-colors hover:bg-brand-primary-dark disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            {isBusy ? "Submitting Enquiry..." : "Submit Exhibitor Enquiry"}
          </motion.button>
        </div>
      </form>
    </div>
  );
}
