'use client';

import Script from 'next/script'
import { useEffect, useState } from 'react'
import { CONSENT_CHANGE_EVENT, getStoredConsent, type ConsentPrefs } from '@/lib/consent'

// GA4 + optional Meta Pixel, behind cookie consent (see lib/consent.ts and components/CookieConsent.tsx).
// IDs are passed in from the server layout, which resolves them from the org's BDI settings
// (settings.brand.tracking). `gaIds` carries BDI's own GA4 AND Solenergy's own, which both fire —
// one loader, one config per id; the layout falls back to Solenergy's own property so analytics
// keeps working even if the settings fetch fails.
//
// NOTHING from Google loads until the visitor allows Analytics, and nothing from Meta until they allow
// Advertising. There is deliberately no <noscript> pixel: without JavaScript nobody can consent.
type TrackingWindow = {
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
  [key: string]: unknown;
};

const NONE: ConsentPrefs = { analytics: false, advertising: false };

function useConsent(): ConsentPrefs {
  const [prefs, setPrefs] = useState<ConsentPrefs>(NONE);
  useEffect(() => {
    const sync = () => setPrefs(getStoredConsent() ?? NONE);
    sync();
    window.addEventListener(CONSENT_CHANGE_EVENT, sync);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, sync);
  }, []);
  return prefs;
}

export default function GoogleAnalytics({
  gaIds = [],
  pixelId = "",
}: {
  gaIds?: string[];
  pixelId?: string;
}) {
  const { analytics, advertising } = useConsent();
  // A stable key for the id list, so the effect below re-runs only when the ids change.
  const idsKey = gaIds.join(' ');

  // A script that already ran cannot be unloaded, so withdrawing consent mid-visit is honoured by
  // switching the loaded tags off (and back on if the visitor changes their mind again).
  useEffect(() => {
    const w = window as unknown as TrackingWindow;
    // EVERY id: switching off only the first would leave the other one sending.
    for (const id of idsKey.split(' ').filter(Boolean)) w[`ga-disable-${id}`] = !analytics;
    w.gtag?.('consent', 'update', { analytics_storage: analytics ? 'granted' : 'denied' });
  }, [analytics, idsKey]);

  useEffect(() => {
    (window as unknown as TrackingWindow).fbq?.('consent', advertising ? 'grant' : 'revoke');
  }, [advertising]);

  return (
    <>
      {gaIds.length && analytics ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaIds[0])}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag("consent","default",{analytics_storage:"granted",ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied"});gtag("js",new Date());${gaIds.map((id) => `gtag("config",${JSON.stringify(id)});`).join('')}`}
          </Script>
        </>
      ) : null}
      {pixelId && advertising ? (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init',${JSON.stringify(pixelId)});fbq('track','PageView');`}
        </Script>
      ) : null}
    </>
  )
}
