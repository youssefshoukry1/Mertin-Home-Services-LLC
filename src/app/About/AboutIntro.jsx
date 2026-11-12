import { Users, Briefcase, Link } from "lucide-react";
import styles from "./AboutIntro.module.css";

export default function AboutIntro() {
  return (
    <section id="about" className={styles.section} aria-labelledby="about-title">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <h2 id="about-title">A new way to<br />learn<br />&amp; get knowledge</h2>
          <p>EduFlex is here for you with various courses &amp; materials from skilled tutors all around the world.</p>
          <div className={styles.actions}>
            <a href="#contact">Join the Class</a>
            <a href="#services">Learn more</a>
          </div>
          <div className={styles.stats}>
            <div><span className={styles.icon}><Users size={20} /></span><span><strong>15,2K</strong><small>Active students</small></span></div>
            <div><span className={styles.icon}><Briefcase size={20} /></span><span><strong>4,5K</strong><small>Tutors</small></span></div>
            <div><span className={styles.icon}><Link size={20} /></span><strong>Resources</strong></div>
          </div>
        </div>
        <div className={styles.collage}>
          <span className={styles.circle} aria-hidden="true" />
          <img className={styles.first} src="/images/about/collage-1.jpg" alt="Students working together around a laptop" width="256" height="256" loading="lazy" />
          <img className={styles.second} src="/images/about/collage-2.jpg" alt="A group sharing ideas at a table" width="224" height="224" loading="lazy" />
          <img className={styles.third} src="/images/about/collage-3.jpg" alt="Two friends smiling together" width="192" height="192" loading="lazy" />
          <span className={styles.square} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
