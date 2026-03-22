import type { Metadata } from "next";
import { HomePage } from "@/components/home/HomePage";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Luxury yacht garage & covered boat house for sale",
  description: siteConfig.description,
  alternates: { canonical: siteConfig.url },
  keywords: siteConfig.keywords,
  openGraph: {
    title: `${siteConfig.name} | Premium indoor boat houses`,
    description: siteConfig.description,
    url: siteConfig.url,
  },
};

export default function Home() {
  return <HomePage />;
}
