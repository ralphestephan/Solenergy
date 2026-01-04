// app/solutions/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SolutionsGrid from "@/components/SolutionsGrid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle, Sun, Zap, Battery, Factory, Settings,
  TrendingUp, Shield, Clock, Leaf, Wrench, Cloud, ArrowRight
} from "lucide-react";

import CTAPremium from "@/components/CTAPremium";
import TrustSignals from "@/components/TrustSignals";
import Process from "@/components/Process";
import solutions from "@/data/solutions";

import SEOJsonLd from "@/components/SEOJsonLd";
import { SITE } from "@/lib/site";
import Reveal from "@/components/ui/Reveal";
import DynamicUnderline from "@/components/ui/DynamicUnderline";

export const metadata: Metadata = {
  title: "Solar Energy & Generator Solutions | Solenergy Lebanon",
  description:
    "Complete solar energy systems, backup generators, energy management, and Industry 4.0 solutions. Reliable power solutions for Lebanon's energy challenges.",
  alternates: { canonical: "/solutions" },
  openGraph: {
    title: "Solar Energy & Generator Solutions | Solenergy Lebanon",
    description:
      "Transform your energy infrastructure with hybrid solar systems, Volvo Penta generators, energy storage solutions, and smart energy management.",
    url: `${SITE.baseUrl}/solutions`,
    images: [{ url: SITE.ogImage }],
  },
  twitter: { card: "summary_large_image", site: "@solenergy" },
  other: {
    keywords: "solar energy Lebanon, hybrid solar systems, Volvo Penta generators, energy storage, Industry 4.0, energy management, backup power, renewable energy",
  },
};

function Bullet({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2">
      <CheckCircle className="h-5 w-5 text-brand-yellow shrink-0 mt-0.5" />
      <span className="text-zinc-700">{text}</span>
    </li>
  );
}

type Tone = "yellow" | "orange";

