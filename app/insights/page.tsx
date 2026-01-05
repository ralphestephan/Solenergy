// app/insights/page.tsx — SERVER component

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { insights } from "@/data/insights";
import SEOJsonLd from "@/components/SEOJsonLd";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "Industry Insights | Solenergy",
  description:
    "Expert insights on solar energy, generators, energy storage, and Industry 4.0 solutions for Lebanon's energy challenges.",
  alternates: { canonical: "/insights" },
  openGraph: {
    title: "Industry Insights by Solenergy",
    description:
      "Practical guides on solar systems, backup power, energy management, and sustainable solutions for Lebanese businesses and homes.",
    url: `${SITE.baseUrl}/insights`,
    images: [{ url: SITE.ogImage }],
  },
  // twitter: { card: "summary_large_image", site: "@solenergy" }, // Disabled until further notice
};

export default function Page() {
  // Get featured insight (first one)
  const featured = insights[0];
  const restInsights = insights.slice(1);

  return (
    <main className="w-full overflow-x-clip">
      {/* JSON-LD: Blog */}
      <SEOJsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Solenergy Industry Insights",
          url: `${SITE.baseUrl}/insights`,
          blogPost: insights.slice(0, 9).map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            datePublished: p.date,
            url: `${SITE.baseUrl}/insights/${p.slug}`,
            image: `${SITE.baseUrl}${p.cover}`,
            author: { "@type": "Organization", name: SITE.org.legalName },
            publisher: {
              "@type": "Organization",
              name: SITE.org.legalName,
              logo: { "@type": "ImageObject", url: `${SITE.baseUrl}${SITE.org.logo}` },
            },
            description: p.excerpt,
          })),
        }}
      />

      {/* PREMIUM HERO */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/panels.png"
            alt="Solar panels"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/95 via-zinc-900/85 to-zinc-900/75" />
        </div>

        {/* Triangle decorations */}
        <div className="absolute top-0 left-0 w-32 h-32 border-l-[32px] border-l-brand-yellow border-t-[32px] border-t-transparent border-r-[32px] border-r-transparent border-b-[32px] border-b-brand-yellow opacity-30" />
        <div className="absolute bottom-0 right-0 w-24 h-24 border-r-[24px] border-r-brand-orange border-b-[24px] border-b-transparent border-l-[24px] border-l-transparent border-t-[24px] border-t-brand-orange opacity-30" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 text-center">
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-brand-yellow/20 text-brand-yellow text-sm font-semibold mb-6">
            KNOWLEDGE CENTER
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            <span className="text-white">Industry </span>
            <span className="text-brand-yellow">Insights</span>
          </h1>
          <div className="mt-4 flex justify-center">
            <div className="w-24 h-1 bg-brand-yellow rounded-full" />
          </div>
          <p className="mt-6 text-xl text-zinc-300 max-w-2xl mx-auto">
            Expert guides on solar systems, generators, energy management, and smart solutions for Lebanon&apos;s energy independence.
          </p>
        </div>
      </section>

      {/* FEATURED ARTICLE */}
      <section className="relative z-20 -mt-16 pb-16">
        <div className="mx-auto max-w-7xl px-4">
          <Link href={`/insights/${featured.slug}`} className="group block">
            <div className="rounded-2xl overflow-hidden bg-white border border-zinc-100 shadow-2xl hover:shadow-3xl transition-all">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Image */}
                <div className="relative aspect-[16/10] lg:aspect-auto">
                  <Image
                    src={featured.cover}
                    alt={featured.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/50 to-transparent lg:hidden" />
                  <span className="absolute top-4 left-4 px-4 py-2 rounded-full bg-brand-yellow text-zinc-900 text-sm font-bold">
                    FEATURED
                  </span>
                </div>

                {/* Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {featured.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-brand-yellow/10 text-brand-yellow text-sm font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-zinc-900 group-hover:text-brand-yellow transition-colors">
                    {featured.title}
                  </h2>
                  <p className="mt-4 text-zinc-600 text-lg leading-relaxed line-clamp-3">
                    {featured.excerpt}
                  </p>
                  <div className="mt-6 flex items-center gap-6 text-sm text-zinc-500">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(featured.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {featured.readMins} min
                    </span>
                  </div>
                  <div className="mt-6">
                    <span className="inline-flex items-center gap-2 text-brand-yellow font-bold group-hover:gap-3 transition-all">
                      Read Article <ArrowRight className="w-5 h-5" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ALL INSIGHTS GRID */}
      <section className="py-20 bg-zinc-50">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-14">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-brand-yellow/10 text-brand-yellow text-sm font-semibold">
              ALL ARTICLES
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold">
              <span className="text-zinc-900">Latest </span>
              <span className="text-brand-yellow">Insights</span>
            </h2>
            <div className="mt-4 flex justify-center">
              <div className="w-20 h-1 bg-brand-yellow rounded-full" />
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-8">
            {restInsights.map((post) => (
              <Link key={post.slug} href={`/insights/${post.slug}`} className="group">
                <article className="h-full rounded-2xl overflow-hidden bg-white border border-zinc-100 shadow-lg hover:shadow-xl hover:border-brand-yellow/30 transition-all">
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.cover}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/30 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="px-2 py-1 rounded-full bg-zinc-100 text-zinc-600 text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-lg font-bold text-zinc-900 group-hover:text-brand-yellow transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-zinc-600 text-sm line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center justify-between text-sm">
                      <span className="text-zinc-500 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                      <span className="text-brand-yellow font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Mobile: Staggered/Masonry Layout */}
          <div className="lg:hidden columns-2 gap-4">
            {restInsights.map((post, index) => (
              <Link key={post.slug} href={`/insights/${post.slug}`} className="group mb-4 break-inside-avoid">
                <article className="h-full rounded-2xl overflow-hidden bg-white border border-zinc-100 shadow-lg">
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.cover}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/30 to-transparent" />
                    <span className="absolute left-3 top-3 inline-flex items-center px-2 py-1 rounded-full bg-white/90 text-xs font-medium">
                      {post.tags[0]}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-base font-bold text-zinc-900 group-hover:text-brand-yellow transition-colors line-clamp-2 mb-2">
                      {post.title}
                    </h3>
                    <p className="text-zinc-600 text-xs line-clamp-2 mb-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                      <span className="text-brand-yellow font-semibold flex items-center gap-1">
                        Read <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 bg-zinc-900 relative overflow-hidden">
        {/* Triangle decorations */}
        <div className="absolute top-0 right-0 w-40 h-40 border-r-[40px] border-r-brand-yellow border-t-[40px] border-t-transparent border-l-[40px] border-l-transparent border-b-[40px] border-b-brand-yellow opacity-20" />
        
        <div className="mx-auto max-w-4xl px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-extrabold">
            <span className="text-white">Have Questions About </span>
            <span className="text-brand-yellow">Solar Energy?</span>
          </h2>
          <p className="mt-4 text-lg text-zinc-400 max-w-2xl mx-auto">
            Our team of solar experts is ready to answer your questions and help you find the perfect energy solution.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-xl bg-brand-yellow text-zinc-900 font-bold text-lg hover:bg-brand-orange hover:shadow-lg transition-all flex items-center gap-2"
            >
              Contact Our Experts <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/faqs"
              className="px-8 py-4 rounded-xl border-2 border-zinc-700 text-white font-bold text-lg hover:border-brand-yellow hover:text-brand-yellow transition-all"
            >
              Browse FAQs
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
