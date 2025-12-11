// components/Reviews.tsx
"use client";

import { useEffect, useMemo, useRef, useState, KeyboardEvent } from "react";
import { Star, CheckCircle2, Quote, Newspaper, ChevronLeft, ChevronRight } from "lucide-react";
import DynamicUnderline from "@/components/ui/DynamicUnderline";

/* =========================
   Types & Data
========================= */
type ReviewCategory = "Solar Systems" | "Generators" | "Energy Management";

type ReviewItem =
  | { type: "press"; quote: string; source: string }
  | {
      type: "review";
      quote: string;
      author: string;
      avatar?: string; // headshot (optional)
      initials: string; // fallback if no avatar
      category: ReviewCategory;
    };

// Real names + headshots (swap with your files in /public/avatars/*)
const REVIEWS: ReviewItem[] = [
  { type: "review", category: "Solar Systems", quote: "Our electricity bills dropped by 70% after installing the hybrid solar system. The 24/7 monitoring gives us complete peace of mind.", author: "Rami Takieddine", avatar: "/avatars/rami.jpg", initials: "RT" },
  { type: "review", category: "Generators", quote: "The Volvo Penta generator has been running flawlessly for months. Zero maintenance issues and incredibly reliable during power outages.", author: "Yasmin El Hajj", avatar: "/avatars/yasmin.jpg", initials: "YE" },
  { type: "review", category: "Solar Systems", quote: "Solenergy designed a 1.5 MW system for our factory. Production never stops and our carbon footprint is significantly reduced.", author: "Leila Saade", avatar: "/avatars/leila.jpg", initials: "LS" },
  { type: "review", category: "Energy Management", quote: "The hybrid setup seamlessly switches between solar, grid, and generator. We haven't experienced a single power interruption.", author: "Nadia Mansour", avatar: "/avatars/nadia.jpg", initials: "NM" },
  { type: "review", category: "Solar Systems", quote: "From consultation to installation, the team was professional and thorough. Our hotel now runs on clean, sustainable energy.", author: "Omar Abou Khalil", avatar: "/avatars/omar.jpg", initials: "OA" },
  { type: "review", category: "Generators", quote: "The synchronized distribution system ensures stable power across all our facilities. Solenergy's technical expertise is unmatched.", author: "Maya Karam", avatar: "/avatars/maya.jpg", initials: "MK" },
  { type: "review", category: "Energy Management", quote: "Real-time monitoring and automated load management have optimized our energy consumption. The ROI exceeded expectations.", author: "Noor Haddad", avatar: "/avatars/noor.jpg", initials: "NH" },
  { type: "review", category: "Solar Systems", quote: "The Energy Storage Solutions keep us powered through the night. Independence from the grid has transformed our operations.", author: "Hassan Rahme", avatar: "/avatars/hassan.jpg", initials: "HR" },
  { type: "press", quote: "Solenergy delivers reliable, sustainable energy solutions with professionalism and expertise that sets them apart in the renewable energy sector.", source: "Energy Industry Magazine" },
  { type: "press", quote: "With over 30 years of combined experience, Solenergy stands as a trusted leader in solar energy and generator solutions across Lebanon and the GCC.", source: "Middle East Energy Review" },
];

/* =========================
   UI bits
========================= */
function Stars({ size = 16 }: { size?: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} className="text-amber-500" strokeWidth={1.5} fill="currentColor" />
      ))}
    </div>
  );
}
function initialsFrom(name: string) {
  const parts = name.trim().split(/\s+/);
  return (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "");
}
function Avatar({
  initials,
  alt,
  badgeClass,
}: {
  initials?: string;
  alt: string;
  badgeClass: string;
}) {
  const text = (initials && initials.trim()) || initialsFrom(alt).toUpperCase();
  return (
    <div
      className={[
        "h-10 w-10 grid place-items-center rounded-full text-sm font-semibold ring-1 ring-zinc-200",
        badgeClass,
      ].join(" ")}
    >
      {text}
    </div>
  );
}

/* =========================
   Auto-rotate for press
========================= */
function useAutoRotate(enabled: boolean, length: number, delay = 4200) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (!enabled || length <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % length), delay);
    return () => clearInterval(id);
  }, [enabled, length, delay]);
  return [index, setIndex] as const;
}

