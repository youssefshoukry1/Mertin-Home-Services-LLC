import { PanelsTopLeft, Blinds, DoorOpen, Wrench, ArrowUpRight, Sparkles, Droplets, Wind, PaintRoller, House } from "lucide-react";
import styles from "./HandymanIncluded.module.css";

const tasks = [
  { icon: PanelsTopLeft, title: "Shelf mounting", description: "Make better use of your space with shelves mounted neatly where you need them." },
  { icon: Blinds, title: "Curtain rods", description: "Get help fitting curtain rods and brackets for a tidy, finished window." },
  { icon: DoorOpen, title: "Door adjustments", description: "Give sticking doors, loose handles, and everyday fittings some attention." },
  { icon: Wrench, title: "General maintenance", description: "Group routine maintenance items by area so we can review them together." },
];

const serviceDetails = {
  "handyman-services": { heading: "General property maintenance", tasks },
  "home-repairs": { heading: "Interior repairs and restoration", tasks: [
    { icon: PanelsTopLeft, title: "Drywall patching", description: "Ask about repairing small holes and damaged areas for a smooth wall finish." },
    { icon: Wrench, title: "Trim repairs", description: "Give chipped baseboards and loose trim a neat, finished appearance." },
    { icon: DoorOpen, title: "Cabinet repairs", description: "Get help with loose hinges, misaligned doors, and everyday cabinet wear." },
    { icon: PanelsTopLeft, title: "Minor surface repairs", description: "Share photos of worn or damaged surfaces so we can assess the repair." },
  ] },
  "assembly-installation": { heading: "Furniture, fixtures, and storage", tasks: [
    { icon: Wrench, title: "Furniture assembly", description: "Get help putting together flat-pack desks, tables, and other household furniture." },
    { icon: DoorOpen, title: "Cabinet assembly", description: "Bring storage units together with carefully fitted panels, doors, and hardware." },
    { icon: PanelsTopLeft, title: "Shelving installation", description: "Create useful storage with shelves fitted to suit your space and wall type." },
    { icon: Blinds, title: "Wall mounting", description: "Tell us what you need mounted so we can confirm the right approach and fittings." },
  ] },
  "cleaning-services": { heading: "Interior cleaning by area", tasks: [
    { icon: Sparkles, title: "Kitchen cleaning", description: "Give counters, sinks, and cooking surfaces attention where everyday buildup collects." },
    { icon: Droplets, title: "Bathroom cleaning", description: "Refresh sinks, fixtures, and bathroom surfaces with careful cleaning." },
    { icon: Wind, title: "Dusting", description: "Clear everyday dust from accessible shelves, furniture, and household surfaces." },
    { icon: PanelsTopLeft, title: "Floor cleaning", description: "Freshen up floors with a cleaning approach suited to their material and condition." },
  ] },
  "home-renovation": { heading: "Interior renovation and finishes", tasks: [
    { icon: PaintRoller, title: "Interior painting", description: "Explore fresh wall colors and a clean finish for rooms that need a new look." },
    { icon: PanelsTopLeft, title: "Flooring updates", description: "Discuss flooring options that suit your space, everyday needs, and project scope." },
    { icon: Wrench, title: "Trim upgrades", description: "Refresh baseboards and finishing details to bring the room together." },
    { icon: House, title: "Room refreshes", description: "Plan practical improvements that make an existing room feel more comfortable and useful." },
  ] },
};

export default function HandymanIncluded({ serviceSlug = "handyman-services" }) {
  const details = serviceDetails[serviceSlug] || serviceDetails["handyman-services"];
  return (
    <section data-motion-section id="service-included" className={styles.section} aria-labelledby="handyman-included-title">
      <div className={styles.inner}>
        <header data-motion-group className={styles.heading}>
          <span className={styles.eyebrow}>WHAT’S INCLUDED</span>
          <h2 id="handyman-included-title">{details.heading}</h2>
          <p>These are examples of work you can include in a project brief. Share affected areas, quantities, and photos so we can review the scope.</p>
        </header>
        <div className={styles.grid}>
          {details.tasks.map(({ icon: Icon, title, description }) => (
            <article key={title} data-motion-item data-motion-card className={styles.card}>
              <span className={styles.icon}><Icon size={23} strokeWidth={1.5} aria-hidden="true" /></span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
        <div className={styles.footer}>
          <p>Have something else in mind?</p>
          <a data-motion-cta href="#contact">Discuss your project <span className={styles.buttonArrow}><ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true" /></span></a>
        </div>
      </div>
    </section>
  );
}
