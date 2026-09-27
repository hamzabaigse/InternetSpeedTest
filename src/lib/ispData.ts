export interface IspInfo {
  slug: string;
  name: string;
  type: 'Fiber' | 'Cable' | '5G Home' | 'DSL';
  advertisedSpeedMbps: number;
  realAverageDownloadMbps: number;
  realAverageUploadMbps: number;
  averageLatencyMs: number;
  peakHourThrottlingPercent: number; // e.g. 18% speed drop between 8PM-11PM
  bufferbloatGrade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  customerRating: number; // out of 5
  pros: string[];
  cons: string[];
  affiliateCompetitorLink?: string;
  affiliateCompetitorName?: string;
}

export interface CityInfo {
  slug: string;
  name: string;
  state: string;
  topIsps: string[];
  avgDownload: number;
  avgUpload: number;
}

export const CITIES_DATA: Record<string, CityInfo> = {
  chicago: {
    slug: 'chicago',
    name: 'Chicago',
    state: 'IL',
    topIsps: ['comcast-xfinity', 'att-fiber', 'verizon-5g'],
    avgDownload: 285.4,
    avgUpload: 98.2,
  },
  'new-york': {
    slug: 'new-york',
    name: 'New York',
    state: 'NY',
    topIsps: ['verizon-fios', 'spectrum', 'astound-broadband'],
    avgDownload: 340.1,
    avgUpload: 210.5,
  },
  'los-angeles': {
    slug: 'los-angeles',
    name: 'Los Angeles',
    state: 'CA',
    topIsps: ['spectrum', 'att-fiber', 'frontier-fiber'],
    avgDownload: 310.8,
    avgUpload: 185.2,
  },
  dallas: {
    slug: 'dallas',
    name: 'Dallas',
    state: 'TX',
    topIsps: ['att-fiber', 'spectrum', 'frontier-fiber'],
    avgDownload: 420.5,
    avgUpload: 380.0,
  },
  seattle: {
    slug: 'seattle',
    name: 'Seattle',
    state: 'WA',
    topIsps: ['centurylink-quantum', 'comcast-xfinity', 'astound-broadband'],
    avgDownload: 305.2,
    avgUpload: 240.6,
  }
};

export const ISP_DATA: Record<string, IspInfo> = {
  'comcast-xfinity': {
    slug: 'comcast-xfinity',
    name: 'Comcast Xfinity',
    type: 'Cable',
    advertisedSpeedMbps: 800,
    realAverageDownloadMbps: 412.5,
    realAverageUploadMbps: 23.4,
    averageLatencyMs: 24,
    peakHourThrottlingPercent: 22.5,
    bufferbloatGrade: 'C',
    customerRating: 3.4,
    pros: ['Widespread availability', 'High peak burst downloads'],
    cons: ['Asymmetric low upload speeds', 'Severe 8PM - 11PM congestion throttling', 'Strict data caps in select states'],
    affiliateCompetitorLink: 'https://att.com/fiber',
    affiliateCompetitorName: 'Switch to AT&T Fiber (Symmetric 1Gbps, Zero Caps)',
  },
  'verizon-fios': {
    slug: 'verizon-fios',
    name: 'Verizon Fios',
    type: 'Fiber',
    advertisedSpeedMbps: 1000,
    realAverageDownloadMbps: 890.2,
    realAverageUploadMbps: 840.6,
    averageLatencyMs: 9,
    peakHourThrottlingPercent: 3.2,
    bufferbloatGrade: 'A+',
    customerRating: 4.6,
    pros: ['Direct 1:1 symmetric fiber', 'Ultra-low jitter & bufferbloat', 'No contract requirements'],
    cons: ['Limited footprint in suburban areas'],
  },
  'att-fiber': {
    slug: 'att-fiber',
    name: 'AT&T Fiber',
    type: 'Fiber',
    advertisedSpeedMbps: 1000,
    realAverageDownloadMbps: 915.0,
    realAverageUploadMbps: 895.4,
    averageLatencyMs: 11,
    peakHourThrottlingPercent: 2.1,
    bufferbloatGrade: 'A',
    customerRating: 4.7,
    pros: ['Unlimited data with zero throttling', 'Ultra-low ping to Twitch/YouTube CDN', 'Includes Wi-Fi 6 Gateway'],
    cons: ['Requires professional optical ONT installation'],
  },
  'spectrum': {
    slug: 'spectrum',
    name: 'Spectrum Broadband',
    type: 'Cable',
    advertisedSpeedMbps: 500,
    realAverageDownloadMbps: 310.4,
    realAverageUploadMbps: 18.2,
    averageLatencyMs: 31,
    peakHourThrottlingPercent: 19.8,
    bufferbloatGrade: 'D',
    customerRating: 3.2,
    pros: ['No contract commitments', 'Free modem rental'],
    cons: ['Poor upload performance for Zoom/Twitch', 'High latency jitter under download load'],
    affiliateCompetitorLink: 'https://t-mobile.com/isp',
    affiliateCompetitorName: 'Check T-Mobile 5G Home Internet ($50/mo Unlimited)',
  },
  't-mobile-5g': {
    slug: 't-mobile-5g',
    name: 'T-Mobile 5G Home Internet',
    type: '5G Home',
    advertisedSpeedMbps: 300,
    realAverageDownloadMbps: 185.3,
    realAverageUploadMbps: 38.6,
    averageLatencyMs: 44,
    peakHourThrottlingPercent: 14.2,
    bufferbloatGrade: 'B',
    customerRating: 4.1,
    pros: ['Ultra fast self-setup in 15 minutes', 'Low monthly cost ($50)', 'No price hikes'],
    cons: ['Cell tower deprioritization during heavy regional cellular load'],
  }
};
