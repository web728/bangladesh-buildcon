
"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import Image from "next/image";
import { createPortal } from "react-dom";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import type { GallerySummary } from "@/lib/data/gallery";

/* ==========================================
   CONFIG
========================================== */

const EASE = [0.22, 1, 0.36, 1] as const;

const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.04,
    },
  },
};

const imageVariants: Variants = {
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

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5 sm:size-6"
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
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5 sm:size-6"
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
   GALLERY
========================================== */

interface GalleryGridProps {
  items: GallerySummary[];
}

export function GalleryGrid({
  items,
}: GalleryGridProps) {
  const reducedMotion = !!useReducedMotion();

  const [mounted, setMounted] = useState(false);

  const [activeIndex, setActiveIndex] =
    useState<number | null>(null);

  const closeButtonRef =
    useRef<HTMLButtonElement>(null);

  const dialogRef =
    useRef<HTMLDivElement>(null);

  const triggerRefs = useRef<
    Array<HTMLButtonElement | null>
  >([]);

  const lastTriggerRef =
    useRef<number | null>(null);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const isOpen =
    activeIndex !== null &&
    activeIndex >= 0 &&
    activeIndex < items.length;

  const active =
    isOpen && activeIndex !== null
      ? items[activeIndex]
      : null;

  /* ======================================
     PORTAL MOUNT
  ====================================== */

  useEffect(() => {
    setMounted(true);
  }, []);

  /* ======================================
     OPEN / CLOSE
  ====================================== */

  const openPhoto = useCallback(
    (index: number) => {
      if (index < 0 || index >= items.length) {
        return;
      }

      lastTriggerRef.current = index;
      setActiveIndex(index);
    },
    [items.length]
  );

  const closePhoto = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const previousPhoto = useCallback(() => {
    setActiveIndex((current) => {
      if (
        current === null ||
        items.length <= 1
      ) {
        return current;
      }

      return (
        (current - 1 + items.length) %
        items.length
      );
    });
  }, [items.length]);

  const nextPhoto = useCallback(() => {
    setActiveIndex((current) => {
      if (
        current === null ||
        items.length <= 1
      ) {
        return current;
      }

      return (current + 1) % items.length;
    });
  }, [items.length]);

  /* ======================================
     SCROLL LOCK / FOCUS / KEYBOARD
  ====================================== */

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousBodyOverflow =
      document.body.style.overflow;

    const previousHtmlOverflow =
      document.documentElement.style.overflow;

    const previousFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow =
      "hidden";

    // Focus the close button once the modal appears.
    const focusFrame = window.requestAnimationFrame(
      () => {
        closeButtonRef.current?.focus();
      }
    );

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closePhoto();
        return;
      }

      if (
        event.key === "ArrowLeft" &&
        items.length > 1
      ) {
        event.preventDefault();
        previousPhoto();
        return;
      }

      if (
        event.key === "ArrowRight" &&
        items.length > 1
      ) {
        event.preventDefault();
        nextPhoto();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusable =
        dialogRef.current?.querySelectorAll<
          HTMLButtonElement
        >(
          'button:not([disabled])'
        );

      if (!focusable || focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

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
      } else if (
        !dialogRef.current?.contains(
          document.activeElement
        )
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
      window.cancelAnimationFrame(focusFrame);

      document.body.style.overflow =
        previousBodyOverflow;

      document.documentElement.style.overflow =
        previousHtmlOverflow;

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      const index = lastTriggerRef.current;

      const target =
        index !== null
          ? triggerRefs.current[index]
          : null;

      (target ?? previousFocus)?.focus();
    };
  }, [
    isOpen,
    items.length,
    closePhoto,
    previousPhoto,
    nextPhoto,
  ]);

  /* ======================================
     HANDLE CHANGED DATA
  ====================================== */

  useEffect(() => {
    if (
      activeIndex !== null &&
      activeIndex >= items.length
    ) {
      setActiveIndex(null);
    }
  }, [activeIndex, items.length]);

  /* ======================================
     TOUCH SWIPE
  ====================================== */

  const handleTouchStart = (
    event: React.TouchEvent<HTMLDivElement>
  ) => {
    touchStartX.current =
      event.touches[0]?.clientX ?? null;

    touchStartY.current =
      event.touches[0]?.clientY ?? null;
  };

  const handleTouchEnd = (
    event: React.TouchEvent<HTMLDivElement>
  ) => {
    if (
      touchStartX.current === null ||
      touchStartY.current === null ||
      items.length <= 1
    ) {
      return;
    }

    const endX =
      event.changedTouches[0]?.clientX;

    const endY =
      event.changedTouches[0]?.clientY;

    if (
      endX === undefined ||
      endY === undefined
    ) {
      return;
    }

    const deltaX =
      endX - touchStartX.current;

    const deltaY =
      endY - touchStartY.current;

    touchStartX.current = null;
    touchStartY.current = null;

    // Ignore vertical gestures and small movements.
    if (
      Math.abs(deltaX) < 55 ||
      Math.abs(deltaX) <= Math.abs(deltaY)
    ) {
      return;
    }

    if (deltaX < 0) {
      nextPhoto();
    } else {
      previousPhoto();
    }
  };

  /* ======================================
     FULLSCREEN LIGHTBOX

     Rendered into document.body so navbar
     stacking contexts cannot hide it.
  ====================================== */

  const lightbox = (
    <AnimatePresence>
      {active && activeIndex !== null && (
        <motion.div
          key="gallery-lightbox"
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image viewer"
          initial={
            reducedMotion
              ? false
              : { opacity: 0 }
          }
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: reducedMotion ? 0 : 0.2,
          }}
          className="
            fixed inset-0
            z-[99999]
            isolate flex flex-col
            overflow-hidden
            bg-[#09090D]
            text-white
          "
          style={{
            height: "100dvh",
          }}
        >
          {/* ===================================
              CLOSE + COUNTER BAR

              Separate from photo, not overlay.
          ==================================== */}

          <div
            className="
              relative z-30
              flex h-[64px] shrink-0
              items-center justify-between
              border-b border-white/10
              bg-[#111116]
              px-4
              sm:h-[72px] sm:px-7
            "
          >
            <span
              aria-live="polite"
              className="
                font-heading text-[12px]
                font-semibold tabular-nums
                tracking-[0.04em]
                text-white/70
              "
            >
              <span className="font-bold text-white">
                {String(activeIndex + 1).padStart(
                  2,
                  "0"
                )}
              </span>
              {" / "}
              {String(items.length).padStart(2, "0")}
            </span>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={closePhoto}
              aria-label="Close image viewer"
              title="Close (Esc)"
              className="
                inline-flex size-11
                shrink-0 items-center
                justify-center rounded-xl
                border border-white/20
                bg-white/10 text-white
                transition-[background-color,border-color,transform]
                duration-200
                hover:rotate-90
                hover:border-brand-primary
                hover:bg-brand-primary
                focus-visible:outline-2
                focus-visible:outline-offset-2
                focus-visible:outline-white
                motion-reduce:transform-none
              "
            >
              <CloseIcon />
            </button>
          </div>

          {/* ===================================
              IMAGE VIEWER

              Image entirely visible using
              object-contain. No overlay,
              watermark, label or gradient.
          ==================================== */}

          <div
            className="
              relative flex min-h-0 flex-1
              items-center justify-center
              overflow-hidden
              px-3 py-3
              sm:px-[76px] sm:py-5
              lg:px-[92px]
            "
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence
              mode="wait"
              initial={false}
            >
              <motion.div
                key={String(active._id)}
                initial={
                  reducedMotion
                    ? false
                    : {
                        opacity: 0,
                        scale: 0.975,
                      }
                }
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.985,
                }}
                transition={{
                  duration: reducedMotion
                    ? 0
                    : 0.24,
                  ease: EASE,
                }}
                className="
                  relative h-full w-full
                  max-w-[1500px]
                "
              >
                <Image
                  src={active.imageUrl}
                  alt={active.title}
                  fill
                  priority
                  sizes="100vw"
                  className="
                    object-contain
                    object-center
                  "
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ===================================
              SEPARATE BOTTOM CONTROLS

              Not covering photo.
          ==================================== */}

          <div
            className="
              relative z-30 flex h-[68px]
              shrink-0 items-center
              justify-between gap-4
              border-t border-white/10
              bg-[#111116]
              px-4 sm:h-[76px] sm:px-7
            "
          >
            <button
              type="button"
              onClick={previousPhoto}
              disabled={items.length <= 1}
              aria-label="Previous gallery image"
              className="
                flex size-11 shrink-0
                items-center justify-center
                rounded-xl border
                border-white/20
                bg-white/[0.06]
                text-white
                transition-colors duration-200
                hover:border-brand-primary
                hover:bg-brand-primary
                focus-visible:outline-2
                focus-visible:outline-white
                disabled:cursor-not-allowed
                disabled:opacity-30
              "
            >
              <ChevronIcon direction="left" />
            </button>

            <div className="min-w-0 flex-1 text-center">
              <p className="truncate font-heading text-[11px] font-semibold text-white/75 sm:text-[13px]">
                {active.title}
              </p>
            </div>

            <button
              type="button"
              onClick={nextPhoto}
              disabled={items.length <= 1}
              aria-label="Next gallery image"
              className="
                flex size-11 shrink-0
                items-center justify-center
                rounded-xl border
                border-white/20
                bg-white/[0.06]
                text-white
                transition-colors duration-200
                hover:border-brand-primary
                hover:bg-brand-primary
                focus-visible:outline-2
                focus-visible:outline-white
                disabled:cursor-not-allowed
                disabled:opacity-30
              "
            >
              <ChevronIcon direction="right" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  /* ======================================
     GALLERY THUMBNAILS

     Pure images.
     No title overlays.
     No gradients.
     No badges on photo.
  ====================================== */

  return (
    <>
      {items.length > 0 ? (
        <motion.div
          variants={gridVariants}
          initial={
            reducedMotion ? false : "hidden"
          }
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.06,
          }}
          className="
            grid grid-cols-2
            gap-3
            sm:grid-cols-3 sm:gap-4
            lg:grid-cols-4
          "
        >
          {items.map((item, index) => (
            <motion.div
              key={String(item._id)}
              variants={imageVariants}
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
                  duration: reducedMotion
                    ? 0
                    : 0.25,
                  ease: EASE,
                }}
                aria-label={`Open gallery image: ${item.title}`}
                className="
                  group relative block
                  aspect-[4/3] w-full
                  overflow-hidden rounded-xl
                  border border-[#E8E4EA]
                  bg-[#F8F8FA]
                  shadow-[0_4px_16px_rgba(5,7,9,0.035)]
                  transition-[border-color,box-shadow]
                  duration-300
                  hover:border-brand-primary/40
                  hover:shadow-[0_12px_30px_rgba(5,7,9,0.09)]
                  focus-visible:outline-2
                  focus-visible:outline-offset-3
                  focus-visible:outline-brand-primary
                "
              >
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 25vw"
                  className="
                    object-contain object-center
                    transition-transform duration-500
                    group-hover:scale-[1.025]
                    motion-reduce:transform-none
                  "
                />
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="rounded-xl border border-[#E8E4EA] bg-white px-5 py-12 text-center">
          <p className="font-heading text-[14px] font-semibold text-[#746D78]">
            Gallery photos will appear here when
            published.
          </p>
        </div>
      )}

      {/* Portal prevents sticky header overlap */}
      {mounted &&
        createPortal(
          lightbox,
          document.body
        )}
    </>
  );
}
