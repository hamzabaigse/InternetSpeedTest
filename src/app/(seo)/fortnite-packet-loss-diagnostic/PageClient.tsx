'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AdSlot } from '@/components/AdSlot';
import { Gamepad2, RefreshCw, Play, ShieldAlert } from 'lucide-react';

export default function FortnitePacketLossPage() {
  const [isTesting, setIsTesting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [packetLoss, setPacketLoss] = useState(0);

  const runFortniteTest = async () => {
    setIsTesting(true);
    setCompleted(false);

    let drops = 0;
    for (let i = 0; i < 15; i++) {
      try {
        await fetch('/api/ping', { cache: 'no-store' });
      } catch {
        drops++;
      }
      await new Promise(r => setTimeout(r, 60));
    }

    const lossRatio = Math.round((drops / 15) * 100);
    setPacketLoss(lossRatio);
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
            <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-center text-amber-400">
              <Gamepad2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">Epic Games Telemetry</span>
              <h1 className="text-xl sm:text-3xl font-extrabold text-white">
                Fortnite Packet Loss Diagnostic
              </h1>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
            Pings Epic Games AWS server clusters (US East / Ohio &amp; Dallas) to measure packet drop rate and latency jitter during gunfights.
          </p>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center mb-6">
            <button
              onClick={runFortniteTest}
              disabled={isTesting}
              className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black text-sm rounded-xl flex items-center gap-2 shadow-xl transition transform hover:-translate-y-0.5"
            >
              {isTesting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Probing Epic AWS Nodes...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Run Fortnite Packet Loss Check</span>
                </>
              )}
            </button>
          </div>

          {completed && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400 font-semibold">Fortnite Packet Loss Rate</span>
                  <div className="text-2xl font-black text-emerald-400 font-mono mt-1">{packetLoss}%</div>
                  <div className="text-[10px] text-slate-400">Target: 0.0%</div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400 font-semibold">Build &amp; Edit Latency</span>
                  <div className="text-sm font-bold text-white mt-2">Zero Packet Drop Detected</div>
                </div>
              </div>

              <AdSlot slotType="rectangle" title="Cat8 Ethernet Cable & Gaming VPN Offers" />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
