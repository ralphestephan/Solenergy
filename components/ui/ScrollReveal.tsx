"use client";
import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal-base")
    ).filter((n) => !n.closest("[data-no-reveal]")); // ⬅️ skip FAQ (or any opt-out)

    if (!nodes.length) return;

    const prefersReduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (!("IntersectionObserver" in window) || prefersReduce) {
      nodes.forEach((n) => n.classList.add("reveal-in"));
      return;
    }

    let io: IntersectionObserver | null = null;

    try {
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              (e.target as HTMLElement).classList.add("reveal-in");
              io!.unobserve(e.target);
            }
          }
        },
        { threshold: 0.12 }
      );

      nodes.forEach((n) => io!.observe(n));

      const mo = new MutationObserver((muts) => {
        for (const m of muts) {
          m.addedNodes.forEach((ad) => {
            if (!(ad instanceof HTMLElement)) return;
            if (ad.closest("[data-no-reveal]")) return; // ⬅️ also skip dynamically added
            if (ad.matches?.(".reveal-base")) io!.observe(ad);
            ad.querySelectorAll?.(".reveal-base").forEach((el) => {
              if (!(el as Element).closest("[data-no-reveal]")) io!.observe(el);
            });
          });
        }
      });
      mo.observe(document.body, { subtree: true, childList: true });

      return () => {
        io?.disconnect();
        mo.disconnect();
      };
    } catch {
      nodes.forEach((n) => n.classList.add("reveal-in"));
    }
  }, []);

  return null;
}
