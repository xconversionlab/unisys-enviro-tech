import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="section-padding bg-white">
      <div className="container-site">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center text-aqua-700">
            <span aria-hidden="true" className="h-px w-7 bg-current opacity-50" />
            Error 404
          </p>
          <h1 className="font-display mt-5 text-[2rem] font-normal leading-[1.12] tracking-[-0.015em] text-navy-950 sm:text-[2.5rem]">
            This page could not be found
          </h1>
          <p className="mx-auto mt-5 max-w-lg leading-relaxed text-navy-600">
            The page you were looking for is not here. It may have moved, or the link may
            be out of date. You can return to the home page or go straight to our services.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button href="/" variant="primary" size="lg" arrow>
              Back to home
            </Button>
            <Button href="/services" variant="outline" size="lg">
              View services
            </Button>
          </div>
          <p className="mt-10 text-sm text-navy-600">
            Or contact us on{" "}
            <a className="link-inline" href={company.contact.phoneHref}>
              {company.contact.phone}
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
