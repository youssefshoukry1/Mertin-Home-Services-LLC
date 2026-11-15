"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function SiteMotion() {
 const pathname = usePathname();
 useEffect(() => {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  const sections = [...document.querySelectorAll("[data-motion-section]")];
  // Observe individual content blocks so lower card rows reveal when reached.
  // Forms, maps, and the physics-driven review rail stay intact as single blocks.
  const targets = [];
  sections.forEach(section => {
   const candidates = [...section.querySelectorAll("[data-motion-item], h1, h2, p, [data-motion-cta], [data-motion-group] > span, [data-motion-group] > img")]
    .filter(node => (!node.closest("form, canvas, [role='listbox']") || node.matches("form[data-motion-item]")) && !node.parentElement.closest("[data-motion-item], [data-motion-section] [data-motion-cta]"));
   if (!candidates.length) candidates.push(section);
   candidates.forEach((node, index) => {
    if (targets.includes(node)) return;
    node.style.setProperty("--reveal-delay", `${(index % 4) * 80}ms`);
    targets.push(node);
   });
  });
  let observer;
  const reveal = (element, immediate = false) => {
   if (element.dataset.motionState === "visible" || element.dataset.motionState === "done") return;
   element.dataset.motionState = immediate ? "done" : "visible";
   observer?.unobserve(element);
  };
  const showAll = () => targets.forEach(node => reveal(node, true));
  const focus = event => targets.forEach(node => {
   if (node.contains(event.target)) reveal(node, true);
  });
  const hash = () => {
   try {
    const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (target) targets.forEach(node => {
     if (target.contains(node) || node.contains(target)) reveal(node, true);
    });
   } catch { /* Malformed fragments do not affect content visibility. */ }
  };
  if (!media.matches && "IntersectionObserver" in window) {
   observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) reveal(entry.target); });
   }, { threshold: 0, rootMargin: "0px 0px -24px 0px" });
   targets.forEach(node => {
    const rect = node.getBoundingClientRect();
    if (rect.bottom <= 0) node.dataset.motionState = "done";
    else if (rect.top < window.innerHeight - 24) reveal(node);
    else {
     node.dataset.motionState = "pending";
     observer.observe(node);
    }
   });
   hash();
  }
  const onPreference = () => { if (media.matches) showAll(); };
  media.addEventListener("change", onPreference);
  document.addEventListener("focusin", focus);
  window.addEventListener("hashchange", hash);
  return () => {
   observer?.disconnect();
   media.removeEventListener("change", onPreference);
   document.removeEventListener("focusin", focus);
   window.removeEventListener("hashchange", hash);
   targets.forEach(node => { delete node.dataset.motionState; });
  };
 }, [pathname]);
 return null;
}
