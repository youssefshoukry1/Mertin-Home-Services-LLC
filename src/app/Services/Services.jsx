import Link from "next/link";
import styles from "./Services.module.css";

const services = [
  {
    title: "Handyman Services",
    slug: "handyman-services",
    description: "Get help with shelf mounting, curtain rods, door adjustments, and the small jobs around your home.",
    alt: "Handyman working on a home installation",
  },
  {
    title: "Home Repairs",
    slug: "home-repairs",
    description: "Give worn fittings, damaged walls, and everyday household problems the attention they need.",
    alt: "Home repair professional working on furniture",
  },
  {
    title: "Assembly & Installation",
    slug: "assembly-installation",
    description: "Bring your space together with help assembling furniture and installing household items.",
    alt: "Assembly professional with tools beside home furniture",
  },
  {
    title: "Cleaning Services",
    slug: "cleaning-services",
    description: "Freshen up your kitchen, living areas, and everyday spaces with cleaning that fits your home.",
    alt: "Cleaning professional holding cleaning supplies",
  },
  {
    title: "Home Renovation",
    slug: "home-renovation",
    description: "Explore painting, trim updates, and room improvements to make more of the home you have.",
    alt: "Home renovation work in progress",
  },
];

export default function Services() {
  return (
    <section data-motion-section id="services" className={styles.section} aria-labelledby="services-title">
      <div className={styles.container}>
        <div data-motion-group className={styles.header}>
          <h2 id="services-title">How can we help at home?</h2>
          <p>Explore our services and tell us what your home needs.</p>
        </div>
        <div className={styles.grid}>
          {services.map((service) => (
            <article key={service.slug} data-motion-item data-motion-card className={styles.card}>
              <div className={styles.imagePanel}>
                <img
                  src={`/services%20images/${service.slug === "home-repairs" ? "home%20repairs" : service.slug}.webp`}
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
