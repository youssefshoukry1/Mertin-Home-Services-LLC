import styles from "./ServiceProcess.module.css";

const content = {
  "handyman-services": {
    title: "Review the maintenance scope.",
    description: "List the tasks by room, unit, or building and include photos where available. We can review access, materials, and priorities before confirming the work.",
    steps: ["Share your task list and photos of the areas involved", "Discuss fittings, materials, access, and the scope of work", "Agree on the work and review the finished details together"],
    alt: "Close-up of a curtain bracket being installed",
  },
  "home-repairs": {
    title: "Assess condition and repair priorities.",
    description: "Document damage by area and flag anything affecting access or normal use. We can discuss repair options, parts, and sequencing before agreeing on the work.",
    steps: ["Show us the damage and describe what needs attention", "Review repair options and any replacement parts needed", "Agree on the repair and check the result once complete"],
    alt: "Close-up of a wall repair in progress",
  },
  "assembly-installation": {
    title: "Confirm quantities and installation requirements.",
    description: "Share product specifications, quantities, and installation locations. Include delivery, access, and fixing requirements so we can discuss sequencing.",
    steps: ["Send the product details, instructions, and room measurements", "Confirm placement, access, and any fixing requirements", "Assemble or install the item and check its fit and operation"],
    alt: "Hands assembling a white furniture unit with a screwdriver",
  },
  "cleaning-services": {
    title: "Set cleaning priorities by area.",
    description: "Identify rooms, surfaces, and any areas that need special care. We can discuss access, scheduling around occupants, and which tasks to include.",
    steps: ["Choose the rooms and areas you would like cleaned", "Discuss surfaces, supplies, and any special care instructions", "Agree on the cleaning tasks and review the areas together"],
    alt: "Window glass being cleaned with a squeegee",
  },
  "home-renovation": {
    title: "Define the renovation scope.",
    description: "Share site photos, intended finishes, and occupancy constraints. We can review existing conditions and discuss materials, sequencing, and project scope.",
    steps: ["Share your ideas and photos of the existing space", "Discuss finishes, materials, and the work required", "Agree on the project scope and review the finishing details"],
    alt: "Interior trim being updated during a room renovation",
  },
};

export default function ServiceProcess({ serviceSlug }) {
  const service = content[serviceSlug];
  if (!service) return null;
  return (
    <section data-motion-section className={styles.section} aria-labelledby="service-process-title">
      <div className={styles.inner}>
        <div data-motion-group className={styles.copy}>
          <span className={styles.eyebrow}>How it works</span>
          <h2 id="service-process-title">{service.title}</h2>
          <p>{service.description}</p>
          <ol className={styles.steps}>
            {service.steps.map(step => <li data-motion-item key={step}>{step}</li>)}
          </ol>
        </div>
        <img data-motion-item className={styles.photo} src={`/images/service-hero/${serviceSlug}-1.webp`} alt={service.alt} width="480" height="640" loading="lazy" decoding="async" />
      </div>
    </section>
  );
}
