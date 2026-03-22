import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Container } from "./Container";

const nav = [
  { href: "/", label: "Home" },
  { href: "/listings", label: "Listings" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy-950/90 backdrop-blur-md">
      <Container className="flex min-h-16 flex-wrap items-center justify-between gap-3 py-3 sm:h-16 sm:flex-nowrap sm:py-0">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight text-white transition hover:text-silver-100"
        >
          {siteConfig.name}
        </Link>
        <nav className="flex w-full flex-wrap items-center justify-end gap-x-4 gap-y-2 text-sm font-medium text-slate-300 sm:w-auto sm:gap-6">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chrome"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/listings"
            className="rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-white transition hover:border-chrome/60 hover:bg-white/10 sm:px-4 sm:py-2"
          >
            <span className="sm:hidden">Availability</span>
            <span className="hidden sm:inline">View availability</span>
          </Link>
        </nav>
      </Container>
    </header>
  );
}
