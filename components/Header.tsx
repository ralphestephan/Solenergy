"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/solutions", label: "Solutions" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/insights", label: "Industry Insights" },
  { href: "/faqs", label: "FAQ" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header className="sticky top-0 z-50">
      {/* gradient accent line */}
      <div className="h-[3px] bg-gradient-to-r from-brand-yellow via-brand-orange to-brand-green" />
      {/* shell */}
      <div className={`header ${scrolled ? "is-scrolled" : ""}`}>
        <nav className="mx-auto max-w-6xl px-4">

          {/* Desktop */}
          <div className="hidden md:flex h-24 items-center justify-between text-zinc-800">
            <Link href="/" aria-label="Solenergy home" className="inline-flex items-center gap-3">
              <Image src="/images/logoDark.png" alt="Solenergy" width={480} height={200} className="h-44 w-auto" priority />
            </Link>

            <ul className="flex items-center gap-7 text-[15px] font-medium">
              {LINKS.map(l => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="nav-link text-zinc-700 hover:text-zinc-900 transition-colors"
                    aria-current={pathname === l.href ? "page" : undefined}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <Link href="/contact" className="shiny-cta px-5 py-2.5 text-sm font-semibold">
              <span>Let's talk →</span>
              <i aria-hidden className="shine"></i>
            </Link>
          </div>

          {/* Mobile bar */}
          <div className="md:hidden h-20 flex items-center justify-between relative">
            <button
              onClick={() => setOpen(v => !v)}
              aria-label="Open menu"
              className={`inline-flex items-center h-10 w-10 justify-center rounded-xl  text-zinc-900  active:scale-[.98] transition z-10 ${open ? "burger-open" : ""}`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <rect className="burger-line line-1" x="6" y="7" width="20" height="2" rx="1" />
                <rect className="burger-line line-2" x="6" y="11" width="20" height="2" rx="1" />
                <rect className="burger-line line-3" x="6" y="15" width="20" height="2" rx="1" />
              </svg>
            </button>

            <Link href="/" aria-label="Solenergy home" className="absolute left-1/2 -translate-x-1/2">
              <Image src="/images/logoDark.png" alt="Solenergy" width={500} height={208} className="h-32 w-auto" priority />
            </Link>

            <Link href="/contact" className="shiny-cta px-3.5 py-2 text-xs font-semibold z-10">
              <span>Let's talk</span>
              <i aria-hidden className="shine"></i>
            </Link>
          </div>
        </nav>
      </div>

      {/* Overlay + Drawer */}
      <div className={`drawer-overlay ${open ? "open" : ""}`} onClick={() => setOpen(false)} />
      <aside className={`drawer ${open ? "open" : ""}`} aria-hidden={!open}>
        <div className="p-4 pt-6 flex items-center gap-3">
          <Image src="/images/logoDark.png" alt="Solenergy" width={520} height={217} className="h-36 w-auto" />
        </div>
        <nav className="px-2 pb-8 text-zinc-900">
          <ul className="space-y-1">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`block px-4 py-3 rounded-lg text-[15px] font-medium transition-colors
                    ${pathname === l.href ? "bg-black/[0.06]" : "hover:bg-black/[0.05]"}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="pt-3 px-2">
            <Link href="/contact" className="shiny-cta w-full inline-flex justify-center px-4 py-2.5 text-sm font-semibold">
              <span>Let's talk →</span>
              <i aria-hidden className="shine"></i>
            </Link>
          </div>
        </nav>
      </aside>

    </header>
  );
}
