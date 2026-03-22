import Image from "next/image";
import { urlForImage } from "@/lib/sanity/image";
import type { Listing, ListingImage as ListingImageType } from "@/types/listing";

const FALLBACK =
  "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80";

export function ListingCoverImage({
  listing,
  image,
  priority,
  sizes,
  className,
}: {
  listing: Listing;
  image?: ListingImageType;
  priority?: boolean;
  sizes: string;
  className?: string;
}) {
  const url = image?.asset ? urlForImage(image, 1400) : null;
  const alt = image?.alt || `${listing.title} — covered boat house`;

  return (
    <div className={`relative overflow-hidden bg-navy-800 ${className ?? ""}`}>
      <Image
        src={url || FALLBACK}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover object-center transition duration-500 hover:scale-[1.02]"
        priority={priority}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
    </div>
  );
}
