// app/solutions/[slug]/page.tsx
import { Metadata } from "next";
import { SITE } from "@/lib/site";
import SEOJsonLd from "@/components/SEOJsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import solutions, { type Solution, type SolutionTech } from "@/data/solutions";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTA from "@/components/CTA";
import CTAPremium from "@/components/CTAPremium";
import TrustSignals from "@/components/TrustSignals";

import {
  Zap, Sun, Battery, Wrench, Phone, TrendingUp, Package, Map, Layers, Hammer, BarChart3,
  Activity, Clock, GitBranch, Bell, Radio, Cog, Database, Shield, Cpu, Cloud, Gauge, 
  Smartphone, Droplet, CheckCircle, Award, Target, Leaf, DollarSign
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import DynamicUnderline from "@/components/ui/DynamicUnderline";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = solutions.find((x) => x.slug === slug);
  if (!s) return { title: "Solution" };
  
  const ogImage = new URL('/api/og', SITE.baseUrl);
  ogImage.searchParams.set('title', s.heading);
  ogImage.searchParams.set('description', s.description);
  ogImage.searchParams.set('type', 'solution');

  return {
    title: `${s.heading} | Solenergy`,
    description: s.description,
    alternates: { canonical: `/solutions/${s.slug}` },
    openGraph: {
      title: s.heading,
      description: s.description,
      url: `${SITE.baseUrl}/solutions/${s.slug}`,
      images: [{ url: ogImage.toString(), width: 1200, height: 630 }],
    },
    // twitter: { card: "summary_large_image", site: "@solenergy" }, // Disabled until further notice
  };
}

