import type { MetadataRoute } from "next";
import { getAllServiceSlugs } from "@/data/services";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.unisysenviro.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "/",
    "/about",
    "/about/company",
    "/about/certificates",
    "/services",
    "/industries",
    "/clients",
    "/contact",
  ];

  return [
    ...staticPaths.map((path) => ({ url: `${siteUrl}${path}` })),
    ...getAllServiceSlugs().map((slug) => ({
      url: `${siteUrl}/services/${slug}`,
    })),
  ];
}
