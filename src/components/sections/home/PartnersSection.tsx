
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

/* ==========================================
   ICONS
========================================== */

function ArrowIcon() {
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

function ExternalIcon() {
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

/* ==========================================
   PARTNERS SECTION
   Server Component
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
      className="
        relative isolate overflow-hidden
        border-b border-brand-border
        bg-white py-12 text-brand-dark
        sm:py-14 lg:py-16
      "
    >
      {/* Subtle background texture */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          bg-[linear-gradient(to_right,rgba(5,7,9,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(5,7,9,0.012)_1px,transparent_1px)]
          bg-[size:76px_76px]
        "
      />

      <Container className="relative z-10">
        {/* =====================================
            SECTION HEADING
        ====================================== */}

        <PartnerReveal className="mx-auto mb-8 max-w-[650px] text-center">
          <div className="flex items-center justify-center gap-2.5">
            <span
              aria-hidden="true"
              className="h-[2px] w-7 bg-brand-primary"
            />

            <span className="font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-brand-primary-dark">
              Jointly Organised By
            </span>

            <span
              aria-hidden="true"
              className="h-[2px] w-7 bg-brand-primary"
            />
          </div>

          <h2
            id="partners-heading"
            className="
              mt-3 font-heading
              text-[clamp(1.6rem,2.7vw,2.15rem)]
              font-extrabold leading-[1.2]
              tracking-[-0.04em] text-brand-dark
            "
          >
            Our Organisers{" "}
            <span className="text-brand-primary-dark">
              &amp; Partners
            </span>
          </h2>

          <p className="mx-auto mt-3 max-w-[540px] text-[12px] leading-[1.8] text-brand-body sm:text-[13px]">
            Meet the organisations bringing Bangladesh
            Buildcon International Expo 2026 to Dhaka.
          </p>
        </PartnerReveal>

        {/* =====================================
            OFFICIAL JOINT ORGANISERS
        ====================================== */}

        <OrganiserSpotlight>
          <div
            className="
              relative mx-auto w-full max-w-[850px]
              overflow-hidden rounded-2xl
              border border-brand-border
              bg-white
              shadow-[0_8px_30px_rgba(5,7,9,0.045)]
            "
          >
            {/* Brand accent */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-[3px] bg-brand-primary"
            />

            {/* Spotlight header */}
            <div
              className="
                flex min-h-[52px] items-center
                justify-between gap-3
                border-b border-brand-border
                px-4 py-3 sm:px-7
              "
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="size-1.5 shrink-0 rounded-full bg-brand-primary"
                />

                <span className="font-heading text-[10px] font-bold uppercase tracking-[0.11em] text-brand-dark sm:text-[11px]">
                  Official Joint Organisers
                </span>
              </div>

              <span className="hidden shrink-0 text-[10px] font-medium text-brand-muted sm:block">
                Bangladesh Buildcon 2026
              </span>
            </div>

            {/* =================================
                CENTRED ORGANISER LOGOS
                No image CSS overrides
            ================================== */}

            <div className="bg-[#FAFBFC] px-3 py-5 sm:px-7 sm:py-6">
              <div
                className="
                  mx-auto w-full max-w-[680px]
                  rounded-xl border border-brand-border
                  bg-white px-3 py-3
                  sm:px-7 sm:py-4
                "
              >
                <OrganiserLogos />
              </div>
            </div>

            {/* =================================
                ORGANISER DETAILS
            ================================== */}

            <div
              className="
                grid grid-cols-1
                divide-y divide-brand-border
                border-t border-brand-border
                bg-white
                sm:grid-cols-2
                sm:divide-x sm:divide-y-0
              "
            >
              {/* Futurex */}
              <div
                className="
                  flex min-w-0 items-center gap-3
                  px-4 py-4 sm:px-6 sm:py-5
                "
              >
                <span
                  className="
                    flex size-8 shrink-0
                    items-center justify-center
                    rounded-lg bg-brand-primary-soft
                    font-heading text-[11px]
                    font-extrabold text-brand-primary-dark
                  "
                >
                  01
                </span>

                <div className="min-w-0">
                  <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-brand-muted">
                    Joint Organiser
                  </p>

                  <h3 className="mt-1 font-heading text-[12px] font-bold leading-[1.5] text-brand-dark sm:text-[13px]">
                    Futurex Trade Fair &amp; Events
                    Pvt. Ltd.
                  </h3>
                </div>
              </div>

              {/* ASK Trade */}
              <div
                className="
                  flex min-w-0 items-center gap-3
                  px-4 py-4 sm:px-6 sm:py-5
                "
              >
                <span
                  className="
                    flex size-8 shrink-0
                    items-center justify-center
                    rounded-lg bg-brand-primary-soft
                    font-heading text-[11px]
                    font-extrabold text-brand-primary-dark
                  "
                >
                  02
                </span>

                <div className="min-w-0">
                  <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-brand-muted">
                    Joint Organiser
                  </p>

                  <h3 className="mt-1 font-heading text-[12px] font-bold leading-[1.5] text-brand-dark sm:text-[13px]">
                    ASK Trade &amp; Exhibitions
                    Pvt. Ltd.
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </OrganiserSpotlight>

        {/* =====================================
            ORGANISER CTA
        ====================================== */}

        <PartnerReveal className="mt-5 flex justify-center">
          <Link
            href="/contact"
            className="
              group inline-flex min-h-10
              items-center justify-center gap-2
              rounded-lg border border-brand-border
              bg-white px-4 py-2.5
              font-heading text-[11px] font-bold
              text-brand-dark
              transition-[border-color,color,box-shadow]
              duration-300
              hover:border-brand-primary/40
              hover:text-brand-primary-dark
              hover:shadow-[0_4px_14px_rgba(5,7,9,0.04)]
              focus-visible:outline-2
              focus-visible:outline-offset-2
              focus-visible:outline-brand-primary
            "
          >
            Contact the Organisers

            <span
              className="
                transition-transform duration-300
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
                motion-reduce:transform-none
              "
            >
              <ExternalIcon />
            </span>
          </Link>
        </PartnerReveal>

        {/* =====================================
            SUPPORTING PARTNERS
        ====================================== */}

        {hasPartners ? (
          <div className="mt-12 sm:mt-14">
            {/* Section heading */}
            <PartnerReveal
              className="
                mb-6 flex flex-col gap-3
                sm:flex-row sm:items-end
                sm:justify-between
              "
            >
              <div>
                <div className="flex items-center gap-2.5">
                  <span
                    aria-hidden="true"
                    className="h-[2px] w-6 bg-brand-primary"
                  />

                  <span className="font-heading text-[10px] font-bold uppercase tracking-[0.13em] text-brand-primary-dark">
                    Supporting Network
                  </span>
                </div>

                <h3
                  className="
                    mt-2.5 font-heading
                    text-[clamp(1.2rem,2vw,1.6rem)]
                    font-extrabold leading-tight
                    tracking-[-0.035em] text-brand-dark
                  "
                >
                  Associations{" "}
                  <span className="text-brand-primary-dark">
                    &amp; Media Partners
                  </span>
                </h3>

                <p className="mt-2 text-[12px] leading-[1.75] text-brand-body">
                  Organisations supporting Bangladesh Buildcon.
                </p>
              </div>

              <Link
                href="/contact"
                className="
                  group inline-flex min-h-10
                  w-fit shrink-0 items-center gap-2
                  font-heading text-[11px] font-bold
                  text-brand-primary-dark
                  transition-colors
                  hover:text-brand-primary
                  focus-visible:outline-2
                  focus-visible:outline-offset-2
                  focus-visible:outline-brand-primary
                "
              >
                Partnership Enquiry

                <span
                  className="
                    transition-transform duration-300
                    group-hover:translate-x-1
                    motion-reduce:transform-none
                  "
                >
                  <ArrowIcon />
                </span>
              </Link>
            </PartnerReveal>

            {/* =================================
                DATABASE-DRIVEN PARTNER GRID
                Each card handles its own image
                sizing and centre alignment.
            ================================== */}

            <div className="w-full min-w-0">
              <PartnerLogoGrid>
                {partners.map((partner) => (
                  <PartnerLogo
                    key={String(partner._id || partner.name)}
                    partner={partner}
                  />
                ))}
              </PartnerLogoGrid>
            </div>
          </div>
        ) : (
          /* =================================
              EMPTY PARTNERS STATE
          ================================== */

          <PartnerReveal className="mt-10">
            <div
              className="
                mx-auto flex max-w-[850px]
                flex-col gap-4
                rounded-xl border border-brand-border
                bg-[#FAFBFC] px-5 py-5
                sm:flex-row sm:items-center
                sm:justify-between sm:px-6
              "
            >
              <div className="min-w-0">
                <h3 className="font-heading text-[13px] font-bold text-brand-dark">
                  Supporting Associations &amp; Media
                </h3>

                <p className="mt-1.5 text-[12px] leading-[1.75] text-brand-body">
                  Partner profiles will appear once
                  published by the organisers.
                </p>
              </div>

              <Link
                href="/contact"
                className="
                  group inline-flex min-h-10
                  w-fit shrink-0 items-center gap-2
                  rounded-lg bg-brand-primary
                  px-4 py-2.5
                  font-heading text-[11px] font-bold
                  text-white
                  transition-colors duration-300
                  hover:bg-brand-primary-dark
                  focus-visible:outline-2
                  focus-visible:outline-offset-2
                  focus-visible:outline-brand-primary
                "
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
