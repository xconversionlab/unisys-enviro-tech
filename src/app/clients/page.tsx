import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { MailIcon, PhoneIcon, PinIcon } from "@/components/ui/Icons";
import { company } from "@/data/company";
import { clients } from "@/data/clients";

export const metadata: Metadata = {
  title: "Clients",
  description:
    "Builders and developers in Chennai and Delhi who have worked with UNISYS ENVIRO TECH PVT. LTD.",
  alternates: { canonical: "/clients" },
};

export default function ClientsPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Clients" }]}
        eyebrow="Clients"
        title="Client relationships"
        description="Builders and developers we have worked with on water and wastewater systems."
      />

      <section className="section-padding bg-white">
        <div className="container-site">
          <Reveal>
            <div className="mb-12 grid gap-6 border-b border-navy-100 pb-10 md:grid-cols-[1.4fr_1fr] md:items-end">
              <p className="font-display max-w-2xl text-[1.5rem] font-normal leading-[1.35] tracking-[-0.01em] text-navy-800 md:text-[1.75rem]">
                A working record of the builders and developers we have served across
                Chennai and Delhi.
              </p>
              <p className="text-sm leading-relaxed text-navy-600 md:text-base">
                Water treatment and sewage treatment for residential, commercial and
                institutional projects.
              </p>
            </div>
          </Reveal>

          <h2 className="sr-only">Client list</h2>
          <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-navy-100 bg-navy-100 sm:grid-cols-2 lg:grid-cols-3">
            {clients.map((client, index) => (
              <li key={client.id}>
                <Reveal delay={(index % 3) * 60} className="h-full">
                  <div className="group flex h-full flex-col bg-white p-7 transition-colors duration-300 hover:bg-navy-50/60 md:p-8">
                    <span className="text-[11px] font-bold tabular-nums tracking-[0.2em] text-aqua-700">
                      {client.id}
                    </span>
                    <h3 className="mt-6 text-[1.125rem] font-semibold leading-snug tracking-[-0.01em] text-navy-950">
                      {client.name}
                    </h3>
                    <p className="mt-3 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.13em] text-navy-500">
                      <PinIcon className="h-3.5 w-3.5 text-aqua-600" />
                      {client.location}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-padding bg-navy-50/60">
        <div className="container-site max-w-5xl">
          <Reveal>
            <div className="overflow-hidden rounded-sm bg-navy-950 text-white shadow-lift">
              <div className="relative p-8 md:p-12">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[radial-gradient(30rem_18rem_at_100%_0%,rgba(0,128,128,0.26),transparent_62%)]"
                />
                <div aria-hidden="true" className="water-lines absolute inset-0 opacity-70" />
                <div className="relative grid gap-8 lg:grid-cols-[1.3fr_auto] lg:items-center">
                  <div>
                    <p className="eyebrow text-aqua-300">Start a conversation</p>
                    <h2 className="font-display mt-4 text-[1.625rem] font-normal tracking-[-0.015em] md:text-[2rem]">
                      Discuss your water resource requirement
                    </h2>
                    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-navy-300 md:text-base">
                      Speak with us about water treatment, sewage treatment, reverse osmosis
                      or water and wastewater analysis for your project.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button href={company.contact.phoneHref} variant="secondary" size="md">
                      <PhoneIcon className="h-4 w-4" />
                      {company.contact.phone}
                    </Button>
                    <Button href={company.contact.emailHref} variant="outlineLight" size="md">
                      <MailIcon className="h-4 w-4" />
                      Email us
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
