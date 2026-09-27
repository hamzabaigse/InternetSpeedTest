import type { Metadata } from 'next';
import './globals.css';
import { SeoSchema } from '@/components/SeoSchema';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://speednethub.com';

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
      </head>
      <body className="bg-dark-bg text-slate-100 min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
