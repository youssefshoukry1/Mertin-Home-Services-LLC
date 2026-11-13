"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const services = [
  ["Handyman Services", "handyman-services"],
  ["Home Repairs", "home-repairs"],
  ["Assembly & Installation", "assembly-installation"],
  ["Cleaning Services", "cleaning-services"],
  ["Home Renovation", "home-renovation"],
];

function ServicesDropdown() {
  const [open, setOpen] = useState(false);
  const root = useRef(null);
  const trigger = useRef(null);
  const pathname = usePathname();
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const close = (event) => { if (!root.current?.contains(event.target)) setOpen(false); };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [open]);
  return (
    <div className="services-dropdown" ref={root} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }} onKeyDown={(event) => {
      if (event.key === "Escape") { setOpen(false); trigger.current?.focus(); }
      if (event.key === "ArrowDown" && event.target === trigger.current) { event.preventDefault(); setOpen(true); requestAnimationFrame(() => root.current?.querySelector("a")?.focus()); }
    }}>
      <button ref={trigger} type="button" className="nav-item services-trigger" aria-expanded={open} onClick={() => setOpen(!open)}>
        Services
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
      </button>
      {open && <div className="services-dropdown-panel">
        {services.map(([label, slug]) => <Link key={slug} href={`/services/${slug}`} aria-current={pathname === `/services/${slug}` ? "page" : undefined} onClick={(event) => {
          setOpen(false);
          event.currentTarget.closest("details")?.removeAttribute("open");
        }}>{label}</Link>)}
      </div>}
    </div>
  );
}

const links = [
  ["Home", "/"],
  ["Services", "/services"],
  ["About Us", "/about"],
  ["Service Areas", "/service-areas"],
  ["Contact", "/#contact"],
];

function NavigationLinks() {
  const pathname = usePathname();
  return links.map(([label, href]) => label === "Services" ? <ServicesDropdown key={href} /> : (
    <Link key={href} href={label === "Contact" && pathname.startsWith("/services/") ? "#contact" : href} className="nav-item" aria-current={href === pathname ? "page" : undefined}>
      {label}
    </Link>
  ));
}

function RequestLink() {
  const pathname = usePathname();
  return (
    <Link href={pathname.startsWith("/services/") ? "#contact" : "/#contact"} className="nav-request">
      Request Service
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M7 17 17 7M7 7h10v10" />
      </svg>
    </Link>
  );
}

export default function Navbar() {
  return (
    <header className="hero-header">
      <Link href="/" className="nav-brand" aria-label="Mertin Home Services LLC home">
        <span className="nav-wordmark">Mertin.</span>
        <span className="nav-brand-caption">HOME SERVICES LLC</span>
      </Link>
      <nav className="nav-pill" aria-label="Main navigation">
        <NavigationLinks />
        <RequestLink />
      </nav>
      <details className="mobile-navigation">
        <summary aria-label="Toggle navigation menu">
          <span>Menu</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><path d="M4 8h16M4 16h16" /></svg>
        </summary>
        <nav className="mobile-nav-panel" aria-label="Mobile navigation">
          <NavigationLinks />
          <RequestLink />
        </nav>
      </details>
    </header>
  );
}
