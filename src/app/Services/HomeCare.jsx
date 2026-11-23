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
          <h2 id="home-care-title">Plan work around<br />your property.</h2>
          <div className={styles.description}>
            <p>Property owners and managers often need to coordinate work across multiple areas. Group service needs by room, unit, or building so the scope and priorities are clear.</p>
            <p>Include site photos, access requirements, and any occupancy deadlines. We can review the details with you and discuss how the work could be organized.</p>
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
