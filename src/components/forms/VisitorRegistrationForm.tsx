"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import {
  visitorRegistrationSchema,
  type VisitorRegistrationInput,
  purchasingResponsibilityOptions,
  purposeOfVisitOptions,
  natureOfBusinessOptions,
} from "@/lib/validation/visitorRegistration";
import { FieldWrapper, inputClasses } from "./fields";
import { SuccessPanel } from "./SuccessPanel";
import { useLeadSubmit, getUtmFromLocation } from "@/hooks/useLeadSubmit";
import { countries } from "@/data/countries";
import { exhibitionSectors } from "@/data/exhibitionProfile";

export function VisitorRegistrationForm() {
  const [startedAt] = useState(() => Date.now());
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const { submit, status, referenceId, errorMessage } = useLeadSubmit("/api/visitor-registration");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<VisitorRegistrationInput>({
    resolver: zodResolver(visitorRegistrationSchema),
    defaultValues: { productsInterested: [] },
  });

  if (status === "success" && referenceId) {
    return (
      <SuccessPanel
        title="Visitor Registration Received"
        message="Thank you for registering to visit Bangladesh Buildcon International Expo. Please keep this reference for your records and entry badge collection."
        referenceId={referenceId}
      />
    );
  }

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const onSubmit = (data: VisitorRegistrationInput) => {
    if (!recaptchaToken) {
      alert("Please check the 'I'm not a robot' box.");
      return;
    }

    submit({
      ...data,
      recaptchaToken,
      startedAt,
      utm: getUtmFromLocation(),
      landingPage: window.location.pathname,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-10">
      {/* Bot Honeypot Field */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website_hp">Website</label>
        <input id="website_hp" type="text" tabIndex={-1} autoComplete="off" {...register("website_hp")} />
      </div>

      {/* SECTION 1: PERSONAL & COMPANY DETAILS */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-green/10 text-xs font-bold text-brand-green-dark">
            01
          </span>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
            Contact & Professional Details
          </h3>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <FieldWrapper label="First Name" htmlFor="firstName" required error={errors.firstName}>
            <input id="firstName" placeholder="John" className={inputClasses(!!errors.firstName)} {...register("firstName")} />
          </FieldWrapper>

          <FieldWrapper label="Last Name" htmlFor="lastName" required error={errors.lastName}>
            <input id="lastName" placeholder="Doe" className={inputClasses(!!errors.lastName)} {...register("lastName")} />
          </FieldWrapper>

          <FieldWrapper label="Designation / Job Title" htmlFor="designation" required error={errors.designation}>
            <input id="designation" placeholder="e.g. Project Manager, Architect" className={inputClasses(!!errors.designation)} {...register("designation")} />
          </FieldWrapper>

          <FieldWrapper label="Company / Organization" htmlFor="company" required error={errors.company}>
            <input id="company" placeholder="e.g. BuildTech Solutions" className={inputClasses(!!errors.company)} {...register("company")} />
          </FieldWrapper>

          <FieldWrapper label="Country" htmlFor="country" required error={errors.country}>
            <select id="country" className={inputClasses(!!errors.country)} {...register("country")} defaultValue="">
              <option value="" disabled>Select country</option>
              {countries.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </FieldWrapper>

          <FieldWrapper label="City" htmlFor="city" required error={errors.city}>
            <input id="city" placeholder="e.g. Dhaka" className={inputClasses(!!errors.city)} {...register("city")} />
          </FieldWrapper>

          <FieldWrapper label="Business Email" htmlFor="email" required error={errors.email}>
            <input id="email" type="email" placeholder="john@company.com" className={inputClasses(!!errors.email)} {...register("email")} />
          </FieldWrapper>

          <FieldWrapper label="Mobile / WhatsApp Number" htmlFor="mobile" required error={errors.mobile}>
            <input id="mobile" type="tel" placeholder="+255 123 456 789" className={inputClasses(!!errors.mobile)} {...register("mobile")} />
          </FieldWrapper>

          <FieldWrapper label="Nature of Business" htmlFor="natureOfBusiness" required error={errors.natureOfBusiness} className="sm:col-span-2">
            <select id="natureOfBusiness" className={inputClasses(!!errors.natureOfBusiness)} {...register("natureOfBusiness")} defaultValue="">
              <option value="" disabled>Select primary business focus</option>
              {natureOfBusinessOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </FieldWrapper>
        </div>
      </section>

      {/* SECTION 2: INTERESTED SECTORS / PRODUCTS */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-green/10 text-xs font-bold text-brand-green-dark">
            02
          </span>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
            Products & Sectors Interested In <span className="text-red-500">*</span>
          </h3>
        </div>

        <div>
          <Controller
            name="productsInterested"
            control={control}
            render={({ field }) => (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {exhibitionSectors.map((sector) => {
                  const checked = field.value?.includes(sector.name);
                  return (
                    <label
                      key={sector.slug}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3.5 text-sm transition-all ${
                        checked
                          ? "border-brand-green bg-brand-green/5 font-medium text-slate-900 ring-2 ring-brand-green/20"
                          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-slate-300 text-brand-green focus:ring-brand-green"
                        checked={checked}
                        onChange={(e) => {
                          const next = e.target.checked
                            ? [...(field.value ?? []), sector.name]
                            : (field.value ?? []).filter((v) => v !== sector.name);
                          field.onChange(next);
                        }}
                      />
                      <span>{sector.name}</span>
                    </label>
                  );
                })}
              </div>
            )}
          />
          {errors.productsInterested && (
            <p className="mt-2 text-xs font-medium text-red-600">
              {errors.productsInterested.message}
            </p>
          )}
        </div>
      </section>

      {/* SECTION 3: PURCHASING RESPONSIBILITY & PURPOSE */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-green/10 text-xs font-bold text-brand-green-dark">
            03
          </span>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
            Purchasing Intent
          </h3>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <FieldWrapper label="Purchasing Responsibility" htmlFor="purchasingResponsibility" required error={errors.purchasingResponsibility}>
            <select id="purchasingResponsibility" className={inputClasses(!!errors.purchasingResponsibility)} {...register("purchasingResponsibility")} defaultValue="">
              <option value="" disabled>Select decision level</option>
              {purchasingResponsibilityOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </FieldWrapper>

          <FieldWrapper label="Primary Purpose of Visit" htmlFor="purposeOfVisit" required error={errors.purposeOfVisit}>
            <select id="purposeOfVisit" className={inputClasses(!!errors.purposeOfVisit)} {...register("purposeOfVisit")} defaultValue="">
              <option value="" disabled>Select visit goal</option>
              {purposeOfVisitOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </FieldWrapper>
        </div>
      </section>

      {/* SECTION 4: CONSENT, RECAPTCHA & SUBMIT */}
      <div className="space-y-6 pt-2">
        <label className="flex items-start gap-3 text-sm text-slate-600">
          <input 
            type="checkbox" 
            className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-green focus:ring-brand-green" 
            {...register("consent")} 
          />
          <span className="leading-relaxed">
            I agree that Bangladesh Buildcon International Expo may contact me regarding my visitor registration, in accordance with the{" "}
            <a href="/privacy-policy" className="font-medium text-brand-green underline hover:text-brand-green-dark">
              Privacy Policy
            </a>.
          </span>
        </label>
        {errors.consent && (
          <p className="text-xs font-medium text-red-600">{errors.consent.message}</p>
        )}

        {/* reCAPTCHA v2 Checkbox Widget */}
        <div className="py-2">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
            onChange={handleRecaptchaChange}
          />
        </div>

        {status === "error" && errorMessage && (
          <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={status === "submitting" || !recaptchaToken}
          className="inline-flex w-full items-center justify-center rounded-xl bg-brand-green px-8 py-4 text-base font-semibold text-white shadow-lg shadow-brand-green/20 transition-all hover:bg-brand-green-dark hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "submitting" ? (
            <span className="flex items-center gap-2">
              <svg className="h-5 w-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Registering Visitor...
            </span>
          ) : (
            "Complete Visitor Registration"
          )}
        </button>
      </div>
    </form>
  );
}