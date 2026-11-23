"use client";


import { MapPin, Wrench, Heart } from "lucide-react";
import styles from "./AboutIntro.module.css";

const serviceImages = {
  "handyman-services": ["Neatly installed shelves in a home", "A door and its fittings", "Tools for household maintenance"],
  "home-repairs": ["A repaired interior wall", "Interior trim details", "Tools and materials for a home repair"],
  "assembly-installation": ["An assembled storage cabinet", "Shelving in a home office", "Furniture parts and assembly hardware"],
  "cleaning-services": ["A clean kitchen", "A tidy living room", "A freshly cleaned sink"],
  "home-renovation": ["A refreshed room", "Updated living space", "Painting tools and materials"],
};

export default function AboutIntro({ serviceSlug = "handyman-services" }) {
  const imageDescriptions = serviceImages[serviceSlug] || serviceImages["handyman-services"];
  const imageSlug = serviceImages[serviceSlug] ? serviceSlug : "handyman-services";

  return (
    <section data-motion-section id="about" className={styles.section} aria-labelledby="about-title">
      <div className={styles.inner}>
        <div data-motion-group className={styles.copy}>
          <span className={styles.eyebrow}>ABOUT MERTIN</span>
          <h2 id="about-title">A property services<br />partner.</h2>
          <p>Mertin Home Services LLC works with property owners, managers, and businesses in Cape Coral and surrounding areas. Share the scope, expected timeline, and site requirements to start the conversation.</p>
          <div className={styles.actions}>
            <a data-motion-cta href="#contact">Tell us about your project</a>
            <a data-motion-cta="secondary" href="/#services">Explore our services</a>
          </div>
          <div className={styles.stats}>
            <div><span className={styles.icon}><MapPin size={20} /></span><span><strong>Local service</strong></span></div>
            <div><span className={styles.icon}><Wrench size={20} /></span><span><strong>Practical solutions</strong></span></div>
            <div><span className={styles.icon}><Heart size={20} /></span><strong>Personal attention</strong></div>
          </div>
        </div>
        <div data-motion-item className={styles.collage}>
          <span className={styles.circle} aria-hidden="true" />
          <img className={styles.first} src={`/images/service-hero/${imageSlug}-2.webp`} alt={imageDescriptions[0]} width="256" height="256" loading="lazy" />
          <img className={styles.second} src={`/images/service-hero/${imageSlug}-3.webp`} alt={imageDescriptions[1]} width="224" height="224" loading="lazy" />
          <img className={styles.third} src={`/images/service-hero/${imageSlug}-4.webp`} alt={imageDescriptions[2]} width="192" height="192" loading="lazy" />
          <span className={styles.square} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
