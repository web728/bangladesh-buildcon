
"use client";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

import { Container } from "@/components/ui/Container";
import { BookStandForm } from "@/components/forms/BookStandForm";

const EASE = [0.22, 1, 0.36, 1] as const;

export function BookStandPageContent() {
  const reducedMotion = !!useReducedMotion();

  return (
    <section
      aria-labelledby="book-stand-form-heading"
      className="relative overflow-hidden bg-brand-light py-10 sm:py-14 lg:py-16"
    >
      {/* Subtle structural background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(5,7,9,0.018)_1px,transparent_1px),linear-gradient(to_bottom,rgba(5,7,9,0.018)_1px,transparent_1px)] bg-[size:64px_64px]"
      />

      <Container className="relative z-10">
        <motion.div
          initial={
            reducedMotion
              ? false
              : {
                  opacity: 0,
                  y: 20,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.08,
          }}
          transition={{
            duration: reducedMotion ? 0 : 0.65,
            ease: EASE,
          }}
          className="mx-auto w-full max-w-[850px] overflow-hidden rounded-2xl border border-brand-border bg-white shadow-[0_16px_48px_rgba(5,7,9,0.055)]"
        >
          {/* Official brand accent */}
          <div
            aria-hidden="true"
            className="h-[3px] w-full bg-brand-primary"
          />

          {/* Form heading */}
          <div className="border-b border-brand-border bg-white px-5 py-6 text-center sm:px-9 sm:py-7">
            <p className="font-heading text-[10px] font-extrabold uppercase tracking-[0.16em] text-brand-primary-dark">
              10th Bangladesh Buildcon International Expo 2026
            </p>

            <h2
              id="book-stand-form-heading"
              className="mt-3 font-heading text-[clamp(1.45rem,2.6vw,1.85rem)] font-extrabold leading-[1.25] tracking-[-0.04em] text-brand-dark"
            >
              Exhibitor{" "}
              <span className="text-brand-primary-dark">
                Enquiry Form
              </span>
            </h2>

            <p className="mx-auto mt-3 max-w-[580px] text-[13px] leading-[1.85] text-brand-body sm:text-[14px]">
              Submit your details to enquire about
              exhibition stand participation at
              Bangladesh Buildcon International Expo 2026.
            </p>

            {/* Brochure-confirmed event details */}
            <p className="mt-3 font-heading text-[11px] font-semibold leading-[1.7] text-brand-muted sm:text-[12px]">
              17–19 September 2026
              <span
                aria-hidden="true"
                className="mx-2 text-brand-primary"
              >
                |
              </span>
              ICCB Exhibition Hall, Dhaka
            </p>
          </div>

          {/* Existing form — no functional changes */}
          <div className="px-5 py-7 sm:px-9 sm:py-9">
            <BookStandForm />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
