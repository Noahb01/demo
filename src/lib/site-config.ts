export const siteConfig = {
  name: "ShipShelter",
  tagline: "Protect your vessel in a private boat house",
  description:
    "Exclusive covered boat houses and premium indoor berthing for luxury yachts. Private indoor boat slips, safe winter storage, and maintenance-free docking in scarce indoor berths.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://shipshelter.example.com",
  keywords: [
    "Covered boat house for sale",
    "Private indoor boat slip",
    "Luxury yacht garage",
    "Premium berthing",
    "Safe winter storage",
    "Maintenance-free docking",
    "Real estate for boat owners",
  ],
  email: "hello@shipshelter.example.com",
};
