import Link from "next/link";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/shared/CTASection";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRight, MailIcon, PhoneIcon, UserIcon } from "@/components/ui/Icons";
import { company } from "@/data/company";
import { services } from "@/data/services";
import { approach } from "@/data/approach";

export function AboutPage() {
  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about" },
          { label: "About Company" },
        ]}
        eyebrow="About Company"
        title="UNISYS ENVIRO TECH"
        description={company.practice}
      />

      <section className="section-padding bg-white">
        <div className="container-site">
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-7">
              <h2 className="font-display text-[1.75rem] font-normal leading-[1.18] tracking-[-0.015em] text-navy-950 md:text-[2.125rem]">
                {company.name}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-navy-700">
                {company.description}
              </p>
              <p className="mt-5 leading-relaxed text-navy-600">
                Each service rests on the same discipline: understand the water first,
                then select and size the treatment that fits it. That keeps systems
                proportionate to the duty they carry — no more equipment than the water
                calls for, and no less than the application needs.
              </p>
              <p className="mt-5 leading-relaxed text-navy-600">
                The company works with industrial, commercial and institutional projects,
                from a single treatment system to the analysis and review of plant already
                in service.
              </p>
            </Reveal>

            <Reveal delay={120} className="lg:col-span-5">
              <div className="rounded-sm border border-navy-100 bg-navy-50/60 p-7 md:p-9">
                <p className="eyebrow text-aqua-700">
                  <span aria-hidden="true" className="h-px w-7 bg-current opacity-50" />
                  Services
                </p>
                <h3 className="mt-4 text-lg font-bold text-navy-950">Four core services</h3>
                <ul className="mt-6 divide-y divide-navy-100 border-y border-navy-100">
                  {services.map((service, i) => (
                    <li key={service.id}>
                      <Link
                        href={`/services/${service.slug}`}
                        className="group flex items-center justify-between gap-4 py-4 text-sm font-semibold text-navy-900 transition-colors hover:text-aqua-700 focus:outline-none focus-visible:text-aqua-700"
                      >
                        <span className="flex items-baseline gap-3">
                          <span className="text-[11px] font-semibold tabular-nums text-aqua-700">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          {service.title}
                        </span>
                        <ArrowRight className="h-4 w-4 shrink-0 text-navy-300 transition-all group-hover:translate-x-0.5 group-hover:text-aqua-600" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-padding bg-navy-50/60">
        <div className="container-site">
          <Reveal>
            <SectionHeading
              eyebrow="Approach"
              title="How the work is done"
              description="A short, repeatable sequence that keeps treatment decisions tied to the water itself."
              align="left"
              className="mb-12 md:mb-14"
            />
          </Reveal>
          <div className="grid gap-px overflow-hidden rounded-sm border border-navy-100 bg-navy-100 sm:grid-cols-2 lg:grid-cols-4">
            {approach.map((item, i) => (
              <Reveal key={item.id} delay={i * 80} className="h-full">
                <div className="h-full bg-white p-7 md:p-8">
                  <span className="text-[11px] font-bold tabular-nums tracking-[0.2em] text-aqua-700">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-[17px] font-bold leading-snug text-navy-950">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-600">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-site max-w-3xl">
          <Reveal>
            <SectionHeading
              eyebrow="Contact"
              title="Who to speak with"
              align="left"
              className="mb-8"
            />
            <div className="flex flex-col gap-6 rounded-sm border border-navy-100 bg-white p-7 shadow-soft sm:flex-row sm:items-center md:p-9">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-navy-950 text-aqua-300">
                <UserIcon className="h-6 w-6" />
              </span>
              <div className="min-w-0">
                <p className="text-xl font-bold text-navy-950">{company.contact.person}</p>
                <p className="text-navy-600">{company.contact.designation}</p>
                <div className="mt-4 space-y-2 text-sm">
                  <a
                    href={company.contact.phoneHref}
                    className="inline-flex min-h-6 items-center gap-2.5 text-navy-700 transition-colors hover:text-aqua-700"
                  >
                    <PhoneIcon className="h-4 w-4 text-aqua-600" />
                    {company.contact.phone}
                  </a>
                  <a
                    href={company.contact.emailHref}
                    className="inline-flex min-h-6 items-center gap-2.5 break-all text-navy-700 transition-colors hover:text-aqua-700"
                  >
                    <MailIcon className="h-4 w-4 shrink-0 text-aqua-600" />
                    {company.contact.email}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
