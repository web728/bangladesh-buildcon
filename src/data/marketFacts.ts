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
    label: "Contribution to National GDP",
    detail:
      "Bangladesh’s building and construction sector plays an important role in the country’s economy and contributes to its continued growth.",
    period: "2027 event brochure",
    sourceName: "11th Bangladesh Buildcon 2027 Brochure",
    lastVerified: "2027-10-09",
  },
  {
    id: "population",
    value: "170M+",
    label: "A Large and Growing Market",
    detail:
      "With a population of over 170 million, Bangladesh offers opportunities for businesses serving the growing demand for homes, commercial buildings, construction materials, and infrastructure.",
    period: "2027 event brochure",
    sourceName: "11th Bangladesh Buildcon 2027 Brochure",
    lastVerified: "2027-10-09",
  },
  {
    id: "trade-visitors",
    value: "7,000+",
    label: "Trade visitors at the previous edition",
    detail:
      "The previous edition welcomed more than 7,000 trade visitors and over 200 exhibiting companies, creating opportunities to showcase products, build connections, and explore new business prospects.",
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
  { name: "11th Bangladesh Buildcon 2027 Brochure", url: "/downloads" },
  {
    name: "11th Bangladesh Buildcon 2027 Post-Show Report",
    url: "/downloads/11th_Bangladesh_Buildcon_International_Expo_Post_Show_Report_2027.pdf",
  },
];
