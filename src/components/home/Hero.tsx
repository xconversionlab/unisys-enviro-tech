import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { ArrowRight } from "@/components/ui/Icons";
import { siteImages } from "@/data/site-images";
import { services } from "@/data/services";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-950 text-white">
      <div className="absolute inset-0 -z-10">
        <div className="drift h-full w-full">
          <Photo
            src={siteImages.hero.src}
            alt={siteImages.hero.alt}
            priority
            sizes="100vw"
            quality={86}
            position="64% 52%"
            className="h-full w-full"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/10 to-navy-950/50" />
      </div>

      <div className="container-site flex min-h-[32rem] flex-col justify-end pb-0 pt-20 sm:min-h-[36rem] md:min-h-[40rem] lg:min-h-[46rem] lg:pt-28">
        <div className="max-w-2xl pb-12 md:pb-16">
          <p className="eyebrow rise mb-5 text-aqua-300" style={delay(100)}>
            <span aria-hidden="true" className="h-px w-7 bg-current opacity-60" />
            Water Resource Technology
          </p>
          <h1
            className="font-display rise text-[2.25rem] font-normal leading-[1.06] tracking-[-0.02em] sm:text-[3rem] lg:text-[3.75rem]"
            style={delay(200)}
          >
            Water and wastewater treatment, engineered to the source.
          </h1>
          <p
            className="rise mt-6 max-w-xl leading-relaxed text-navy-200 sm:text-lg"
            style={delay(320)}
          >
            UNISYS ENVIRO TECH designs water treatment, sewage treatment and
            reverse osmosis systems, supported by water and wastewater analysis from first
            assessment through operation.
          </p>
          <div className="rise mt-9 flex flex-wrap gap-3" style={delay(440)}>
            <Button href="/contact" variant="secondary" size="lg" arrow>
              Start a conversation
            </Button>
            <Button href="/services" variant="outlineLight" size="lg">
              View services
            </Button>
          </div>
        </div>

        <nav
          aria-label="Core services"
          className="rise grid grid-cols-2 border-t border-white/15 lg:grid-cols-4"
          style={delay(560)}
        >
          {services.map((service, i) => (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              className="group flex items-center justify-between gap-3 border-white/15 py-5 pr-4 transition-colors hover:bg-white/[0.05] focus:outline-none focus-visible:bg-white/[0.07] max-lg:odd:border-r max-lg:[&:nth-child(n+3)]:border-t lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0"
            >
              <span className="flex items-baseline gap-3">
                <span className="text-[11px] font-semibold tabular-nums text-aqua-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-semibold leading-snug text-white">
                  {service.title}
                </span>
              </span>
              <ArrowRight className="hidden h-4 w-4 shrink-0 text-aqua-300 transition-transform duration-200 group-hover:translate-x-1 sm:block" />
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
