// app/contact/page.tsx
"use client"
import SEOJsonLd from "@/components/SEOJsonLd";
import { SITE } from "@/lib/site";
import { MessageCircle, Mail, Phone, Clock, MapPin, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";


export default function Page() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setStatus("loading");
    setMsg("");

    const formEl = e.currentTarget;

    const fd = new FormData(formEl);
    const data: Record<string, any> = {};
    fd.forEach((val, key) => {
      if (key in data) {
        data[key] = Array.isArray(data[key]) ? [...data[key], val] : [data[key], val];
      } else {
        data[key] = val;
      }
    });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        let errJson: any = {};
        try {
          errJson = await res.json();
        } catch (parseErr) {
          console.warn("Could not parse error JSON:", parseErr);
        }
        throw new Error(errJson?.error || `Request failed with ${res.status}`);
      }

      setStatus("ok");
      setMsg("Your request was sent successfully! We'll get back to you soon.");
      formEl.reset();
      return;
    } catch (err) {
      console.error("Contact form error (frontend):", err);
      setStatus("err");
      setMsg("Something went wrong. Please try again.");
    }
  }

  return (
    <main className="w-full overflow-x-clip">
      {/* JSON-LD: ContactPage */}
      <SEOJsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Solenergy Consultation",
          url: `${SITE.baseUrl}/contact`,
          about: "Free solar energy consultation in Lebanon.",
          mainEntityOfPage: `${SITE.baseUrl}/contact`,
          publisher: {
            "@type": "Organization",
            name: SITE.org.legalName,
            url: SITE.org.url,
            logo: SITE.org.logo,
            sameAs: SITE.org.sameAs,
            contactPoint: [
              {
                "@type": "ContactPoint",
                telephone: SITE.contact.phone,
                contactType: "sales",
                areaServed: "LB",
                availableLanguage: ["en", "ar", "fr"],
              },
            ],
          },
        }}
      />

      {/* PREMIUM HERO */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/field.jpg"
            alt="Solar field"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/95 via-zinc-900/80 to-zinc-900/70" />
        </div>

        {/* Triangle decorations */}
        <div className="absolute top-0 left-0 w-32 h-32 border-l-[32px] border-l-brand-yellow border-t-[32px] border-t-transparent border-r-[32px] border-r-transparent border-b-[32px] border-b-brand-yellow opacity-30" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 text-center">
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-brand-yellow/20 text-brand-yellow text-sm font-semibold mb-6">
            FREE CONSULTATION
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            <span className="text-white">Get Your Free </span>
            <span className="text-brand-yellow">Solar Consultation</span>
          </h1>
          <div className="mt-4 flex justify-center">
            <div className="w-24 h-1 bg-brand-yellow rounded-full" />
          </div>
          <p className="mt-6 text-xl text-zinc-300 max-w-2xl mx-auto">
            Let us design the perfect solar energy system for your home or business in Lebanon.
          </p>
        </div>
      </section>

      {/* CONTACT CARDS SECTION */}
      <section className="relative z-20 -mt-16 pb-8">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* WhatsApp Card */}
            <div className="group p-8 rounded-2xl bg-white border border-zinc-100 shadow-xl hover:shadow-2xl hover:border-brand-yellow/50 transition-all duration-300">
              <div className="w-16 h-16 rounded-xl bg-brand-yellow text-zinc-900 inline-grid place-items-center mb-6 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900">WhatsApp</h3>
              <p className="mt-2 text-zinc-600 mb-4">Quick response via chat</p>

              <div className="space-y-3">
                <a href="https://wa.me/96103654956" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-zinc-900 font-semibold hover:text-brand-orange transition-colors">
                  <span className="text-xs uppercase tracking-wider text-zinc-500 font-bold w-8">LB</span>
                  +961 03 654 956
                  <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>

            {/* Email Card */}
            <a
              href="mailto:info@solenergypower.com"
              className="group p-8 rounded-2xl bg-white border border-zinc-100 shadow-xl hover:shadow-2xl hover:border-brand-yellow/50 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-xl bg-brand-orange text-white inline-grid place-items-center mb-6 group-hover:scale-110 transition-transform">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900">Email</h3>
              <p className="mt-2 text-zinc-600">For detailed inquiries</p>
              <p className="mt-4 text-brand-orange font-semibold flex items-center gap-2">
                info@solenergypower.com <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </p>
            </a>

            {/* Phone Card */}
            <div className="group p-8 rounded-2xl bg-white border border-zinc-100 shadow-xl hover:shadow-2xl hover:border-brand-yellow/50 transition-all duration-300">
              <div className="w-16 h-16 rounded-xl bg-zinc-900 text-white inline-grid place-items-center mb-6 group-hover:scale-110 transition-transform">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900">Call Us</h3>
              <p className="mt-2 text-zinc-600 mb-4">Speak directly with our team</p>

              <div className="space-y-3">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Lebanon</span>
                  <a href="tel:+96103654956" className="text-zinc-900 font-semibold hover:text-brand-yellow transition-colors block">+961 03 654 956</a>
                  <a href="tel:+96171010508" className="text-zinc-900 font-semibold hover:text-brand-yellow transition-colors block">+961 71 010 508</a>
                </div>
                <div className="flex flex-col gap-1 pt-2 border-t border-zinc-100">
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Qatar</span>
                  <a href="tel:+97433256185" className="text-zinc-900 font-semibold hover:text-brand-yellow transition-colors block">+974 33 256 185</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTACT FORM SECTION */}
      <section className="py-20 bg-zinc-50">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* LEFT: Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-brand-yellow/10 text-brand-yellow text-sm font-semibold">
                  GET IN TOUCH
                </span>
                <h2 className="mt-4 text-3xl md:text-4xl font-extrabold">
                  <span className="text-zinc-900">Ready To Go </span>
                  <span className="text-brand-yellow">Solar?</span>
                </h2>
                <div className="mt-4 w-20 h-1 bg-brand-yellow rounded-full" />
                <p className="mt-6 text-zinc-600 text-lg leading-relaxed">
                  Fill out the form and our solar experts will get back to you within 24 hours with a personalized energy assessment.
                </p>
              </div>

              {/* Location Info */}
              <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-lg">
                <h3 className="font-bold text-lg text-zinc-900 mb-4">Info</h3>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-yellow/10 text-brand-yellow inline-grid place-items-center flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="space-y-4 w-full">
                    {/* Lebanon */}
                    <div>
                      <p className="font-semibold text-zinc-900 text-lg">Lebanon</p>
                      <p className="text-zinc-700">Galaxy Complex, Baabda, Mount Lebanon</p>
                      <div className="flex flex-col mt-1 space-y-0.5">
                        <a href="tel:+96103654956" className="text-zinc-600 hover:text-brand-yellow transition-colors font-medium">+961 03 654 956</a>
                        <a href="tel:+96171010508" className="text-zinc-600 hover:text-brand-yellow transition-colors font-medium">+961 71 010 508</a>
                      </div>
                    </div>

                    {/* Qatar */}
                    <div>
                      <p className="font-semibold text-zinc-900 text-lg">Qatar</p>
                      <p className="text-zinc-700">Doha, Lusail</p>
                      <div className="flex flex-col mt-1 space-y-0.5">
                        <a href="tel:+97433256185" className="text-zinc-600 hover:text-brand-yellow transition-colors font-medium">+974 33 256 185</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-lg">
                <h3 className="font-bold text-lg text-zinc-900 mb-4">Business Hours</h3>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-yellow/10 text-brand-yellow inline-grid place-items-center flex-shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-zinc-900">Mon – Sat</p>
                    <p className="text-zinc-600 text-sm mt-1">Qatar: Sat – Thu</p>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="space-y-3">
                {[
                  "Free site assessment & energy audit",
                  "Custom solar system design",
                  "Transparent pricing with no hidden fees",
                  "Ongoing maintenance & support"
                ].map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-brand-yellow/10 text-brand-yellow inline-grid place-items-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <span className="text-zinc-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: Form */}
            <div className="lg:col-span-3">
              <div className="p-8 md:p-10 rounded-2xl bg-white border border-zinc-100 shadow-xl">
                <h2 className="text-2xl font-bold text-zinc-900">Request a Consultation</h2>
                <div className="mt-2 w-16 h-1 bg-brand-yellow rounded-full" />

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                  {/* Honeypot */}
                  <input
                    type="text"
                    name="hp"
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden="true"
                  />

                  {/* Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-zinc-700 mb-2">Full Name *</label>
                      <input
                        name="name"
                        required
                        autoComplete="name"
                        placeholder="John Doe"
                        className="w-full rounded-xl border-2 border-zinc-200 px-4 py-3 focus:border-brand-yellow focus:ring-0 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-zinc-700 mb-2">Phone</label>
                      <input
                        name="phone"
                        autoComplete="tel"
                        placeholder="+961 71 XXX XXX"
                        className="w-full rounded-xl border-2 border-zinc-200 px-4 py-3 focus:border-brand-yellow focus:ring-0 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-zinc-700 mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        autoComplete="email"
                        placeholder="email@example.com"
                        className="w-full rounded-xl border-2 border-zinc-200 px-4 py-3 focus:border-brand-yellow focus:ring-0 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-zinc-700 mb-2">City</label>
                      <input
                        name="city"
                        defaultValue="Beirut"
                        autoComplete="address-level2"
                        className="w-full rounded-xl border-2 border-zinc-200 px-4 py-3 focus:border-brand-yellow focus:ring-0 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Project Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-zinc-700 mb-2">I&apos;m Looking For</label>
                      <select name="reason" className="w-full rounded-xl border-2 border-zinc-200 px-4 py-3 focus:border-brand-yellow focus:ring-0 focus:outline-none transition-colors bg-white">
                        <option value="">Select service…</option>
                        <option>Solar system installation</option>
                        <option>Backup generator</option>
                        <option>Hybrid solar + generator</option>
                        <option>Energy storage / batteries</option>
                        <option>Maintenance / support</option>
                        <option>Energy consultation</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-zinc-700 mb-2">Property Type</label>
                      <select name="property" className="w-full rounded-xl border-2 border-zinc-200 px-4 py-3 focus:border-brand-yellow focus:ring-0 focus:outline-none transition-colors bg-white">
                        <option value="">Select type…</option>
                        <option>Residential home</option>
                        <option>Apartment</option>
                        <option>Commercial building</option>
                        <option>Industrial facility</option>
                        <option>Agricultural</option>
                      </select>
                    </div>
                  </div>

                  {/* Solutions of Interest */}
                  <div>
                    <label className="block text-sm font-semibold text-zinc-700 mb-3">Solutions of Interest</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {[
                        "Solar Panels",
                        "Battery Storage",
                        "Backup Generator",
                        "Hybrid System",
                        "Net Metering",
                        "Energy Monitoring",
                      ].map((s) => (
                        <label key={s} className="cursor-pointer">
                          <input type="checkbox" name="solutions" value={s} className="sr-only peer" />
                          <span className="block w-full text-center border-2 border-zinc-200 rounded-xl px-3 py-3 text-sm font-medium text-zinc-700 peer-checked:border-brand-yellow peer-checked:bg-brand-yellow/10 peer-checked:text-brand-yellow hover:border-zinc-300 transition-colors">
                            {s}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-sm font-semibold text-zinc-700 mb-2">Estimated Budget (USD)</label>
                    <select name="budget" className="w-full rounded-xl border-2 border-zinc-200 px-4 py-3 focus:border-brand-yellow focus:ring-0 focus:outline-none transition-colors bg-white">
                      <option value="">Select budget range…</option>
                      <option>Under $3,000</option>
                      <option>$3,000–$7,000</option>
                      <option>$7,000–$15,000</option>
                      <option>$15,000+</option>
                      <option>Need consultation to decide</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-semibold text-zinc-700 mb-2">Tell Us About Your Project</label>
                    <textarea
                      name="message"
                      rows={5}
                      placeholder="Describe your energy needs, monthly electricity bill, roof space, or any specific requirements…"
                      className="w-full rounded-xl border-2 border-zinc-200 px-4 py-3 focus:border-brand-yellow focus:ring-0 focus:outline-none transition-colors resize-none"
                    />
                    <label className="mt-3 inline-flex items-center gap-2 text-sm text-zinc-600 cursor-pointer">
                      <input type="checkbox" name="contact_pref" value="WhatsApp" className="rounded border-zinc-300 text-brand-yellow focus:ring-brand-yellow" />
                      Prefer WhatsApp follow-up
                    </label>
                  </div>

                  {/* Submit */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="flex-1 px-8 py-4 rounded-xl bg-brand-yellow text-zinc-900 font-bold text-lg hover:bg-brand-orange hover:shadow-lg disabled:opacity-60 transition-all flex items-center justify-center gap-2"
                    >
                      {status === "loading" ? "Sending…" : (
                        <>Request Consultation <ArrowRight className="w-5 h-5" /></>
                      )}
                    </button>
                    <a
                      href="https://wa.me/96103654956?text=Hello%20Solenergy%20%F0%9F%91%8B"
                      target="_blank"
                      rel="noreferrer"
                      className="px-8 py-4 rounded-xl border-2 border-zinc-200 font-bold text-lg hover:border-brand-yellow hover:text-brand-yellow transition-all flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-5 h-5" /> WhatsApp
                    </a>
                  </div>

                  {/* Status Message */}
                  {status !== "idle" && (
                    <div
                      className={`mt-4 px-6 py-4 rounded-xl text-base font-medium ${status === "ok"
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : status === "err"
                          ? "bg-red-50 text-red-700 border border-red-200"
                          : "text-zinc-500"
                        }`}
                    >
                      {msg}
                    </div>
                  )}

                  <p className="text-sm text-zinc-500 text-center">
                    By submitting, you agree to our{" "}
                    <Link href="/privacy" className="text-brand-yellow hover:underline font-medium">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-16 bg-brand-yellow">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900">
            Ready to Start Your Solar Journey?
          </h2>
          <p className="mt-4 text-lg text-zinc-800 max-w-2xl mx-auto">
            Join hundreds of Lebanese homes and businesses already saving with solar energy.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="tel:+96103654956"
              className="px-8 py-4 rounded-xl bg-zinc-900 text-white font-bold text-lg hover:bg-zinc-800 transition-all flex items-center gap-2"
            >
              <Phone className="w-5 h-5" /> Call Now
            </a>
            <a
              href="https://wa.me/96103654956"
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 rounded-xl bg-white text-zinc-900 font-bold text-lg hover:shadow-lg transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
