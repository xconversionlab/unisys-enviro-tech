import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shared/PageHeader";
import { CTASection } from "@/components/shared/CTASection";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/Icons";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Products & Services",
  description:
    "Water treatment systems, sewage treatment systems, reverse osmosis systems and water and wastewater analysis from UNISYS ENVIRO TECH, Chennai.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Products & Services" }]}
        eyebrow="Products & Services"
        title="Services"
        description="Four services covering water treatment, sewage treatment, reverse osmosis and water and wastewater analysis."
      />

      <section className="section-padding bg-white">
        <div className="container-site">
          <ol className="divide-y divide-navy-100 border-y border-navy-100">
            {services.map((service, i) => (
              <li key={service.id}>
                <Reveal>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group grid gap-6 py-8 transition-colors hover:bg-navy-50/60 focus:outline-none focus-visible:bg-navy-50/60 md:grid-cols-[3.5rem_1fr_1.05fr_3rem] md:items-center md:gap-10 md:px-5 md:py-10"
                  >
                    <span className="font-display text-4xl font-light tabular-nums tracking-tight text-navy-200 transition-colors group-hover:text-aqua-500 md:text-[3rem]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h2 className="font-display text-[1.375rem] font-normal leading-snug text-navy-950 transition-colors group-hover:text-aqua-700 md:text-[1.625rem]">
                        {service.title}
                      </h2>
                      <p className="mt-3 max-w-md leading-relaxed text-navy-600">
                        {service.summary}
                      </p>
                    </div>
                    <ul className="space-y-2.5">
                      {service.features.slice(0, 3).map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-3 text-sm text-navy-700"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 h-px w-4 shrink-0 bg-aqua-500"
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-navy-200 text-navy-700 transition-all duration-200 group-hover:border-aqua-600 group-hover:bg-aqua-600 group-hover:text-white">
                      <ArrowRight className="h-4 w-4" />
                      <span className="sr-only">View {service.title}</span>
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Closing note */}
      <section className="section-padding bg-navy-50/60">
        <div className="container-site">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-[1.625rem] font-normal leading-[1.18] tracking-[-0.015em] text-navy-950 md:text-[2rem]">
              Selecting the right service
            </h2>
            <p className="mt-5 leading-relaxed text-navy-600">
              Most projects begin with analysis. From there, water treatment, sewage
              treatment and reverse osmosis systems are planned around the water each has
              to handle. If the requirement is unclear, a short conversation is usually the
              quickest way to scope it.
            </p>
            <div className="mt-8">
              <Button href="/contact" variant="outline" size="md" arrow>
                Discuss a requirement
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
