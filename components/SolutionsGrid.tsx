"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SolutionCard from "@/components/SolutionCard";
import solutions from "@/data/solutions";

const GAP = 24;

export default function SolutionsGrid() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  // reveal on viewport
  useEffect(() => {
    const wrap = scrollerRef.current;
    if (!wrap) return;
    const onScroll = () => {
      const el = scrollerRef.current!;
      setAtStart(el.scrollLeft <= 4);
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
    };
    onScroll();
    wrap.addEventListener("scroll", onScroll, { passive: true });
    return () => wrap.removeEventListener("scroll", onScroll);
  }, []);

  const scrollByAmount = useCallback((dir: "prev" | "next") => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const firstCard = scroller.querySelector<HTMLElement>("[data-card]");
    const cardW = firstCard?.offsetWidth ?? 340;
    const delta = (cardW + GAP) * (dir === "next" ? 1 : -1);
    scroller.scrollBy({ left: delta, behavior: "smooth" });
  }, []);

  return (
    <div className="relative">
      {/* gradient fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent" />

      <section
        aria-label="Solutions carousel"
        ref={scrollerRef}
        className="no-scrollbar mx-auto max-w-6xl px-4 overflow-x-auto scroll-smooth snap-x snap-mandatory"
        style={{
          WebkitOverflowScrolling: "touch",
        }}
      >
        <div className="flex gap-6 items-stretch py-1">
          {solutions.map((s) => (
            <div
              key={s.slug}
              data-card
              className="snap-start shrink-0 w-[280px] sm:w-[340px] md:w-[380px]"
            >
              <SolutionCard
                slug={s.slug}
                title={s.heading}
                description={s.description}
                image={s.image}
              />
            </div>
          ))}
        </div>
      </section>

      {/* floating controls */}
      <div className="pointer-events-none absolute inset-x-0 -bottom-6 flex justify-center gap-3">
        <button
          aria-label="Previous"
          onClick={() => scrollByAmount("prev")}
          disabled={atStart}
          className="pointer-events-auto h-10 w-10 rounded-full bg-white/95 border border-zinc-200 shadow-sm backdrop-blur flex items-center justify-center hover:bg-white transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          aria-label="Next"
          onClick={() => scrollByAmount("next")}
          disabled={atEnd}
          className="pointer-events-auto h-10 w-10 rounded-full bg-white/95 border border-zinc-200 shadow-sm backdrop-blur flex items-center justify-center hover:bg-white transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
