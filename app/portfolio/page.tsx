// app/portfolio/page.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SITE } from "@/lib/site";
import SEOJsonLd from "@/components/SEOJsonLd";
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

export default function PortfolioPage() {
  const { ref, show } = useInView<HTMLElement>();
  const [activeCategory, setActiveCategory] = useState<Category>("All Projects");

  const filteredProjects =
    activeCategory === "All Projects"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <main className="w-full overflow-x-clip">
      <SEOJsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Solenergy Portfolio",
          url: `${SITE.baseUrl}/portfolio`,
          description: "Explore our portfolio of solar energy, generator, and energy management projects across Lebanon and Qatar.",
        }}
      />

      {/* HERO SECTION - With background image */}
      <section className="relative py-20 md:py-28 min-h-[60vh] flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/ChatGPT Image Jan 5, 2026, 12_22_47 AM.png"
            alt="Solenergy Portfolio"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/95 via-zinc-900/85 to-zinc-900/75" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-transparent to-zinc-900/40" />
        </div>
        
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-brand-yellow/20 text-brand-yellow text-sm font-semibold mb-6">
              OUR WORK
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
              <span className="text-white">Our </span>
              <span className="text-brand-yellow">Portfolio</span>
            </h1>
            <div className="mt-6 flex justify-center">
              <div className="w-24 h-1 bg-brand-yellow rounded-full" />
            </div>
            <p className="mt-6 text-xl text-white/90 leading-relaxed">
              30 years of experience delivering 50+ MW of solar energy, generator, and energy management solutions. 
              Projects ranging from 1kW to 1MW across Lebanon and Qatar.
            </p>
          </div>
        </div>
      </section>

      {/* PORTFOLIO GRID SECTION */}
      <section ref={ref} className="py-16 bg-white relative">
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
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900">
                FEATURE{" "}
                <span className="text-brand-yellow">WORKS</span>
              </h2>
              <div className="w-16 h-1 bg-brand-yellow mt-4" />
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap items-center gap-2 md:gap-4 text-zinc-600 text-sm">
              {CATEGORIES.map((cat, index) => (
                <div key={cat} className="flex items-center">
                  <button
                    onClick={() => setActiveCategory(cat)}
                    className={[
                      "px-3 py-1 transition-all duration-300",
                      activeCategory === cat
                        ? "text-brand-yellow border-b-2 border-brand-yellow font-semibold"
                        : "hover:text-zinc-900",
                    ].join(" ")}
                  >
                    {cat}
                  </button>
                  {index < CATEGORIES.length - 1 && (
                    <span className="mx-2 text-zinc-300">|</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Projects grid */}
          <div
            className={[
              "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6",
              "transition-all duration-700 delay-200",
              show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            ].join(" ")}
          >
            {filteredProjects.map((project) => (
              <Link
                key={project.id}
                href={`/portfolio/${project.slug}`}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-zinc-100"
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
                  <div className="flex items-center gap-3 text-white/80 text-sm mb-2">
                    <span>{project.capacity}</span>
                    <span>•</span>
                    <span>{project.location}</span>
                  </div>
                  <p className="text-white/70 text-xs">{project.description}</p>
                </div>

                {/* Top-right arrow */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-brand-yellow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-45">
                  <ArrowRight className="w-5 h-5 text-zinc-900" />
                </div>
              </Link>
            ))}
          </div>

          {/* Stats section */}
          <div
            className={[
              "mt-16 pt-16 border-t border-zinc-200",
              "transition-all duration-700 delay-300",
              show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            ].join(" ")}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: "30", label: "Years Experience" },
                { value: "50+", label: "MW Installed" },
                { value: "1kW-1MW", label: "Project Range" },
                { value: "100+", label: "Projects Completed" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div className="text-3xl md:text-4xl font-extrabold text-brand-yellow mb-2">{value}</div>
                  <div className="text-zinc-600 text-sm">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div
            className={[
              "mt-16 text-center",
              "transition-all duration-700 delay-400",
              show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            ].join(" ")}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-zinc-600 mb-8 max-w-2xl mx-auto">
              Contact us today for a free consultation and personalized quote for your solar energy, generator, or energy management needs.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-yellow text-zinc-900 font-bold rounded-xl hover:bg-brand-orange hover:shadow-lg transition-all"
            >
              Get Free Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
