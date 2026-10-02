import React from 'react';
import Script from 'next/script';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { SeoSchema } from '@/components/SeoSchema';
import EzoicRouteHandler from '@/components/EzoicRouteHandler';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://speed-net.online';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'SpeedNetHub — Free Network Speed Test & ISP Intelligence Hub',
    template: '%s | SpeedNetHub',
  },
  description: '100% Free Network Diagnostic Hub testing download/upload speeds in Mbps and MB/s, YouTube 4K streaming buffer rates, bufferbloat, and game datacenters.',
  keywords: [
    'internet speed test',
    'free speed test',
    'youtube 4k buffer test',
    'valorant ping checker',
    'bufferbloat test',
    'isp throttling proof report',
    'zoom call reliability',
    'megabytes per second speed test',
    'fcc isp complaint report',
  ],
  authors: [{ name: 'SpeedNetHub Team' }],
  creator: 'SpeedNetHub',
  publisher: 'SpeedNetHub',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: baseUrl,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple: '/icon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: 'SpeedNetHub',
    title: 'SpeedNetHub — Free Network Speed Test & ISP Intelligence Hub',
    description: 'Measures download/upload speeds in Mbps and MB/s, YouTube 4K buffer rate, bufferbloat latency spikes, and game datacenters.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SpeedNetHub — Free Network Speed Test & ISP Intelligence Hub',
    description: 'Measures download/upload speeds in Mbps and MB/s, YouTube 4K buffer rate, bufferbloat latency spikes, and game datacenters.',
  },
  verification: {
    google: 'googleefabeaa442929fd0',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <SeoSchema />
        <link rel="preconnect" href="https://www.ezojs.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://ezoicanalytics.com" crossOrigin="anonymous" />
        <Script
          id="ezoic-cmp"
          src="https://cmp.gatekeeperconsent.com/min.js"
          strategy="beforeInteractive"
          data-cfasync="false"
        />
        <Script
          id="ezoic-cmp-2"
          src="https://the.gatekeeperconsent.com/cmp.min.js"
          strategy="beforeInteractive"
          data-cfasync="false"
        />
        <script async src="//www.ezojs.com/ezoic/sa.min.js" />
        <script async src="//ezoicanalytics.com/analytics.js" />
      </head>
      <body className="bg-dark-bg text-slate-100 min-h-screen antialiased">
        <EzoicRouteHandler />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
