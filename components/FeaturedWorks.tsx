// components/FeaturedWorks.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CATEGORIES = ["All Projects", "Solar Systems", "Generators", "Energy Management"] as const;
type Category = typeof CATEGORIES[number];

const PROJECTS = [
  {
    title: "Commercial Solar Installation",
    category: "Solar Systems" as const,
    image: "/images/field.jpg",
    href: "/solutions/solar-services",
  },
  {
    title: "Industrial Generator Setup",
    category: "Generators" as const,
    image: "/images/volvoGENERATOR.png",
    href: "/solutions/generators",
  },
  {
    title: "Smart Factory Integration",
    category: "Energy Management" as const,
    image: "/images/girdBattery.jpg",
    href: "/solutions/energy-management",
  },
  {
    title: "Hybrid Power System",
    category: "Solar Systems" as const,
    image: "/images/fieldwork.png",
    href: "/solutions/solar-services",
  },
];

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

  const filteredProjects =
    activeCategory === "All Projects"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section ref={ref} className="py-24 bg-white relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header with category filters */}
        <div
          className={[
            "flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12",
            "transition-all duration-700",
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          ].join(" ")}
        >
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              FEATURE{" "}
              <span className="text-brand-yellow">WORKS</span>
            </h2>
            <div className="w-16 h-1 bg-brand-yellow mt-4" />
          </div>

          {/* Category filters - Marize style */}
          <div className="flex flex-wrap gap-2 md:gap-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={[
                  "px-4 py-2 text-sm font-medium transition-all duration-300",
                  activeCategory === cat
                    ? "text-brand-yellow border-b-2 border-brand-yellow"
                    : "text-zinc-500 hover:text-zinc-900",
                ].join(" ")}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects grid */}
        <div
          className={[
            "grid sm:grid-cols-2 lg:grid-cols-4 gap-4",
            "transition-all duration-700 delay-200",
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          ].join(" ")}
        >
          {filteredProjects.map((project, i) => (
            <Link
              key={`${project.title}-${i}`}
              href={project.href}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden"
            >
              {/* Image */}
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-zinc-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content overlay */}
              <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <div className="text-xs text-brand-yellow font-medium mb-1">
                  {project.category}
                </div>
                <h3 className="text-white font-bold">{project.title}</h3>
              </div>

              {/* Top-right arrow */}
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-brand-yellow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-45">
                <ArrowRight className="w-5 h-5 text-zinc-900" />
              </div>
            </Link>
          ))}
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
            href="/solutions"
            className="inline-flex items-center gap-2 text-brand-yellow font-semibold hover:gap-3 transition-all"
          >
            View All Projects
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
