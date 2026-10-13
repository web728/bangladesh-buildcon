
import Image from "next/image";
import Link from "next/link";

import { event } from "@/config/event";
import { footerNav } from "@/config/navigation";
import { Container } from "@/components/ui/Container";

import {
  FooterBackground,
  FooterReveal,
} from "./FooterMotion";

/* ==========================================
   SOCIAL LINKS
========================================== */

const socialLinks = [
  {
    name: "LinkedIn",
    href: event.social.linkedin,
    path: "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z",
  },
  {
    name: "Facebook",
    href: event.social.facebook,
    path: "M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z",
  },
  {
    name: "Instagram",
    href: event.social.instagram,
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
  {
    name: "X",
    href: event.social.twitter,
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
].filter((item) => Boolean(item.href));

/* ==========================================
   CONTACT DATA
========================================== */

const contacts = [
  {
   
    ...event.contact.futurex,
  },
  {
   
    ...event.contact.askTrade,
  },
];

/* ==========================================
   NAVIGATION DATA

   Four primary groups on one desktop row.
   Legal links move to the bottom bar.
========================================== */

const mainNavigation = [
  { title: "Event", items: footerNav.event },
  { title: "Exhibit", items: footerNav.exhibit },
  { title: "Visit", items: footerNav.visit },
  {
    title: "Information",
    items: footerNav.information,
  },
];

/* ==========================================
   ICONS
========================================== */

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3.5 shrink-0"
      aria-hidden="true"
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

function CalendarIcon() {
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
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M7 3v4M17 3v4M3 10h18" />
    </svg>
  );
}

function LocationIcon() {
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
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

/* ==========================================
   NAVIGATION COLUMN
========================================== */

function NavColumn({
  title,
  items,
}: {
  title: string;
  items?: ReadonlyArray<{
    href: string;
    label: string;
  }>;
}) {
  if (!items?.length) return null;

  return (
    <div className="min-w-0">
      <h3 className="mb-4 font-heading text-[12px] font-extrabold tracking-[-0.01em] text-white">
        {title}
      </h3>

      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={`${item.href}-${item.label}`}>
            <Link
              href={item.href}
              className="group inline-flex max-w-full items-start gap-1.5 text-[11px] leading-[1.55] text-white/55 transition-colors duration-200 hover:text-[#EAA1D1] xl:text-[12px]"
            >
              <span className="min-w-0 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none">
                {item.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ==========================================
   PREMIUM FOOTER

   Desktop:
   Brand | 4 Nav Groups | Contact

   Bottom:
   Legal | Copyright | Socials
========================================== */

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-[#0B0C11] text-white">
      {/* Animated SVG background */}
      <FooterBackground />

      {/* Minimal pink top rule */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-10 h-[2px] bg-brand-primary"
      />

      <Container className="relative z-10">
        {/* ===================================
            MAIN SINGLE-ROW LAYOUT
        ==================================== */}

        <div className="grid gap-8 py-9 md:gap-9 md:py-10 lg:grid-cols-[minmax(185px,0.95fr)_minmax(0,2.6fr)_minmax(205px,1.05fr)] lg:items-start lg:gap-6 xl:grid-cols-[minmax(220px,1fr)_minmax(0,2.65fr)_minmax(235px,1.05fr)] xl:gap-8">
          {/* ===================================
              BRAND + EVENT INFORMATION
          ==================================== */}

          <FooterReveal className="min-w-0">
            <Link
              href="/"
              aria-label={`${event.name} home`}
              className="group inline-flex max-w-full items-center rounded-lg bg-white p-2.5 transition-transform duration-300 hover:-translate-y-0.5 motion-reduce:transform-none"
            >
              <Image
                src="/logos/logo.png"
                alt={event.name}
                width={1560}
                height={468}
                className="h-[56px] w-auto max-w-full object-contain object-left xl:h-[64px]"
              />
            </Link>

            <p className="mt-4 max-w-[285px] text-[11px] leading-[1.75] text-white/60 xl:text-[12px]">
              {event.descriptor}
            </p>

            <div className="mt-4 space-y-2.5">
              <p className="flex items-start gap-2 text-[11px] leading-[1.6] text-white/75">
                <span className="mt-0.5 text-[#EAA1D1]">
                  <CalendarIcon />
                </span>
                {event.dates.display}
              </p>

              <p className="flex items-start gap-2 text-[11px] leading-[1.6] text-white/75">
                <span className="mt-0.5 text-[#EAA1D1]">
                  <LocationIcon />
                </span>
                {event.venue.name},{" "}
                {event.venue.city}
              </p>
            </div>

            {/* Small organiser logos inside brand */}
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <a
                href="https://www.futurextrade.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Futurex Trade Fair & Events website"
                className="group flex h-11 w-[105px] items-center justify-center overflow-hidden rounded-md bg-white px-2.5 transition-transform duration-300 hover:-translate-y-0.5 motion-reduce:transform-none"
              >
                <Image
                  src="/logos/futurex-logo.png"
                  alt="Futurex Trade Fair & Events"
                  width={170}
                  height={65}
                  className="max-h-8 w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.04]"
                />
              </a>

              <a
                href="https://www.asktradex.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ASK Trade & Exhibitions website"
                className="group flex h-11 w-[78px] items-center justify-center overflow-hidden rounded-md bg-white px-2 transition-transform duration-300 hover:-translate-y-0.5 motion-reduce:transform-none"
              >
                <Image
                  src="/logos/ask-trade-logo.png"
                  alt="ASK Trade & Exhibitions Pvt. Ltd."
                  width={120}
                  height={65}
                  className="max-h-9 w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.04]"
                />
              </a>
            </div>
          </FooterReveal>

          {/* ===================================
              NAVIGATION — NO DESKTOP WRAPPING
          ==================================== */}

          <FooterReveal className="min-w-0">
            <nav aria-label="Footer navigation">
              <div className="grid grid-cols-2 gap-x-5 gap-y-7 sm:grid-cols-4 sm:gap-x-4 lg:grid-cols-4 lg:gap-x-3 xl:gap-x-6">
                {mainNavigation.map((group) => (
                  <NavColumn
                    key={group.title}
                    title={group.title}
                    items={group.items}
                  />
                ))}
              </div>
            </nav>
          </FooterReveal>

          {/* ===================================
              COMPACT ORGANISER CONTACT
          ==================================== */}

          <FooterReveal className="min-w-0">
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="h-[2px] w-5 bg-brand-primary"
              />
              <h2 className="font-heading text-[12px] font-extrabold text-white">
                Contact Organisers
              </h2>
            </div>

            <div className="mt-4 space-y-4">
              {contacts.map((contact) => {
                const telephone = contact.phone.replace(
                  /[^0-9+]/g,
                  ""
                );

                return (
                  <div
                    key={contact.company}
                    className="min-w-0"
                  >
                    

                    {contact.name && (
                      <p className="mt-1 text-[11px] leading-[1.55] text-white/70">
                        {contact.name}
                      </p>
                    )}

                    <a
                      href={`tel:${telephone}`}
                      className="mt-1.5 block text-[11px] leading-[1.6] text-white/60 transition-colors hover:text-white"
                    >
                      {contact.phone}
                    </a>

                    <a
                      href={`mailto:${contact.email}`}
                      className="mt-0.5 block break-all text-[11px] leading-[1.6] text-white/60 transition-colors hover:text-[#EBA5D2]"
                    >
                      {contact.email}
                    </a>
                  </div>
                );
              })}
            </div>

            <Link
              href="/contact"
              className="group mt-4 inline-flex items-center gap-1.5 font-heading text-[11px] font-bold text-[#EBA5D2] transition-colors hover:text-white"
            >
              Get in Touch
              <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none">
                <ArrowIcon />
              </span>
            </Link>
          </FooterReveal>
        </div>

        {/* ===================================
            SLIM BOTTOM BAR
        ==================================== */}

        <div className="flex flex-col gap-3 border-t border-white/10 py-4 lg:flex-row lg:items-center lg:justify-between lg:gap-5">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="text-[10px] leading-[1.6] text-white/45 xl:text-[11px]">
              © {new Date().getFullYear()}{" "}
              {event.name}.
            </p>

            {footerNav.legal?.map((item) => (
              <Link
                key={`${item.href}-${item.label}`}
                href={item.href}
                className="text-[10px] leading-[1.6] text-white/45 transition-colors hover:text-white xl:text-[11px]"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                title={social.name}
                className="flex size-8 items-center justify-center rounded-md border border-white/10 bg-white/[0.05] text-white/65 transition-[background-color,color,transform] duration-200 hover:-translate-y-0.5 hover:border-brand-primary hover:bg-brand-primary hover:text-white motion-reduce:transform-none"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-3.5"
                  aria-hidden="true"
                >
                  <path d={social.path} />
                </svg>
              </a>
            ))}

            <span className="ml-2 hidden font-heading text-[10px] font-semibold text-white/45 xl:inline">
              {event.websiteDisplay}
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
