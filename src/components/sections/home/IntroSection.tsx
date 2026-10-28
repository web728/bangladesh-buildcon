"use client";

import { useRef, type PointerEvent } from "react";
import Link from "next/link";

import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";

import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";

const EASE = [0.22, 1, 0.36, 1] as const;

/* --------------------------------------------------
   SCROLL ANIMATION VARIANTS
-------------------------------------------------- */

const staggerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.06,
    },
  },
};

const revealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: EASE,
    },
  },
};

/* --------------------------------------------------
   ICONS
-------------------------------------------------- */

function ArrowIcon({
  diagonal = false,
}: {
  diagonal?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4 shrink-0"
      aria-hidden="true"
    >
      {diagonal ? (
        <path d="M7 17 17 7M8 7h9v9" />
      ) : (
        <path d="M5 12h14m-6-6 6 6-6 6" />
      )}
    </svg>
  );
}

function NetworkingIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-7"
      aria-hidden="true"
    >
      <circle cx="24" cy="13" r="5" />
      <circle cx="10" cy="32" r="4" />
      <circle cx="38" cy="32" r="4" />
      <path d="M20 17L12 28M28 17L36 28M14 32H34" />
      <path d="M16 43H4v-3a6 6 0 0 1 12 0v3Z" />
      <path d="M44 43H32v-3a6 6 0 0 1 12 0v3Z" />
      <path d="M16 26a8 8 0 0 1 16 0" />
    </svg>
  );
}

function GrowthIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-7"
      aria-hidden="true"
    >
      <path d="M7 39V9M7 39h35" />
      <path d="m13 31 10-10 7 6 12-15" />
      <path d="M32 12h10v10" />
    </svg>
  );
}

/* --------------------------------------------------
   PREMIUM 3D QUOTE CARD
-------------------------------------------------- */

function QuoteCard({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 170,
    damping: 24,
    mass: 0.7,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 170,
    damping: 24,
    mass: 0.7,
  });

  const rotateX = useTransform(
    smoothY,
    [-0.5, 0.5],
    [5, -5]
  );

  const rotateY = useTransform(
    smoothX,
    [-0.5, 0.5],
    [-6, 6]
  );

  const glowX = useTransform(
    smoothX,
    [-0.5, 0.5],
    [15, 85]
  );

  const glowY = useTransform(
    smoothY,
    [-0.5, 0.5],
    [15, 85]
  );

  const glowBackground = useTransform(
    [glowX, glowY],
    (values) => {
      const [x, y] = values as number[];

      return `radial-gradient(circle at ${x}% ${y}%, rgba(186,29,130,0.26), transparent 55%)`;
    }
  );

  function handlePointerMove(
    e: PointerEvent<HTMLDivElement>
  ) {
    if (reducedMotion || e.pointerType !== "mouse") {
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();

    const x =
      (e.clientX - rect.left) / rect.width - 0.5;

    const y =
      (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  }

  function handlePointerLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <div
      className="h-full"
      style={{ perspective: "1100px" }}
    >
      <motion.div
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{
          rotateX: reducedMotion ? 0 : rotateX,
          rotateY: reducedMotion ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={
          reducedMotion
            ? undefined
            : {
                scale: 1.015,
                boxShadow:
                  "0 28px 65px rgba(5,7,9,0.22)",
              }
        }
        transition={{
          duration: 0.3,
          ease: EASE,
        }}
        className="group relative flex h-full min-h-[310px] flex-col justify-between rounded-2xl bg-brand-dark p-7 text-white shadow-[0_12px_35px_rgba(5,7,9,0.12)] sm:p-9 lg:p-10"
      >
        {/* Clipped glow and rings */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
          <motion.div
            aria-hidden="true"
            style={{ background: glowBackground }}
            className="absolute inset-0 opacity-40 transition-opacity duration-500 group-hover:opacity-100"
          />

          <div
            aria-hidden="true"
            className="absolute -bottom-28 -right-24"
          >
            <motion.div
              className="relative size-72 rounded-full border border-brand-primary/25"
              animate={
                reducedMotion
                  ? undefined
                  : { rotate: 360 }
              }
              transition={{
                duration: 35,
                ease: "linear",
                repeat: Infinity,
              }}
            >
              <div className="absolute inset-8 rounded-full border border-white/10" />
              <div className="absolute inset-16 rounded-full border border-brand-primary/25" />
            </motion.div>
          </div>
        </div>

        {/* Text layer */}
        <div
          className="relative z-10"
          style={{
            transform: reducedMotion
              ? undefined
              : "translateZ(30px)",
          }}
        >
          <motion.div
            aria-hidden="true"
            className="mb-7 h-[3px] w-14 origin-left bg-brand-primary"
            initial={
              reducedMotion
                ? false
                : { scaleX: 0 }
            }
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.9,
              ease: EASE,
            }}
          />

          <svg
            viewBox="0 0 36 28"
            fill="currentColor"
            className="mb-5 h-8 w-10 text-brand-primary"
            aria-hidden="true"
          >
            <path d="M0 28V14C0 5 6 0 15 0v6c-5 0-7 3-7 8h7v14H0Zm20 0V14C20 5 26 0 35 0v6c-5 0-7 3-7 8h7v14H20Z" />
          </svg>

          <motion.p
            initial={
              reducedMotion
                ? false
                : { opacity: 0, y: 20 }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.85,
              delay: 0.2,
              ease: EASE,
            }}
            className="max-w-md font-heading text-[clamp(1.15rem,2vw,1.55rem)] font-semibold leading-[1.55] tracking-[-0.025em] text-white"
          >
            Connecting manufacturers and suppliers
            with professional buyers, contractors,
            and project leaders across Bangladesh.
          </motion.p>
        </div>

        {/* Location */}
        <motion.p
          initial={
            reducedMotion
              ? false
              : { opacity: 0, y: 10 }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.65,
            delay: 0.35,
            ease: EASE,
          }}
          className="relative z-10 mt-9 border-t border-white/15 pt-5 text-xs font-semibold tracking-wide text-white/60"
          style={{
            transform: reducedMotion
              ? undefined
              : "translateZ(20px)",
          }}
        >
          {event.venue.city}, {event.venue.country}
        </motion.p>

        {/* Bottom hover accent */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 rounded-b-2xl bg-brand-primary transition-transform duration-500 group-hover:scale-x-100"
        />
      </motion.div>
    </div>
  );
}

