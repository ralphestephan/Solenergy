"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import DynamicUnderline from "@/components/ui/DynamicUnderline";

const GIFS = [
  "/images/solarGIF.webp",
  "/images/energy.gif",
] as const;

const ALT = [
  "Solar Energy Solutions",
  "Smart Energy Management",
] as const;

const INTERVAL_MS = 3500;

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

export default function Hero() {
  const [active, setActive] = useState(0);
  const { ref, show } = useInView<HTMLDivElement>({ threshold: 0.15 });

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (prefersReduced) return;

    const id = setInterval(() => setActive((i) => (i + 1) % GIFS.length), INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="hero"
      ref={ref}
      className={[
        "mt-8 md:mt-10 mb-12 md:mb-16",
        "transition-all duration-700",
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
        
      ].join(" ")}
    >
        <div
        className="absolute inset-0 -z-10 gradient-multi opacity-5 "
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
          maskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
        }}
      />
      <div className="mx-auto max-w-6xl px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* LEFT: copy */}
        <div className="space-y-6">
        <span className="pill">
          Powering Your Future
        </span>

        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
          Sustainable Energy <span className="text-brand-yellow">Solutions</span> for Tomorrow.
        </h1>

        {/* Dynamic underline under the title */}
        <div className="mt-1">
          <DynamicUnderline watch="#hero" align="left" widthClass="w-24" height={4} />
        </div>

        <p className="text-base md:text-lg text-zinc-700 max-w-[60ch]">
          Solenergy delivers comprehensive solar energy, backup generators, energy management systems, 
          and Industry 4.0 solutions. We power businesses and homes with intelligent, sustainable technology.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link href="/solutions" className="btn btn-primary">
            Explore Solutions
          </Link>
          <Link href="/contact" className="btn btn-outline">
            Free Consultation
          </Link>
        </div>

        </div>

        {/* RIGHT: visual — GIF crossfade, soft edge-faded gradient behind */}
        <div className="relative rounded-card overflow-hidden border border-zinc-100 shadow-soft aspect-[4/3]">
        {/* contained brand wash with edge fade so it blends into next sections */}
        <div
          className="absolute inset-0 -z-10 gradient-multi opacity-10"
          style={{
            WebkitMaskImage:
              "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.9) 10%, rgba(0,0,0,.9) 90%, rgba(0,0,0,0) 100%)",
            maskImage:
              "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.9) 10%, rgba(0,0,0,.9) 90%, rgba(0,0,0,0) 100%)",
          }}
          aria-hidden
        />

        {/* Stack frames; fade opacity for crossfade. object-cover + center keeps them consistent. */}
        {GIFS.map((src, idx) => (
          <Image
            key={`${src}-${idx}`}
            src={src}
            alt={ALT[idx] ?? "Smart living"}
            fill
            unoptimized
            sizes="(min-width: 1024px) 50vw, 100vw"
            className={[
              "absolute inset-0 object-cover",
              "transition-opacity duration-700 ease-in-out",
              active === idx ? "opacity-100" : "opacity-0",
            ].join(" ")}
            priority={idx === 0}
            aria-hidden={active !== idx}
          />
        ))}

          {/* subtle inner ring to define the card without a harsh border on dark/gradient backgrounds */}
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-zinc-900/5" />
        </div>
      </div>
    </section>
  );
}
