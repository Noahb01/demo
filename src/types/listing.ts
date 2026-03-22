import type { PortableTextBlock } from "@portabletext/types";

export type PowerSupply = "16A" | "32A" | "63A" | "three_phase";

export type ListingImage = {
  _key: string;
  asset?: { _ref: string; _type: "reference" };
  alt?: string;
  url?: string;
};

export type Listing = {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  featured: boolean;
  body?: PortableTextBlock[];
  gallery: ListingImage[];
  heroImage?: ListingImage;
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
