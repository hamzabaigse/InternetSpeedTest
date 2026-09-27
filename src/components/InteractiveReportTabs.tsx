'use client';

import React, { useState } from 'react';
import { DiagnosticResult } from '@/lib/speedTestEngine';
import { Activity, Tv, Gamepad2, Wrench, AlertCircle } from 'lucide-react';
import { ActionCards } from './ActionCards';

interface ReportTabsProps {
  result: DiagnosticResult;
  onTabChange?: (tab: string) => void;
}

export const InteractiveReportTabs: React.FC<ReportTabsProps> = ({ result, onTabChange }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'streaming' | 'gaming' | 'router'>('overview');

  const handleTabClick = (tab: 'overview' | 'streaming' | 'gaming' | 'router') => {
    setActiveTab(tab);
    if (onTabChange) onTabChange(tab);
  };

  return (
    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-6 shadow-2xl my-6">
      {/* Tab Navigation Header */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3 mb-6">
        <button
          onClick={() => handleTabClick('overview')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition ${
            activeTab === 'overview'
              ? 'bg-cyan-500 text-slate-950 shadow-md glow-cyan'
              : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Diagnostic Overview</span>
        </button>

        <button
          onClick={() => handleTabClick('streaming')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition ${
            activeTab === 'streaming'
              ? 'bg-cyan-500 text-slate-950 shadow-md glow-cyan'
              : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Tv className="w-4 h-4" />
          <span>YouTube / 4K Streaming</span>
        </button>

        <button
          onClick={() => handleTabClick('gaming')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition ${
            activeTab === 'gaming'
              ? 'bg-cyan-500 text-slate-950 shadow-md glow-cyan'
              : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Gamepad2 className="w-4 h-4" />
          <span>Game Latency Matrix</span>
        </button>

        <button
          onClick={() => handleTabClick('router')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition ${
            activeTab === 'router'
              ? 'bg-cyan-500 text-slate-950 shadow-md glow-cyan'
              : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Wrench className="w-4 h-4" />
          <span>Router Tweaks &amp; DNS</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-[10px] font-semibold text-slate-400 uppercase">Download Speed</span>
              <div className="text-2xl font-black text-white font-mono mt-1">{result.downloadMBps} <span className="text-xs text-cyan-400">MB/s</span></div>
              <div className="text-[10px] text-slate-400 mt-1">({result.downloadMbps} Megabits/s)</div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-[10px] font-semibold text-slate-400 uppercase">Upload Speed</span>
              <div className="text-2xl font-black text-white font-mono mt-1">{result.uploadMBps} <span className="text-xs text-purple-400">MB/s</span></div>
              <div className="text-[10px] text-slate-400 mt-1">({result.uploadMbps} Megabits/s)</div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-[10px] font-semibold text-slate-400 uppercase">Idle Ping</span>
              <div className="text-2xl font-black text-white font-mono mt-1">{result.idlePingMs} <span className="text-xs text-amber-400">ms</span></div>
              <div className="text-[10px] text-slate-400 mt-1">Jitter: {result.jitterMs} ms</div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-[10px] font-semibold text-slate-400 uppercase">Bufferbloat Grade</span>
              <div className="text-2xl font-black text-cyan-400 font-mono mt-1">{result.bufferbloatGrade}</div>
              <div className="text-[10px] text-slate-400 mt-1">+{result.bufferbloatDeltaMs} ms under load</div>
            </div>
          </div>

          <ActionCards result={result} onTabSelect={(tab) => handleTabClick(tab as any)} />
        </div>
      )}

      {/* TAB 2: STREAMING */}
      {activeTab === 'streaming' && (
        <div className="space-y-4">
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Tv className="w-5 h-5 text-cyan-400" />
                <h4 className="text-sm font-bold text-white">YouTube &amp; 4K CDN Buffer Telemetry</h4>
              </div>
              <span className="bg-cyan-500/20 text-cyan-300 text-xs font-bold px-2.5 py-1 rounded border border-cyan-500/30">
                {result.youtube4kStatus}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Raw speed does not guarantee smooth 4K streaming if your ISP has congested peering with Google YouTube CDN endpoints.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-900/60 p-4 rounded-lg border border-slate-800">
              <div>
                <span className="text-[11px] text-slate-400">YouTube CDN Speed:</span>
                <div className="text-lg font-bold text-cyan-400 font-mono">{result.youtubeCdnSpeedMBps} MB/s</div>
              </div>
              <div>
                <span className="text-[11px] text-slate-400">4K Buffer Refill Rate:</span>
                <div className="text-lg font-bold text-emerald-400 font-mono">{result.youtube4kBufferRatio}x real-time</div>
              </div>
              <div>
                <span className="text-[11px] text-slate-400">4K Playback Verdict:</span>
                <div className="text-xs font-semibold text-white mt-1">
                  {result.youtube4kBufferRatio >= 2.0 ? 'Zero Buffering (Instant Seek)' : 'May require lowering to 1080p'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: GAMING MATRIX */}
      {activeTab === 'gaming' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Gamepad2 className="w-4 h-4 text-emerald-400" />
              Regional Game Server Latency Matrix (Probed via AWS/Riot)
            </h4>
            <span className="text-[11px] text-slate-400 font-mono">Real-time Ping</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {result.gamePings?.map((item, idx) => (
              <div key={idx} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">{item.cluster.game}</div>
                  <div className="text-[11px] text-slate-400">{item.cluster.region} ({item.cluster.location})</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold font-mono text-cyan-400">{item.pingMs} ms</div>
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                    item.status === 'Optimal' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: ROUTER TWEAKS */}
      {activeTab === 'router' && (
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Wrench className="w-4 h-4 text-cyan-400" />
            Recommended Router &amp; DNS Tweaks for Faster Speeds
          </h4>

          <div className="space-y-3">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="text-xs font-bold text-cyan-400 mb-1">1. Change Default ISP DNS to Cloudflare / Google</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                ISP default DNS servers are frequently slow and store browsing logs. Change your router DNS to Cloudflare (1.1.1.1 / 1.0.0.1) or Google (8.8.8.8) for 20-30% faster initial page load times.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="text-xs font-bold text-cyan-400 mb-1">2. Enable SQM (Smart Queue Management) or QoS</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Log into your router admin panel, navigate to Quality of Service (QoS), and cap upload/download at 95% of your measured MB/s speeds to eliminate bufferbloat spikes.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
