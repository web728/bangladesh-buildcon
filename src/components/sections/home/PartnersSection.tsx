
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { OrganiserLogos } from "@/components/ui/OrganiserLogos";
import { PartnerLogo } from "@/components/ui/PartnerLogo";

import {
  getActivePartners,
  type PartnerSummary,
} from "@/lib/data/partners";

import {
  PartnerReveal,
  OrganiserSpotlight,
  PartnerLogoGrid,
} from "./PartnersMotion";

/* ==========================================
   SVG ICONS
========================================== */

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
      strokeWidth="1.7"
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

function PartnershipIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
      aria-hidden="true"
    >
      <circle cx="7" cy="7" r="2.5" />
      <circle cx="17" cy="7" r="2.5" />
      <path d="M2.5 19v-2a4.5 4.5 0 0 1 7.5-3.35M21.5 19v-2a4.5 4.5 0 0 0-7.5-3.35" />
      <path d="m9 17 3 2 3-2M12 19v2" />
    </svg>
  );
}

/* ==========================================
   PARTNERS SECTION
   Server component
========================================== */

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
      className="relative isolate overflow-hidden border-b border-[#E9E8ED] bg-[#F8F8FA] py-12 text-brand-dark sm:py-14 lg:py-16"
    >
      <Container className="relative z-10">
        {/* =====================================
            HEADER
        ====================================== */}

        <PartnerReveal className="mb-7 flex flex-col gap-4 border-b border-[#E7E5EB] pb-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[650px]">
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="h-[2px] w-7 bg-brand-primary"
              />

              <span className="font-heading text-[10px] font-extrabold uppercase tracking-[0.16em] text-brand-primary">
                The People Behind Buildcon
              </span>
            </div>

            <h2
              id="partners-heading"
              className="mt-3 font-heading text-[clamp(1.65rem,2.8vw,2.25rem)] font-extrabold leading-[1.17] tracking-[-0.045em] text-brand-dark"
            >
              Our Organisers{" "}
              <span className="text-brand-primary">
                &amp; Partners
              </span>
            </h2>

            <p className="mt-3 max-w-[550px] text-[12px] leading-[1.8] text-[#69707A] sm:text-[13px]">
              Meet the joint organisers and supporting
              organisations behind Bangladesh Buildcon
              International Expo 2027.
            </p>
          </div>

          <Link
            href="/contact"
            className="group inline-flex min-h-10 w-fit shrink-0 items-center justify-center gap-2 rounded-lg border border-[#DDD9E1] bg-white px-4 py-2.5 font-heading text-[11px] font-bold text-brand-dark transition-[border-color,color,background-color] duration-300 hover:border-brand-primary/40 hover:bg-[#FBF2F8] hover:text-brand-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
          >
            Partnership Enquiry

            <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none">
              <ArrowIcon diagonal />
            </span>
          </Link>
        </PartnerReveal>

        {/* =====================================
            PREMIUM ORGANISERS SHOWCASE
        ====================================== */}

        <OrganiserSpotlight>
          <div className="relative overflow-hidden rounded-2xl border border-[#E5E2E9] bg-white shadow-[0_8px_32px_rgba(5,7,9,0.045)]">
            <div className="grid min-w-0 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
              {/* LEFT — EDITORIAL PANEL */}
              <div className="relative flex min-w-0 flex-col justify-between overflow-hidden bg-[#17151B] p-6 text-white sm:p-7 lg:p-8">
                {/* Solid pink decorative geometry */}
                <svg
                  viewBox="0 0 300 300"
                  fill="none"
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-20 -right-16 size-[280px] opacity-25"
                >
                  <circle
                    cx="150"
                    cy="150"
                    r="118"
                    stroke="#BA1D82"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="150"
                    cy="150"
                    r="87"
                    stroke="#FFFFFF"
                    strokeOpacity="0.2"
                  />
                  <path
                    d="M150 0v300M0 150h300"
                    stroke="#FFFFFF"
                    strokeOpacity="0.13"
                  />
                  <path
                    d="m40 260 220-220"
                    stroke="#BA1D82"
                    strokeWidth="2"
                  />
                  <circle
                    cx="150"
                    cy="150"
                    r="16"
                    fill="#BA1D82"
                    fillOpacity="0.55"
                  />
                </svg>

                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/[0.07] px-3 py-1.5">
                    <span className="size-1.5 rounded-full bg-brand-primary" />
                    <span className="font-heading text-[10px] font-bold uppercase tracking-[0.12em] text-white/85">
                      Official Joint Organisers
                    </span>
                  </div>

                  <h3 className="mt-5 max-w-[350px] font-heading text-[clamp(1.3rem,2vw,1.7rem)] font-extrabold leading-[1.28] tracking-[-0.04em]">
                    Bringing the Industry{" "}
                    <span className="text-[#E9A5D3]">
                      Together.
                    </span>
                  </h3>

                  <p className="mt-3 max-w-[390px] text-[12px] leading-[1.85] text-white/65 sm:text-[13px]">
                    Futurex Trade Fair &amp; Events
                    Pvt. Ltd. and ASK Trade &amp;
                    Exhibitions Pvt. Ltd. jointly
                    organise Bangladesh Buildcon 2027.
                  </p>
                </div>

                <div className="relative z-10 mt-6 flex items-center gap-3 border-t border-white/15 pt-4">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-brand-primary/35 bg-brand-primary/20 text-[#E9A5D3]">
                    <PartnershipIcon />
                  </span>

                  <div>
                    <p className="font-heading text-[11px] font-bold text-white">
                      11th International Edition
                    </p>
                    <p className="mt-0.5 text-[10px] text-white/55">
                      Dhaka, Bangladesh · 2027
                    </p>
                  </div>
                </div>
              </div>

              {/* RIGHT — SPACIOUS LOGO SHOWCASE */}
              <div className="flex min-w-0 flex-col justify-center p-5 sm:p-7 lg:p-8">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-heading text-[10px] font-extrabold uppercase tracking-[0.13em] text-brand-primary">
                    The Organising Partners
                  </span>

                  <span className="hidden text-[10px] font-medium text-[#93909A] sm:block">
                    Official Organisers
                  </span>
                </div>

                {/* Logo stage:
                    OrganiserLogos controls image size.
                    No forced image width overrides. */}
                <div className="mt-4 flex min-h-[160px] min-w-0 items-center justify-center rounded-xl border border-[#E9E6EC] bg-[#FBFAFC] px-3 py-5 sm:min-h-[180px] sm:px-6">
                  <div className="flex w-full min-w-0 items-center justify-center">
                    <OrganiserLogos />
                  </div>
                </div>

                {/* Names */}
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="min-w-0 border-l-[2px] border-brand-primary pl-3">
                    <p className="font-heading text-[9px] font-bold uppercase tracking-[0.1em] text-[#92909A]">
                      Joint Organiser 01
                    </p>
                    <p className="mt-1 font-heading text-[11px] font-bold leading-[1.6] text-brand-dark sm:text-[12px]">
                      Futurex Trade Fair &amp; Events
                      Pvt. Ltd.
                    </p>
                  </div>

                  <div className="min-w-0 border-l-[2px] border-[#CFC5D0] pl-3">
                    <p className="font-heading text-[9px] font-bold uppercase tracking-[0.1em] text-[#92909A]">
                      Joint Organiser 02
                    </p>
                    <p className="mt-1 font-heading text-[11px] font-bold leading-[1.6] text-brand-dark sm:text-[12px]">
                      ASK Trade &amp; Exhibitions
                      Pvt. Ltd.
                    </p>
                  </div>
                </div>

                <div className="mt-5 border-t border-[#EAE7EC] pt-3.5">
                  <Link
                    href="/contact"
                    className="group inline-flex min-h-9 items-center gap-2 font-heading text-[11px] font-bold text-brand-primary transition-colors hover:text-brand-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
                  >
                    Contact the Organisers

                    <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none">
                      <ArrowIcon diagonal />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </OrganiserSpotlight>

        {/* =====================================
            SUPPORTING ASSOCIATIONS & MEDIA
        ====================================== */}

        {hasPartners ? (
          <div className="mt-9 sm:mt-11">
            <PartnerReveal className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="flex items-center gap-2.5">
                  <span
                    aria-hidden="true"
                    className="h-[2px] w-6 bg-brand-primary"
                  />

                  <span className="font-heading text-[10px] font-bold uppercase tracking-[0.13em] text-brand-primary">
                    Our Network
                  </span>
                </div>

                <h3 className="mt-2 font-heading text-[clamp(1.25rem,2vw,1.6rem)] font-extrabold leading-[1.3] tracking-[-0.035em] text-brand-dark">
                  Supporting Associations{" "}
                  <span className="text-brand-primary">
                    &amp; Media
                  </span>
                </h3>

                <p className="mt-1.5 text-[12px] leading-[1.75] text-[#737680]">
                  Explore the organisations supporting
                  Bangladesh Buildcon.
                </p>
              </div>

              <Link
                href="/contact"
                className="group inline-flex min-h-9 w-fit items-center gap-2 font-heading text-[11px] font-bold text-brand-primary transition-colors hover:text-brand-primary-dark"
              >
                Become a Partner

                <span className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none">
                  <ArrowIcon />
                </span>
              </Link>
            </PartnerReveal>

            {/* Existing animated database logo grid */}
            <div className="w-full min-w-0">
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
          </div>
        ) : (
          <PartnerReveal className="mt-7">
            <div className="flex flex-col gap-4 rounded-xl border border-[#E9E5EB] bg-white px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div className="flex min-w-0 items-start gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#F8EAF3] text-brand-primary">
                  <PartnershipIcon />
                </span>

                <div className="min-w-0">
                  <h3 className="font-heading text-[13px] font-bold text-brand-dark">
                    Supporting Associations &amp; Media
                  </h3>

                  <p className="mt-1.5 max-w-[550px] text-[12px] leading-[1.75] text-[#737680]">
                    Partner profiles will appear
                    when published by the organisers.
                    Contact our team to enquire
                    about partnerships.
                  </p>
                </div>
              </div>

              <Link
                href="/contact"
                className="group inline-flex min-h-10 w-fit shrink-0 items-center justify-center gap-2 rounded-lg bg-brand-primary px-4 py-2.5 font-heading text-[11px] font-bold text-white transition-colors hover:bg-brand-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
              >
                Become a Partner
                <ArrowIcon />
              </Link>
            </div>
          </PartnerReveal>
        )}
      </Container>
    </section>
  );
}
