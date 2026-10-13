
"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";

const EASE = [0.22, 1, 0.36, 1] as const;

const reveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.58,
      ease: EASE,
    },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.075,
      delayChildren: 0.04,
    },
  },
};

/*
 * Exhibitor services topics are operational guidance,
 * not confirmed package inclusions.
 *
 * The brochure confirms event details and industry
 * scope, but does not confirm these service packages.
 */

const SERVICES = [
  {
    id: "visa",
    title: "Visa & Entry Information",
    tag: "International Travel",
    status: "Official Requirements",
    icon: "passport",
    description:
      "International exhibitors should check current Bangladesh entry and visa requirements for their nationality and purpose of travel. Visa decisions and processing are handled by the relevant authorities.",
    link: {
      label: "Contact the Organisers",
      href: "/contact",
    },
  },
  {
    id: "invitation-letter",
    title: "Invitation Letter Enquiries",
    tag: "Exhibitor Documents",
    status: "Contact Organisers",
    icon: "document",
    description:
      "If you require an invitation letter for exhibition-related travel, contact the organising team to ask about documentation requirements and whether supporting letters can be issued.",
    link: {
      label: "Ask About Documentation",
      href: "/contact",
    },
  },
  {
    id: "stand-construction",
    title: "Exhibition Stand Requirements",
    tag: "Stand Planning",
    status: "Enquiries Open",
    icon: "building",
    description:
      "Discuss the space and presentation requirements for your products, construction machinery, building materials or technologies. Stand dimensions, inclusions and technical approvals require organiser confirmation.",
    link: {
      label: "Enquire for Stand Space",
      href: event.cta.bookStand,
    },
  },
  {
    id: "freight-logistics",
    title: "Freight & Customs Preparation",
    tag: "Shipping",
    status: "Confirm Arrangements",
    icon: "truck",
    description:
      "Exhibitors transporting machinery, equipment, products or samples should check shipping documentation, import procedures and handling requirements in advance. Event-specific arrangements need to be confirmed with the organising team.",
    link: {
      label: "Ask About Logistics",
      href: "/contact",
    },
  },
  {
    id: "hotels",
    title: "Accommodation & Local Travel",
    tag: "Visit Planning",
    status: "Plan Your Visit",
    icon: "location",
    description:
      "Plan your travel and accommodation for the exhibition in Dhaka. Official hotel rates, shuttle arrangements or partner packages should only be relied upon if separately confirmed by the organisers.",
    link: {
      label: "Contact for Travel Queries",
      href: "/contact",
    },
  },
  {
    id: "exhibitor-manual",
    title: "Technical Exhibitor Manual",
    tag: "Event Documentation",
    status: "Check Publication",
    icon: "manual",
    description:
      "Refer to the latest organiser-issued information for setup schedules, stand construction rules, electrical requirements, access procedures and event operations. Check the downloads page for published resources.",
    link: {
      label: "View Published Downloads",
      href: "/downloads",
    },
  },
  {
    id: "on-site-services",
    title: "On-Site Facilities & Utilities",
    tag: "Venue Requirements",
    status: "Confirm Specifications",
    icon: "settings",
    description:
      "Discuss any electrical, internet, equipment handling or special technical requirements before finalising your participation. Facilities, specifications and applicable charges must be confirmed by the venue or organising team.",
    link: {
      label: "Discuss Requirements",
      href: "/contact",
    },
  },
] as const;

type ServiceIconName =
  (typeof SERVICES)[number]["icon"];

