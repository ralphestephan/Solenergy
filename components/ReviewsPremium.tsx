// components/ReviewsPremium.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

type ReviewItem = {
  quote: string;
  author: string;
  role: string;
  avatar?: string;
  initials: string;
  rating: number;
};

const REVIEWS: ReviewItem[] = [
  {
    quote: "Our electricity bills dropped by 70% after installing the hybrid solar system. The 24/7 monitoring gives us complete peace of mind.",
    author: "Rami Takieddine",
    role: "CEO & Founder",
    initials: "RT",
    rating: 5,
  },
  {
    quote: "The Volvo Penta generator has been running flawlessly for months. Zero maintenance issues and incredibly reliable during power outages.",
    author: "Yasmin El Hajj",
    role: "Operations Manager",
    initials: "YE",
    rating: 5,
  },
  {
    quote: "Solenergy designed a 1.5 MW system for our factory. Production never stops and our carbon footprint is significantly reduced.",
    author: "Leila Saade",
    role: "Factory Director",
    initials: "LS",
    rating: 5,
  },
  {
    quote: "The hybrid setup seamlessly switches between solar, grid, and generator. We haven't experienced a single power interruption.",
    author: "Nadia Mansour",
    role: "Business Owner",
    initials: "NM",
    rating: 5,
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

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={16} className="text-brand-yellow fill-brand-yellow" />
      ))}
    </div>
  );
}

export default function ReviewsPremium() {
  const { ref, show } = useInView<HTMLElement>();
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => setActiveIndex((i) => (i + 1) % REVIEWS.length);
  const prevSlide = () => setActiveIndex((i) => (i - 1 + REVIEWS.length) % REVIEWS.length);

  // Auto-rotate
  useEffect(() => {
    const id = setInterval(nextSlide, 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section ref={ref} className="py-24 bg-zinc-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-brand-yellow/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-brand-orange/5 rounded-full blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header - Marize style */}
        <div
          className={[
            "text-center mb-16",
            "transition-all duration-700",
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          ].join(" ")}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            WORDS FOR{" "}
            <span className="text-brand-yellow">OUR CLIENTS</span>
          </h2>
          <div className="w-16 h-1 bg-brand-yellow mx-auto mt-4 mb-6" />
          <p className="text-zinc-600 max-w-2xl mx-auto text-lg">
            Hear what our valued customers have to say about their experience with Solenergy.
          </p>
        </div>

        {/* Reviews carousel */}
        <div
          className={[
            "relative max-w-4xl mx-auto",
            "transition-all duration-700 delay-200",
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          ].join(" ")}
        >
          {/* Navigation arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-16 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-zinc-600 hover:text-brand-yellow transition-colors"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-16 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-zinc-600 hover:text-brand-yellow transition-colors"
            aria-label="Next review"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Cards container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {REVIEWS.map((review, i) => (
                <div key={i} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-xl relative">
                    {/* Quote icon */}
                    <div className="absolute top-6 right-6 text-brand-yellow/20">
                      <Quote className="w-16 h-16" />
                    </div>

                    {/* Rating */}
                    <div className="mb-6">
                      <Stars count={review.rating} />
                    </div>

                    {/* Quote text */}
                    <blockquote className="text-lg lg:text-xl text-zinc-700 leading-relaxed mb-8 relative z-10">
                      &ldquo;{review.quote}&rdquo;
                    </blockquote>

                    {/* Author info */}
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-brand-yellow/10 flex items-center justify-center text-brand-yellow font-bold text-lg">
                        {review.initials}
                      </div>
                      <div>
                        <div className="font-bold text-zinc-900">{review.author}</div>
                        <div className="text-sm text-brand-yellow">{review.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={[
                  "w-3 h-3 rounded-full transition-all duration-300",
                  activeIndex === i
                    ? "bg-brand-yellow w-8"
                    : "bg-zinc-300 hover:bg-zinc-400",
                ].join(" ")}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Secondary review cards row */}
        <div
          className={[
            "grid md:grid-cols-2 gap-6 mt-16 max-w-4xl mx-auto",
            "transition-all duration-700 delay-400",
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          ].join(" ")}
        >
          {REVIEWS.slice(0, 2).map((review, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-6 border border-zinc-100 shadow-md"
            >
              <Stars count={review.rating} />
              <p className="text-zinc-600 text-sm mt-4 mb-4 line-clamp-3">
                &ldquo;{review.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-yellow/10 flex items-center justify-center text-brand-yellow font-semibold text-sm">
                  {review.initials}
                </div>
                <div>
                  <div className="font-semibold text-sm text-zinc-900">{review.author}</div>
                  <div className="text-xs text-brand-yellow">{review.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