/* =========================
   Scroll-in effect
========================= */
function useInView<T extends HTMLElement>(opts: IntersectionObserverInit = { threshold: 0.12 }) {
  const ref = useRef<T | null>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (prefersReduced) {
      setShow(true);
      return;
    }

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setShow(true);
    }, opts);

    io.observe(el);
    return () => io.disconnect();
  }, [opts]);

  return { ref, show } as const;
}

/* =========================
   Mobile carousel (auto, compact, spaced)
========================= */
function MobileReviewsCarousel({
  reviews,
  intervalMs = 3800,
}: {
  reviews: Extract<ReviewItem, { type: "review" }>[];
  intervalMs?: number;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!reviews.length) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % reviews.length), intervalMs);
    return () => clearInterval(id);
  }, [reviews.length, intervalMs]);

  const themeFor = (c: ReviewCategory) =>
    ({
      "Solar Systems": { chip: "bg-amber-50 text-amber-700", badge: "bg-amber-100 text-amber-700" },
      "Generators": { chip: "bg-orange-50 text-orange-700", badge: "bg-orange-100 text-orange-700" },
      "Energy Management": { chip: "bg-emerald-50 text-emerald-700", badge: "bg-emerald-100 text-emerald-700" },
    } as Record<ReviewCategory, { chip: string; badge: string }>)[c];

  return (
    <div className="sm:hidden mt-6">
      {/* Edge padding + spacing between slides without showing partials */}
      <div className="overflow-hidden px-3">
        <div
          className="flex transition-transform duration-600 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {reviews.map((r, i) => {
            const theme = themeFor(r.category);
            return (
              <div className="min-w-full px-1.5" key={i}>
                <figure className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <Stars />
                    <Quote className="text-zinc-400" size={18} aria-hidden />
                  </div>
                  <blockquote className="mt-3 text-zinc-800 leading-relaxed text-[15px]">
                    “{r.quote}”
                  </blockquote>
                  <figcaption className="mt-4 flex items-center gap-3">
                    <Avatar initials={r.initials} alt={r.author} badgeClass={theme.badge} />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-zinc-900 truncate">{r.author}</p>
                      <span
                        className={`mt-0.5 inline-flex items-center px-2 py-0.5 rounded-full text-[11px] ${theme.chip}`}
                      >
                        {r.category}
                      </span>
                    </div>
                  </figcaption>
                </figure>
              </div>
            );
          })}
        </div>
      </div>

      {/* dots */}
      <div className="mt-3 flex justify-center gap-1.5">
        {reviews.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-4 bg-zinc-800" : "w-2 bg-zinc-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* =========================
   Component
========================= */
export default function Reviews({
  plain = true,
  silverPress = true,
  className = "",
}: {
  plain?: boolean;
  silverPress?: boolean;
  className?: string;
}) {
  const isReview = (r: ReviewItem): r is Extract<ReviewItem, { type: "review" }> => r.type === "review";
  const isPress = (r: ReviewItem): r is Extract<ReviewItem, { type: "press" }> => r.type === "press";

  const reviews = useMemo(() => REVIEWS.filter(isReview), []);
  const press = useMemo(() => REVIEWS.filter(isPress), []);

  // light deterministic shuffle
  const shuffled = useMemo(() => {
    const arr = [...reviews];
    for (let i = arr.length - 1; i > 0; i--) {
      const seed = Math.abs(Math.sin(i * 9301 + 49297)) % 1;
      const j = Math.floor(seed * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [reviews]);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  const [pressIndex, setPressIndex] = useAutoRotate(!prefersReduced, press.length, 4200);
  const { ref: listRef, show } = useInView<HTMLDivElement>();

  const catClasses: Record<ReviewCategory, { ring: string; chip: string; badge: string }> = {
    "Solar Systems": { ring: "ring-amber-200", chip: "bg-amber-50 text-amber-700", badge: "bg-amber-100 text-amber-700" },
    "Generators": { ring: "ring-orange-200", chip: "bg-orange-50 text-orange-700", badge: "bg-orange-100 text-orange-700" },
    "Energy Management": { ring: "ring-emerald-200", chip: "bg-emerald-50 text-emerald-700", badge: "bg-emerald-100 text-emerald-700" },
  };

  const onPressKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") setPressIndex((i) => (i - 1 + press.length) % press.length);
    if (e.key === "ArrowRight") setPressIndex((i) => (i + 1) % press.length);
  };

  return (
    <section className={`py-16 relative ${className}`}>
      {!plain && (
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-blue/[0.06] via-brand-green/[0.06] to-transparent"
          style={{
            WebkitMaskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
            maskImage: "linear-gradient(to bottom, transparent, black 10%, transparent 90%, transparent)",
          }}
        />
      )}

      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
          <div>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-xs font-medium">
              Testimonials
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-brand-yellow to-brand-orange bg-clip-text text-transparent">
                Trusted by leading businesses
              </span>
            </h2>
            <p className="mt-2 text-zinc-700">
              Real results from solar installations, generator deployments, and energy management systems.
            </p>
            <div className="mt-3">
              <DynamicUnderline watch=".reviews-title" align="left" widthClass="w-20" height={4} />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="rounded-2xl border border-zinc-200 bg-white/70 px-4 py-3 backdrop-blur">
              <div className="flex items-center gap-2">
                <Stars size={18} />
                <span className="text-sm font-semibold text-zinc-800">4.9 / 5</span>
              </div>
              <p className="text-xs text-zinc-600 mt-1 flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Verified clients
              </p>
            </div>
          </div>
        </div>

        {/* Desktop / tablet grid */}
        <div
          ref={listRef}
          className={[
            "hidden sm:grid gap-6 sm:grid-cols-2 lg:grid-cols-3 transition-all duration-700",
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
          ].join(" ")}
        >
          {shuffled.map((r, i) => {
            const theme = catClasses[r.category];
            return (
              <figure
                key={i}
                className={[
                  "rounded-2xl border border-zinc-100 bg-white p-6 shadow-soft ring-1",
                  theme.ring,
                  "hover:shadow-lg transition-[box-shadow,transform] duration-300",
                ].join(" ")}
              >
                <div className="flex items-center justify-between">
                  <Stars />
                  <Quote className="text-zinc-400" size={18} aria-hidden />
                </div>

                <blockquote className="mt-4 text-zinc-800 leading-relaxed">“{r.quote}”</blockquote>

                <figcaption className="mt-5 flex items-center gap-3">
                  <Avatar initials={r.initials} alt={r.author} badgeClass={theme.badge} />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-zinc-900 truncate">{r.author}</p>
                    <span
                      className={`mt-0.5 inline-flex items-center px-2 py-0.5 rounded-full text-[11px] ${theme.chip}`}
                    >
                      {r.category}
                    </span>
                  </div>
                </figcaption>
              </figure>
            );
          })}
        </div>

        {/* Mobile-only carousel (now ABOVE press) */}
        <MobileReviewsCarousel reviews={shuffled} />

        {/* Press — silver panel */}
        {silverPress && press.length > 0 && (
          <div
            className="relative mt-8 rounded-2xl border border-zinc-200 bg-gradient-to-br from-zinc-50 to-zinc-100 text-zinc-800 p-6 shadow-soft overflow-hidden"
            role="region"
            aria-label="Press reviews"
            onKeyDown={onPressKey}
            tabIndex={0}
          >
            <div className="flex items-center gap-2">
              <Newspaper className="h-5 w-5 text-zinc-500" />
              <p className="text-sm font-semibold">What the press says</p>
            </div>

            <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
              <button
                onClick={() => setPressIndex((i) => (i - 1 + press.length) % press.length)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-300 bg-white/90 hover:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/50"
                aria-label="Previous quote"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setPressIndex((i) => (i + 1) % press.length)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-300 bg-white/90 hover:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/50"
                aria-label="Next quote"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="relative mt-3 h-28 sm:h-24 overflow-hidden">
              {press.map((p, i) => (
                <figure
                  key={i}
                  className={`absolute inset-0 grid place-items-center text-center px-6 transition-opacity duration-700 ${i === pressIndex ? "opacity-100" : "opacity-0"}`}
                >
                  <blockquote className="text-lg md:text-xl leading-relaxed max-w-4xl">
                    “{p.quote}”
                  </blockquote>
                  <figcaption className="mt-3 text-xs tracking-wide text-zinc-600">{p.source}</figcaption>
                </figure>
              ))}
            </div>

            <div className="mt-3 flex items-center justify-center gap-2">
              {press.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPressIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${i === pressIndex ? "w-6 bg-zinc-700" : "w-3 bg-zinc-400 hover:bg-zinc-500"}`}
                  aria-label={`Show press quote ${i + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
