import Link from "next/link";
import { company } from "@/data/company";
import { footerQuickLinks, footerServices } from "@/data/navigation";
import { MailIcon, PhoneIcon, PinIcon } from "@/components/ui/Icons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-navy-950 text-navy-300">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-aqua-500/50 to-transparent"
      />
      <div aria-hidden="true" className="water-lines absolute inset-0 opacity-50" />

      <div className="container-site relative py-14 md:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_0.9fr_1.1fr_1.3fr] lg:gap-12">
          <div>
            <span className="block text-[17px] font-bold tracking-[-0.01em] text-white">
              {company.name}
            </span>
            <span className="mt-2 block text-[11px] font-medium uppercase tracking-[0.2em] text-aqua-300">
              {company.tagline}
            </span>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-navy-300">
              {company.summary}
            </p>
          </div>

          <nav aria-labelledby="footer-quick-links">
            <h2
              id="footer-quick-links"
              className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-white"
            >
              Company
            </h2>
            <ul className="space-y-3">
              {footerQuickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-6 items-center text-sm text-navy-300 transition-colors hover:text-aqua-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-services">
            <h2
              id="footer-services"
              className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-white"
            >
              Services
            </h2>
            <ul className="space-y-3">
              {footerServices.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-6 items-center text-sm text-navy-300 transition-colors hover:text-aqua-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-white">
              Contact
            </h2>
            <ul className="space-y-4 text-sm text-navy-300">
              <li>
                <span className="block font-medium text-white">{company.contact.person}</span>
                <span className="text-xs text-navy-400">{company.contact.designation}</span>
              </li>
              <li className="flex gap-3">
                <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-aqua-400" />
                <span className="flex flex-col gap-1">
                  <a href={company.contact.phoneHref} className="inline-flex min-h-6 items-center transition-colors hover:text-aqua-300">
                    {company.contact.phone}
                  </a>
                  <a
                    href={company.contact.telephoneHref}
                    className="inline-flex min-h-6 items-center transition-colors hover:text-aqua-300"
                  >
                    {company.contact.telephone}
                  </a>
                </span>
              </li>
              <li className="flex gap-3">
                <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-aqua-400" />
                <a
                  href={company.contact.emailHref}
                  className="inline-flex min-h-6 items-center break-all transition-colors hover:text-aqua-300"
                >
                  {company.contact.email}
                </a>
              </li>
              <li className="flex gap-3">
                <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-aqua-400" />
                <address className="not-italic leading-relaxed">
                  {company.contact.address.line1}
                  <br />
                  {company.contact.address.line2}
                  <br />
                  {company.contact.address.line3}
                  <br />
                  {company.contact.address.line4}
                  <br />
                  {company.contact.address.city}
                  <br />
                  {company.contact.address.state}
                </address>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-site flex flex-col gap-2 py-5 text-xs text-navy-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.name.replace(/\.$/, "")}. All rights reserved.
          </p>
          <p>{company.location}, India</p>
        </div>
      </div>
    </footer>
  );
}
