
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import type { GallerySummary } from "@/lib/data/gallery";

/* ==========================================
   ANIMATION
========================================== */

const EASE = [0.22, 1, 0.36, 1] as const;

const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.065,
      delayChildren: 0.04,
    },
  },
};

const photoVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: EASE,
    },
  },
};

/* ==========================================
   ICONS
========================================== */

function ExpandIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
      aria-hidden="true"
    >
      <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M3 16v3a2 2 0 0 0 2 2h3M21 16v3a2 2 0 0 1-2 2h-3" />
      <path d="m9 15 6-6M10 9h5v5" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
      aria-hidden="true"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function ChevronIcon({
  direction,
}: {
  direction: "left" | "right";
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
      aria-hidden="true"
    >
      {direction === "left" ? (
        <path d="m15 18-6-6 6-6" />
      ) : (
        <path d="m9 18 6-6-6-6" />
      )}
    </svg>
  );
}

/* ==========================================
   GALLERY COMPONENT
========================================== */

export function GalleryGrid({
  items,
}: {
  items: GallerySummary[];
}) {
  const [activeIndex, setActiveIndex] =
    useState<number | null>(null);

  const reducedMotion = !!useReducedMotion();

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRefs = useRef<
    Array<HTMLButtonElement | null>
  >([]);

  const lastTriggerIndexRef = useRef<number | null>(
    null
  );

  const isOpen = activeIndex !== null;

  const active =
    activeIndex !== null
      ? items[activeIndex] ?? null
      : null;

  /* ======================================
     OPEN / CLOSE / NAVIGATION
  ====================================== */

  const openPhoto = (index: number) => {
    lastTriggerIndexRef.current = index;
    setActiveIndex(index);
  };

  const closePhoto = () => {
    setActiveIndex(null);
  };

  const previousPhoto = () => {
    setActiveIndex((current) => {
      if (current === null || items.length === 0) {
        return current;
      }

      return (current - 1 + items.length) % items.length;
    });
  };

  const nextPhoto = () => {
    setActiveIndex((current) => {
      if (current === null || items.length === 0) {
        return current;
      }

      return (current + 1) % items.length;
    });
  };

  /* ======================================
     SCROLL LOCK + KEYBOARD CONTROLS

     Escape closes.
     Arrow keys change images.
     Tab stays inside the modal.
     Focus returns to selected gallery item.
  ====================================== */

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    const previouslyFocused =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    document.body.style.overflow = "hidden";

    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setActiveIndex(null);
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();

        setActiveIndex((current) =>
          current === null
            ? current
            : (current - 1 + items.length) %
              items.length
        );

        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();

        setActiveIndex((current) =>
          current === null
            ? current
            : (current + 1) % items.length
        );

        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusableElements =
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
        );

      if (
        !focusableElements ||
        focusableElements.length === 0
      ) {
        event.preventDefault();
        return;
      }

      const first = focusableElements[0];
      const last =
        focusableElements[focusableElements.length - 1];

      if (
        event.shiftKey &&
        document.activeElement === first
      ) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === last
      ) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      const triggerIndex =
        lastTriggerIndexRef.current;

      if (triggerIndex !== null) {
        (
          triggerRefs.current[triggerIndex] ??
          previouslyFocused
        )?.focus();
      } else {
        previouslyFocused?.focus();
      }
    };
  }, [isOpen, items.length]);

  /* ======================================
     RENDER
  ====================================== */

  return (
    <>
      {/* ANIMATED PHOTO GRID */}
      <motion.div
        variants={gridVariants}
        initial={reducedMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.06,
        }}
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4"
      >
        {items.map((item, index) => (
          <motion.div
            key={String(item._id)}
            variants={photoVariants}
            className="min-w-0"
          >
            <motion.button
              ref={(node) => {
                triggerRefs.current[index] = node;
              }}
              type="button"
              onClick={() => openPhoto(index)}
              whileHover={
                reducedMotion
                  ? undefined
                  : { y: -4 }
              }
              transition={{
                duration: 0.25,
                ease: EASE,
              }}
              aria-label={`View ${item.title}`}
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-xl border border-brand-border bg-white text-left shadow-[0_5px_20px_rgba(5,7,9,0.04)] transition-[border-color,box-shadow] duration-300 hover:border-brand-primary/40 hover:shadow-[0_15px_36px_rgba(5,7,9,0.12)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand-primary"
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 25vw"
                className={`object-cover transition-transform duration-500 ${
                  reducedMotion
                    ? ""
                    : "group-hover:scale-[1.06]"
                }`}
              />

              {/* Image contrast layer */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent opacity-75 transition-opacity duration-300 group-hover:opacity-100"
              />

              {/* Red accent */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-brand-primary transition-transform duration-300 group-hover:scale-x-100"
              />

              {/* Expand icon */}
              <span className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-lg border border-white/30 bg-black/30 text-white backdrop-blur-sm transition-colors duration-300 group-hover:bg-brand-primary">
                <ExpandIcon />
              </span>

              {/* Title */}
              <span className="absolute bottom-0 left-0 right-0 p-3 text-[11px] font-semibold leading-[1.5] text-white sm:p-4 sm:text-[12px]">
                <span className="line-clamp-2">
                  {item.title}
                </span>
              </span>
            </motion.button>
          </motion.div>
        ))}
      </motion.div>

      {/* FULLSCREEN LIGHTBOX */}
      <AnimatePresence>
        {active && activeIndex !== null && (
          <motion.div
            key="gallery-lightbox"
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`Gallery image: ${active.title}`}
            initial={
              reducedMotion
                ? false
                : { opacity: 0 }
            }
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: reducedMotion ? 0 : 0.22,
            }}
            onMouseDown={(event) => {
              if (
                event.target === event.currentTarget
              ) {
                closePhoto();
              }
            }}
            className="fixed inset-0 z-[100] flex flex-col bg-[#08090D]/95 text-white backdrop-blur-md"
          >
            {/* TOP BAR */}
            <div className="relative z-20 flex shrink-0 items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-6">
              <div className="min-w-0">
                <p className="font-heading text-[10px] font-bold uppercase tracking-[0.13em] text-[#FFBFC2]">
                  Bangladesh Buildcon Gallery
                </p>

                <p className="mt-1 font-heading text-[12px] font-bold tabular-nums text-white/80">
                  {activeIndex + 1} / {items.length}
                </p>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={closePhoto}
                aria-label="Close gallery image"
                className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white transition-colors hover:border-brand-primary hover:bg-brand-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <CloseIcon />
              </button>
            </div>

            {/* IMAGE + CONTROLS */}
            <div className="relative flex min-h-0 flex-1 items-center justify-center px-12 py-5 sm:px-20 sm:py-8">
              <button
                type="button"
                onClick={previousPhoto}
                disabled={items.length <= 1}
                aria-label="Previous gallery image"
                className="absolute left-2 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white transition-colors hover:border-brand-primary hover:bg-brand-primary focus-visible:outline-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-30 sm:left-5 sm:size-12"
              >
                <ChevronIcon direction="left" />
              </button>

              <AnimatePresence mode="wait">
                <motion.div
                  key={String(active._id)}
                  initial={
                    reducedMotion
                      ? false
                      : { opacity: 0, scale: 0.985 }
                  }
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  transition={{
                    duration: reducedMotion
                      ? 0
                      : 0.24,
                    ease: EASE,
                  }}
                  className="relative h-full w-full max-w-6xl"
                >
                  <Image
                    src={active.imageUrl}
                    alt={active.title}
                    fill
                    sizes="100vw"
                    className="object-contain"
                  />
                </motion.div>
              </AnimatePresence>

              <button
                type="button"
                onClick={nextPhoto}
                disabled={items.length <= 1}
                aria-label="Next gallery image"
                className="absolute right-2 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white transition-colors hover:border-brand-primary hover:bg-brand-primary focus-visible:outline-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-30 sm:right-5 sm:size-12"
              >
                <ChevronIcon direction="right" />
              </button>
            </div>

            {/* CAPTION */}
            <div className="relative z-20 shrink-0 border-t border-white/10 bg-black/20 px-4 py-4 text-center sm:px-6">
              <h3 className="mx-auto max-w-3xl font-heading text-[13px] font-bold leading-[1.6] text-white sm:text-[15px]">
                {active.title}
              </h3>

              <p className="mt-1 hidden text-[11px] text-white/55 sm:block">
                Use left and right arrow keys to browse,
                or Escape to close.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
