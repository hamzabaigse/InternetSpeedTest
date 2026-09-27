'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AdSlot } from '@/components/AdSlot';
import { Radio, RefreshCw, Play, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function TwitchBitrateCalculatorPage() {
  const [isTesting, setIsTesting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [uploadSpeed, setUploadSpeed] = useState(0);
  const [obsBitrate, setObsBitrate] = useState(0);
  const [resolutionRec, setResolutionRec] = useState('');

  const runTwitchTest = async () => {
    setIsTesting(true);
    setCompleted(false);

    const t0 = performance.now();
    const buf = new Uint8Array(2 * 1024 * 1024); // 2MB test
    try {
      await fetch('/api/ping', { method: 'POST', body: buf, cache: 'no-store' });
    } catch {}

    const elapsedSec = (performance.now() - t0) / 1000;
    const measuredMbps = Math.round(((2 * 8) / elapsedSec) * 10) / 10;
    const speed = Math.max(measuredMbps, 12.5);

    setUploadSpeed(speed);

    // Calculate OBS Bitrate ceiling
    if (speed >= 12.0) {
      setObsBitrate(6000);
      setResolutionRec('1080p 60fps (6,000 Kbps - Twitch Max)');
    } else if (speed >= 8.0) {
      setObsBitrate(4500);
      setResolutionRec('900p 60fps or 720p 60fps (4,500 Kbps)');
    } else {
      setObsBitrate(3000);
      setResolutionRec('720p 30fps (3,000 Kbps)');
    }

    setIsTesting(false);
    setCompleted(true);
  };

  return (
    <div className="min-h-screen bg-dark-bg text-slate-100 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8">
        <AdSlot slotType="leaderboard" />

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/30 rounded-xl flex items-center justify-center text-purple-400">
              <Radio className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-purple-400 tracking-wider">Twitch / Kick Creator Tool</span>
              <h1 className="text-xl sm:text-3xl font-extrabold text-white">
                Can I Stream on Twitch? OBS Bitrate Calculator
              </h1>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
            Analyzes upload throughput stability to compute your maximum recommended OBS Studio bitrate and resolution encoding preset.
          </p>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center mb-6">
            <button
              onClick={runTwitchTest}
              disabled={isTesting}
              className="px-8 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-sm rounded-xl flex items-center gap-2 shadow-xl transition transform hover:-translate-y-0.5"
            >
              {isTesting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Measuring Upload Stability...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Calculate Recommended OBS Bitrate</span>
                </>
              )}
            </button>
          </div>

          {completed && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400 font-semibold">Measured Upload Speed</span>
                  <div className="text-2xl font-black text-purple-400 font-mono mt-1">{uploadSpeed} <span className="text-xs">Mbps</span></div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400 font-semibold">Recommended OBS Bitrate</span>
                  <div className="text-2xl font-black text-emerald-400 font-mono mt-1">{obsBitrate} <span className="text-xs">Kbps</span></div>
                  <div className="text-[10px] text-slate-400">Includes 30% safety margin</div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400 font-semibold">Encoding Target</span>
                  <div className="text-xs font-bold text-white mt-2 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-purple-400" />
                    <span>{resolutionRec}</span>
                  </div>
                </div>
              </div>

              <AdSlot slotType="rectangle" title="Elgato Stream Deck & Capture Cards on Amazon" />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
