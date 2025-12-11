"use client";

import { ClipboardList, Cog, Wrench, Headset } from "lucide-react";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import DynamicUnderline from "@/components/ui/DynamicUnderline";

// helper: observe intersection for reveal
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

export default function Process() {
  const steps = [
    {
      title: "Consultation & Assessment",
      body: "We evaluate your energy needs, site conditions, and goals to design the optimal solution for your facility.",
      cta: { label: "Start consultation", href: "/contact" },
      icon: ClipboardList,
    },
    {
      title: "System Design",
      body: "Custom engineering of solar arrays, generator systems, or energy management platforms tailored to your requirements.",
      cta: { label: "Explore solutions", href: "/solutions" },
      icon: Cog,
    },
    {
      title: "Professional Installation",
      body: "Certified technicians install and commission your system with minimal disruption to your operations.",
      cta: { label: "See our projects", href: "/solutions" },
      icon: Wrench,
    },
    {
      title: "Ongoing Support",
      body: "24/7 monitoring, preventive maintenance, and rapid response support to keep your system running optimally.",
      cta: { label: "Get support", href: "/contact" },
      icon: Headset,
    },
  ];

  const { ref, show } = useInView<HTMLDivElement>({ threshold: 0.15 });

  return (
    <section
      id="process"
      className="py-16 relative overflow-hidden"
      ref={ref}
    >
      {/* soft background wash that fades near edges */}
      <div
        className="absolute inset-0 -z-10 gradient-multi opacity-5 "
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
          maskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
        }}
      />

      <div className="mx-auto max-w-6xl px-4">
        {/* Title row */}
        <div className="relative mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 process-title">
          {/* accent glows */}
          <div className="pointer-events-none absolute -top-10 -left-10 w-40 h-40 rounded-full bg-brand-yellow/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-brand-orange/10 blur-3xl" />

          <div>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-xs font-medium">
              Process
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-brand-yellow to-brand-orange bg-clip-text text-transparent">
                How we work
              </span>
            </h2>
            <p className="mt-2 text-zinc-600">
              From initial consultation to ongoing support—clear steps, professional execution.
            </p>
            <div className="mt-3">
              <DynamicUnderline watch=".process-title" align="left" widthClass="w-20" height={4} />
            </div>
          </div>

          <Link href="/solutions" className="btn btn-outline">
            See solutions <span aria-hidden >→</span>
          </Link>
        </div>

        {/* Steps grid */}
        <div
          className={[
            "mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-700",
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          ].join(" ")}
        >
          {steps.map((s, i) => {
            const tint = i % 2 === 0 ? "brand-yellow" : "brand-orange";
            const Chip = s.icon;
            return (
              <article
                key={i}
                className="group relative flex flex-col p-6 rounded-card shadow-soft bg-white border border-zinc-100 hover:shadow-lg transition"
              >
                <div
                  className={`pointer-events-none absolute -top-10 -right-10 w-28 h-28 rounded-full ${
                    tint === "brand-yellow" ? "bg-brand-yellow/10" : "bg-brand-orange/10"
                  } blur-2xl`}
                />
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      tint === "brand-yellow"
                        ? "bg-brand-yellow/10 text-brand-yellow"
                        : "bg-brand-orange/10 text-brand-orange"
                    }`}
                  >
                    <Chip className="w-5 h-5" aria-hidden />
                  </div>
                  <div
                    className={`text-sm font-semibold ${
                      tint === "brand-yellow" ? "text-brand-yellow" : "text-brand-orange"
                    }`}
                  >
                    Step {i + 1}
                  </div>
                </div>

                <h3 className="text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-zinc-600 leading-6">{s.body}</p>

                <Link
                  href={s.cta.href}
                  className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-brand-yellow hover:text-brand-orange transition-colors"
                >
                  {s.cta.label}
                  <span
                    aria-hidden
                    className="transition-transform group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
