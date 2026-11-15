"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Home, Layers, MapPin, Mail, ArrowUpRight, Menu, X, ChevronDown } from "lucide-react";
import styles from "./Navbar.module.css";

const services = [
  ["Handyman Services", "handyman-services"],
  ["Home Repairs", "home-repairs"],
  ["Assembly & Installation", "assembly-installation"],
  ["Cleaning Services", "cleaning-services"],
  ["Home Renovation", "home-renovation"],
];

function ItemContent({ label, Icon }) {
  return <><span className={styles.label}>{label}</span><span className={styles.icon}><Icon size={21} aria-hidden="true" /></span><span className={styles.tooltip} aria-hidden="true">{label}</span></>;
}

export default function Navbar() {
  const pathname = usePathname();
  const [compact, setCompact] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const root = useRef(null);
  const menuTrigger = useRef(null);
  const serviceTrigger = useRef(null);
  const contact = pathname.startsWith("/services/") ? "#contact" : "/#contact";
  const links = [["Home", "/", Home], ["Service Areas", "/service-areas", MapPin], ["Contact", contact, Mail]];

  useEffect(() => { setMenuOpen(false); setServicesOpen(false); }, [pathname]);
  useEffect(() => {
    let previous = window.scrollY;
    let direction = 0;
    let distance = 0;
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      const current = Math.max(0, Math.min(window.scrollY, max));
      const delta = current - previous;
      previous = current;
      if (current <= 48) { direction = 0; distance = 0; setCompact(false); return; }
      if (Math.abs(delta) < .3) return;
      const nextDirection = delta > 0 ? 1 : -1;
      distance = nextDirection === direction ? distance + Math.abs(delta) : Math.abs(delta);
      direction = nextDirection;
      if (direction === 1 && distance >= 28 && current > 96) setCompact(true);
      if (direction === -1 && distance >= 18) setCompact(false);
    };
    const scroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", scroll, { passive: true });
    return () => { window.removeEventListener("scroll", scroll); cancelAnimationFrame(frame); };
  }, []);
  useEffect(() => {
    const outside = (event) => {
      if (!root.current?.contains(event.target)) { setMenuOpen(false); setServicesOpen(false); }
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, []);
  const close = () => { setMenuOpen(false); setServicesOpen(false); };
  const serviceList = <div className={styles.serviceList}>{services.map(([label, slug]) => <Link key={slug} href={`/services/${slug}`} onClick={close} aria-current={pathname === `/services/${slug}` ? "page" : undefined}>{label}<ArrowUpRight size={16} aria-hidden="true" /></Link>)}</div>;

  return (
    <>
      <div className={styles.spacer} />
      <header ref={root} className={styles.root} data-compact={compact && !menuOpen} data-menu-open={menuOpen} onKeyDown={(event) => {
        if (event.key === "Escape") {
          if (servicesOpen) { setServicesOpen(false); serviceTrigger.current?.focus(); }
          else { setMenuOpen(false); menuTrigger.current?.focus(); }
        }
      }}>
        <div className={styles.bar}>
          <Link href="/" className={styles.brand} aria-label="Mertin Home Services LLC home" onClick={close}>
            <span className={styles.wordmark}>Mertin.</span><span className={styles.caption}>HOME SERVICES LLC</span>
          </Link>
          <span className={styles.divider} aria-hidden="true" />
          <nav className={styles.links} aria-label="Main navigation">
            <Link href="/" className={styles.link} aria-label="Home" aria-current={pathname === "/" ? "page" : undefined}><ItemContent label="Home" Icon={Home} /></Link>
            <div className={styles.services} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setServicesOpen(false); }}>
              <button ref={serviceTrigger} type="button" className={styles.link} aria-label="Services" aria-expanded={servicesOpen} aria-controls="desktop-services" onClick={() => setServicesOpen(!servicesOpen)} onKeyDown={(event) => {
                if (event.key === "ArrowDown") { event.preventDefault(); setServicesOpen(true); requestAnimationFrame(() => document.getElementById("desktop-services")?.querySelector("a")?.focus()); }
              }}><ItemContent label={<>Services <ChevronDown size={13} /></>} Icon={Layers} /></button>
              <div id="desktop-services" className={styles.dropdown} hidden={!servicesOpen}>{serviceList}</div>
            </div>
            {links.slice(1).map(([label, href, Icon]) => <Link key={label} href={href} className={styles.link} aria-label={label}><ItemContent label={label} Icon={Icon} /></Link>)}
          </nav>
          <Link className={styles.cta} href={contact} aria-label="Request Service"><ItemContent label="Request Service" Icon={ArrowUpRight} /></Link>
          <button ref={menuTrigger} type="button" className={styles.menuButton} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => { setMenuOpen(!menuOpen); setServicesOpen(false); }}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
          <nav id="mobile-navigation" className={styles.mobilePanel} hidden={!menuOpen} aria-label="Mobile navigation">
            <Link href="/" onClick={close}>Home<ArrowUpRight size={20} /></Link>
            <button type="button" aria-expanded={servicesOpen} aria-controls="mobile-services" onClick={() => setServicesOpen(!servicesOpen)}>Services<ChevronDown size={20} /></button>
            <div id="mobile-services" hidden={!servicesOpen}>{serviceList}</div>
            {links.slice(1).map(([label, href]) => <Link key={label} href={href} onClick={close}>{label}<ArrowUpRight size={20} /></Link>)}
            <Link href={contact} onClick={close} className={styles.mobileCta}>Request Service<ArrowUpRight size={20} /></Link>
          </nav>
        </div>
      </header>
    </>
  );
}
