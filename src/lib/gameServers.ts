export interface GameCluster {
  id: string;
  game: string;
  slug: string;
  region: string;
  location: string;
  targetDomain: string;
  typicalPingMs: number;
}

export const GAME_CLUSTERS: GameCluster[] = [
  // Valorant Clusters (Riot)
  { id: 'val-us-east', game: 'Valorant', slug: 'valorant-ping-checker', region: 'US East (N. Virginia)', location: 'Ashburn, VA', targetDomain: 'dynamodb.us-east-1.amazonaws.com', typicalPingMs: 18 },
  { id: 'val-us-west', game: 'Valorant', slug: 'valorant-ping-checker', region: 'US West (Oregon)', location: 'Boardman, OR', targetDomain: 'dynamodb.us-west-2.amazonaws.com', typicalPingMs: 42 },
  { id: 'val-eu-central', game: 'Valorant', slug: 'valorant-ping-checker', region: 'EU Central (Frankfurt)', location: 'Frankfurt, DE', targetDomain: 'dynamodb.eu-central-1.amazonaws.com', typicalPingMs: 85 },
  { id: 'val-ap-tokyo', game: 'Valorant', slug: 'valorant-ping-checker', region: 'Asia Pacific (Tokyo)', location: 'Tokyo, JP', targetDomain: 'dynamodb.ap-northeast-1.amazonaws.com', typicalPingMs: 145 },

  // Fortnite Clusters (Epic / AWS)
  { id: 'fn-us-east', game: 'Fortnite', slug: 'fortnite-packet-loss-diagnostic', region: 'US East (Ohio)', location: 'Columbus, OH', targetDomain: 'ec2.us-east-2.amazonaws.com', typicalPingMs: 22 },
  { id: 'fn-us-central', game: 'Fortnite', slug: 'fortnite-packet-loss-diagnostic', region: 'US Central (Dallas)', location: 'Dallas, TX', targetDomain: 'ec2.us-east-1.amazonaws.com', typicalPingMs: 34 },
  { id: 'fn-eu-west', game: 'Fortnite', slug: 'fortnite-packet-loss-diagnostic', region: 'EU West (London)', location: 'London, UK', targetDomain: 'ec2.eu-west-2.amazonaws.com', typicalPingMs: 92 },

  // Roblox Clusters
  { id: 'rblx-us-central', game: 'Roblox', slug: 'roblox-latency-test', region: 'US Central (Chicago)', location: 'Chicago, IL', targetDomain: 'api.roblox.com', typicalPingMs: 25 },
  { id: 'rblx-us-west', game: 'Roblox', slug: 'roblox-latency-test', region: 'US West (California)', location: 'San Jose, CA', targetDomain: 'roblox.com', typicalPingMs: 48 },

  // Call of Duty Warzone
  { id: 'wz-us-east', game: 'Call of Duty: Warzone', slug: 'packet-loss-warzone', region: 'US East (New Jersey)', location: 'Secaucus, NJ', targetDomain: 'cloudflare.com', typicalPingMs: 20 },
  { id: 'wz-eu-west', game: 'Call of Duty: Warzone', slug: 'packet-loss-warzone', region: 'EU West (Paris)', location: 'Paris, FR', targetDomain: '1.1.1.1', typicalPingMs: 88 },
];
