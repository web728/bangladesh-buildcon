"use client";

import { Button } from "@/components/ui/Button";

export function SuccessPanel({
  title,
  message,
  homeLabel = "Back to Home",
}: {
  title: string;
  message: string;
  referenceId?: string;
  homeLabel?: string;
}) {
  return (
    <div className="relative mx-auto w-full max-w-xl overflow-hidden rounded-3xl border border-brand-green/20 bg-gradient-to-b from-white via-slate-50/50 to-brand-green/5 p-8 text-center shadow-[0_20px_50px_rgba(48,64,144,0.08)] backdrop-blur-xl sm:p-12">
      {/* Subtle Ambient Background Radial Glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-brand-green/15 blur-3xl" />

      {/* Animated Checkmark Icon Badge */}
      <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
        <div className="absolute inset-0 animate-ping rounded-full bg-brand-purple/20 duration-1000" />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-brand-green to-brand-purple text-white shadow-lg shadow-brand-green/30">
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>

      {/* Main Title & Message */}
      <h2 className="mt-6 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        {title}
      </h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-600 sm:text-base">
        {message}
      </p>

      {/* Action CTA */}
      <div className="mt-8 flex justify-center">
        <Button
          href="/"
          variant="ghost"
          className="rounded-full px-8 py-3 text-sm font-semibold tracking-wide text-slate-700 transition-all hover:bg-slate-100 hover:text-slate-900 active:scale-95"
        >
          {homeLabel}
        </Button>
      </div>
    </div>
  );
}
