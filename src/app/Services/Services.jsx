"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import styles from "./Services.module.css";

// User-provided service photography.
const services = [
  { title: "Handyman Services", slug: "handyman-services",  },
  { title: "Home Repairs", slug: "home-repairs",  },
  { title: "Assembly & Installation", slug: "assembly-installation",  },
  { title: "Cleaning Services", slug: "cleaning-services",  },
  { title: "Home Renovation", slug: "home-renovation",  },
];

export default function Services() {
  const [active, setActive] = useState(2);
  const [drag, setDrag] = useState(0);
  const pointer = useRef(null);
  const suppressClick = useRef(false);
  const step = (direction) => setActive((index) => (index + direction + services.length) % services.length);
  const finish = (event, cancelled = false) => {
    const gesture = pointer.current;
    if (!gesture || gesture.id !== event.pointerId) return;
    pointer.current = null;
    if (!cancelled && gesture.horizontal && Math.abs(gesture.dx) > 35) step(gesture.dx < 0 ? 1 : -1);
    setDrag(0);
  };
  return (
    <section id="services" className={styles.section} aria-labelledby="services-title">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 id="services-title">How Can I Help?</h2>
          <p>Let&apos;s turn your vision into something amazing.</p>
        </div>
        <div className={styles.arc} role="region" aria-roledescription="carousel" aria-label="Home services" tabIndex={0}
          onKeyDown={(event) => { if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); step(event.key === "ArrowRight" ? 1 : -1); } }}
          onPointerDown={(event) => { if (event.button !== 0) return; suppressClick.current = false; pointer.current = { id: event.pointerId, x: event.clientX, y: event.clientY, dx: 0, horizontal: false, width: event.currentTarget.clientWidth }; }}
          onPointerMove={(event) => {
            const gesture = pointer.current;
            if (!gesture || gesture.id !== event.pointerId) return;
            const dx = event.clientX - gesture.x;
            const dy = event.clientY - gesture.y;
            if (!gesture.horizontal && Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) { pointer.current = null; return; }
            if (!gesture.horizontal && Math.abs(dx) > 8) { gesture.horizontal = true; event.currentTarget.setPointerCapture(event.pointerId); suppressClick.current = true; }
            if (gesture.horizontal) { gesture.dx = dx; setDrag(Math.max(-1, Math.min(1, dx / Math.min(gesture.width * .45, 300)))); }
          }}
          onPointerUp={finish} onPointerCancel={(event) => finish(event, true)}
          onClickCapture={(event) => { if (suppressClick.current) { event.preventDefault(); event.stopPropagation(); suppressClick.current = false; } }}
          onDragStart={(event) => event.preventDefault()}>
          {services.map((service, index) => {
            const distance = (index - active + services.length + 2) % services.length - 2;
            const position = distance + drag;
            return (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              prefetch={false}
              className={styles.card}
              tabIndex={index === active ? 0 : -1}
              aria-label={service.title + (index === active ? ", selected service" : ", select service")}
              onClick={(event) => { if (index !== active) { event.preventDefault(); setActive(index); } }}
              style={{ "--offset": position, "--depth": Math.abs(position), zIndex: 10 - Math.abs(distance), transition: drag ? "none" : undefined }}
            >
              <div className={styles.images} aria-hidden="true">
                <span className={styles.backImage} />
                <img
                  src={`/services%20images/${service.slug === "home-repairs" ? "home%20repairs" : service.slug}.webp`}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className={styles.frontImage}
                />
              </div>
              <h3>{service.title}</h3>
            </Link>
          ); })}
        </div>
        <div className={styles.controls}>
          <button type="button" onClick={() => step(-1)} aria-label="Previous service">&#8592;</button>
          <div className={styles.dots}>{services.map((service, index) => <button type="button" key={service.slug} aria-label={"Show " + service.title} aria-current={active === index ? "true" : undefined} onClick={() => setActive(index)} />)}</div>
          <button type="button" onClick={() => step(1)} aria-label="Next service">&#8594;</button>
        </div>
        <p className={styles.status} aria-live="polite">{services[active].title} ? {active + 1} / {services.length}</p>
      </div>
    </section>
  );
}
