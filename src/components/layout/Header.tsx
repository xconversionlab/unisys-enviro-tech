"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mainNav, NavNode } from "@/data/navigation";
import { company } from "@/data/company";
import { Button } from "@/components/ui/Button";
import { ChevronDown } from "@/components/ui/Icons";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openNodes, setOpenNodes] = useState<Record<string, boolean>>({});
  const [scrolled, setScrolled] = useState(false);

  const closeMobile = () => {
    setMobileOpen(false);
    setOpenNodes({});
  };

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close on route change
  useEffect(() => {
    setMobileOpen(false);
    setOpenNodes({});
  }, [pathname]);

  // Deepen the header once the page has scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on Escape and when the viewport grows to desktop
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setOpenNodes({});
      }
    };
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setMobileOpen(false);
        setOpenNodes({});
      }
    };
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onChange);
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onChange);
    };
  }, [mobileOpen]);

  const toggleNode = (key: string) => {
    setOpenNodes((current) => ({ ...current, [key]: !current[key] }));
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md transition-[border-color,box-shadow] duration-300 supports-[backdrop-filter]:bg-white/80 ${
        scrolled ? "border-navy-100 shadow-[0_1px_20px_-12px_rgba(10,22,38,0.4)]" : "border-transparent"
      }`}
    >
      <div className="container-site flex min-h-[4.25rem] items-center justify-between gap-4 lg:min-h-[5rem]">
        <Link
          href="/"
          onClick={closeMobile}
          aria-label={`${company.name} — home`}
          className="flex min-w-0 items-center gap-3 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-500"
        >
          <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-1 ring-navy-100">
            <Image
              src="/images/brand/logo-icon.png"
              alt=""
              fill
              sizes="44px"
              className="object-contain"
              priority
            />
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-[15px] font-bold tracking-[-0.01em] text-navy-950 sm:text-base">
              UNISYS ENVIRO TECH
            </span>
            <span className="mt-0.5 block text-[10px] uppercase tracking-[0.16em] text-navy-500">
              Water Resource Technology
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {mainNav.map((item) => (
            <DesktopNavItem key={item.href} item={item} pathname={pathname} />
          ))}
        </nav>

        <div className="hidden shrink-0 lg:block">
          <Button href="/contact" variant="primary" size="sm">
            Contact us
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-sm text-navy-800 transition-colors hover:bg-navy-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-500 lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {mobileOpen && (
        <div
          id="mobile-navigation"
          className="absolute inset-x-0 top-full z-40 max-h-[calc(100dvh-4.25rem)] overflow-y-auto overscroll-contain border-t border-navy-100 bg-white shadow-lg lg:hidden"
        >
          <nav className="container-site flex flex-col gap-1 py-5" aria-label="Mobile main navigation">
            {mainNav.map((item) => (
              <MobileNavItem
                key={item.href}
                item={item}
                depth={0}
                pathname={pathname}
                openNodes={openNodes}
                toggleNode={toggleNode}
                closeMobile={closeMobile}
              />
            ))}

            <div className="mt-4 border-t border-navy-100 px-1 pt-5">
              <Button href="/contact" variant="primary" size="lg" className="w-full" onClick={closeMobile}>
                Contact us
              </Button>
              <div className="mt-5 space-y-1 border-t border-navy-50 pt-5 text-sm text-navy-600">
                <a href={company.contact.phoneHref} className="flex min-h-11 items-center hover:text-navy-950">
                  {company.contact.phone}
                </a>
                <a href={company.contact.telephoneHref} className="flex min-h-11 items-center hover:text-navy-950">
                  {company.contact.telephone}
                </a>
                <a href={company.contact.emailHref} className="flex min-h-11 items-center break-all hover:text-navy-950">
                  {company.contact.email}
                </a>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function DesktopNavItem({ item, pathname }: { item: NavNode; pathname: string }) {
  const active = isActive(pathname, item.href);
  const linkClass = `relative inline-flex min-h-12 items-center gap-1.5 px-3 text-[14px] font-semibold tracking-[-0.005em] transition-colors hover:text-aqua-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-500 after:absolute after:inset-x-3 after:bottom-2.5 after:h-px after:origin-left after:bg-aqua-600 after:transition-transform after:duration-200 hover:after:scale-x-100 ${
    active ? "text-aqua-700 after:scale-x-100" : "text-navy-800 after:scale-x-0"
  }`;

  if (!item.children?.length) {
    return (
      <Link href={item.href} className={linkClass} aria-current={active ? "page" : undefined}>
        {item.label}
      </Link>
    );
  }

  return (
    <div className="group relative">
      <Link href={item.href} className={linkClass} aria-current={active ? "page" : undefined}>
        {item.label}
        <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform group-focus-within:rotate-180 group-hover:rotate-180 group-hover:opacity-100" />
      </Link>

      {/* pt-2 bridges the hover gap; focus-within keeps the menu open for keyboard users */}
      <div className="invisible absolute left-0 top-full z-50 w-[280px] translate-y-2 pt-2 opacity-0 transition-all duration-150 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
        <div className="overflow-hidden rounded-sm border border-navy-100 bg-white py-2 shadow-lift">
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              aria-current={pathname === child.href ? "page" : undefined}
              className="flex min-h-12 items-center justify-between gap-4 px-4 py-3 text-sm font-medium text-navy-700 transition-colors hover:bg-navy-50 hover:text-navy-950 focus:outline-none focus-visible:bg-navy-50 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-navy-500"
            >
              <span>{child.label}</span>
              <span className="text-navy-300" aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileNavItem({
  item,
  depth,
  pathname,
  openNodes,
  toggleNode,
  closeMobile,
}: {
  item: NavNode;
  depth: number;
  pathname: string;
  openNodes: Record<string, boolean>;
  toggleNode: (key: string) => void;
  closeMobile: () => void;
}) {
  const hasChildren = Boolean(item.children?.length);
  const key = `${depth}:${item.href}`;
  const isOpen = Boolean(openNodes[key]);
  const active = isActive(pathname, item.href);
  const panelId = `mobile-sub-${depth}-${item.href.replace(/[^a-z0-9]+/gi, "-")}`;
  const linkClass = `flex min-h-12 items-center font-semibold hover:text-aqua-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-navy-500 ${
    active ? "text-aqua-700" : "text-navy-900"
  }`;

  if (!hasChildren) {
    return (
      <Link
        href={item.href}
        className={`${linkClass} ${
          depth === 0 ? "border-b border-navy-50 px-1 text-base" : "px-5 text-sm font-medium"
        }`}
        aria-current={active ? "page" : undefined}
        onClick={closeMobile}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className={depth === 0 ? "border-b border-navy-50" : ""}>
      <div className="flex items-center">
        <Link
          href={item.href}
          className={`${linkClass} flex-1 px-1 ${depth > 0 ? "pl-5 text-sm" : "text-base"}`}
          aria-current={active ? "page" : undefined}
          onClick={closeMobile}
        >
          {item.label}
        </Link>
        <button
          type="button"
          className="flex h-12 w-12 items-center justify-center rounded-sm text-navy-800 hover:bg-navy-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-500"
          aria-label={`${isOpen ? "Collapse" : "Expand"} ${item.label} submenu`}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => toggleNode(key)}
        >
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      </div>
      {isOpen && (
        <ul id={panelId} className="pb-2">
          {item.children!.map((child) => (
            <li key={child.href}>
              <Link
                href={child.href}
                className={`flex min-h-11 items-center rounded-sm px-5 py-2.5 text-sm ${
                  pathname === child.href
                    ? "font-semibold text-aqua-700"
                    : "text-navy-600 hover:text-navy-950"
                }`}
                aria-current={pathname === child.href ? "page" : undefined}
                onClick={closeMobile}
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
