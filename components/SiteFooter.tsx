// components/SiteFooter.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  MessageCircle,
  MapPin,
  Phone,
  Mail,
  X as CloseIcon,
} from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

// Minimal brand marks (inline SVGs)
function XLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M18.146 3H21l-7.47 8.54L22.5 21h-6.03l-4.72-5.77L5.5 21H3l7.9-9.02L1.5 3h6.03l4.33 5.29L18.146 3Z"/>
    </svg>
  );
}



export default function SiteFooter() {
  const links: [string, string][] = [
    ["About", "/about"],
    ["Solutions", "/solutions"],
    ["Industry Insights", "/insights"],
    ["FAQ", "/faqs"],
    ["Contact", "/contact"],
  ];

  const helpful: [string, string][] = [
    ["Support", "/contact"],
    ["WhatsApp", "https://wa.me/96171654956"],
    ["Email us", "mailto:solenergysarl@gmail.com"],
  ];

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");

  // Mobile Subscribe sheet state
  const [sheetOpen, setSheetOpen] = useState(false);

  // submit handler (shared)
  async function handleSubscribeSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    try {
      setStatus("loading");
      setMsg("");
  
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
  
      if (!res.ok) throw new Error("Request failed");
  
      setStatus("ok");
      setMsg("Thanks! We’ll be in touch soon.");
      setEmail("");
    } catch {
      setStatus("err");
      setMsg("Subscription failed. Please try again.");
    }
  }
  

  return (
    <footer
      id="site-footer"
      className="relative border-t border-zinc-800 bg-zinc-900 overflow-hidden"
      aria-labelledby="footer-heading"
    >
      {/* Dark gradient wash */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-zinc-800 via-zinc-900 to-black"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
          maskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
        }}
      />
      {/* Yellow sun glow at bottom right */}
      <div className="pointer-events-none absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-brand-yellow/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-brand-orange/15 blur-2xl" />

      {/* UPPER: mobile=2 cols (compact), desktop=5 cols */}
      <div className="mx-auto max-w-6xl px-4 py-8 md:py-10 grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-10">
        {/* BRAND */}
        <div className="col-span-2 md:col-span-2">
          <h2 id="footer-heading" className="sr-only">Footer</h2>
          <Link href="/" className="inline-flex items-center" aria-label="Solenergy home">
            <img src="/images/logo.png" alt="Solenergy logo" className="h-9 w-auto md:h-12" />
          </Link>
          <p className="text-zinc-400 mt-2 md:mt-3 max-w-[36ch] text-sm md:text-base leading-6">
            Powering Lebanon&apos;s future with sustainable solar energy solutions and reliable backup generators.
          </p>

          <div className="mt-3 md:mt-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs font-medium border border-zinc-700">
              Made in Lebanon
            </span>
            <a
              href="https://wa.me/96171654956"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-yellow hover:text-brand-orange transition-colors"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              WhatsApp
            </a>
          </div>

{/* Socials */}
<div className="mt-4 md:mt-6 flex flex-wrap items-center gap-2">
  {[
    { label: "Instagram", href: "https://www.instagram.com/solenergy_official", Icon: Instagram },
    { label: "Facebook",  href: "https://www.facebook.com/solenergy",  Icon: Facebook  },
    { label: "LinkedIn",  href: "https://lb.linkedin.com/company/solenergy", Icon: Linkedin },
    { label: "YouTube",   href: "https://www.youtube.com/@solenergy", Icon: Youtube  },
    { label: "X",        href: "https://x.com/solenergy", Icon: XLogo },
    { label: "TikTok",   href: "https://tiktok.com/@solenergy", Icon: FaTiktok },
  ].map(({ label, href, Icon }) => (
    <a
      key={label}
      aria-label={label}
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-grid place-items-center size-9 rounded-full border border-zinc-700 hover:border-brand-yellow hover:bg-zinc-800 transition text-zinc-400 hover:text-brand-yellow"
    >
      <Icon className="h-4 w-4" />
    </a>
  ))}
