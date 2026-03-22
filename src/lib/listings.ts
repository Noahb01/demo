import type { PortableTextBlock } from "@portabletext/types";
import { demoListings } from "@/lib/demo-listings";
import { getSanityClient, isSanityConfigured } from "@/lib/sanity/client";
import {
  featuredListingsQuery,
  listingBySlugQuery,
  listingsQuery,
} from "@/lib/sanity/queries";
import type { Listing, ListingImage, PowerSupply } from "@/types/listing";

type SanityListingRow = {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  featured: boolean;
  body?: PortableTextBlock[];
  heroImage?: { asset?: { _ref: string }; alt?: string };
  gallery?: Array<{ _key: string; asset?: { _ref: string }; alt?: string }>;
  lengthM: number;
  beamM: number;
  clearanceM: number;
  depthM: number;
  powerSupply: PowerSupply;
  locationLabel: string;
  address?: string;
  lat: number;
  lng: number;
  waterwayNote?: string;
  metaTitle?: string;
  metaDescription?: string;
};

function mapRow(row: SanityListingRow): Listing {
  return {
    _id: row._id,
    title: row.title,
    slug: row.slug,
    shortDescription: row.shortDescription,
    featured: Boolean(row.featured),
    body: row.body?.length ? row.body : undefined,
    heroImage: row.heroImage
      ? {
          _key: "hero",
          asset: row.heroImage.asset,
          alt: row.heroImage.alt,
        }
      : undefined,
    gallery: (row.gallery || []).map((g, i) => ({
      _key: g._key || `g-${i}`,
      asset: g.asset,
      alt: g.alt,
    })),
    lengthM: row.lengthM,
    beamM: row.beamM,
    clearanceM: row.clearanceM,
    depthM: row.depthM,
    powerSupply: row.powerSupply,
    locationLabel: row.locationLabel,
    address: row.address,
    lat: row.lat,
    lng: row.lng,
    waterwayNote: row.waterwayNote,
    metaTitle: row.metaTitle,
    metaDescription: row.metaDescription,
  };
}

export async function getAllListings(): Promise<Listing[]> {
  const client = getSanityClient();
  if (!client) return demoListings;
  try {
    const rows = await client.fetch<SanityListingRow[]>(listingsQuery);
    if (!rows?.length) return demoListings;
    return rows.map(mapRow);
  } catch {
    return demoListings;
  }
}

export async function getFeaturedListings(): Promise<Listing[]> {
  const client = getSanityClient();
  if (!client) return demoListings.filter((l) => l.featured);
  try {
    const rows = await client.fetch<SanityListingRow[]>(
      featuredListingsQuery,
    );
    if (!rows?.length) return demoListings.filter((l) => l.featured);
    return rows.map(mapRow);
  } catch {
    return demoListings.filter((l) => l.featured);
  }
}

export async function getListingBySlug(
  slug: string,
): Promise<Listing | null> {
  const client = getSanityClient();
  if (!client) {
    return demoListings.find((l) => l.slug === slug) ?? null;
  }
  try {
    const row = await client.fetch<SanityListingRow | null>(
      listingBySlugQuery,
      { slug },
    );
    if (row) return mapRow(row);
    return demoListings.find((l) => l.slug === slug) ?? null;
  } catch {
    return demoListings.find((l) => l.slug === slug) ?? null;
  }
}

export function getListingImage(
  listing: Listing,
): ListingImage | undefined {
  if (listing.heroImage?.asset) return listing.heroImage;
  const first = listing.gallery[0];
  return first;
}

export { isSanityConfigured };
