export type IndustryCategory = {
  id: string;
  title: string;
  description: string;
};

export const industries: IndustryCategory[] = [
  {
    id: "industrial",
    title: "Industrial & Process Facilities",
    description:
      "We assess source-water quality and process requirements to identify suitable treatment for industrial water, utilities, and wastewater.",
  },
  {
    id: "commercial",
    title: "Commercial Buildings",
    description:
      "Treatment systems are planned around water demand, wastewater volumes, available space, and access for maintenance.",
  },
  {
    id: "institutional",
    title: "Institutional Facilities",
    description:
      "Campuses, hostels, and institutional premises need water supply and sewage systems sized for the people who use them.",
  },
  {
    id: "residential",
    title: "Residential Developments",
    description:
      "For housing developments, water and sewage treatment is planned around occupancy, discharge requirements, and opportunities for reuse.",
  },
  {
    id: "hospitality",
    title: "Hotels & Hospitality",
    description:
      "Hotels need reliable water quality for daily operations and wastewater treatment suited to the building and site.",
  },
  {
    id: "analysis",
    title: "Analysis & System Review",
    description:
      "Water and wastewater testing helps plan new systems and assess treatment plants already in operation.",
  },
];