function ServiceIcon({
  name,
}: {
  name: ServiceIconName;
}) {
  const icons: Record<ServiceIconName, ReactNode> = {
    passport: (
      <>
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <circle cx="12" cy="10" r="4" />
        <path d="M8 10h8M12 6c-2 2-2 6 0 8m0-8c2 2 2 6 0 8M9 18h6" />
      </>
    ),
    document: (
      <>
        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z" />
        <path d="M13 2v7h7M8 13h8M8 17h6" />
      </>
    ),
    building: (
      <>
        <path d="M3 21h18M6 21V8l6-5 6 5v13" />
        <path d="M9 21v-6h6v6M9 10h1m4 0h1" />
      </>
    ),
    truck: (
      <>
        <path d="M3 6h11v11H3zM14 10h4l3 4v3h-7" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="18" cy="18" r="2" />
      </>
    ),
    location: (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    manual: (
      <>
        <path d="M12 7c-2.5-2-5.5-2-9-1v13c3.5-1 6.5-1 9 1 2.5-2 5.5-2 9-1V6c-3.5-1-6.5-1-9 1Z" />
        <path d="M12 7v13M6 10h3m6 0h3M6 14h3m6 0h3" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M10 2h4l.7 2.4 2 .8 2.2-1.1 2.8 2.8-1.1 2.2.8 2L24 12l-2.6.9-.8 2 1.1 2.2-2.8 2.8-2.2-1.1-2 .8L14 22h-4l-.7-2.4-2-.8-2.2 1.1-2.8-2.8 1.1-2.2-.8-2L0 12l2.6-.9.8-2-1.1-2.2 2.8-2.8 2.2 1.1 2-.8Z" transform="translate(2 2) scale(.83)" />
      </>
    ),
  };

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
      {icons[name]}
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      aria-hidden="true"
    >
      <path d="M5 12h14m-6-6 6 6-6 6" />
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
      className="size-4"
      aria-hidden="true"
    >
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 3.1 5.2 2 2 0 0 1 5.1 3h3a2 2 0 0 1 2 1.7l.5 2.8a2 2 0 0 1-.6 1.7L8.1 11a16 16 0 0 0 4.8 4.8l1.9-1.9a2 2 0 0 1 1.7-.6l2.8.5a2 2 0 0 1 1.7 2Z" />
    </svg>
  );
}

function Eyebrow({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="h-[2px] w-7 bg-brand-primary" />
      <span className="font-heading text-[10px] font-extrabold uppercase tracking-[0.16em] text-brand-primary-dark">
        {children}
      </span>
    </div>
  );
}

