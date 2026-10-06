import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getServiceBySlug, getAllServiceSlugs, services } from "@/data/services";
import { company } from "@/data/company";
import { PageHeader } from "@/components/shared/PageHeader";
import { CTASection } from "@/components/shared/CTASection";
import { Button } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRight, MailIcon, PhoneIcon } from "@/components/ui/Icons";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: service.title,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const index = services.findIndex((s) => s.id === service.id);
  const otherServices = services.filter((s) => s.id !== service.id);

  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Products & Services", href: "/services" },
          { label: service.title },
        ]}
        eyebrow={`Service ${String(index + 1).padStart(2, "0")}`}
        title={service.title}
        description={service.summary}
        index={String(index + 1).padStart(2, "0")}
      />

      <section className="section-padding bg-white">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-[1fr_21rem] lg:gap-16">
            <div>
              <Reveal>
                <h2 className="font-display text-[1.625rem] font-normal tracking-[-0.015em] text-navy-950 md:text-[2rem]">
                  Overview
                </h2>
                <p className="mt-5 max-w-3xl text-lg leading-relaxed text-navy-700">
                  {service.description}
                </p>
              </Reveal>

              <Reveal className="mt-10">
                <Photo
                  src={service.image}
                  alt={service.imageAlt || service.title}
                  ratio={service.imageRatio}
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  className="rounded-sm shadow-lift"
                />
              </Reveal>

              <Reveal className="mt-14">
                <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-aqua-700">
                  Key aspects
                </h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 rounded-sm border border-navy-100 bg-navy-50/60 p-4 text-sm font-medium leading-snug text-navy-900"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-px w-4 shrink-0 bg-aqua-600"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal className="mt-14">
                <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-aqua-700">
                  Typical applications
                </h2>
                <ul className="mt-5 divide-y divide-navy-100 border-y border-navy-100">
                  {service.applications.map((application) => (
                    <li key={application} className="flex items-center gap-4 py-4 text-navy-700">
                      <span aria-hidden="true" className="h-px w-5 shrink-0 bg-aqua-600" />
                      {application}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <aside className="lg:sticky lg:top-32 lg:self-start">
              <Reveal>
                <div className="relative overflow-hidden rounded-sm bg-navy-950 p-7 text-white shadow-lift md:p-8">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[radial-gradient(22rem_13rem_at_100%_0%,rgba(0,128,128,0.28),transparent_62%)]"
                  />
                  <div className="relative">
                    <p className="eyebrow text-aqua-300">{service.shortTitle}</p>
                    <h2 className="font-display mt-3 text-[1.375rem] font-normal leading-snug">
                      Discuss this service
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-navy-300">
                      {company.contact.person}, {company.contact.designation}
                    </p>
                    <div className="mt-6 space-y-3 text-sm">
                      <a
                        href={company.contact.phoneHref}
                        className="inline-flex min-h-6 items-center gap-3 text-navy-200 transition-colors hover:text-white"
                      >
                        <PhoneIcon className="h-4 w-4 text-aqua-400" />
                        {company.contact.phone}
                      </a>
                      <a
                        href={company.contact.emailHref}
                        className="inline-flex min-h-6 items-center gap-3 break-all text-navy-200 transition-colors hover:text-white"
                      >
                        <MailIcon className="h-4 w-4 shrink-0 text-aqua-400" />
                        {company.contact.email}
                      </a>
                    </div>
                    <Button
                      href="/contact"
                      variant="secondary"
                      size="md"
                      className="mt-7 w-full"
                      arrow
                    >
                      Send a message
                    </Button>
                  </div>
                </div>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>

      {otherServices.length > 0 && (
        <section className="section-padding bg-navy-50/60">
          <div className="container-site">
            <Reveal>
              <h2 className="font-display text-[1.625rem] font-normal tracking-[-0.015em] text-navy-950 md:text-[2rem]">
                Other services
              </h2>
            </Reveal>
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {otherServices.map((s, i) => (
                <Reveal key={s.id} delay={i * 80} className="h-full">
                  <Link
                    href={`/services/${s.slug}`}
                    className="group flex h-full flex-col rounded-sm border border-navy-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-aqua-300 hover:shadow-lift focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-500"
                  >
                    <span className="mb-5 block h-px w-10 bg-aqua-600 transition-all duration-300 group-hover:w-16" />
                    <h3 className="font-bold leading-snug text-navy-950 transition-colors group-hover:text-aqua-700">
                      {s.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-600">{s.summary}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-aqua-700">
                      View service
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
