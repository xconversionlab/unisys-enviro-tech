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
      "Process water, utility water and effluent duties are assessed against the source water available and the quality each stage of the process requires.",
  },
  {
    id: "commercial",
    title: "Commercial Buildings",
    description:
      "Buildings are served with treatment matched to their water demand, wastewater volumes and the space the services can be given.",
  },
  {
    id: "institutional",
    title: "Institutional Facilities",
    description:
      "Campuses, hostels and institutional premises call for water supply and sewage treatment sized to the population they serve.",
  },
  {
    id: "residential",
    title: "Residential Developments",
    description:
      "Housing projects use sewage treatment and water treatment systems planned around occupancy, discharge standards and reuse.",
  },
  {
    id: "hospitality",
    title: "Hotels & Hospitality",
    description:
      "Hotels and hospitality premises rely on consistent water quality for guests and on sewage treatment that suits the site.",
  },
  {
    id: "analysis",
    title: "Analysis & System Review",
    description:
      "Water and wastewater analysis supports the planning of new systems and the review of those already in service.",
  },
];
