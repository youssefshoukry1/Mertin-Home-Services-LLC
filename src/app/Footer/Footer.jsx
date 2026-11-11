import Link from "next/link";
import styles from "./Footer.module.css";

const groups = [
  { title: "Services", links: [
    ["Handyman Services", "/services/handyman-services"],
    ["Home Repairs", "/services/home-repairs"],
    ["Assembly & Installation", "/services/assembly-installation"],
    ["Cleaning Services", "/services/cleaning-services"],
    ["Home Renovation", "/services/home-renovation"],
    ["View all services", "/#services"],
  ] },
  { title: "Explore", links: [
    ["Home", "/"], ["About Mertin", "/#about"],
    ["Service Areas", "/#service-areas"], ["Request Service", "/#contact"],
  ] },
  { title: "Company", links: [
    ["Contact", "/#contact"], ["Privacy Policy", "/privacy-policy"],
    ["Terms of Use", "/terms-of-use"], ["Accessibility", "/accessibility"],
  ] },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.panel}>
        <div className={styles.columns}>
          <div className={styles.intro}>
            <Link href="/" className={styles.brand} aria-label="Mertin Home Services LLC home">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 11 12 3l9 8v10h-6v-7H9v7H3V11Z" fill="currentColor" /></svg>
              <span>Mertin<span className={styles.brandSub}>HOME SERVICES LLC</span></span>
            </Link>
            <p>Care for the place you call home. Home repairs, cleaning, installation, and renovation in Cape Coral and surrounding areas.</p>
          </div>
          {groups.map(group => (
            <nav key={group.title} aria-label={`Footer ${group.title}`} className={styles.group}>
              <h2>{group.title}</h2>
              <ul>{group.links.map(([label, href]) => <li key={label}><Link href={href} prefetch={false}>{label}</Link></li>)}</ul>
            </nav>
          ))}
        </div>
        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} Mertin Home Services LLC. All rights reserved.</p>
          <nav aria-label="Legal"><Link href="/terms-of-use" prefetch={false}>Terms</Link><Link href="/privacy-policy" prefetch={false}>Privacy</Link><Link href="/accessibility" prefetch={false}>Accessibility</Link></nav>
        </div>
      </div>
    </footer>
  );
}
