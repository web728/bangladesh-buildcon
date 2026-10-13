
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
      className="relative bg-[#F8F9FB] py-10 sm:py-14 lg:py-16"
    >
      <Container>
        <motion.div
          initial={
            reducedMotion
              ? false
              : {
                  opacity: 0,
                  y: 24,
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
            duration: 0.7,
            ease: EASE,
          }}
          className="mx-auto w-full max-w-[850px] overflow-hidden rounded-2xl border border-[#E1E4EA] bg-white shadow-[0_15px_50px_rgba(5,7,9,0.055)]"
        >
          {/* Premium form header */}
          <div className="relative border-b border-[#E8EAF0] px-5 py-6 text-center sm:px-9 sm:py-7">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#BA1D82] via-[#D94DA3] to-[#BA1D82]"
            />

            <p className="font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-[#981568]">
              Bangladesh Buildcon 2026
            </p>

            <h2
              id="book-stand-form-heading"
              className="mt-2 font-heading text-[22px] font-extrabold tracking-[-0.04em] text-[#171B24] sm:text-[27px]"
            >
              Exhibitor{" "}
              <span className="text-[#981568]">
                Enquiry Form
              </span>
            </h2>

            <p className="mx-auto mt-2 max-w-[530px] text-[13px] leading-[1.8] text-[#414957]">
              Fill in your details and stand requirements
              to submit your exhibition enquiry.
            </p>
          </div>

          {/* Existing working form */}
          <div className="px-5 py-7 sm:px-9 sm:py-9">
            <BookStandForm />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
