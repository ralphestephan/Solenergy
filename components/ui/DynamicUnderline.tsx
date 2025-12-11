"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  watch?: string;
  align?: "center" | "left";
  widthClass?: string;
  height?: number;
  className?: string;
  gradientClass?: string;
  minProgress?: number;
};

export default function DynamicUnderline({
  watch,
  align = "center",
  widthClass = "w-20",
  height = 4,
  className = "",
  gradientClass = "from-brand-blue to-brand-green",
  minProgress = 0.15,
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(minProgress);

  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  useEffect(() => {
    const track = trackRef.current;
    const target =
      (watch ? document.querySelector(watch) : null) ??
      track?.closest("section") ??
      track?.parentElement ??
      null;

    if (!track || !target) return;

    let raf = 0;
    let active = false; // gated by IntersectionObserver

    const update = () => {
      if (!active) return;
      const rect = (target as HTMLElement).getBoundingClientRect();
      const vh = window.innerHeight;

      // start filling near bottom of viewport; finish a bit after it crosses top
      const start = vh * 0.9;
      const end = -(rect.height * 0.2);

      const t = (start - rect.top) / (start - end);
      const clamped = Math.max(minProgress, Math.min(1, t));
      setProgress(clamped);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    // Only animate when the target section is on screen
    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        active = entry.isIntersecting;
        if (active) onScroll();
      },
      { rootMargin: "0px 0px -10% 0px" }
    );

    sectionObserver.observe(target);

    // listeners are cheap when gated by `active`
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // initial
    onScroll();

    return () => {
      cancelAnimationFrame(raf);
      sectionObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [watch, minProgress]);

  return (
    <div
      ref={trackRef}
      className={`${align === "center" ? "mx-auto" : ""} ${widthClass} relative rounded-full ${className}`}
      style={{ height }}
      aria-hidden
    >
      <div
        className={[
          "absolute inset-y-0 left-0 bg-gradient-to-r",
          gradientClass,
          "will-change-[width]",
          reduce ? "" : "transition-[width] duration-300 ease-out",
        ].join(" ")}
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}
