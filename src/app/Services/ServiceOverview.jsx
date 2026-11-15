import Link from "next/link";
import styles from "./ServiceOverview.module.css";

export default function ServiceOverview() {
  return (
    <section className={styles.section} aria-labelledby="overview-title">
      <div className={styles.container}>
        <div className={styles.heading}>
          <div>
            <span className={styles.eyebrow}>Home services at a glance</span>
            <h2 id="overview-title">A little help with<br /><span>everyday home care.</span></h2>
          </div>
          <p>From repairs and assembly to cleaning and home improvements, Mertin Home Services LLC helps you care for your home in Cape Coral and surrounding areas.</p>
        </div>
        <div className={styles.cards}>
          <article className={styles.feature}>
            <div className={styles.portrait}>
              <img src="/images/overview-worker.webp" alt="Home cleaning professional seated with a microfiber cloth" width="800" height="1000" loading="lazy" decoding="async" />
            </div>
            <div className={styles.featureContent}>
              <h3>A fresher,<br />more comfortable home.</h3>
              <p>Get help with cleaning your kitchen, living areas, and the spaces you use every day.</p>
              <Link href="/services/cleaning-services" className={styles.serviceLink}>Explore cleaning <span aria-hidden="true">&#8594;</span></Link>
            </div>
          </article>
          <aside className={styles.request}>
            <div className={styles.requestContent}>
              <span className={styles.badge}>Let&apos;s get started</span>
              <h3>Your next home project starts here.</h3>
              <p>Tell us what needs attention. Share a few details and photos, choose a service, and we can discuss the next steps for your home.</p>
              <a href="#contact" className={styles.button}>Tell us about your project</a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
