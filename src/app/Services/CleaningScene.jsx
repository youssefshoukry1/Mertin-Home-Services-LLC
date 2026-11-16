"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./CleaningScene.module.css";

export default function CleaningScene() {
  const ref = useRef(null);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    let visible = false;
    const update = () => setRunning(visible && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    observer.observe(ref.current);
    document.addEventListener("visibilitychange", update);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", update); };
  }, []);
  return <div ref={ref} className={styles.scene} data-running={running} role="img" aria-label="Looping three-dimensional illustration of cleaning spray misting a dirty glass panel before a squeegee wipes it clean">
    <div className={styles.halo} aria-hidden="true" />
    <div className={styles.object} aria-hidden="true">
      <div className={styles.glass}>
        <div className={styles.reflection} />
        <div className={styles.dirt}><div className={styles.stains} /></div>
        <div className={styles.droplets} />
        <div className={styles.shine} />
      </div>
      <div className={styles.sprayer}>
        <svg viewBox="0 0 60 100" className={styles.bottle}>
          <defs><linearGradient id="cleaner-bottle"><stop stopColor="#c4dcda"/><stop offset=".45" stopColor="#eff9f5"/><stop offset="1" stopColor="#8faeab"/></linearGradient></defs>
          <path d="M22 28h20v16c0 9 12 13 12 24v23q0 6-6 6H15q-6 0-6-6V68c0-11 13-15 13-24Z" fill="url(#cleaner-bottle)" stroke="#789590"/>
          <path d="M21 23h23v12H21z" fill="#292d2b"/>
          <path d="M7 10h36l8 8-10 7H23l-6-5H7Z" fill="#b95135"/>
          <path d="m25 23-5 18" stroke="#292d2b" strokeWidth="5" strokeLinecap="round"/>
          <path d="M5 12h6v7H5z" fill="#292d2b"/>
          <rect x="15" y="59" width="33" height="22" rx="5" fill="#fffdfa"/>
          <path d="m32 63 2 5 5 2-5 2-2 5-2-5-5-2 5-2Z" fill="#b95135"/>
        </svg>
      </div>
      <div className={styles.mist}><i/><i/><i/><i/><i/></div>
      <div className={styles.tool}><div className={styles.blade} /><div className={styles.neck} /><div className={styles.handle} /></div>
      <span className={`${styles.sparkle} ${styles.one}`}>✦</span>
      <span className={`${styles.sparkle} ${styles.two}`}>✦</span>
    </div>
    <div className={styles.caption} aria-hidden="true"><span />A fresh start, every time.</div>
  </div>;
}
