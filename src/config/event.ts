
/**
 * Bangladesh Buildcon International Expo
 *
 * Single source of truth for:
 * - Event information
 * - Event dates
 * - Venue and map URLs
 * - Organisers
 * - All three event contact persons
 * - Social links
 * - CTA destinations
 *
 * Import this configuration instead of
 * hardcoding event data inside components.
 */

const VENUE_NAME =
  "International Convention City Bashundhara (ICCB)";

const VENUE_ADDRESS =
  "ICCB Expo Village, Dhaka, Bangladesh";

const VENUE_MAP_QUERY =
  "International Convention City Bashundhara ICCB Dhaka Bangladesh";

const ENCODED_VENUE_QUERY =
  encodeURIComponent(VENUE_MAP_QUERY);

/* ==========================================
   OFFICIAL EVENT CONTACT PERSONS
========================================== */

const EVENT_CONTACTS = [
  {
    id: "namit-gupta",
    name: "Mr. Namit Gupta",
    phone: "(+91) 9810855697",
    phoneHref: "+919810855697",
    email: "namit@futurextrade.com",
  },
] as const;

/* ==========================================
   MAIN EVENT CONFIGURATION
========================================== */

export const event = {
  name: "Bangladesh Buildcon International Expo 2027",

  shortName: "Bangladesh Buildcon",

  brandWord: "Buildcon",

  descriptor:
    "Bangladesh's largest B2B trade show for the building and construction industry",

  edition: "2027",

  editionLabel: "11th Edition",

  /* ========================================
     EVENT DATES
  ======================================== */

  dates: {
    start: "2027-11-11",
    end: "2027-11-13",

    display: "11-13 November 2027",
    displayShort: "11-13 NOV 2027",

    openingTimeConfirmed: false,

    countdownTargetIso:
      "2027-11-11T10:00:00+06:00",

    timezone: "Asia/Dhaka",
  },

  /* ========================================
     VENUE INFORMATION
  ======================================== */

  venue: {
    name: "ICCB Expo Village",

    officialName: VENUE_NAME,

    city: "Dhaka",

    country: "Bangladesh",

    address: VENUE_ADDRESS,

    fullLocation: VENUE_ADDRESS,

   
mapEmbedUrl:
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1734.5896797889998!2d90.42427724891962!3d23.826890967880026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c644f388b23f%3A0xf7cb2d027f5d65fb!2sICCB%20Expo%20Village%20Bangladesh!5e1!3m2!1sen!2sin!4v1793178815220!5m2!1sen!2sin",

mapLinkUrl:
  "https://maps.app.goo.gl/KCmz2YmruKw4JJPw6",


mapDirectionsUrl:
  "https://www.google.com/maps/dir/?api=1&destination=23.8264257%2C90.4239892",


  },

  /* ========================================
     EVENT CATEGORY
  ======================================== */

  format: "B2B Trade Exhibition",

  industry: "Building & Construction",

  website: "https://bangladeshbuildcon.com",

  websiteDisplay: "www.bangladeshbuildcon.com",

  /* ========================================
     BRAND MESSAGING
  ======================================== */

  brandLines: {
    main:
      "INNOVATION. MACHINERY. MATERIALS. PRODUCTS.",

    supporting:
      "Where Bangladesh's Building & Construction Industry Meets.",

    exhibitor:
      "Enter one of South Asia's fastest-growing building & construction markets.",

    visitor:
      "Discover products. Meet suppliers. Build partnerships.",
  },

  /* ========================================
     EVENT ORGANISERS
  ======================================== */

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

  /* ========================================
     EVENT CONTACT DETAILS

     Use event.contact.people for ALL
     person-contact sections.

     Legacy properties retained for
     existing component compatibility.
  ======================================== */

  contact: {
    /* All three event contacts */
    people: EVENT_CONTACTS,

    /* Named contacts for direct access */
    namit: EVENT_CONTACTS[0],

    vijayanka: EVENT_CONTACTS[0],

    vaibhav: EVENT_CONTACTS[0],

    /* ======================================
       BACKWARDS-COMPATIBLE CONTACT KEYS

       These support older components.
       New contact directories should always
       use event.contact.people.
    ====================================== */

    futurex: {
      company: "Futurex Group",
      name: EVENT_CONTACTS[0].name,
      email: EVENT_CONTACTS[0].email,
      phone: EVENT_CONTACTS[0].phone,
      phoneHref: EVENT_CONTACTS[0].phoneHref,
    },

    askTrade: {
      company: "ASK Trade & Exhibitions Pvt. Ltd.",
      name: EVENT_CONTACTS[0].name,
      email: EVENT_CONTACTS[0].email,
      phone: EVENT_CONTACTS[0].phone,
      phoneHref: EVENT_CONTACTS[0].phoneHref,
    },

    exhibitorEnquiries: {
      company: "Futurex Group",
      name: EVENT_CONTACTS[0].name,
      email: EVENT_CONTACTS[0].email,
      phone: EVENT_CONTACTS[0].phone,
      phoneHref: EVENT_CONTACTS[0].phoneHref,
    },

    internationalParticipation: {
      company: "ASK Trade & Exhibitions Pvt. Ltd.",
      name: EVENT_CONTACTS[0].name,
      email: EVENT_CONTACTS[0].email,
      phone: EVENT_CONTACTS[0].phone,
      phoneHref: EVENT_CONTACTS[0].phoneHref,
    },

    general: {
      company: "Futurex Group",
      name: EVENT_CONTACTS[0].name,
      email: EVENT_CONTACTS[0].email,
      phone: EVENT_CONTACTS[0].phone,
      phoneHref: EVENT_CONTACTS[0].phoneHref,
    },

    office: {
      address:
        "House 1117 (3rd Floor), Road 9 (Main Road), Sarkarbari, Mirpur DOHS, Dhaka 1216, Bangladesh",
    },
  },

  /* ========================================
     SOCIAL MEDIA
  ======================================== */

  social: {
    linkedin:
      process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN || "",

    facebook:
      process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK || "",

    instagram:
      process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM || "",

    twitter:
      process.env.NEXT_PUBLIC_SOCIAL_TWITTER || "",

    youtube:
      process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE || "",
  },

  /* ========================================
     CTA DESTINATIONS
  ======================================== */

  cta: {
    bookStand: "/book-a-stand",

    registerVisit: "/register-to-visit",
  },

  /* ========================================
     EXHIBITOR DIRECTORY
  ======================================== */

  exhibitorDirectoryMinimum: 6,
} as const;

/* ==========================================
   TYPES
========================================== */

export type EventConfig = typeof event;

export type EventContact =
  (typeof event.contact.people)[number];

/* Optional convenient export */
export const eventContacts = event.contact.people;
