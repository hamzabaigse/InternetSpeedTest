'use client';

import React from 'react';
import { DiagnosticResult } from '@/lib/speedTestEngine';
import { generateIspComplaintPdf } from '@/lib/pdfGenerator';
import { Router, ShieldAlert, Cpu, ExternalLink, Zap, FileText, CheckCircle2 } from 'lucide-react';

interface ActionCardsProps {
  result: DiagnosticResult;
  onTabSelect?: (tab: string) => void;
}

export const ActionCards: React.FC<ActionCardsProps> = ({ result, onTabSelect }) => {
  return (
    <div className="w-full space-y-4 my-6">
      <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
        <Zap className="w-4 h-4 text-cyan-400" />
        Free Network Optimization &amp; Fixes
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1: Bufferbloat Fix -> Free Router SQM Settings */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col justify-between hover:border-cyan-500/40 transition">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-center justify-center text-amber-400">
                  <Router className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Fix Bufferbloat Grade ({result.bufferbloatGrade})</h4>
                  <span className="text-[11px] text-amber-400 font-semibold">
                    +{result.bufferbloatDeltaMs} ms Latency Spike under Load
                  </span>
                </div>
              </div>
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                100% Free Fix
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              When heavy downloads occur on your home network, router buffers overflow, causing lag spikes in games and Zoom distortion. <strong>Smart Queue Management (SQM)</strong> resolves bufferbloat automatically.
            </p>
            <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80 mb-4 text-xs space-y-1.5 text-slate-300">
              <div className="font-semibold text-cyan-400 text-[11px]">Free Router Tweaks:</div>
              <div className="flex items-center gap-2 text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Enable QoS / SQM Bandwidth Limit (Cap at 95%)</span>
              </div>
              <div className="flex items-center gap-2 text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Switch DNS to 1.1.1.1 (Cloudflare Free Ultra-Fast DNS)</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onTabSelect && onTabSelect('router')}
            className="w-full bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition border border-slate-700"
          >
            <span>View Free Router &amp; DNS Guide</span>
          </button>
        </div>

        {/* Card 2: ISP Throttling PDF Report (Free Download) */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col justify-between hover:border-cyan-500/40 transition">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 bg-rose-500/10 border border-rose-500/30 rounded-lg flex items-center justify-center text-rose-400">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {result.isThrottlingLikely ? 'ISP Traffic Shaping Detected' : 'Official Throttling Audit'}
                  </h4>
                  <span className="text-[11px] text-rose-400 font-semibold">
                    Multi/Single Ratio: {result.throttlingRatio}x
                  </span>
                </div>
              </div>
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                Free Download
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Generate a formal technical audit summarizing packet loss, latency spikes under load, and contractual speed shortfalls to attach directly to your ISP support ticket or FCC consumer filings.
            </p>
          </div>

          <button
            onClick={() => generateIspComplaintPdf(result)}
            className="w-full bg-gradient-to-r from-rose-600 via-red-600 to-orange-600 hover:from-rose-500 hover:to-orange-500 text-white font-bold text-xs py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition shadow-md"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Download Free Official ISP Complaint Report (PDF)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
