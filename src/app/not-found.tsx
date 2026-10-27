
import Link from "next/link";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { event } from "@/config/event";

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

function HomeIcon() {
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
      <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10Z" />
      <path d="M9 21v-8h6v8" />
    </svg>
  );
}

function PhoneIcon() {
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
      <path d="M3 5a2 2 0 0 1 2-2h3.28a1 1 0 0 1 .948.684l1.498 4.493a1 1 0 0 1-.502 1.21l-2.257 1.13a11.042 11.042 0 0 0 5.516 5.516l1.13-2.257a1 1 0 0 1 1.21-.502l4.493 1.498a1 1 0 0 1 .684.949V19a2 2 0 0 1-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function MailIcon() {
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
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export default function NotFound() {
  const contact = event.contact.namit;

  return (
    <>
      <Header />

      <main
        id="main-content"
        className="relative isolate overflow-hidden bg-[#111017] pt-28 pb-14 text-white selection:bg-brand-primary selection:text-white sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-20"
      >
        {/* Minimal decorative SVG */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <svg
            viewBox="0 0 900 500"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
            className="absolute -right-36 -top-28 h-[420px] w-[720px] opacity-[0.14] motion-safe:animate-[pulse_8s_ease-in-out_infinite]"
          >
            <path
              d="M40 350C230 180 350 420 560 200S780 80 940 -40"
              stroke="#BA1D82"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
            <path
              d="M65 395C260 225 380 460 590 240S820 115 980 0"
              stroke="#304090"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <path
              d="M90 440C290 275 415 495 630 285S855 155 1020 45"
              stroke="#FFFFFF"
              strokeOpacity="0.35"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <Container className="relative z-10">
          <div className="mx-auto flex max-w-[860px] flex-col items-center text-center">
            {/* Status */}
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/30 bg-brand-primary/10 px-3.5 py-1.5">
              <span className="size-1.5 rounded-full bg-[#EFA8D6]" />

              <span className="font-heading text-[10px] font-bold uppercase leading-[1.5] tracking-[0.12em] text-[#F1AED9]">
                Page Not Found
              </span>
            </div>

            {/* Large 404 */}
            <div className="relative mt-4">
              <span
                className="select-none font-heading text-[clamp(6rem,17vw,11rem)] font-extrabold leading-none tracking-[-0.085em] text-white"
                aria-hidden="true"
              >
                4
                <span className="text-brand-primary">
                  0
                </span>
                4
              </span>

              <span
                aria-hidden="true"
                className="absolute inset-x-[12%] bottom-0 h-px bg-white/15"
              />
            </div>

            {/* Heading */}
            <h1 className="mt-5 font-heading text-[clamp(1.65rem,3.3vw,2.6rem)] font-extrabold leading-[1.2] tracking-[-0.04em] text-white">
              This Page Couldn&apos;t{" "}
              <span className="text-[#EFA8D6]">
                Be Found.
              </span>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-3 max-w-[530px] text-[13px] leading-[1.8] tracking-normal text-white/60 sm:text-[14px]">
              The page you&apos;re looking for may have
              moved or is no longer available. You can
              return to the homepage or continue
              exploring {event.shortName}.
            </p>

            {/* Primary actions */}
            <div className="mt-7 flex w-full flex-wrap items-center justify-center gap-3">
              <Link
                href="/"
                className="group inline-flex min-h-11 items-center justify-center gap-2.5 rounded-lg bg-brand-primary px-5 py-3 font-heading text-[12px] font-bold leading-[1.4] text-white transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-brand-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary motion-reduce:transform-none"
              >
                <HomeIcon />

                Back to Homepage

                <span className="transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none">
                  <ArrowIcon />
                </span>
              </Link>

              <Link
                href={event.cta.bookStand}
                className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/[0.05] px-5 py-3 font-heading text-[12px] font-semibold leading-[1.4] text-white/90 transition-colors duration-200 hover:border-white/40 hover:bg-white/[0.1] hover:text-white"
              >
                Book a Stand
                <ArrowIcon diagonal />
              </Link>

              <Link
                href={event.cta.registerVisit}
                className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/[0.05] px-5 py-3 font-heading text-[12px] font-semibold leading-[1.4] text-white/90 transition-colors duration-200 hover:border-white/40 hover:bg-white/[0.1] hover:text-white"
              >
                Register to Visit
                <ArrowIcon diagonal />
              </Link>
            </div>

            {/* Contact support */}
            <section
              aria-labelledby="not-found-support-heading"
              className="mt-9 w-full max-w-[700px] overflow-hidden rounded-2xl border border-white/10 bg-[#1C1922] text-left sm:mt-10"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-3.5 sm:px-6">
                <div className="flex items-center gap-2.5">
                  <span className="h-[2px] w-5 bg-brand-primary" />

                  <h2
                    id="not-found-support-heading"
                    className="font-heading text-[11px] font-bold uppercase leading-[1.5] tracking-[0.1em] text-[#EFA8D6]"
                  >
                    Need Assistance?
                  </h2>
                </div>

                <span className="font-heading text-[10px] font-medium text-white/40">
                  Event Support
                </span>
              </div>

              <div className="px-5 py-4 sm:px-6 sm:py-5">
                <h3 className="font-heading text-[15px] font-bold leading-[1.4] tracking-[-0.02em] text-white sm:text-[16px]">
                  {contact.name}
                </h3>

                <p className="mt-1 text-[12px] leading-[1.6] text-white/50">
                  {event.shortName} · Direct Contact
                </p>

                <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-7 sm:gap-y-2">
                  <a
                    href={`tel:${contact.phoneHref}`}
                    aria-label={`Call ${contact.name}`}
                    className="inline-flex w-fit max-w-full items-center gap-2 text-[12px] font-medium leading-[1.6] text-white/80 transition-colors hover:text-[#F1AED9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
                  >
                    <span className="text-[#EFA8D6]">
                      <PhoneIcon />
                    </span>

                    <span className="tabular-nums">
                      {contact.phone}
                    </span>
                  </a>

                  <a
                    href={`mailto:${contact.email}`}
                    aria-label={`Email ${contact.name}`}
                    className="inline-flex w-fit max-w-full items-center gap-2 text-[12px] font-medium leading-[1.6] text-white/80 transition-colors hover:text-[#F1AED9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
                  >
                    <span className="text-[#EFA8D6]">
                      <MailIcon />
                    </span>

                    <span className="min-w-0 break-all">
                      {contact.email}
                    </span>
                  </a>
                </div>
              </div>
            </section>
          </div>
        </Container>
      </main>

      <Footer />
    </>
  );
}
