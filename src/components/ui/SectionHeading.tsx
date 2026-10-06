import { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  light?: boolean;
  as?: "h1" | "h2" | "h3";
  /** Constrain the measure of the description text */
  measure?: "default" | "narrow";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className = "",
  light = false,
  as: Heading = "h2",
  measure = "default",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  const titleColor = light ? "text-white" : "text-navy-950";
  const descColor = light ? "text-navy-200" : "text-navy-600";
  const eyebrowColor = light ? "text-aqua-300" : "text-aqua-700";

  return (
    <div className={`max-w-3xl ${alignClass} ${className}`}>
      {eyebrow && (
        <p
          className={`eyebrow mb-4 ${eyebrowColor} ${
            align === "center" ? "justify-center" : ""
          }`}
        >
          <span aria-hidden="true" className="h-px w-7 bg-current opacity-50" />
          {eyebrow}
        </p>
      )}
      <Heading
        className={`font-display text-[1.75rem] font-normal leading-[1.14] tracking-[-0.015em] sm:text-[2.125rem] md:text-[2.5rem] ${titleColor}`}
      >
        {title}
      </Heading>
      {description && (
        <p
          className={`mt-5 leading-relaxed ${descColor} ${
            measure === "narrow" ? "max-w-xl" : "max-w-2xl"
          } ${align === "center" ? "mx-auto" : ""}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
