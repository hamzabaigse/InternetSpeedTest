import type { Metadata } from 'next';
import PageClient from './PageClient';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://speednethub.com';
const path = '/roblox-latency-test';
const title = 'Roblox Latency Test — Live Ping & Rubberbanding Checker';
const description = 'Test live latency to Roblox game cluster endpoints and catch rubberbanding or lag spikes before they ruin your session. Free and instant.';

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
