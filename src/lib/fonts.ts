import localFont from "next/font/local";

/**
 * Self-hosted variable fonts, served from our own origin. The latin subset
 * covers the site's English content, so there is no third-party request.
 */
export const displayFont = localFont({
  src: "../assets/fonts/fraunces-latin.woff2",
  weight: "300 600",
  style: "normal",
  variable: "--font-display",
  display: "swap",
  fallback: ["Iowan Old Style", "Palatino Linotype", "Georgia", "serif"],
  adjustFontFallback: false,
});

export const sansFont = localFont({
  src: "../assets/fonts/manrope-latin.woff2",
  weight: "300 700",
  style: "normal",
  variable: "--font-sans",
  display: "swap",
  fallback: [
    "ui-sans-serif",
    "system-ui",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
  ],
  adjustFontFallback: false,
});
