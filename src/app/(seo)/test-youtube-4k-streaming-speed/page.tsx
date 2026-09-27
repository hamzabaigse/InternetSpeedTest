import type { Metadata } from 'next';
import PageClient from './PageClient';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://speednethub.com';
const path = '/test-youtube-4k-streaming-speed';
const title = 'YouTube 4K Streaming Speed Test — CDN Buffer Rate Checker';
const description = 'Test real throughput to Google Video CDN edge nodes and find out if your connection can handle 4K 60fps YouTube without buffering.';

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
