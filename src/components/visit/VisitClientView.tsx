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

// Six visitor-value pillars adapted from the supplied Bangladesh brochure.
const VISIT_BENEFITS = [
  {
    title: "Source New Products",
    body: "Discover building materials, machinery, equipment and technologies from participating global suppliers.",
    badge: "Procurement",
  },
  {
    title: "Compare Products & Suppliers",
    body: "Evaluate alternative products, technologies and suppliers efficiently in one location.",
    badge: "Evaluation",
  },
  {
    title: "Solve Current Sourcing Requirements",
    body: "Meet suppliers relevant to ongoing and upcoming construction, distribution and procurement needs.",
    badge: "Direct Sourcing",
  },
  {
    title: "Meet Manufacturers Directly",
    body: "Discover building materials, machinery, equipment and technologies directly from factory leaders and certified producers.",
    badge: "Factory Direct",
  },
  {
    title: "Discover New Brands",
    body: "Identify manufacturers and products seeking business opportunities and distribution partnerships in the Bangladeshi market.",
    badge: "Market Entry",
  },
  {
    title: "Develop Supplier Relationships",
    body: "Build direct business contacts for current requirements, volume supply agreements, and future infrastructure projects.",
    badge: "B2B Networking",
  },
];

// Exact 5 Buyer Categories from Brochure Page 03 ("MEET THE PEOPLE WHO BUY, BUILD, SPECIFY & SOURCE")
const VISITOR_SEGMENTS = [
  {
    title: "Architects, Engineers & Consultants",
    roles: "Architects, Civil & Structural Engineers, MEP Consultants, Quantity Surveyors, Project Managers",
  },
  {
    title: "Importers, Distributors & Trade Buyers",
    roles: "Importers, Distributors, Wholesalers, Dealers, Hardware Store Owners, Building Material Merchants",
  },
  {
    title: "Developers & Project Owners",
    roles: "Real Estate Developers, Commercial & Residential Builders, Hospitality Groups, Facility Managers",
  },
  {
    title: "Contractors",
    roles: "Building Contractors, Civil & Road Contractors, EPC Firms, Mechanical & Electrical Contractors",
  },
  {
    title: "Industrial & Institutional Buyers",
    roles: "Manufacturing Companies, Industrial Plants, Healthcare & Educational Institutions, Utilities",
  },
];

export function VisitClientView() {
  return (
    <div className="relative overflow-hidden py-14 sm:py-20 text-brand-dark">
      {/* Background Architectural Vector Grid */}
      <div className="pointer-events-none absolute inset-0 -z-10 select-none opacity-[0.035]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="visit-page-grid" width="36" height="36" patternUnits="userSpaceOnUse">
              <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#201820" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#visit-page-grid)" />
        </svg>
      </div>

      <Container className="relative z-10 w-full">
        {/* ========================================================= */}
        {/* Header Block 1: Balanced Titles & Direct CTA              */}
        {/* ========================================================= */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between pb-8 border-b border-slate-200/80">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue/20 bg-brand-blue/[0.06] px-4 py-1">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-blue opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-blue" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-blue">
                Strategic Sourcing Platform
              </span>
            </div>

            <h2 className="mt-4 text-2xl sm:text-4xl font-extrabold tracking-[-0.03em] leading-[1.15] text-brand-dark">
              Why Visit{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-purple to-brand-green">
                Bangladesh Buildcon 2026?
              </span>
            </h2>

            <p className="mt-2.5 text-xs sm:text-sm leading-[1.7] text-slate-500 font-normal">
              Evaluate products, address project sourcing requirements, and connect directly with participating manufacturers over three focused business days.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href={event.cta.registerVisit}
              className="inline-flex items-center justify-center rounded-full bg-brand-blue px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-[0_4px_16px_rgba(200,32,40,0.25)] transition-all duration-300 hover:bg-brand-blue-dark hover:shadow-[0_6px_22px_rgba(200,32,40,0.35)] hover:-translate-y-0.5 active:translate-y-0"
            >
              Get Visitor Badge →
            </Link>
          </div>
        </div>

        {/* ========================================================= */}
        {/* Section 1: 6 Core Visitor Benefits (Spacious Grid)        */}
        {/* ========================================================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="mt-8 sm:mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {VISIT_BENEFITS.map((item, idx) => (
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
        {/* Section 2: Who Will You Meet Alongside You?               */}
        {/* ========================================================= */}
        <div className="mt-14 sm:mt-18 rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between pb-5 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-green">
                Peer Networking
              </span>
              <h3 className="mt-1 text-base sm:text-lg font-bold tracking-tight text-brand-dark">
                Meet The People Who Buy, Build, Specify &amp; Source
              </h3>
            </div>
            <Link
              href="/who-should-visit"
              className="text-xs font-bold text-brand-blue hover:underline"
            >
              Detailed Profile Breakdown →
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {VISITOR_SEGMENTS.map((seg) => (
              <div
                key={seg.title}
                className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-slate-50/70 p-5 transition-colors hover:border-brand-blue/30 hover:bg-white"
              >
                <div>
                  <h4 className="text-sm font-bold text-brand-dark">
                    {seg.title}
                  </h4>
                  <p className="mt-2 text-xs leading-[1.65] text-slate-500 font-normal">
                    {seg.roles}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-medium text-brand-blue">
                  <span>Professional Trade Audience</span>
                  <span>✓</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* Bottom Action Ribbon                                      */}
        {/* ========================================================= */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-brand-blue/20 bg-gradient-to-r from-brand-blue/[0.04] via-white to-brand-green/[0.04] p-5 sm:p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-brand-dark">
                Pre-registration is open for trade professionals
              </h4>
              <p className="text-[11px] text-slate-500 font-normal mt-0.5">
                Join 7,000+ industry professionals from 17–19 September 2026 at ICCB Exhibition Hall, Dhaka.
              </p>
            </div>
          </div>

          <Link
            href={event.cta.registerVisit}
            className="shrink-0 inline-flex items-center justify-center rounded-full bg-brand-blue px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-md hover:bg-brand-blue-dark transition-all duration-200"
          >
            Register to Visit
          </Link>
        </div>
      </Container>
    </div>
  );
}   
