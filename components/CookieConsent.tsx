"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CONSENT_OPEN_EVENT, getStoredConsent, gpcEnabled, setConsent, type ConsentPrefs } from "@/lib/consent";

type Mode = "hidden" | "banner" | "manage";

// "Accept all" and "Reject all" share ONE class on purpose: refusing must be as easy as agreeing.
const CHOICE_BTN =
  "inline-flex min-h-[44px] flex-1 items-center justify-center rounded-full border-2 border-brand-yellow bg-zinc-800 px-5 py-2 text-sm font-semibold text-brand-yellow transition-colors hover:bg-zinc-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow/60 sm:flex-none";

function Toggle({
  checked,
  disabled,
  onChange,
  label,
}: {
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={`relative mt-0.5 inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow/60 disabled:cursor-not-allowed ${
        checked ? "border-brand-yellow bg-brand-yellow" : "border-zinc-600 bg-zinc-700"
      } ${disabled && !checked ? "opacity-60" : ""}`}
    >
      <span
        aria-hidden
        className={`inline-block size-4 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-[22px]" : "translate-x-[3px]"}`}
      />
    </button>
  );
}

export default function CookieConsent() {
  const [mode, setMode] = useState<Mode>("hidden");
  const [analytics, setAnalytics] = useState(false);
  const [advertising, setAdvertising] = useState(false);
  const [gpc, setGpc] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const sync = useCallback(() => {
    const p = getStoredConsent();
    setAnalytics(p?.analytics ?? false);
    setAdvertising(p?.advertising ?? false);
  }, []);

  useEffect(() => {
    setGpc(gpcEnabled());
    sync();
    if (getStoredConsent() === null) setMode("banner");
    const open = () => {
      sync();
      setMode("manage");
    };
    window.addEventListener(CONSENT_OPEN_EVENT, open);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, open);
  }, [sync]);

  // Re-opened from the footer: move keyboard focus into the panel so it is not left behind.
  useEffect(() => {
    if (mode === "manage") panelRef.current?.focus();
  }, [mode]);

  const apply = (prefs: ConsentPrefs) => {
    setConsent(prefs);
    setMode("hidden");
  };
  const rejectAll = () => apply({ analytics: false, advertising: false });
  const acceptAll = () => apply({ analytics: true, advertising: !gpc });

  if (mode === "hidden") return null;

  return (
    <div
      ref={panelRef}
      tabIndex={-1}
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[60] max-h-[85vh] overflow-y-auto rounded-t-3xl border-t border-zinc-800 bg-zinc-900 text-zinc-300 shadow-[0_-12px_40px_rgba(0,0,0,0.35)] outline-none sm:inset-x-auto sm:bottom-6 sm:left-1/2 sm:w-[calc(100%-3rem)] sm:max-w-3xl sm:-translate-x-1/2 sm:rounded-3xl sm:border sm:border-zinc-700"
    >
      {/* brand accent line, as on the header */}
      <div aria-hidden className="h-[3px] rounded-t-3xl bg-gradient-to-r from-brand-yellow via-brand-orange to-brand-green" />

      {mode === "banner" ? (
        <div className="flex flex-col gap-4 px-4 pb-5 pt-4 sm:flex-row sm:items-center sm:gap-6 sm:px-6 sm:py-5">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-zinc-100">Cookies on Solenergy</p>
            <p className="mt-1 text-sm leading-6 text-zinc-400">
              With your permission we use analytics to see how the site is used, and Meta to measure our ads. Nothing
              optional runs until you choose.{" "}
              <Link href="/privacy#cookies" className="font-semibold text-brand-yellow transition-colors hover:text-brand-orange">
                Privacy policy
              </Link>
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:shrink-0 sm:items-end">
            <div className="flex gap-3">
              <button type="button" className={CHOICE_BTN} onClick={rejectAll}>
                Reject all
              </button>
              <button type="button" className={CHOICE_BTN} onClick={acceptAll}>
                Accept all
              </button>
            </div>
            <button
              type="button"
              onClick={() => setMode("manage")}
              className="self-start text-sm font-semibold text-brand-yellow transition-colors hover:text-brand-orange focus:outline-none focus-visible:underline sm:self-end"
            >
              Manage preferences
            </button>
          </div>
        </div>
      ) : (
        <div className="px-4 pb-5 pt-4 sm:px-6 sm:py-5">
          <h2 className="text-lg font-semibold text-zinc-100">Cookie preferences</h2>
          <span aria-hidden className="mt-1 block h-0.5 w-10 rounded-full bg-gradient-to-r from-brand-yellow to-brand-orange" />
          <p className="mt-3 text-sm leading-6 text-zinc-400">
            Necessary cookies keep the site working and secure, so they are always on. Choose which optional categories
            to allow. You can change this any time from &ldquo;Cookie preferences&rdquo; in the footer.{" "}
            <Link href="/privacy#cookies" className="font-semibold text-brand-yellow transition-colors hover:text-brand-orange">
              Privacy policy
            </Link>
          </p>

          <ul className="mt-4 grid gap-2">
            <li className="flex items-start justify-between gap-4 rounded-2xl border border-zinc-800 bg-zinc-800/60 px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-zinc-100">Necessary</p>
                <p className="text-xs leading-5 text-zinc-400">Security, forms and remembering this choice. Always active.</p>
              </div>
              <Toggle checked disabled label="Necessary cookies (always on)" />
            </li>
            <li className="flex items-start justify-between gap-4 rounded-2xl border border-zinc-800 bg-zinc-800/60 px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-zinc-100">Analytics</p>
                <p className="text-xs leading-5 text-zinc-400">Google Analytics, to understand which pages help visitors. No ads.</p>
              </div>
              <Toggle checked={analytics} onChange={setAnalytics} label="Analytics cookies" />
            </li>
            <li className="flex items-start justify-between gap-4 rounded-2xl border border-zinc-800 bg-zinc-800/60 px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-zinc-100">Advertising</p>
                <p className="text-xs leading-5 text-zinc-400">
                  Meta Pixel, to measure our Facebook and Instagram ads.
                  {gpc ? " Off, because your browser sends Global Privacy Control." : ""}
                </p>
              </div>
              <Toggle checked={advertising && !gpc} disabled={gpc} onChange={setAdvertising} label="Advertising cookies" />
            </li>
          </ul>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
            <div className="flex gap-3">
              <button type="button" className={CHOICE_BTN} onClick={rejectAll}>
                Reject all
              </button>
              <button type="button" className={CHOICE_BTN} onClick={acceptAll}>
                Accept all
              </button>
            </div>
            <button
              type="button"
              onClick={() => apply({ analytics, advertising: advertising && !gpc })}
              className="inline-flex min-h-[44px] items-center justify-center rounded-full border-2 border-brand-yellow bg-brand-yellow px-5 py-2 text-sm font-semibold text-zinc-900 transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow/60"
            >
              Save preferences
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
