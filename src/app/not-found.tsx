import Link from "next/link";
import { Container } from "@/components/layout/Container";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-navy-950">
      <Container className="flex flex-1 flex-col items-center justify-center py-24 text-center">
        <p className="text-sm font-medium text-silver-400">404</p>
        <h1 className="mt-4 font-display text-3xl font-semibold text-white">
          Page not found
        </h1>
        <p className="mt-2 max-w-md text-slate-400">
          This page may have moved. Return to listings or the homepage.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="rounded-full border border-white/20 px-5 py-2 text-sm text-white hover:border-chrome/50"
          >
            Home
          </Link>
          <Link
            href="/listings"
            className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-navy-950 hover:bg-silver-100"
          >
            Listings
          </Link>
        </div>
      </Container>
    </div>
  );
}
