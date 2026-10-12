"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";
import { BenefitCard } from "@/components/ui/BenefitCard";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

// Exact 5 Objectives directly from Brochure Page 02 ("Why Participate?")
const CORE_PILLARS = [
  {
    title: "Access New Buyers",
    body: "Present your products directly to companies actively involved in construction, projects, procurement, and wholesale distribution across South Asia.",
    badge: "Direct Procurement",
  },
  {
    title: "Develop Distribution",
    body: "Meet vetted importers, distributors, wholesalers, dealers, and regional market representatives seeking new manufacturing supply partnerships.",
    badge: "B2B Channels",
  },
  {
    title: "Enter the Bangladeshi Market",
    body: "Introduce your brand to an expanding industrial audience and build sustainable, direct long-term commercial relationships in South Asia.",
    badge: "Market Entry",
  },
  {
    title: "Generate Business Enquiries",
    body: "Engage contractors, developers, professional buyers, and project procurement teams actively searching for verified materials and technology suppliers.",
    badge: "Targeted Leads",
  },
  {
    title: "Reach Industry Specifiers",
    body: "Connect with architects, civil engineers, MEP consultants, and quantity surveyors who specify products in upcoming commercial blueprints.",
    badge: "Specification",
  },
  {
    title: "Live Product Demonstration",
    body: "Showcase machinery durability, technical tooling, and premium interior finishes through interactive floor demos to decision-makers.",
    badge: "Live Staging",
  },
];

// Verified Exhibitor Categories directly from Brochure Page 02 ("Who Should Exhibit?")
const WHO_SHOULD_EXHIBIT = [
  "Building Material Companies",
  "Construction Machinery Companies",
  "Engineering Product Manufacturers",
  "Equipment Suppliers",
  "Building Technology Companies",
  "Construction Product & System Providers",
  "Importers & Distributors",
  "Bangladeshi Manufacturers",
];

// Stand Participation Formats
const PARTICIPATION_OPTIONS = [
  {
    title: "Shell Scheme Space",
    desc: "Turnkey exhibition booth fitted with carpet, standard fascia name board, spotlights, electrical points, counter, and chairs.",
    tag: "Standard Turnkey",
  },
  {
    title: "Raw Bare Space",
    desc: "Unfurnished space ideal for bespoke pavilion designs, high-capacity machinery placement, and custom fabrication.",
    tag: "Custom Build",
  },
  {
    title: "International Pavilions",
    desc: "Coordinated delegation stands for export promotion councils, regional trade associations, and national pavilions.",
    tag: "Country Groups",
  },
  {
    title: "Machinery & Heavy Displays",
    desc: "Ground-level reinforced floor area configured for earthmoving, concrete batching, and heavy equipment demonstrations.",
    tag: "Heavy Displays",
  },
];

