"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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

export default function CTA() {
  const { ref, show } = useInView<HTMLDivElement>();

  return (
    <section className="py-20 relative">
      {/* background wash that fades at edges so it merges with other sections */}
      <div
        className="absolute inset-0 -z-10  opacity-10"
        style={{
          WebkitMaskImage:
            "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.9) 8%, rgba(0,0,0,.95) 92%, rgba(0,0,0,0) 100%)",
          maskImage:
            "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.9) 8%, rgba(0,0,0,.95) 92%, rgba(0,0,0,0) 100%)",
        }}
      />

      <div
        ref={ref}
        className={[
          "mx-auto max-w-6xl px-4",
          "reveal-base",
          show ? "reveal-in" : "",
        ].join(" ")}
      >
        <div className="rounded-card p-10 border border-zinc-100 shadow-soft bg-white relative overflow-hidden">
          {/* contained subtle wash */}
          <div className="absolute inset-0 gradient-multi opacity-10 pointer-events-none" />

          <div className="grid md:grid-cols-2 gap-6 items-center relative">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold">
                Begin your journey
              </h2>
              <p className="mt-2 text-zinc-600">
                Discover how smart living fits your home. Start with a free home automation consultation.
              </p>
            </div>

            <div className="flex gap-3 md:justify-end">
              <Link href="/solutions" className="btn-outline">
                Learn more
              </Link>
              <Link href="/contact" className="btn-primary">
                Book your free consultation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
