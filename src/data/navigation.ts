import { services } from "./services";

export type NavNode = {
  label: string;
  href: string;
  children?: NavNode[];
};

export type NavItem = NavNode;

/**
 * Primary navigation. Products & Services children are the four service pages.
 */
export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/about",
    children: [
      { label: "About Company", href: "/about/company" },
      { label: "Certificates", href: "/about/certificates" },
    ],
  },
  {
    label: "Products & Services",
    href: "/services",
    children: services.map((service) => ({
      label: service.title,
      href: `/services/${service.slug}`,
    })),
  },
  { label: "Industries", href: "/industries" },
  { label: "Clients", href: "/clients" },
  { label: "Contact", href: "/contact" },
];

export const footerQuickLinks = [
  { label: "Home", href: "/" },
  { label: "About Company", href: "/about/company" },
  { label: "Certificates", href: "/about/certificates" },
  { label: "Industries", href: "/industries" },
  { label: "Clients", href: "/clients" },
  { label: "Contact", href: "/contact" },
];

export const footerServices = services.map((service) => ({
  label: service.title,
  href: `/services/${service.slug}`,
}));
