import { MapPin, Wrench, Heart } from "lucide-react";
import styles from "./AboutIntro.module.css";

export default function AboutIntro() {
  return (
    <section id="about" className={styles.section} aria-labelledby="about-title">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <span className={styles.eyebrow}>ABOUT MERTIN</span>
          <h2 id="about-title">Your home deserves<br />a helping hand.</h2>
          <p>Mertin Home Services LLC helps homeowners in Cape Coral and surrounding areas with repairs, cleaning, assembly, and home improvements. Tell us what needs attention, and we?ll help you take the next step.</p>
          <div className={styles.actions}>
            <a href="#contact">Tell us about your project</a>
            <a href="#services">Explore our services</a>
          </div>
          <div className={styles.stats}>
            <div><span className={styles.icon}><MapPin size={20} /></span><span><strong>Local service</strong></span></div>
            <div><span className={styles.icon}><Wrench size={20} /></span><span><strong>Practical solutions</strong></span></div>
            <div><span className={styles.icon}><Heart size={20} /></span><strong>Personal attention</strong></div>
          </div>
        </div>
        <div className={styles.collage}>
          <span className={styles.circle} aria-hidden="true" />
          <img className={styles.first} src="/images/about/consultation.webp" alt="A homeowner and worker discussing a cabinet repair" width="256" height="256" loading="lazy" />
          <img className={styles.second} src="/images/about/repair.webp" alt="Focused worker adjusting a cabinet hinge" width="224" height="224" loading="lazy" />
          <img className={styles.third} src="/images/about/cleaning.webp" alt="Gloved hands cleaning a kitchen counter" width="192" height="192" loading="lazy" />
          <span className={styles.square} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
