import type { MetadataRoute } from "next";
import { getAllServiceSlugs } from "@/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
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
  const lastModified = new Date();

  return [
    ...staticPaths.map((path) => ({ url: `${siteUrl}${path}`, lastModified })),
    ...getAllServiceSlugs().map((slug) => ({
      url: `${siteUrl}/services/${slug}`,
      lastModified,
    })),
  ];
}
