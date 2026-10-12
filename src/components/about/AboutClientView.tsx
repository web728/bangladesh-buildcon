"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// 8 Strategic Mandates directly from Brochure Page 02
const CORE_DELIVERABLES = [
  {
    title: "Introduce Products",
    desc: "Launch new building materials and equipment directly into Bangladesh's rapidly accelerating construction sector.",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
  },
  {
    title: "Identify Distributors",
    desc: "Appoint vetted importers, regional wholesalers, and supply chain agents seeking long-term manufacturing agreements.",
    icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    title: "Reach Specifiers",
    desc: "Directly engage architects, structural engineers, and MEP consultants who drive brand specifications in mega project blueprints.",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    title: "Demonstrate Technologies",
    desc: "Run active machinery showcases, smart automation demos, and material stress-tests directly on the trade floor.",
    icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    title: "Meet Potential Buyers",
    desc: "Connect directly with corporate procurement leads and project owners looking for immediate supplier contracts.",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  },
  {
    title: "Connect with Contractors",
    desc: "Interface with EPCs, road builders, and civil engineering companies executing national infrastructure works.",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  },
  {
    title: "Generate New Enquiries",
    desc: "Capture high-value commercial tenders, qualified RFQs, and purchase commitments over three focused exhibition days.",
    icon: "M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z",
  },
  {
    title: "Build Long-Term Ties",
    desc: "Establish firm local brand presence and commercial networks that grow with South Asia's economic trajectory.",
    icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
];

const EVENT_METRICS = [
  { label: "Official Dates", value: event.dates.display, badge: "September 2026" },
  { label: "Exhibition Venue", value: event.venue.name, badge: "World-Class Hall" },
  { label: "Host City", value: `${event.venue.city}, Bangladesh`, badge: "National Commercial Hub" },
  { label: "Product Categories", value: "15 Specialized Sectors", badge: "Full Supply Chain" },
  { label: "Target Audience", value: "Contractors, Specifiers & Buyers", badge: "Professional B2B" },
  { label: "Commercial Hub", value: "South Asian Community", badge: "Regional Reach" },
];

export function AboutClientView() {
  return (
    <div className="relative overflow-hidden py-12 sm:py-16 text-brand-dark">
      {/* Background Architectural Vector Grid */}
      <div className="pointer-events-none absolute inset-0 -z-10 select-none opacity-[0.035]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="about-grid" width="36" height="36" patternUnits="userSpaceOnUse">
              <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#201820" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#about-grid)" />
        </svg>
      </div>

      <Container className="relative z-10 w-full">
        {/* ========================================================= */}
        {/* Section 1: Split Architecture Narrative                   */}
        {/* ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-8 lg:grid-cols-12 lg:items-center pb-12 border-b border-slate-200/80"
        >
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue/20 bg-brand-blue/[0.06] px-3.5 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-blue animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-blue">
                International B2B Platform
              </span>
            </div>

            <h2 className="mt-3.5 text-2xl sm:text-4xl font-extrabold tracking-[-0.03em] leading-[1.14] text-brand-dark">
              Where South Asia&apos;s Construction Industry{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-purple to-brand-green">
                Meets &amp; Builds Business
              </span>
            </h2>

            <p className="mt-3.5 text-xs sm:text-sm leading-[1.7] text-slate-600 font-normal">
              Bangladesh Buildcon International Expo 2026 is a dedicated B2B trade exhibition connecting manufacturers, exporters, and suppliers of building materials, heavy machinery, and construction systems with the professionals responsible for specifying, procuring, and executing infrastructure works.
            </p>

            <p className="mt-3 text-xs sm:text-sm leading-[1.7] text-slate-600 font-normal">
              Organised over three focused business days at ICCB Exhibition Hall in Dhaka, the event creates opportunities for product discovery, supplier sourcing, live demonstrations, technical learning, and direct B2B matchmaking.
            </p>
          </div>

          {/* Strategic Context Pill Card */}
          <div className="lg:col-span-5 rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-7 shadow-[0_4px_24px_rgb(0,0,0,0.03)]">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Strategic Gateway
            </span>
            <h3 className="mt-1 text-base sm:text-lg font-bold tracking-tight text-brand-dark">
              Why Dhaka?
            </h3>
            <p className="mt-2 text-xs leading-[1.65] text-slate-500 font-normal">
              Dhaka brings together the country&apos;s largest concentration of contractors, developers, importers, distributors, architects, engineers, consultants, and government decision-makers.
            </p>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
              <Link
                href="/why-bangladesh"
                className="text-xs font-bold text-brand-blue hover:underline"
              >
                Explore Market Report →
              </Link>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-600">
                South Asia Hub
              </span>
            </div>
          </div>
        </motion.div>

        {/* ========================================================= */}
        {/* Section 2: 8 Strategic Mandates (Brochure Deliverables)    */}
        {/* ========================================================= */}
        <div className="mt-12 sm:mt-16">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between pb-5 border-b border-slate-200/80">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-green">
                Commercial Exhibition Scope
              </span>
              <h3 className="mt-1.5 text-xl sm:text-3xl font-extrabold tracking-tight text-brand-dark">
                The Core Business Platform
              </h3>
            </div>
            <p className="text-xs text-slate-500 max-w-md font-normal">
              Engineered specifically to solve supplier sourcing requirements, open B2B distribution, and establish long-term market presence.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-30px" }}
            className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {CORE_DELIVERABLES.map((item, idx) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_2px_10px_rgb(0,0,0,0.02)] transition-all duration-300 hover:border-brand-blue/40 hover:shadow-lg hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-blue/[0.08] text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={item.icon} />
                      </svg>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-300 group-hover:text-slate-500 transition-colors">
                      0{idx + 1}
                    </span>
                  </div>

                  <h4 className="mt-3.5 text-xs sm:text-sm font-bold tracking-tight text-brand-dark group-hover:text-brand-blue transition-colors">
                    {item.title}
                  </h4>
                  <p className="mt-1 text-[11px] leading-[1.6] text-slate-500 font-normal">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-semibold text-brand-blue">
                  <span>Brochure Mandate</span>
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ========================================================= */}
        {/* Section 3: Event Facts Matrix (Compact Single-View Strip) */}
        {/* ========================================================= */}
        <div className="mt-14 sm:mt-18 rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-5 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-blue">
                Quick Facts &bull; Official Parameters
              </span>
              <h3 className="mt-1 text-lg sm:text-xl font-bold tracking-tight text-brand-dark">
                Bangladesh Buildcon at a Glance
              </h3>
            </div>

            <div className="flex items-center gap-2.5">
              <Link
                href="/exhibition-profile"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-[11px] font-semibold text-brand-dark transition-all hover:border-brand-blue hover:text-brand-blue"
              >
                Exhibition Profile →
              </Link>
              <Link
                href="/book-a-stand"
                className="inline-flex items-center justify-center rounded-full bg-brand-blue px-5 py-2 text-[11px] font-semibold uppercase tracking-wider text-white shadow-sm hover:bg-brand-blue-dark transition-all"
              >
                Book a Stand
              </Link>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {EVENT_METRICS.map((fact) => (
              <div
                key={fact.label}
                className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/60 p-4 transition-all hover:bg-white hover:border-slate-200 hover:shadow-sm"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {fact.label}
                  </span>
                  <p className="mt-0.5 text-xs sm:text-sm font-bold text-brand-dark">
                    {fact.value}
                  </p>
                </div>
                <span className="rounded-md border border-slate-200 bg-white px-2 py-0.5 text-[9px] font-semibold text-slate-600">
                  {fact.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
