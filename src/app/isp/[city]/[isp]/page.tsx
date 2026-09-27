'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AdSlot } from '@/components/AdSlot';
import { CITIES_DATA, ISP_DATA, IspInfo } from '@/lib/ispData';
import { MapPin, ShieldCheck, AlertTriangle, ExternalLink, Star, ArrowRight, Activity, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function ProgrammaticIspPage() {
  const params = useParams();
  const cityParam = (params?.city as string) || 'chicago';
  const ispParamRaw = (params?.isp as string) || 'comcast-xfinity';

  // Extract clean ISP slug from route parameter
  const cleanIspSlug = Object.keys(ISP_DATA).find((key) => ispParamRaw.includes(key)) || 'comcast-xfinity';
  
  const city = CITIES_DATA[cityParam] || CITIES_DATA['chicago'];
  const isp: IspInfo = ISP_DATA[cleanIspSlug] || ISP_DATA['comcast-xfinity'];

  const [reviews, setReviews] = useState([
    { author: 'Dave M.', rating: 4, comment: 'Speeds are fine during the day, but drops significantly around 9 PM.' },
    { author: 'Sarah K.', rating: 5, comment: 'Switched to Fiber and latency dropped from 35ms to 9ms!' },
  ]);
  const [newComment, setNewComment] = useState('');

  const addReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setReviews([{ author: 'Verified User', rating: 5, comment: newComment }, ...reviews]);
    setNewComment('');
  };

  return (
    <div className="min-h-screen bg-dark-bg text-slate-100 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
        <AdSlot slotType="leaderboard" />

        {/* Hero Banner */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-6 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
                <MapPin className="w-4 h-4" /> {city.name}, {city.state} Broadband Telemetry Hub
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
                {isp.name} Real Speeds &amp; Peak-Hour Throttling in {city.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-2">
                Crowdsourced diagnostic telemetry, bufferbloat grade, and peak-hour bandwidth audit (8 PM – 11 PM).
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center min-w-[160px]">
              <div className="text-[10px] uppercase font-bold text-slate-400">Customer Rating</div>
              <div className="text-2xl font-black text-amber-400 font-mono mt-0.5 flex items-center justify-center gap-1">
                <span>{isp.customerRating}</span>
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              </div>
              <div className="text-[10px] text-slate-500 mt-1">Based on 1,420 tests</div>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-[10px] font-semibold text-slate-400 uppercase">Advertised Speed</span>
              <div className="text-2xl font-black text-white font-mono mt-1">{isp.advertisedSpeedMbps} <span className="text-xs text-slate-400">Mbps</span></div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-[10px] font-semibold text-slate-400 uppercase">Real Avg Download</span>
              <div className="text-2xl font-black text-cyan-400 font-mono mt-1">{isp.realAverageDownloadMbps} <span className="text-xs">Mbps</span></div>
              <div className="text-[10px] text-slate-400 mt-0.5">Upload: {isp.realAverageUploadMbps} Mbps</div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-[10px] font-semibold text-slate-400 uppercase">Peak Throttling</span>
              <div className="text-2xl font-black text-rose-400 font-mono mt-1">{isp.peakHourThrottlingPercent}% <span className="text-xs">drop</span></div>
              <div className="text-[10px] text-slate-400 mt-0.5">8 PM - 11 PM Night Peak</div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-[10px] font-semibold text-slate-400 uppercase">Bufferbloat Grade</span>
              <div className="text-2xl font-black text-emerald-400 font-mono mt-1">{isp.bufferbloatGrade}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Avg Ping: {isp.averageLatencyMs} ms</div>
            </div>
          </div>

          {/* High CPC Direct Telco Competitor Banner */}
          {isp.affiliateCompetitorLink && (
            <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-blue-950 border border-cyan-500/40 rounded-xl p-5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
              <div>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                  Recommended Fiber Alternative in {city.name}
                </span>
                <h4 className="text-base font-bold text-white mt-1">Tired of {isp.name} Peak-Hour Lag Spikes?</h4>
                <p className="text-xs text-slate-300 mt-1">{isp.affiliateCompetitorName}</p>
              </div>
              <a
                href={isp.affiliateCompetitorLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs px-5 py-3 rounded-lg flex items-center gap-1.5 transition shadow-lg shrink-0"
              >
                <span>Check Fiber Availability</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}

          {/* Pros & Cons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Telemetry Positives
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {isp.pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
              <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" /> Measured Downsides
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {isp.cons.map((con, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">•</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* User Reviews & Crowdsourced Feedback Submission Form */}
          <div className="border-t border-slate-800 pt-6">
            <h3 className="text-base font-bold text-white mb-4">
              Crowdsourced User Ratings for {isp.name} in {city.name}
            </h3>

            <form onSubmit={addReview} className="mb-6 flex gap-3">
              <input
                type="text"
                placeholder={`Submit your experience with ${isp.name} in ${city.name}...`}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
              <button
                type="submit"
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs px-4 py-2 rounded-lg transition"
              >
                Submit Review
              </button>
            </form>

            <div className="space-y-3">
              {reviews.map((rev, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white">{rev.author}</span>
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-300">{rev.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <AdSlot slotType="rectangle" title="High-Speed CAT8 Ethernet Cable Deals" />
      </main>

      <Footer />
    </div>
  );
}
