// app/insights/InsightsIndex.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  coverAlt: string;
  date: string;
  readMins: number;
  tags: string[];
};

const ALL = "All";

export default function InsightsIndex({ posts }: { posts: Post[] }) {
  // Build topics list from tags
  const topics = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return [ALL, ...Array.from(set).sort()];
  }, [posts]);

  const [active, setActive] = useState<string>(ALL);
  const gridRef = useRef<HTMLDivElement>(null);

  const [feature, ...rest] = posts;
  const visible = useMemo(() => {
    if (active === ALL) return rest;
    return rest.filter((p) => p.tags.includes(active));
  }, [rest, active]);

  const activate = (t: string) => {
    setActive(t);
    // Smooth-scroll to the grid after the state update paints
    requestAnimationFrame(() => {
      gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <>
      {/* HERO */}
      <section className="mt-10 mb-10 relative">
        <div className="absolute inset-0 -z-10 " />
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {/* Feature card */}
            <Link
              href={`/insights/${feature.slug}`}
              className="group relative overflow-hidden rounded-card bg-white border border-zinc-100 shadow-soft hover:shadow-lg transition"
            >
              <div className="relative aspect-[16/8] w-full">
                <Image
                  src={feature.cover}
                  alt={feature.coverAlt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 gradient-brand opacity-20" />
              </div>
              <div className="p-6">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-xs font-medium">
                  Featured
                </div>
                <h1 className="mt-3 text-3xl md:text-4xl font-extrabold leading-tight">
                  <span className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">
                    {feature.title}
                  </span>
                </h1>
                <p className="mt-2 text-zinc-700 max-w-2xl">{feature.excerpt}</p>
                <div className="mt-3 text-sm text-zinc-500">
                  {new Date(feature.date).toLocaleDateString()} • {feature.readMins} min read
                </div>
              </div>
            </Link>

            {/* Topics + editor’s picks */}
            <div className="rounded-card bg-white border border-zinc-100 shadow-soft p-6 flex flex-col">
              <div>
                <div className="text-sm font-semibold text-zinc-700">Browse by topic</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {topics.map((t) => {
                    const isActive = t === active;
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => activate(t)}
                        aria-pressed={isActive}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition
                          ${isActive ? "bg-brand-blue/10 text-brand-blue" : "bg-zinc-100 hover:bg-zinc-200"}`}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6">
                <div className="text-sm font-semibold text-zinc-700 mb-2">Editor’s picks</div>
                <ul className="space-y-3">
                  {rest.slice(0, 3).map((p) => (
                    <li key={p.slug} className="flex items-start gap-3">
                      <div className="relative w-16 h-12 rounded-md overflow-hidden border border-zinc-200">
                        <Image src={p.cover} alt={p.coverAlt} fill className="object-cover" />
                      </div>
                      <div>
                        <Link href={`/insights/${p.slug}`} className="font-medium hover:underline">
                          {p.title}
                        </Link>
                        <div className="text-xs text-zinc-500">
                          {p.readMins} min • {new Date(p.date).toLocaleDateString()}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto pt-6 text-sm text-zinc-600">
                New to smart living? Start with{" "}
                <Link href={`/insights/${rest[0].slug}`} className="text-brand-blue font-semibold hover:underline">
                  {rest[0].title}
                </Link>.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GRID filtered by active topic */}
      <section className="pb-16" ref={gridRef}>
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
            {visible.map((p) => (
              <Link
                key={p.slug}
                href={`/insights/${p.slug}`}
                className="group h-full flex flex-col overflow-hidden rounded-card bg-white border border-zinc-100 shadow-soft hover:shadow-lg transition"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={p.cover}
                    alt={p.coverAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 gradient-brand opacity-15" />
                  <span className="absolute left-3 top-3 inline-flex items-center px-2.5 py-1 rounded-full bg-white/90 text-xs font-medium shadow-sm">
                    {p.tags[0]}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-semibold leading-snug line-clamp-3">{p.title}</h3>
                  <p className="mt-1 text-sm text-zinc-600 line-clamp-2">{p.excerpt}</p>
                  <div className="mt-auto pt-4 flex items-center justify-between text-sm">
                    <span className="text-zinc-500">{p.readMins} min read</span>
                    <span className="text-brand-blue font-semibold">
                      Read <span aria-hidden>→</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
            {visible.length === 0 && (
              <div className="col-span-full text-center text-zinc-500">
                Nothing here yet for <strong>{active}</strong>.
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
