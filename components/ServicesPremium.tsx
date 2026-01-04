// components/ServicesPremium.tsx
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Sun, Zap, Wrench, Cloud, ArrowRight } from "lucide-react";

const services = [
  {
    title: "Solar as a Service",
    body:
      "End-to-end solar solutions for homes, businesses, and industry. Designed, installed, monitored, and maintained—all in one model.",
    icon: Sun,
    href: "/solutions/solar-services",
    image: "/images/field.jpg",
    tint: "yellow" as const,
  },
  {
    title: "Smarter Backup Power",
    body:
      "Generators with intelligent switching and load management. Less fuel. Less downtime. More reliability.",
    icon: Zap,
    href: "/solutions/generators",
    image: "/images/volvoGENERATOR.png",
    tint: "orange" as const,
  },
  {
    title: "One Energy Dashboard",
    body:
      "With Sol4.o, solar, batteries, generators, and grid power come together in one real-time platform. Monitor. Optimize. Control.",
    icon: Cloud,
    href: "/solutions/energy-management",
    image: "/images/deyeESS.png",
    tint: "yellow" as const,
  },
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
            Energy independence is no longer optional. It&apos;s a strategic advantage. 
            Welcome to Solenergy, your complete Energy Solutions.
          </p>
        </div>

        {/* Main services grid - 3 services */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Service cards with images */}
          {services.map(({ title, body, href, image, tint, icon: Icon }, i) => (
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
                <div className={`w-12 h-12 rounded-xl ${tint === "orange" ? "bg-brand-orange/10" : "bg-brand-yellow/10"} flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${tint === "orange" ? "text-brand-orange" : "text-brand-yellow"}`} />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-brand-yellow transition-colors">
                  {title}
                </h3>
                <p className="text-zinc-600 text-sm leading-relaxed mb-4">
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
