// app/faqs/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CTAPremium from "@/components/CTAPremium";
import SEOJsonLd from "@/components/SEOJsonLd";
import { SITE } from "@/lib/site";
import { HelpCircle, MessageCircle, Phone, ArrowRight, ChevronRight, Rocket, Sun, Zap, Wrench, DollarSign, Battery, Settings } from "lucide-react";

/* ---------------------------
   SEO
--------------------------- */
export const metadata: Metadata = {
  title: "Solar Energy & Generator Solutions FAQ | Solenergy Lebanon",
  description:
    "Get answers about solar energy systems, backup generators, energy storage, and hybrid power solutions. Expert guidance on renewable energy for Lebanon.",
  alternates: { canonical: "/faqs" },
  openGraph: {
    title: "Solar Energy & Generator Solutions FAQ | Solenergy Lebanon",
    description:
      "Expert answers about solar systems, backup generators, energy storage, and renewable energy solutions for Lebanese homes and businesses.",
    url: `${SITE.baseUrl}/faqs`,
    images: [{ url: SITE.ogImage }],
  },
  twitter: { card: "summary_large_image", site: "@solenergy" },
  robots: { index: true, follow: true },
  other: {
    keywords: "solar energy Lebanon, hybrid solar systems, backup generators, energy storage, renewable energy",
  },
};

/* ---------------------------
   Utils
--------------------------- */
function slugifySafe(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\-_]/g, "");
}

/* Icon lookup helper */
function getCategoryIcon(category: string, className: string = "w-5 h-5") {
  const icons: Record<string, React.ReactNode> = {
    "Getting Started": <Rocket className={className} />,
    "Solar System Design": <Sun className={className} />,
    "Equipment & Technology": <Zap className={className} />,
    "Installation & Permits": <Wrench className={className} />,
    "Financial & Savings": <DollarSign className={className} />,
    "Generators & Backup Power": <Battery className={className} />,
    "Support & Service": <Settings className={className} />,
  };
  return icons[category] || <HelpCircle className={className} />;
}

