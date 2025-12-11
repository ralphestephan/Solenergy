// components/ServicesPremium.tsx
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Sun, Zap, Wrench, Cloud, ArrowRight } from "lucide-react";

const services = [
  {
    title: "Solar Solutions",
    body:
      "Complete solar panel installation, maintenance, and monitoring. From residential rooftops to large-scale commercial systems.",
    icon: Sun,
    href: "/solutions/solar-services",
    image: "/images/field.jpg",
    tint: "yellow" as const,
  },
  {
    title: "Backup Generators",
    body:
      "Reliable generator solutions with automatic switching and smart load management for uninterrupted power supply.",
    icon: Zap,
    href: "/solutions/generators",
    image: "/images/volvoGENERATOR.png",
    tint: "orange" as const,
  },
  {
    title: "Maintenance Services",
    body:
      "24/7 preventive maintenance and emergency support for generators, solar systems, and all energy infrastructure.",
    icon: Wrench,
    href: "/solutions/maintenance-services",
    image: "/images/fieldwork.png",
    tint: "yellow" as const,
  },
  {
    title: "Energy Management",
    body:
      "Sol4.o SaaS platform—smart monitoring, control, and optimization of all your energy assets from one dashboard.",
    icon: Cloud,
    href: "/solutions/energy-management",
    image: "/images/GRID.jpg",
    tint: "orange" as const,
  },
];

const highlights = [
  { title: "Installation", desc: "Professional setup with certified technicians" },
  { title: "Monitoring", desc: "24/7 real-time system tracking" },
  { title: "Maintenance", desc: "Preventive care & emergency support" },
  { title: "Optimization", desc: "AI-powered energy efficiency" },
];

export default function ServicesPremium() {
  const wrapRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = wrapRef.current;
    if (!root) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-svc-card]"));
    if (prefersReduced) {
      cards.forEach((c) => c.classList.add("reveal-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("reveal-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    cards.forEach((c) => {
      c.classList.add("reveal-base");
      io.observe(c);
    });

    return () => io.disconnect();
  }, []);

  return (
    <section ref={wrapRef} className="py-24 relative bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header - Marize style */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            WELCOME TO{" "}
            <span className="text-brand-yellow">SOLENERGY</span>
          </h2>
          <div className="w-16 h-1 bg-brand-yellow mx-auto mt-4 mb-6" />
          <p className="text-zinc-600 max-w-2xl mx-auto text-lg">
            Leading provider of solar energy, backup generators, and smart energy solutions. 
            Powering Lebanon&apos;s future with sustainable technology.
          </p>
        </div>

        {/* Main services grid - 2 image cards + highlights list */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* First two service cards with images */}
          {services.slice(0, 2).map(({ title, body, href, image, tint }, i) => (
            <article
              key={title}
              data-svc-card
              style={{ transitionDelay: `${i * 100}ms` }}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
            >
              {/* Image section */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                {/* Yellow accent bar */}
                <div className={`absolute bottom-0 left-0 w-1 h-full ${tint === "orange" ? "bg-brand-orange" : "bg-brand-yellow"}`} />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-brand-yellow transition-colors">
                  {title}
                </h3>
                <p className="text-zinc-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {body}
                </p>
                <Link
                  href={href}
                  className={`inline-flex items-center gap-2 text-sm font-semibold ${tint === "orange" ? "text-brand-orange" : "text-brand-yellow"} hover:gap-3 transition-all`}
                >
                  READ MORE
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}

          {/* Highlights list - right column */}
          <div
            data-svc-card
            style={{ transitionDelay: "200ms" }}
            className="bg-zinc-50 rounded-2xl p-8 flex flex-col justify-center"
          >
            <div className="space-y-6">
              {highlights.map(({ title, desc }, i) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-yellow/20 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-brand-yellow" />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900">{title}</h4>
                    <p className="text-sm text-zinc-600">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom services row */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map(({ title, body, icon: Icon, href, tint }, i) => (
            <article
              key={title}
              data-svc-card
              style={{ transitionDelay: `${(i + 3) * 80}ms` }}
              className="group relative p-6 rounded-2xl bg-white border border-zinc-100 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Triangle decoration - Marize style */}
              <div className={`absolute top-0 right-0 w-0 h-0 border-t-[40px] border-r-[40px] border-t-transparent ${tint === "orange" ? "border-r-brand-orange/20" : "border-r-brand-yellow/20"}`} />
              
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl ${tint === "orange" ? "bg-brand-orange/10" : "bg-brand-yellow/10"} flex items-center justify-center mb-5`}>
                <Icon className={`w-7 h-7 ${tint === "orange" ? "text-brand-orange" : "text-brand-yellow"}`} />
              </div>

              <h3 className="text-lg font-bold mb-2">{title}</h3>
              <p className="text-zinc-600 text-sm leading-relaxed mb-4 line-clamp-3">{body}</p>

              {/* Yellow underline accent */}
              <div className={`w-12 h-0.5 ${tint === "orange" ? "bg-brand-orange" : "bg-brand-yellow"} mb-4 transition-all group-hover:w-20`} />

              <Link
                href={href}
                className={`inline-flex items-center gap-2 text-sm font-semibold ${tint === "orange" ? "text-brand-orange" : "text-brand-yellow"} group-hover:gap-3 transition-all`}
              >
                Learn More
                <ArrowRight className="w-4 h-4" />
              </Link>
            </article>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <Link
            href="/solutions"
            className="inline-flex items-center gap-3 px-8 py-4 bg-brand-yellow text-zinc-900 font-bold rounded-lg transition-all hover:shadow-lg hover:scale-[1.02]"
          >
            View All Solutions
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
