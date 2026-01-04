// components/WhyChooseUs.tsx
"use client";

import { useRef, useState, useEffect } from "react";
import { Shield, Clock, Award, Headphones, CheckCircle2, Zap, Sun, Settings } from "lucide-react";

const FEATURES = [
  {
    icon: Shield,
    title: "Certified Experts",
    desc: "Our technicians are certified and trained to handle complex installations.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    desc: "Round-the-clock technical support and emergency services.",
  },
  {
    icon: Award,
    title: "Premium Quality",
    desc: "We use only top-tier equipment from trusted global brands.",
  },
  {
    icon: Headphones,
    title: "Dedicated Service",
    desc: "Personalized attention for every project, big or small.",
  },
];

const HIGHLIGHTS = [
  { icon: Sun, text: "Solar Installation" },
  { icon: Zap, text: "Generator Services" },
  { icon: Settings, text: "Smart Automation" },
  { icon: CheckCircle2, text: "Maintenance Plans" },
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

export default function WhyChooseUs() {
  const { ref, show } = useInView<HTMLElement>();

  return (
    <section ref={ref} className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-brand-yellow/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-orange/5 rounded-full blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div
            className={[
              "transition-all duration-700",
              show ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8",
            ].join(" ")}
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              WHY{" "}
              <span className="text-brand-yellow">CHOOSE US?</span>
            </h2>
            <div className="w-16 h-1 bg-brand-yellow mb-6" />

            <p className="text-zinc-600 text-lg leading-relaxed mb-8">
              With 30 years of experience in the energy sector, Solenergy has established 
              itself as a trusted leader in solar energy, generators, and smart energy 
              management solutions across Lebanon and the GCC region. We've completed 50+ MW 
              of projects, ranging from 1kW to 1MW installations.
            </p>

            {/* Highlight pills */}
            <div className="flex flex-wrap gap-3 mb-10">
              {HIGHLIGHTS.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-yellow/10 text-zinc-800"
                >
                  <Icon className="w-4 h-4 text-brand-yellow" />
                  <span className="text-sm font-medium">{text}</span>
                </div>
              ))}
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: "30", label: "Years" },
                { value: "50+", label: "MW" },
                { value: "1kW-1MW", label: "Range" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center p-4 rounded-xl bg-zinc-50">
                  <div className="text-2xl font-extrabold text-brand-yellow">{value}</div>
                  <div className="text-sm text-zinc-600">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Feature cards grid - Marize style with triangles */}
          <div
            className={[
              "grid sm:grid-cols-2 gap-4",
              "transition-all duration-700 delay-200",
              show ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8",
            ].join(" ")}
          >
            {FEATURES.map(({ icon: Icon, title, desc }, i) => (
              <div
                key={title}
                className="group relative p-6 rounded-xl bg-white border border-zinc-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Decorative triangle - Marize style */}
                <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[30px] border-r-[30px] border-b-brand-yellow/20 border-r-transparent rotate-180" />

                {/* Icon with yellow background */}
                <div className="w-14 h-14 rounded-xl bg-brand-yellow/10 flex items-center justify-center mb-4 group-hover:bg-brand-yellow/20 transition-colors">
                  <Icon className="w-7 h-7 text-brand-yellow" />
                </div>

                <h3 className="font-bold text-lg mb-2">{title}</h3>
                <p className="text-zinc-600 text-sm leading-relaxed">{desc}</p>

                {/* Yellow accent line */}
                <div className="w-8 h-0.5 bg-brand-yellow mt-4 group-hover:w-12 transition-all" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
