'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AdSlot } from '@/components/AdSlot';
import { MapPin, Globe, ArrowRight, ShieldCheck } from 'lucide-react';
import { CITIES_DATA, ISP_DATA } from '@/lib/ispData';

export default function IspDirectoryIndexPage() {
  return (
    <div className="min-h-screen bg-dark-bg text-slate-100 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
        <AdSlot slotType="leaderboard" />

        <div className="text-center my-6">
          <div className="inline-flex items-center gap-2 bg-amber-950/80 border border-amber-500/30 text-amber-300 text-xs font-semibold px-3 py-1 rounded-full mb-3">
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span>Crowdsourced Broadband Telemetry Index</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Programmatic ISP Comparison & City Real-Speed Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto mt-2">
            Explore real-world speeds, peak-hour throttling statistics (8 PM - 11 PM), and customer latency benchmarks across top ISPs and cities.
          </p>
        </div>

        {/* Cities Section */}
        <div className="my-8">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-cyan-400" /> Top Metros & City Indices
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.values(CITIES_DATA).map((city) => (
              <div key={city.slug} className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 hover:border-cyan-500/40 transition">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-bold text-white">{city.name}, {city.state}</h3>
                  <span className="text-[10px] bg-cyan-500/20 text-cyan-300 font-bold px-2 py-0.5 rounded">
                    Avg {city.avgDownload} Mbps
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-4">Top providers: {city.topIsps.join(', ')}</p>

                <div className="space-y-1.5">
                  {city.topIsps.map((ispSlug) => {
                    const isp = ISP_DATA[ispSlug];
                    if (!isp) return null;
                    return (
                      <Link
                        key={ispSlug}
                        href={`/isp/${city.slug}/${ispSlug}-review-real-speeds`}
                        className="flex items-center justify-between text-xs text-slate-300 hover:text-cyan-400 py-1 border-b border-slate-800/60 transition"
                      >
                        <span>{isp.name}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ISP Overview Grid */}
        <div className="my-8">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-emerald-400" /> Broadband Providers Network Telemetry
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.values(ISP_DATA).map((isp) => (
              <div key={isp.slug} className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-bold text-white">{isp.name}</h3>
                  <span className="text-xs bg-slate-800 text-slate-300 font-mono font-bold px-2 py-0.5 rounded">
                    {isp.type}
                  </span>
                </div>
                <div className="text-xs text-slate-400 space-y-1 my-3">
                  <div>Avg Real Speed: <strong className="text-white">{isp.realAverageDownloadMbps} Mbps down / {isp.realAverageUploadMbps} Mbps up</strong></div>
                  <div>Bufferbloat Grade: <strong className="text-cyan-400">{isp.bufferbloatGrade}</strong></div>
                  <div>Peak-Hour Throttling: <strong className="text-rose-400">{isp.peakHourThrottlingPercent}% drop</strong></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <AdSlot slotType="rectangle" title="Find Alternative Fiber & 5G Home Internet Providers Near You" />
      </main>

      <Footer />
    </div>
  );
}
