import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy-900">
      <Container className="py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-display text-lg font-semibold text-white">
              {siteConfig.name}
            </p>
            <p className="mt-2 max-w-sm text-sm text-slate-400">
              Premium indoor berthing for discerning owners. Covered boat houses
              designed for protection, convenience, and long-term value.
            </p>
          </div>
          <div className="flex flex-col gap-4 text-sm text-slate-400">
            <span className="font-medium text-slate-300">Explore</span>
            <Link href="/listings" className="hover:text-white">
              Property listings
            </Link>
            <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
              {siteConfig.email}
            </a>
          </div>
        </div>
        <p className="mt-10 border-t border-white/10 pt-8 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