/* ---------------------------
   Data
--------------------------- */
const faqCategories = [
  {
    category: "Getting Started",
    questions: [
      {
        question: "What services does Solenergy provide?",
        answer:
          "Solenergy specializes in solar photovoltaic (PV) systems, backup generator installations, energy storage solutions, and hybrid renewable energy systems for homes and businesses across Lebanon. We handle everything from site assessment and design to installation, grid connection, and ongoing maintenance.",
      },
      {
        question: "How do I get started with solar energy?",
        answer:
          "Contact us for a free consultation at +961 71 654 956 or info@solenergypower.com. We'll assess your property, analyze your energy consumption, and design a customized solar solution with transparent pricing and expected savings.",
      },
      {
        question: "How much does a solar system cost in Lebanon?",
        answer:
          "Costs vary based on system size, equipment quality, and installation complexity. Residential systems typically range from $3,000-$15,000+ USD. We provide detailed quotes after assessing your needs. Solar systems typically pay for themselves in 3-7 years through electricity savings.",
      },
      {
        question: "Do I need technical knowledge to use solar power?",
        answer:
          "No technical knowledge required. We design systems for simplicity and provide complete training on monitoring and basic maintenance. Most systems operate automatically with minimal intervention.",
      },
    ],
  },
  {
    category: "Solar System Design",
    questions: [
      {
        question: "How much electricity can a solar system generate in Lebanon?",
        answer:
          "Lebanon receives excellent solar irradiance (5-7 peak sun hours daily). A typical 5kW system generates 20-30 kWh per day, or 600-900 kWh monthly, depending on location, orientation, shading, and season. We provide detailed production estimates for your specific site.",
      },
      {
        question: "What size solar system do I need?",
        answer:
          "System sizing depends on your electricity consumption, available roof space, budget, and goals (offset full bill vs. partial). We analyze your EDL bills and usage patterns to recommend optimal capacity—typically 3-10kW for homes, 10-100kW+ for businesses.",
      },
      {
        question: "Can solar panels work during power outages?",
        answer:
          "Standard on-grid systems shut down during outages for safety. However, hybrid systems with battery storage or backup generators can provide power during outages. We recommend hybrid solutions for Lebanon's grid instability.",
      },
      {
        question: "What's the difference between on-grid, off-grid, and hybrid systems?",
        answer:
          "On-grid: Connected to utility, no batteries, excess energy exported. Off-grid: Completely independent, requires batteries and backup generator. Hybrid: Best of both—grid connection plus battery backup for outages. Most Lebanese customers choose hybrid for reliability.",
      },
    ],
  },
  {
    category: "Equipment & Technology",
    questions: [
      {
        question: "What solar panel brands does Solenergy use?",
        answer:
          "We work with Tier 1 manufacturers offering 25+ year warranties including Longi, JA Solar, Canadian Solar, and Jinko. All panels meet IEC standards with efficiency ratings of 20-22%. We recommend panels based on your budget, space constraints, and performance needs.",
      },
      {
        question: "How long do solar panels last?",
        answer:
          "Quality solar panels last 25-30+ years with minimal maintenance. Most manufacturers guarantee 80-85% output after 25 years. Inverters typically last 10-15 years and may need replacement during the system's lifetime.",
      },
      {
        question: "What type of inverters do you install?",
        answer:
          "We install string inverters (Growatt, Huawei, SMA) for standard systems and hybrid inverters (Victron, Goodwe, Deye) for battery-integrated solutions. Hybrid inverters are popular in Lebanon as they manage solar, batteries, grid, and generators simultaneously.",
      },
      {
        question: "Do you offer battery storage systems?",
        answer:
          "Yes, we provide lithium-ion battery systems (LiFePO4 technology) with 10+ year lifespans and 5000-10000 cycle warranties. Battery sizing depends on your backup needs—typically 5-15 kWh for homes. We also integrate with existing generator systems.",
      },
    ],
  },
  {
    category: "Installation & Permits",
    questions: [
      {
        question: "How long does solar installation take?",
        answer:
          "Residential installations typically take 2-5 days depending on system size. Timeline includes: site preparation (1 day), mounting and wiring (1-2 days), inverter/battery setup (1 day), testing and commissioning (1 day). Permit processing may add 1-4 weeks.",
      },
      {
        question: "Do I need permits for solar installation in Lebanon?",
        answer:
          "Yes, building permits and utility approvals are typically required. We handle all permitting and coordination with EDL/local authorities for grid connection and net metering registration. Requirements vary by municipality and system size.",
      },
      {
        question: "Can solar panels be installed on any roof type?",
        answer:
          "Solar panels can be installed on most roof types (tile, metal, concrete) with proper mounting systems. We conduct structural assessments to ensure your roof can safely support the panels (typically 15-20 kg/m²). Ground-mount systems are available if roofs are unsuitable.",
      },
      {
        question: "What maintenance do solar systems require?",
        answer:
          "Minimal maintenance: occasional panel cleaning (2-4 times/year in dusty areas), visual inspections, and monitoring system performance. We offer annual maintenance packages including cleaning, electrical checks, inverter updates, and performance optimization.",
      },
    ],
  },
  {
    category: "Financial & Savings",
    questions: [
      {
        question: "How much can I save with solar energy?",
        answer:
          "Savings depend on your current electricity costs, generator fuel expenses, and solar production. Most customers reduce electricity bills by 60-90% and eliminate or significantly reduce generator fuel costs. With Lebanon's high energy costs, payback periods are typically 3-7 years.",
      },
      {
        question: "Does Lebanon offer net metering for solar?",
        answer:
          "Yes, Lebanon's net metering law allows you to export excess solar energy to the grid and receive credits on your EDL bill. We handle all net metering registration and coordination with utility companies.",
      },
      {
        question: "What financing options are available?",
        answer:
          "We work with several Lebanese banks and financing institutions offering solar loans with competitive rates. Some programs offer 0% down payment and extended repayment terms. Contact us for current financing partner options and eligibility requirements.",
      },
      {
        question: "What warranties does Solenergy provide?",
        answer:
          "Equipment warranties: Solar panels (25 years performance, 10-12 years product), inverters (5-10 years), batteries (10 years/5000+ cycles). Our installation workmanship is warranted for 2 years. Extended warranties and maintenance plans are available.",
      },
    ],
  },
  {
    category: "Generators & Backup Power",
    questions: [
      {
        question: "Do I still need a generator if I have solar panels?",
        answer:
          "For off-grid systems, yes—generators provide backup during extended cloudy periods. For grid-connected systems, generators are optional but recommended for Lebanon's power situation. Hybrid systems intelligently manage solar, batteries, and generators for maximum efficiency.",
      },
      {
        question: "Can Solenergy integrate solar with my existing generator?",
        answer:
          "Absolutely. We specialize in hybrid systems that integrate solar panels, battery storage, and your existing generator. The system automatically prioritizes solar, then batteries, then generator, minimizing fuel consumption while ensuring reliable power.",
      },
      {
        question: "What generator brands does Solenergy install?",
        answer:
          "We install high-quality diesel and gas generators from trusted brands including Perkins, Cummins, and Kohler. Generator sizing ranges from 10kVA for homes to 500kVA+ for commercial applications. We provide maintenance services and spare parts support.",
      },
      {
        question: "How does automatic switching between power sources work?",
        answer:
          "Our hybrid systems use intelligent Automatic Transfer Switches (ATS) that seamlessly switch between solar, batteries, grid, and generator power in milliseconds. The system prioritizes renewable energy first, switching to backup only when needed.",
      },
    ],
  },
  {
    category: "Support & Service",
    questions: [
      {
        question: "How do I contact Solenergy support?",
        answer:
          "Call +961 71 654 956, WhatsApp at the same number, or email info@solenergypower.com. Our support team is available during business hours for technical assistance, maintenance scheduling, and emergency support.",
      },
      {
        question: "Do you provide system monitoring?",
        answer:
          "Yes, all our systems include remote monitoring through mobile apps. Track real-time energy production, consumption, battery status, and system performance from anywhere. We can also monitor your system proactively and alert you to any issues.",
      },
      {
        question: "What happens if my solar system has problems?",
        answer:
          "Contact us immediately at +961 71 654 956. For warranty-covered issues, we coordinate repairs with manufacturers. For out-of-warranty service, we provide transparent pricing for diagnostics and repairs. Most issues are resolved within 48-72 hours.",
      },
      {
        question: "Do you offer maintenance packages?",
        answer:
          "Yes, we offer annual and bi-annual maintenance packages including: system cleaning, electrical inspections, performance optimization, inverter firmware updates, and priority emergency support. Regular maintenance ensures optimal performance and longevity.",
      },
    ],
  },
];

