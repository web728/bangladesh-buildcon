
export type NavItem = {
  label: string;
  href: string;
  children?: {
    label: string;
    href: string;
    description?: string;
  }[];
};

export const mainNav: NavItem[] = [
  {
    label: "About",
    href: "/about",
    children: [
      {
        label: "About the Exhibition",
        href: "/about",
        description: "Overview of the exhibition and its key highlights.",
      },
      {
        label: "Why Bangladesh",
        href: "/why-bangladesh",
        description: "Explore Bangladesh's building and construction market.",
      },
      {
        label: "Exhibition Venue",
        href: "/venue",
        description: "ICCB Expo Village, Dhaka, Bangladesh.",
      },
      {
        label: "Organisers",
        href: "/organisers",
        description: "Meet the official exhibition organisers.",
      },
    ],
  },

  {
    label: "Exhibit",
    href: "/exhibit",
    children: [
      {
        label: "Why Exhibit",
        href: "/exhibit",
        description: "Explore the benefits of exhibiting.",
      },
      {
        label: "Exhibitor Profile",
        href: "/exhibition-profile",
        description: "Explore exhibiting sectors and product categories.",
      },
      {
        label: "Book a Stand",
        href: "/book-a-stand",
        description: "Enquire about exhibition stand space.",
      },
    ],
  },

  {
    label: "Visit",
    href: "/visit",
    children: [
      {
        label: "Explore the Exhibition",
        href: "/visit",
        description: "Discover products, technologies, and visitor opportunities.",
      },
      {
        label: "Who Should Visit",
        href: "/who-should-visit",
        description: "Explore the visitor profile and industry sectors.",
      },
      {
        label: "Visitor Registration",
        href: "/register-to-visit",
        description: "Register to attend the exhibition.",
      },
    ],
  },

  
{
  label: "Media & Resources",
  href: "/gallery",
  children: [
    {
      label: "Gallery",
      href: "/gallery",
      description: "View photos and highlights from previous editions.",
    },
    {
      label: "Exhibition Brochure",
      href: "/downloads",
      description: "Request the exhibition brochure and information.",
    },
    {
      label: "Post Show Report",
      href: "/downloads/11th_Bangladesh_Buildcon_International_Expo_Post_Show_Report_2027.pdf",
      description: "Download the exhibition post-show report.",
    },
  ],
},

  {
    label: "Contact",
    href: "/contact",
  },
];

export const footerNav = {
  event: [
    { label: "About the Exhibition", href: "/about" },
    { label: "Why Bangladesh", href: "/why-bangladesh" },
    { label: "Exhibition Venue", href: "/venue" },
    { label: "Organisers", href: "/organisers" },
    { label: "Exhibitor Profile", href: "/exhibition-profile" },
  ],

  exhibit: [
    { label: "Why Exhibit", href: "/exhibit" },
    { label: "Exhibitor Profile", href: "/exhibition-profile" },
    { label: "Book a Stand", href: "/book-a-stand" },
  ],

  visit: [
    { label: "Explore the Exhibition", href: "/visit" },
    { label: "Who Should Visit", href: "/who-should-visit" },
    { label: "Visitor Registration", href: "/register-to-visit" },
    { label: "Exhibition Venue", href: "/venue" },
  ],

  information: [
    { label: "Gallery", href: "/gallery" },
    { label: "Exhibition Brochure", href: "/downloads" },
    { label: "Contact Us", href: "/contact" },
  ],

  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
    { label: "Cookie Policy", href: "/cookie-policy" },
  ],
};
