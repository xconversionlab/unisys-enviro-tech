import { siteImages } from "@/data/site-images";

export type Service = {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  description: string;
  features: string[];
  applications: string[];
  image: string;
  imageAlt?: string;
  imageRatio: string;
};

export const services: Service[] = [
  {
    id: "wtp",
    slug: "water-treatment-system",
    title: "Water Treatment System",
    shortTitle: "Water Treatment",
    summary:
      "Water treatment systems for industrial processes, building utilities, and drinking-water supply.",
    description:
      "Water treatment systems are selected based on the source water and its intended use. Depending on test results and the required water quality, treatment may include clarification, filtration, disinfection, and additional treatment stages. System capacity and configuration are matched to site requirements, with provision for expansion where needed.",
    features: [
      "Treatment selected using source-water analysis",
      "Clarification, filtration, and disinfection",
      "Process, utility, and drinking-water applications",
      "Systems that can be expanded as needed",
      "Pre-treatment before reverse osmosis or other processes",
    ],
    applications: [
      "Industrial and process water",
      "Commercial and institutional water supply",
      "Utility and drinking water",
      "Pre-treatment for other water treatment systems",
    ],
    image: siteImages.waterTreatment.src,
    imageAlt: siteImages.waterTreatment.alt,
    imageRatio: "2048 / 1365",
  },
  {
    id: "stp",
    slug: "sewage-treatment-system",
    title: "Sewage Treatment System",
    shortTitle: "Sewage Treatment",
    summary: "Sewage treatment systems for domestic and institutional wastewater.",
    description:
      "Sewage treatment systems are selected based on wastewater quality, available site space, and applicable discharge or reuse requirements. Biological treatment reduces organic matter and suspended solids; additional treatment can be included when required for the intended use.",
    features: [
      "Treatment selected based on wastewater characteristics",
      "Biological treatment to reduce organic matter and suspended solids",
      "Compact and conventional system options",
      "Treatment planned for discharge or reuse requirements",
      "Additional treatment where required for reuse",
    ],
    applications: [
      "Residential and institutional wastewater",
      "Commercial building wastewater",
      "Sewage from campuses and facilities",
      "Wastewater treatment for reuse",
    ],
    image: siteImages.sewageTreatment.src,
    imageAlt: siteImages.sewageTreatment.alt,
    imageRatio: "2048 / 1545",
  },
  {
    id: "ro",
    slug: "reverse-osmosis-system",
    title: "Reverse Osmosis System",
    shortTitle: "Reverse Osmosis",
    summary:
      "Reverse osmosis systems for demineralised process water and drinking water.",
    description:
      "Reverse osmosis systems reduce dissolved salts and other impurities in feed water. Configuration depends on feed-water analysis, water-recovery requirements, and intended use. Pre-treatment helps protect the membranes, while post-treatment can adjust water quality for the application. Systems are available as skid-mounted units or larger plant installations.",
    features: [
      "System configuration based on feed-water analysis",
      "Pre-treatment to help protect membrane service life",
      "Treatment designed for the required water quality",
      "Process and drinking-water applications",
      "Skid-mounted or plant-scale systems",
    ],
    applications: [
      "Demineralised process water",
      "Drinking water",
      "Boiler and utility feed water",
      "Membrane-based water purification",
    ],
    image: siteImages.reverseOsmosis.src,
    imageAlt: siteImages.reverseOsmosis.alt,
    imageRatio: "2048 / 1483",
  },
  {
    id: "analysis",
    slug: "water-wastewater-analysis",
    title: "Water & Wastewater Analysis",
    shortTitle: "Water Analysis",
    summary: "Water and wastewater testing to support treatment planning and system reviews.",
    description:
      "Water and wastewater analysis identifies the quality parameters needed for treatment planning. Test results help determine suitable treatment processes, system capacity, and operating requirements. Analysis can also support the assessment of systems already in service.",
    features: [
      "Raw-water quality testing",
      "Wastewater and effluent analysis",
      "Data to help select the treatment process",
      "Data to inform system capacity and sizing",
      "Assessment of treatment systems in service",
    ],
    applications: [
      "Planning new treatment systems",
      "Assessment of existing systems",
      "Water-quality testing",
      "Wastewater-quality testing",
    ],
    image: siteImages.waterAnalysis.src,
    imageAlt: siteImages.waterAnalysis.alt,
    imageRatio: "2048 / 1365",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return services.map((s) => s.slug);
}
