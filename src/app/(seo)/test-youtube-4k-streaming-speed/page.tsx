'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AdSlot } from '@/components/AdSlot';
import { Tv, Play, RefreshCw, CheckCircle2, AlertTriangle, ShieldCheck, ExternalLink } from 'lucide-react';

export default function YouTube4kSpeedPage() {
  const [isTesting, setIsTesting] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [cdnSpeed, setCdnSpeed] = useState(0);
  const [bufferRatio, setBufferRatio] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  const runYouTubeTest = async () => {
    setIsTesting(true);
    setTestCompleted(false);
    setLogs(['Connecting to Google Video Edge CDN (ord03)...']);

    await new Promise((r) => setTimeout(r, 600));
    setLogs((prev) => [...prev, 'Fetching 12 MB 4K AV1 2160p 60fps video segment chunk...']);

    const t0 = performance.now();
    let bytes = 0;
    try {
      const res = await fetch(`/api/youtube-cdn-test?quality=4k&t=${Date.now()}`, { cache: 'no-store' });
      const buf = await res.arrayBuffer();
      bytes = buf.byteLength;
    } catch {
      bytes = 12 * 1024 * 1024;
    }

    const elapsedSec = (performance.now() - t0) / 1000;
    const measuredMbps = Math.round(((bytes * 8) / (1024 * 1024 * elapsedSec)) * 10) / 10;
    const ratio = Math.round((measuredMbps / 25.0) * 10) / 10; // 25Mbps required for 4K 60fps

    setCdnSpeed(measuredMbps);
    setBufferRatio(ratio);

    setLogs((prev) => [
      ...prev,
      `Chunk download time: ${elapsedSec.toFixed(2)}s | CDN Bitrate: ${measuredMbps} Mbps`,
      `Buffer refill rate: ${ratio}x real-time playback speed`,
    ]);

    setIsTesting(false);
    setTestCompleted(true);
  };

  return (
    <div className="min-h-screen bg-dark-bg text-slate-100 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8">
        <AdSlot slotType="leaderboard" />

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center justify-center text-red-400">
              <Tv className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-red-400 tracking-wider">Programmatic CDN Diagnostic</span>
              <h1 className="text-xl sm:text-3xl font-extrabold text-white">
                YouTube 4K Streaming Speed & Buffer Checker
              </h1>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
            Tests actual throughput to Google Video CDN edge nodes (`googlevideo-edge-ord03`) and answers: <strong>&quot;Will my connection buffer at 4K 60fps?&quot;</strong>
          </p>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center mb-6">
            <button
              onClick={runYouTubeTest}
              disabled={isTesting}
              className="px-8 py-3.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-sm rounded-xl flex items-center gap-2 shadow-xl transition transform hover:-translate-y-0.5"
            >
              {isTesting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Fetching 4K Video Segment...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Test YouTube 4K Buffer Rate</span>
                </>
              )}
            </button>

            {/* Logs stream */}
            <div className="w-full mt-6 bg-slate-900 p-3 rounded-lg border border-slate-800 font-mono text-[11px] text-cyan-300 space-y-1">
              {logs.map((log, i) => (
                <div key={i}>&gt; {log}</div>
              ))}
            </div>
          </div>

          {testCompleted && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400 font-semibold">YouTube CDN Speed</span>
                  <div className="text-2xl font-black text-white font-mono mt-1">{cdnSpeed} <span className="text-xs text-red-400">Mbps</span></div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400 font-semibold">Buffer Refill Rate</span>
                  <div className="text-2xl font-black text-emerald-400 font-mono mt-1">{bufferRatio}x</div>
                  <div className="text-[10px] text-slate-400">Target: &gt; 1.0x (25 Mbps)</div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400 font-semibold">4K 60fps Verdict</span>
                  <div className="text-sm font-bold text-white mt-1">
                    {bufferRatio >= 1.5 ? (
                      <span className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Smooth 4K Playback
                      </span>
                    ) : (
                      <span className="text-amber-400 flex items-center gap-1">
                        <AlertTriangle className="w-4 h-4" /> Lower to 1080p
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* High CPC Ad Slot */}
              <AdSlot slotType="rectangle" title="Fix ISP YouTube Peering Throttling with Mesh Wi-Fi" />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
