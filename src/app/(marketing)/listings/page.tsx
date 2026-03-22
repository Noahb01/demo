import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/layout/Container";
import { ListingsClient } from "@/components/listings/ListingsClient";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllListings } from "@/lib/listings";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Covered boat houses for sale | Private indoor boat slips",
  description:
    "Browse premium covered boat houses and luxury yacht garage berthing. Filter by location, dimensions, and power supply. Private indoor boat slips with maintenance-free docking.",
  alternates: {
    canonical: `${siteConfig.url}/listings`,
  },
  keywords: siteConfig.keywords,
};

export default async function ListingsPage() {
  const listings = await getAllListings();

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "ShipShelter boat house listings",
    numberOfItems: listings.length,
    itemListElement: listings.map((l, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${siteConfig.url}/listings/${l.slug}`,
      name: l.title,
    })),
  };

  return (
    <>
      <JsonLd data={itemList} />
      <section className="border-b border-white/10 bg-gradient-to-b from-navy-900 to-navy-950 py-16 sm:py-20">
        <Container>
          <p className="text-sm font-medium uppercase tracking-wider text-silver-400">
            Inventory
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Covered boat house for sale — private indoor boat slips
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            Explore exclusive indoor berthing: luxury yacht garage spaces with
            defined clearance, beam, depth, and shore power — curated for
            owners who value protection and long-term value retention.
          </p>
        </Container>
      </section>
      <section className="py-14 sm:py-16">
        <Container>
          <Suspense
            fallback={
              <p className="text-slate-400">Loading listings…</p>
            }
          >
            <ListingsClient listings={listings} />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
