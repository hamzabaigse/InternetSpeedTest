'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, X } from 'lucide-react';

export const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('speednet_cookie_consent');
      if (!consent) {
        setIsVisible(true);
      }
    } catch {
      // localStorage safety
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('speednet_cookie_consent', 'accepted');
    } catch {
      // localStorage safety
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent banner"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md bg-slate-900/95 border border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-md z-50 animate-fadeIn"
    >
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 bg-cyan-500/10 border border-cyan-500/30 rounded-xl flex items-center justify-center text-cyan-400 flex-shrink-0 mt-0.5">
          <Cookie className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <div className="text-xs font-bold text-white mb-1">
            Privacy &amp; Cookie Preferences
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            We use cookies to deliver accurate network telemetry, personalize diagnostic features, and support our 100% free platform via Google AdSense. Learn more in our{' '}
            <Link href="/privacy-policy" className="text-cyan-400 hover:underline">
              Privacy Policy
            </Link>.
          </p>
          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={handleAccept}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs px-4 py-2 rounded-lg transition shadow-md"
            >
              Accept &amp; Continue
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="text-xs text-slate-400 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800 transition"
            >
              Dismiss
            </button>
          </div>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          aria-label="Close cookie banner"
          className="text-slate-500 hover:text-slate-300 p-1 transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
