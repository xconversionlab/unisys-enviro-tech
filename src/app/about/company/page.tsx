import type { Metadata } from "next";
import { AboutPage } from "@/components/company/AboutPage";

export const metadata: Metadata = {
  title: "About Company",
  description:
    "Company profile and water treatment, sewage treatment, reverse osmosis, and water analysis services from UNISYS ENVIRO TECH PVT. LTD. in Chennai, Tamil Nadu.",
  alternates: { canonical: "/about/company" },
};

export default function AboutCompanyPage() {
  return <AboutPage />;
}
