/**
 * Cited market statistics used across the site (homepage, Why Bangladesh).
 * Every entry must carry a verifiable source. Remove an entry rather than
 * publish an unsourced figure.
 */

export type MarketFact = {
  id: string;
  value: string;
  label: string;
  detail?: string;
  period?: string;
  sourceName: string;
  sourceUrl?: string;
  lastVerified: string; // YYYY-MM-DD
};

export const marketFacts: MarketFact[] = [
  {
    id: "construction-gdp",
    value: "8%+",
    label: "Contribution to national GDP",
    detail:
      "The exhibition brochure reports that Bangladesh's building & construction sector contributes over 8% to GDP.",
    period: "2027 event brochure",
    sourceName: "11th Bangladesh Buildcon 2027 Brochure",
    lastVerified: "2027-10-09",
  },
  {
    id: "population",
    value: "170M+",
    label: "Population driving urban demand",
    detail:
      "The exhibition brochure cites a population exceeding 170 million and rapid urbanisation as drivers of housing and infrastructure demand.",
    period: "2027 event brochure",
    sourceName: "11th Bangladesh Buildcon 2027 Brochure",
    lastVerified: "2027-10-09",
  },
  {
    id: "trade-visitors",
    value: "7,000+",
    label: "Trade visitors at the previous edition",
    detail:
      "The 2025 post-show report records more than 7,000 trade visitors and more than 200 exhibiting companies.",
    period: "2025 post-show report",
    sourceName: "9th Bangladesh Buildcon 2025 Post-Show Report",
    lastVerified: "2027-10-09",
  },
];

export const opportunityCategories: string[] = [
  "Residential Development",
  "Commercial Construction",
  "Roads & Infrastructure",
  "Industrial Projects",
  "Hotels & Hospitality",
  "Warehousing & Logistics",
  "Water & Utility Projects",
  "Public Infrastructure",
  "Renovation & Interior Projects",
];

export const marketSources = [
  { name: "11th Bangladesh Buildcon 2027 Brochure", url: "/downloads/Bangladesh-Buildcon-Expo-Brochure-2027.pdf" },
  { name: "9th Bangladesh Buildcon 2025 Post-Show Report", url: "/downloads/Bangladesh-Buildcon-Post-Show-Report-2025.pdf" },
];
