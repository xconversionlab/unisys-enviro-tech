import Link from "next/link";
import { Service } from "@/data/services";
import { ArrowRight } from "@/components/ui/Icons";

interface ServiceCardProps {
  service: Service;
  index: number;
}

/** Editorial service card used on the home page. */
export function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex h-full flex-col rounded-sm border border-navy-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-aqua-300 hover:shadow-lift focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-500"
    >
      <span className="mb-6 flex items-center justify-between">
        <span className="text-[11px] font-bold tabular-nums tracking-[0.2em] text-aqua-700">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          aria-hidden="true"
          className="h-px w-8 bg-navy-200 transition-all duration-300 group-hover:w-14 group-hover:bg-aqua-500"
        />
      </span>
      <h3 className="text-[17px] font-bold leading-snug tracking-[-0.01em] text-navy-950 transition-colors group-hover:text-aqua-700">
        {service.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-navy-600">{service.summary}</p>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-aqua-700">
        View service
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
