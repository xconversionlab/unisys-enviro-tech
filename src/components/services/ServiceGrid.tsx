import { services } from "@/data/services";
import { ServiceCard } from "./ServiceCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function ServiceGrid() {
  return (
    <section className="section-padding bg-navy-50/60">
      <div className="container-site">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow="Services"
              title="Four services, one focus"
              description="Water treatment, sewage treatment, reverse osmosis and analysis — planned together so each system suits the water it handles."
              align="left"
            />
          </Reveal>
          <Reveal delay={100}>
            <Button href="/services" variant="outline" size="md" arrow>
              All services
            </Button>
          </Reveal>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-7 xl:grid-cols-4">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={i * 90} className="h-full">
              <ServiceCard service={service} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
