"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const SLIDES = [
  {
    image: "/images/field.jpg",
    alt: "Solar Energy Solutions",
  },
  {
    image: "/images/panels.png",
    alt: "Solar Panel Systems",
  },
  {
    image: "/images/fieldwork.png",
    alt: "Professional Installation",
  },
] as const;

const INTERVAL_MS = 5000;

function useInView<T extends HTMLElement>(opts: IntersectionObserverInit = { threshold: 0.1 }) {
  const ref = useRef<T | null>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setShow(true);
    }, opts);
    io.observe(el);
    return () => io.disconnect();
  }, [opts]);
  return { ref, show } as const;
}

export default function HeroPremium() {
  const [active, setActive] = useState(0);
  const { ref, show } = useInView<HTMLDivElement>({ threshold: 0.15 });

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (prefersReduced) return;

    const id = setInterval(() => setActive((i) => (i + 1) % SLIDES.length), INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center overflow-hidden"
    >
      {/* Background images with dark overlay */}
      {SLIDES.map((slide, idx) => (
        <div
          key={slide.image}
          className={[
            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
            active === idx ? "opacity-100" : "opacity-0",
          ].join(" ")}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            className="object-cover"
            priority={idx === 0}
            sizes="100vw"
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/90 via-zinc-900/70 to-zinc-900/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 via-transparent to-zinc-900/30" />
        </div>
      ))}

      {/* Content */}
      <div
        className={[
          "relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-20",
          "transition-all duration-1000 delay-300",
          show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        ].join(" ")}
      >
        <div className="max-w-3xl">
          {/* Tag line */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse" />
            <span className="text-sm font-medium text-white/90">
              Powering Lebanon&apos;s Future
            </span>
          </div>

          {/* Main headline with split color */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-white mb-6">
            WE DO BIG THINGS WITH{" "}
            <span className="text-brand-yellow">NEW IDEAS</span>
          </h1>

          {/* Yellow accent line */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-1 bg-brand-yellow rounded-full" />
            <div className="w-4 h-1 bg-brand-orange rounded-full" />
          </div>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-10 leading-relaxed">
            Solenergy delivers comprehensive solar energy, backup generators, and smart energy management. 
            We power businesses and homes with intelligent, sustainable technology.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="/solutions"
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-brand-yellow text-zinc-900 font-bold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(244,180,26,0.4)] hover:scale-[1.02]"
            >
              <span className="relative z-10">Explore Solutions</span>
              <svg className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-transparent text-white font-bold rounded-lg border-2 border-white/30 transition-all duration-300 hover:bg-white/10 hover:border-white/50"
            >
              Get Free Quote
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-brand-yellow/20 flex items-center justify-center">
                <span className="text-brand-yellow font-bold text-lg">5+</span>
              </div>
              <div className="text-white/70 text-sm">
                <div className="font-semibold text-white">Years</div>
                Experience
              </div>
            </div>
            <div className="w-px h-10 bg-white/20 hidden sm:block" />
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-brand-yellow/20 flex items-center justify-center">
                <span className="text-brand-yellow font-bold text-lg">50+</span>
              </div>
              <div className="text-white/70 text-sm">
                <div className="font-semibold text-white">Projects</div>
                Completed
              </div>
            </div>
            <div className="w-px h-10 bg-white/20 hidden sm:block" />
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-brand-yellow/20 flex items-center justify-center">
                <span className="text-brand-yellow font-bold text-lg">24/7</span>
              </div>
              <div className="text-white/70 text-sm">
                <div className="font-semibold text-white">Support</div>
                Available
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-3">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActive(idx)}
            className={[
              "w-3 h-3 rounded-full transition-all duration-300",
              active === idx
                ? "bg-brand-yellow w-8"
                : "bg-white/40 hover:bg-white/60",
            ].join(" ")}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-brand-yellow/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}
