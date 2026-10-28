"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";

const EASE = [0.22, 1, 0.36, 1] as const;

/* =========================================
   STRATEGIC OBJECTIVES
========================================= */


const CORE_DELIVERABLES = [
  {
    title: "Showcase Your Products",
    desc: "Present your latest building materials, construction machinery, and equipment to professionals across Bangladesh's building and construction industry.",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
  },
  {
    title: "Find Distribution Partners",
    desc: "Connect with importers, distributors, and suppliers interested in representing your products and expanding their business networks.",
    icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    title: "Connect with Industry Experts",
    desc: "Meet architects, structural engineers, and consultants involved in selecting materials, products, and solutions for construction projects.",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    title: "Demonstrate Technologies",
    desc: "Showcase construction machinery, modern building technologies, and innovative products through live demonstrations.",
    icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    title: "Meet Potential Buyers",
    desc: "Engage with project developers, procurement professionals, and business buyers looking for reliable products and suppliers.",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  },
  {
    title: "Connect with Contractors",
    desc: "Build connections with contractors, construction companies, and engineering firms working on residential, commercial, and infrastructure projects.",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  },
  {
    title: "Generate Business Enquiries",
    desc: "Receive enquiries from potential buyers, discuss project requirements, and explore new sales opportunities during the three-day exhibition.",
    icon: "M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z",
  },
  {
    title: "Build Long-Term Partnerships",
    desc: "Develop lasting relationships with industry professionals and strengthen your business presence in Bangladesh's construction market.",
    icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
];


/* =========================================
   EVENT FACTS
========================================= */

const EVENT_METRICS = [
  {
    label: "Official Dates",
    value: event.dates.display,
    detail: "Exhibition Schedule",
  },
  {
    label: "Exhibition Venue",
    value: event.venue.name,
    detail: "Event Location",
  },
  {
    label: "Host City",
    value: event.venue.city,
    detail: "Bangladesh",
  },
  {
    label: "Product Categories",
    value: "15 Specialized Sectors",
    detail: "Exhibition Scope",
  },
  {
    label: "Target Audience",
    value: "Contractors, Specifiers & Buyers",
    detail: "Trade Professionals",
  },
  {
    label: "Regional Focus",
    value: "South Asian Markets",
    detail: "B2B Connections",
  },
];

/* =========================================
   ANIMATION VARIANTS
========================================= */

const reveal: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: EASE,
    },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.075,
    },
  },
};

/* =========================================
   SMALL UI ELEMENTS
========================================= */

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      aria-hidden="true"
    >
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      aria-hidden="true"
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="h-[2px] w-6 shrink-0 bg-brand-primary" />

      <span className="font-heading text-[10px] font-bold uppercase tracking-[0.18em] text-brand-primary">
        {children}
      </span>
    </div>
  );
}

function ObjectiveCard({
  item,
  index,
  reducedMotion,
}: {
  item: (typeof CORE_DELIVERABLES)[number];
  index: number;
  reducedMotion: boolean;
}) {
  return (
    <motion.article
      variants={reveal}
      whileHover={reducedMotion ? undefined : { y: -5 }}
      transition={{
        duration: 0.3,
        ease: EASE,
      }}
      className="group relative flex h-full min-h-[205px] flex-col overflow-hidden rounded-2xl border border-[#E7E8EE] bg-white p-5 shadow-[0_3px_18px_rgba(5,7,9,0.025)] transition-[border-color,box-shadow] duration-300 hover:border-brand-primary/30 hover:shadow-[0_15px_38px_rgba(5,7,9,0.075)]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-brand-primary transition-transform duration-500 group-hover:scale-x-100"
      />

      <div className="flex items-start justify-between">
        <div className="flex size-10 items-center justify-center rounded-xl bg-brand-primary/[0.075] text-brand-primary transition-colors duration-300 group-hover:bg-brand-primary group-hover:text-white">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.65"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-[19px]"
            aria-hidden="true"
          >
            <path d={item.icon} />
          </svg>
        </div>
      </div>

      <h3 className="mt-5 font-heading text-[14px] font-bold tracking-[-0.02em] text-brand-dark transition-colors group-hover:text-brand-primary">
        {item.title}
      </h3>

      <p className="mt-2 text-[12px] leading-[1.8] text-[#68717F]">
        {item.desc}
      </p>

    
    </motion.article>
  );
}

/* =========================================
   ABOUT PAGE CONTENT
========================================= */

