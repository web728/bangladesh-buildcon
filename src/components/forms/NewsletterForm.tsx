"use client";

import { useState, useRef, type FormEvent } from "react";
import ReCAPTCHA from "react-google-recaptcha";

type Status = "idle" | "submitting" | "success" | "error";

export function NewsletterForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [startedAt] = useState(() => Date.now());
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!recaptchaToken) {
      alert("Please check the 'I'm not a robot' box.");
      return;
    }

    if (status === "submitting") return;
    setStatus("submitting");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website, startedAt, recaptchaToken }),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      setEmail("");
      setRecaptchaToken(null);
    } catch {
      setStatus("error");
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
    }
  }

  if (status === "success") {
    return (
      <p className="mt-4 rounded-md border border-brand-green/30 bg-brand-green/10 px-4 py-3 text-sm text-white">
        Thank you — you&apos;re subscribed for Bangladesh Buildcon updates.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3" noValidate>
      {/* Honeypot Spam Guard */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="footer-website">Website</label>
        <input
          id="footer-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor="footer-newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="footer-newsletter-email"
          type="email"
          required
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full flex-1 rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-brand-blue focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "submitting" || !recaptchaToken}
          className="flex-shrink-0 rounded-md bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white transition-[background-color,transform] duration-150 ease-out active:scale-[0.97] disabled:active:scale-100 hover:bg-brand-blue-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "submitting" ? "Subscribing…" : "Subscribe"}
        </button>
      </div>

      {/* reCAPTCHA v2 Checkbox Widget */}
      <div className="py-1">
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
          onChange={handleRecaptchaChange}
        />
      </div>

      {status === "error" ? (
        <p className="text-xs text-red-300">Something went wrong. Please try again.</p>
      ) : null}
    </form>
  );
}