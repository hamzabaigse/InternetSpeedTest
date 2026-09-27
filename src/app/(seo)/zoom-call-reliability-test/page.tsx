import type { Metadata } from 'next';
import PageClient from './PageClient';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://speednethub.com';
const path = '/zoom-call-reliability-test';
const title = 'Zoom Call Reliability Test — Audio Drop Probability Score';
const description = 'Run a 15-second jitter test to calculate your Zoom or Teams call reliability and get an instant Audio Drop Probability score.';

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
