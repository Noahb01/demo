import Image from "next/image";
import { urlForImage } from "@/lib/sanity/image";
import type { Listing } from "@/types/listing";

const FALLBACK =
  "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1600&q=80";

export function ListingGallery({ listing }: { listing: Listing }) {
  const urls = listing.gallery
    .map((g, i) => {
      const url = g.asset ? urlForImage(g, 2000) : null;
      if (!url) return null;
      return { url, alt: g.alt || `${listing.title} — photo ${i + 1}` };
    })
    .filter(Boolean) as { url: string; alt: string }[];

  const images =
    urls.length > 0
      ? urls
      : [{ url: FALLBACK, alt: `${listing.title} — covered boat house` }];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {images.map((img, i) => (
        <div
          key={`${img.url}-${i}`}
          className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-navy-900"
        >
          <Image
            src={img.url}
            alt={img.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover"
            priority={i === 0}
            loading={i === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}
    </div>
  );
}
