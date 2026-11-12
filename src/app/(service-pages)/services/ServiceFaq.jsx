"use client";

import { useId, useState } from "react";
import styles from "./ServiceFaq.module.css";

// Design-reference content; replace with approved service FAQs in the content pass.
const questions = [
  ["Is there a free plan?", "Yes. Start with the free plan to explore the essentials, and upgrade when you need more."],
  ["Can I change plans later?", "Anytime. Move up or down from the billing page and the change takes effect on your next cycle. Downgrades keep your data intact."],
  ["How is my data kept safe?", "Everything is encrypted in transit and at rest. Access is scoped to members of your workspace, and you control who gets in."],
  ["Do you offer team accounts?", "Yes. Invite your team to a shared workspace and manage access together."],
  ["What if I need help?", "Reach out anytime. Most questions get a reply within a day, and there’s a searchable guide for the common ones."],
];

export default function ServiceFaq() {
  const [open, setOpen] = useState(4);
  const id = useId();
  return (
    <section className={styles.section} aria-labelledby={`${id}-title`}>
      <div className={styles.panel}>
        <div className={styles.intro}>
          <span className={styles.eyebrow}>FAQ</span>
          <h2 id={`${id}-title`}>Questions, answered.</h2>
          <p>The things people ask most often. Still stuck? Reach out and we’ll walk you through it.</p>
        </div>
        <div className={styles.questions}>
          {questions.map(([question, answer], index) => (
            <div key={question} className={styles.item}>
              <h3>
                <button id={`${id}-question-${index}`} type="button" aria-expanded={open === index} aria-controls={`${id}-answer-${index}`} onClick={() => setOpen(open === index ? null : index)}>
                  <span>{question}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
                </button>
              </h3>
              <div id={`${id}-answer-${index}`} role="region" aria-labelledby={`${id}-question-${index}`} aria-hidden={open !== index} className={styles.answer} data-open={open === index}>
                <div><p>{answer}</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
