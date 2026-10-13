
import type { Metadata } from "next";

import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { PrivacyPolicyContent } from "@/components/legal/PrivacyPolicyContent";

const PAGE_PATH = "/privacy-policy";

const PAGE_TITLE =
  "Privacy Policy | Bangladesh Buildcon International Expo 2026";

const PAGE_DESCRIPTION =
  `Read the Privacy Policy for ${event.name}. ` +
  `Learn about personal information submitted through ` +
  `exhibition enquiries, registrations and contact forms, ` +
  `including data use, sharing, cookies and privacy requests.`;

export const metadata: Metadata = {
  title: {
    absolute: PAGE_TITLE,
  },

  description: PAGE_DESCRIPTION,

  alternates: {
    canonical: PAGE_PATH,
  },

  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_PATH,
    type: "website",
    siteName: event.name,
    locale: "en_US",
  },

  twitter: {
    card: "summary",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
    },
  },
};

export default function PrivacyPolicyPage() {
  let pageUrl: string | null = null;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (siteUrl) {
    try {
      const origin = new URL(siteUrl);

      if (
        origin.protocol === "https:" ||
        origin.protocol === "http:"
      ) {
        pageUrl = new URL(
          PAGE_PATH,
          origin.origin
        ).toString();
      }
    } catch {
      pageUrl = null;
    }
  }

  const jsonLd = pageUrl
    ? {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: PAGE_TITLE,
        description: PAGE_DESCRIPTION,
        url: pageUrl,
        isPartOf: {
          "@type": "WebSite",
          name: event.name,
          url: new URL("/", pageUrl).toString(),
        },
        about: [
          {
            "@type": "Organization",
            name: "Futurex Trade Fair & Events Pvt. Ltd.",
          },
          {
            "@type": "Organization",
            name: "ASK Trade & Exhibitions Pvt. Ltd.",
          },
        ],
      }
    : null;

  return (
    <main className="min-h-screen bg-brand-light text-brand-dark selection:bg-brand-primary selection:text-white">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(
              /</g,
              "\\u003c"
            ),
          }}
        />
      )}

      <PageHero
        title="Website"
        highlightTitle="Privacy Policy"
        badgeText="Privacy & Data Protection"
        intro={`Information about personal data submitted through the ${event.name} website, how it may be processed and how to contact the organising team.`}
      />

      <PrivacyPolicyContent />
    </main>
  );
}
