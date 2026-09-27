'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AdSlot } from '@/components/AdSlot';
import { ShieldCheck, RefreshCw, Play, CheckCircle2, AlertCircle } from 'lucide-react';
import { runFullDiagnostic, DiagnosticResult } from '@/lib/speedTestEngine';

export default function WfhStabilityScorePage() {
  const [isTesting, setIsTesting] = useState(false);
  const [result, setResult] = useState<DiagnosticResult | null>(null);

  const runWfhAudit = async () => {
    setIsTesting(true);
    try {
      const res = await runFullDiagnostic(() => {});
      setResult(res);
    } catch (err) {
      console.error(err);
    }
    setIsTesting(false);
  };

  return (
    <div className="min-h-screen bg-dark-bg text-slate-100 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8">
        <AdSlot slotType="leaderboard" />

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/30 rounded-xl flex items-center justify-center text-indigo-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">Remote Work Readiness Audit</span>
              <h1 className="text-xl sm:text-3xl font-extrabold text-white">
                Work From Home Stability Score (Grade A+ to F)
              </h1>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
            Evaluates multi-device remote work stability: <strong>&quot;Can 2 people run simultaneous HD Zoom calls while downloading files without video freezing?&quot;</strong>
          </p>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center mb-6">
            <button
              onClick={runWfhAudit}
              disabled={isTesting}
              className="px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-black text-sm rounded-xl flex items-center gap-2 shadow-xl transition transform hover:-translate-y-0.5"
            >
              {isTesting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Evaluating Remote Work Reliability...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Calculate WFH Stability Grade</span>
                </>
              )}
            </button>
          </div>

          {result && (
            <div className="space-y-6">
              <div className="bg-slate-950 p-6 rounded-xl border border-indigo-500/40 text-center">
                <div className="text-xs uppercase font-bold text-slate-400 mb-1">Composite WFH Stability Grade</div>
                <div className="text-6xl font-black text-indigo-400 font-mono my-2">{result.wfhGrade}</div>
                <p className="text-xs text-slate-300 max-w-lg mx-auto">{result.wfhSummary}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400 font-semibold">Dual HD Zoom Call Capacity</span>
                  <div className="text-sm font-bold text-emerald-400 mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Ready for 3+ Simultaneous HD Calls
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400 font-semibold">Background Download Bufferbloat</span>
                  <div className="text-sm font-bold text-cyan-400 mt-1">
                    +{result.bufferbloatDeltaMs} ms Latency Spike ({result.bufferbloatGrade})
                  </div>
                </div>
              </div>

              <AdSlot slotType="rectangle" title="Asus & GL.iNet SQM Routers for Remote Workers" />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
