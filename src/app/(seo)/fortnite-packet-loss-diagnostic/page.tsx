import type { Metadata } from 'next';
import PageClient from './PageClient';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://speednethub.com';
const path = '/fortnite-packet-loss-diagnostic';
const title = 'Fortnite Packet Loss Diagnostic — Epic Games Server Ping Test';
const description = "Measure packet loss and latency jitter to Epic Games' Fortnite server clusters and find out what's really causing your gunfight lag.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${baseUrl}${path}` },
  openGraph: {
    title,
    description,
    url: `${baseUrl}${path}`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export default function Page() {
  return <PageClient />;
}
