"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, MapPin, MessageSquare } from "lucide-react";
import styles from "./Footer.module.css";

const services = [
 ["Handyman Services", "handyman-services"],
 ["Home Repairs", "home-repairs"],
 ["Assembly & Installation", "assembly-installation"],
 ["Cleaning Services", "cleaning-services"],
 ["Home Renovation", "home-renovation"],
];

export default function Footer() {
 const pathname = usePathname();
 const contact = pathname === "/" || pathname.startsWith("/services/") ? "#contact" : "/#contact";
 return (
  <footer className={styles.footer}>
   <div data-motion-section className={styles.banner}>
    <img src="/images/service-hero/home-renovation-2.webp" alt="" aria-hidden="true" loading="lazy" decoding="async" />
    <div className={styles.bannerContent}>
     <h2>Let&apos;s talk about<br />your property project.</h2>
     <Link href={contact} data-motion-cta className={styles.button}>Request service <ArrowUpRight size={18} aria-hidden="true" /></Link>
    </div>
   </div>
   <div className={styles.panel}>
    <div data-motion-section className={styles.columns}>
     <div data-motion-item className={styles.intro}>
      <Link href="/" className={styles.brand} aria-label="Mertin Home Services LLC home">Mertin.<span>HOME SERVICES LLC</span></Link>
      <p>Maintenance, repairs, installation, cleaning, and renovation for property owners, managers, and businesses.</p>
      <span className={styles.area}>Cape Coral &amp; surrounding areas</span>
     </div>
     <nav data-motion-item className={styles.group} aria-label="Footer services">
      <h2>Our services</h2>
      <ul>{services.map(([label,slug])=><li key={slug}><Link href={`/services/${slug}`}>{label}<ArrowUpRight size={13} aria-hidden="true" /></Link></li>)}</ul>
     </nav>
     <nav data-motion-item className={styles.group} aria-label="Footer explore">
      <h2>Explore</h2>
      <ul>{[["Home","/"],["All services","/#services"],["Service areas","/#service-areas"],["Plan your project","/#planner"]].map(([label,href])=><li key={href}><Link href={href}>{label}<ArrowUpRight size={13} aria-hidden="true" /></Link></li>)}</ul>
     </nav>
     <div data-motion-item className={styles.contact}>
      <h2>Let&apos;s get started</h2>
      <Link href={contact}><MessageSquare size={19} aria-hidden="true" /><span>Tell us what you need<small>Share your project details and photos.</small></span></Link>
      <p><MapPin size={19} aria-hidden="true" /><span>Cape Coral, Florida<br />&amp; surrounding areas</span></p>
     </div>
    </div>
    <div data-motion-section className={styles.bottom}>
     <p>&copy; {new Date().getFullYear()} Mertin Home Services LLC. All rights reserved.</p>
     <nav aria-label="Legal"><Link href="/terms-of-use">Terms of Use</Link><Link href="/privacy-policy">Privacy Policy</Link><Link href="/accessibility">Accessibility</Link></nav>
    </div>
   </div>
  </footer>
 );
}
