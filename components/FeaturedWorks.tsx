// components/FeaturedWorks.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";

const CATEGORIES = ["All Projects", "Solar Systems", "Generators", "Energy Management", "Commercial", "Residential"] as const;
type Category = typeof CATEGORIES[number];

function useInView<T extends HTMLElement>(opts: IntersectionObserverInit = { threshold: 0.1 }) {
  const ref = useRef<T | null>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setShow(true);
    }, opts);
    io.observe(el);
    return () => io.disconnect();
  }, [opts]);
  return { ref, show } as const;
}

export default function FeaturedWorks() {
  const { ref, show } = useInView<HTMLElement>();
  const [activeCategory, setActiveCategory] = useState<Category>("All Projects");

  // Get featured projects (first 8)
  const featuredProjects = projects.slice(0, 8);

  const filteredProjects =
    activeCategory === "All Projects"
      ? featuredProjects
      : featuredProjects.filter((p) => p.category === activeCategory);

  return (
    <section ref={ref} className="py-24 bg-zinc-900 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        {/* Header with category filters - matching the design exactly */}
        <div
          className={[
            "flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12",
            "transition-all duration-700",
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          ].join(" ")}
        >
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              FEATURE{" "}
              <span className="text-brand-yellow">WORKS</span>
            </h2>
            <div className="w-16 h-1 bg-brand-yellow mt-4" />
          </div>

          {/* Category filters - matching the design style */}
          <div className="flex flex-wrap items-center gap-2 md:gap-4 text-white/70 text-sm">
            {CATEGORIES.map((cat, index) => (
              <div key={cat} className="flex items-center">
                <button
                  onClick={() => setActiveCategory(cat)}
                  className={[
                    "px-3 py-1 transition-all duration-300",
                    activeCategory === cat
                      ? "text-brand-yellow border-b-2 border-brand-yellow font-semibold"
                      : "hover:text-white",
                  ].join(" ")}
                >
                  {cat}
                </button>
                {index < CATEGORIES.length - 1 && (
                  <span className="mx-2 text-white/30">|</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Projects grid - Desktop: Grid, Mobile: Carousel */}
        {/* Desktop Grid */}
        <div
          className={[
            "hidden lg:grid lg:grid-cols-4 gap-4",
            "transition-all duration-700 delay-200",
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          ].join(" ")}
        >
          {filteredProjects.map((project) => (
            <Link
              key={project.id}
              href={`/portfolio/${project.slug}`}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-zinc-800"
            >
              {/* Image */}
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content overlay - appears on hover */}
              <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <div className="text-xs text-brand-yellow font-medium mb-1">
                  {project.category}
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{project.title}</h3>
                <div className="flex items-center gap-3 text-white/80 text-sm">
                  <span>{project.capacity}</span>
                  <span>•</span>
                  <span>{project.location}</span>
                </div>
              </div>

              {/* Top-right arrow */}
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-brand-yellow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-45">
                <ArrowRight className="w-5 h-5 text-zinc-900" />
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div
          className={[
            "lg:hidden overflow-x-auto snap-x snap-mandatory scroll-smooth -mx-6 px-6 popular-solutions-scroll",
            "transition-all duration-700 delay-200",
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          ].join(" ")}
        >
          <div className="flex gap-4" style={{ width: 'max-content' }}>
            {filteredProjects.map((project) => (
              <Link
                key={project.id}
                href={`/portfolio/${project.slug}`}
                className="group snap-start flex-shrink-0 w-[85vw] sm:w-[70vw]"
              >
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-zinc-800">
                  {/* Image */}
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 85vw, 70vw"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-zinc-900/30 to-transparent" />

                  {/* Content overlay - always visible on mobile */}
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <div className="text-xs text-brand-yellow font-medium mb-1">
                      {project.category}
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">{project.title}</h3>
                    <div className="flex items-center gap-3 text-white/80 text-sm">
                      <span>{project.capacity}</span>
                      <span>•</span>
                      <span>{project.location}</span>
                    </div>
                  </div>

                  {/* Top-right arrow */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-brand-yellow flex items-center justify-center">
                    <ArrowRight className="w-5 h-5 text-zinc-900" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* View all button */}
        <div
          className={[
            "text-center mt-12",
            "transition-all duration-700 delay-300",
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          ].join(" ")}
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-brand-yellow font-semibold hover:gap-3 transition-all text-lg"
          >
            View All Projects
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
