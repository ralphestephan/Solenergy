"use client";

import { PropsWithChildren, useEffect, useRef, useState, ElementType } from "react";

type Props = PropsWithChildren<{
  threshold?: number;
  className?: string;
  as?: ElementType;
  /** start the animation a bit before entering the viewport */
  rootMargin?: string; // e.g. "0px 0px -10% 0px"
}>;

export default function Reveal({
  children,
  threshold = 0,               // threshold 0 feels smoother on mobile
  className = "",
  as = "div",
  rootMargin = "0px 0px -12% 0px", // start a little earlier so it doesn’t pop
}: Props) {
  const Tag = as as any;
  const ref = useRef<HTMLElement | null>(null);

  // Visible by default on SSR to avoid layout shift/blank paint
  const [show, setShow] = useState(true);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (reduce) return; // leave visible, no animation

    const el = ref.current;
    if (!el) return;

    // If already in view on mount, keep visible (prevents "hide-then-show" flash)
    const vh = window.innerHeight || 0;
    const rect = el.getBoundingClientRect();
    const initiallyInView = rect.top < vh * 0.92 && rect.bottom > 0;

    // Only start hidden if not initially on screen
    setShow(initiallyInView);

    if (!("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);

  // Shorter distance & duration for touch devices; feels less “snappy”
  const isCoarse =
    typeof window !== "undefined" &&
    window.matchMedia?.("(pointer: coarse)")?.matches;

  const distance = isCoarse ? "translate-y-1.5" : "translate-y-2";
  const duration = isCoarse ? "duration-400" : "duration-500";

  return (
    <Tag
      ref={ref}
      className={[
        className,
        "transition-all ease-[cubic-bezier(.22,.9,.25,1)] will-change-[opacity,transform]",
        duration,
        show ? "opacity-100 translate-y-0" : `opacity-0 ${distance}`,
      ].join(" ")}
    >
      {children}
    </Tag>
  );
}