/* --------------------------------------------------
   PREMIUM FEATURE CARD
-------------------------------------------------- */

function FeatureCard({
  title,
  description,
  icon,
  reducedMotion,
}: {
  title: string;
  description: string;
  icon: "network" | "growth";
  reducedMotion: boolean;
}) {
  return (
    <motion.div
      initial="rest"
      whileHover={
        reducedMotion ? undefined : "hover"
      }
      variants={{
        rest: {
          y: 0,
          scale: 1,
          boxShadow:
            "0 4px 16px rgba(5,7,9,0.02)",
        },
        hover: {
          y: -7,
          scale: 1.015,
          boxShadow:
            "0 20px 45px rgba(5,7,9,0.10)",
        },
      }}
      transition={{
        duration: 0.35,
        ease: EASE,
      }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-brand-dark/10 bg-[#FAFAFC] p-5 transition-colors duration-300 hover:border-brand-primary/35 hover:bg-white sm:p-6"
    >
      <motion.div
        aria-hidden="true"
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: 1 },
        }}
        transition={{ duration: 0.35 }}
        className="pointer-events-none absolute -right-12 -top-16 size-44 rounded-full bg-brand-primary/10 blur-3xl"
      />

      <div className="relative z-10 flex items-start justify-between">
        <motion.div
          variants={{
            rest: {
              rotate: 0,
              scale: 1,
              backgroundColor:
                "rgba(186,29,130,0.09)",
              color: "#BA1D82",
            },
          hover: {
  rotate: 0,
  scale: 1.08,
  backgroundColor: "#BA1D82",
  color: "#FFFFFF",
},
          }}
          transition={{
            duration: 0.35,
            ease: EASE,
          }}
          className="flex size-12 items-center justify-center rounded-xl"
        >
          {icon === "network" ? (
            <NetworkingIcon />
          ) : (
            <GrowthIcon />
          )}
        </motion.div>

        <motion.div
          aria-hidden="true"
          variants={{
            rest: {
              opacity: 0.3,
              x: 0,
              y: 0,
            },
            hover: {
              opacity: 1,
              x: 4,
              y: -4,
            },
          }}
          className="text-brand-primary"
        >
          <ArrowIcon diagonal />
        </motion.div>
      </div>

      <div className="relative z-10 mt-5">
        <h3 className="font-heading text-[15px] font-bold tracking-tight text-brand-dark sm:text-base">
          {title}
        </h3>

        <p className="mt-2 text-[12px] leading-[1.8] text-[#69717E] sm:text-[13px]">
          {description}
        </p>
      </div>

      <motion.div
        aria-hidden="true"
        variants={{
          rest: { scaleX: 0.15 },
          hover: { scaleX: 1 },
        }}
        transition={{
          duration: 0.5,
          ease: EASE,
        }}
        className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-brand-primary"
      />
    </motion.div>
  );
}

/* --------------------------------------------------
   SCROLL ANIMATED HEADING
-------------------------------------------------- */

