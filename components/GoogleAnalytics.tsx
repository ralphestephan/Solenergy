'use client';

import Script from 'next/script'
import { useEffect, useState } from 'react'
import { CONSENT_CHANGE_EVENT, getStoredConsent, type ConsentPrefs } from '@/lib/consent'

// GA4 + optional Meta Pixel, behind cookie consent (see lib/consent.ts and components/CookieConsent.tsx).
// IDs are passed in from the server layout, which resolves them from the org's BDI settings
// (settings.brand.tracking). `gaId` falls back to the site's own GA property so analytics keeps
// working even if the settings fetch fails.
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
  gaId = "",
  pixelId = "",
}: {
  gaId?: string;
  pixelId?: string;
}) {
  const { analytics, advertising } = useConsent();

  // A script that already ran cannot be unloaded, so withdrawing consent mid-visit is honoured by
  // switching the loaded tags off (and back on if the visitor changes their mind again).
  useEffect(() => {
    const w = window as unknown as TrackingWindow;
    if (gaId) w[`ga-disable-${gaId}`] = !analytics;
    w.gtag?.('consent', 'update', { analytics_storage: analytics ? 'granted' : 'denied' });
  }, [analytics, gaId]);

  useEffect(() => {
    (window as unknown as TrackingWindow).fbq?.('consent', advertising ? 'grant' : 'revoke');
  }, [advertising]);

  return (
    <>
      {gaId && analytics ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag("consent","default",{analytics_storage:"granted",ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied"});gtag("js",new Date());gtag("config",${JSON.stringify(gaId)});`}
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