</div>

        </div>

          <nav aria-label="Explore" className="col-span-1 md:col-span-1">
          <h4 className="font-semibold text-zinc-100 tracking-wide">Explore</h4>
          <span className="mt-1 block h-0.5 w-10 rounded-full bg-gradient-to-r from-brand-yellow to-brand-orange" />
          {/* mobile: 2-col dense grid; desktop: list */}
          <ul className="mt-2 md:mt-3 grid grid-cols-2 gap-x-4 gap-y-1 md:block md:space-y-2 text-sm md:text-base">
            {links.map(([label, href]) => (
              <li key={label}>
                <Link href={href} className="text-zinc-400 hover:text-brand-yellow transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* CONTACT + INFO + NEWSLETTER */}
        <div className="col-span-1 md:col-start-4 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Contact */}
          <nav aria-label="Contact">
            <h4 className="font-semibold text-zinc-100 tracking-wide">Contact</h4>
            <span className="mt-1 block h-0.5 w-10 rounded-full bg-gradient-to-r from-brand-yellow to-brand-orange" />
            <ul className="mt-2 md:mt-3 grid grid-cols-2 gap-x-4 gap-y-1 md:block md:space-y-2 text-sm md:text-base">
              {helpful.map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-zinc-400 hover:text-brand-yellow transition-colors"
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noreferrer" : undefined}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Info (condensed) */}
          <address className="not-italic">
            <h4 className="font-semibold text-zinc-100 tracking-wide">Info</h4>
            <span className="mt-1 block h-0.5 w-10 rounded-full bg-gradient-to-r from-brand-yellow to-brand-orange" />
            <div className="mt-2 md:mt-3 space-y-2 md:space-y-3 text-zinc-400 text-sm md:text-base leading-6">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-zinc-500" aria-hidden />
                <span className="whitespace-nowrap md:whitespace-normal">Adonis, Lebanon</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-zinc-500" aria-hidden />
                <a href="tel:+96171654956" className="hover:text-brand-yellow transition-colors">+961 71 654 956</a>
              </div>
            </div>
          </address>

          {/* Newsletter: mobile popup trigger + desktop form */}
          <div className="md:col-span-2 md:row-start-2">
            {/* Mobile popup */}
            <div className="sm:hidden">
              <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                  <button
                    className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-brand-yellow bg-zinc-800 px-5 py-2.5 font-semibold text-brand-yellow hover:bg-zinc-700 transition"
                    aria-label="Subscribe to newsletter"
                  >
                    <Mail className="h-4 w-4" aria-hidden />
                    Subscribe
                  </button>
                </SheetTrigger>
                <SheetContent
                  side="bottom"
                  className="px-4 pb-8 rounded-t-3xl bg-zinc-900 border-t border-zinc-800"
                  aria-describedby="newsletter-mobile-description"
                >
                  <SheetTitle className="text-lg font-semibold text-zinc-100 mt-2">Stay in the loop</SheetTitle>
                  <p id="newsletter-mobile-description" className="text-sm text-zinc-400 mt-1">
                    Short, useful updates on solar energy. No spam, ever.
                  </p>

                  <form
                    className="mt-4 flex flex-col gap-3"
                    onSubmit={handleSubscribeSubmit}
                    aria-label="Newsletter subscription form"
                  >
                    <input
                      type="email"
                      placeholder="Your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-full border border-zinc-700 bg-zinc-800 text-zinc-100 placeholder:text-zinc-500 outline-none focus:border-brand-yellow"
                      aria-label="Email address"
                      autoComplete="email"
                    />
                    <button
                      disabled={status === "loading"}
                      className="btn btn-primary w-full !py-3 disabled:opacity-60"
                    >
                      {status === "loading" ? "Subscribing…" : "Subscribe"}
                    </button>
                  </form>

                  <div
                    aria-live="polite"
                    className={`mt-2 text-sm text-center ${
                      status === "ok" ? "text-brand-yellow" : status === "err" ? "text-red-400" : "text-zinc-500"
                    }`}
                  >
                    {msg}
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Desktop inline form */}
            <div className="hidden sm:block" id="newsletter">
              <h4 className="font-semibold text-zinc-100 tracking-wide">Stay in the loop</h4>
              <span className="mt-1 block h-0.5 w-10 rounded-full bg-gradient-to-r from-brand-yellow to-brand-orange" />
              <p className="mt-1 text-sm text-zinc-400">Short, useful updates. No spam, ever.</p>

              <form
                className="mt-3 flex w-full items-stretch rounded-full border border-zinc-700 bg-zinc-800 overflow-hidden"
                onSubmit={handleSubscribeSubmit}
                aria-label="Newsletter subscription"
              >
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="min-w-0 flex-1 px-4 py-2 outline-none bg-transparent text-zinc-100 placeholder:text-zinc-500"
                  aria-label="Email address"
                  autoComplete="email"
                />
                <button
                  disabled={status === "loading"}
                  className="btn btn-primary shrink-0 rounded-none rounded-r-full !px-5 !py-2 disabled:opacity-60"
                >
                  {status === "loading" ? "…" : "Subscribe"}
                </button>
              </form>

              <div
                aria-live="polite"
                className={`mt-1 text-sm ${
                  status === "ok" ? "text-brand-yellow" : status === "err" ? "text-red-400" : "text-zinc-500"
                }`}
              >
                {msg}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LOWER */}
      <div className="border-t border-zinc-800">
        <div className="mx-auto max-w-6xl px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-zinc-500">
          <div>© {new Date().getFullYear()} Solenergy • All rights reserved.</div>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-brand-yellow transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-brand-yellow transition-colors">Terms</Link>
            <Link href="/glossary" className="hover:text-brand-yellow transition-colors">Glossary</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
