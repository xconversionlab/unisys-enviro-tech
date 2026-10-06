import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { ServiceGrid } from "@/components/services/ServiceGrid";
import { CTASection } from "@/components/shared/CTASection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { Check } from "@/components/ui/Icons";
import { company } from "@/data/company";
import { industries } from "@/data/industries";
import { clients } from "@/data/clients";
import { siteImages } from "@/data/site-images";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const solutionPoints = [
  "Source water characterised before any design",
  "Process train selected for the quality target",
  "Stages and sizing matched to the duty",
];

const equipment = [
  {
    key: "aeration",
    src: siteImages.equipmentAerationGrid.src,
    alt: siteImages.equipmentAerationGrid.alt,
    label: "Aeration pipe grid",
    ratio: "1737 / 2048",
  },
  {
    key: "blowers",
    src: siteImages.equipmentBlowers.src,
    alt: siteImages.equipmentBlowers.alt,
    label: "Industrial blower equipment",
    ratio: "1 / 1",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Introduction */}
      <section className="section-padding bg-white">
        <div className="container-site">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-6">
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="absolute -bottom-5 -left-5 hidden h-2/3 w-2/3 border border-aqua-200 sm:block"
                />
                <Photo
                  src={siteImages.solution.src}
                  alt={siteImages.solution.alt}
                  ratio="2048 / 1532"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="relative rounded-sm shadow-lift"
                />
              </div>
            </Reveal>
            <Reveal delay={120} className="lg:col-span-6 lg:pl-4">
              <SectionHeading
                eyebrow="About Us"
                title="A Chennai company built around water"
                description={company.description}
                align="left"
              />
              <p className="mt-5 leading-relaxed text-navy-600">
                Systems are selected from the water itself — its source, its composition and
                the quality the application needs — so treatment is proportionate to the duty
                rather than assumed.
              </p>
              <div className="mt-8">
                <Button href="/about/company" variant="outline" size="md" arrow>
                  About the company
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <ServiceGrid />

      {/* Treatment approach */}
      <section className="section-padding bg-white">
        <div className="container-site">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="order-2 lg:order-1 lg:col-span-6">
              <Photo
                src={siteImages.equipmentTubeSettler.src}
                alt={siteImages.equipmentTubeSettler.alt}
                ratio="1 / 1"
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="rounded-sm shadow-lift"
              />
            </Reveal>
            <Reveal delay={120} className="order-1 lg:order-2 lg:col-span-6 lg:pl-4">
              <SectionHeading
                eyebrow="Approach"
                title="Treatment planned from the water up"
                description="Analysis comes first. Process selection, sizing and the stages within a system follow from what the water contains and what it has to become."
                align="left"
              />
              <ul className="mt-8 divide-y divide-navy-100 border-y border-navy-100">
                {solutionPoints.map((point) => (
                  <li key={point} className="flex items-start gap-4 py-4 text-navy-700">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-aqua-50 text-aqua-700">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button href="/services" variant="primary" size="md" arrow>
                  Explore the services
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="section-padding relative overflow-hidden bg-navy-950">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(46rem_22rem_at_88%_0%,rgba(0,128,128,0.2),transparent_62%)]"
        />
        <div aria-hidden="true" className="water-lines absolute inset-0" />
        <div className="container-site relative">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <SectionHeading
                light
                eyebrow="Industries"
                title="Where the services are applied"
                description="Industrial, commercial, institutional, residential and hospitality projects, each with its own water source, discharge standard and site constraints."
                align="left"
              />
            </Reveal>
            <Reveal delay={100}>
              <Button href="/industries" variant="outlineLight" size="md" arrow>
                All industries
              </Button>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry, i) => (
              <Reveal key={industry.id} delay={(i % 3) * 80} className="bg-navy-950">
                <div className="h-full p-7 transition-colors duration-300 hover:bg-navy-900 md:p-8">
                  <span className="text-[11px] font-bold tabular-nums tracking-[0.2em] text-aqua-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-[17px] font-bold leading-snug text-white">
                    {industry.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-300">
                    {industry.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment */}
      <section className="section-padding bg-navy-50/60">
        <div className="container-site">
          <Reveal>
            <SectionHeading
              eyebrow="Equipment"
              title="Systems and equipment"
              description="Aeration, blower and diffuser equipment from wastewater treatment installations."
              align="left"
              className="mb-12 md:mb-14"
            />
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 md:gap-5">
            {equipment.map((item, i) => (
              <Reveal key={item.key} delay={i * 110}>
                <figure className="group relative overflow-hidden rounded-sm">
                  <Photo
                    src={item.src}
                    alt={item.alt}
                    ratio={item.ratio}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-navy-950/0 to-transparent"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-navy-950/95 px-5 py-4 text-sm font-semibold tracking-wide text-white md:px-6">
                    <span aria-hidden="true" className="h-px w-6 shrink-0 bg-aqua-400" />
                    {item.label}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="section-padding bg-white">
        <div className="container-site">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <SectionHeading
                eyebrow="Clients"
                title="Client relationships"
                description="Builders and developers we have worked with on water and wastewater systems, in Chennai and Delhi."
                align="left"
              />
            </Reveal>
            <Reveal delay={100}>
              <Button href="/clients" variant="outline" size="md" arrow>
                All clients
              </Button>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <ul className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-navy-100 bg-navy-100 sm:grid-cols-3 lg:grid-cols-5">
              {clients.map((client) => (
                <li
                  key={client.id}
                  className="flex min-h-[5.5rem] flex-col justify-center gap-1.5 bg-white px-5 py-5"
                >
                  <span className="text-[15px] font-semibold leading-snug text-navy-900">
                    {client.name}
                  </span>
                  <span className="text-xs uppercase tracking-[0.14em] text-navy-500">
                    {client.location}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
