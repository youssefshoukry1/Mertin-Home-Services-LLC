import Link from "next/link";
import styles from "./ServiceOverview.module.css";
import CleaningScene from "./CleaningScene";

export default function ServiceOverview() {
  return (
    <section data-motion-section className={styles.section} aria-labelledby="overview-title">
      <div className={styles.container}>
        <div data-motion-group className={styles.heading}>
          <div>
            <span className={styles.eyebrow}>Home services at a glance</span>
            <h2 id="overview-title">A little help with<br /><span>everyday home care.</span></h2>
          </div>
          <p>From repairs and assembly to cleaning and home improvements, Mertin Home Services LLC helps you care for your home in Cape Coral and surrounding areas.</p>
        </div>
        <div className={styles.cards}>
          <article data-motion-item className={styles.feature}>
            <div className={styles.workerScene}>
              <img className={styles.workerImage} src="/images/overview-worker.webp" alt="Home cleaning professional seated with a microfiber cloth" width="800" height="1000" loading="lazy" decoding="async" />
              <div className={styles.cleaningAccent}><CleaningScene /></div>
            </div>
            <div className={styles.featureContent}>
              <h3>A fresher,<br />more comfortable home.</h3>
              <p>Get help with cleaning your kitchen, living areas, and the spaces you use every day.</p>
              <Link href="/services/cleaning-services" className={styles.serviceLink}>Explore cleaning <span aria-hidden="true">&#8594;</span></Link>
            </div>
          </article>
          <aside data-motion-item className={styles.request}>
            <div className={styles.requestContent}>
              <span className={styles.badge}>Let&apos;s get started</span>
              <h3>Your next home project starts here.</h3>
              <p>Tell us what needs attention. Share a few details and photos, choose a service, and we can discuss the next steps for your home.</p>
              <a href="#contact" data-motion-cta className={styles.button}>Tell us about your project</a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
