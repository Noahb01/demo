"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Listing, PowerSupply } from "@/types/listing";
import { ListingCard } from "./ListingCard";

const POWERS: PowerSupply[] = ["16A", "32A", "63A", "three_phase"];

function parseNum(v: string | null): number | undefined {
  if (v === null || v === "") return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
}

export function ListingsClient({ listings }: { listings: Listing[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const location = searchParams.get("location") || "";
  const minLength = parseNum(searchParams.get("minLength"));
  const maxBeam = parseNum(searchParams.get("maxBeam"));
  const power = (searchParams.get("power") || "") as PowerSupply | "";

  const locations = useMemo(
    () =>
      Array.from(new Set(listings.map((l) => l.locationLabel))).sort(
        (a, b) => a.localeCompare(b),
      ),
    [listings],
  );

  const setParam = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(searchParams.toString());
      if (value === "") next.delete(key);
      else next.set(key, value);
      const q = next.toString();
      router.replace(q ? `${pathname}?${q}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const filtered = useMemo(() => {
    return listings.filter((l) => {
      if (location && l.locationLabel !== location) return false;
      if (minLength !== undefined && l.lengthM < minLength) return false;
      if (maxBeam !== undefined && l.beamM > maxBeam) return false;
      if (power && l.powerSupply !== power) return false;
      return true;
    });
  }, [listings, location, minLength, maxBeam, power]);

  return (
    <div className="space-y-10">
      <div className="rounded-2xl border border-white/10 bg-navy-900/60 p-4 sm:p-6">
        <p className="font-display text-lg font-semibold text-white">
          Filter availability
        </p>
        <p className="mt-1 text-sm text-slate-400">
          Narrow by location, dimensions, and shore power. Shareable URL
          updates as you filter.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <label className="flex flex-col gap-2 text-sm">
            <span className="text-slate-400">Location</span>
            <select
              value={location}
              onChange={(e) => setParam("location", e.target.value)}
              className="rounded-lg border border-white/15 bg-navy-950 px-3 py-2 text-white focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-chrome"
            >
              <option value="">All locations</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm">
            <span className="text-slate-400">Min. length (m)</span>
            <input
              type="number"
              min={0}
              step={0.5}
              placeholder="e.g. 18"
              value={searchParams.get("minLength") ?? ""}
              onChange={(e) => setParam("minLength", e.target.value)}
              className="rounded-lg border border-white/15 bg-navy-950 px-3 py-2 text-white placeholder:text-slate-500 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-chrome"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            <span className="text-slate-400">Max. beam (m)</span>
            <input
              type="number"
              min={0}
              step={0.1}
              placeholder="e.g. 6"
              value={searchParams.get("maxBeam") ?? ""}
              onChange={(e) => setParam("maxBeam", e.target.value)}
              className="rounded-lg border border-white/15 bg-navy-950 px-3 py-2 text-white placeholder:text-slate-500 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-chrome"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            <span className="text-slate-400">Power supply</span>
            <select
              value={power}
              onChange={(e) => setParam("power", e.target.value)}
              className="rounded-lg border border-white/15 bg-navy-950 px-3 py-2 text-white focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-chrome"
            >
              <option value="">Any</option>
              {POWERS.map((p) => (
                <option key={p} value={p}>
                  {p === "three_phase" ? "Three-phase" : p}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <p className="text-sm text-slate-400">
        Showing{" "}
        <span className="font-medium text-white">{filtered.length}</span> of{" "}
        {listings.length} listings
      </p>

      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-white/20 bg-navy-900/40 p-12 text-center text-slate-400">
          No listings match these filters. Try widening dimensions or power
          requirements.
        </p>
      ) : (
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((listing) => (
            <li key={listing._id}>
              <ListingCard listing={listing} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
