// app/portfolio/[slug]/page.tsx
import { Metadata } from "next";
import { SITE } from "@/lib/site";
import SEOJsonLd from "@/components/SEOJsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { projects, type Project } from "@/data/projects";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Zap, Calendar, Building2, CheckCircle } from "lucide-react";
import CTAPremium from "@/components/CTAPremium";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((x) => x.slug === slug);
  if (!project) return { title: "Project" };
  
  return {
    title: `${project.title} | Solenergy Portfolio`,
    description: project.description,
    alternates: { canonical: `/portfolio/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.description,
      url: `${SITE.baseUrl}/portfolio/${project.slug}`,
      images: [{ url: project.image, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", site: "@solenergy" },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((x) => x.slug === slug);
  if (!project) return notFound();

  return (
    <main className="w-full overflow-x-clip">
      <SEOJsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Project",
          "name": project.title,
          "description": project.description,
          "image": project.image,
        }}
      />

      {/* Breadcrumbs */}
      <div className="bg-zinc-50 border-b border-zinc-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-4">
          <Breadcrumbs
            items={[
              { name: "Portfolio", href: "/portfolio" },
              { name: project.title },
            ]}
          />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/95 via-zinc-900/80 to-zinc-900/70" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-24 text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-white/80 hover:text-brand-yellow transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Portfolio</span>
          </Link>
          
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-yellow/20 text-brand-yellow text-sm font-semibold mb-6">
            {project.category}
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            <span className="text-white">{project.title}</span>
          </h1>
          
          <div className="mt-6 flex justify-center">
            <div className="w-24 h-1 bg-brand-yellow rounded-full" />
          </div>
          
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-white/80">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-brand-yellow" />
              <span className="font-semibold">{project.capacity}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-brand-yellow" />
              <span>{project.location}</span>
            </div>
            {project.year && (
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-brand-yellow" />
                <span>{project.year}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-zinc-900 mb-6">Project Overview</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-zinc-600 text-lg leading-relaxed mb-6">
                  {project.fullDescription || project.description}
                </p>
              </div>

              {project.features && project.features.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-2xl font-bold text-zinc-900 mb-6">Key Features</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {project.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-zinc-50 border border-zinc-100">
                        <CheckCircle className="w-5 h-5 text-brand-yellow flex-shrink-0 mt-0.5" />
                        <span className="text-zinc-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200">
                  <h3 className="text-xl font-bold text-zinc-900 mb-4">Project Details</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-zinc-500 mb-1">Category</div>
                      <div className="font-semibold text-zinc-900">{project.category}</div>
                    </div>
                    <div>
                      <div className="text-sm text-zinc-500 mb-1">Capacity</div>
                      <div className="font-semibold text-zinc-900">{project.capacity}</div>
                    </div>
                    <div>
                      <div className="text-sm text-zinc-500 mb-1">Location</div>
                      <div className="font-semibold text-zinc-900">{project.location}</div>
                    </div>
                    {project.client && (
                      <div>
                        <div className="text-sm text-zinc-500 mb-1">Client</div>
                        <div className="font-semibold text-zinc-900">{project.client}</div>
                      </div>
                    )}
                    {project.year && (
                      <div>
                        <div className="text-sm text-zinc-500 mb-1">Year</div>
                        <div className="font-semibold text-zinc-900">{project.year}</div>
                      </div>
                    )}
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="block w-full px-6 py-4 bg-brand-yellow text-zinc-900 font-bold rounded-xl hover:bg-brand-orange hover:shadow-lg transition-all text-center"
                >
                  Start Your Project
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTAPremium />
    </main>
  );
}

