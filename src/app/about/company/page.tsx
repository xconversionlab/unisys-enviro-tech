import type { Metadata } from "next";
import { AboutPage } from "@/components/company/AboutPage";

export const metadata: Metadata = {
  title: "About Company",
  description:
    "About UNISYS ENVIRO TECH PVT. LTD. and its water resource technology focus in Chennai, Tamil Nadu.",
  alternates: { canonical: "/about/company" },
};

export default function AboutCompanyPage() {
  return <AboutPage />;
}
