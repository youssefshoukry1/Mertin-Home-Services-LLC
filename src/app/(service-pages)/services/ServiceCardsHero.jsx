import { Wrench, Hammer, Package, Sparkles, PaintRoller, ArrowUpRight, ArrowDown } from "lucide-react";
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
  const label = service.title.replace(" in Cape Coral", "");
  const Icon = { "handyman-services": Wrench, "home-repairs": Hammer, "assembly-installation": Package, "cleaning-services": Sparkles, "home-renovation": PaintRoller }[imageSlug];
  const imageName = imageSlug === "home-repairs" ? "home%20repairs" : imageSlug;
  return (
    <section data-motion-section className={styles.hero} aria-labelledby="service-hero-title">
      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.badge}>Mertin ? Cape Coral &amp; surrounding areas</span>
          <h1 id="service-hero-title">{label}<em>{service.line}</em></h1>
          <p className={styles.description}>{service.description}</p>
          <div className={styles.actions}><a data-motion-cta className={styles.button} href="#contact">Request service <ArrowUpRight size={17} aria-hidden="true" /></a><a data-motion-cta="secondary" className={styles.secondary} href="#service-included">Explore this service <ArrowDown size={14} aria-hidden="true" /></a></div>
          <p className={styles.area}>Practical help for your home in Cape Coral, Florida.</p>
        </div>
        <div data-motion-item className={styles.visual}>
          
          <img src={`/services%20images/${imageName}.webp`} alt={service.alt} width="1400" height="1120" fetchPriority="high" decoding="async" />
          <div className={styles.caption}><Icon size={25} aria-hidden="true" /><span>{label}</span><small>MERTIN</small></div>
        </div>
      </div>
    </section>
  );
}
