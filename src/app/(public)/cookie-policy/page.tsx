
import type { Metadata } from "next";

import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { CookiePolicyContent } from "@/components/legal/CookiePolicyContent";

const PAGE_TITLE =
  "Cookie Policy | Bangladesh Buildcon International Expo 2027";

const PAGE_DESCRIPTION =
  `Read the Cookie Policy for ${event.name}. ` +
  `Learn about essential cookies, optional analytics and ` +
  `marketing technologies, cookie preferences, third-party ` +
  `services and privacy contact information.`;

export const metadata: Metadata = {
  title: {
    absolute: PAGE_TITLE,
  },

  description: PAGE_DESCRIPTION,

  alternates: {
    canonical: "/cookie-policy",
  },

  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: "/cookie-policy",
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
  },
};

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-brand-light text-brand-dark selection:bg-brand-primary selection:text-white">
      <PageHero
        title="Cookie"
        highlightTitle="Policy"
        badgeText="Website Privacy Information"
        intro="Learn about cookies, related website technologies and how to manage your browser preferences."
      />

      <CookiePolicyContent />
    </main>
  );
}
