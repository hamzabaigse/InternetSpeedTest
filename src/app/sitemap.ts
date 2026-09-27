import { MetadataRoute } from 'next';
import { CITIES_DATA, ISP_DATA } from '@/lib/ispData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://speednethub.com';

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/test-youtube-4k-streaming-speed`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/zoom-call-reliability-test`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/can-i-stream-on-twitch-calculator`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/valorant-ping-checker`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/roblox-latency-test`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/fortnite-packet-loss-diagnostic`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/isp`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/tools/isp-throttling-report`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/tools/youtube-inspector`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/tools/wfh-stability-score`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/background-monitor`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
  ];

  // Programmatic ISP City Routes (e.g. /isp/chicago/comcast-xfinity-review-real-speeds)
  const ispRoutes: MetadataRoute.Sitemap = [];
  Object.keys(CITIES_DATA).forEach((cityKey) => {
    Object.keys(ISP_DATA).forEach((ispKey) => {
      ispRoutes.push({
        url: `${baseUrl}/isp/${cityKey}/${ispKey}-review-real-speeds`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.85,
      });
    });
  });

  return [...staticRoutes, ...ispRoutes];
}
