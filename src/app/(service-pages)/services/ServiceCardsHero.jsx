"use client";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./ServiceCardsHero.module.css";
const CARDS = [
  {
    src: "https://cdn.21st.dev/assets/mirror/ed/edd19d13042044af90896aa49454fd94633be73d902f850bd80ff53fe9159fc0.jpg",
    alt: "Friends",
    rotate: -22,
    delay: 0.9,
    z: 10,
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/45/45f4b5aacc49de8658492182ce5cffa21e90cf0b1868442839ecbbf4693674e4.jpg",
    alt: "Woman portrait",
    rotate: -11,
    delay: 0.75,
    z: 20,
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/9c/9c9c1151f81291748bccb80f58590233532232cdc39b898c4aab39f6f251cac5.jpg",
    alt: "Man portrait",
    rotate: 0,
    delay: 0.6,
    z: 30,
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/43/439e3c68fb4bbed585233d79d1dc5486deb32f2327499891fa2304041e507120.jpg",
    alt: "Portrait",
    rotate: 11,
    delay: 0.75,
    z: 20,
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/dc/dc8074c97db7347ac21eb4779f03d4f4041b6ae9e87e32c3c2fd364781259c9e.jpg",
    alt: "Street style",
    rotate: 22,
    delay: 0.9,
    z: 10,
  },
];
export default function ServiceCardsHero({ serviceSlug = "handyman-services" }) {
 const content = {
  "handyman-services": { title: "Handyman Services", line: "for everyday home needs", description: "From small fixes to finishing touches, get practical help caring for your home in Cape Coral and surrounding areas." },
  "home-repairs": { title: "Home Repairs", line: "that bring comfort back", description: "Give worn walls, damaged trim, and everyday household problems the attention they need. Share your repair project with us." },
  "assembly-installation": { title: "Assembly & Installation", line: "ready for everyday living", description: "Get help turning boxes of parts into useful furniture, storage, and shelving that make your space work for you." },
  "cleaning-services": { title: "Cleaning Services", line: "for a fresher home", description: "From busy kitchens to everyday living spaces, get help keeping your home clean, comfortable, and ready to enjoy." },
  "home-renovation": { title: "Home Renovation", line: "to refresh your space", description: "Explore practical updates to your walls, floors, and finishing details. Tell us how you want your home to look and feel." },
 }[serviceSlug];
 const sourceName = serviceSlug === "home-repairs" ? "home%20repairs" : serviceSlug;
 const sources = [
  `/images/service-hero/${serviceSlug}-2.webp`,
  `/images/service-hero/${serviceSlug}-1.webp`,
  `/services%20images/${sourceName}.webp`,
  `/images/service-hero/${serviceSlug}-4.webp`,
  `/images/service-hero/${serviceSlug}-3.webp`,
 ];
 const cards = CARDS.map((card, i) => ({ ...card, src: sources[i], alt: `${serviceSlug.replaceAll("-", " ")} — ${["finished space", "work in progress", "service professional", "work details", "completed result"][i]}` }));
 const reduced = useReducedMotion();
 const enter = (y, delay, duration) => ({ initial: reduced ? false : {opacity:0,y}, animate:{opacity:1,y:0}, transition:{duration:reduced?0:duration,delay:reduced?0:delay,ease:[0.22,1,0.36,1]} });
 return <section className={styles.hero} aria-labelledby="service-cards-title">
 <div className={styles.content}>
 <motion.h1 id="service-cards-title" {...enter(24,.2,.6)}><em>{content.title}</em><br/>{content.line}</motion.h1>
 <motion.p {...enter(16,.38,.5)}>{content.description}</motion.p>
 <div className={styles.cards}>{cards.map((card,i)=><motion.div key={card.src} {...enter(60,card.delay,.65)} className={styles.cardPosition} style={{rotate:card.rotate,zIndex:card.z,translateX:`calc(${i-2} * var(--card-step))`}}><div className={styles.card}><img src={card.src} alt={card.alt} width="224" height="320" decoding="async" /></div></motion.div>)}</div>
 </div></section>;
}
