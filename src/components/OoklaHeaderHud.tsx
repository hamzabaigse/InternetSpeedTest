'use client';

import React from 'react';
import { ArrowDownCircle, ArrowUpCircle, Zap, Globe, Gamepad2, Tv, Video } from 'lucide-react';
import { CategoryScores } from '@/lib/speedTestEngine';

interface OoklaHeaderHudProps {
  downloadMbps?: number;
  uploadMbps?: number;
  idlePingMs?: number;
  downloadLoadedPingMs?: number;
  uploadLoadedPingMs?: number;
  categoryScores?: CategoryScores;
  isTesting: boolean;
  activePhase?: 'download' | 'upload' | 'ping' | 'other';
  liveGaugeValMbps?: number;
  unitMode?: 'Mbps' | 'MBps';
}

export const OoklaHeaderHud: React.FC<OoklaHeaderHudProps> = ({
  downloadMbps,
  uploadMbps,
  idlePingMs,
  downloadLoadedPingMs,
  uploadLoadedPingMs,
  categoryScores = { webBrowsingDots: 5, gamingDots: 5, videoStreamingDots: 5, videoCallingDots: 5 },
  isTesting,
  activePhase,
  liveGaugeValMbps = 0,
  unitMode = 'Mbps',
}) => {
  const isMBps = unitMode === 'MBps';
  const unitLabel = isMBps ? 'MB/s' : 'Mbps';

  // Format helper
  const fmt = (valMbps?: number) => {
    if (valMbps === undefined) return '--.--';
    const finalVal = isMBps ? valMbps / 8 : valMbps;
    return finalVal.toFixed(2);
  };

  const liveValFormatted = (isMBps ? liveGaugeValMbps / 8 : liveGaugeValMbps).toFixed(2);

  const displayDownload = downloadMbps !== undefined 
    ? fmt(downloadMbps) 
    : (isTesting && activePhase === 'download' ? liveValFormatted : '--.--');

  const displayUpload = uploadMbps !== undefined 
    ? fmt(uploadMbps) 
    : (isTesting && activePhase === 'upload' ? liveValFormatted : '--.--');

  const renderDots = (count: number) => (
    <div className="flex items-center justify-center gap-1 mt-1">
      {[1, 2, 3, 4, 5].map((dot) => (
        <span
          key={dot}
          className={`w-1.5 h-1.5 rounded-full ${
            dot <= count ? 'bg-emerald-400 glow-emerald' : 'bg-slate-700'
          }`}
        />
      ))}
    </div>
  );

  return (
    <div className="w-full bg-slate-950/90 border border-slate-800/90 rounded-2xl p-3 sm:p-6 mb-4 sm:mb-6 shadow-2xl">
      {/* Header Numbers (DOWNLOAD, UPLOAD, PING) - Compact Side-by-Side Row on Mobile */}
      <div className="grid grid-cols-3 gap-1.5 sm:gap-6 items-center border-b border-slate-800/80 pb-3 sm:pb-6 mb-3 sm:mb-6 text-center">
        {/* DOWNLOAD */}
        <div className={`flex flex-col items-center p-1.5 sm:p-2 rounded-xl transition ${
          activePhase === 'download' ? 'bg-cyan-950/60 border border-cyan-500/40 glow-cyan' : ''
        }`}>
          <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-cyan-400">
            <ArrowDownCircle className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 ${activePhase === 'download' ? 'animate-bounce' : ''}`} />
            <span className="hidden xs:inline sm:inline">DOWNLOAD</span>
            <span className="xs:hidden sm:hidden">DOWN</span>
            <span className="text-xs text-cyan-300 font-mono font-semibold">({unitLabel})</span>
          </div>
          <div className="text-xl sm:text-5xl font-black text-white font-mono tabular-nums mt-0.5 sm:mt-1 tracking-tight">
            {displayDownload}
          </div>
        </div>

        {/* UPLOAD */}
        <div className={`flex flex-col items-center p-1.5 sm:p-2 rounded-xl transition ${
          activePhase === 'upload' ? 'bg-purple-950/60 border border-purple-500/40' : ''
        }`}>
          <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-purple-400">
            <ArrowUpCircle className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400 ${activePhase === 'upload' ? 'animate-bounce' : ''}`} />
            <span className="hidden xs:inline sm:inline">UPLOAD</span>
            <span className="xs:hidden sm:hidden">UP</span>
            <span className="text-xs text-purple-300 font-mono font-semibold">({unitLabel})</span>
          </div>
          <div className="text-xl sm:text-5xl font-black text-white font-mono tabular-nums mt-0.5 sm:mt-1 tracking-tight">
            {displayUpload}
          </div>
        </div>

        {/* PING */}
        <div className="flex flex-col items-center p-1.5 sm:p-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-0.5 sm:mb-1">
            Ping <span className="text-xs lowercase text-slate-400 font-semibold">(ms)</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 sm:gap-4 text-xs sm:text-sm font-mono font-bold">
            <div className="flex items-center gap-0.5 text-amber-400">
              <Zap className="w-3.5 h-3.5 fill-amber-400" />
              <span>{idlePingMs !== undefined ? idlePingMs : '--'}</span>
            </div>
            <div className="flex items-center gap-0.5 text-cyan-400">
              <ArrowDownCircle className="w-3.5 h-3.5" />
              <span>{downloadLoadedPingMs !== undefined ? downloadLoadedPingMs : '--'}</span>
            </div>
            <div className="flex items-center gap-0.5 text-purple-400">
              <ArrowUpCircle className="w-3.5 h-3.5" />
              <span>{uploadLoadedPingMs !== undefined ? uploadLoadedPingMs : '--'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ookla-Style Category Readiness Icons */}
      <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-xl mx-auto text-center">
        <div className="flex flex-col items-center p-2 rounded-xl bg-slate-900/60 border border-slate-800/60">
          <Globe className="w-5 h-5 text-cyan-400" />
          <span className="text-xs font-semibold text-slate-200 mt-1 hidden sm:inline">Web Browsing</span>
          {renderDots(categoryScores.webBrowsingDots)}
        </div>

        <div className="flex flex-col items-center p-2 rounded-xl bg-slate-900/60 border border-slate-800/60">
          <Gamepad2 className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-semibold text-slate-200 mt-1 hidden sm:inline">Online Gaming</span>
          {renderDots(categoryScores.gamingDots)}
        </div>

        <div className="flex flex-col items-center p-2 rounded-xl bg-slate-900/60 border border-slate-800/60">
          <Tv className="w-5 h-5 text-red-400" />
          <span className="text-xs font-semibold text-slate-200 mt-1 hidden sm:inline">4K Video</span>
          {renderDots(categoryScores.videoStreamingDots)}
        </div>

        <div className="flex flex-col items-center p-2 rounded-xl bg-slate-900/60 border border-slate-800/60">
          <Video className="w-5 h-5 text-purple-400" />
          <span className="text-xs font-semibold text-slate-200 mt-1 hidden sm:inline">Video Calls</span>
          {renderDots(categoryScores.videoCallingDots)}
        </div>
      </div>
    </div>
  );
};
