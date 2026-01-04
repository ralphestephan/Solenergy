// components/ServicesPremium.tsx
"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Sun, Zap, Cloud, ArrowRight } from "lucide-react";

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

export default function ServicesPremium() {
  const { ref, show } = useInView<HTMLElement>();

  return (
    <section ref={ref} className="py-24 md:py-32 relative bg-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-yellow/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div
          className={[
            "text-center mb-16 md:mb-20",
            "transition-all duration-700",
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          ].join(" ")}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-yellow/10 text-brand-yellow text-sm font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse" />
            <span>OUR SERVICES</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            WELCOME TO{" "}
            <span className="text-brand-yellow">SOLENERGY</span>
          </h2>
          
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-24 h-1 bg-brand-yellow rounded-full" />
            <div className="w-4 h-1 bg-brand-orange rounded-full" />
          </div>
          
          <p className="text-xl md:text-2xl text-zinc-600 max-w-3xl mx-auto leading-relaxed">
            Energy independence is no longer optional. It&apos;s a strategic advantage. 
            Welcome to Solenergy, your complete Energy Solutions.
          </p>
        </div>

        {/* Main Services Grid - Enhanced Design */}
        <div
          className={[
            "grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16",
            "transition-all duration-700 delay-200",
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          ].join(" ")}
        >
          {services.map(({ title, body, href, image, tint, icon: Icon }, i) => (
            <article
              key={title}
              className="group relative overflow-hidden rounded-2xl bg-white border-2 border-zinc-100 shadow-lg hover:shadow-2xl hover:border-brand-yellow/50 transition-all duration-500 hover:-translate-y-2"
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {/* Image Section with Overlay */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-zinc-900/40 to-transparent" />
                
                {/* Icon Badge - Top Left */}
                <div className={`absolute top-4 left-4 w-14 h-14 rounded-xl ${tint === "orange" ? "bg-brand-orange" : "bg-brand-yellow"} flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-7 h-7 text-zinc-900" />
                </div>

                {/* Accent Bar - Bottom */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 ${tint === "orange" ? "bg-brand-orange" : "bg-brand-yellow"}`} />
              </div>

              {/* Content Section */}
              <div className="p-6 md:p-8">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-brand-yellow transition-colors">
                  {title}
                </h3>
                
                <p className="text-zinc-600 text-base leading-relaxed mb-6">
                  {body}
                </p>

                {/* CTA Link */}
                <Link
                  href={href}
                  className={`inline-flex items-center gap-2 text-sm font-bold ${tint === "orange" ? "text-brand-orange" : "text-brand-yellow"} hover:gap-3 transition-all group/link`}
                >
                  <span>READ MORE</span>
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Decorative Triangle - Bottom Right */}
              <div className={`absolute bottom-0 right-0 w-0 h-0 border-b-[40px] border-r-[40px] border-b-transparent ${tint === "orange" ? "border-r-brand-orange/10" : "border-r-brand-yellow/10"}`} />
            </article>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div
          className={[
            "text-center pt-8 border-t border-zinc-200",
            "transition-all duration-700 delay-400",
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          ].join(" ")}
        >
          <p className="text-zinc-600 text-lg mb-6">
            Ready to transform your energy infrastructure?
          </p>
          <Link
            href="/solutions"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-brand-yellow text-zinc-900 font-bold text-lg rounded-xl transition-all hover:bg-brand-orange hover:shadow-xl hover:scale-105"
          >
            <span>View All Solutions</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
