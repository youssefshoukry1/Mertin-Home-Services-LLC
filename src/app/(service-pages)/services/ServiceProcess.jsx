import styles from "./ServiceProcess.module.css";

const content = {
  "handyman-services": {
    title: "Small jobs, handled step by step.",
    description: "Every home has a list of things that need attention. Tell us about the fittings, shelves, or doors you would like help with, and share photos of the space. We can discuss the tasks, surfaces, and materials involved before agreeing on the work. Grouping your requests together helps us understand the full picture.",
    steps: ["Share your task list and photos of the areas involved", "Discuss fittings, materials, access, and the scope of work", "Agree on the work and review the finished details together"],
    alt: "Close-up of a curtain bracket being installed",
  },
  "home-repairs": {
    title: "Understand the problem. Plan the repair.",
    description: "A loose fitting or damaged surface can need more than a quick touch-up. Start by showing us what has happened and where the problem is. We can discuss the condition, suitable repair options, and any parts or materials needed. The scope of the repair is agreed before work begins.",
    steps: ["Show us the damage and describe what needs attention", "Review repair options and any replacement parts needed", "Agree on the repair and check the result once complete"],
    alt: "Close-up of a wall repair in progress",
  },
  "assembly-installation": {
    title: "From parts in a box to a useful space.",
    description: "Share the furniture model or item you need installed, along with photos of where it will go. Instructions, dimensions, and details about the wall or floor help us understand the job. We can then discuss assembly, positioning, and any fixing requirements before arranging the work.",
    steps: ["Send the product details, instructions, and room measurements", "Confirm placement, access, and any fixing requirements", "Assemble or install the item and check its fit and operation"],
    alt: "Hands assembling a white furniture unit with a screwdriver",
  },
  "cleaning-services": {
    title: "A clean home starts with your priorities.",
    description: "Tell us which rooms need attention and the areas you would like us to focus on. Photos and details about surfaces, access, and any special care instructions help us understand your request. We can agree on the cleaning tasks and supplies so the work fits your home and your priorities.",
    steps: ["Choose the rooms and areas you would like cleaned", "Discuss surfaces, supplies, and any special care instructions", "Agree on the cleaning tasks and review the areas together"],
    alt: "Window glass being cleaned with a squeegee",
  },
  "home-renovation": {
    title: "Thoughtful updates, from idea to finish.",
    description: "A room refresh begins with how you want to use and enjoy the space. Share your ideas, photos, and the changes you have in mind. We can discuss the existing condition, materials, and work involved, then agree on a practical scope. Any additional requirements can be identified as part of that review.",
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
