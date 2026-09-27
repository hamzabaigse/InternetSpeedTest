import React from 'react';

export const SeoSchema: React.FC = () => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://speednethub.com';

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'SpeedNetHub — SEO Network Diagnostic & ISP Intelligence Hub',
    url: baseUrl,
    description: 'Free Search-Engine-Optimized Network Diagnostic Hub measuring download/upload throughput, YouTube 4K CDN buffer rates, bufferbloat, and game datacenters.',
    applicationCategory: 'NetworkingApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'USD',
    },
    featureList: [
      'Sequential Download & Upload Speed Test in Mbps and MB/s',
      'YouTube 4K CDN Buffer Refill Rate Inspection',
      'Bufferbloat Latency Spike Audit',
      'Exportable Official ISP Complaint PDF Report',
      'Riot Valorant & Epic Fortnite Game Datacenter Latency Map',
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the difference between Megabits per second (Mbps) and Megabytes per second (MB/s)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Internet Service Providers (ISPs) advertise plans in Megabits per second (Mbps). Files on your device are measured in Megabytes per second (MB/s). 1 Byte equals 8 bits. A 100 Mbps internet plan delivers a maximum file download speed of 12.5 MB/s.',
        },
      },
      {
        '@type': 'Question',
        name: 'What causes YouTube video buffering on high-speed internet connections?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'YouTube buffering is often caused by ISP peering congestion to Google Video CDN edge nodes or router Bufferbloat under concurrent network load, rather than a lack of raw download bandwidth.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I generate an official ISP throttling complaint report?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use our free ISP Throttling Audit Tool to measure single-stream versus multi-stream parity and click "Export Free Complaint PDF" to download a document formatted for ISP support tickets and FCC filings.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
};