export function ExhibitorServicesClientView() {
  const reducedMotion = !!useReducedMotion();

  const revealProps = {
    initial: reducedMotion ? false : "hidden",
    whileInView: "visible" as const,
    viewport: {
      once: true,
      amount: 0.08,
    },
  };

  const organiserDesks = [
    {
      name: "Futurex Trade Fair & Events Pvt. Ltd.",
      phone: event.contact.futurex.phone,
      email: event.contact.futurex.email,
    },
    {
      name: "ASK Trade & Exhibitions Pvt. Ltd.",
      phone: event.contact.askTrade.phone,
      email: event.contact.askTrade.email,
    },
  ];

  return (
    <section
      aria-labelledby="exhibitor-services-heading"
      className="relative overflow-hidden bg-brand-light py-12 text-brand-dark sm:py-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(5,7,9,0.018)_1px,transparent_1px),linear-gradient(to_bottom,rgba(5,7,9,0.018)_1px,transparent_1px)] bg-[size:64px_64px]"
      />

      <Container className="relative z-10">
        {/* INTRO */}
        <motion.div
          {...revealProps}
          variants={reveal}
          className="flex flex-col gap-5 border-b border-brand-border pb-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-[740px]">
            <Eyebrow>
              Exhibitor Planning & Guidance
            </Eyebrow>

            <h2
              id="exhibitor-services-heading"
              className="mt-3 font-heading text-[clamp(1.5rem,2.7vw,2.1rem)] font-extrabold leading-[1.25] tracking-[-0.04em] text-brand-dark"
            >
              Plan Your{" "}
              <span className="text-brand-primary-dark">
                Exhibition Participation
              </span>
            </h2>

            <p className="mt-3 text-[13px] leading-[1.9] text-brand-body sm:text-sm">
              Practical guidance for companies
              planning their participation in the
              10th Bangladesh Buildcon International
              Expo 2026 at ICCB Exhibition Hall, Dhaka.
            </p>
          </div>

          <Link
            href={event.cta.bookStand}
            className="group inline-flex min-h-11 w-fit shrink-0 items-center justify-center gap-2 rounded-lg bg-brand-primary px-5 py-3 font-heading text-[12px] font-bold text-white transition-colors hover:bg-brand-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
          >
            Enquire for Stand Space
            <span className="transition-transform group-hover:translate-x-1">
              <ArrowIcon />
            </span>
          </Link>
        </motion.div>

        {/* SERVICE CARDS */}
        <motion.div
          variants={stagger}
          initial={reducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.06,
          }}
          className="mt-6 grid items-stretch gap-4 md:grid-cols-2"
        >
          {SERVICES.map((service, index) => (
            <motion.article
              key={service.id}
              id={service.id}
              variants={reveal}
              whileHover={
                reducedMotion ? undefined : { y: -4 }
              }
              transition={{
                duration: 0.26,
                ease: EASE,
              }}
              className="group relative flex h-full scroll-mt-28 flex-col overflow-hidden rounded-2xl border border-brand-border bg-white p-5 shadow-[0_5px_22px_rgba(5,7,9,0.035)] transition-[border-color,box-shadow] duration-300 hover:border-brand-primary/35 hover:shadow-[0_14px_34px_rgba(5,7,9,0.075)] sm:p-6"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-brand-primary transition-transform duration-300 group-hover:scale-x-100"
              />

              <div className="flex items-start justify-between gap-3">
                <span className="flex size-11 items-center justify-center rounded-xl bg-brand-primary-soft text-brand-primary-dark transition-colors duration-300 group-hover:bg-brand-primary group-hover:text-white">
                  <ServiceIcon name={service.icon} />
                </span>

                <span className="font-heading text-[11px] font-bold tabular-nums text-brand-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="rounded-md border border-brand-primary/15 bg-brand-primary-soft px-2.5 py-1 font-heading text-[10px] font-bold text-brand-primary-dark">
                  {service.tag}
                </span>

                <span className="rounded-md bg-brand-light px-2.5 py-1 font-heading text-[10px] font-semibold text-brand-muted">
                  {service.status}
                </span>
              </div>

              <h3 className="mt-4 font-heading text-[16px] font-extrabold leading-[1.45] tracking-[-0.025em] text-brand-dark">
                {service.title}
              </h3>

              <p className="mt-3 text-[13px] leading-[1.85] text-brand-body">
                {service.description}
              </p>

              <div className="mt-auto border-t border-brand-border pt-4">
                <Link
                  href={service.link.href}
                  className="group/link inline-flex min-h-10 items-center gap-2 font-heading text-[12px] font-bold text-brand-primary-dark underline-offset-4 transition-colors hover:text-brand-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
                >
                  {service.link.label}
                  <span className="transition-transform group-hover/link:translate-x-1">
                    <ArrowIcon />
                  </span>
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* ORGANISER CONTACTS */}
        <motion.section
          {...revealProps}
          variants={reveal}
          aria-labelledby="services-helpdesk-heading"
          className="mt-12 overflow-hidden rounded-2xl border border-brand-border bg-white p-5 shadow-[0_8px_30px_rgba(5,7,9,0.04)] sm:mt-14 sm:p-7"
        >
          <Eyebrow>Official Organisers</Eyebrow>

          <h2
            id="services-helpdesk-heading"
            className="mt-3 font-heading text-[20px] font-extrabold tracking-[-0.035em] text-brand-dark sm:text-[23px]"
          >
            Exhibitor{" "}
            <span className="text-brand-primary-dark">
              Assistance
            </span>
          </h2>

          <p className="mt-2 text-[13px] leading-[1.8] text-brand-body">
            Contact the organising team for participation
            and operational enquiries.
          </p>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {organiserDesks.map((desk) => (
              <div
                key={desk.name}
                className="min-w-0 rounded-xl border border-brand-border bg-brand-light p-4"
              >
                <h3 className="font-heading text-[13px] font-extrabold leading-[1.5] text-brand-dark">
                  {desk.name}
                </h3>

                <a
                  href={`tel:${desk.phone.replace(/[^0-9+]/g, "")}`}
                  className="mt-3 flex items-center gap-2 text-[12px] font-semibold text-brand-body hover:text-brand-primary-dark"
                >
                  <span className="text-brand-primary-dark">
                    <PhoneIcon />
                  </span>
                  {desk.phone}
                </a>

                <a
                  href={`mailto:${desk.email}`}
                  className="mt-2 block break-all text-[12px] font-semibold text-brand-primary-dark hover:underline"
                >
                  {desk.email}
                </a>
              </div>
            ))}
          </div>
        </motion.section>

        {/* SHORT CTA */}
        <motion.div
          {...revealProps}
          variants={reveal}
          className="mt-6 flex flex-col gap-4 rounded-2xl border border-brand-primary/20 bg-brand-primary-soft p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
        >
          <div>
            <h2 className="font-heading text-[17px] font-extrabold text-brand-dark">
              Planning to Exhibit at Bangladesh Buildcon?
            </h2>

            <p className="mt-2 text-[12px] leading-[1.8] text-brand-body">
              17–19 September 2026 · ICCB Exhibition
              Hall, Dhaka. Discuss your requirements
              with the organising team.
            </p>
          </div>

          <Link
            href={event.cta.bookStand}
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-brand-primary px-5 py-3 font-heading text-[12px] font-bold text-white transition-colors hover:bg-brand-primary-dark"
          >
            Book Exhibition Space
            <ArrowIcon />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
