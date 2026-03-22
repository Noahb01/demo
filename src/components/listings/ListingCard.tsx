import Link from "next/link";
import { getListingImage } from "@/lib/listings";
import { formatMeters, formatPowerSupply } from "@/lib/format";
import type { Listing } from "@/types/listing";
import { ListingCoverImage } from "./ListingImage";

export function ListingCard({ listing }: { listing: Listing }) {
  const img = getListingImage(listing);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-sm shadow-black/20 transition hover:border-chrome/30 hover:bg-white/[0.06]">
      <Link href={`/listings/${listing.slug}`} className="block">
        <ListingCoverImage
          listing={listing}
          image={img}
          sizes="(max-width: 768px) 100vw, 33vw"
          className="aspect-[4/3]"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-silver-400">
            {listing.locationLabel}
          </p>
          <Link
            href={`/listings/${listing.slug}`}
            className="mt-1 font-display text-lg font-semibold text-white transition group-hover:text-silver-100"
          >
            {listing.title}
          </Link>
        </div>
        <p className="line-clamp-2 text-sm text-slate-400">
          {listing.shortDescription}
        </p>
        <dl className="grid grid-cols-2 gap-2 text-xs text-slate-300">
          <div>
            <dt className="text-slate-500">Length</dt>
            <dd>{formatMeters(listing.lengthM)}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Beam</dt>
            <dd>{formatMeters(listing.beamM)}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Power</dt>
            <dd>{formatPowerSupply(listing.powerSupply)}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Clearance</dt>
            <dd>{formatMeters(listing.clearanceM)}</dd>
          </div>
        </dl>
        <Link
          href={`/listings/${listing.slug}`}
          className="mt-auto inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:border-chrome/50 hover:bg-white/10"
        >
          View details
        </Link>
      </div>
    </article>
  );
}
