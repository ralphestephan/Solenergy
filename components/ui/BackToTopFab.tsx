"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowUp, Sun } from "lucide-react";

type Props = {
  insetClass?: string;
  size?: number;
  label?: string;
  avoidFooterSelector?: string | null;
  maxLiftPx?: number;
};

export default function BackToTopFab({
  insetClass = "bottom-20 right-6 sm:bottom-24 sm:right-8",
  size = 56,
  label = "Back to top",
  avoidFooterSelector = "#site-footer",
  maxLiftPx = 220,
}: Props) {
  const [progress, setProgress] = useState(0);
  const [lift, setLift] = useState(0);
  const [isExploding, setIsExploding] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const foRef = useRef<Element | null>(null);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  const computeProgress = useCallback(() => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    return Math.max(0, Math.min(100, pct));
  }, []);

  const updateFooterLift = useCallback(() => {
    if (!foRef.current) return setLift(0);
    const rect = (foRef.current as HTMLElement).getBoundingClientRect();
    const overlap = Math.max(0, window.innerHeight - rect.top);
    const safePad = 12;
    const desired = overlap > 0 ? overlap + safePad : 0;
    setLift(Math.min(desired, maxLiftPx));
  }, [maxLiftPx]);

  useEffect(() => {
    let raf = 0;

    const onScrollOrResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const pct = computeProgress();
        setProgress(pct);
        updateFooterLift();
      });
    };

    if (avoidFooterSelector) {
      foRef.current = document.querySelector(avoidFooterSelector);
    }

    onScrollOrResize();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [computeProgress, avoidFooterSelector, updateFooterLift]);

  const onClick = () => {
    setIsExploding(true);
    
    const behavior = prefersReducedMotion ? "auto" : "smooth";
    window.scrollTo({ top: 0, behavior: behavior as ScrollBehavior });
    
    setTimeout(() => setIsExploding(false), 800);
  };

  const isFullyCharged = progress >= 95;
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress / 100);

  return (
    <div
      className="fixed z-50 pointer-events-none"
      style={{ 
        bottom: `${20 + lift}px`,
        right: '24px',
      }}
    >
      <button
        ref={btnRef}
        onClick={onClick}
        aria-label={label}
        className="relative pointer-events-auto rounded-full bg-white/95 backdrop-blur-sm border-2 border-amber-300 shadow-lg hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 transition-transform duration-200"
        style={{ 
          width: `${size}px`, 
          height: `${size}px`,
          boxShadow: isFullyCharged 
            ? '0 0 30px rgba(244, 180, 26, 0.7), 0 8px 20px rgba(0,0,0,0.2)' 
            : '0 4px 12px rgba(0,0,0,0.15)',
        }}
      >
        {/* Single SVG with progress ring */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
          viewBox="0 0 56 56"
        >
          <circle
            cx="28"
            cy="28"
            r={radius}
            fill="none"
            stroke="rgba(251, 191, 36, 0.2)"
            strokeWidth="4"
          />
          <circle
            cx="28"
            cy="28"
            r={radius}
            fill="none"
            stroke="url(#progress-gradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: 'stroke-dashoffset 0.3s ease' }}
          />
          <defs>
            <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F4B41A" />
              <stop offset="100%" stopColor="#E8952F" />
            </linearGradient>
          </defs>
        </svg>

        {/* Icon container */}
        {!isExploding && (
          <div className="absolute inset-0 flex items-center justify-center">
            <ArrowUp
              className="w-6 h-6 text-amber-600 transition-all duration-300"
              style={{
                opacity: isFullyCharged ? 0 : 1,
                transform: isFullyCharged ? 'scale(0)' : 'scale(1)',
              }}
            />
            <Sun
              className="absolute w-6 h-6 text-amber-600 transition-all duration-300"
              style={{
                opacity: isFullyCharged ? 1 : 0,
                transform: isFullyCharged ? 'scale(1) rotate(0deg)' : 'scale(0)',
                animation: isFullyCharged ? 'spin 3s linear infinite' : 'none',
              }}
            />
          </div>
        )}

        {/* Explosion particles */}
        {isExploding && (
          <div className="absolute inset-0">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <div
                key={angle}
                className="absolute top-1/2 left-1/2 w-3 h-3 -ml-1.5 -mt-1.5"
                style={{
                  animation: 'explode 0.8s ease-out forwards',
                  '--angle': `${angle}deg`,
                } as React.CSSProperties}
              >
                <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg" />
              </div>
            ))}
          </div>
        )}
      </button>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes explode {
          0% {
            transform: rotate(var(--angle)) translateX(0px) scale(1);
            opacity: 1;
          }
          100% {
            transform: rotate(var(--angle)) translateX(50px) scale(0.3);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
