import type { Metadata, Viewport } from "next";
import { TopBar } from "@/components/layout/TopBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { company } from "@/data/company";
import { socialImage } from "@/data/site-images";
import { displayFont, sansFont } from "@/lib/fonts";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const siteDescription =
  "Water treatment, sewage treatment, reverse osmosis and water and wastewater analysis services from UNISYS ENVIRO TECH PVT. LTD., Chennai.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${company.name} | Water Resource Technology`,
    template: `%s | ${company.shortName}`,
  },
  description: siteDescription,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: company.name,
    title: `${company.name} | Water Resource Technology`,
    description:
      "Water and wastewater treatment services from UNISYS ENVIRO TECH PVT. LTD.",
    url: "/",
    images: [
      {
        url: socialImage,
        width: 2048,
        height: 972,
        alt: "Rooftop water filtration installation with treatment vessels and pipework",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${company.name} | Water Resource Technology`,
    description:
      "Water and wastewater treatment services from UNISYS ENVIRO TECH PVT. LTD.",
    images: [socialImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#102a43",
};

// Built only from details already present in data/company.ts
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.name,
  url: siteUrl,
  telephone: "+919884313191",
  email: company.contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${company.contact.address.line1} ${company.contact.address.line2} ${company.contact.address.line3} ${company.contact.address.line4}`,
    addressLocality: "Chennai",
    postalCode: "600063",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className={`${sansFont.variable} ${displayFont.variable}`}>
      <body className="flex min-h-screen flex-col bg-white text-navy-900 antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-sm focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-navy-900 focus:shadow-lg"
        >
          Skip to main content
        </a>
        <TopBar />
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
