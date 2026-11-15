import Link from "next/link";
import styles from "./HomeCare.module.css";

const services = [
  ["Handyman", "handyman-services"],
  ["Home Repairs", "home-repairs"],
  ["Assembly & Installation", "assembly-installation"],
  ["Cleaning", "cleaning-services"],
  ["Home Renovation", "home-renovation"],
];

export default function HomeCare() {
  return (
    <section data-motion-section className={styles.section} aria-labelledby="home-care-title">
      <div className={styles.inner}>
        <div data-motion-group className={styles.copy}>
          <p className={styles.eyebrow}><span aria-hidden="true" />Home care in Cape Coral</p>
          <h2 id="home-care-title">Small tasks add up.<br />Let&apos;s take care<br />of your home.</h2>
          <div className={styles.description}>
            <p>A cabinet door that won&apos;t close. Furniture waiting to be assembled. A room that could use a fresh coat of paint. Everyday jobs can build up when life gets busy. Mertin Home Services LLC helps homeowners in Cape Coral and surrounding areas give those tasks the attention they need.</p>
            <p>Start with what matters most to you. Send a few photos and tell us what you have in mind, whether it&apos;s a small repair, a cleaning request, or an update to your space. We can review the details with you and discuss how we can help.</p>
          </div>
          <p className={styles.label}>Find the help your home needs</p>
          <ul className={styles.links}>
            {services.map(([title, slug]) => (
              <li key={slug}><Link href={`/services/${slug}`}>{title}</Link></li>
            ))}
          </ul>
        </div>
        <img data-motion-item className={styles.photo} src="/images/about/consultation.webp" alt="Homeowner and home service professional looking at a cabinet hinge together" width="640" height="640" loading="lazy" decoding="async" />
      </div>
    </section>
  );
}