/** Split card (copy + image) - Premium style */
function SplitCard({
  label, title, desc, items, img, imgAlt, tone = "yellow",
}: {
  label: string; title: string; desc: string; items: string[];
  img: string; imgAlt?: string; tone?: Tone;
}) {
  return (
    <div className="rounded-2xl overflow-hidden bg-white border border-zinc-100 shadow-xl">
      <div className="grid grid-cols-1 lg:grid-cols-5 relative z-10">
        {/* Left: copy */}
        <div className="lg:col-span-3 p-8 md:p-10">
          <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${tone === "orange" ? "bg-brand-orange/10 text-brand-orange" : "bg-brand-yellow/10 text-brand-yellow"}`}>
            {label}
          </span>
          <h3 className="mt-4 text-2xl font-bold">{title}</h3>
          <div className={`w-12 h-0.5 ${tone === "orange" ? "bg-brand-orange" : "bg-brand-yellow"} my-4`} />
          <p className="text-zinc-600 leading-relaxed">{desc}</p>

          <ul className="mt-6 grid sm:grid-cols-2 gap-3">
            {items.map((t) => <Bullet key={t} text={t} />)}
          </ul>

          <Link href="/contact" className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-brand-yellow text-zinc-900 font-bold rounded-lg hover:shadow-lg transition-all">
            Get a quote <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Right: image */}
        <div className="lg:col-span-2 relative bg-zinc-50">
          <div className="relative w-full aspect-[16/11] md:aspect-[4/3] lg:aspect-auto lg:h-full">
            <Image
              src={img} alt={imgAlt ?? title} fill
              sizes="(min-width:1024px) 40vw, 100vw"
              className="object-cover object-center"
            />
            <div className={`absolute inset-0 ${tone === "orange" ? "bg-brand-orange/10" : "bg-brand-yellow/10"} pointer-events-none`} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <main className="w-full overflow-x-clip">
      {/* JSON-LD */}
      <SEOJsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Solar Energy & Generator Solutions",
          description: "Professional solar energy systems, backup generators, energy storage, and energy management solutions for Lebanon.",
          url: `${SITE.baseUrl}/solutions`,
          hasPart: solutions.map((s) => ({
            "@type": "Service",
            name: s.heading,
            url: `${SITE.baseUrl}/solutions/${s.slug}`,
            description: s.description,
            provider: { "@type": "Organization", name: SITE.org.legalName, url: SITE.baseUrl },
            category: "Solar Energy & Generator Solutions",
            keywords: "solar energy, generators, energy storage, hybrid systems"
          })),
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE.baseUrl },
              { "@type": "ListItem", position: 2, name: "Solutions", item: `${SITE.baseUrl}/solutions` },
            ],
          },
        }}
      />

      {/* PREMIUM HERO - Dark overlay style */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/panels.png"
            alt="Solenergy solar panel installation"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/90 via-zinc-900/70 to-zinc-900/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 via-transparent to-zinc-900/30" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse" />
              <span className="text-sm font-medium text-white/90">Comprehensive Energy Solutions</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tight text-white mb-6">
              POWERING LEBANON&apos;S <span className="text-brand-yellow">FUTURE</span>
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-1 bg-brand-yellow rounded-full" />
              <div className="w-4 h-1 bg-brand-orange rounded-full" />
            </div>

            <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-10 leading-relaxed">
              From solar installations to backup generators and smart energy management—we deliver
              reliable, cost-effective power solutions tailored to Lebanon&apos;s unique energy challenges.
            </p>

            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-brand-yellow text-zinc-900 font-bold rounded-lg transition-all duration-300 hover:shadow-[0_0_40px_rgba(244,180,26,0.4)] hover:scale-[1.02]"
            >
              Get Started <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* POPULAR SOLUTIONS */}
      <section className="py-20 bg-zinc-50">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-14">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-brand-yellow/10 text-brand-yellow text-sm font-semibold">
              OUR SOLUTIONS
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold">
              <span className="text-zinc-900">Popular </span>
              <span className="text-brand-yellow">Solutions</span>
            </h2>
            <div className="mt-4 flex justify-center">
              <div className="w-20 h-1 bg-brand-yellow rounded-full" />
            </div>
            <p className="mt-6 text-zinc-600 max-w-2xl mx-auto">
              Explore our most requested energy solutions for homes, businesses, and industrial facilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.slice(0, 6).map((solution) => (
              <Link key={solution.slug} href={`/solutions/${solution.slug}`} className="group">
                <article className="h-full rounded-2xl overflow-hidden bg-white border border-zinc-100 shadow-lg hover:shadow-xl hover:border-brand-yellow/30 transition-all">
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={solution.image}
                      alt={solution.heading}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/30 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-zinc-900 group-hover:text-brand-yellow transition-colors line-clamp-2 mb-3">
                      {solution.heading}
                    </h3>
                    <p className="text-zinc-600 text-sm line-clamp-3 mb-4">
                      {solution.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 text-brand-yellow font-semibold group-hover:gap-3 transition-all text-sm">
                        Learn More
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <Link
              href="/solutions"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-yellow text-zinc-900 font-bold rounded-xl hover:bg-brand-orange hover:shadow-lg transition-all"
            >
              View All Solutions
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICE CATEGORIES */}
      <section className="py-24 relative bg-zinc-50">
        <Reveal>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
                SPECIALIZED <span className="text-brand-yellow">SOLUTIONS</span>
              </h2>
              <div className="w-16 h-1 bg-brand-yellow mx-auto mt-4 mb-6" />
              <p className="text-zinc-600 max-w-2xl mx-auto">
                Focused solutions for every energy need—solar, generators, maintenance, and our smart SaaS platform.
              </p>
            </div>

            <Tabs defaultValue="solar" className="w-full">
              <div className="flex justify-center mb-10">
                <TabsList className="rounded-2xl bg-white border border-zinc-200 p-2 inline-flex shadow-lg">
                  {[
                    { v: "solar", label: "Solar Systems", Icon: Sun },
                    { v: "generators", label: "Generators", Icon: Zap },
                    { v: "maintenance", label: "Maintenance", Icon: Wrench },
                    { v: "saas", label: "Sol4.o Platform", Icon: Cloud },
                  ].map(({ v, label, Icon }) => (
                    <TabsTrigger
                      key={v}
                      value={v}
                      className="
                        rounded-xl px-6 py-3 flex items-center gap-2 transition-all font-medium
                        hover:bg-zinc-50 data-[state=active]:bg-brand-yellow data-[state=active]:text-zinc-900 data-[state=active]:shadow-md
                        focus-visible:ring-2 focus-visible:ring-brand-yellow/40
                      "
                    >
                      <Icon className="w-4 h-4" /> {label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <TabsContent value="solar" className="motion-safe:animate-tabIn-slow">
                <SplitCard
                  label="Solar Power Systems"
                  title="Hybrid Solar Solutions"
                  desc="Complete photovoltaic systems with battery storage and intelligent grid management for reliable 24/7 power."
                  img="/images/panels.png"
                  items={[
                    "Tier-1 solar panels with 25-year warranty",
                    "Hybrid inverters with MPPT technology",
                    "Battery energy storage systems",
                    "Grid-tie and off-grid configurations",
                  ]}
                />
              </TabsContent>

              <TabsContent value="generators" className="motion-safe:animate-tabIn-slow">
                <SplitCard
                  label="Backup Power"
                  title="Volvo Penta Generators"
                  desc="Premium diesel generators from the official distributor Khonaysser Group—engineered for reliability and longevity."
                  img="/images/volvoGENERATOR.png"
                  tone="orange"
                  items={[
                    "20kVA to 2MVA capacity range",
                    "Automatic transfer switching",
                    "Sound-attenuated enclosures",
                    "Remote monitoring and control",
                  ]}
                />
              </TabsContent>

              <TabsContent value="maintenance" className="motion-safe:animate-tabIn-slow">
                <SplitCard
                  label="Maintenance Services"
                  title="24/7 Maintenance & Support"
                  desc="Comprehensive preventive maintenance and emergency support for generators, solar systems, and energy infrastructure."
                  img="/images/volvoGENERATOR.png"
                  items={[
                    "24/7 emergency response",
                    "Preventive maintenance schedules",
                    "Genuine parts and warranty",
                    "Expert technician teams",
                  ]}
                />
              </TabsContent>

              <TabsContent value="saas" className="motion-safe:animate-tabIn-slow">
                <SplitCard
                  label="Sol4.o Platform"
                  title="Smart Energy Management Platform"
                  desc="Real-time platform integrating solar, generators, and grid power with advanced monitoring, analytics, and intelligent automation."
                  img="/images/deyeESS.png"
                  tone="orange"
                  items={[
                    "Multi-source energy integration",
                    "Real-time monitoring & analytics",
                    "Predictive maintenance alerts",
                    "Mobile & web access anywhere",
                  ]}
                />
              </TabsContent>
            </Tabs>
          </div>
        </Reveal>
      </section>

      {/* WHY SOLENERGY - Premium Style */}
      <section className="py-20 relative overflow-hidden bg-zinc-900">
        {/* Triangle decorations */}
        <div className="absolute top-0 left-0 w-40 h-40 border-l-[40px] border-l-brand-yellow border-t-[40px] border-t-transparent border-r-[40px] border-r-transparent border-b-[40px] border-b-brand-yellow opacity-20" />
        <div className="absolute bottom-0 right-0 w-40 h-40 border-r-[40px] border-r-brand-yellow border-b-[40px] border-b-transparent border-l-[40px] border-l-transparent border-t-[40px] border-t-brand-yellow opacity-20" />
        
        <Reveal>
          <div className="mx-auto max-w-7xl px-4">
            <div className="text-center mb-14">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-brand-yellow/20 text-brand-yellow text-sm font-semibold">
                WHY CHOOSE US
              </span>
              <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight">
                <span className="text-white">Proven </span>
                <span className="text-brand-yellow">Excellence</span>
              </h2>
              <div className="mt-4 flex justify-center">
                <div className="w-24 h-1 bg-brand-yellow rounded-full" />
              </div>
              <p className="mt-6 text-zinc-400 max-w-2xl mx-auto text-lg">
                With decades of experience and hundreds of successful installations, we deliver reliable energy solutions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { Icon: Shield, title: "30 Years", subtitle: "Experience", desc: "Proven track record across Lebanon and GCC" },
                { Icon: Leaf, title: "50+ MW", subtitle: "Installed", desc: "Projects ranging from 1kW to 1MW capacity" },
                { Icon: Clock, title: "24/7", subtitle: "Support", desc: "Round-the-clock monitoring and maintenance" },
                { Icon: Settings, title: "Turnkey", subtitle: "Solutions", desc: "From design to commissioning, we handle it all" },
              ].map(({ Icon, title, subtitle, desc }) => (
                <div key={title} className="group p-8 rounded-2xl bg-zinc-800/50 border border-zinc-700/50 hover:border-brand-yellow/50 hover:bg-zinc-800 transition-all duration-300">
                  <div className="w-16 h-16 rounded-xl bg-brand-yellow text-zinc-900 inline-grid place-items-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-bold text-white">{title}</h3>
                  <p className="text-brand-yellow font-semibold text-lg">{subtitle}</p>
                  <p className="mt-3 text-zinc-400">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <Process />
      <CTAPremium />
      <TrustSignals />
    </main>
  );
}
