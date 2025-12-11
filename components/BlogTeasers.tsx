"use client";

import Image from "next/image";
import Link from "next/link";
import { Leaf, PawPrint, Sun } from "lucide-react";
import { insights } from "@/data/insights";
import DynamicUnderline from "@/components/ui/DynamicUnderline";

function FallbackArt({ which }: { which: "garden" | "pet" | "summer" }) {
  const map = {
    garden: { Icon: Leaf, from: "from-brand-green/30", to: "to-brand-blue/20" },
    pet: { Icon: PawPrint, from: "from-brand-blue/30", to: "to-brand-green/20" },
    summer: { Icon: Sun, from: "from-amber-300/40", to: "to-brand-blue/20" },
  } as const;
  const { Icon, from, to } = map[which];
  return (
    <div className={`absolute inset-0 bg-gradient-to-br ${from} ${to} grid place-items-center`}>
      <Icon className="w-16 h-16 opacity-70" />
    </div>
  );
}

export default function BlogTeasers() {
  const latest = [...insights]
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, 3);

  return (
    <section id="blog-teasers" className="py-16 relative">
      {/* soft background wash with faded edges */}
      <div
        className="absolute inset-0 -z-10 gradient-multi opacity-5"
        style={{
          WebkitMaskImage:
            "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.9) 10%, rgba(0,0,0,.9) 90%, rgba(0,0,0,0) 100%)",
          maskImage:
            "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.9) 10%, rgba(0,0,0,.9) 90%, rgba(0,0,0,0) 100%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-4">
        {/* Title row with "See all" */}
        <div className="relative mb-10 flex items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-xs font-medium relative">
              Insights
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight relative">
              <span className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">
                Intelligent living
              </span>
            </h2>
            <div className="mt-3">
              <DynamicUnderline watch="#blog-teasers" align="left" widthClass="w-20" height={4} />
            </div>
            <p className="mt-2 text-zinc-600">
              Fresh insights from the Solenergy team—expert guidance on solar and energy solutions.
            </p>
          </div>

          <Link
            href="/insights"
            className="shrink-0 inline-flex items-center gap-2 rounded-full btn btn-outline border border-zinc-200 px-4 py-2 text-sm font-semibold hover:bg-zinc-50 transition"
            aria-label="See all insights"
          >
            See all <span aria-hidden>→</span>
          </Link>
        </div>

        {/* Cards */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 auto-rows-fr">
          {latest.map((p, idx) => {
            const fallbackKey = (["garden", "pet", "summer"] as const)[idx % 3];
            const tag = p.tags?.[0] ?? "Insight";
            const read = `${p.readMins} min read`;

            return (
              <article
                key={p.slug}
                className="group h-full flex flex-col overflow-hidden rounded-card bg-white border border-zinc-100 shadow-soft hover:shadow-lg transition"
              >
                {/* Thumbnail */}
                <Link href={`/insights/${p.slug}`} className="relative aspect-[16/10] w-full overflow-hidden">
                  <div className="absolute inset-0 gradient-brand opacity-20 pointer-events-none" />
                  {p.cover ? (
                    <Image
                      src={p.cover}
                      alt={p.coverAlt || p.title}
                      fill
                      sizes="(min-width:1024px) 420px, (min-width:768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      priority={false}
                    />
                  ) : (
                    <FallbackArt which={fallbackKey} />
                  )}
                  <span className="absolute left-3 top-3 inline-flex items-center px-2.5 py-1 rounded-full bg-white/90 text-xs font-medium shadow-sm">
                    {tag}
                  </span>
                </Link>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-semibold leading-snug line-clamp-3">
                    <Link href={`/insights/${p.slug}`} className="hover:underline">
                      {p.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm text-zinc-600 line-clamp-3">{p.excerpt}</p>

                  {/* Footer with Read button */}
                  <div className="mt-auto pt-4 flex items-center justify-between text-sm">
                    <span className="text-zinc-500">{read}</span>
                    <Link
                      href={`/insights/${p.slug}`}
                      className="inline-flex items-center gap-1 rounded-full bg-zinc-100 hover:bg-zinc-200 px-3 py-1.5 font-semibold text-brand-blue transition"
                      aria-label={`Read ${p.title}`}
                    >
                      Read <span aria-hidden>→</span>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
