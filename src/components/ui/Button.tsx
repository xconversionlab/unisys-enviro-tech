import Link from "next/link";
import { ReactNode } from "react";
import { ArrowRight } from "@/components/ui/Icons";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "light"
  | "outlineLight";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
  external?: boolean;
  arrow?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-navy-900 text-white hover:bg-navy-950 focus-visible:ring-navy-500",
  secondary:
    "bg-aqua-700 text-white hover:bg-aqua-800 focus-visible:ring-aqua-600",
  outline:
    "border border-navy-300 text-navy-900 hover:border-navy-900 hover:bg-navy-900 hover:text-white focus-visible:ring-navy-500",
  ghost: "text-navy-800 hover:bg-navy-50 focus-visible:ring-navy-500",
  light: "bg-white text-navy-900 hover:bg-aqua-50 focus-visible:ring-white",
  outlineLight:
    "border border-white/35 text-white hover:border-white hover:bg-white/10 focus-visible:ring-white",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-[13px]",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-[15px]",
};

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  ariaLabel,
  external = false,
  arrow = false,
}: ButtonProps) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-sm font-semibold tracking-[0.01em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:pointer-events-none disabled:opacity-60";

  const classes = `${base} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  const content = (
    <>
      {children}
      {arrow && (
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      )}
    </>
  );

  if (href) {
    if (/^(tel:|mailto:)/.test(href)) {
      return (
        <a href={href} className={classes} aria-label={ariaLabel} onClick={onClick}>
          {content}
        </a>
      );
    }
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          aria-label={ariaLabel}
          onClick={onClick}
          target="_blank"
          rel="noopener noreferrer"
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} aria-label={ariaLabel} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} aria-label={ariaLabel}>
      {content}
    </button>
  );
}
