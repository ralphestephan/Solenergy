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
import InsightPageClient from "@/components/InsightPageClient";

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

      {/* Client Component handles layout & language switching */}
      <InsightPageClient post={post} related={related} />
    </main>
  );
}
