'use client';

import React, { useEffect, useState } from 'react';
import { Sparkles, ExternalLink, CheckCircle2 } from 'lucide-react';

interface AdSlotProps {
  slotType: 'leaderboard' | 'half-page' | 'rectangle' | 'native-card';
  title?: string;
  refreshTrigger?: any;
}

export const AdSlot: React.FC<AdSlotProps> = ({ slotType, title, refreshTrigger }) => {
  const [refreshCount, setRefreshCount] = useState(1);

  useEffect(() => {
    if (refreshTrigger !== undefined) {
      setRefreshCount(prev => prev + 1);
    }
  }, [refreshTrigger]);

  if (slotType === 'leaderboard') {
    return (
      <aside aria-label="Sponsored Content" className="w-full my-4 flex flex-col items-center">
        <div className="text-xs uppercase tracking-widest text-slate-400 mb-1 flex items-center gap-1 font-semibold">
          <span>Sponsored Ad</span>
          <span className="text-slate-400">• Refresh Unit #{refreshCount}</span>
        </div>
        <div className="w-full max-w-[970px] min-h-[90px] bg-slate-900/90 border border-slate-800 rounded-lg p-3 flex flex-col sm:flex-row items-center justify-between shadow-inner relative overflow-hidden group gap-3">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-blue-500/10 pointer-events-none" />
          <div className="flex items-center gap-3 sm:gap-4 z-10 w-full sm:w-auto">
            <div className="w-12 h-12 bg-cyan-950/80 border border-cyan-500/40 rounded-md flex-shrink-0 flex items-center justify-center text-cyan-400 font-bold text-lg">
              5G
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white">Compare Local Broadband &amp; Fiber Deals</span>
                <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-1.5 py-0.5 rounded border border-emerald-500/30">Free</span>
              </div>
              <p className="text-xs text-slate-300">Zero data caps, 1 Gbps symmetric fiber options in your area.</p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Check local fiber availability"
            className="z-10 w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-bold px-4 py-2.5 rounded-md flex items-center justify-center gap-1.5 transition shadow-lg"
          >
            <span>Check Availability</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </aside>
    );
  }

  if (slotType === 'half-page') {
    return (
      <aside aria-label="Sponsored Promotion" className="w-full min-h-[580px] bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between shadow-xl relative overflow-hidden">
        <div className="text-xs uppercase tracking-widest text-slate-400 flex items-center justify-between border-b border-slate-800/80 pb-2 font-semibold">
          <span>High-CPM Banner (300x600)</span>
          <span className="text-emerald-400 font-bold">100% Free Tool</span>
        </div>

        <div className="my-auto flex flex-col items-center text-center p-4">
          <div className="w-16 h-16 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg glow-cyan">
            <Sparkles className="w-8 h-8" />
          </div>
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wide">Free Network Optimization</span>
          <h3 className="text-lg font-bold text-white mt-1">Bypass ISP Peering Lag Spikes</h3>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            Learn how to fix high ping, bufferbloat, and packet loss on Valorant, Warzone &amp; Fortnite using free open-source DNS settings and router SQM tweaks.
          </p>
          <ul className="text-left text-xs text-slate-200 mt-4 space-y-2 w-full bg-slate-950/60 p-3 rounded-lg border border-slate-800">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>100% Free Unlimited Speed Testing</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Zero Account Registration Required</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Free FCC Complaint PDF Reports</span>
            </li>
          </ul>

          <a
            href="/tools/isp-throttling-report"
            aria-label="Export Free Complaint PDF"
            className="w-full mt-6 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold text-xs py-3 px-4 rounded-xl shadow-lg transition text-center"
          >
            Export Free Complaint PDF
          </a>
        </div>

        <div className="text-xs text-center text-slate-400 border-t border-slate-800/80 pt-2 font-medium">
          SpeedNetHub • 100% Free &amp; Ad-Supported Platform
        </div>
      </aside>
    );
  }

  return (
    <aside aria-label="Sponsored Recommendation" className="w-full bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 my-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-cyan-400 text-xs font-bold flex-shrink-0">
          FREE
        </div>
        <div>
          <div className="text-xs font-semibold text-white">{title || 'Smart Queue Management (SQM) Free Setup Guide'}</div>
          <p className="text-xs text-slate-300">Eliminate bufferbloat and router queue lag automatically with free settings.</p>
        </div>
      </div>
      <button
        type="button"
        aria-label="Read free network guide"
        className="text-xs bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold px-4 py-2 rounded-lg border border-slate-700 w-full sm:w-auto"
      >
        Read Free Guide
      </button>
    </aside>
  );
};
