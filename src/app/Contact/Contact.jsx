"use client";

import { useEffect, useId, useRef, useState } from "react";
import styles from "./Contact.module.css";

const services = [
  ["handyman-services", "Handyman Services"],
  ["home-repairs", "Home Repairs"],
  ["assembly-installation", "Assembly & Installation"],
  ["cleaning-services", "Cleaning Services"],
  ["home-renovation", "Home Renovation"],
];

export default function Contact({ defaultService = "" }) {
  const [files, setFiles] = useState([]);
  const [requestedService, setRequestedService] = useState(defaultService);
  const [message, setMessage] = useState("");
  const previousPlan = useRef("");
  useEffect(() => {
    const receive = (event) => {
      const plan = event.detail;
      if (!services.some(([slug]) => slug === plan?.service) || typeof plan.message !== "string") return;
      setRequestedService(plan.service);
      const oldPlan = previousPlan.current;
      previousPlan.current = plan.message;
      setMessage(current => {
        const existing = oldPlan ? current.replace(oldPlan, "").trim() : current.trim();
        return [existing, plan.message].filter(Boolean).join("\n\n");
      });
    };
    window.addEventListener("mertin-project-request", receive);
    return () => window.removeEventListener("mertin-project-request", receive);
  }, []);
  const [celebrating, setCelebrating] = useState(false);
  const celebrationTimer = useRef(null);
  useEffect(() => () => clearTimeout(celebrationTimer.current), []);
  useEffect(() => { const image = new Image(); image.src = "/images/contact-worker-celebrate.webp"; }, []);
  function celebrate() { clearTimeout(celebrationTimer.current); setCelebrating(true); celebrationTimer.current = setTimeout(() => setCelebrating(false), 2000); }
  const [notice, setNotice] = useState("");
  function attach(event) {
    const selected = Array.from(event.target.files || []);
    if (selected.length > 5 || selected.some(file => !file.type.startsWith("image/") || file.size > 10 * 1024 * 1024)) {
      setNotice("Choose up to 5 photos, no larger than 10 MB each.");
      event.target.value = "";
      setFiles([]);
      return;
    }
    setFiles(selected);
    setNotice("");
  }
  return (
    <section data-motion-section id="contact" className={styles.section} aria-labelledby="contact-title">
      <div className={styles.container}>
        <header data-motion-group className={styles.heading}>
          <span className={styles.badge}>Contact</span>
          <h2 id="contact-title">Tell us about <em>your home project.</em></h2>
          <p>Which service do you need, and what needs attention?<br />Share a few details to help us understand your project.</p>
        </header>
        <div className={styles.columns}>
          <form data-motion-item className={styles.form} onSubmit={event => { event.preventDefault(); if (!new FormData(event.currentTarget).get("service")) { setNotice("Please choose a service."); event.currentTarget.querySelector('[role="combobox"]')?.focus(); return; } celebrate(); setNotice("Online requests are not available yet. Your message has not been sent."); }}>
            <p className={styles.required}>* Required fields</p>
            <div className={styles.row}>
              <label>Full name *<input name="name" autoComplete="name" placeholder="Your name" required /></label>
            </div>
            <label>Email address *<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label>
            <div className={styles.row}>
              <label>Phone number<input name="phone" type="tel" autoComplete="tel" placeholder="Your phone number" /></label>
              <ServicePicker key={requestedService} defaultService={requestedService} />
            </div>
            <label className={styles.message}>Your project *<textarea value={message} onChange={event => setMessage(event.target.value)} name="message" placeholder="Tell us what you need help with, where the work is, and any details we should know." rows={3} required /></label>
            <label className={styles.upload}>Project photos <span>(optional)</span><input type="file" name="photos" accept="image/*" multiple onChange={attach} /><small>{files.length ? `${files.length} photo${files.length === 1 ? "" : "s"} selected` : "Up to 5 photos / 10 MB each"}</small></label>
            <div className={styles.submitGroup} data-celebrating={celebrating}>
              {celebrating && <div className={styles.confetti} aria-hidden="true">{Array.from({length:18},(_,i)=><i key={i} style={{"--x":`${(i%6)*42-105}px`,"--y":`${-35-(i%4)*24}px`,"--r":`${i*57}deg`,"--delay":`${(i%3)*65}ms`,background:["#958777","#c4a45b","#a4988b"][i%3]}} />)}</div>}
              <button data-motion-cta className={styles.submit} type="submit">Submit</button>
            </div>
            {notice && <p className={styles.notice} role="status">{notice}</p>}
          </form>
          <aside data-motion-item className={styles.details}>
            <div className={styles.portrait} data-celebrating={celebrating}>
              <img className={styles.worker} src={celebrating ? "/images/contact-worker-celebrate.webp" : "/images/service-workers/handyman-services.webp"} alt="Mertin home service worker" width="900" height="1200" loading="lazy" decoding="async" />
            </div>
            <div className={styles.infoCard}>
              <div className={styles.infoItem}><span className={styles.infoIcon} aria-hidden="true">?</span><div><small>Local home services</small><strong>Cape Coral &amp; surrounding areas</strong></div></div>
              <div className={styles.infoItem}><span className={styles.infoIcon} aria-hidden="true">?</span><div><small>Practical help for your home</small><strong>Repairs, cleaning &amp; improvements</strong></div></div>
              <div className={styles.infoItem}><span className={styles.infoIcon} aria-hidden="true">?</span><div><small>Help us understand your project</small><strong>Attach up to 5 photos</strong></div></div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function ServicePicker({ defaultService }) {
  const [value, setValue] = useState(defaultService);
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(Math.max(0, services.findIndex(([slug]) => slug === defaultService)));
  const root = useRef(null);
  const id = useId();
  const choose = (index) => { setValue(services[index][0]); setFocused(index); setOpen(false); };
  useEffect(() => {
    if (!open) return;
    const close = (event) => { if (!root.current?.contains(event.target)) setOpen(false); };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [open]);
  return <div ref={root} className={styles.serviceField} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
    <span id={`${id}-label`} className={styles.serviceLabel}>Choose service *</span>
    <input type="hidden" name="service" value={value} />
    <button type="button" role="combobox" aria-labelledby={`${id}-label`} aria-expanded={open} aria-controls={`${id}-options`} aria-haspopup="listbox" aria-activedescendant={open ? `${id}-option-${focused}` : undefined} className={styles.serviceTrigger}
      onClick={() => setOpen(!open)} onKeyDown={(event) => {
        if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
          event.preventDefault(); setOpen(true);
          setFocused((index) => event.key === "Home" ? 0 : event.key === "End" ? services.length - 1 : !open ? index : (index + (event.key === "ArrowDown" ? 1 : -1) + services.length) % services.length);
        } else if (event.key === "Enter" || event.key === " ") { event.preventDefault(); if (open) choose(focused); else setOpen(true); }
        else if (event.key === "Escape") { event.preventDefault(); setOpen(false); }
        else if (event.key.length === 1) { const index = services.findIndex(([, title]) => title.toLowerCase().startsWith(event.key.toLowerCase())); if (index >= 0) { setOpen(true); setFocused(index); } }
      }}>
      <span>{services.find(([slug]) => slug === value)?.[1] || "Select a service"}</span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true" style={{transform: open ? "rotate(180deg)" : undefined}}><path d="m6 9 6 6 6-6" /></svg>
    </button>
    {open && <ul id={`${id}-options`} role="listbox" aria-labelledby={`${id}-label`} className={styles.serviceOptions}>
      {services.map(([slug, title], index) => <li id={`${id}-option-${index}`} key={slug} role="option" aria-selected={value === slug} data-focused={focused === index} onPointerDown={(event) => event.preventDefault()} onPointerMove={() => setFocused(index)} onClick={() => choose(index)}>{title}<span aria-hidden="true">{value === slug ? "?" : ""}</span></li>)}
    </ul>}
  </div>;
}
