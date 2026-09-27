import type { Metadata } from 'next';
import PageClient from './PageClient';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://speednethub.com';
const path = '/isp';
const title = 'ISP Comparison Directory — Real Speeds & Throttling by City';
const description = 'Browse real-world download speeds, peak-hour throttling stats, and bufferbloat grades for top ISPs across major U.S. cities.';

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
