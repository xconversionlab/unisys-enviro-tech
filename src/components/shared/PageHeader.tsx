import { Breadcrumbs, Crumb } from "@/components/shared/Breadcrumbs";

interface PageHeaderProps {
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  description?: string;
  /** Large decorative index, e.g. "01" for service pages */
  index?: string;
}

/** Shared dark page header used by every inner page. */
export function PageHeader({ crumbs, eyebrow, title, description, index }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-navy-950 text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(58rem_26rem_at_88%_-12%,rgba(0,128,128,0.24),transparent_62%),linear-gradient(180deg,#0a1626,#112236)]"
      />
      <div aria-hidden="true" className="water-lines absolute inset-0" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-aqua-500/50 to-transparent"
      />

      {index && (
        <span
          aria-hidden="true"
          className="font-display pointer-events-none absolute -bottom-10 right-4 select-none text-[10rem] font-light leading-none tracking-tighter text-white/[0.05] sm:right-10 md:text-[15rem]"
        >
          {index}
        </span>
      )}

      <div className="container-site relative py-12 md:py-[4.5rem]">
        <Breadcrumbs items={crumbs} tone="dark" />
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="eyebrow rise mb-4 text-aqua-300">
              <span aria-hidden="true" className="h-px w-7 bg-current opacity-50" />
              {eyebrow}
            </p>
          )}
          <h1
            className="font-display rise text-[2rem] font-normal leading-[1.1] tracking-[-0.015em] sm:text-[2.5rem] md:text-[3rem]"
            style={{ "--d": "80ms" } as React.CSSProperties}
          >
            {title}
          </h1>
          {description && (
            <p
              className="rise mt-5 max-w-2xl leading-relaxed text-navy-200"
              style={{ "--d": "160ms" } as React.CSSProperties}
            >
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
