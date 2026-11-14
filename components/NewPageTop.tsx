"use client";
// shell/NewPageTop.tsx — a page reached by a link opens at its TOP, at once (Unreleased; owner bug, 2026-11-12).
//
// The owner, on a slow Lebanese connection: "on the home page I scroll down, press a button to go to another page, and it opens
// that page down there, in the same position". Next fetches the next page before it swaps it in, and until it has, the OLD page
// stays on screen at its old offset (up to several seconds on a slow line; the page swap inside React's <ViewTransition> held it
// longer still). Next scrolls to the top only after the new page is in, and Lenis (motion/SmoothScroll.tsx) kept gliding towards
// its old position.
//
// So the window goes to the top at the PRESS, not at the swap:
//   1. A click listener on window (bubble phase, so it runs after the link's own handlers): a plain left click on a link to
//      ANOTHER path of this origin (not #anchor-only, not a modified click, not a new tab or window, not a download) sets the
//      window and Lenis to 0 at once. A link that is [aria-haspopup], [aria-controls], [data-k-keep-scroll], [data-consent-open]
//      or [role="button"] is skipped: a link opens a page; anything that opens a dialog is a button or carries data-k-keep-scroll.
//   2. Back must still return to where the visitor was. Going to 0 before Next pushes the URL would make the browser save 0 for
//      the old history entry, so the offset is saved here first (sessionStorage, by address), and restored on a Back or Forward
//      once the page has been swapped in.
//   3. The pathname effect covers a navigation that was not a link press (a router.push from a button): at the swap, a forward
//      navigation goes to 0, a Back or Forward restores, an address with a #hash is left to the browser and Lenis.
// It never changes history.scrollRestoration. It works on touch, with reduced motion and without Lenis: it needs none.
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";

type LenisHandle = { scrollTo(target: number, opts?: { immediate?: boolean; force?: boolean }): void };
const KEY = "k-scroll:";
const lenis = () => (window as Window & { __kLenis?: LenisHandle }).__kLenis;
const goTo = (y: number) => {
  window.scrollTo({ top: y, left: 0, behavior: "instant" });
  lenis()?.scrollTo(y, { immediate: true, force: true });
};
const here = () => KEY + location.pathname + location.search;
const save = () => {
  try {
    sessionStorage.setItem(here(), String(Math.round(window.scrollY)));
  } catch {}
};
const saved = (): number | null => {
  try {
    const v = sessionStorage.getItem(here());
    return v === null ? null : Number(v);
  } catch {
    return null;
  }
};

/** True for a plain press that opens another page of this site in this tab. */
function opensAnotherPage(e: MouseEvent): URL | null {
  if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return null;
  const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
  if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return null;
  // A link opens a page; anything that opens a dialog, a menu or a player in place is a button, or carries data-k-keep-scroll.
  if (a.matches('[aria-haspopup], [aria-controls], [data-k-keep-scroll], [data-consent-open], [role="button"]')) return null;
  let u: URL;
  try {
    u = new URL(a.href, location.href);
  } catch {
    return null;
  }
  if (u.origin !== location.origin || (u.protocol !== "http:" && u.protocol !== "https:")) return null;
  if (u.pathname === location.pathname && u.search === location.search) return null; // the same page, or an #anchor on it
  return u;
}

export function NewPageTop() {
  const path = usePathname();
  const first = useRef(true);
  const traversal = useRef(false);
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!opensAnotherPage(e)) return;
      save();
      goTo(0);
    };
    const onPop = () => {
      traversal.current = true;
    };
    // On window, in the bubble phase: after every handler of the link has run, so a press that a handler swallows (a card
    // deck's drag-end click, stopPropagation) never gets here. Next fetches the page after the click event, so this is still
    // at the press, long before the old page is swapped out.
    window.addEventListener("click", onClick);
    window.addEventListener("popstate", onPop);
    // a reload or a link from elsewhere into this tab keeps the offset the browser saved; nothing to do on a hard load
    return () => {
      window.removeEventListener("click", onClick);
      window.removeEventListener("popstate", onPop);
    };
  }, []);
  useLayoutEffect(() => {
    let back = traversal.current;
    traversal.current = false;
    if (first.current) {
      first.current = false;
      // a Back onto a page that was loaded whole (a link that loads a whole document saved 0 in the browser's own history entry)
      const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
      if (nav?.type !== "back_forward") return;
      back = true;
    }
    if (window.location.hash && !back) return;
    const want = back ? saved() : 0;
    if (want === null) return; // a Back to an entry we never saw: the browser's own restoration stands
    goTo(want);
    // a late layout (a font, a picture) must not leave it part way: again on the next frames, unless the visitor moved
    let n = 0;
    let raf = 0;
    let moved = false;
    const stop = () => {
      moved = true;
    };
    const events = ["wheel", "touchstart", "keydown", "pointerdown"] as const;
    for (const ev of events) window.addEventListener(ev, stop, { once: true, passive: true });
    const again = () => {
      if (!moved && Math.abs(window.scrollY - want) > 2 && !traversal.current) goTo(want);
      if (!moved && ++n < 12) raf = requestAnimationFrame(again);
    };
    raf = requestAnimationFrame(again);
    return () => {
      cancelAnimationFrame(raf);
      for (const ev of events) window.removeEventListener(ev, stop);
    };
  }, [path]);
  return null;
}
