
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { PartnerLogo } from "@/components/ui/PartnerLogo";
import { OrganiserLogos } from "@/components/ui/OrganiserLogos";

import {
  getActivePartners,
  type PartnerSummary,
} from "@/lib/data/partners";

import {
  PartnerReveal,
  OrganiserSpotlight,
  PartnerLogoGrid,
} from "./PartnersMotion";

/* ---------------------------------------
   ICONS
---------------------------------------- */

function ArrowUpRightIcon() {
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
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

function ArrowRightIcon() {
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
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

/* ---------------------------------------
   MAIN PARTNERS SECTION
   SERVER COMPONENT
---------------------------------------- */

export async function PartnersSection() {
  let partners: PartnerSummary[] = [];

  try {
    partners = await getActivePartners();
  } catch {
    partners = [];
  }

  const hasPartners = partners.length > 0;

  return (
    <section
      aria-labelledby="partners-heading"
      className="relative isolate overflow-hidden border-b border-brand-dark/10 bg-[#FAFAFC] py-16 text-brand-dark sm:py-20 lg:py-24"
    >
      {/* Soft ambient magenta background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(186,29,130,0.055),transparent_50%)]"
      />

      {/* Architectural blueprint grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(5,7,9,0.022)_1px,transparent_1px),linear-gradient(to_bottom,rgba(5,7,9,0.022)_1px,transparent_1px)] bg-[size:78px_78px]"
      />

      <Container className="relative z-10">
        {/* ====================================
            SECTION HEADING
        ==================================== */}

        <PartnerReveal className="mx-auto max-w-[760px] text-center">
          {/* Eyebrow */}
          <div className="mb-5 flex items-center justify-center gap-3">
            <span
              aria-hidden="true"
              className="h-[2px] w-8 bg-brand-primary"
            />

            <span className="font-heading text-[11px] font-bold uppercase tracking-[0.17em] text-brand-primary">
              Jointly Organised By
            </span>

            <span
              aria-hidden="true"
              className="h-[2px] w-8 bg-brand-primary"
            />
          </div>

          {/* Title */}
          <h2
            id="partners-heading"
            className="font-heading text-[clamp(2rem,3.5vw,3rem)] leading-[1.15] font-extrabold tracking-[-0.05em] text-brand-dark"
          >
            Meet the{" "}
            <span className="text-brand-primary">
              Organisers
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-[650px] text-[14px] leading-[1.85] text-[#626A77] sm:text-[15px]">
            Bangladesh Buildcon 2026 is jointly
            organised by Futurex Trade Fair &amp;
            Events and ASK Trade &amp; Exhibitions
            Pvt. Ltd.
          </p>

          {/* Header CTA */}
          <div className="mt-7">
            <Link
              href="/contact"
              className="group inline-flex min-h-11 items-center justify-center gap-2.5 rounded-lg border border-brand-dark/15 bg-white px-6 py-3 font-heading text-[12px] font-bold text-brand-dark shadow-[0_5px_20px_rgba(5,7,9,0.035)] transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-primary/45 hover:text-brand-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
            >
              Partner With Us

              <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRightIcon />
              </span>
            </Link>
          </div>
        </PartnerReveal>

        {/* ====================================
            ORGANISERS SPOTLIGHT
        ==================================== */}

        <OrganiserSpotlight>
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto] lg:gap-12">
            {/* Organiser content */}
            <div className="min-w-0">
              <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-brand-primary/15 bg-brand-primary/[0.055] px-3.5 py-2">
                <span
                  aria-hidden="true"
                  className="size-2 rounded-full bg-brand-primary"
                />

                <span className="font-heading text-[10px] font-bold uppercase tracking-[0.14em] text-brand-primary">
                  Official Joint Organisers
                </span>
              </div>

              <h3 className="max-w-[580px] font-heading text-[clamp(1.3rem,2vw,1.75rem)] leading-[1.4] font-extrabold tracking-[-0.035em] text-brand-dark">
                Futurex Trade Fair &amp; Events
                <span className="mx-2 text-brand-primary">
                  &amp;
                </span>
                ASK Trade &amp; Exhibitions Pvt. Ltd.
              </h3>

              <p className="mt-4 max-w-[560px] text-[13px] leading-[1.9] text-[#69717E] sm:text-[14px]">
                Exhibition organisers connecting
                exhibitors with professional trade
                buyers across international markets.
              </p>

              {/* Supporting detail */}
              <div className="mt-6 flex items-center gap-3 border-t border-brand-dark/10 pt-5">
                <span
                  aria-hidden="true"
                  className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-5"
                  >
                    <path d="M3 21h18M5 21V7l7-4 7 4v14M9 10h2m2 0h2m-6 4h2m2 0h2m-5 7v-4h4v4" />
                  </svg>
                </span>

                <div>
                  <p className="font-heading text-[12px] font-bold text-brand-dark">
                    Bangladesh Buildcon
                  </p>

                  <p className="mt-0.5 text-[11px] text-[#8A929E]">
                    Joint Exhibition Organisation
                  </p>
                </div>
              </div>
            </div>

            {/* Actual organiser logos */}
            <div className="relative flex w-full min-w-0 items-center justify-center border-t border-brand-dark/10 pt-8 lg:w-auto lg:max-w-[480px] lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_center,rgba(186,29,130,0.035),transparent_65%)]"
              />

              <div className="relative z-10 flex w-full items-center justify-center rounded-xl border border-brand-dark/[0.06] bg-[#FAFAFC] px-5 py-8 sm:px-8 sm:py-10 lg:min-h-[170px]">
                <OrganiserLogos />
              </div>
            </div>
          </div>
        </OrganiserSpotlight>

        {/* ====================================
            DYNAMIC SUPPORTING PARTNERS
        ==================================== */}

        {hasPartners ? (
          <div className="mt-14 lg:mt-16">
            <PartnerReveal className="mb-8 text-center">
              <div className="mb-3 flex items-center justify-center gap-2">
                <span className="size-1.5 rounded-full bg-brand-primary" />

                <span className="font-heading text-[11px] font-bold uppercase tracking-[0.16em] text-brand-primary">
                  Our Network
                </span>
              </div>

              <h3 className="font-heading text-[clamp(1.35rem,2.3vw,1.8rem)] font-extrabold tracking-[-0.035em] text-brand-dark">
                Supporting Associations{" "}
                <span className="text-brand-primary">
                  &amp; Media
                </span>
              </h3>

              <p className="mx-auto mt-3 max-w-[580px] text-[13px] leading-[1.8] text-[#727A87]">
                Explore the organisations supporting
                Bangladesh Buildcon.
              </p>
            </PartnerReveal>

            <PartnerLogoGrid>
              {partners.map((partner) => (
                <PartnerLogo
                  key={String(
                    partner._id || partner.name
                  )}
                  partner={partner}
                />
              ))}
            </PartnerLogoGrid>
          </div>
        ) : (
          <PartnerReveal className="mt-10">
            <div className="relative overflow-hidden rounded-2xl border border-dashed border-brand-primary/25 bg-white px-6 py-7 sm:px-8">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-24 size-64 rounded-full bg-brand-primary/[0.06] blur-3xl"
              />

              <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="size-5"
                    >
                      <circle cx="12" cy="8" r="3" />
                      <path d="M5 21v-2a7 7 0 0 1 14 0v2M2 13h3m14 0h3" />
                    </svg>
                  </span>

                  <div className="max-w-[600px]">
                    <h3 className="font-heading text-[14px] font-bold text-brand-dark">
                      Supporting Associations &amp; Media
                    </h3>

                    <p className="mt-1.5 text-[12px] leading-[1.8] text-[#69717E] sm:text-[13px]">
                      Supporting organisations and
                      media partners will appear here
                      after they are officially confirmed.
                    </p>
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="group inline-flex min-h-11 shrink-0 items-center justify-center gap-2.5 self-start rounded-lg bg-brand-primary px-5 py-3 font-heading text-[12px] font-bold text-white shadow-[0_10px_25px_rgba(186,29,130,0.14)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#9F176D] sm:self-auto"
                >
                  Become a Supporting Partner

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRightIcon />
                  </span>
                </Link>
              </div>
            </div>
          </PartnerReveal>
        )}
      </Container>
    </section>
  );
}
