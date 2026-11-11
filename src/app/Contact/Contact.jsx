"use client";

import { useState } from "react";
import Globe from "../ServiceAreas/Globe";
import styles from "./Contact.module.css";

export default function Contact() {
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
          <form className={styles.form} onSubmit={event => { event.preventDefault(); setNotice("Online requests aren’t available yet. Your message has not been sent."); }}>
            <div className={styles.formHeader}><h3>Send a message</h3><p>Tell us a little about your project.</p></div>
            <div className={styles.row}>
              <label>Full name<input name="name" autoComplete="name" placeholder="Your name" required /></label>
              <label>Company<input name="company" autoComplete="organization" placeholder="Company (optional)" /></label>
            </div>
            <label>Email address<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label>
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