export function ExhibitClientView() {
  return (
    <div className="relative overflow-hidden py-14 sm:py-20 text-brand-dark">
      {/* Background Architectural Vector Grid */}
      <div className="pointer-events-none absolute inset-0 -z-10 select-none opacity-[0.035]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="exhibit-client-grid" width="36" height="36" patternUnits="userSpaceOnUse">
              <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#201820" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#exhibit-client-grid)" />
        </svg>
      </div>

      <Container className="relative z-10 w-full">
        {/* ========================================================= */}
        {/* Header Block: Balanced Titles & Top Right Action          */}
        {/* ========================================================= */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between pb-8 border-b border-slate-200/80">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue/20 bg-brand-blue/[0.06] px-4 py-1">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-blue opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-blue" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-blue">
                Commercial Exhibition Benefits
              </span>
            </div>

            <h2 className="mt-4 text-2xl sm:text-4xl font-extrabold tracking-[-0.03em] leading-[1.15] text-brand-dark">
              Strategic Commercial{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-purple to-brand-green">
                Advantages for Exhibitors
              </span>
            </h2>

            <p className="mt-2.5 text-xs sm:text-sm leading-[1.7] text-slate-500 font-normal">
              Three focused business days to present your solutions directly to contractors, developers, architects, and high-volume buyers driving Bangladesh&apos;s infrastructure growth.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href={event.cta.bookStand}
              className="inline-flex items-center justify-center rounded-full bg-brand-blue px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-[0_4px_16px_rgba(200,32,40,0.25)] transition-all duration-300 hover:bg-brand-blue-dark hover:shadow-[0_6px_22px_rgba(200,32,40,0.35)] hover:-translate-y-0.5 active:translate-y-0"
            >
              Reserve Stand Space →
            </Link>
          </div>
        </div>

        {/* ========================================================= */}
        {/* Core Pillars: Spacious 3-Column Grid (No Chipku Feel)     */}
        {/* ========================================================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="mt-8 sm:mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {CORE_PILLARS.map((item, idx) => (
            <BenefitCard
              key={item.title}
              title={item.title}
              description={item.body}
              badge={item.badge}
              index={idx}
              light={false}
            />
          ))}
        </motion.div>

        {/* ========================================================= */}
        {/* Who Should Exhibit Strip                                  */}
        {/* ========================================================= */}
        <div className="mt-14 sm:mt-18 rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between pb-5 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-green">
                Target Profiles
              </span>
              <h3 className="mt-1 text-base sm:text-lg font-bold tracking-tight text-brand-dark">
                Who Should Exhibit?
              </h3>
            </div>
            <span className="text-xs text-slate-400">8 Key Industry Profiles</span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {WHO_SHOULD_EXHIBIT.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2.5 rounded-xl border border-slate-100 bg-slate-50/70 p-3.5 text-xs font-semibold text-slate-700 transition-colors hover:border-brand-blue/30 hover:bg-white hover:text-brand-dark"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-brand-green shrink-0" />
                <span className="truncate">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* Stand Participation Formats                               */}
        {/* ========================================================= */}
        <div className="relative mt-14 sm:mt-18 overflow-hidden rounded-3xl bg-[#201820] p-7 sm:p-10 text-white shadow-2xl border border-white/10">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-blue/15 blur-3xl" />
          <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-brand-green/15 blur-3xl" />

          <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between pb-6 border-b border-white/10">
            <div className="max-w-xl">
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-blue">
                Participation Options
              </span>
              <h3 className="mt-2 text-xl sm:text-3xl font-extrabold tracking-tight text-white leading-snug">
                Choose Your Exhibition Presence
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 font-normal leading-[1.7]">
                Options tailored to international brand pavilions, equipment demonstrations, and materials distribution displays.
              </p>
            </div>

            <div className="shrink-0">
              <Link
                href={event.cta.bookStand}
                className="inline-flex items-center justify-center rounded-full bg-brand-blue px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(200,32,40,0.35)] transition-all duration-300 hover:bg-brand-blue-dark active:scale-95"
              >
                Request Stand Floor Plan →
              </Link>
            </div>
          </div>

          <div className="relative z-10 mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PARTICIPATION_OPTIONS.map((opt, i) => (
              <div
                key={opt.title}
                className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 backdrop-blur-md transition-all duration-300 hover:border-brand-blue/50 hover:bg-white/[0.06]"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-300">
                      {opt.tag}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-slate-500">
                      0{i + 1}
                    </span>
                  </div>

                  <h4 className="mt-4 text-sm sm:text-base font-bold text-white group-hover:text-brand-blue transition-colors">
                    {opt.title}
                  </h4>

                  <p className="mt-2 text-xs leading-[1.7] text-slate-300 font-normal">
                    {opt.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-semibold text-brand-blue">
                  <span>Explore Format</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Action Ribbon */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-brand-blue/20 bg-gradient-to-r from-brand-blue/[0.04] via-white to-brand-green/[0.04] p-5 sm:p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-brand-dark">
                Stand space allocations are currently active
              </h4>
              <p className="text-[11px] text-slate-500 font-normal mt-0.5">
                Held from 17–19 September 2026 at ICCB Exhibition Hall, Dhaka.
              </p>
            </div>
          </div>

          <Link
            href={event.cta.bookStand}
            className="shrink-0 inline-flex items-center justify-center rounded-full bg-brand-blue px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-md hover:bg-brand-blue-dark transition-all duration-200"
          >
            Book Exhibition Stand
          </Link>
        </div>
      </Container>
    </div>
  );
}