/**
 * Single source of truth for all event facts, contact details and CTA
 * destinations. Every component must import from here rather than
 * hardcoding dates, venue names or contact details.
 */

export const event = {
  name: "Bangladesh Buildcon International Expo 2027",
  shortName: "Bangladesh Buildcon",
  brandWord: "Buildcon",
  descriptor: "Bangladesh's largest B2B trade show for the building and construction industry",
  edition: "2027",
  editionLabel: "11th Edition",

  dates: {
    start: "2027-11-11",
    end: "2027-11-13",
    display: "11-13 November 2027",
    displayShort: "11-13 NOV 2027",
    openingTimeConfirmed: false,
    countdownTargetIso: "2027-11-11T10:00:00+06:00",
    timezone: "Asia/Dhaka",
  },

  venue: {
    name: "ICCB Exhibition Hall",
    city: "Dhaka",
    country: "Bangladesh",
    fullLocation: "ICCB Exhibition Hall, Dhaka, Bangladesh",
    mapEmbedUrl:
      "https://www.google.com/maps?q=International+Convention+City+Bashundhara+Dhaka+Bangladesh&output=embed",
    mapLinkUrl:
      "https://www.google.com/maps/search/?api=1&query=International+Convention+City+Bashundhara+Dhaka+Bangladesh",
  },

  format: "B2B Trade Exhibition",
  industry: "Building & Construction",
  website: "https://bangladeshbuildcon.com",
  websiteDisplay: "www.bangladeshbuildcon.com",

  brandLines: {
    main: "INNOVATION. MACHINERY. MATERIALS. PRODUCTS.",
    supporting: "Where Bangladesh's Building & Construction Industry Meets.",
    exhibitor: "Enter one of South Asia's fastest-growing construction markets.",
    visitor: "Discover products. Meet suppliers. Build partnerships.",
  },

  organisers: [
    {
      name: "Futurex Trade Fair & Events Pvt. Ltd.",
      logo: "/logos/futurex-logo.png",
      url: "https://www.futurextrade.com/",
    },
    {
      name: "ASK Trade & Exhibitions Pvt. Ltd.",
      logo: "/logos/ask-trade-logo.png",
      url: "https://www.asktradex.com/",
    },
  ],

  contact: {
    futurex: {
      company: "Futurex Group",
      name: "Event Enquiries",
      email: "info@futurextrade.com",
      phone: "(+91) 9810855697",
    },
    askTrade: {
      company: "ASK Trade & Exhibitions Pvt. Ltd.",
      name: "Dhaka Event Desk",
      email: "info@asktradex.com",
      phone: "+880 1678447822",
    },
    // Backwards-compatible aliases (jahan pehle se import ho)
    exhibitorEnquiries: {
      company: "Futurex Group",
      name: "Event Enquiries",
      email: "info@futurextrade.com",
      phone: "(+91) 9810855697",
    },
    internationalParticipation: {
      company: "ASK Trade & Exhibitions Pvt. Ltd.",
      name: "Dhaka Event Desk",
      email: "info@asktradex.com",
      phone: "+880 1678447822",
    },
    general: {
      company: "Futurex Group",
      name: "Event Enquiries",
      email: "info@futurextrade.com",
      phone: "(+91) 9810855697",
    },
    office: {
      address: "House 1117 (3rd Floor), Road 9 (Main Road), Sarkarbari, Mirpur DOHS, Dhaka 1216, Bangladesh",
    },
  },

  social: {
    linkedin: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN || "",
    facebook: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK || "",
    instagram: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM || "",
    twitter: process.env.NEXT_PUBLIC_SOCIAL_TWITTER || "",
    youtube: process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE || "",
  },

  cta: {
    bookStand: "/book-a-stand",
    registerVisit: "/register-to-visit",
  },

  exhibitorDirectoryMinimum: 6,
} as const;

export type EventConfig = typeof event;
