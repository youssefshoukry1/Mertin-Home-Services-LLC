"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ServiceHero.module.css";

export default function ServiceHero({ serviceSlug = "handyman-services" }) {
  const sourceName = serviceSlug === "home-repairs" ? "home%20repairs" : serviceSlug;
  const images = [
    `/services%20images/${sourceName}.webp`,
    `/images/service-hero/${serviceSlug}-1.webp`,
    `/images/service-hero/${serviceSlug}-2.webp`,
    `/images/services/${serviceSlug}-back.webp`,
    `/images/service-hero/${serviceSlug}-4.webp`,
    `/images/service-hero/${serviceSlug}-3.webp`,
  ];
  const section = useRef(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    let visible = false;
    const update = () => setPlaying(visible && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    observer.observe(section.current);
    document.addEventListener("visibilitychange", update);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", update); };
  }, []);

  return (
    <section ref={section} className={styles.hero} aria-labelledby="service-hero-title">
      <div className={styles.content}>
        <span className={styles.badge}>Join over 100,000 happy creators</span>
        <h1 id="service-hero-title">Engage Audiences<br />with Stunning Videos</h1>
        <p>Boost Your Brand with High-Impact Short Videos from our expert<br className={styles.desktopBreak} /> content creators. Our team is ready to propel your business forward.</p>
        <a className={styles.cta} href="#contact">Get Started</a>
      </div>
      <div className={styles.gallery} aria-hidden="true">
        <div className={styles.track} style={{ animationPlayState: playing ? "running" : "paused" }}>
          {[0, 1, 2].map((copy) => (
            <div className={styles.group} key={copy}>
              {images.map((src, index) => (
                <div className={styles.imageCard} key={src} style={{ "--tilt": `${[-7, 5, -4, 5, -6, 4, -5, 6][index]}deg` }}>
                  <img src={src} alt="" width="480" height="640" decoding="async" draggable={false} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
