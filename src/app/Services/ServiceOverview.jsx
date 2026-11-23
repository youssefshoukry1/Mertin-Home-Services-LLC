import Link from "next/link";
import styles from "./ServiceOverview.module.css";

export default function ServiceOverview() {
  return (
    <section data-motion-section className={styles.section} aria-labelledby="overview-title">
      <div className={styles.container}>
        <div data-motion-group className={styles.heading}>
          <div>
            <span className={styles.eyebrow}>Property services at a glance</span>
            <h2 id="overview-title">Maintain and improve<br /><span>your property.</span></h2>
          </div>
          <p>Plan maintenance, repairs, cleaning, installation, and renovations with one point of contact for your project inquiry.</p>
        </div>
        <div className={styles.cards}>
          <article data-motion-item className={styles.feature}>
            <div className={styles.workerScene}>
              <img className={styles.workerImage} src="/images/overview-worker.webp" alt="Home cleaning professional seated with a microfiber cloth" width="800" height="1000" loading="lazy" decoding="async" />
            </div>
            <div className={styles.featureContent}>
              <h3>Cleaning for<br />occupant-ready spaces.</h3>
              <p>Set priorities for kitchens, restrooms, common areas, and other interior spaces based on how they are used.</p>
              <Link href="/services/cleaning-services" className={styles.serviceLink}>Explore cleaning <span aria-hidden="true">&#8594;</span></Link>
            </div>
          </article>
          <aside data-motion-item className={styles.request}>
            <div className={styles.requestContent}>
              <span className={styles.badge}>Let&apos;s get started</span>
              <h3>Define your project scope.</h3>
              <p>Share the property type, location, and areas involved so we can discuss scope, access, and scheduling.</p>
              <a href="#contact" data-motion-cta className={styles.button}>Tell us about your project</a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
