
import Image from "next/image";
import Link from "next/link";

import { event } from "@/config/event";
import { footerNav } from "@/config/navigation";
import { Container } from "@/components/ui/Container";

import {
  FooterBackground,
  FooterReveal,
  FooterContactCard,
  FooterNavGrid,
  FooterNavColumn,
  FooterOrganisers,
} from "./FooterMotion";

/* ========================================
   SOCIAL MEDIA LINKS
   Existing event config preserved
======================================== */

const SOCIAL_LINKS = [
  {
    key: "linkedin",
    label: "LinkedIn",
    href: event.social.linkedin,
    icon: (
      <svg
        className="size-[17px] fill-current"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    ),
  },
  {
    key: "facebook",
    label: "Facebook",
    href: event.social.facebook,
    icon: (
      <svg
        className="size-[17px] fill-current"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
      </svg>
    ),
  },
  {
    key: "instagram",
    label: "Instagram",
    href: event.social.instagram,
    icon: (
      <svg
        className="size-[17px] fill-current"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    key: "twitter",
    label: "X (Twitter)",
    href: event.social.twitter,
    icon: (
      <svg
        className="size-[17px] fill-current"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
].filter((link) => Boolean(link.href));

/* ========================================
   ORGANISER CONTACT DETAILS
======================================== */

const FOOTER_CONTACTS = [
  {
    company: "Futurex Group",
    name: event.contact.futurex.name,
    phone: event.contact.futurex.phone,
    email: event.contact.futurex.email,
  },
  {
    company: "ASK Trade & Exhibitions Pvt. Ltd.",
    name: event.contact.askTrade.name,
    phone: event.contact.askTrade.phone,
    email: event.contact.askTrade.email,
  },
];

/* ========================================
   ICONS
======================================== */

function PhoneIcon() {
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
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4 shrink-0"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
      />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

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

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-[17px] shrink-0"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="5"
        width="18"
        height="16"
        rx="2"
      />
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
      className="size-[17px] shrink-0"
      aria-hidden="true"
    >
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

/* ========================================
   FOOTER NAVIGATION COLUMN
======================================== */

function NavigationColumn({
  title,
  items,
}: {
  title: string;
  items?: ReadonlyArray<{
    href: string;
    label: string;
  }>;
}) {
  return (
    <FooterNavColumn>
      {/* Group heading */}
      <div className="mb-5 flex items-center gap-2.5">
        <span className="h-[2px] w-5 bg-brand-primary" />

        <h3 className="font-heading text-[12px] font-bold tracking-[0.02em] text-white">
          {title}
        </h3>
      </div>

      {/* Links */}
      <ul className="space-y-3.5">
        {items?.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="group inline-flex items-center gap-2 text-[12px] leading-relaxed text-white/55 transition-colors duration-300 hover:text-[#F2A8D8] sm:text-[13px]"
            >
              <span
                aria-hidden="true"
                className="h-1 w-1 shrink-0 rounded-full bg-brand-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                {item.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </FooterNavColumn>
  );
}

/* ========================================
   MAIN FOOTER
======================================== */

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-white/10 bg-[#08090D] pb-8 pt-16 text-white sm:pt-20 lg:pt-24">
      <FooterBackground />

      <Container className="relative z-10">
        {/* ====================================
            TOP BRAND AND CONTACTS
        ==================================== */}

        <div className="grid items-start gap-10 border-b border-white/10 pb-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-12 lg:pb-14">
          {/* BRAND AREA */}
          <FooterReveal className="min-w-0">
            <Link
              href="/"
              aria-label={`${event.name} home`}
              className="group inline-flex max-w-full items-center rounded-xl bg-white px-4 py-3 shadow-[0_12px_35px_rgba(0,0,0,0.16)] transition-transform duration-300 hover:-translate-y-1"
            >
              <Image
                src="/logos/bangladesh-buildcon-logo.png"
                alt={event.name}
                width={1560}
                height={468}
                className="h-[70px] w-auto max-w-full object-contain object-left sm:h-[95px] lg:h-[105px]"
              />
            </Link>

            {/* Brand description */}
            <p className="mt-6 max-w-[460px] text-[14px] leading-[1.85] text-white/65 sm:text-[15px]">
              {event.descriptor}
            </p>

            {/* Event information */}
            <div className="mt-7 flex flex-col gap-3">
              <div className="flex items-start gap-3 text-[12px] font-medium leading-relaxed text-white/75 sm:text-[13px]">
                <span className="mt-0.5 text-[#EA65BB]">
                  <CalendarIcon />
                </span>

                <span>{event.dates.display}</span>
              </div>

              <div className="flex items-start gap-3 text-[12px] font-medium leading-relaxed text-white/75 sm:text-[13px]">
                <span className="mt-0.5 text-[#EA65BB]">
                  <LocationIcon />
                </span>

                <span>
                  {event.venue.name},{" "}
                  {event.venue.city}
                </span>
              </div>
            </div>

            {/* Brand accent */}
            <div
              aria-hidden="true"
              className="mt-8 h-[3px] w-16 rounded-full bg-brand-primary"
            />
          </FooterReveal>

          {/* DUAL ORGANISER CONTACTS */}
          <div className="min-w-0">
            <FooterReveal>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-[2px] w-7 bg-brand-primary" />

                <h2 className="font-heading text-[11px] font-bold uppercase tracking-[0.16em] text-[#F2A8D8]">
                  Organiser Contact Desk
                </h2>
              </div>
            </FooterReveal>

            <div className="grid gap-4 sm:grid-cols-2">
              {FOOTER_CONTACTS.map((contact) => {
                const cleanPhone = contact.phone.replace(
                  /[^0-9+]/g,
                  ""
                );

                return (
                  <FooterContactCard
                    key={contact.company}
                  >
                    {/* Company name */}
                    <div>
                      <span className="inline-flex max-w-full rounded-md border border-brand-primary/20 bg-brand-primary/10 px-2.5 py-1 font-heading text-[10px] font-bold leading-snug text-[#F2A8D8]">
                        {contact.company}
                      </span>

                      <p className="mt-4 font-heading text-[15px] font-bold leading-snug text-white">
                        {contact.name}
                      </p>
                    </div>

                    {/* Contact links */}
                    <div className="mt-6 space-y-3 border-t border-white/10 pt-4">
                      <a
                        href={`tel:${cleanPhone}`}
                        className="group/link flex items-start gap-2.5 text-[12px] leading-relaxed text-white/65 transition-colors hover:text-white"
                      >
                        <span className="mt-0.5 text-[#EA65BB] transition-transform duration-300 group-hover/link:scale-110">
                          <PhoneIcon />
                        </span>

                        <span className="break-words tabular-nums">
                          {contact.phone}
                        </span>
                      </a>

                      <a
                        href={`mailto:${contact.email}`}
                        className="group/link flex items-start gap-2.5 text-[12px] leading-relaxed text-white/65 transition-colors hover:text-white"
                      >
                        <span className="mt-0.5 text-[#EA65BB] transition-transform duration-300 group-hover/link:scale-110">
                          <MailIcon />
                        </span>

                        <span className="min-w-0 break-all">
                          {contact.email}
                        </span>
                      </a>
                    </div>
                  </FooterContactCard>
                );
              })}
            </div>
          </div>
        </div>

        {/* ====================================
            NAVIGATION GROUPS
        ==================================== */}

        <FooterNavGrid>
          <NavigationColumn
            title="Event"
            items={footerNav.event}
          />

          <NavigationColumn
            title="Exhibit"
            items={footerNav.exhibit}
          />

          <NavigationColumn
            title="Visit"
            items={footerNav.visit}
          />

          <NavigationColumn
            title="Information"
            items={footerNav.information}
          />

          <NavigationColumn
            title="Legal & Desk"
            items={footerNav.legal}
          />
        </FooterNavGrid>

        {/* ====================================
            JOINT ORGANISERS
        ==================================== */}

        <FooterOrganisers>
          <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            {/* Text */}
            <div className="max-w-[620px]">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-[2px] w-7 bg-brand-primary" />

                <span className="font-heading text-[10px] font-bold uppercase tracking-[0.17em] text-[#F2A8D8]">
                  Joint Event Organisers
                </span>
              </div>

              <h3 className="font-heading text-[17px] font-bold leading-[1.5] tracking-[-0.025em] text-white sm:text-[19px]">
                Futurex Trade Fair &amp; Events
                <span className="mx-2 text-[#EA65BB]">
                  &amp;
                </span>
                ASK Trade &amp; Exhibitions Pvt. Ltd.
              </h3>

              <p className="mt-3 text-[12px] leading-[1.8] text-white/55 sm:text-[13px]">
                International building and
                construction trade connections
                across South Asia.
              </p>
            </div>

            {/* ORIGINAL ORGANISER LOGOS */}
            <div className="flex w-full shrink-0 flex-wrap items-center gap-3 sm:gap-4 lg:w-auto">
              {/* Futurex Logo */}
              <a
                href="https://www.futurextrade.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Futurex Trade Fair & Events website"
                className="group flex h-[76px] w-[175px] items-center justify-center rounded-xl border border-white/15 bg-white px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/60 hover:shadow-[0_18px_38px_rgba(0,0,0,0.2)] sm:h-[85px] sm:w-[195px]"
              >
                <div className="relative h-full w-full transition-transform duration-300 group-hover:scale-[1.04]">
                  <Image
                    src="/logos/futurex-logo.png"
                    alt="Futurex Trade Fair & Events"
                    fill
                    sizes="195px"
                    className="object-contain object-center"
                  />
                </div>
              </a>

              {/* ASK Trade Logo */}
              <a
                href="https://www.asktradex.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ASK Trade & Exhibitions website"
                className="group flex h-[76px] w-[126px] items-center justify-center rounded-xl border border-white/15 bg-white p-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/60 hover:shadow-[0_18px_38px_rgba(0,0,0,0.2)] sm:h-[85px] sm:w-[140px]"
              >
                <div className="relative h-full w-full scale-110 transition-transform duration-300 group-hover:scale-[1.15]">
                  <Image
                    src="/logos/ask-trade-logo.png"
                    alt="ASK Trade & Exhibitions Pvt. Ltd."
                    fill
                    sizes="140px"
                    className="object-contain object-center"
                  />
                </div>
              </a>
            </div>
          </div>
        </FooterOrganisers>

        {/* ====================================
            FOOTER BOTTOM BAR
        ==================================== */}

        <div className="mt-10 flex flex-col gap-6 border-t border-white/10 pt-8 lg:flex-row lg:items-center lg:justify-between">
          {/* Copyright */}
          <p className="text-center text-[11px] leading-relaxed text-white/45 sm:text-[12px] lg:text-left">
            &copy; {new Date().getFullYear()}{" "}
            {event.name}. All rights reserved.
          </p>

          {/* Social links */}
          {SOCIAL_LINKS.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.key}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  title={social.label}
                  className="group flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] text-white/65 transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/50 hover:bg-brand-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
                >
                  <span className="transition-transform duration-300 group-hover:scale-110">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>
          )}

          {/* Website display */}
          <p className="text-center font-heading text-[11px] font-semibold tracking-wide text-white/65 sm:text-[12px] lg:text-right">
            {event.websiteDisplay}
          </p>
        </div>
      </Container>
    </footer>
  );
}
