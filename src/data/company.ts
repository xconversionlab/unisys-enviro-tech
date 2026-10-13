export const company = {
  name: "UNISYS ENVIRO TECH PVT. LTD.",
  shortName: "UNISYS ENVIRO TECH",
  tagline: "Water Resource Technology",
  description:
    "UNISYS ENVIRO TECH PVT. LTD. provides water treatment, sewage treatment, reverse osmosis, and water and wastewater analysis for industrial, commercial, and institutional projects.",
  summary:
    "Water treatment, sewage treatment, reverse osmosis, and water and wastewater analysis for industrial, commercial, and institutional projects.",
  practice:
    "Core services include water treatment, sewage treatment, reverse osmosis, and water and wastewater analysis.",
  contact: {
    person: "M. CHANDRA PARI",
    designation: "Director",
    phone: "+91 98843 13191",
    phoneHref: "tel:+919884313191",
    additionalPhone: "+91 98843 13199",
    additionalPhoneHref: "tel:+919884313199",
    telephone: "+91 44 2953 5483",
    telephoneHref: "tel:+914429535483",
    email: "envirotechunisys@gmail.com",
    emailHref: "mailto:envirotechunisys@gmail.com",
    address: {
      line1: "No. 9, Jagadhambal Flat,",
      line2: "Saibaba Street,",
      line3: "N.G.O. Nagar,",
      line4: "New Perungalathur,",
      city: "Chennai - 600 063",
      state: "Tamil Nadu, India",
    },
    fullAddress:
      "No. 9, Jagadhambal Flat, Saibaba Street, N.G.O. Nagar, New Perungalathur, Chennai - 600 063, Tamil Nadu, India",
  },
  location: "Chennai, Tamil Nadu",
} as const;

export type Company = typeof company;
