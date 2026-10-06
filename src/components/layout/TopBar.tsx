import Link from "next/link";
import { company } from "@/data/company";
import { MailIcon, PhoneIcon, PinIcon } from "@/components/ui/Icons";

export function TopBar() {
  return (
    <div className="border-b border-white/10 bg-navy-950 text-[13px] text-navy-300">
      <div className="container-site flex items-center justify-between gap-6 py-1 sm:py-1.5">
        <div className="flex min-w-0 items-center gap-5">
          <span className="hidden min-h-6 items-center gap-1.5 lg:inline-flex">
            <PinIcon className="h-3.5 w-3.5 shrink-0 text-aqua-400" />
            <span>{company.location}</span>
          </span>
          <a
            href={company.contact.phoneHref}
            className="inline-flex min-h-8 items-center gap-1.5 transition-colors hover:text-white"
          >
            <PhoneIcon className="h-3.5 w-3.5 shrink-0 text-aqua-400" />
            <span>{company.contact.phone}</span>
          </a>
          <a
            href={company.contact.emailHref}
            className="hidden min-h-6 min-w-0 items-center gap-1.5 transition-colors hover:text-white sm:inline-flex"
          >
            <MailIcon className="h-3.5 w-3.5 shrink-0 text-aqua-400" />
            <span className="truncate">{company.contact.email}</span>
          </a>
        </div>
        <Link
          href="/contact"
          className="inline-flex min-h-8 shrink-0 items-center font-medium text-aqua-300 transition-colors hover:text-white"
        >
          Contact us
        </Link>
      </div>
    </div>
  );
}
