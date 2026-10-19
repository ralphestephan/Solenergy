// Cookie consent (BDI Gate-4 standard).
//   * Necessary is always on; Analytics (GA4) and Advertising (Meta Pixel) are OFF until chosen.
//   * HARD gate: no Google or Meta script is requested before the matching consent.
//   * Global Privacy Control forces Advertising off, both when saving and when reading back.
//   * The choice lives in localStorage and is re-openable from the footer ("Cookie preferences").
export type ConsentPrefs = { analytics: boolean; advertising: boolean };

const STORAGE_KEY = "solenergy_consent_v1";
export const CONSENT_CHANGE_EVENT = "solenergy-consent-change";
export const CONSENT_OPEN_EVENT = "solenergy-consent-open";

export function gpcEnabled(): boolean {
  if (typeof navigator === "undefined") return false;
  return (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
}

/** null means the visitor has not chosen yet (or storage is unavailable). */
export function getStoredConsent(): ConsentPrefs | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw) as Partial<ConsentPrefs>;
    return { analytics: p.analytics === true, advertising: p.advertising === true && !gpcEnabled() };
  } catch {
    return null;
  }
}

/**
 * The visitor's advertising-cookie choice, read when a form is sent, for the `ad_consent` BDI needs:
 * BDI reports a lead to the ad accounts only when it is exactly true. False when refused, not chosen
 * yet, storage is blocked, Global Privacy Control is on, or on the server. Always a boolean.
 */
export function adConsent(): boolean {
  if (gpcEnabled()) return false;
  return getStoredConsent()?.advertising === true;
}

export function setConsent(input: ConsentPrefs): void {
  const prefs: ConsentPrefs = { analytics: !!input.analytics, advertising: !!input.advertising && !gpcEnabled() };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    /* storage may be blocked; the choice still applies for this page load */
  }
  window.dispatchEvent(new CustomEvent<ConsentPrefs>(CONSENT_CHANGE_EVENT, { detail: prefs }));
}

export function openConsentPreferences(): void {
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
}
