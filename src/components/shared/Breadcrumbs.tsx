import Link from "next/link";

export type Crumb = {
  label: string;
  href?: string;
};

interface BreadcrumbsProps {
  items: Crumb[];
  tone?: "light" | "dark";
}

export function Breadcrumbs({ items, tone = "light" }: BreadcrumbsProps) {
  const dark = tone === "dark";
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol
        className={`flex flex-wrap items-center gap-2 text-[13px] ${
          dark ? "text-navy-300" : "text-navy-500"
        }`}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex min-h-6 items-center gap-2">
              {index > 0 && (
                <span className={dark ? "text-navy-500" : "text-navy-300"} aria-hidden>
                  /
                </span>
              )}
              {isLast || !item.href ? (
                <span
                  className={`inline-flex min-h-6 items-center ${
                    isLast
                      ? dark
                        ? "font-medium text-white"
                        : "font-medium text-navy-900"
                      : ""
                  }`}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={`inline-flex min-h-6 items-center transition-colors ${
                    dark ? "hover:text-aqua-300" : "hover:text-aqua-700"
                  }`}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
