
"use client";

import {
  forwardRef,
  useId,
  type ReactNode,
} from "react";

import type { FieldError } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";

import { clsx } from "@/lib/utils/clsx";

/* ==========================================
   SHARED PREMIUM INPUT STYLES
========================================== */

const INPUT_CLASSES = [
  "block w-full min-w-0",
  "min-h-[46px]",
  "rounded-xl",
  "border border-[#E2E5EC]",
  "bg-[#FAFAFC]",
  "px-4 py-3",
  "font-sans text-[13px] sm:text-[14px]",
  "font-medium text-[#20242E]",
  "placeholder:font-normal",
  "placeholder:text-[#A1A7B2]",
  "shadow-[0_1px_2px_rgba(5,7,9,0.02)]",
  "outline-none",
  "transition-[border-color,box-shadow,background-color]",
  "duration-250",
  "hover:border-[#C2C7D1]",
  "focus:border-[#BA1D82]",
  "focus:bg-white",
  "focus:ring-2",
  "focus:ring-[#BA1D82]/10",
  "focus-visible:outline-none",
  "disabled:cursor-not-allowed",
  "disabled:bg-[#F0F1F4]",
  "disabled:opacity-60",
  "aria-invalid:border-red-400",
  "aria-invalid:focus:border-red-500",
  "aria-invalid:focus:ring-red-500/10",
].join(" ");

/*
  Existing API preserved:

  inputClasses()
  inputClasses(true)
  inputClasses(false)
*/

export function inputClasses(
  hasError: boolean = false
) {
  return clsx(
    INPUT_CLASSES,
    hasError &&
      "border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-red-500/10"
  );
}

/* ==========================================
   SHARED FIELD WRAPPER
========================================== */

interface FieldWrapperProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: FieldError;
  className?: string;
  children: ReactNode;

  /** Optional explanatory text below the field */
  hint?: string;
}

export function FieldWrapper({
  label,
  htmlFor,
  required = false,
  error,
  className,
  children,
  hint,
}: FieldWrapperProps) {
  const errorId = `${htmlFor}-error`;
  const hintId = `${htmlFor}-hint`;

  return (
    <div
      className={clsx(
        "group/field min-w-0",
        className
      )}
    >
      {/* Label */}
      <div className="mb-2 flex items-center justify-between gap-3">
        <label
          htmlFor={htmlFor}
          className="font-heading text-[12px] font-bold leading-[1.5] tracking-[0.005em] text-[#323946] transition-colors duration-300 group-focus-within/field:text-brand-primary sm:text-[13px]"
        >
          {label}

          {required && (
            <span
              aria-hidden="true"
              className="ml-1 text-brand-primary"
            >
              *
            </span>
          )}
        </label>

        {!required && (
          <span className="shrink-0 text-[10px] font-medium text-[#A1A7B2]">
            Optional
          </span>
        )}
      </div>

      {/* Input / Select / Textarea */}
      <div className="relative min-w-0">
        {children}
      </div>

      {/* Helper message */}
      {hint && !error && (
        <p
          id={hintId}
          className="mt-2 text-[11px] leading-[1.7] text-[#87909D]"
        >
          {hint}
        </p>
      )}

      {/* Validation error */}
      {error && (
        <div
          id={errorId}
          role="alert"
          aria-live="polite"
          className="mt-2 flex items-start gap-1.5 text-[11px] font-medium leading-[1.6] text-red-600 sm:text-[12px]"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mt-0.5 size-3.5 shrink-0"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v6m0 4h.01" />
          </svg>

          <span>
            {error.message || "Please check this field."}
          </span>
        </div>
      )}
    </div>
  );
}

/* ==========================================
   STANDARDIZED RESPONSIVE RECAPTCHA
========================================== */

interface ReCaptchaFieldProps {
  onChange: (token: string | null) => void;
  onExpired?: () => void;
  onErrored?: () => void;
  className?: string;
  error?: string | null;
  showLabel?: boolean;
}

export const ReCaptchaField = forwardRef<
  ReCAPTCHA,
  ReCaptchaFieldProps
>(function ReCaptchaField(
  {
    onChange,
    onExpired,
    onErrored,
    className,
    error,
    showLabel = true,
  },
  ref
) {
  const siteKey =
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

  const generatedId = useId();
  const errorId = `${generatedId}-error`;

  return (
    <div
      className={clsx(
        "w-full min-w-0",
        className
      )}
    >
      {/* Security heading */}
      {showLabel && (
        <div className="mb-3 flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg bg-brand-primary/[0.08] text-brand-primary">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-[17px]"
              aria-hidden="true"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </span>

          <div>
            <p className="font-heading text-[12px] font-bold text-[#323946]">
              Security Verification
            </p>

            <p className="mt-0.5 text-[11px] text-[#9097A3]">
              Complete the check to continue
            </p>
          </div>
        </div>
      )}

      {/* Widget container */}
      <div
        className={clsx(
          "min-w-0 rounded-xl border bg-[#FAFAFC] p-3 sm:p-4",
          "transition-colors duration-300",
          error
            ? "border-red-300 bg-red-50/30"
            : "border-[#E4E7ED]"
        )}
      >
        {siteKey ? (
          <div className="max-w-full overflow-x-auto">
            <div className="w-[304px]">
              <ReCAPTCHA
                ref={ref}
                sitekey={siteKey}
                onChange={onChange}
                onExpired={onExpired}
                onErrored={onErrored}
              />
            </div>
          </div>
        ) : (
          <div
            role="alert"
            className="flex items-start gap-2.5 rounded-lg border border-amber-200 bg-amber-50 p-3 text-[12px] leading-relaxed text-amber-800"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mt-0.5 size-4 shrink-0"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v6m0 4h.01" />
            </svg>

            <span>
              reCAPTCHA is not configured.
              Please set{" "}
              <code className="font-semibold">
                NEXT_PUBLIC_RECAPTCHA_SITE_KEY
              </code>
              .
            </span>
          </div>
        )}
      </div>

      {/* CAPTCHA error */}
      {error && (
        <p
          id={errorId}
          role="alert"
          className="mt-2 text-[12px] font-medium leading-relaxed text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  );
});

ReCaptchaField.displayName = "ReCaptchaField";
