import styles from "./ServiceHero.module.css";

export default function ServiceHero() {
  return (
    <section data-motion-section className={styles.hero} aria-labelledby="service-hero-title">
      <svg className={styles.lines} viewBox="0 0 600 800" fill="none" aria-hidden="true">
        <path d="M440-40v130q0 20-20 20h-80q-20 0-20 20v80q0 20-20 20h-80q-20 0-20 20v80q0 20-20 20h-80q-20 0-20 20v80q0 20-20 20H0M560-40v130q0 20-20 20h-80q-20 0-20 20v80q0 20-20 20h-80q-20 0-20 20v80q0 20-20 20h-80q-20 0-20 20v80q0 20-20 20h-80q-20 0-20 20v80q0 20-20 20H0M440 230v220q0 20-20 20h-80q-20 0-20 20v80q0 20-20 20h-80q-20 0-20 20v80q0 20-20 20h-80q-20 0-20 20v80" />
      </svg>
      <div className={styles.inner}>
        <div className={styles.content}>
          <span className={styles.badge}>Mertin Home Services LLC</span>
          <h1 id="service-hero-title">Professional services for<br /><span>the properties you manage.</span></h1>
          <p>Maintenance, repairs, installation, cleaning, and renovation for property owners, managers, and businesses.</p>
          <div className={styles.coverage}><strong>Service area:</strong> Cape Coral, Florida &amp; surrounding areas</div>
          <div className={styles.actions}>
            <a data-motion-cta className={styles.primary} href="#contact">Discuss your project <span aria-hidden="true">&#8599;</span></a>
            <a data-motion-cta="secondary" className={styles.secondary} href="#planner">Plan your scope</a>
          </div>
          <span className={styles.note}>Repairs &middot; Cleaning &middot; Assembly &middot; Home improvements</span>
        </div>
        <div data-motion-item className={styles.visual}>
          <div className={styles.circle} aria-hidden="true" />
          <img src="/images/hero-home-care-duo-tools.webp" alt="A woman holding cleaning spray beside a seated repair worker holding a screwdriver" width="1200" height="1200" fetchPriority="high" />
        </div>
      </div>
    </section>
  );
}
