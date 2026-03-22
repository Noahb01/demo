"use client";

import { useActionState } from "react";
import { submitInquiry, type InquiryState } from "@/actions/inquiry";
import type { Listing } from "@/types/listing";

const initial: InquiryState = { ok: false, message: "" };

export function InquiryForm({ listing }: { listing: Listing }) {
  const [state, formAction, pending] = useActionState(
    submitInquiry,
    initial,
  );

  return (
    <form
      action={formAction}
      className="space-y-4 rounded-2xl border border-white/10 bg-navy-900/50 p-6"
    >
      <input type="hidden" name="listingSlug" value={listing.slug} />
      <input type="hidden" name="listingTitle" value={listing.title} />

      <div>
        <h2 className="font-display text-xl font-semibold text-white">
          Direct inquiry
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Request a private walkthrough or documentation for this berth.
        </p>
      </div>

      <label className="block text-sm">
        <span className="text-slate-400">Name</span>
        <input
          name="name"
          required
          autoComplete="name"
          className="mt-1 w-full rounded-lg border border-white/15 bg-navy-950 px-3 py-2 text-white focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-chrome"
        />
      </label>
      <label className="block text-sm">
        <span className="text-slate-400">Email</span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-1 w-full rounded-lg border border-white/15 bg-navy-950 px-3 py-2 text-white focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-chrome"
        />
      </label>
      <label className="block text-sm">
        <span className="text-slate-400">Phone (optional)</span>
        <input
          name="phone"
          type="tel"
          autoComplete="tel"
          className="mt-1 w-full rounded-lg border border-white/15 bg-navy-950 px-3 py-2 text-white focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-chrome"
        />
      </label>
      <label className="block text-sm">
        <span className="text-slate-400">Message</span>
        <textarea
          name="message"
          required
          rows={4}
          className="mt-1 w-full rounded-lg border border-white/15 bg-navy-950 px-3 py-2 text-white placeholder:text-slate-500 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-chrome"
          placeholder="Tell us about your vessel and timeline…"
        />
      </label>

      {state.message ? (
        <p
          className={`text-sm ${state.ok ? "text-emerald-300" : "text-amber-300"}`}
          role="status"
        >
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-white px-4 py-3 text-sm font-semibold text-navy-950 transition hover:bg-silver-100 disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send inquiry"}
      </button>
    </form>
  );
}
