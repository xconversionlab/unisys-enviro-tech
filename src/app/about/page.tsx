import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shared/PageHeader";
import { CTASection } from "@/components/shared/CTASection";
import { Button } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/Icons";
import { company } from "@/data/company";
import { siteImages } from "@/data/site-images";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "About UNISYS ENVIRO TECH PVT. LTD., a Chennai water resource technology company, and the company's profile and certificates.",
  alternates: { canonical: "/about" },
};

const sections = [
  {
    title: "About Company",
    description:
      "The company, its four service areas and the approach that connects them.",
    href: "/about/company",
  },
  {
    title: "Certificates",
    description: "Company certificates and documentation, available on request.",
    href: "/about/certificates",
  },
];

export default function AboutUsPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
        eyebrow="About Us"
        title={company.shortName}
        description="A Chennai water resource technology company working across water treatment, sewage treatment, reverse osmosis and water and wastewater analysis."
      />

      <section className="section-padding bg-white">
        <div className="container-site">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-6">
              <p className="font-display text-[1.5rem] font-normal leading-[1.35] tracking-[-0.01em] text-navy-800 md:text-[1.75rem]">
                Four services, one discipline: understand the water first, then select and
                size the treatment that fits it.
              </p>
            </Reveal>
            <Reveal delay={120} className="lg:col-span-6">
              <Photo
                src={siteImages.about.src}
                alt={siteImages.about.alt}
                ratio="2048 / 1246"
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="rounded-sm shadow-lift"
              />
            </Reveal>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {sections.map((section, i) => (
              <Reveal key={section.href} delay={i * 100} className="h-full">
                <Link
                  href={section.href}
                  className="group flex h-full flex-col rounded-sm border border-navy-100 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-aqua-300 hover:shadow-lift focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-500 md:p-10"
                >
                  <span className="mb-6 block h-px w-10 bg-aqua-600 transition-all duration-300 group-hover:w-16" />
                  <h2 className="font-display text-[1.5rem] font-normal text-navy-950 transition-colors group-hover:text-aqua-700">
                    {section.title}
                  </h2>
                  <p className="mt-3 flex-1 leading-relaxed text-navy-600">{section.description}</p>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-aqua-700">
                    Open section
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Button href="/contact" variant="primary" size="md" arrow>
              Contact us
            </Button>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
