"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

// Project reel, cropped above the white logo strip the source carries along its
// bottom edge and cut down from a 4K master (~850 MB) to 1280x624. AV1 first
// (~21 MB) for browsers that decode it; H.264 (~33 MB) for everyone else.
const VIDEO = {
  av1: "/videos/hero.av1.mp4",
  h264: "/videos/hero.mp4",
  poster: "/videos/hero-poster.jpg",
} as const;

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

export default function HeroPremium() {
  const { ref, show } = useInView<HTMLDivElement>({ threshold: 0.15 });
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) {
      v.pause();
      return;
    }
    // <source> fallback only covers a file the browser refuses up front. One that
    // claims AV1 and then fails to decode it errors on the element and stays
    // blank, so drop to the H.264 file by hand.
    const toH264 = () => {
      if (!v.currentSrc.endsWith(VIDEO.av1)) return;
      v.src = VIDEO.h264;
      v.play().catch(() => {});
    };
    v.addEventListener("error", toH264);
    if (v.error) toH264();
    // React does not emit the `muted` attribute in server HTML, and iOS refuses
    // to autoplay a video it cannot see is muted -- set it and start playback here.
    v.muted = true;
    v.play().catch(() => {});
    return () => v.removeEventListener("error", toH264);
  }, []);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center overflow-hidden"
    >
      {/* Background video, unshaded */}
      <div className="absolute inset-0 bg-zinc-900">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover md:object-left"
          poster={VIDEO.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src={VIDEO.av1} type='video/mp4; codecs="av01.0.05M.08"' />
          <source src={VIDEO.h264} type="video/mp4" />
        </video>
      </div>

      {/* Content */}
      <div
        className={[
          "relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-20",
          // No shade over the footage, so the copy carries its own shadow to stay
          // legible on the bright frames (white rooftops, concrete).
          "[text-shadow:0_2px_14px_rgba(0,0,0,0.65),0_1px_3px_rgba(0,0,0,0.5)]",
          "transition-all duration-1000 delay-300",
          show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        ].join(" ")}
      >
        <div className="max-w-3xl">
          {/* Tag line */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse" />
            <span className="text-sm font-medium text-white/90">
              Powering Lebanon&apos;s Future
            </span>
          </div>

          {/* Main headline with split color */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-white mb-6">
            ENERGY SHOULDN&apos;T FAIL.{" "}
            <span className="text-brand-yellow">IT SHOULD THINK.</span>
          </h1>

          {/* Yellow accent line */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-1 bg-brand-yellow rounded-full" />
            <div className="w-4 h-1 bg-brand-orange rounded-full" />
          </div>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white max-w-2xl mb-10 leading-relaxed">
            At Solenergy, we build smart energy ecosystems—not just solar panels or generators. 
            Welcome to your complete Energy Solutions.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="/solutions"
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-brand-yellow text-zinc-900 font-bold rounded-lg overflow-hidden [text-shadow:none] transition-all duration-300 hover:shadow-[0_0_40px_rgba(244,180,26,0.4)] hover:scale-[1.02]"
            >
              <span className="relative z-10">Explore Solutions</span>
              <svg className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-black/25 backdrop-blur-sm text-white font-bold rounded-lg border-2 border-white/40 transition-all duration-300 hover:bg-white/10 hover:border-white/50"
            >
              Get Free Quote
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-brand-yellow/20 flex items-center justify-center">
                <span className="text-brand-yellow font-bold text-lg">30</span>
              </div>
              <div className="text-white/90 text-sm">
                <div className="font-semibold text-white">Years</div>
                Experience
              </div>
            </div>
            <div className="w-px h-10 bg-white/20 hidden sm:block" />
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-brand-yellow/20 flex items-center justify-center">
                <span className="text-brand-yellow font-bold text-lg">50+</span>
              </div>
              <div className="text-white/90 text-sm">
                <div className="font-semibold text-white">MW</div>
                Installed
              </div>
            </div>
            <div className="w-px h-10 bg-white/20 hidden sm:block" />
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-brand-yellow/20 flex items-center justify-center">
                <span className="text-brand-yellow font-bold text-lg">24/7</span>
              </div>
              <div className="text-white/90 text-sm">
                <div className="font-semibold text-white">Support</div>
                Available
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
