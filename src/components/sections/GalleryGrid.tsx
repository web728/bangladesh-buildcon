"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type TouchEvent,
} from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { OptimizedGalleryItem } from "@/lib/data/optimized-gallery";

// Show only one small batch of photos initially. More appear automatically
// as the visitor scrolls, without navigation or a page reload.
const BATCH_SIZE = 24;
const EASE = [0.22, 1, 0.36, 1] as const;

type GalleryGridProps = { items: OptimizedGalleryItem[] };

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" className="size-5 sm:size-6" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"
      strokeLinecap="round" strokeLinejoin="round" className="size-5 sm:size-6" aria-hidden="true">
      {direction === "left" ? <path d="m15 18-6-6 6-6" /> : <path d="m9 18 6-6-6-6" />}
    </svg>
  );
}

export function GalleryGrid({ items }: GalleryGridProps) {
  const reducedMotion = !!useReducedMotion();
  const [visibleCount, setVisibleCount] = useState(() => Math.min(BATCH_SIZE, items.length));
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [portalReady, setPortalReady] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Portal must only be rendered in browser.
    setPortalReady(true);
  }, []);

  const total = items.length;
  const numberVisible = Math.min(visibleCount, total);
  const hasMore = numberVisible < total;
  const visibleItems = items.slice(0, numberVisible);
  const isOpen = activeIndex !== null && activeIndex >= 0 && activeIndex < total;
  const active = isOpen && activeIndex !== null ? items[activeIndex] : null;

  const loadMore = useCallback(() => {
    setVisibleCount((current) => Math.min(current + BATCH_SIZE, total));
  }, [total]);

  useEffect(() => {
    if (!hasMore || typeof IntersectionObserver === "undefined") return;
    const target = loadMoreRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) loadMore();
      },
      { rootMargin: "500px 0px", threshold: 0 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [hasMore, loadMore, numberVisible]);

  const openPhoto = useCallback((index: number, button: HTMLButtonElement) => {
    if (index < 0 || index >= total) return;
    openerRef.current = button;
    setActiveIndex(index);
  }, [total]);

  const closePhoto = useCallback(() => setActiveIndex(null), []);
  const previousPhoto = useCallback(() => {
    setActiveIndex((current) =>
      current === null || total <= 1 ? current : (current - 1 + total) % total,
    );
  }, [total]);
  const nextPhoto = useCallback(() => {
    setActiveIndex((current) =>
      current === null || total <= 1 ? current : (current + 1) % total,
    );
  }, [total]);

  // Preserve original modal behavior: focus trap, Esc/arrow keys and scroll lock.
  useEffect(() => {
    if (!isOpen) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousFocus = document.activeElement instanceof HTMLElement
      ? document.activeElement : null;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    const frame = requestAnimationFrame(() => closeButtonRef.current?.focus());

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closePhoto();
        return;
      }
      if (event.key === "ArrowLeft" && total > 1) {
        event.preventDefault();
        previousPhoto();
        return;
      }
      if (event.key === "ArrowRight" && total > 1) {
        event.preventDefault();
        nextPhoto();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = dialogRef.current?.querySelectorAll<HTMLButtonElement>(
        'button:not([disabled])',
      );
      if (!focusable?.length) {
        event.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      } else if (!dialogRef.current?.contains(document.activeElement)) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.removeEventListener("keydown", onKeyDown);
      (openerRef.current ?? previousFocus)?.focus();
    };
  }, [isOpen, total, closePhoto, previousPhoto, nextPhoto]);

  function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
    const touch = event.touches[0];
    touchStart.current = touch ? { x: touch.clientX, y: touch.clientY } : null;
  }

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
    const start = touchStart.current;
    touchStart.current = null;
    const end = event.changedTouches[0];
    if (!start || !end || total <= 1) return;
    const dx = end.clientX - start.x;
    const dy = end.clientY - start.y;
    if (Math.abs(dx) < 55 || Math.abs(dx) <= Math.abs(dy)) return;
    if (dx < 0) nextPhoto();
    else previousPhoto();
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {visibleItems.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={(event) => openPhoto(index, event.currentTarget)}
            aria-label={`Open gallery image: ${item.title}`}
            className="group relative block aspect-[4/3] w-full min-w-0 overflow-hidden rounded-xl border border-[#E8E4EA] bg-[#F8F8FA] shadow-[0_4px_16px_rgba(5,7,9,0.035)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-[0_12px_30px_rgba(5,7,9,0.09)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand-primary motion-reduce:transform-none"
          >
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              loading="lazy"
              quality={75}
              sizes="(max-width: 639px) 48vw, (max-width: 1023px) 31vw, 23vw"
              className="object-contain object-center transition-transform duration-500 group-hover:scale-[1.025] motion-reduce:transform-none"
            />
          </button>
        ))}
      </div>

      {hasMore && (
        <div ref={loadMoreRef} className="flex flex-col items-center gap-3 py-9">
          <p className="text-xs font-medium tabular-nums text-brand-body" aria-live="polite">
            Showing {numberVisible} of {total} photographs
          </p>
          <button
            type="button"
            onClick={loadMore}
            className="rounded-xl border border-brand-border bg-white px-6 py-3 text-sm font-bold text-brand-dark shadow-sm transition-colors hover:border-brand-primary hover:text-brand-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
          >
            Load more photos
          </button>
        </div>
      )}
     

      {portalReady && createPortal(
        <AnimatePresence>
          {active && activeIndex !== null && (
            <motion.div
              key="gallery-lightbox"
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label="Gallery image viewer"
              initial={reducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.2 }}
              className="fixed inset-0 z-[99999] isolate flex flex-col overflow-hidden bg-[#09090D] text-white"
              style={{ height: "100dvh" }}
            >
              <div className="relative z-30 flex h-[64px] shrink-0 items-center justify-between border-b border-white/10 bg-[#111116] px-4 sm:h-[72px] sm:px-7">
              
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={closePhoto}
                  aria-label="Close image viewer"
                  title="Close (Esc)"
                  className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white transition-[background-color,border-color,transform] duration-200 hover:rotate-90 hover:border-brand-primary hover:bg-brand-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transform-none"
                >
                  <CloseIcon />
                </button>
              </div>

              <div
                className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-3 py-3 sm:px-[76px] sm:py-5 lg:px-[92px]"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={active.id}
                    initial={reducedMotion ? false : { opacity: 0, scale: 0.975 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.985 }}
                    transition={{ duration: reducedMotion ? 0 : 0.24, ease: EASE }}
                    className="relative h-full w-full max-w-[1500px]"
                  >
                    {/* Already compressed by Sharp. Only load the full file on click. */}
                    <Image
                      src={active.imageUrl}
                      alt={active.title}
                      fill
                      unoptimized
                      loading="eager"
                      sizes="100vw"
                      className="object-contain object-center"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="relative z-30 flex h-[68px] shrink-0 items-center justify-between gap-4 border-t border-white/10 bg-[#111116] px-4 sm:h-[76px] sm:px-7">
                <button
                  type="button"
                  onClick={previousPhoto}
                  disabled={total <= 1}
                  aria-label="Previous gallery image"
                  className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/[0.06] text-white transition-colors duration-200 hover:border-brand-primary hover:bg-brand-primary focus-visible:outline-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ChevronIcon direction="left" />
                </button>
                <p className="min-w-0 flex-1 truncate text-center font-heading text-xs font-semibold text-white/75 sm:text-[13px]">
                  {active.title}
                </p>
                <button
                  type="button"
                  onClick={nextPhoto}
                  disabled={total <= 1}
                  aria-label="Next gallery image"
                  className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/[0.06] text-white transition-colors duration-200 hover:border-brand-primary hover:bg-brand-primary focus-visible:outline-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ChevronIcon direction="right" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}