export function AboutClientView() {
  const reducedMotion = !!useReducedMotion();

  const motionProps = {
    initial: reducedMotion ? false : "hidden",
    whileInView: "visible" as const,
    viewport: {
      once: true,
      amount: 0.12,
    },
  };

  return (
    <div className="relative overflow-hidden bg-[#F8F9FB] text-brand-dark">
      {/* Subtle architectural grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(5,7,9,0.018)_1px,transparent_1px),linear-gradient(to_bottom,rgba(5,7,9,0.018)_1px,transparent_1px)] bg-[size:64px_64px]"
      />

      <Container className="relative z-10">
        {/* =====================================
            01 ABOUT THE EXHIBITION
        ====================================== */}
<section
  aria-labelledby="about-introduction"
  className="grid gap-8 border-b border-[#E5E7ED] py-12 lg:grid-cols-12 lg:items-stretch lg:gap-12 lg:py-16"
>
  {/* About Introduction */}
  <motion.div
    {...motionProps}
    variants={reveal}
    className="flex flex-col justify-center lg:col-span-7"
  >
    <Eyebrow>International B2B Exhibition</Eyebrow>

    <h2
      id="about-introduction"
      className="mt-4 max-w-[680px] font-heading text-[clamp(1.55rem,2.7vw,2.35rem)] font-extrabold leading-[1.22] tracking-[-0.04em] text-brand-dark"
    >
      Connecting the Building & Construction Industry with
      <span className="block text-brand-primary">
         New Business Opportunities
      </span>
    </h2>

    <p className="mt-5 max-w-[680px] text-[13px] leading-[1.9] text-[#606A78] sm:text-[14px]">
      The 11th Bangladesh Buildcon International Expo 2027 is a dedicated
      B2B trade exhibition bringing together manufacturers, exporters,
      and suppliers of building materials, construction machinery,
      equipment, and building solutions with architects, engineers,
      contractors, developers, and industry professionals.
    </p>

    <p className="mt-3 max-w-[680px] text-[13px] leading-[1.9] text-[#606A78] sm:text-[14px]">
      Held from 11–13 November 2027 at ICCB Expo Village in Dhaka,
      Bangladesh, the exhibition provides opportunities to explore
      new products, connect with potential buyers and suppliers,
      experience live product demonstrations, and build valuable
      business partnerships.
    </p>

    {/* Action Buttons */}
    <div className="mt-7 flex flex-wrap items-center gap-3">
      <Link
        href="/exhibition-profile"
        className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-brand-primary px-5 py-3 font-heading text-[12px] font-bold text-white shadow-[0_8px_22px_rgba(186,29,130,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#9F176D]"
      >
        Explore Exhibition Profile
        <span className="transition-transform group-hover:translate-x-1">
          <ArrowIcon />
        </span>
      </Link>

      <Link
        href="/book-a-stand"
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#DADDE5] bg-white px-5 py-3 font-heading text-[12px] font-bold text-brand-dark transition-colors hover:border-brand-primary/40 hover:text-brand-primary"
      >
        Book a Stand
        <ArrowUpRightIcon />
      </Link>
    </div>
  </motion.div>

  {/* Strategic Gateway Card */}
  <motion.aside
    {...motionProps}
    variants={reveal}
    className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#272431] bg-[#101016] p-6 text-white shadow-[0_18px_50px_rgba(5,7,9,0.12)] sm:p-7 lg:col-span-5"
    aria-labelledby="why-dhaka-heading"
  >
    {/* Background Effects */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-0 top-0 size-48 rounded-full bg-brand-primary/15 blur-[75px]"
    />

    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:48px_48px]"
    />

    {/* Card Content */}
    <div className="relative z-10 flex h-full flex-col">
      

      <h3
        id="why-dhaka-heading"
        className="mt-7 font-heading text-[26px] font-extrabold leading-[1.2] tracking-[-0.04em] text-[#F4F0F3] sm:text-[29px]"
      >
        Why <span className="text-[#F1A1D1]">Dhaka?</span>
      </h3>

      <div className="mt-4 h-[2px] w-10 bg-brand-primary" />

      <p className="mt-5 text-[13px] leading-[1.9] text-[#BFC0C9]">
        As Bangladesh&apos;s capital and a major business centre,
        Dhaka connects construction companies, developers, importers,
        distributors, architects, engineers, and industry decision-makers,
        making it a suitable location for building new business
        relationships across the building and construction sector.
      </p>

      {/* Card Footer */}
      <div className="mt-auto pt-7">
        <div className="border-t border-white/10 pt-5">
          <Link
            href="/why-bangladesh"
            className="group inline-flex items-center gap-2 font-heading text-[12px] font-bold text-[#F1A1D1] transition-colors hover:text-white"
          >
            Explore Bangladesh Market
            <span className="transition-transform group-hover:translate-x-1">
              <ArrowIcon />
            </span>
          </Link>
        </div>
      </div>
    </div>

    {/* Left Accent Line */}
    <div
      aria-hidden="true"
      className="absolute inset-y-0 left-0 w-[3px] bg-brand-primary"
    />
  </motion.aside>
</section>


        {/* =====================================
            02 BUSINESS OBJECTIVES
        ====================================== */}

       
<section
  aria-labelledby="business-objectives-heading"
  className="py-12 lg:py-16"
>
  <motion.div
    {...motionProps}
    variants={reveal}
    className="flex flex-col gap-4 border-b border-[#E5E7ED] pb-6 sm:flex-row sm:items-end sm:justify-between"
  >
    <div>
      <Eyebrow>Business Opportunities</Eyebrow>

      <h2
        id="business-objectives-heading"
        className="mt-3 font-heading text-[clamp(1.5rem,2.6vw,2.2rem)] font-extrabold tracking-[-0.04em] text-brand-dark"
      >
        Explore New{" "}
        <span className="text-brand-primary">
          Business Opportunities
        </span>
      </h2>
    </div>

    <p className="max-w-[390px] text-[12px] leading-[1.85] text-[#6C7583] sm:text-[13px]">
      Connect with potential buyers, discover new markets,
      find distribution partners, and build lasting business
      relationships across the building and construction industry.
    </p>
  </motion.div>

  <motion.div
    variants={stagger}
    initial={reducedMotion ? false : "hidden"}
    whileInView="visible"
    viewport={{
      once: true,
      amount: 0.06,
    }}
    className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
  >
    {CORE_DELIVERABLES.map((item, index) => (
      <ObjectiveCard
        key={item.title}
        item={item}
        index={index}
        reducedMotion={reducedMotion}
      />
    ))}
  </motion.div>
</section>

 
      </Container>
    </div>
  );
}
