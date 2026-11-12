"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import styles from "./ServiceTestimonials.module.css";

// Reference demo content, to be replaced with approved customer testimonials.
const testimonials = [
  { name: "Tamar Mendelson", role: "Restaurant Critic", quote: "I was impressed by the food! And I could really tell that they use high-quality ingredients. The staff was friendly and attentive. I'll definitely be back for more!" },
  { name: "Joe Charlescraft", role: "Frequent Visitor", quote: "This place exceeded all expectations! The atmosphere is inviting, and the staff truly goes above and beyond. I'll keep returning for more exceptional dining experience." },
  { name: "Martina Edelweist", role: "Satisfied Customer", quote: "Shining Yam is a hidden gem! The impeccable service and overall attention to detail created a memorable experience. I highly recommend it!" },
];

export default function ServiceTestimonials() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const change = (direction) => setActive((current) => (current + direction + testimonials.length) % testimonials.length);
  const person = testimonials[active];
  return (
    <section className={styles.section} aria-label="Testimonials carousel" aria-roledescription="carousel">
      <div className={styles.inner}>
        <div className={styles.portraits} aria-hidden="true">
          {testimonials.map((item, index) => {
            const position = (index - active + testimonials.length) % testimonials.length;
            return <motion.img key={item.name} src={`/images/testimonials/person-${index + 1}.webp`} alt="" width="600" height="650" loading="lazy" decoding="async" draggable={false} className={styles.portrait}
              initial={false}
              animate={{ x: position === 0 ? "0%" : position === 1 ? "19%" : "-19%", y: position === 0 ? 20 : -12, scale: position === 0 ? 1 : .9, rotateY: position === 0 ? 0 : position === 1 ? -15 : 15, rotateZ: position === 0 ? 0 : position === 1 ? 4 : -4, zIndex: position === 0 ? 3 : 1 }}
              transition={{ duration: reduced ? 0 : .65, ease: [.22, 1, .36, 1] }} />;
          })}
        </div>
        <div className={styles.copy}>
          <div className={styles.text} aria-live="polite" aria-atomic="true">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={active} initial={{ opacity: 0, y: reduced ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduced ? 0 : -8 }} transition={{ duration: reduced ? 0 : .22 }}>
                <h2>{person.name}</h2>
                <p className={styles.role}>{person.role}</p>
                <p className={styles.quote}>
                  {person.quote.split(" ").map((word, index) => <motion.span key={index} initial={{ opacity: reduced ? 1 : 0 }} animate={{ opacity: 1 }} transition={{ delay: reduced ? 0 : index * .018, duration: .2 }}>{word}{" "}</motion.span>)}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className={styles.controls}>
            <button type="button" aria-label="Previous testimonial" onClick={() => change(-1)}><ArrowLeft aria-hidden="true" /></button>
            <button type="button" aria-label="Next testimonial" onClick={() => change(1)}><ArrowRight aria-hidden="true" /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
