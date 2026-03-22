import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ListingCard } from "@/components/listings/ListingCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { getFeaturedListings } from "@/lib/listings";
import { siteConfig } from "@/lib/site-config";

export async function HomePage() {
  const featured = await getFeaturedListings();

  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  };

  return (
    <>
      <JsonLd data={org} />
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,220,230,0.12),transparent_55%)]" />
        <Container className="relative py-24 sm:py-32 lg:py-40">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-silver-400">
              Maritime premium · Indoor berthing
            </p>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              {siteConfig.tagline}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              Exclusive covered boat houses — not residential houseboats, but
              premium indoor docking garages for boats and yachts. Safe winter
              storage, maintenance-free docking, and scarcity-level real estate
              for boat owners who protect value.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/listings"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-navy-950 transition hover:bg-silver-100"
              >
                View covered boat houses for sale
              </Link>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:border-chrome/60 hover:bg-white/5"
              >
                Speak with us
              </a>
            </div>
            <p className="mt-8 text-xs text-slate-500">
              Keywords: luxury yacht garage, private indoor boat slip, premium
              berthing, covered boat house for sale.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-b border-white/10 bg-navy-900/50 py-20 sm:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
              Why owners choose indoor berthing
            </h2>
            <p className="mt-4 text-slate-400">
              A private boat house shields your vessel from the elements and
              preserves resale value — with less downtime and fewer haul-outs.
            </p>
          </div>
          <ul className="mt-14 grid gap-8 md:grid-cols-3">
            <li className="rounded-2xl border border-white/10 bg-navy-950/60 p-8">
              <div className="text-sm font-semibold uppercase tracking-wider text-silver-400">
                Protection
              </div>
              <h3 className="mt-3 font-display text-xl text-white">
                UV & weather
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                Enclosed shelter reduces gelcoat fade, deck wear, and storm
                exposure compared to open marina slips.
              </p>
            </li>
            <li className="rounded-2xl border border-white/10 bg-navy-950/60 p-8">
              <div className="text-sm font-semibold uppercase tracking-wider text-silver-400">
                Economics
              </div>
              <h3 className="mt-3 font-display text-xl text-white">
                Lower upkeep
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                Less hull cleaning and painting cycles — maintenance-free docking
                in a controlled environment.
              </p>
            </li>
            <li className="rounded-2xl border border-white/10 bg-navy-950/60 p-8">
              <div className="text-sm font-semibold uppercase tracking-wider text-silver-400">
                Investment
              </div>
              <h3 className="mt-3 font-display text-xl text-white">
                Scarcity & value
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                Indoor berths are rare. Ownership aligns with long-term value
                retention for serious maritime investors.
              </p>
            </li>
          </ul>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
                Featured availability
              </h2>
              <p className="mt-2 max-w-xl text-slate-400">
                A selection of premium berths — dimensions, power, and
                waterway access vary by site.
              </p>
            </div>
            <Link
              href="/listings"
              className="inline-flex w-fit rounded-full border border-white/20 px-5 py-2 text-sm font-medium text-white hover:border-chrome/50"
            >
              Browse all listings
            </Link>
          </div>
          <ul className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((listing) => (
              <li key={listing._id}>
                <ListingCard listing={listing} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-t border-white/10 bg-navy-900/40 py-16">
        <Container>
          <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-white/10 bg-gradient-to-r from-navy-900/80 to-navy-800/80 px-8 py-10 text-center sm:flex-row sm:text-left">
            <div>
              <p className="font-display text-xl font-semibold text-white">
                Ready for a private indoor boat slip?
              </p>
              <p className="mt-2 text-sm text-slate-400">
                We respond to direct inquiries with documentation and scheduling.
              </p>
            </div>
            <Link
              href="/listings"
              className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-navy-950 hover:bg-silver-100"
            >
              Explore listings
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
