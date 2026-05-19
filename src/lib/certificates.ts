// Data-driven certificates list. Adding a 5th = add entry + drop the JPG.
// source: spec § Phase D — JPG badges, NOT PDFs. MCP image pending from Steven.
// Bug fixed in transit: original AwardSection.tsx had MCSA/MCSD images swapped (L28/L29).

export type Certificate = {
  slug: string;
  title: string;
  issuer: string;
  year: number;
  image?: string; // path in /public/certificates/ — undefined → "asset pending"
};

export const CERTIFICATES: Certificate[] = [
  {
    slug: "cs50",
    title: "CS50: Introduction to AI with Python",
    issuer: "Harvard / edX",
    year: 2024,
    image: "/certificates/cs50.jpg",
  },
  {
    slug: "mcsa",
    title: "MCSA: Web Applications",
    issuer: "Microsoft",
    year: 2018,
    image: "/certificates/mcsa.jpg",
  },
  {
    slug: "mcsd",
    title: "MCSD: App Builder",
    issuer: "Microsoft",
    year: 2018,
    image: "/certificates/mcsd.jpg",
  },
  {
    slug: "mcp",
    title: "Microsoft Certified Professional",
    issuer: "Microsoft",
    year: 2018,
    image: undefined, // pending Steven — see implementation-notes D24
  },
];
