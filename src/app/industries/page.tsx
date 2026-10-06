import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { CTASection } from "@/components/shared/CTASection";
import { Reveal } from "@/components/ui/Reveal";
import { industries } from "@/data/industries";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Sectors served by UNISYS ENVIRO TECH — industrial, commercial, institutional, residential and hospitality projects.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Industries" }]}
        eyebrow="Industries"
        title="Industries"
        description="The sectors where our water treatment, sewage treatment, reverse osmosis and analysis services are applied."
      />

      <section className="section-padding bg-white">
        <div className="container-site">
          <Reveal>
            <p className="mb-12 max-w-3xl text-lg leading-relaxed text-navy-700">
              Water and wastewater requirements differ by setting. Treatment is planned
              around what each site draws, what it discharges and the space it can give the
              services.
            </p>
          </Reveal>
          <div className="grid gap-px overflow-hidden rounded-sm border border-navy-100 bg-navy-100 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry, i) => (
              <Reveal key={industry.id} delay={(i % 3) * 80} className="h-full">
                <article className="group flex h-full flex-col bg-white p-8 transition-colors duration-300 hover:bg-navy-50/60 md:p-10">
                  <div className="flex items-center justify-between">
                    <span className="block h-px w-10 bg-aqua-600 transition-all duration-300 group-hover:w-16" />
                    <span className="text-[11px] font-bold tabular-nums tracking-[0.2em] text-navy-300">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h2 className="mt-7 text-[1.25rem] font-bold leading-snug tracking-[-0.01em] text-navy-950 md:text-[1.375rem]">
                    {industry.title}
                  </h2>
                  <p className="mt-4 leading-relaxed text-navy-600">{industry.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
