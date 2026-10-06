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
      "Water treatment systems for process, utility and potable water requirements.",
    description:
      "Water treatment systems are configured around the source water and its intended use. Raw water from borewell, surface or municipal supply is treated through the stages the analysis indicates — clarification, filtration, disinfection and polishing — to reach the quality the application requires. Systems are sized to the site and can be staged as demand grows.",
    features: [
      "System design based on source-water analysis",
      "Clarification, filtration and disinfection stages",
      "Process, utility and potable water duties",
      "Modular configurations for staged expansion",
      "Integration with reverse osmosis where required",
    ],
    applications: [
      "Industrial and process water",
      "Commercial and institutional water supply",
      "Utility and potable water",
      "Pre-treatment for downstream systems",
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
      "Sewage treatment systems treat domestic and institutional wastewater to the discharge or reuse standard the site is working to. Process selection follows the wastewater characteristics, the available footprint and the quality target, with biological treatment for organic load and solids removal. Treated water can be polished further where reuse is intended.",
    features: [
      "Process selection based on wastewater characteristics",
      "Biological treatment for organic load and solids",
      "Compact and conventional configurations",
      "Design to discharge or reuse objectives",
      "Provision for further polishing where required",
    ],
    applications: [
      "Residential and institutional wastewater",
      "Commercial building wastewater",
      "Campus and facility sewage",
      "Treatment for reuse",
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
      "Reverse osmosis systems reduce dissolved salts and other impurities to produce water of consistent quality. Configuration follows feed-water analysis, recovery targets and the end use, with pre-treatment protecting the membranes and post-treatment adjusting the permeate where needed. Systems are configured as skid-mounted units or as plant installations.",
    features: [
      "Configuration from feed-water analysis",
      "Pre-treatment to protect membrane life",
      "Consistent permeate quality",
      "Process and potable water duties",
      "Skid-mounted and plant-scale options",
    ],
    applications: [
      "Demineralised process water",
      "Potable and drinking water",
      "Boiler and utility feed",
      "Membrane-based purification",
    ],
    image: siteImages.reverseOsmosis.src,
    imageAlt: siteImages.reverseOsmosis.alt,
    imageRatio: "2048 / 1483",
  },
  {
    id: "analysis",
    slug: "water-wastewater-analysis",
    title: "Water, Waste Water Analysis",
    shortTitle: "Water Analysis",
    summary: "Analytical support for water and wastewater characterisation.",
    description:
      "Analysis establishes what the water contains before treatment decisions are made. Raw water and effluent are characterised so that process selection, plant sizing and operating expectations rest on measured values rather than assumption. The same data supports the review of systems already in service.",
    features: [
      "Raw water characterisation",
      "Effluent and wastewater assessment",
      "Input to treatment process selection",
      "Support for plant sizing decisions",
      "Review of systems in service",
    ],
    applications: [
      "New treatment-plant planning",
      "Assessment of existing systems",
      "Water-quality characterisation",
      "Wastewater-quality characterisation",
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
