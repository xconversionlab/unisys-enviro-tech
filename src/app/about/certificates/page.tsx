import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { CTASection } from "@/components/shared/CTASection";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { MailIcon, PhoneIcon, UserIcon } from "@/components/ui/Icons";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Certificates",
  description:
    "Company certificates and documentation for UNISYS ENVIRO TECH PVT. LTD., available on request.",
  alternates: { canonical: "/about/certificates" },
};

export default function CertificatesPage() {
  const { contact } = company;

  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about" },
          { label: "Certificates" },
        ]}
        eyebrow="About Us"
        title="Certificates"
        description="Company certificates and documentation."
      />

      <section className="section-padding bg-white">
        <div className="container-site max-w-4xl">
          <Reveal>
            <div className="rounded-sm border border-navy-100 bg-navy-50/60 p-8 md:p-12">
              <span aria-hidden="true" className="mb-6 block h-px w-12 bg-aqua-600" />
              <h2 className="font-display text-[1.625rem] font-normal tracking-[-0.015em] text-navy-950 md:text-[2rem]">
                Documentation on request
              </h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-navy-600">
                Company certificates and supporting documents are made available on
                request. Write to us or call, and we will share the paperwork relevant to
                your requirement.
              </p>

              <div className="mt-9 flex flex-col gap-6 border-t border-navy-100 pt-8 sm:flex-row sm:items-center">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-navy-950 text-aqua-300">
                  <UserIcon className="h-6 w-6" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-lg font-bold text-navy-950">{contact.person}</p>
                  <p className="text-navy-600">{contact.designation}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button href={contact.phoneHref} variant="primary" size="md">
                    <PhoneIcon className="h-4 w-4" />
                    {contact.phone}
                  </Button>
                  <Button href={contact.emailHref} variant="outline" size="md">
                    <MailIcon className="h-4 w-4" />
                    Email us
                  </Button>
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