function IntroHeading({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  const headingRef = useRef<HTMLDivElement>(null);

  const inView = useInView(headingRef, {
    once: true,
    amount: 0.3,
  });

  return (
    <motion.div
      ref={headingRef}
      variants={staggerVariants}
      initial={reducedMotion ? false : "hidden"}
      animate={
        reducedMotion || inView
          ? "visible"
          : "hidden"
      }
      className="mb-9 max-w-3xl lg:mb-12"
    >
      <motion.div
        variants={revealVariants}
        className="mb-4 flex items-center gap-3"
      >
        <span className="h-[2px] w-9 bg-brand-primary" />

        <span className="font-heading text-[11px] font-bold uppercase tracking-[0.17em] text-brand-primary">
          Official B2B Gateway
        </span>
      </motion.div>

      <h2
        id="intro-heading"
        className="font-heading text-[clamp(1.9rem,3.2vw,2.8rem)] leading-[1.18] font-extrabold tracking-[-0.045em] text-brand-dark"
      >
        <motion.span
          variants={revealVariants}
          className="block"
        >
          Where South Asia&apos;s
        </motion.span>

        <motion.span
          variants={revealVariants}
          className="block text-brand-primary"
        >
          Building &amp; Construction
        </motion.span>

        <motion.span
          variants={revealVariants}
          className="block"
        >
          Industry Meets
        </motion.span>
      </h2>
    </motion.div>
  );
}

/* --------------------------------------------------
   MAIN INTRO SECTION
-------------------------------------------------- */

export function IntroSection() {
  const reducedMotion = !!useReducedMotion();

  return (
    <section
      aria-labelledby="intro-heading"
      className="relative isolate overflow-hidden bg-white py-16 text-brand-dark sm:py-20 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_95%_10%,rgba(186,29,130,0.04),transparent_45%)]"
      />

      <Container className="relative z-10">
        <IntroHeading reducedMotion={reducedMotion} />

        <motion.div
          variants={staggerVariants}
          initial={reducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.12,
          }}
          className="grid items-stretch gap-7 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12"
        >
          {/* LEFT: PREMIUM 3D QUOTE CARD */}
          <motion.div variants={revealVariants}>
            <QuoteCard reducedMotion={reducedMotion} />
          </motion.div>

          {/* RIGHT CONTENT */}
          <motion.div
            variants={revealVariants}
            className="flex min-w-0 flex-col justify-between"
          >
            <div className="space-y-4">
              <motion.p
                initial={
                  reducedMotion
                    ? false
                    : { opacity: 0, y: 18 }
                }
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  ease: EASE,
                }}
                className="text-[14px] leading-[1.85] text-[#555D6C] sm:text-[15px]"
              >
                <strong className="font-bold text-brand-dark">
                  {event.name}
                </strong>{" "}
                brings international and local suppliers
                together with contractors, developers,
                specifiers, building & construction industry
                decision-makers.
              </motion.p>

              <motion.p
                initial={
                  reducedMotion
                    ? false
                    : { opacity: 0, y: 18 }
                }
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: 0.12,
                  ease: EASE,
                }}
                className="text-[14px] leading-[1.85] text-[#555D6C] sm:text-[15px]"
              >
                Scheduled from{" "}
                <span className="font-semibold text-brand-dark">
                  {event.dates.display}
                </span>{" "}
                at{" "}
                <span className="font-semibold text-brand-dark">
                  {event.venue.fullLocation}
                </span>
                , the expo supports product discovery,
                supplier meetings, and direct business
                conversations.
              </motion.p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <FeatureCard
                title="Targeted Networking"
                description="The previous edition welcomed more than 7,000 trade visitors."
                icon="network"
                reducedMotion={reducedMotion}
              />

              <FeatureCard
                title="Market Expansion"
                description="Expand footprint across Bangladesh's fast-growing building & construction sector."
                icon="growth"
                reducedMotion={reducedMotion}
              />
            </div>

            <motion.div
              initial={
                reducedMotion
                  ? false
                  : { opacity: 0, y: 20 }
              }
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: 0.2,
                ease: EASE,
              }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link
                href="/about"
                className="group inline-flex min-h-11 items-center justify-center gap-3 rounded-lg bg-brand-primary px-6 py-3 font-heading text-[13px] font-bold text-white shadow-[0_10px_26px_rgba(186,29,130,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
              >
                Explore Event Details
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowIcon diagonal />
                </span>
              </Link>

              <Link
                href={event.cta.bookStand}
                className="group inline-flex min-h-11 items-center justify-center gap-3 rounded-lg border border-brand-dark/15 bg-white px-6 py-3 font-heading text-[13px] font-bold text-brand-dark transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-primary hover:text-brand-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
              >
                Book a Stand
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowIcon />
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}