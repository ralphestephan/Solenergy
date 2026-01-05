import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CTAPremium from "@/components/CTAPremium";
import TrustSignals from "@/components/TrustSignals";
import { Award, Lightbulb, Target, TrendingUp, Users, Calendar, CheckCircle2 } from "lucide-react";
import SEOJsonLd from "@/components/SEOJsonLd";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Solenergy | Leading Energy Solutions Provider in Lebanon",
  description:
    "Solenergy is transforming how homes and businesses in Lebanon and the GCC region manage energy. We deliver intelligent, reliable, and sustainable energy solutions — from solar panel systems and backup generators to advanced energy management platforms.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Solenergy",
    description:
      "Powering your future with smart energy solutions. Solar panels, backup generators, energy management systems, and Industry 4.0 technologies for a sustainable tomorrow.",
    url: `${SITE.baseUrl}/about`,
    images: [{ url: SITE.ogImage }],
  },
  // twitter: { card: "summary_large_image", site: "@solenergy" }, // Disabled until further notice
};

export default function Page() {
  return (
    <div className="w-full overflow-x-clip relative">
      {/* JSON-LD (Organization) */}
      <SEOJsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: SITE.org.legalName,
          url: SITE.org.url,
          logo: SITE.org.logo,
          sameAs: SITE.org.sameAs,
          contactPoint: [
            {
              "@type": "ContactPoint",
              telephone: SITE.contact.phone,
              contactType: "customer service",
              areaServed: "LB",
              availableLanguage: ["en", "ar", "fr"],
            },
          ],
        }}
      />

      {/* PREMIUM HERO - Dark overlay style */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/field.jpg"
            alt="Solenergy solar energy solutions"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/90 via-zinc-900/70 to-zinc-900/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 via-transparent to-zinc-900/30" />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse" />
              <span className="text-sm font-medium text-white/90">About Us</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tight text-white mb-6">
              ABOUT <span className="text-brand-yellow">SOLENERGY</span>
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-1 bg-brand-yellow rounded-full" />
              <div className="w-4 h-1 bg-brand-orange rounded-full" />
            </div>

            <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-10 leading-relaxed">
              Solenergy is transforming how homes and businesses in Lebanon and the GCC region manage energy. 
              We deliver intelligent, reliable, and sustainable energy solutions — from solar panel systems 
              and backup generators to advanced energy management platforms.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/solutions"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-brand-yellow text-zinc-900 font-bold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(244,180,26,0.4)] hover:scale-[1.02]"
              >
                Explore Solutions
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-transparent text-white font-bold rounded-lg border-2 border-white/30 transition-all duration-300 hover:bg-white/10 hover:border-white/50"
              >
                Free Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHO WE ARE / WHAT WE BELIEVE */}
      <section className="py-24 relative overflow-x-clip bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              WELCOME TO <span className="text-brand-yellow">SOLENERGY</span>
            </h2>
            <div className="w-16 h-1 bg-brand-yellow mx-auto mt-4 mb-6" />
            <p className="text-zinc-600 max-w-2xl mx-auto text-lg">
              With 30 years of experience, 50+ MW installed, and 24/7 support, Solenergy is a trusted partner 
              for organizations seeking energy independence, efficiency, and resilience.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Who we are */}
            <div className="group p-8 rounded-2xl bg-white border border-zinc-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-r-[40px] border-t-transparent border-r-brand-yellow/20" />
              
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-yellow/10 text-brand-yellow text-sm font-medium mb-4">
                Who we are
              </div>
              <h3 className="text-2xl font-bold mt-2 mb-4">
                Powering Lebanon&apos;s energy future
              </h3>
              <div className="w-12 h-0.5 bg-brand-yellow mb-6" />
              
              <div className="space-y-4 text-zinc-600">
                <p>
                  Solenergy is transforming how homes and businesses in Lebanon and the GCC region manage energy. 
                  We deliver intelligent, reliable, and sustainable energy solutions — from solar panel systems 
                  and backup generators to advanced energy management platforms.
                </p>
                <p>
                  With 30 years of experience, 50+ MW installed, and 24/7 support, Solenergy is a trusted partner 
                  for organizations seeking energy independence, efficiency, and resilience in an evolving energy landscape.
                </p>
              </div>
            </div>

            {/* What we believe */}
            <div className="group p-8 rounded-2xl bg-white border border-zinc-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-r-[40px] border-t-transparent border-r-brand-orange/20" />
              
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-orange/10 text-brand-orange text-sm font-medium mb-4">
                What we believe
              </div>
              <h3 className="text-2xl font-bold mt-2 mb-4">
                Our Core Values
              </h3>
              <div className="w-12 h-0.5 bg-brand-orange mb-6" />
              
              <ul className="space-y-4">
                {[
                  { title: "Sustainability first", body: "Clean energy solutions that protect our environment." },
                  { title: "Reliability matters", body: "Backup power ensuring uninterrupted operations." },
                  { title: "Innovation drives progress", body: "Leading with smart technology solutions." },
                  { title: "Local support", body: "24/7 monitoring and maintenance services." },
                ].map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-brand-yellow/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-brand-yellow" />
                    </div>
                    <div>
                      <div className="font-semibold text-zinc-900">{item.title}</div>
                      <div className="text-sm text-zinc-600">{item.body}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 bg-zinc-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { k: "30", v: "Years of Excellence" },
              { k: "50+", v: "MW Installed" },
              { k: "1kW-1MW", v: "Project Range" },
              { k: "99%", v: "Client Satisfaction" },
            ].map(({ k, v }) => (
              <div
                key={v}
                className="p-6 rounded-2xl bg-white border border-zinc-100 shadow-lg text-center"
              >
                <div className="text-3xl font-extrabold text-brand-yellow">{k}</div>
                <div className="text-sm text-zinc-600 mt-1">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR JOURNEY - Timeline */}
      <section className="py-24 relative overflow-x-clip bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              OUR <span className="text-brand-yellow">JOURNEY</span>
            </h2>
            <div className="w-16 h-1 bg-brand-yellow mx-auto mt-4 mb-6" />
            <p className="text-zinc-600 max-w-2xl mx-auto">
              Three decades of growth, innovation, and powering the region&apos;s energy transformation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                year: "1996",
                title: "Backup Generator Services Started",
                description: "Founded Solenergy with backup generator sales, installation, and maintenance services.",
              },
              {
                year: "2018",
                title: "Maintenance Services",
                description: "Expanded comprehensive maintenance services offering 24/7 support and preventive care for power systems.",
              },
              {
                year: "2020",
                title: "Solar Energy Installations",
                description: "Launched solar energy services, shifting to regional leader by 2023 with comprehensive solar solutions.",
              },
              {
                year: "2024",
                title: "Qatar Expansion",
                description: "Expanded operations to Qatar, serving the GCC region with our comprehensive energy solutions.",
              },
              {
                year: "2025",
                title: "Iraq Expansion",
                description: "Extended our services to Iraq, further establishing our presence across the region.",
              },
              {
                year: "2026",
                title: "Sol4.0 & Industry 4.0",
                description: "Starting Sol4.0—our complete energy management and Industry 4.0 solutions platform.",
              },
            ].map((milestone) => (
              <div
                key={milestone.year}
                className="group p-6 rounded-2xl bg-white border border-zinc-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[30px] border-r-[30px] border-t-transparent border-r-brand-yellow/20" />
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-5 h-5 text-brand-yellow" />
                  <span className="text-2xl font-bold text-brand-yellow">{milestone.year}</span>
                </div>
                <h3 className="text-lg font-bold mb-2">{milestone.title}</h3>
                <div className="w-8 h-0.5 bg-brand-yellow mb-3" />
                <p className="text-zinc-600 text-sm">{milestone.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEET THE TEAM */}
      <section className="py-24 relative overflow-x-clip bg-zinc-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              MEET THE <span className="text-brand-yellow">TEAM</span>
            </h2>
            <div className="w-16 h-1 bg-brand-yellow mx-auto mt-4 mb-6" />
            <p className="text-zinc-600 max-w-2xl mx-auto">
              Expert engineers and technicians dedicated to delivering reliable energy solutions.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {[
              { 
                name: "Charbel Mansour", 
                role: "Owner", 
                img: "/images/fieldwork.png",
                quote: "Building reliable energy solutions for Lebanon's future, one project at a time."
              },
              { 
                name: "Tarek", 
                role: "Manager", 
                img: "/images/work.png",
                quote: "Excellence in energy management starts with understanding our clients' unique needs."
              },
              { 
                name: "Ralph Estephan", 
                role: "IIoT Engineer", 
                img: "/images/panels.png",
                quote: "Innovation and smart technology are the keys to efficient energy systems."
              },
              { 
                name: "Mohammad", 
                role: "Technician", 
                img: "/images/fieldwork.png",
                quote: "Quality installation and maintenance ensure long-term reliability and performance."
              },
              { 
                name: "Mario", 
                role: "Site Engineer", 
                img: "/images/work.png",
                quote: "Every project is an opportunity to deliver excellence and exceed expectations."
              },
            ].map((p) => (
              <div
                key={p.name}
                className="group p-6 rounded-2xl bg-white border border-zinc-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[30px] border-r-[30px] border-t-transparent border-r-brand-yellow/10" />
                <div className="flex flex-col items-center text-center">
                  <div className="w-28 h-28 rounded-full overflow-hidden ring-2 ring-brand-yellow/20 bg-zinc-100">
                    <Image
                      src={p.img}
                      alt={`${p.name} — ${p.role}`}
                      width={160}
                      height={160}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-4 font-bold text-zinc-900">{p.name}</div>
                  <div className="mt-1 text-sm text-brand-yellow">{p.role}</div>
                  <div className="mt-4 pt-4 border-t border-zinc-100">
                    <p className="text-xs text-zinc-600 italic leading-relaxed">&quot;{p.quote}&quot;</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION & VALUES */}
      <section className="py-24 relative overflow-x-clip bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              MISSION & <span className="text-brand-yellow">VALUES</span>
            </h2>
            <div className="w-16 h-1 bg-brand-yellow mx-auto mt-4 mb-6" />
            <p className="text-zinc-600 max-w-2xl mx-auto">
              The principles that shape every solution we deliver—from solar to Industry 4.0.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="p-8 rounded-2xl bg-white border border-zinc-100 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-r-[40px] border-t-transparent border-r-brand-yellow/20" />
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-brand-yellow/10 flex items-center justify-center">
                  <Target className="w-7 h-7 text-brand-yellow" />
                </div>
                <h3 className="text-2xl font-bold">Our Mission</h3>
              </div>
              <div className="w-12 h-0.5 bg-brand-yellow mb-4" />
              <p className="text-zinc-600 leading-relaxed">
                To provide Lebanon with reliable, sustainable energy solutions that reduce costs, 
                increase efficiency, and protect our environment for future generations.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-zinc-100 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-r-[40px] border-t-transparent border-r-brand-orange/20" />
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-brand-orange/10 flex items-center justify-center">
                  <Lightbulb className="w-7 h-7 text-brand-orange" />
                </div>
                <h3 className="text-2xl font-bold">Our Vision</h3>
              </div>
              <div className="w-12 h-0.5 bg-brand-orange mb-4" />
              <p className="text-zinc-600 leading-relaxed">
                To be the leading energy solutions provider in the region, pioneering smart, 
                sustainable technologies that power industries and communities.
              </p>
            </div>
          </div>

          {/* VALUES */}
          <div className="grid grid-cols-3 gap-6">
            {[
              { Icon: Award, label: "Excellence" },
              { Icon: TrendingUp, label: "Innovation" },
              { Icon: Users, label: "Customer Focus" },
            ].map(({ Icon, label }) => (
              <div
                key={label}
                className="p-6 rounded-2xl bg-white border border-zinc-100 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-brand-yellow/10 text-brand-yellow flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold">{label}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PREMIUM CTA + TRUST */}
      <CTAPremium />
      <TrustSignals />
    </div>
  );
}
