"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Container } from "@/components/ui/Container";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function ExhibitorDirectoryPreviewSection({
  exhibitors = [],
}: {
  exhibitors?: Array<{
    _id?: string;
    slug?: string;
    name: string;
    sector: string;
    country: string;
    tagline?: string;
  }>;
}) {
  const displayExhibitors = exhibitors.slice(0, 3);

  return (
    <section className="relative overflow-hidden bg-slate-50/70 py-16 sm:py-24 text-slate-900 border-b border-slate-200/80">
      {/* Dynamic Background Ambient Blur */}
      <div className="pointer-events-none absolute -top-20 left-1/2 -z-10 h-96 w-full max-w-7xl -translate-x-1/2 bg-gradient-to-b from-brand-blue/10 via-brand-purple/5 to-transparent blur-3xl opacity-60" />

      {/* Modern Grid Blueprint Texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_40%,transparent_100%)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <Container className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================= */}
        {/* Header Bar Layout                                       */}
        {/* ========================================================= */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between pb-8 border-b border-slate-200/80">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue/20 bg-brand-blue/5 px-3.5 py-1 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-blue opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-blue" />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue">
                Verified B2B Directory
              </span>
            </div>

            <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Featured Exhibitors &amp;{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-purple to-brand-green">
                Global Suppliers
              </span>
            </h2>

            <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-600 font-normal">
              Confirmed exhibitor profiles will appear here once they are published by the organising team.
            </p>
          </div>

          {/* Action Button Controls */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/exhibitors"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-700 shadow-sm transition-all duration-300 hover:border-brand-blue hover:text-brand-blue hover:shadow-md active:scale-95"
            >
              Full Directory →
            </Link>
            <Link
              href="/book-a-stand"
              className="inline-flex items-center justify-center rounded-xl bg-brand-blue px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-brand-blue/20 transition-all duration-300 hover:bg-brand-blue-dark hover:shadow-brand-blue/30 active:scale-95"
            >
              Book Stand Space
            </Link>
          </div>
        </div>

        {/* ========================================================= */}
        {/* Scroll-Animated Exhibitor Cards Grid                      */}
        {/* ========================================================= */}
        {displayExhibitors.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {displayExhibitors.map((exhibitor, idx) => (
            <motion.div
              key={exhibitor._id || exhibitor.slug || idx}
              variants={cardVariants}
              className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:border-brand-blue/40 hover:shadow-xl hover:shadow-brand-blue/5 hover:-translate-y-1.5"
            >
              <div>
                {/* Sector & Country Pill */}
                <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-100">
                  <span className="inline-flex items-center rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600 group-hover:bg-brand-blue/10 group-hover:text-brand-blue transition-colors">
                    {exhibitor.sector}
                  </span>
                  <span className="text-[11px] font-medium text-slate-400">
                    {exhibitor.country}
                  </span>
                </div>

                {/* Company Title */}
                <h3 className="mt-4 text-base font-bold text-slate-900 group-hover:text-brand-blue transition-colors">
                  {exhibitor.name}
                </h3>

                {/* Tagline */}
                {exhibitor.tagline && (
                  <p className="mt-2 text-xs leading-relaxed text-slate-500 line-clamp-2">
                    {exhibitor.tagline}
                  </p>
                )}
              </div>

              {/* Bottom Card Action */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-brand-blue">
                <span>View Profile</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </div>
            </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white/80 px-6 py-10 text-center shadow-sm">
            <p className="text-sm font-bold text-slate-900">Exhibitor directory updates are coming soon.</p>
            <p className="mx-auto mt-2 max-w-xl text-xs leading-relaxed text-slate-500">
              The public directory remains intentionally empty until confirmed company profiles are approved and published.
            </p>
          </div>
        )}

        {/* ========================================================= */}
        {/* Clean Bottom Listing Banner                               */}
        {/* ========================================================= */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3 text-xs sm:text-sm font-medium text-slate-600">
            <span className="h-2.5 w-2.5 rounded-full bg-brand-green animate-pulse shrink-0" />
            <span>
              Are you an active exporter or distributor? Get your company featured in the official exhibitor directory.
            </span>
          </div>

          <Link
            href="/book-a-stand"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:text-brand-blue-dark transition-colors whitespace-nowrap shrink-0"
          >
            <span>Apply for Listing</span>
            <span>→</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
