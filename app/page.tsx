// app/page.tsx
export const metadata: Metadata = {
  title: "Solenergy | Solar, Generators & Energy Management Solutions",
  description:
    "Solenergy delivers comprehensive solar energy, backup generators, energy management systems, and Industry 4.0 solutions. Powering your future with smart, sustainable energy.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Solenergy | Solar, Generators & Energy Management Solutions",
    description:
      "Solenergy delivers comprehensive solar energy, backup generators, energy management systems, and Industry 4.0 solutions. Powering your future with smart, sustainable energy.",
    url: `${SITE.baseUrl}/`,
    images: [{ url: SITE.ogImage }],
  },
  // twitter: { card: "summary_large_image", site: "@solenergy" }, // Disabled until further notice
  other: {
    keywords:
      "solar energy, solar panels, generators, energy management, Industry 4.0, smart solar, renewable energy, backup power, energy solutions Lebanon, sunflower solar tracking",
  },
};
import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

import SEOJsonLd from "@/components/SEOJsonLd";
import DynamicUnderline from "@/components/ui/DynamicUnderline";
import Reveal from "@/components/ui/Reveal";

// Premium components
import HeroPremium from "@/components/HeroPremium";
import ServicesPremium from "@/components/ServicesPremium";
import WhyChooseUs from "@/components/WhyChooseUs";
import FeaturedWorks from "@/components/FeaturedWorks";
import ReviewsPremium from "@/components/ReviewsPremium";
import CTAPremium from "@/components/CTAPremium";

// Existing components
import Clients from "@/components/Clients";
import SolutionsGrid from "@/components/SolutionsGrid";
import Process from "@/components/Process";
import Brands from "@/components/Brands";
import BlogTeasers from "@/components/BlogTeasers";
import TrustSignals from "@/components/TrustSignals";



export default function Page() {
  return (
    <main className="w-full overflow-x-clip">
      <SEOJsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: SITE.org.legalName,
            url: SITE.org.url,
            logo: SITE.org.logo,
            sameAs: SITE.org.sameAs,
            description: "Leading provider of solar energy, backup generators, energy management systems, and Industry 4.0 solutions. Delivering sustainable power solutions across Lebanon.",
            areaServed: {
              "@type": "Country",
              name: "Lebanon"
            },
            contactPoint: [
              {
                "@type": "ContactPoint",
                telephone: SITE.contact.phone,
                contactType: "customer service",
                areaServed: "LB",
                availableLanguage: ["en", "ar", "fr"],
              },
            ],
            makesOffer: [
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Solar Energy Solutions",
                  description: "Complete solar panel installation, maintenance, and smart solar tracking systems"
                }
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Generator Services",
                  description: "Industrial and commercial backup power solutions with intelligent load management"
                }
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Energy Management Systems",
                  description: "Smart energy monitoring, optimization, and multi-source integration solutions"
                }
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Industry 4.0 Solutions",
                  description: "Industrial IoT, automation, and predictive maintenance for smart factories"
                }
              }
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Solenergy Power Solutions",
            url: SITE.baseUrl,
            potentialAction: {
              "@type": "SearchAction",
              target: `${SITE.baseUrl}/search?q={search_term_string}`,
              "query-input": "required name=search_term_string"
            }
          },
        ]}
      />

      {/* PREMIUM HERO - Full width with dark overlay */}
      <HeroPremium />

      {/* SERVICES - Premium Marize-style layout */}
      <ServicesPremium />

      {/* WHY CHOOSE US - Trust section */}
      <WhyChooseUs />

      {/* CLIENTS CAROUSEL */}
      <Reveal>
        <Clients />
      </Reveal>

      {/* FEATURED WORKS - Project gallery */}
      <FeaturedWorks />

      {/* BRANDS */}
      <Reveal><Brands /></Reveal>

      {/* PREMIUM CTA - Yellow/Dark split section */}
      <CTAPremium />

      {/* PREMIUM REVIEWS */}
      <ReviewsPremium />

      {/* BLOG TEASERS */}
      <Reveal><BlogTeasers /></Reveal>

      {/* GUARANTEES / TRUST SIGNALS */}
      <Reveal><TrustSignals /></Reveal>
    </main>
  );
}
