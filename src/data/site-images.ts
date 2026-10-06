export const siteImages = {
  hero: {
    src: "/images/client-4k/hero-rooftop-water-filtration.webp",
    alt: "Rooftop water filtration installation with blue treatment vessels and connected pipework",
  },
  about: {
    src: "/images/client-4k/about-pumping-station.webp",
    alt: "Industrial water pumping equipment installed as part of a treatment system",
  },
  waterTreatment: {
    src: "/images/client-4k/service-water-treatment.webp",
    alt: "Blue pressure filtration vessels and pipework in a water treatment installation",
  },
  sewageTreatment: {
    src: "/images/client-4k/service-sewage-treatment.webp",
    alt: "Industrial aeration basin equipment used in wastewater treatment",
  },
  reverseOsmosis: {
    src: "/images/client-4k/service-reverse-osmosis.webp",
    alt: "Industrial water filtration and control equipment",
  },
  waterAnalysis: {
    src: "/images/client-4k/service-water-analysis.webp",
    alt: "Water treatment control panel and system instrumentation",
  },
  solution: {
    src: "/images/client-4k/solution-pipe-manifold.webp",
    alt: "Industrial treatment pipe manifold and distribution system",
  },
  equipmentAerationGrid: {
    src: "/images/client-4k/equipment-aeration-grid.webp",
    alt: "Industrial aeration pipe grid installed across a treatment basin",
  },
  equipmentTubeSettler: {
    src: "/images/client-4k/equipment-tube-settler-blowers.webp",
    alt: "Tube settler and blower equipment within a treatment installation",
  },
  equipmentBlowers: {
    src: "/images/client-4k/equipment-blowers.webp",
    alt: "Industrial aeration blowers installed in a plant equipment room",
  },
} as const;

/** Hero photograph reused as the social sharing card. */
export const socialImage = siteImages.hero.src;
