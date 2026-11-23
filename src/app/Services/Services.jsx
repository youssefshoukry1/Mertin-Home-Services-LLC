import Link from "next/link";
import styles from "./Services.module.css";

const services = [
  {
    title: "Handyman Services",
    slug: "handyman-services",
    description: "Combine fixture adjustments, mounting, and general maintenance into a defined scope across rooms or units.",
    alt: "Handyman working on a home installation",
  },
  {
    title: "Home Repairs",
    slug: "home-repairs",
    description: "Plan repairs to walls, trim, cabinets, and fittings around property condition, access, and occupancy.",
    alt: "Home repair professional working on furniture",
  },
  {
    title: "Assembly & Installation",
    slug: "assembly-installation",
    description: "Coordinate furniture assembly, shelving, and fixture installation across rooms or units. Share quantities and installation requirements so we can assess the scope.",
    alt: "Assembly professional with tools beside home furniture",
  },
  {
    title: "Cleaning Services",
    slug: "cleaning-services",
    description: "Define cleaning priorities by area, surface, and use. Share access requirements and your preferred schedule so we can discuss a plan.",
    alt: "Cleaning professional holding cleaning supplies",
  },
  {
    title: "Home Renovation",
    slug: "home-renovation",
    description: "Plan painting, flooring updates, and finish improvements around the condition of the property and how the space will be used.",
    alt: "Home renovation work in progress",
  },
];

export default function Services() {
  return (
    <section data-motion-section id="services" className={styles.section} aria-labelledby="services-title">
      <div className={styles.container}>
        <div data-motion-group className={styles.header}>
          <h2 id="services-title">Property services</h2>
          <p>Explore our capabilities and identify the services your property needs.</p>
        </div>
        <div className={styles.grid}>
          {services.map((service) => (
            <article key={service.slug} data-motion-item data-motion-card className={styles.card}>
              <div className={styles.imagePanel}>
                <img
                  src={`/services%20images/${service.slug === "home-repairs" ? "home-repairs-worker-v3" : service.slug === "handyman-services" ? "handyman-worker-v3" : service.slug}.webp`}
                  alt={service.alt}
                  loading="lazy"
                  decoding="async"
                  width={800}
                  height={600}
                />
              </div>
              <div className={styles.body}>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <Link href={`/services/${service.slug}`} className={styles.link} aria-label={`Explore ${service.title}`}>
                  Explore service
                  <span className={styles.arrow} aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
