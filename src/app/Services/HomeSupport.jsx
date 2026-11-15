import { ArrowUpRight, House } from "lucide-react";
import styles from "./HomeSupport.module.css";

const steps = [
  { title: "Tell us what you need", description: "Share your task list and a few photos so we can understand your home and your priorities." },
  { title: "Discuss the details", description: "Review the work, materials, and access needed, then agree on the scope of your project." },
  { title: "Plan the next step", description: "Discuss availability and arrange a suitable time for the agreed work." },
];

export default function HomeSupport() {
  return (
    <section data-motion-section className={styles.section} aria-labelledby="home-support-title">
      <div className={styles.panel}>
        <div data-motion-group className={styles.copy}>
          <span className={styles.eyebrow}><House size={16} aria-hidden="true" />Help for your home in Cape Coral</span>
          <h2 id="home-support-title">A little support.<br />More time for your life.</h2>
          <p>Keeping up with your home takes time. From the repairs you keep putting off to furniture assembly, cleaning, and room updates, Mertin Home Services LLC helps you take the next step. Tell us what needs attention, and we can work through the details together.</p>
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
