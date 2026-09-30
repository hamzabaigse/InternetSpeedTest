import React from 'react';
import Script from 'next/script';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { SeoSchema } from '@/components/SeoSchema';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://speed-net.online';
const adsensePubId = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID || 'ca-pub-1967995859234566';

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
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <script
          async
          custom-element="amp-auto-ads"
          src="https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js"
        />
        {adsensePubId && adsensePubId !== 'ca-pub-0000000000000000' && (
          <>
            <meta name="google-adsense-account" content={adsensePubId.startsWith('ca-') ? adsensePubId : `ca-${adsensePubId}`} />
            <script
              async
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsensePubId.startsWith('ca-') ? adsensePubId : `ca-${adsensePubId}`}`}
              crossOrigin="anonymous"
            />
          </>
        )}
      </head>
      <body className="bg-dark-bg text-slate-100 min-h-screen antialiased">
        {adsensePubId && adsensePubId !== 'ca-pub-0000000000000000' && (
          React.createElement('amp-auto-ads', {
            type: 'adsense',
            'data-ad-client': adsensePubId.startsWith('ca-') ? adsensePubId : `ca-${adsensePubId}`,
          })
        )}
        {children}
        <Analytics />
      </body>
    </html>
  );
}
