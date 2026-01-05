// app/insights/[slug]/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { insights } from "@/data/insights";
import SEOJsonLd from "@/components/SEOJsonLd";
import { SITE } from "@/lib/site";
import Reveal from "@/components/ui/Reveal";
import { Calendar, Clock, ArrowRight, ArrowLeft, BookOpen } from "lucide-react";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return insights.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = insights.find((p) => p.slug === slug);
  if (!post) return { title: "Insight" };
  
  const ogImage = new URL('/api/og', SITE.baseUrl);
  ogImage.searchParams.set('title', post.title);
  ogImage.searchParams.set('description', post.excerpt);
  ogImage.searchParams.set('type', 'insight');

  return {
    title: `${post.title} | Solenergy Insights`,
    description: post.excerpt,
    alternates: { canonical: `/insights/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${SITE.baseUrl}/insights/${post.slug}`,
      images: [{ url: ogImage.toString(), width: 1200, height: 630 }],
    },
    // twitter: { card: "summary_large_image", site: "@solenergy" }, // Disabled until further notice
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = insights.find((p) => p.slug === slug);
  if (!post) return notFound();

  const related = insights
    .filter((p) => p.slug !== post.slug && p.tags[0] === post.tags[0])
    .slice(0, 3);

  // Build takeaways:
  const firstWithBullets = post.sections.find((s) => s.bullets && s.bullets.length > 0);
  const takeaways =
    firstWithBullets?.bullets?.slice(0, 4) ??
    post.sections.slice(0, 4).map((s) => s.heading);

  return (
    <main className="w-full overflow-x-clip">
      {/* JSON-LD (BlogPosting) */}
      <SEOJsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          datePublished: post.date,
          url: `${SITE.baseUrl}/insights/${post.slug}`,
          image: `${SITE.baseUrl}${post.cover}`,
          author: { "@type": "Organization", name: SITE.org.legalName },
          publisher: {
            "@type": "Organization",
            name: SITE.org.legalName,
            logo: { "@type": "ImageObject", url: `${SITE.baseUrl}${SITE.org.logo}` },
          },
          description: post.excerpt,
        }}
      />

      {/* PREMIUM HERO */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={post.cover}
            alt={post.coverAlt}
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/95 via-zinc-900/85 to-zinc-900/60" />
        </div>

        {/* Triangle decorations */}
        <div className="absolute top-0 left-0 w-32 h-32 border-l-[32px] border-l-brand-yellow border-t-[32px] border-t-transparent border-r-[32px] border-r-transparent border-b-[32px] border-b-brand-yellow opacity-30" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-24">
          <Reveal className="max-w-4xl">
            {/* Breadcrumb */}
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Insights
            </Link>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span key={tag} className="px-4 py-2 rounded-full bg-brand-yellow/20 text-brand-yellow text-sm font-semibold">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {post.title}
            </h1>

            <div className="mt-4 w-24 h-1 bg-brand-yellow rounded-full" />

            <p className="mt-6 text-xl text-zinc-300 max-w-3xl">
              {"intro" in post && (post as any).intro ? (post as any).intro : post.excerpt}
            </p>

            {/* Meta info */}
            <div className="mt-6 flex flex-wrap items-center gap-6 text-zinc-400">
              <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-brand-yellow" />
                {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-brand-yellow" />
                {post.readMins} min read
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Article column */}
            <div className="lg:col-span-8 space-y-10">
              {/* Key Takeaways */}
              <Reveal className="p-8 rounded-2xl bg-brand-yellow/5 border border-brand-yellow/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-yellow text-zinc-900 inline-grid place-items-center">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-bold text-zinc-900">Key Takeaways</h2>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {takeaways.map((t, i) => (
                    <li
                      key={`${t}-${i}`}
                      className="p-4 rounded-xl bg-white border border-zinc-200 shadow-sm text-zinc-700"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </Reveal>

              {/* Prose Content */}
              <article className="prose prose-lg max-w-none prose-headings:text-zinc-900 prose-headings:font-bold prose-p:text-zinc-700 prose-p:leading-relaxed prose-li:text-zinc-700">
                {post.sections.map((s) => (
                  <section key={s.id} id={s.id} className="scroll-mt-24 mb-10">
                    <h2 className="text-2xl font-bold text-zinc-900 mb-4 flex items-center gap-3">
                      <span className="w-1 h-8 bg-brand-yellow rounded-full" />
                      {s.heading}
                    </h2>

                    {s.paras.map((p, i) => (
                      <p key={i} className="mb-4">{p}</p>
                    ))}

                    {s.bullets && (
                      <ul className="space-y-2 my-6">
                        {s.bullets.map((b, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="w-2 h-2 mt-2.5 rounded-full bg-brand-yellow flex-shrink-0" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {s.note && (
                      <div className="rounded-xl p-5 bg-brand-yellow/10 border border-brand-yellow/20 my-6">
                        <strong className="text-brand-yellow">Note:</strong>
                        <p className="mt-2 text-zinc-700">{s.note}</p>
                      </div>
                    )}
                  </section>
                ))}
              </article>

              {/* FAQ Section */}
              {post.faq && post.faq.length > 0 && (
                <Reveal className="p-8 rounded-2xl bg-zinc-50 border border-zinc-200">
                  <h2 className="text-2xl font-bold text-zinc-900 mb-6">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {post.faq.map((f, i) => (
                      <details
                        key={i}
                        className="group rounded-xl border border-zinc-200 bg-white overflow-hidden"
                      >
                        <summary className="px-6 py-4 font-semibold cursor-pointer list-none text-zinc-900 hover:text-brand-yellow transition-colors flex items-center justify-between">
                          {f.q}
                          <ArrowRight className="w-5 h-5 transform group-open:rotate-90 transition-transform" />
                        </summary>
                        <div className="px-6 pb-4 text-zinc-600">{f.a}</div>
                      </details>
                    ))}
                  </div>
                </Reveal>
              )}
            </div>

            {/* Sidebar column */}
            <aside className="lg:col-span-4 space-y-6 h-fit lg:sticky lg:top-24">
              {/* Table of Contents */}
              <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-lg">
                <h3 className="text-lg font-bold text-zinc-900 mb-4">On This Page</h3>
                <div className="w-12 h-1 bg-brand-yellow rounded-full mb-4" />
                <nav className="space-y-2">
                  {post.sections.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className="block py-2 px-3 rounded-lg text-zinc-600 hover:bg-brand-yellow/10 hover:text-brand-yellow transition-colors"
                    >
                      {s.heading}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Related Articles */}
              {related.length > 0 && (
                <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-lg">
                  <h3 className="text-lg font-bold text-zinc-900 mb-4">Related Articles</h3>
                  <div className="w-12 h-1 bg-brand-yellow rounded-full mb-4" />
                  <div className="space-y-4">
                    {related.map((p) => (
                      <Link key={p.slug} href={`/insights/${p.slug}`} className="group flex items-start gap-4">
                        <div className="relative w-20 h-14 rounded-lg overflow-hidden border border-zinc-200 flex-shrink-0">
                          <Image src={p.cover} alt={p.coverAlt} fill className="object-cover group-hover:scale-105 transition-transform" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-zinc-900 group-hover:text-brand-yellow transition-colors line-clamp-2">
                            {p.title}
                          </h4>
                          <p className="text-sm text-zinc-500 mt-1">{p.readMins} min read</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Card */}
              <div className="p-6 rounded-2xl bg-zinc-900 text-white">
                <h3 className="text-lg font-bold mb-2">Need Solar Advice?</h3>
                <p className="text-sm text-zinc-400 mb-4">
                  Our experts are ready to help you find the perfect energy solution.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-brand-yellow text-zinc-900 font-bold hover:bg-brand-orange transition-colors"
                >
                  Get Free Consultation <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-20 bg-brand-yellow">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900">
            Ready to Start Your Solar Journey?
          </h2>
          <p className="mt-4 text-lg text-zinc-800 max-w-2xl mx-auto">
            Get a free consultation and discover how solar energy can reduce your electricity costs.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-xl bg-zinc-900 text-white font-bold text-lg hover:bg-zinc-800 transition-all flex items-center gap-2"
            >
              Contact Us <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/insights"
              className="px-8 py-4 rounded-xl bg-white text-zinc-900 font-bold text-lg hover:shadow-lg transition-all"
            >
              More Insights
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
