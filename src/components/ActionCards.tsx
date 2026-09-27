'use client';

import React from 'react';
import { DiagnosticResult } from '@/lib/speedTestEngine';
import { generateIspComplaintPdf } from '@/lib/pdfGenerator';
import { Router, ShieldAlert, Cpu, ExternalLink, Zap, WifiOff, FileText, CheckCircle2 } from 'lucide-react';

interface ActionCardsProps {
  result: DiagnosticResult;
  onTabSelect?: (tab: string) => void;
}

export const ActionCards: React.FC<ActionCardsProps> = ({ result, onTabSelect }) => {
  return (
    <div className="w-full space-y-4 my-6">
      <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
        <Zap className="w-4 h-4 text-cyan-400" />
        Contextual Network Optimization Cards (High Intent)
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1: Bufferbloat Fix -> SQM Router */}
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
              <span className="bg-amber-500/10 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-500/30">
                Action Required
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              When someone streams video or downloads files on your home network, your router queue overflows, causing massive lag spikes in games and Zoom distortion. <strong>Smart Queue Management (SQM)</strong> resolves bufferbloat automatically.
            </p>
            <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80 mb-4 text-xs space-y-1.5 text-slate-300">
              <div className="font-semibold text-cyan-400 text-[11px]">Recommended SQM Gaming Routers:</div>
              <div className="flex items-center gap-2 text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Asus RT-AX88U Pro (Cake SQM Built-in)</span>
              </div>
              <div className="flex items-center gap-2 text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>GL.iNet Beryl AX (OpenWrt Travel & Home SQM)</span>
              </div>
            </div>
          </div>

          <a
            href="https://amazon.com/dp/B0B7CM2776?tag=speednethub-20"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold text-xs py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition shadow-md"
          >
            <span>View SQM Routers on Amazon</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Card 2: ISP Peering & Throttling Fix -> Gaming VPN & PDF Report */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col justify-between hover:border-cyan-500/40 transition">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 bg-rose-500/10 border border-rose-500/30 rounded-lg flex items-center justify-center text-rose-400">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {result.isThrottlingLikely ? 'ISP Traffic Shaping Detected' : 'Optimize Peering Routes'}
                  </h4>
                  <span className="text-[11px] text-rose-400 font-semibold">
                    Multi/Single Ratio: {result.throttlingRatio}x
                  </span>
                </div>
              </div>
              <span className="bg-rose-500/10 text-rose-400 text-[10px] font-bold px-2 py-0.5 rounded border border-rose-500/30">
                Throttling Audit
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Your single-stream speed is significantly lower than multi-stream throughput. This occurs when your ISP limits bandwidth to high-traffic video or gaming ports during peak evening hours (8 PM - 11 PM).
            </p>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <button
                onClick={() => generateIspComplaintPdf(result)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold p-2.5 rounded-lg border border-slate-700 flex items-center gap-1.5 justify-center transition"
              >
                <FileText className="w-3.5 h-3.5 text-rose-400" />
                <span>Export PDF Evidence</span>
              </button>

              <a
                href="https://exitlag.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 hover:bg-slate-700 text-cyan-300 text-[11px] font-semibold p-2.5 rounded-lg border border-slate-700 flex items-center gap-1.5 justify-center transition"
              >
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                <span>Try ExitLag (Bypass ISP)</span>
              </a>
            </div>
          </div>

          <button
            onClick={() => generateIspComplaintPdf(result)}
            className="w-full bg-gradient-to-r from-rose-600 to-red-700 hover:from-rose-500 hover:to-red-600 text-white font-bold text-xs py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition shadow-md"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Download Official ISP Complaint Report (PDF)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
