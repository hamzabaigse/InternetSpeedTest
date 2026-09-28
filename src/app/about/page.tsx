import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Info, Mail, ShieldCheck, Zap, Globe, Cpu } from 'lucide-react';
import Link from 'next/link';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://speed-net.online';
const title = 'About Us & Contact';
const description = 'Learn more about SpeedNetHub, our network diagnostic methodology, and contact information.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${baseUrl}/about` },
  openGraph: { title, description, url: `${baseUrl}/about`, type: 'website' },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-dark-bg text-slate-100 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 bg-cyan-500/10 border border-cyan-500/30 rounded-xl flex items-center justify-center text-cyan-400 shrink-0">
            <Info className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">About SpeedNetHub</h1>
            <p className="text-xs text-slate-400 mt-1">Free, Transparent Network Telemetry &amp; ISP Intelligence</p>
          </div>
        </div>

        <div className="space-y-6 text-sm text-slate-300 leading-relaxed bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <section>
            <h2 className="text-white font-bold text-lg mb-2">Our Mission</h2>
            <p>
              SpeedNetHub was founded to provide everyday consumers, gamers, and remote professionals with 100% free,
              unbiased, and transparent network intelligence. While conventional speed tests only check raw burst download speed,
              SpeedNetHub analyzes real-world quality metrics including <strong>bufferbloat latency spikes under load</strong>,
              <strong>YouTube 4K CDN buffer rates</strong>, <strong>VoIP jitter distortion</strong>, and <strong>game server ping matrixes</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-2">Testing Methodology</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2 text-cyan-400 font-bold mb-1">
                  <Globe className="w-4 h-4" />
                  <span>Anycast Global Edge</span>
                </div>
                <p className="text-xs text-slate-300">
                  We route traffic through distributed anycast edge datacenters across 330+ cities worldwide to measure your true
                  local line speed without bottlenecking on overloaded origin servers.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1">
                  <Cpu className="w-4 h-4" />
                  <span>Wire-Level Packet Streaming</span>
                </div>
                <p className="text-xs text-slate-300">
                  Using browser ReadableStreams, we sample bytes in rolling 150ms slices and apply TCP slow-start filters to calculate
                  accurate 85th-percentile sustained throughput.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-2">Our Tools</h2>
            <p className="mb-3">
              In addition to our full 40-second comprehensive diagnostic, we maintain specialized testing tools:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-300">
              <li><Link href="/test-youtube-4k-streaming-speed" className="text-cyan-400 hover:underline">YouTube 4K Streaming Speed Test</Link></li>
              <li><Link href="/zoom-call-reliability-test" className="text-cyan-400 hover:underline">Zoom &amp; VoIP Reliability Checker</Link></li>
              <li><Link href="/valorant-ping-checker" className="text-cyan-400 hover:underline">Valorant, Roblox &amp; Fortnite Gaming Latency Checkers</Link></li>
              <li><Link href="/tools/isp-throttling-report" className="text-cyan-400 hover:underline">ISP Traffic Shaping Audit &amp; PDF Complaint Generator</Link></li>
              <li><Link href="/isp" className="text-cyan-400 hover:underline">Local ISP Comparison &amp; Crowdsourced Speed Directory</Link></li>
            </ul>
          </section>

          <section className="border-t border-slate-800 pt-6">
            <h2 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
              <Mail className="w-5 h-5 text-cyan-400" />
              <span>Contact Us</span>
            </h2>
            <p className="mb-4">
              Have feedback, questions about our diagnostic calculations, or inquiries regarding ISP directory listings?
              We are here to help.
            </p>
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
              <div>
                <span className="text-xs text-slate-400 font-semibold uppercase">Email Inquiries:</span>
                <div className="text-base font-bold text-white font-mono mt-0.5">
                  <a href="mailto:support@speed-net.online" className="text-cyan-400 hover:underline">
                    support@speed-net.online
                  </a>
                </div>
              </div>
              <div className="text-xs text-slate-400">
                Response time: Within 24-48 business hours.
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
