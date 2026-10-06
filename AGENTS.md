# UNISYS ENVIRO TECH PVT. LTD. — website

Next.js (App Router) + TypeScript + Tailwind marketing site for a Chennai water
resource technology company. Fully static (SSG) at build time.

## Commands

- Dev: `npm run dev`
- Build: `npm run build`
- Production server: `npx next start -p 12000 -H 0.0.0.0`
- Typecheck: `npx tsc --noEmit`
- Lint: `npx next lint`

## Quality scripts (`scripts/`)

- `scripts/check-image-uniqueness.mjs` — every photograph must be declared once in
  `src/data/site-images.ts` and rendered exactly once. Never reference a raw image
  path outside that file; use `siteImages.<key>.src`.
- `scripts/qa/qa-audit.mjs` — layout/overflow/contrast audit across viewports.
- `scripts/qa/qa-a11y.mjs` — heading order, labels, alt text, touch targets.
- `scripts/qa/qa-functional.mjs` — nav, mobile menu, form validation, reduced motion.
- `scripts/qa/qa-shots.mjs [tag]` — full-page screenshots to `/tmp/shots`.

These require a running server on port 12000 and Playwright's chromium at
`/usr/bin/chromium`.

## Conventions

- Company facts live in `src/data/company.ts`. The address is **N.G.O. Nagar**,
  never "M.G.R. Nagar".
- Services are the four exact ones in `src/data/services.ts`. Do not invent specs,
  certifications, testimonials or project claims.
- Copy style: concise, mature corporate/engineering English. No clichés
  ("world-class", "cutting-edge", "trusted partner"), no internal/meta wording
  ("supplied", "placeholder", "verified", "sample").
- Each supplied photograph has exactly one intentional location.
- `tailwind.config.ts` `minHeight` spreads `theme("spacing")` plus explicit
  full/screen/svh/lvh/dvh/min/max/fit — do not revert to `theme("minHeight")`
  (recursive and breaks `min-h-screen`).
- `NEXT_PUBLIC_SITE_URL` sets metadataBase/canonical/sitemap origin (see
  `.env.example`).
