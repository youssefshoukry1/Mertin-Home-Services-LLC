"use client";

import { useEffect, useId, useRef, useState } from "react";
import Globe from "../ServiceAreas/Globe";
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
    <section id="contact" className={styles.section} aria-labelledby="contact-title">
      <div className={styles.container}>
        <header className={styles.heading}>
          <span className={styles.badge}>Contact</span>
          <h2 id="contact-title">Contact us</h2>
          <p>A repair, a refresh, or a helping hand around the house.<br />Tell us what you need and let&apos;s talk about your project.</p>
        </header>
        <div className={styles.columns}>
          <div className={styles.details}>
            <h3>Get in touch</h3>
            <p>Tell us about your home and the work you have in mind.</p>
            <ul className={styles.info}>
              <li><span aria-hidden="true">⌖</span>Cape Coral, Florida &amp; surrounding areas</li>
              <li><span aria-hidden="true">⌂</span>Home repairs, cleaning &amp; installation</li>
              <li><span aria-hidden="true">▧</span>Share photos of your project</li>
            </ul>
            <div className={styles.globe}><Globe textureSrc="/images/globe-outline.png" /></div>
          </div>
          <form className={styles.form} onSubmit={event => { event.preventDefault(); if (!new FormData(event.currentTarget).get("service")) { setNotice("Please choose a service."); event.currentTarget.querySelector('[role="combobox"]')?.focus(); return; } setNotice("Online requests aren’t available yet. Your message has not been sent."); }}>
            <div className={styles.formHeader}><h3>Send a message</h3><p>Tell us a little about your project.</p></div>
            <div className={styles.row}>
              <label>Full name<input name="name" autoComplete="name" placeholder="Your name" required /></label>
              <label>Company<input name="company" autoComplete="organization" placeholder="Company (optional)" /></label>
            </div>
            <label>Email address<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label>
            <div className={styles.row}>
              <label>Phone number<input name="phone" type="tel" autoComplete="tel" placeholder="Your phone number" /></label>
              <ServicePicker key={defaultService} defaultService={defaultService} />
            </div>
            <label>Message<textarea name="message" placeholder="Type your message here..." rows={5} required /></label>
            <label className={styles.upload}>Project photos <span>(optional)</span><input type="file" name="photos" accept="image/*" multiple onChange={attach} /><small>{files.length ? `${files.length} photo${files.length === 1 ? "" : "s"} selected` : "Up to 5 photos · 10 MB each"}</small></label>
            <button className={styles.submit} type="submit">Submit</button>
            {notice && <p className={styles.notice} role="status">{notice}</p>}
          </form>
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
    <span id={`${id}-label`} className={styles.serviceLabel}>Choose service</span>
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