// Icon mapping for tech keys
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  "zap": Zap,
  "gauge": Gauge,
  "smartphone": Smartphone,
  "droplet": Droplet,
  "wrench": Wrench,
  "phone": Phone,
  "trending-up": TrendingUp,
  "package": Package,
  "map": Map,
  "layers": Layers,
  "hammer": Hammer,
  "bar-chart-3": BarChart3,
  "activity": Activity,
  "clock": Clock,
  "git-branch": GitBranch,
  "bell": Bell,
  "radio": Radio,
  "cog": Cog,
  "database": Database,
  "shield": Shield,
  "cpu": Cpu,
  "cloud": Cloud,
  "sun": Sun,
  "battery": Battery,
  "check-circle": CheckCircle,
};

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const s = solutions.find((x) => x.slug === slug);
  if (!s) return notFound();

  return (
    <main className="w-full overflow-x-clip">
      <SEOJsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": s.heading,
          "description": s.description,
          "brand": {
            "@type": "Brand",
            "name": SITE.brand
          },
          "provider": {
            "@type": "Organization",
            "name": SITE.org.legalName,
            "url": SITE.baseUrl
          },
          "image": s.image ? `${SITE.baseUrl}${s.image}` : undefined,
          "areaServed": "LB",
          "category": "Solar Energy & Power Solutions",
          "offers": {
            "@type": "Offer",
            "availability": "https://schema.org/InStock",
            "areaServed": "LB"
          }
        }}
      />

      {/* PREMIUM HERO */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          {s.image ? (
            <Image
              src={s.image}
              alt={s.heading}
              fill
              priority
              className="object-cover object-center"
            />
          ) : (
            <div className="w-full h-full bg-zinc-900" />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/95 via-zinc-900/85 to-zinc-900/60" />
        </div>

        {/* Triangle decorations */}
        <div className="absolute top-0 left-0 w-32 h-32 border-l-[32px] border-l-brand-yellow border-t-[32px] border-t-transparent border-r-[32px] border-r-transparent border-b-[32px] border-b-brand-yellow opacity-30" />
        <div className="absolute bottom-0 right-0 w-24 h-24 border-r-[24px] border-r-brand-orange border-b-[24px] border-b-transparent border-l-[24px] border-l-transparent border-t-[24px] border-t-brand-orange opacity-30" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-24">
          <Reveal className="max-w-3xl">
            <Breadcrumbs
              items={[
                { name: "Solutions", href: "/solutions" },
                { name: s.heading }
              ]}
            />

            <span className="inline-flex items-center px-4 py-2 rounded-full bg-brand-yellow/20 text-brand-yellow text-sm font-semibold mb-6">
              SOLUTION
            </span>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              <span className="text-white">{s.heading.split(' ').slice(0, -1).join(' ')} </span>
              <span className="text-brand-yellow">{s.heading.split(' ').slice(-1)}</span>
            </h1>

            <div className="mt-4 w-24 h-1 bg-brand-yellow rounded-full" />

            <p className="mt-6 text-xl text-zinc-300 max-w-[64ch]">{s.description}</p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contact" className="px-8 py-4 rounded-xl bg-brand-yellow text-zinc-900 font-bold text-lg hover:bg-brand-orange hover:shadow-lg transition-all">
                Get Free Consultation
              </Link>
              <Link href="/solutions" className="px-8 py-4 rounded-xl border-2 border-zinc-600 text-white font-bold text-lg hover:border-brand-yellow hover:text-brand-yellow transition-all">
                View All Solutions
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SOLUTION SNAPSHOT - Premium Style */}
      <section className="relative z-20 -mt-16 pb-16">
        <div className="mx-auto max-w-7xl px-4">
          <Reveal className="p-8 md:p-10 rounded-2xl bg-white border border-zinc-100 shadow-2xl">
            <div className="flex items-start justify-between gap-8 flex-col lg:flex-row">
              <div className="max-w-[56ch]">
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-brand-yellow/10 text-brand-yellow text-sm font-semibold">
                  SOLUTION SNAPSHOT
                </span>
                <h2 className="mt-4 text-2xl md:text-3xl font-extrabold text-zinc-900">
                  {s.heading} <span className="text-brand-yellow">at a glance</span>
                </h2>
                <div className="mt-3 w-20 h-1 bg-brand-yellow rounded-full" />
                <p className="mt-4 text-zinc-600 text-lg leading-relaxed">
                  {s.description}
                </p>
              </div>

              {/* stat band */}
              <div className="w-full lg:w-auto">
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { k: "Components", v: s.tech?.length || 0, icon: Package },
                    { k: "Setup", v: "Professional", icon: Wrench },
                    { k: "Support", v: "24/7", icon: Phone },
                  ].map(({ k, v, icon: Icon }) => (
                    <div key={k} className="rounded-xl bg-zinc-50 border border-zinc-200 p-4 text-center hover:border-brand-yellow/50 transition-colors">
                      <div className="w-12 h-12 rounded-xl bg-brand-yellow/10 text-brand-yellow inline-grid place-items-center mx-auto mb-2">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="text-xs uppercase tracking-wide text-zinc-500 font-medium">{k}</div>
                      <div className="text-lg font-bold text-zinc-900">{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Key highlights from the tech array */}
            {s.tech && s.tech.length > 0 && (
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {s.tech.slice(0, 6).map((tech) => {
                  const IconComponent = ICON_MAP[tech.icon] || CheckCircle;
                  return (
                    <div key={tech.key} className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 hover:border-brand-yellow/50 hover:bg-brand-yellow/5 transition-all group">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-brand-yellow/10 text-brand-yellow inline-grid place-items-center group-hover:bg-brand-yellow group-hover:text-zinc-900 transition-colors">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <span className="text-sm uppercase tracking-wide text-zinc-500 font-semibold">{tech.label}</span>
                      </div>
                      <p className="text-zinc-700">{tech.blurb}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* TECHNOLOGIES WE USE - Stack preview */}
      {s.tech && s.tech.length > 0 && (
        <section className="py-16 bg-zinc-50">
          <div className="mx-auto max-w-6xl px-4">
            <Reveal className="mb-8">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-200 text-xs font-medium text-zinc-600 mb-3">
                Stack preview
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-3">
                Technologies we use
              </h2>
              <p className="text-lg text-zinc-600 max-w-3xl">
                Typical devices, components and systems we deploy for this solution.
              </p>
            </Reveal>

            {/* Tech pills grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {s.tech.map((tech) => {
                const IconComponent = ICON_MAP[tech.icon] || CheckCircle;
                return (
                  <Reveal
                    key={tech.key}
                    as="div"
                    className="group"
                  >
                    <div className="flex items-center gap-2 px-4 py-3 rounded-full bg-white border border-zinc-200 hover:border-brand-yellow hover:shadow-md transition-all cursor-pointer">
                      <IconComponent className="w-5 h-5 text-zinc-700 group-hover:text-brand-yellow transition-colors flex-shrink-0" />
                      <span className="text-sm font-medium text-zinc-900 truncate">{tech.label}</span>
                    </div>
                  </Reveal>
                );
              })}
              
              {/* Specific technologies based on solution type */}
              {s.slug === "generators" && (
                <>
                  <Reveal as="div" className="group">
                    <div className="flex items-center gap-2 px-4 py-3 rounded-full bg-white border border-zinc-200 hover:border-brand-yellow hover:shadow-md transition-all cursor-pointer">
                      <Package className="w-5 h-5 text-zinc-700 group-hover:text-brand-yellow transition-colors flex-shrink-0" />
                      <span className="text-sm font-medium text-zinc-900 truncate">Volvo Penta</span>
                    </div>
                  </Reveal>
                  <Reveal as="div" className="group">
                    <div className="flex items-center gap-2 px-4 py-3 rounded-full bg-white border border-zinc-200 hover:border-brand-yellow hover:shadow-md transition-all cursor-pointer">
                      <Cog className="w-5 h-5 text-zinc-700 group-hover:text-brand-yellow transition-colors flex-shrink-0" />
                      <span className="text-sm font-medium text-zinc-900 truncate">Diesel engines</span>
                    </div>
                  </Reveal>
                  <Reveal as="div" className="group">
                    <div className="flex items-center gap-2 px-4 py-3 rounded-full bg-white border border-zinc-200 hover:border-brand-yellow hover:shadow-md transition-all cursor-pointer">
                      <Activity className="w-5 h-5 text-zinc-700 group-hover:text-brand-yellow transition-colors flex-shrink-0" />
                      <span className="text-sm font-medium text-zinc-900 truncate">SCADA systems</span>
                    </div>
                  </Reveal>
                </>
              )}
              
              {s.slug === "solar-services" && (
                <>
                  <Reveal as="div" className="group">
                    <div className="flex items-center gap-2 px-4 py-3 rounded-full bg-white border border-zinc-200 hover:border-brand-yellow hover:shadow-md transition-all cursor-pointer">
                      <Sun className="w-5 h-5 text-zinc-700 group-hover:text-brand-yellow transition-colors flex-shrink-0" />
                      <span className="text-sm font-medium text-zinc-900 truncate">Tier 1 panels</span>
                    </div>
                  </Reveal>
                  <Reveal as="div" className="group">
                    <div className="flex items-center gap-2 px-4 py-3 rounded-full bg-white border border-zinc-200 hover:border-brand-yellow hover:shadow-md transition-all cursor-pointer">
                      <Zap className="w-5 h-5 text-zinc-700 group-hover:text-brand-yellow transition-colors flex-shrink-0" />
                      <span className="text-sm font-medium text-zinc-900 truncate">Hybrid inverters</span>
                    </div>
                  </Reveal>
                  <Reveal as="div" className="group">
                    <div className="flex items-center gap-2 px-4 py-3 rounded-full bg-white border border-zinc-200 hover:border-brand-yellow hover:shadow-md transition-all cursor-pointer">
                      <Battery className="w-5 h-5 text-zinc-700 group-hover:text-brand-yellow transition-colors flex-shrink-0" />
                      <span className="text-sm font-medium text-zinc-900 truncate">Lithium batteries</span>
                    </div>
                  </Reveal>
                </>
              )}
              
              {s.slug === "energy-management" && (
                <>
                  <Reveal as="div" className="group">
                    <div className="flex items-center gap-2 px-4 py-3 rounded-full bg-white border border-zinc-200 hover:border-brand-yellow hover:shadow-md transition-all cursor-pointer">
                      <Cpu className="w-5 h-5 text-zinc-700 group-hover:text-brand-yellow transition-colors flex-shrink-0" />
                      <span className="text-sm font-medium text-zinc-900 truncate">IoT sensors</span>
                    </div>
                  </Reveal>
                  <Reveal as="div" className="group">
                    <div className="flex items-center gap-2 px-4 py-3 rounded-full bg-white border border-zinc-200 hover:border-brand-yellow hover:shadow-md transition-all cursor-pointer">
                      <Database className="w-5 h-5 text-zinc-700 group-hover:text-brand-yellow transition-colors flex-shrink-0" />
                      <span className="text-sm font-medium text-zinc-900 truncate">InfluxDB</span>
                    </div>
                  </Reveal>
                  <Reveal as="div" className="group">
                    <div className="flex items-center gap-2 px-4 py-3 rounded-full bg-white border border-zinc-200 hover:border-brand-yellow hover:shadow-md transition-all cursor-pointer">
                      <BarChart3 className="w-5 h-5 text-zinc-700 group-hover:text-brand-yellow transition-colors flex-shrink-0" />
                      <span className="text-sm font-medium text-zinc-900 truncate">Grafana</span>
                    </div>
                  </Reveal>
                </>
              )}
              
              {s.slug === "energy-management" && (
                <>
                  <Reveal as="div" className="group">
                    <div className="flex items-center gap-2 px-4 py-3 rounded-full bg-white border border-zinc-200 hover:border-brand-yellow hover:shadow-md transition-all cursor-pointer">
                      <Cpu className="w-5 h-5 text-zinc-700 group-hover:text-brand-yellow transition-colors flex-shrink-0" />
                      <span className="text-sm font-medium text-zinc-900 truncate">Machine learning</span>
                    </div>
                  </Reveal>
                  <Reveal as="div" className="group">
                    <div className="flex items-center gap-2 px-4 py-3 rounded-full bg-white border border-zinc-200 hover:border-brand-yellow hover:shadow-md transition-all cursor-pointer">
                      <Cloud className="w-5 h-5 text-zinc-700 group-hover:text-brand-yellow transition-colors flex-shrink-0" />
                      <span className="text-sm font-medium text-zinc-900 truncate">AWS IoT Core</span>
                    </div>
                  </Reveal>
                  <Reveal as="div" className="group">
                    <div className="flex items-center gap-2 px-4 py-3 rounded-full bg-white border border-zinc-200 hover:border-brand-yellow hover:shadow-md transition-all cursor-pointer">
                      <Database className="w-5 h-5 text-zinc-700 group-hover:text-brand-yellow transition-colors flex-shrink-0" />
                      <span className="text-sm font-medium text-zinc-900 truncate">TimescaleDB</span>
                    </div>
                  </Reveal>
                  <Reveal as="div" className="group">
                    <div className="flex items-center gap-2 px-4 py-3 rounded-full bg-white border border-zinc-200 hover:border-brand-yellow hover:shadow-md transition-all cursor-pointer">
                      <Activity className="w-5 h-5 text-zinc-700 group-hover:text-brand-yellow transition-colors flex-shrink-0" />
                      <span className="text-sm font-medium text-zinc-900 truncate">TensorFlow</span>
                    </div>
                  </Reveal>
                  <Reveal as="div" className="group">
                    <div className="flex items-center gap-2 px-4 py-3 rounded-full bg-white border border-zinc-200 hover:border-brand-yellow hover:shadow-md transition-all cursor-pointer">
                      <GitBranch className="w-5 h-5 text-zinc-700 group-hover:text-brand-yellow transition-colors flex-shrink-0" />
                      <span className="text-sm font-medium text-zinc-900 truncate">MQTT protocol</span>
                    </div>
                  </Reveal>
                </>
              )}
              
              {s.slug === "solar-services" && (
                <>
                  <Reveal as="div" className="group">
                    <div className="flex items-center gap-2 px-4 py-3 rounded-full bg-white border border-zinc-200 hover:border-brand-yellow hover:shadow-md transition-all cursor-pointer">
                      <Smartphone className="w-5 h-5 text-zinc-700 group-hover:text-brand-yellow transition-colors flex-shrink-0" />
                      <span className="text-sm font-medium text-zinc-900 truncate">Mobile apps</span>
                    </div>
                  </Reveal>
                  <Reveal as="div" className="group">
                    <div className="flex items-center gap-2 px-4 py-3 rounded-full bg-white border border-zinc-200 hover:border-brand-yellow hover:shadow-md transition-all cursor-pointer">
                      <Activity className="w-5 h-5 text-zinc-700 group-hover:text-brand-yellow transition-colors flex-shrink-0" />
                      <span className="text-sm font-medium text-zinc-900 truncate">AI prediction</span>
                    </div>
                  </Reveal>
                  <Reveal as="div" className="group">
                    <div className="flex items-center gap-2 px-4 py-3 rounded-full bg-white border border-zinc-200 hover:border-brand-yellow hover:shadow-md transition-all cursor-pointer">
                      <Bell className="w-5 h-5 text-zinc-700 group-hover:text-brand-yellow transition-colors flex-shrink-0" />
                      <span className="text-sm font-medium text-zinc-900 truncate">Push notifications</span>
                    </div>
                  </Reveal>
                </>
              )}
              
              {/* Common technologies for all solutions */}
              <Reveal as="div" className="group">
                <div className="flex items-center gap-2 px-4 py-3 rounded-full bg-white border border-zinc-200 hover:border-brand-yellow hover:shadow-md transition-all cursor-pointer">
                  <Smartphone className="w-5 h-5 text-zinc-700 group-hover:text-brand-yellow transition-colors flex-shrink-0" />
                  <span className="text-sm font-medium text-zinc-900 truncate">Real-time monitoring</span>
                </div>
              </Reveal>
              
              <Reveal as="div" className="group">
                <div className="flex items-center gap-2 px-4 py-3 rounded-full bg-white border border-zinc-200 hover:border-brand-yellow hover:shadow-md transition-all cursor-pointer">
                  <Cloud className="w-5 h-5 text-zinc-700 group-hover:text-brand-yellow transition-colors flex-shrink-0" />
                  <span className="text-sm font-medium text-zinc-900 truncate">Cloud backup</span>
                </div>
              </Reveal>
              
              <Reveal as="div" className="group">
                <div className="flex items-center gap-2 px-4 py-3 rounded-full bg-white border border-zinc-200 hover:border-brand-yellow hover:shadow-md transition-all cursor-pointer">
                  <Shield className="w-5 h-5 text-zinc-700 group-hover:text-brand-yellow transition-colors flex-shrink-0" />
                  <span className="text-sm font-medium text-zinc-900 truncate">Encrypted data</span>
                </div>
              </Reveal>
              
              <Reveal as="div" className="group">
                <div className="flex items-center gap-2 px-4 py-3 rounded-full bg-white border border-zinc-200 hover:border-brand-yellow hover:shadow-md transition-all cursor-pointer">
                  <Phone className="w-5 h-5 text-zinc-700 group-hover:text-brand-yellow transition-colors flex-shrink-0" />
                  <span className="text-sm font-medium text-zinc-900 truncate">24/7 support</span>
                </div>
              </Reveal>
              
              <Reveal as="div" className="group">
                <div className="flex items-center gap-2 px-4 py-3 rounded-full bg-white border border-zinc-200 hover:border-brand-yellow hover:shadow-md transition-all cursor-pointer">
                  <TrendingUp className="w-5 h-5 text-zinc-700 group-hover:text-brand-yellow transition-colors flex-shrink-0" />
                  <span className="text-sm font-medium text-zinc-900 truncate">Performance analytics</span>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* KEY BENEFITS - Premium Style */}
      <section className="py-20 bg-zinc-900 relative overflow-hidden">
        {/* Triangle decorations */}
        <div className="absolute top-0 left-0 w-40 h-40 border-l-[40px] border-l-brand-yellow border-t-[40px] border-t-transparent border-r-[40px] border-r-transparent border-b-[40px] border-b-brand-yellow opacity-20" />
        <div className="absolute bottom-0 right-0 w-40 h-40 border-r-[40px] border-r-brand-orange border-b-[40px] border-b-transparent border-l-[40px] border-l-transparent border-t-[40px] border-t-brand-orange opacity-20" />

        <div className="mx-auto max-w-7xl px-4 relative z-10">
          <Reveal className="text-center mb-14">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-brand-yellow/20 text-brand-yellow text-sm font-semibold mb-4">
              WHY CHOOSE THIS
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold">
              <span className="text-white">Key </span>
              <span className="text-brand-yellow">Benefits</span>
            </h2>
            <div className="mt-4 flex justify-center">
              <div className="w-24 h-1 bg-brand-yellow rounded-full" />
            </div>
            <p className="mt-6 text-lg text-zinc-400 max-w-2xl mx-auto">
              Proven benefits that deliver real value for Lebanese homes and businesses
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: DollarSign,
                title: "Cost Savings",
                desc: "Reduce energy bills by 60-90% with solar power and smart energy management"
              },
              {
                icon: Leaf,
                title: "Eco-Friendly",
                desc: "Clean renewable energy reducing carbon footprint and environmental impact"
              },
              {
                icon: Award,
                title: "Quality Assured",
                desc: "Premium components from trusted manufacturers with extended warranties"
              },
              {
                icon: Target,
                title: "Custom Fit",
                desc: "Tailored system design matching your exact energy needs and budget"
              },
            ].map((benefit, idx) => (
              <Reveal
                key={idx}
                as="div"
                className="group p-8 rounded-2xl bg-zinc-800/50 border border-zinc-700/50 hover:border-brand-yellow/50 hover:bg-zinc-800 transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 rounded-xl bg-brand-yellow text-zinc-900 inline-grid place-items-center mb-6 group-hover:scale-110 transition-transform">
                  <benefit.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                <p className="text-zinc-400">{benefit.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* IMPLEMENTATION PROCESS */}
      <section className="py-16 bg-gradient-to-br from-brand-yellow/5 to-brand-orange/5">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="bg-gradient-to-r from-brand-yellow to-brand-orange bg-clip-text text-transparent">
                How We Deliver
              </span>
            </h2>
            <p className="mt-4 text-lg text-zinc-600 max-w-2xl mx-auto">
              Our proven process ensures seamless installation and optimal performance
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Assessment & Design",
                desc: "Site evaluation, energy audit, and custom system design with ROI projections",
                icon: Map
              },
              {
                step: "02",
                title: "Installation & Setup",
                desc: "Professional installation by certified technicians with quality components",
                icon: Hammer
              },
              {
                step: "03",
                title: "Training & Support",
                desc: "Complete system training, monitoring setup, and ongoing maintenance support",
                icon: Phone
              },
            ].map((phase) => (
              <Reveal key={phase.step} as="div" className="relative">
                <div className="p-6 rounded-xl bg-white border border-zinc-200 shadow-soft hover:shadow-lg transition-shadow h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-yellow to-brand-orange flex items-center justify-center text-white font-bold text-lg">
                        {phase.step}
                      </div>
                    </div>
                    <div className="flex-1">
                      <phase.icon className="w-6 h-6 text-brand-yellow mb-2" />
                      <h3 className="font-bold text-zinc-900 text-lg">{phase.title}</h3>
                    </div>
                  </div>
                  <p className="text-zinc-600 pl-16">{phase.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT TO EXPECT & GETTING STARTED */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Reveal as="div" className="p-8 rounded-card bg-white border border-zinc-200 shadow-soft hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-br from-brand-yellow/10 to-brand-orange/10">
                  <CheckCircle className="w-6 h-6 text-brand-yellow" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900">What You Can Expect</h3>
              </div>
              <ul className="space-y-3 text-zinc-700">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 block h-2 w-2 rounded-full bg-brand-yellow flex-shrink-0" />
                  <span>Complete site assessment and energy audit</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 block h-2 w-2 rounded-full bg-brand-yellow flex-shrink-0" />
                  <span>Custom system design tailored to your needs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 block h-2 w-2 rounded-full bg-brand-yellow flex-shrink-0" />
                  <span>Professional installation by certified technicians</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 block h-2 w-2 rounded-full bg-brand-yellow flex-shrink-0" />
                  <span>Comprehensive testing and commissioning</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 block h-2 w-2 rounded-full bg-brand-yellow flex-shrink-0" />
                  <span>Training on system operation and monitoring</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 block h-2 w-2 rounded-full bg-brand-yellow flex-shrink-0" />
                  <span>Ongoing support and maintenance services</span>
                </li>
              </ul>
            </Reveal>

            <Reveal as="div" className="p-8 rounded-card bg-gradient-to-br from-brand-yellow/5 to-brand-orange/5 border border-brand-yellow/20 shadow-soft hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-lg bg-white">
                  <Sun className="w-6 h-6 text-brand-yellow" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900">Getting Started</h3>
              </div>
              <p className="text-zinc-700 mb-4">
                Ready to transform your energy infrastructure? Contact us for a free consultation and site assessment. We'll analyze your energy needs, evaluate your site, and provide a detailed proposal with ROI projections.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link 
                  href="/contact" 
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-brand-yellow to-brand-orange text-white font-semibold text-center hover:shadow-lg transition-shadow"
                >
                  Schedule Consultation
                </Link>
                <Link 
                  href="/solutions" 
                  className="px-6 py-3 rounded-full border-2 border-brand-yellow text-brand-yellow font-semibold text-center hover:bg-brand-yellow/5 transition-colors"
                >
                  View All Solutions
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CTAPremium />
      <TrustSignals />
    </main>
  );
}
