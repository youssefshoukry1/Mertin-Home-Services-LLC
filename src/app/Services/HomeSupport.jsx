import { ArrowUpRight, House } from "lucide-react";
import styles from "./HomeSupport.module.css";

const steps = [
  { title: "Tell us what you need", description: "Share the property location, areas involved, priorities, and any site photos." },
  { title: "Discuss the details", description: "Review the work, materials, and access needed, then agree on the scope of your project." },
  { title: "Plan the next step", description: "Discuss availability and arrange a suitable time for the agreed work." },
];

export default function HomeSupport() {
  return (
    <section data-motion-section className={styles.section} aria-labelledby="home-support-title">
      <div className={styles.panel}>
        <div data-motion-group className={styles.copy}>
          <span className={styles.eyebrow}><House size={16} aria-hidden="true" />Help for your home in Cape Coral</span>
          <h2 id="home-support-title">From project brief<br />to agreed scope.</h2>
          <p>Start with a project brief. We can discuss the areas involved, the work required, and site constraints before agreeing on next steps.</p>
          <div className={styles.highlight}><strong>Your home. Your priorities.</strong><span>Start with the jobs that matter most to you.</span></div>
          <a data-motion-cta className={styles.button} href="#contact">Let&apos;s discuss your project <ArrowUpRight size={17} aria-hidden="true" /></a>
        </div>
        <ol className={styles.steps}>
          {steps.map((step, index) => <li data-motion-item key={step.title}><span className={styles.number} aria-hidden="true">{index + 1}</span><div><h3>{step.title}</h3><p>{step.description}</p></div></li>)}
        </ol>
      </div>
    </section>
  );
}
