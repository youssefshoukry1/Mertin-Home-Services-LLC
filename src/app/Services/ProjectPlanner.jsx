"use client";
import { useEffect, useRef, useState } from "react";
import { Wrench, Hammer, Package, Sparkles, PaintRoller } from "lucide-react";
import styles from "./ProjectPlanner.module.css";
const services = [
 {slug:"handyman-services",title:"Handyman Services",description:"General property maintenance",Icon:Wrench,tasks:["Shelf mounting","Curtain rods","Door adjustments","General maintenance"]},
 {slug:"home-repairs",title:"Home Repairs",description:"Attention for worn or damaged fittings",Icon:Hammer,tasks:["Cabinet repairs","Wall repairs","Trim repairs","Other repairs"]},
 {slug:"assembly-installation",title:"Assembly & Installation",description:"Furniture, fixtures, and shelving",Icon:Package,tasks:["Furniture assembly","Storage units","Shelving","Other installation"]},
 {slug:"cleaning-services",title:"Cleaning Services",description:"Interior cleaning by area",Icon:Sparkles,tasks:["Kitchen","Bathrooms","Living areas","Full property"]},
 {slug:"home-renovation",title:"Home Renovation",description:"Practical updates for your space",Icon:PaintRoller,tasks:["Interior painting","Flooring updates","Trim upgrades","Room refresh"]},
];
function Choices({options,value,onChange,name}) { return <div className={styles.choices}>{options.map(option=><label key={option} className={styles.choice}><input type="radio" name={name} checked={value===option} onChange={()=>onChange(option)} /><span>{option}</span></label>)}</div>; }
export default function ProjectPlanner() {
 const [index,setIndex]=useState(0);
 const panelRef=useRef(null);
 const [estimateVisible,setEstimateVisible]=useState(false);
 useEffect(()=>{
  const observer=new IntersectionObserver(([entry])=>{
   setEstimateVisible(entry.isIntersecting);
   document.body.toggleAttribute("data-planner-visible",entry.isIntersecting);
  },{rootMargin:"-90px 0px -120px 0px"});
  observer.observe(panelRef.current);
  return ()=>{observer.disconnect();document.body.removeAttribute("data-planner-visible");};
 },[]);
 const [scope,setScope]=useState("Scope to be confirmed");
 const [propertyType,setPropertyType]=useState("To be confirmed");
 const [timing,setTiming]=useState("Flexible");
 const [tasks,setTasks]=useState([]);
 const service=services[index];
 function continueToContact() {
  const message=`Project request\nService: ${service.title}\nProperty type: ${propertyType}\nScope: ${scope}\nPreferred timing: ${timing}\nTasks: ${tasks.length?tasks.join(", "):"To be discussed"}`;
  window.dispatchEvent(new CustomEvent("mertin-project-request",{detail:{service:service.slug,message}}));
  document.getElementById("contact")?.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});
 }
 return <section data-motion-section id="planner" className={styles.section} aria-labelledby="planner-title"><div className={styles.inner}>
  <header data-motion-group className={styles.heading}><h2 id="planner-title">Request a<br /><em>project estimate.</em></h2><p>Choose a service, property type, scope, and timeline to prepare your inquiry. We can discuss an estimate after reviewing the project details.</p></header>
  <div ref={panelRef} className={styles.panel}><div className={styles.steps}>
   <fieldset><legend><b>1</b>Which service do you need?</legend><p>Choose a service to get started.</p><div className={styles.choices}>{services.map(({title,description,Icon},i)=><label key={title} className={styles.choice}><input type="radio" name="planner-service" checked={index===i} onChange={()=>{setIndex(i);setTasks([]);}} /><Icon size={25} aria-hidden="true"/><span><strong>{title}</strong><small>{description}</small></span></label>)}</div></fieldset>
   <fieldset><legend><b>2</b>What type of property is involved?</legend><Choices name="planner-property" options={["Residential property","Multi-unit residential","Commercial property","To be confirmed"]} value={propertyType} onChange={setPropertyType}/></fieldset>
   <fieldset><legend><b>3</b>What is the project scope?</legend><Choices name="planner-scope" options={["Single area","Multiple areas","Multiple units","Multiple properties","Scope to be confirmed"]} value={scope} onChange={setScope}/></fieldset>
   <fieldset><legend><b>4</b>When would you like help?</legend><Choices name="planner-timing" options={["As soon as available","Within a few weeks","Planning ahead","Flexible"]} value={timing} onChange={setTiming}/><p className={styles.note}>Your preferred timing helps us plan. Availability is confirmed separately.</p></fieldset>
   <fieldset><legend><b>5</b>Which work should we include?</legend><p>Select any tasks you would like to discuss.</p><div className={styles.choices}>{service.tasks.map(task=><label key={task} className={styles.choice}><input type="checkbox" checked={tasks.includes(task)} onChange={()=>setTasks(current=>current.includes(task)?current.filter(t=>t!==task):[...current,task])}/><span>{task}</span></label>)}</div></fieldset>
  </div><aside className={`${styles.summary} ${styles.desktopSummary}`} aria-live="polite"><span className={styles.eyebrow}>Your project</span><h3>{service.title}</h3><ul><li>{propertyType}</li><li>{scope}</li><li>{timing}</li>{tasks.map(task=><li key={task}>{task}</li>)}</ul><button data-motion-cta type="button" onClick={continueToContact}>Continue to your request</button><small className={styles.hint}>Your choices will be added to the contact form.</small></aside><aside className={`${styles.summary} ${styles.mobileSummary}`} data-visible={estimateVisible} inert={!estimateVisible} aria-hidden={!estimateVisible} aria-label="Project estimate request">
    <div className={styles.summaryInfo}><span className={styles.eyebrow}>Project estimate</span><strong className={styles.livePrice} aria-live="polite" aria-atomic="true">{service.title}</strong><span className={styles.testLabel}>Pricing confirmed after scope review</span></div>
    <button data-motion-cta type="button" onClick={continueToContact}>Request quote</button>
  </aside></div>
 </div></section>;
}
