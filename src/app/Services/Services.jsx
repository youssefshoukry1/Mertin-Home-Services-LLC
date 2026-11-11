import Link from "next/link";
import styles from "./Services.module.css";

// Original reference artwork is temporary until service photography is selected.
const services = [
  { title: "Handyman Services", slug: "handyman-services", images: [1, 2] },
  { title: "Home Repairs", slug: "home-repairs", images: [3, 4] },
  { title: "Assembly & Installation", slug: "assembly-installation", images: [5, 6] },
  { title: "Cleaning Services", slug: "cleaning-services", images: [7, 8] },
  { title: "Home Renovation", slug: "home-renovation", images: [1, 2] },
];

export default function Services() {
  return (
    <section id="services" className={styles.section} aria-labelledby="services-title">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 id="services-title">How Can I Help?</h2>
          <p>Let&apos;s turn your vision into something amazing.</p>
        </div>
        <div className={styles.grid}>
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              prefetch={false}
              className={styles.card}
            >
              <div className={styles.images} aria-hidden="true">
                <img
                  src={`/images/services/reference-${service.images[0]}.png`}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className={styles.backImage}
                />
                <img
                  src={`/images/services/reference-${service.images[1]}.png`}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className={styles.frontImage}
                />
              </div>
              <h3>{service.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
