import type { FieldError } from "react-hook-form";
import { forwardRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { clsx } from "@/lib/utils/clsx";

const INPUT_CLASSES =
  "w-full rounded-md border border-brand-border bg-white px-4 py-2.5 text-sm text-brand-dark placeholder:text-brand-body/50 focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue disabled:opacity-60";

export function FieldWrapper({
  label,
  htmlFor,
  required,
  error,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: FieldError;
  className?: string;
  children: React.ReactNode;
}) {
  const errorId = `${htmlFor}-error`;
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-brand-dark">
        {label}
        {required ? <span className="text-brand-blue"> *</span> : null}
      </label>
      {children}
      {error ? (
        <p
          id={errorId}
          role="alert"
          className="mt-1.5 opacity-100 text-xs font-medium text-red-600 transition-opacity duration-150 ease-out starting:opacity-0"
        >
          {error.message}
        </p>
      ) : null}
    </div>
  );
}

export const inputClasses = (hasError?: boolean) =>
  clsx(INPUT_CLASSES, hasError && "border-red-400 focus:border-red-500 focus:ring-red-500");

// Standardized ReCAPTCHA Field Component
export const ReCaptchaField = forwardRef<ReCAPTCHA, { onChange: (token: string | null) => void; className?: string }>(
  ({ onChange, className }, ref) => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

    if (!siteKey) {
      console.warn("reCAPTCHA Site Key is missing in environment variables.");
      return null;
    }

    return (
      <div className={clsx("py-2", className)}>
        <ReCAPTCHA ref={ref} sitekey={siteKey} onChange={onChange} />
      </div>
    );
  }
);

ReCaptchaField.displayName = "ReCaptchaField";