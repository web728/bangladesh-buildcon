"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ReCAPTCHA from "react-google-recaptcha";
import { motion, useReducedMotion } from "framer-motion";
import {
  visitorRegistrationSchema,
  type VisitorRegistrationInput,
} from "@/lib/validation/visitorRegistration";
import { FieldWrapper, inputClasses } from "./fields";
import { SuccessPanel } from "./SuccessPanel";
import { useLeadSubmit, getUtmFromLocation } from "@/hooks/useLeadSubmit";
import { useVisitorDraftAutosave } from "@/hooks/useVisitorDraftAutosave";
import { countries } from "@/data/countries";

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";
const UNIQUE_COUNTRIES = [
  ...new Set(countries.map((c) => c.trim()).filter(Boolean)),
];
const EASE = [0.22, 1, 0.36, 1] as const;
function fieldClass(error: boolean) {
  return `${inputClasses(error)} w-full min-w-0 rounded-lg border bg-[#FAFAFC] text-brand-dark placeholder:text-[#A1A7B2] focus:outline-none focus:ring-2 focus:ring-brand-primary/10 ${error ? "border-red-400" : "border-[#E1E4EA] focus:border-brand-primary"}`;
}
export function VisitorRegistrationForm() {
  const reducedMotion = !!useReducedMotion();
  const [startedAt] = useState(() => Date.now());
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState("");
  const captchaRef = useRef<ReCAPTCHA>(null);
  const { submit, status, referenceId, errorMessage } = useLeadSubmit(
    "/api/visitor-registration",
  );
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VisitorRegistrationInput>({
    resolver: zodResolver(visitorRegistrationSchema),
    defaultValues: { businessCategory: "" },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
  const values = useWatch({ control });
  const { draftId, saveStatus } = useVisitorDraftAutosave(
    values,
    status !== "success" && status !== "submitting",
  );
  const busy = isSubmitting || status === "submitting";
  const onSubmit = (data: VisitorRegistrationInput) => {
    if (busy) return;
    if (!recaptchaToken) {
      setCaptchaError("Complete security verification.");
      return;
    }
    setCaptchaError("");
    submit({
      ...data,
      draftId: draftId || undefined,
      recaptchaToken,
      startedAt,
      utm: getUtmFromLocation(),
      landingPage: location.pathname,
    });
  };
  if (status === "success" && referenceId) {
    return (
      <SuccessPanel
        title="Visitor Registration Received"
        message="Thank you for registering to visit Bangladesh Buildcon International Expo. Keep your registration reference for your records."
        referenceId={referenceId}
      />
    );
  }
  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        aria-busy={busy}
        className="space-y-5"
      >
        <div
          aria-hidden="true"
          className="absolute -left-[10000px] h-px w-px overflow-hidden"
        >
          <label htmlFor="visitor-website-hp">Website</label>
          <input
            id="visitor-website-hp"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("website_hp")}
          />
        </div>
        <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
          <FieldWrapper
            label="Full Name"
            htmlFor="visitor-fullName"
            required
            error={errors.fullName}
          >
            <input
              id="visitor-fullName"
              autoComplete="name"
              placeholder="Enter your full name"
              aria-invalid={!!errors.fullName}
              className={fieldClass(!!errors.fullName)}
              {...register("fullName")}
            />
          </FieldWrapper>
          <FieldWrapper
            label="Company / Organisation"
            htmlFor="visitor-company"
            required
            error={errors.company}
          >
            <input
              id="visitor-company"
              autoComplete="organization"
              placeholder="Enter organisation name"
              aria-invalid={!!errors.company}
              className={fieldClass(!!errors.company)}
              {...register("company")}
            />
          </FieldWrapper>
          <FieldWrapper
            label="Designation"
            htmlFor="visitor-designation"
            required
            error={errors.designation}
          >
            <input
              id="visitor-designation"
              autoComplete="organization-title"
              placeholder="Enter your designation"
              aria-invalid={!!errors.designation}
              className={fieldClass(!!errors.designation)}
              {...register("designation")}
            />
          </FieldWrapper>
          <FieldWrapper
            label="Mobile / WhatsApp Number"
            htmlFor="visitor-mobile"
            required
            error={errors.mobile}
          >
            <input
              id="visitor-mobile"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              placeholder="Enter mobile / WhatsApp number"
              aria-invalid={!!errors.mobile}
              className={fieldClass(!!errors.mobile)}
              {...register("mobile")}
            />
          </FieldWrapper>
          <FieldWrapper
            label="Email Address"
            htmlFor="visitor-email"
            required
            error={errors.email}
          >
            <input
              id="visitor-email"
              type="email"
              autoComplete="email"
              inputMode="email"
              placeholder="name@company.com"
              aria-invalid={!!errors.email}
              className={fieldClass(!!errors.email)}
              {...register("email")}
            />
          </FieldWrapper>
          <FieldWrapper
            label="Business / Category"
            htmlFor="visitor-businessCategory"
            error={errors.businessCategory}
          >
            <input
              id="visitor-businessCategory"
              placeholder="e.g. Contractor, Distributor"
              aria-invalid={!!errors.businessCategory}
              className={fieldClass(!!errors.businessCategory)}
              {...register("businessCategory")}
            />
          </FieldWrapper>
          <div className="sm:col-span-2">
            <FieldWrapper
              label="Country"
              htmlFor="visitor-country"
              required
              error={errors.country}
            >
              <select
                id="visitor-country"
                defaultValue=""
                aria-invalid={!!errors.country}
                className={fieldClass(!!errors.country)}
                {...register("country")}
              >
                <option value="" disabled>
                  Select country
                </option>
                {UNIQUE_COUNTRIES.map((c) => (
                  <option value={c} key={c}>
                    {c}
                  </option>
                ))}
              </select>
            </FieldWrapper>
          </div>
        </div>
        <div className="border-t border-[#E9E4EB] pt-5">
          <h3 className="font-heading text-[12px] font-bold text-brand-dark">
            Security Verification
          </h3>
          {SITE_KEY ? (
            <div className="mt-3 max-w-full overflow-x-auto">
              <div className="w-[304px]">
                <ReCAPTCHA
                  ref={captchaRef}
                  sitekey={SITE_KEY}
                  onChange={(token) => {
                    setRecaptchaToken(token);
                    setCaptchaError("");
                  }}
                  onExpired={() => setRecaptchaToken(null)}
                  onErrored={() =>
                    setCaptchaError("Captcha unavailable. Retry verification.")
                  }
                />
              </div>
            </div>
          ) : (
            <p role="alert" className="mt-2 text-[12px] text-red-700">
              reCAPTCHA site key is not configured.
            </p>
          )}
          {captchaError && (
            <p role="alert" className="mt-2 text-[12px] text-red-600">
              {captchaError}
            </p>
          )}
          {status === "error" && errorMessage && (
            <p
              role="alert"
              className="mt-3 rounded-lg border border-red-200 bg-red-50 p-3 text-[12px] text-red-700"
            >
              {errorMessage}
            </p>
          )}
          <div className="mt-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <p className="text-[11px] leading-[1.6] text-[#827987]">
              {saveStatus === "saved"
                ? "Draft saved"
                : saveStatus === "saving"
                  ? "Saving draft…"
                  : saveStatus === "offline"
                    ? "Offline — draft not saved"
                    : saveStatus === "error"
                      ? "Draft save unavailable"
                      : "Your details are used for visitor registration."}
            </p>
            <button
              type="submit"
              disabled={busy || !recaptchaToken || !SITE_KEY}
              className="min-h-11 rounded-lg bg-brand-primary px-6 py-3 font-heading text-[12px] font-bold text-white transition-colors hover:bg-brand-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
            >
              {busy ? "Submitting…" : "Submit Visitor Registration"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
