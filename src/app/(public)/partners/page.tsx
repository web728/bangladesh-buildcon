import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { PartnerLogo } from "@/components/ui/PartnerLogo";
import { PartnerEnquiryForm } from "@/components/forms/PartnerEnquiryForm";
import { getActivePartners, type PartnerSummary } from "@/lib/data/partners";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Industry & Media Partners | Bangladesh Buildcon 2026",
  description:
    "Organisers and confirmed supporting organisations, industry associations, and media partners of Bangladesh Buildcon International Expo 2026.",
  alternates: { canonical: "/partners" },
};

const CATEGORIES = [
  "Supporting Organisation",
  "Association Partner",
  "Industry Partner",
  "Media Partner",
] as const;

export default async function PartnersPage() {
  let partners: PartnerSummary[] = [];

  try {
    partners = await getActivePartners();
  } catch {
    partners = [];
  }

  const byCategory = CATEGORIES.map((cat) => ({
    category: cat,
    items: partners.filter((p) => p.category === cat),
  })).filter((group) => group.items.length > 0);

  return (
    <main className="min-h-screen bg-[#fafbfd] selection:bg-brand-blue selection:text-white">
      <PageHero
        title="Industry Partners & Alliances"
        intro="Endorsed and supported by leading regional trade chambers, construction authorities, and international building sector associations."
        image={{
          src: "/images/sectors/construction-crane-bangladesh.jpg",
          alt: "Bangladesh Buildcon Industry Partners",
        }}
      />

      {/* Partners Display Section */}
      <section className="relative overflow-hidden py-12 sm:py-16 border-b border-slate-200/80">
        {/* Background Architectural Vector Pattern */}
        <div className="pointer-events-none absolute inset-0 -z-10 select-none opacity-[0.035]">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="partners-page-grid" width="36" height="36" patternUnits="userSpaceOnUse">
                <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#201820" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#partners-page-grid)" />
          </svg>
        </div>

        <Container className="relative z-10 w-full">
          {byCategory.length === 0 ? (
            <EmptyState
              title="Official Partner Announcements Coming Soon"
              body="Confirmed supporting organisations, industry partners, and media partners are being finalised and will be listed here once approved."
            />
          ) : (
            <div className="flex flex-col gap-10">
              {byCategory.map((group) => (
                <div key={group.category} className="flex flex-col gap-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
                    <h2 className="text-base sm:text-lg font-bold tracking-tight text-brand-dark">
                      {group.category}s
                    </h2>
                    <span className="text-xs font-semibold text-slate-400">
                      {group.items.length} {group.items.length === 1 ? "Partner" : "Partners"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    {group.items.map((partner) => (
                      <PartnerLogo key={partner._id || partner.name} partner={partner} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* Direct Alliance Helpdesk Strip (Dono Organisers) */}
      {/* <section className="py-10 bg-slate-50/70 border-b border-slate-200/80">
        <Container className="max-w-4xl">
          <div className="text-center pb-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-blue">
              Partnership &amp; Delegation Desk
            </span>
            <h3 className="mt-1 text-lg sm:text-2xl font-extrabold tracking-tight text-brand-dark">
              Speak Directly with Our Alliance Heads
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {PARTNER_CONTACTS.map((item) => {
              const cleanPhone = item.person.phone.replace(/[^0-9+]/g, "");

              return (
                <div
                  key={item.company}
                  className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition-all hover:border-brand-blue/40 hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span
                        className={`rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                          item.isBlue
                            ? "bg-brand-blue/10 text-brand-blue"
                            : "bg-brand-green/10 text-brand-green"
                        }`}
                      >
                        {item.company}
                      </span>
                      <span className="text-xs font-medium text-slate-400">
                        {item.location}
                      </span>
                    </div>

                    <h4 className="mt-3 text-base font-bold text-brand-dark">
                      {item.person.name}
                    </h4>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-2 text-xs">
                    <a
                      href={`tel:${cleanPhone}`}
                      className="inline-flex items-center gap-2.5 rounded-xl border border-slate-200/80 bg-slate-50/60 px-3 py-2 font-semibold text-slate-700 hover:border-brand-green/50 hover:bg-white hover:text-brand-green transition-all"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-brand-green/5 text-brand-green">
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </span>
                      <span className="tabular-nums">{item.person.phone}</span>
                    </a>

                    <a
                      href={`mailto:${item.person.email}`}
                      className="inline-flex items-center gap-2.5 rounded-xl border border-slate-200/80 bg-slate-50/60 px-3 py-2 font-semibold text-slate-700 hover:border-brand-blue/50 hover:bg-white hover:text-brand-blue transition-all truncate"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-brand-blue/5 text-brand-blue">
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </span>
                      <span className="truncate">{item.person.email}</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section> */}

      {/* Partnership Application Form Section */}
      <section className="relative py-14 sm:py-20 bg-white">
        <Container className="max-w-3xl">
          <div className="text-center pb-8 border-b border-slate-100">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue/20 bg-brand-blue/[0.06] px-3.5 py-1">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-blue opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-blue" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-blue">
                Collaborate With Buildcon
              </span>
            </div>

            <h2 className="mt-3.5 text-2xl sm:text-4xl font-extrabold tracking-tight text-brand-dark">
              Partnership &amp; Alliance Enquiry
            </h2>

            <p className="mx-auto mt-2 max-w-lg text-xs sm:text-sm leading-relaxed text-slate-500 font-normal">
              Submit your organisation details to explore association, sponsorship, or media partnership opportunities.
            </p>
          </div>

          <div className="mt-8 rounded-3xl border border-slate-200/80 bg-slate-50/50 p-6 sm:p-10 shadow-[0_2px_16px_rgb(0,0,0,0.02)]">
            <PartnerEnquiryForm />
          </div>
        </Container>
      </section>
    </main>
  );
}
