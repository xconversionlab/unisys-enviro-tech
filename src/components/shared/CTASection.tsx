import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { company } from "@/data/company";
import { MailIcon, PhoneIcon } from "@/components/ui/Icons";

interface CTASectionProps {
  title?: string;
  description?: string;
}

export function CTASection({
  title = "Discuss a water treatment requirement",
  description = "Speak with us about water treatment, sewage treatment, reverse osmosis or analysis for your project.",
}: CTASectionProps) {
  return (
    <section className="relative overflow-hidden bg-navy-950 text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(48rem_22rem_at_12%_120%,rgba(0,128,128,0.3),transparent_62%),linear-gradient(180deg,#0e1c30,#0a1626)]"
      />
      <div aria-hidden="true" className="water-lines absolute inset-0" />
      <div className="container-site relative py-16 md:py-24">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-[1.75rem] font-normal leading-[1.15] tracking-[-0.015em] sm:text-[2.25rem] md:text-[2.5rem]">
              {title}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-navy-200">
              {description}
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Button href={company.contact.phoneHref} variant="secondary" size="lg">
                <PhoneIcon className="h-4 w-4" />
                Call us
              </Button>
              <Button href="/contact" variant="outlineLight" size="lg" arrow>
                Send a message
              </Button>
            </div>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-navy-300">
              <a
                href={company.contact.phoneHref}
                className="inline-flex min-h-6 items-center gap-2 transition-colors hover:text-white"
              >
                <PhoneIcon className="h-4 w-4 text-aqua-400" />
                {company.contact.phone}
              </a>
              <a
                href={company.contact.emailHref}
                className="inline-flex min-h-6 items-center gap-2 break-all transition-colors hover:text-white"
              >
                <MailIcon className="h-4 w-4 shrink-0 text-aqua-400" />
                {company.contact.email}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
