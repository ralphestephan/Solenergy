// components/CTAPremium.tsx
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";

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

export default function CTAPremium() {
  const { ref, show } = useInView<HTMLDivElement>();

  return (
    <section className="py-0 relative overflow-hidden">
      {/* Yellow/Dark split section - like cost calculator in reference */}
      <div className="grid lg:grid-cols-2">
        {/* Left: Yellow CTA section */}
        <div className="bg-brand-yellow px-8 py-16 lg:py-24 lg:px-12 relative">
          {/* Decorative diagonal stripes */}
          <div className="absolute top-0 right-0 w-32 h-full opacity-10 overflow-hidden">
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(
                -45deg,
                transparent,
                transparent 8px,
                rgba(0,0,0,0.3) 8px,
                rgba(0,0,0,0.3) 16px
              )`
            }} />
          </div>

          <div
            ref={ref}
            className={[
              "relative z-10 max-w-lg",
              "transition-all duration-700",
              show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            ].join(" ")}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900 mb-4">
              GET A FREE QUOTE
            </h2>
            <div className="w-16 h-1 bg-zinc-900 mb-6" />
            <p className="text-zinc-800 text-lg mb-8">
              Ready to power your future? Get a personalized quote for solar installation, 
              generator services, or complete energy management solutions.
            </p>

            {/* Contact info */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-zinc-900/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-zinc-900" />
                </div>
                <div>
                  <div className="text-sm text-zinc-700">Call Us</div>
                  <a href="tel:+96171654956" className="font-bold text-zinc-900 hover:underline">
                    +961 71 654 956
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-zinc-900/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-zinc-900" />
                </div>
                <div>
                  <div className="text-sm text-zinc-700">Email</div>
                  <a href="mailto:solenergysarl@gmail.com" className="font-bold text-zinc-900 hover:underline">
                    solenergysarl@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-zinc-900/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-zinc-900" />
                </div>
                <div>
                  <div className="text-sm text-zinc-700">Location</div>
                  <div className="flex flex-col">
                    <span className="font-bold text-zinc-900">Galaxy Mall, Baabda, Mount Lebanon</span>
                    <span className="font-bold text-zinc-900 text-sm">Doha, Qatar</span>
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-zinc-900 text-white font-bold rounded-lg transition-all hover:bg-zinc-800 hover:shadow-lg hover:scale-[1.02]"
            >
              Request Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Right: Dark section with image/stats */}
        <div className="bg-zinc-800 px-8 py-16 lg:py-24 lg:px-12 relative overflow-hidden">
          {/* Background image overlay */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "url('/images/field.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 via-zinc-800/95 to-zinc-900" />

          <div
            className={[
              "relative z-10",
              "transition-all duration-700 delay-200",
              show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            ].join(" ")}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
              WHY <span className="text-brand-yellow">CHOOSE US?</span>
            </h3>
            <div className="w-16 h-1 bg-brand-yellow mb-8" />

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { stat: "30", label: "Years Experience" },
                { stat: "50+", label: "MW Installed" },
                { stat: "1kW-1MW", label: "Project Range" },
                { stat: "24/7", label: "Support Available" },
              ].map(({ stat, label }) => (
                <div key={label} className="p-6 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-3xl font-extrabold text-brand-yellow mb-1">{stat}</div>
                  <div className="text-white/70 text-sm">{label}</div>
                </div>
              ))}
            </div>

            {/* Features list */}
            <div className="mt-8 space-y-3">
              {[
                "Certified Installation Experts",
                "Premium Quality Equipment",
                "Comprehensive Warranties",
                "After-Sales Support",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-brand-yellow" />
                  <span className="text-white/80 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
