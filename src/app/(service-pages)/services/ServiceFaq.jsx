"use client";

import { useId, useState } from "react";
import styles from "./ServiceFaq.module.css";

const serviceQuestions = {
  "handyman-services": [
    [
      "What kinds of handyman jobs can I request?",
      "Tell us about shelf mounting, curtain rods, door adjustments, or other small household maintenance tasks. Include photos so we can confirm whether the job fits our service."
    ],
    [
      "Can I include several small jobs in one request?",
      "Yes. List each task in your message, with its location and any relevant photos. This helps us understand the full scope before discussing a visit."
    ],
    [
      "Should I buy parts before getting in touch?",
      "Please share what you need first. If you already have brackets, fittings, or replacement parts, include their details so we can discuss what is suitable."
    ],
    [
      "What should I prepare before a visit?",
      "Clear access to the work area and mention any parking, building access, or scheduling restrictions. Keep any instructions and existing parts available."
    ],
    [
      "How do I request handyman help?",
      "Use the contact form below with your location, task list, and photos. Handyman Services is already selected for you."
    ]
  ],
  "home-repairs": [
    [
      "What home repairs can I ask about?",
      "You can ask about small drywall repairs, damaged trim, cabinet fittings, and minor surface damage. Send photos and a description so we can assess the scope."
    ],
    [
      "What photos help you understand the damage?",
      "Include a close-up and a wider photo showing the surrounding area. Add approximate measurements and explain when you noticed the issue."
    ],
    [
      "Can repaired areas match the existing finish?",
      "Matching depends on the material, paint, age, and condition of the surface. Share any paint codes or spare materials you have so we can discuss realistic options."
    ],
    [
      "What if I am unsure what caused the damage?",
      "Describe what you have noticed, including any recurring cracks, moisture, or movement. The cause may need further assessment before a cosmetic repair is appropriate."
    ],
    [
      "How do I request a repair?",
      "Complete the contact form below with your location, the repair details, and photos. We can then discuss the scope and next steps."
    ]
  ],
  "assembly-installation": [
    [
      "What items can I ask you to assemble or install?",
      "Tell us about your furniture, storage cabinet, shelving, or wall-mounted item. Include the product link or model number so we can confirm suitability."
    ],
    [
      "Do I need to have the item delivered first?",
      "You can contact us before delivery to discuss the project. Tell us its expected arrival date and confirm that the item will be available before arranging the work."
    ],
    [
      "What if parts or instructions are missing?",
      "Check the packaging and parts list when possible. Let us know about missing or damaged pieces, as replacement parts may be needed before assembly can be completed."
    ],
    [
      "What information is needed for wall mounting?",
      "Share the item dimensions and weight, the mounting location, and your wall type if known. Photos of the wall and supplied fittings are also helpful."
    ],
    [
      "How should I prepare the assembly area?",
      "Clear enough floor space to unpack and assemble the item, and keep the packaging, hardware, and instructions together. Mention any stairs or access limitations."
    ]
  ],
  "cleaning-services": [
    [
      "Which areas can I request cleaning for?",
      "Tell us about the kitchen, bathrooms, floors, or other household surfaces that need attention. We can discuss the rooms, priorities, and scope with you."
    ],
    [
      "What details should I include in my request?",
      "Include your location, the number of rooms, approximate size, and current condition. Photos and a list of your priorities help us understand the work."
    ],
    [
      "Should I tidy up before cleaning?",
      "Put away personal belongings and clear access to the surfaces you want cleaned where possible. Tell us about anything fragile or areas that should be left untouched."
    ],
    [
      "Can I mention product preferences or sensitive surfaces?",
      "Yes. Note any allergies, product preferences, delicate finishes, or manufacturer care instructions before the visit so we can discuss a suitable approach."
    ],
    [
      "Can I request recurring cleaning?",
      "Mention your preferred frequency and days in the contact form. Recurring arrangements and availability can be discussed for your location and needs."
    ]
  ],
  "home-renovation": [
    [
      "What renovation projects can I ask about?",
      "Share your ideas for interior painting, flooring updates, trim improvements, or a room refresh. The exact work can be discussed once the space and scope are understood."
    ],
    [
      "Do I need a finished design before contacting you?",
      "No. Photos, approximate measurements, and a description of what you want to improve are a useful starting point. Inspiration images can help explain your preferences."
    ],
    [
      "How is the project cost determined?",
      "Cost depends on the size, condition, materials, preparation, and agreed work. Share your priorities and budget range so the project can be discussed in context."
    ],
    [
      "Can I stay at home while work is underway?",
      "That depends on the rooms involved and the type of work. Access, dust, noise, drying times, and daily routines should be discussed when planning the project."
    ],
    [
      "What if the work requires permits or specialist trades?",
      "Permit requirements and specialist work depend on the project. These needs should be identified and confirmed before the relevant work is agreed or started."
    ]
  ]
};

export default function ServiceFaq({ serviceSlug = "handyman-services" }) {
  const questions = serviceQuestions[serviceSlug] || serviceQuestions["handyman-services"];
  const [open, setOpen] = useState(4);
  const id = useId();
  return (
    <section className={styles.section} aria-labelledby={`${id}-title`}>
      <div className={styles.panel}>
        <div className={styles.intro}>
          <span className={styles.eyebrow}>FAQ</span>
          <h2 id={`${id}-title`}>Questions, answered.</h2>
          <p>Helpful details for planning your project. Have another question? Tell us what you need using the contact form below.</p>
        </div>
        <div className={styles.questions}>
          {questions.map(([question, answer], index) => (
            <div key={question} className={styles.item}>
              <h3>
                <button id={`${id}-question-${index}`} type="button" aria-expanded={open === index} aria-controls={`${id}-answer-${index}`} onClick={() => setOpen(open === index ? null : index)}>
                  <span>{question}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
                </button>
              </h3>
              <div id={`${id}-answer-${index}`} role="region" aria-labelledby={`${id}-question-${index}`} aria-hidden={open !== index} className={styles.answer} data-open={open === index}>
                <div><p>{answer}</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
