import styles from "./ServiceAreas.module.css";

import Globe from "./Globe";

export default function ServiceAreas() {
  return (
    <section id="service-areas" className={styles.section} aria-labelledby="service-areas-title">
      <div className={styles.globeBackground} aria-hidden="true" />
      <Globe />
      <p className={styles.globeHint}><span className={styles.locationDot} aria-hidden="true" />Cape Coral, Florida · Drag to explore</p>
      <div className={styles.container}>
        <header className={styles.header}>
          <p>LOCAL HOME SERVICES</p>
          <h2 id="service-areas-title">A little help.<br />A better home.</h2>
          <span>From the small fixes on your list to a fresh start for your space, Mertin Home Services LLC helps you take care of the place you call home.</span>
          <p className={styles.coverage}>Serving Cape Coral, Florida, and surrounding areas. Tell us where you are and what your home needs.</p>
          <a href="/#contact" className={styles.cta}>Let&apos;s talk about your project</a>
        </header>
        <div className={styles.frame}>
          <iframe
            className={styles.map}
            title="Google Maps: Cape Coral, Florida service area"
            src="https://maps.google.com/maps?q=Cape%20Coral%2C%20Florida&t=m&z=13&output=embed"
            width="896"
            height="420"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
