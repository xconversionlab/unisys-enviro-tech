import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#f4f6f9",
          100: "#e3e8ef",
          200: "#c6d0dd",
          300: "#9fb0c4",
          400: "#7189a3",
          500: "#526b86",
          600: "#3d5570",
          700: "#2c4059",
          800: "#1d2f45",
          900: "#122236",
          950: "#0a1626",
        },
        aqua: {
          50: "#e6f7f9",
          100: "#ccefef",
          200: "#99dfdf",
          300: "#66cfcf",
          400: "#33bfbf",
          500: "#00a0a0",
          600: "#008080",
          700: "#006666",
          800: "#004d4d",
          900: "#003333",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        display: [
          "var(--font-display)",
          "Iowan Old Style",
          "Palatino Linotype",
          "Georgia",
          "serif",
        ],
      },
      maxWidth: {
        site: "80rem",
      },
      minHeight: ({ theme }) => ({
        ...theme("spacing"),
        full: "100%",
        screen: "100vh",
        svh: "100svh",
        lvh: "100lvh",
        dvh: "100dvh",
        min: "min-content",
        max: "max-content",
        fit: "fit-content",
      }),
      boxShadow: {
        soft: "0 1px 2px rgba(16,42,67,0.05), 0 8px 24px -12px rgba(16,42,67,0.12)",
        lift: "0 2px 4px rgba(16,42,67,0.06), 0 24px 48px -20px rgba(16,42,67,0.28)",
      },
    },
  },
  plugins: [],
};

export default config;