/* ---------------------------
   Page
--------------------------- */
export default function FAQPage() {
  return (
    <main className="w-full overflow-x-clip">
      {/* JSON-LD: FAQPage + Breadcrumbs */}
      <SEOJsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqCategories.flatMap((cat) =>
              cat.questions.map((q) => ({
                "@type": "Question",
                name: q.question,
                acceptedAnswer: { "@type": "Answer", text: q.answer },
              }))
            ),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE.baseUrl },
              { "@type": "ListItem", position: 2, name: "FAQs", item: `${SITE.baseUrl}/faqs` },
            ],
          },
        ]}
      />

      {/* PREMIUM HERO */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/energy.gif"
            alt="Energy solutions"
            fill
            priority
            className="object-cover object-center"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/95 via-zinc-900/85 to-zinc-900/75" />
        </div>

        {/* Triangle decorations */}
        <div className="absolute top-0 left-0 w-32 h-32 border-l-[32px] border-l-brand-yellow border-t-[32px] border-t-transparent border-r-[32px] border-r-transparent border-b-[32px] border-b-brand-yellow opacity-30" />
        <div className="absolute bottom-0 right-0 w-24 h-24 border-r-[24px] border-r-brand-orange border-b-[24px] border-b-transparent border-l-[24px] border-l-transparent border-t-[24px] border-t-brand-orange opacity-30" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 text-center">
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-brand-yellow/20 text-brand-yellow text-sm font-semibold mb-6">
            <HelpCircle className="w-4 h-4 mr-2" />
            HELP CENTER
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            <span className="text-white">Frequently Asked </span>
            <span className="text-brand-yellow">Questions</span>
          </h1>
          <div className="mt-4 flex justify-center">
            <div className="w-24 h-1 bg-brand-yellow rounded-full" />
          </div>
          <p className="mt-6 text-xl text-zinc-300 max-w-2xl mx-auto">
            Clear answers about solar energy systems, backup generators, energy storage, and renewable energy solutions for Lebanon.
          </p>
        </div>
      </section>

      {/* CATEGORY QUICK LINKS */}
      <section className="relative z-20 -mt-12 pb-8">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {faqCategories.map((cat) => {
              const slug = slugifySafe(cat.category);
              return (
                <Link
                  key={cat.category}
                  href={`#${slug}`}
                  className="group p-4 rounded-xl bg-white border border-zinc-100 shadow-lg hover:shadow-xl hover:border-brand-yellow/50 transition-all text-center"
                >
                  <div className="w-10 h-10 mx-auto rounded-lg bg-brand-yellow/10 text-brand-yellow inline-grid place-items-center">
                    {getCategoryIcon(cat.category, "w-5 h-5")}
                  </div>
                  <p className="mt-2 text-sm font-semibold text-zinc-700 group-hover:text-brand-yellow transition-colors">
                    {cat.category}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ CONTENT */}
      <section className="py-20 bg-zinc-50">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Sidebar */}
            <aside className="space-y-6 lg:sticky lg:top-24 h-fit hidden lg:block">
              <div className="p-6 rounded-2xl bg-white border border-zinc-100 shadow-lg">
                <h2 className="text-lg font-bold text-zinc-900">Categories</h2>
                <div className="mt-2 w-12 h-1 bg-brand-yellow rounded-full" />
                <nav className="mt-4 space-y-1">
                  {faqCategories.map((category) => {
                    const slug = slugifySafe(category.category);
                    return (
                      <Link
                        key={category.category}
                        href={`#${slug}`}
                        className="flex items-center gap-2 py-2.5 px-3 rounded-lg text-zinc-700 hover:bg-brand-yellow/10 hover:text-brand-yellow transition-colors"
                      >
                        {getCategoryIcon(category.category, "w-4 h-4")}
                        <span className="font-medium">{category.category}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-900 text-white">
                <h3 className="font-bold text-lg mb-2">Still Have Questions?</h3>
                <p className="text-sm text-zinc-400 mb-4">
                  Our solar energy experts are here to help you find the right solution.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-brand-yellow text-zinc-900 font-bold hover:bg-brand-orange transition-colors"
                >
                  Contact Us <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </aside>

            {/* FAQ Sections */}
            <div className="lg:col-span-3 space-y-10">
              {faqCategories.map((category) => {
                const slug = slugifySafe(category.category);
                return (
                  <section
                    key={category.category}
                    id={slug}
                    className="scroll-mt-24 p-8 md:p-10 rounded-2xl bg-white border border-zinc-100 shadow-lg"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-brand-yellow text-zinc-900 inline-grid place-items-center">
                        {getCategoryIcon(category.category, "w-6 h-6")}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-zinc-900">{category.category}</h2>
                        <div className="mt-2 w-16 h-1 bg-brand-yellow rounded-full" />
                      </div>
                    </div>

                    <Accordion
                      type="single"
                      collapsible
                      className="w-full space-y-3"
                    >
                      {category.questions.map((faq, idx) => (
                        <AccordionItem
                          key={idx}
                          value={`${slug}-${idx}`}
                          className="border border-zinc-200 rounded-xl overflow-hidden bg-zinc-50 data-[state=open]:bg-brand-yellow/5 data-[state=open]:border-brand-yellow/30"
                        >
                          <AccordionTrigger
                            className="px-6 py-4 text-left font-semibold text-zinc-900 hover:text-brand-yellow transition-colors [&[data-state=open]]:text-brand-yellow"
                          >
                            {faq.question}
                          </AccordionTrigger>

                          <AccordionContent className="px-6 pb-4 text-zinc-600 leading-relaxed">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </section>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="py-20 bg-zinc-900 relative overflow-hidden">
        {/* Triangle decorations */}
        <div className="absolute top-0 left-0 w-40 h-40 border-l-[40px] border-l-brand-yellow border-t-[40px] border-t-transparent border-r-[40px] border-r-transparent border-b-[40px] border-b-brand-yellow opacity-20" />
        <div className="absolute bottom-0 right-0 w-40 h-40 border-r-[40px] border-r-brand-orange border-b-[40px] border-b-transparent border-l-[40px] border-l-transparent border-t-[40px] border-t-brand-orange opacity-20" />
        
        <div className="mx-auto max-w-4xl px-4 text-center relative z-10">
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-brand-yellow/20 text-brand-yellow text-sm font-semibold mb-6">
            NEED MORE HELP?
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold">
            <span className="text-white">Can&apos;t Find Your </span>
            <span className="text-brand-yellow">Answer?</span>
          </h2>
          <p className="mt-6 text-lg text-zinc-400 max-w-2xl mx-auto">
            Our team of solar energy experts is ready to answer your questions and help you design the perfect energy solution for your needs.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-xl bg-brand-yellow text-zinc-900 font-bold text-lg hover:bg-brand-orange hover:shadow-lg transition-all flex items-center gap-2"
            >
              Contact Our Experts <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="https://wa.me/96171654956"
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 rounded-xl border-2 border-zinc-700 text-white font-bold text-lg hover:border-brand-yellow hover:text-brand-yellow transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" /> WhatsApp Us
            </a>
          </div>
          <div className="mt-8 flex items-center justify-center gap-8 text-zinc-400">
            <a href="tel:+96171654956" className="flex items-center gap-2 hover:text-brand-yellow transition-colors">
              <Phone className="w-4 h-4" />
              +961 71 654 956
            </a>
            <span className="text-zinc-600">|</span>
            <span>Response within 24 hours</span>
          </div>
        </div>
      </section>
    </main>
  );
}
