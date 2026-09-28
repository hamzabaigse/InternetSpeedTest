'use client';

import React, { useEffect } from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';

interface AdSlotProps {
  slotType: 'leaderboard' | 'half-page' | 'rectangle' | 'native-card';
  title?: string;
  adSlotId?: string;
  refreshTrigger?: any;
}

export const AdSlot: React.FC<AdSlotProps> = ({ slotType, title, adSlotId }) => {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch {
      // AdSense push safe catch
    }
  }, []);

  if (slotType === 'leaderboard') {
    return (
      <aside aria-label="Advertisement" className="w-full my-6 flex flex-col items-center">
        <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-1 font-semibold">
          Advertisement
        </div>
        <div className="w-full max-w-[970px] min-h-[90px] bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between shadow-inner relative overflow-hidden group gap-3">
          <div className="flex items-center gap-3 sm:gap-4 z-10 w-full sm:w-auto">
            <div className="w-11 h-11 bg-cyan-950/80 border border-cyan-500/40 rounded-lg flex-shrink-0 flex items-center justify-center text-cyan-400 font-bold text-base">
              ISP
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white">Compare Local Broadband &amp; Fiber Deals</span>
                <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-1.5 py-0.5 rounded border border-emerald-500/30">Free</span>
              </div>
              <p className="text-xs text-slate-300">Discover zero-data-cap fiber and gigabit broadband providers in your area.</p>
            </div>
          </div>
          <a
            href="/isp"
            className="z-10 w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-bold px-4 py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition shadow-lg text-center"
          >
            <span>Browse ISP Directory</span>
          </a>
        </div>
      </aside>
    );
  }

  if (slotType === 'half-page') {
    return (
      <aside aria-label="Advertisement" className="w-full min-h-[520px] bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between shadow-xl relative overflow-hidden">
        <div className="text-[10px] uppercase tracking-wider text-slate-500 flex items-center justify-between border-b border-slate-800/80 pb-2 font-semibold">
          <span>Advertisement</span>
          <span className="text-cyan-400 font-semibold">Network Intelligence</span>
        </div>

        <div className="my-auto flex flex-col items-center text-center p-4">
          <div className="w-14 h-14 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg glow-cyan">
            <Sparkles className="w-7 h-7" />
          </div>
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wide">Free Network Diagnostics</span>
          <h3 className="text-base font-bold text-white mt-1">Bypass ISP Throttling &amp; Bufferbloat</h3>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            Eliminate high ping spikes and packet loss across Discord, Zoom, and online games with diagnostic reports and smart router configurations.
          </p>
          <ul className="text-left text-xs text-slate-200 mt-4 space-y-2.5 w-full bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>Full Download &amp; Upload Speed Audit</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>Loaded Latency &amp; Bufferbloat Spikes</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>Official ISP Dispute PDF Reports</span>
            </li>
          </ul>

          <a
            href="/tools/isp-throttling-report"
            className="w-full mt-5 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold text-xs py-3 px-4 rounded-xl shadow-lg transition text-center"
          >
            Generate Free Dispute PDF
          </a>
        </div>

        <div className="text-[11px] text-center text-slate-500 border-t border-slate-800/80 pt-2 font-medium">
          SpeedNetHub • 100% Free Web Diagnostics
        </div>
      </aside>
    );
  }

  return (
    <aside aria-label="Advertisement" className="w-full bg-slate-900/50 border border-slate-800/70 rounded-xl p-4 my-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center text-cyan-400 text-xs font-bold flex-shrink-0">
          FREE
        </div>
        <div>
          <div className="text-xs font-semibold text-white">{title || 'Smart Queue Management (SQM) Free Setup Guide'}</div>
          <p className="text-xs text-slate-300">Eliminate bufferbloat and router queue lag automatically with optimal QoS settings.</p>
        </div>
      </div>
      <a
        href="/about"
        className="text-xs bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold px-4 py-2 rounded-lg border border-slate-700 w-full sm:w-auto text-center"
      >
        Learn More
      </a>
    </aside>
  );
};
