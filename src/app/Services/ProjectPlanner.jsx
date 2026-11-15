"use client";
import { useState } from "react";
import { Wrench, Hammer, Package, Sparkles, PaintRoller } from "lucide-react";
import styles from "./ProjectPlanner.module.css";
const services = [
 {slug:"handyman-services",title:"Handyman Services",description:"Help with everyday household jobs",Icon:Wrench,tasks:["Shelf mounting","Curtain rods","Door adjustments","Other small fixes"]},
 {slug:"home-repairs",title:"Home Repairs",description:"Attention for worn or damaged fittings",Icon:Hammer,tasks:["Cabinet repairs","Wall repairs","Trim repairs","Other repairs"]},
 {slug:"assembly-installation",title:"Assembly & Installation",description:"Furniture and household installations",Icon:Package,tasks:["Furniture assembly","Storage units","Shelving","Other installation"]},
 {slug:"cleaning-services",title:"Cleaning Services",description:"A fresh start for everyday spaces",Icon:Sparkles,tasks:["Kitchen","Bathrooms","Living areas","Whole home"]},
 {slug:"home-renovation",title:"Home Renovation",description:"Practical updates for your space",Icon:PaintRoller,tasks:["Interior painting","Flooring updates","Trim upgrades","Room refresh"]},
];
// Sample USD rates for client review. Replace with approved company pricing.
const testRates = {
 "handyman-services": { base: 85, additionalTask: 35 },
 "home-repairs": { base: 120, additionalTask: 50 },
 "assembly-installation": { base: 95, additionalTask: 40 },
 "cleaning-services": { base: 100, additionalTask: 30 },
 "home-renovation": { base: 350, additionalTask: 125 },
};
const scopeMultipliers = {
 "One small task": 1,
 "A few tasks": 1.5,
 "One room": 2,
 "Several rooms": 3.5,
 "Not sure yet": 1,
};
const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

function Choices({options,value,onChange,name}) { return <div className={styles.choices}>{options.map(option=><label key={option} className={styles.choice}><input type="radio" name={name} checked={value===option} onChange={()=>onChange(option)} /><span>{option}</span></label>)}</div>; }
export default function ProjectPlanner() {
 const [index,setIndex]=useState(0);
 const [scope,setScope]=useState("One small task");
 const [timing,setTiming]=useState("Flexible");
 const [tasks,setTasks]=useState([]);
 const service=services[index];
 const rate = testRates[service.slug];
 const scopePrice = Math.round(rate.base * scopeMultipliers[scope]);
 const extraTasks = Math.max(0, tasks.length - 1);
 const taskPrice = extraTasks * rate.additionalTask;
 const estimate = scopePrice + taskPrice;
 function continueToContact() {
  const message=`Project request\nService: ${service.title}\nScope: ${scope}\nPreferred timing: ${timing}\nTasks: ${tasks.length?tasks.join(", "):"To be discussed"}\nSample estimate: ${currency.format(estimate)} USD (test pricing, subject to client approval; materials and applicable taxes excluded)`;
  window.dispatchEvent(new CustomEvent("mertin-project-request",{detail:{service:service.slug,message}}));
  document.getElementById("contact")?.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});
 }
 return <section data-motion-section id="planner" className={styles.section} aria-labelledby="planner-title"><div className={styles.inner}>
  <header data-motion-group className={styles.heading}><h2 id="planner-title">Plan your next<br /><em>home project.</em></h2><p>Choose a service and tell us what you have in mind. See an instant sample estimate and share your project with Mertin Home Services LLC.</p></header>
  <div className={styles.panel}><div className={styles.steps}>
   <fieldset><legend><b>1</b>What do you need help with?</legend><p>Choose a service to get started.</p><div className={styles.choices}>{services.map(({title,description,Icon},i)=><label key={title} className={styles.choice}><input type="radio" name="planner-service" checked={index===i} onChange={()=>{setIndex(i);setTasks([]);}} /><Icon size={25} aria-hidden="true"/><span><strong>{title}</strong><small>{description}</small></span></label>)}</div></fieldset>
   <fieldset><legend><b>2</b>How much work is involved?</legend><Choices name="planner-scope" options={["One small task","A few tasks","One room","Several rooms","Not sure yet"]} value={scope} onChange={setScope}/></fieldset>
   <fieldset><legend><b>3</b>When would you like help?</legend><Choices name="planner-timing" options={["As soon as available","Within a few weeks","Planning ahead","Flexible"]} value={timing} onChange={setTiming}/><p className={styles.note}>Your preferred timing helps us plan. Availability is confirmed separately.</p></fieldset>
   <fieldset><legend><b>4</b>What should we look at?</legend><p>Select any tasks you would like to discuss.</p><div className={styles.choices}>{service.tasks.map(task=><label key={task} className={styles.choice}><input type="checkbox" checked={tasks.includes(task)} onChange={()=>setTasks(current=>current.includes(task)?current.filter(t=>t!==task):[...current,task])}/><span>{task}</span></label>)}</div></fieldset>
  </div><aside className={styles.summary} aria-live="polite"><span className={styles.eyebrow}>Your project</span><h3>{service.title}</h3><ul><li>{scope}</li><li>{timing}</li>{tasks.map(task=><li key={task}>{task}</li>)}</ul><div className={styles.price}><small>Estimated price / USD</small><strong>From {currency.format(estimate)}</strong><dl className={styles.breakdown}><div><dt>Selected project size</dt><dd>{currency.format(scopePrice)}</dd></div><div><dt>Additional tasks ({extraTasks})</dt><dd>{currency.format(taskPrice)}</dd></div></dl><p>The first selected task is included. Each additional task adds {currency.format(rate.additionalTask)}. Materials and applicable taxes are excluded.</p><p className={styles.testNote}>Test pricing for design review. Final company rates are pending approval.</p></div><button data-motion-cta type="button" onClick={continueToContact}>Continue to your request</button><small className={styles.hint}>Your choices will be added to the contact form.</small></aside></div>
 </div></section>;
}
