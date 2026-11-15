import styles from "./ServiceCardsHero.module.css";

const services = {
  "handyman-services": {
    title: "Handyman Services in Cape Coral",
    line: "A helping hand around your home.",
    description: "From shelf mounting to door adjustments and everyday fixes, get practical help with the jobs on your home to-do list.",
    alt: "Handyman with tools ready to help around your home",
  },
  "home-repairs": {
    title: "Home Repairs in Cape Coral",
    line: "Bring comfort back to your home.",
    description: "Give worn fittings, damaged trim, and everyday household problems the attention they need. Tell us what needs fixing.",
    alt: "Home repair professional beside a cabinet",
  },
  "assembly-installation": {
    title: "Assembly & Installation in Cape Coral",
    line: "Ready for everyday living.",
    description: "Get help turning boxes of parts into useful furniture and fitting the household items that make your space work for you.",
    alt: "Assembly professional with a drill and shelving unit",
  },
  "cleaning-services": {
    title: "Cleaning Services in Cape Coral",
    line: "A fresh start for your space.",
    description: "From busy kitchens to everyday living areas, get help keeping your home clean, comfortable, and ready to enjoy.",
    alt: "Cleaning professional with a cloth and cleaning supplies",
  },
  "home-renovation": {
    title: "Home Renovation in Cape Coral",
    line: "Make more of the home you have.",
    description: "Explore painting, trim updates, and practical room improvements. Share how you want your home to look and feel.",
    alt: "Renovation professional with painting tools and a stepladder",
  },
};

export default function ServiceCardsHero({ serviceSlug = "handyman-services" }) {
  const service = services[serviceSlug] || services["handyman-services"];
  const imageSlug = services[serviceSlug] ? serviceSlug : "handyman-services";
  return (
    <section className={styles.hero} aria-labelledby="service-hero-title">
      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.badge}>Mertin Home Services LLC</span>
          <h1 id="service-hero-title">{service.title}<span>{service.line}</span></h1>
          <p className={styles.description}>{service.description}</p>
          <p className={styles.area}>Serving Cape Coral, Florida &amp; surrounding areas</p>
          <a className={styles.button} href="#contact">Tell us about your project</a>
        </div>
        <div className={styles.visual}>
          <span className={styles.circle} aria-hidden="true" />
          <img src={`/images/service-workers/${imageSlug}.webp`} alt={service.alt} width="900" height="1200" fetchPriority="high" decoding="async" />
        </div>
      </div>
    </section>
  );
}
