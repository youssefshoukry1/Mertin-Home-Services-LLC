"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./WhatsApp.module.css";

function WhatsAppIcon() {
  return <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M16 .9a14.7 14.7 0 0 0-12.7 22L1.2 31l8.3-2.2A14.8 14.8 0 1 0 16 .9Zm0 26.8c-2.2 0-4.3-.6-6.1-1.7l-.4-.2-4.9 1.3 1.3-4.8-.3-.5A12.2 12.2 0 1 1 16 27.7Zm6.7-9.1c-.4-.2-2.2-1.1-2.5-1.2-.3-.1-.6-.2-.8.2-.3.4-.9 1.2-1.1 1.4-.2.2-.4.3-.8.1-.4-.2-1.6-.6-3-1.9-1.1-1-1.9-2.2-2.1-2.6-.2-.4 0-.6.2-.8l.6-.7.4-.6c.1-.2 0-.5-.1-.7l-1.1-2.6c-.3-.7-.6-.6-.8-.6h-.7c-.3 0-.7.1-1 .5s-1.3 1.3-1.3 3.1 1.3 3.5 1.5 3.7c.2.2 2.6 4 6.3 5.6.9.4 1.6.6 2.1.7.9.3 1.7.2 2.3.2.7-.1 2.2-.9 2.5-1.7.3-.8.3-1.5.2-1.7-.1-.2-.4-.3-.8-.5Z" /></svg>;
}

export default function WhatsApp() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [notice, setNotice] = useState("");
  const panel = useRef(null);
  const trigger = useRef(null);
  const input = useRef(null);
  const number = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "4915214760899").replace(/\D/g, "");

  useEffect(() => {
    if (!open) return;
    input.current?.focus({ preventScroll: true });
    function key(event) {
      if (event.key === "Escape") { setOpen(false); trigger.current?.focus(); }
    }
    function outside(event) {
      if (!panel.current?.contains(event.target) && !trigger.current?.contains(event.target)) setOpen(false);
    }
    document.addEventListener("keydown", key);
    document.addEventListener("pointerdown", outside);
    return () => { document.removeEventListener("keydown", key); document.removeEventListener("pointerdown", outside); };
  }, [open]);

  function send(event) {
    event.preventDefault();
    if (!number) { setNotice("WhatsApp is not connected yet. Please use our contact form to tell us about your project."); return; }
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(message.trim() || "Hi Mertin! I would like help with a home project.")}`, "_blank", "noopener,noreferrer");
  }

  return <div className={styles.widget}>
    {open && <section ref={panel} id="whatsapp-chat" className={styles.panel} role="dialog" aria-label="Chat with Mertin Home Services">
      <header className={styles.header}>
        <div className={styles.avatar} aria-hidden="true">M<span /></div>
        <div><h2>Mertin Home Services</h2><p>Let’s talk about your home.</p></div>
        <button className={styles.close} type="button" aria-label="Close chat" onClick={() => { setOpen(false); trigger.current?.focus(); }}>×</button>
      </header>
      <div className={styles.conversation}>
        <span className={styles.label}>Start a conversation</span>
        <p className={styles.bubble}>Hi there! How can we help with your home today?</p>
      </div>
      <form className={styles.composer} onSubmit={send}>
        <input ref={input} aria-label="Your WhatsApp message" placeholder="Type your message…" value={message} onChange={event => setMessage(event.target.value)} maxLength={2000} />
        <button type="submit" aria-label="Continue in WhatsApp"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="m3 3 19 9-19 9 4-9-4-9Z"/><path d="M7 12h15"/></svg></button>
      </form>
      {notice && <p role="status" className={styles.notice}>{notice} <a href="#contact" onClick={() => setOpen(false)}>Contact us</a></p>}
    </section>}
    <button ref={trigger} type="button" className={styles.launcher} aria-label={open ? "Close WhatsApp chat" : "Open WhatsApp chat"} aria-expanded={open} aria-controls="whatsapp-chat" onClick={() => setOpen(value => !value)}><WhatsAppIcon /><span className={styles.dot} aria-hidden="true" /></button>
  </div>;
}
