import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { MailIcon, PhoneIcon, PinIcon, UserIcon } from "@/components/ui/Icons";
import { company } from "@/data/company";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact UNISYS ENVIRO TECH PVT. LTD. — M. Chandra Pari, Director. Phone 98843 13191, 044 - 295 35483. Chennai, Tamil Nadu.",
  alternates: { canonical: "/contact" },
};

const rowClass = "flex gap-4 border-b border-white/10 py-5 first:pt-0 last:border-b-0 last:pb-0";
const iconWrap =
  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/[0.07] text-aqua-300";
const labelClass = "text-xs font-semibold uppercase tracking-[0.16em] text-aqua-300";

export default function ContactPage() {
  const { contact } = company;

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        eyebrow="Contact"
        title="Contact Us"
        description="Reach us about water treatment, sewage treatment, reverse osmosis or analysis requirements."
      />

      <section className="section-padding bg-white">
        <div className="container-site">
          <div className="grid gap-10 lg:grid-cols-5 lg:gap-14">
            <Reveal className="lg:col-span-2">
              <div className="relative overflow-hidden rounded-sm bg-navy-950 p-7 text-white shadow-lift md:p-9">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[radial-gradient(24rem_15rem_at_100%_0%,rgba(0,128,128,0.26),transparent_62%)]"
                />
                <div aria-hidden="true" className="water-lines absolute inset-0" />
                <div className="relative">
                  <div className={rowClass}>
                    <span className={iconWrap}>
                      <UserIcon className="h-5 w-5" />
                    </span>
                    <div>
                      <h2 className={labelClass}>Contact person</h2>
                      <p className="mt-1.5 font-semibold">{contact.person}</p>
                      <p className="text-sm text-navy-300">{contact.designation}</p>
                    </div>
                  </div>
                  <div className={rowClass}>
                    <span className={iconWrap}>
                      <PhoneIcon className="h-5 w-5" />
                    </span>
                    <div>
                      <h2 className={labelClass}>Phone</h2>
                      <p className="mt-1.5">
                        <a
                          href={contact.phoneHref}
                          className="inline-flex min-h-6 items-center font-semibold transition-colors hover:text-aqua-300"
                        >
                          {contact.phone}
                        </a>
                      </p>
                      <p className="mt-1 text-sm">
                        <a
                          href={contact.telephoneHref}
                          className="inline-flex min-h-6 items-center text-navy-300 transition-colors hover:text-aqua-300"
                        >
                          {contact.telephone}
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className={rowClass}>
                    <span className={iconWrap}>
                      <MailIcon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <h2 className={labelClass}>Email</h2>
                      <p className="mt-1.5">
                        <a
                          href={contact.emailHref}
                          className="inline-flex min-h-6 items-center break-all font-semibold transition-colors hover:text-aqua-300"
                        >
                          {contact.email}
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className={rowClass}>
                    <span className={iconWrap}>
                      <PinIcon className="h-5 w-5" />
                    </span>
                    <div>
                      <h2 className={labelClass}>Address</h2>
                      <address className="mt-1.5 text-sm not-italic leading-relaxed text-navy-300">
                        {contact.address.line1}
                        <br />
                        {contact.address.line2}
                        <br />
                        {contact.address.line3}
                        <br />
                        {contact.address.line4}
                        <br />
                        {contact.address.city}
                        <br />
                        {contact.address.state}
                      </address>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120} className="lg:col-span-3">
              <div className="rounded-sm border border-navy-100 bg-navy-50/60 p-7 md:p-10">
                <h2 className="font-display text-[1.625rem] font-normal tracking-[-0.015em] text-navy-950">
                  Send a message
                </h2>
                <p className="mb-8 mt-2 text-sm leading-relaxed text-navy-600">
                  Sending opens your email app with the message ready to go to {contact.email}.
                </p>
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
