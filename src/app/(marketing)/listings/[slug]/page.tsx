import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { InquiryForm } from "@/components/listings/InquiryForm";
import { ListingBody } from "@/components/listings/ListingBody";
import { ListingGallery } from "@/components/listings/ListingGallery";
import { JsonLd } from "@/components/seo/JsonLd";
import { formatMeters, formatPowerSupply } from "@/lib/format";
import { getListingBySlug } from "@/lib/listings";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 60;

const ListingMap = dynamic(
  () =>
    import("@/components/listings/ListingMap").then((m) => m.ListingMap),
  { ssr: false, loading: () => <p className="text-slate-400">Loading map…</p> },
);

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const listing = await getListingBySlug(slug);
  if (!listing) return { title: "Not found" };

  const title =
    listing.metaTitle ||
    `${listing.title} | Luxury yacht garage & premium berthing`;
  const description =
    listing.metaDescription ||
    `${listing.shortDescription} Private indoor boat slip with ${formatMeters(listing.lengthM)} length, ${formatMeters(listing.beamM)} beam, ${formatMeters(listing.clearanceM)} clearance.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteConfig.url}/listings/${listing.slug}`,
    },
    keywords: siteConfig.keywords,
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/listings/${listing.slug}`,
    },
  };
}

export default async function ListingDetailPage({ params }: Props) {
  const { slug } = await params;
  const listing = await getListingBySlug(slug);
  if (!listing) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: listing.title,
    description: listing.shortDescription,
    category: "Real estate for boat owners",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: `${siteConfig.url}/listings/${listing.slug}`,
    },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <section className="border-b border-white/10 bg-gradient-to-b from-navy-900 to-navy-950 py-16">
        <Container>
          <Link
            href="/listings"
            className="text-sm text-silver-400 transition hover:text-white"
          >
            ← All listings
          </Link>
          <p className="mt-4 text-sm font-medium uppercase tracking-wider text-silver-400">
            {listing.locationLabel}
          </p>
          <h1 className="mt-2 max-w-4xl font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {listing.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-300">
            {listing.shortDescription}
          </p>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <h2 className="font-display text-2xl font-semibold text-white">
            Gallery
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            High-resolution views of the indoor berth and access.
          </p>
          <div className="mt-8">
            <ListingGallery listing={listing} />
          </div>
        </Container>
      </section>

      <section className="border-y border-white/10 bg-navy-900/40 py-12 sm:py-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
            <div>
              <h2 className="font-display text-2xl font-semibold text-white">
                Technical specifications
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                Clear dimensions for indoor navigation and winter storage
                planning.
              </p>
              <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
                <table className="w-full text-left text-sm">
                  <tbody className="divide-y divide-white/10">
                    <tr className="bg-navy-950/90">
                      <th className="px-4 py-3 font-medium text-slate-400">
                        Clearance height
                      </th>
                      <td className="px-4 py-3 text-white">
                        {formatMeters(listing.clearanceM)}
                      </td>
                    </tr>
                    <tr>
                      <th className="px-4 py-3 font-medium text-slate-400">
                        Beam width
                      </th>
                      <td className="px-4 py-3 text-white">
                        {formatMeters(listing.beamM)}
                      </td>
                    </tr>
                    <tr className="bg-navy-950/90">
                      <th className="px-4 py-3 font-medium text-slate-400">
                        Depth
                      </th>
                      <td className="px-4 py-3 text-white">
                        {formatMeters(listing.depthM)}
                      </td>
                    </tr>
                    <tr>
                      <th className="px-4 py-3 font-medium text-slate-400">
                        Length (berth)
                      </th>
                      <td className="px-4 py-3 text-white">
                        {formatMeters(listing.lengthM)}
                      </td>
                    </tr>
                    <tr className="bg-navy-950/90">
                      <th className="px-4 py-3 font-medium text-slate-400">
                        Power supply
                      </th>
                      <td className="px-4 py-3 text-white">
                        {formatPowerSupply(listing.powerSupply)}
                      </td>
                    </tr>
                    {listing.address ? (
                      <tr>
                        <th className="px-4 py-3 font-medium text-slate-400">
                          Address
                        </th>
                        <td className="px-4 py-3 text-white">
                          {listing.address}
                        </td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>

              {listing.body && listing.body.length > 0 ? (
                <div className="mt-12">
                  <ListingBody blocks={listing.body} />
                </div>
              ) : null}
            </div>

            <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
              <InquiryForm listing={listing} />
            </aside>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <h2 className="font-display text-2xl font-semibold text-white">
            Location & waterways
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">
            Proximity to open water and main navigation channels.{" "}
            {listing.waterwayNote ? (
              <span className="text-slate-300">{listing.waterwayNote}</span>
            ) : null}
          </p>
          <div className="mt-8">
            <ListingMap
              lat={listing.lat}
              lng={listing.lng}
              title={listing.title}
            />
          </div>
        </Container>
      </section>
    </>
  );
}
