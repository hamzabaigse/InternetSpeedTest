'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AdSlot } from '@/components/AdSlot';
import { ShieldAlert, Download, RefreshCw, Play } from 'lucide-react';
import { runFullDiagnostic, DiagnosticResult } from '@/lib/speedTestEngine';
import { generateIspComplaintPdf } from '@/lib/pdfGenerator';

export default function IspThrottlingReportPage() {
  const [isTesting, setIsTesting] = useState(false);
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [ispName, setIspName] = useState('Comcast Xfinity');
  const [userCity, setUserCity] = useState('Chicago, IL');

  const runAudit = async () => {
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
            <div className="w-12 h-12 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-center justify-center text-rose-400">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-rose-400 tracking-wider">FCC &amp; Regulatory Compliance Audit</span>
              <h1 className="text-xl sm:text-3xl font-extrabold text-white">
                ISP Throttling Proof Generator (Exportable PDF Report)
              </h1>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
            Tests single-stream vs. multi-stream downloads in Megabytes per second (MB/s), Port 80 vs. Port 443 throughput, and latency under load. Generates a one-click <strong>&quot;Official ISP Complaint Report PDF&quot;</strong> ready to attach to support tickets or regulatory filings.
          </p>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 mb-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Your ISP Name:</label>
                <input
                  type="text"
                  value={ispName}
                  onChange={(e) => setIspName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">City / Region Node:</label>
                <input
                  type="text"
                  value={userCity}
                  onChange={(e) => setUserCity(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="flex justify-center pt-2">
              <button
                onClick={runAudit}
                disabled={isTesting}
                className="px-8 py-3.5 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-black text-sm rounded-xl flex items-center gap-2 shadow-xl transition transform hover:-translate-y-0.5"
              >
                {isTesting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Executing Throttling Telemetry...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>Run Full Throttling &amp; Port Audit</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {result && (
            <div className="space-y-6">
              <div className="bg-slate-950 p-6 rounded-xl border border-rose-500/40">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-white">Throttling Telemetry Findings</h3>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded ${
                    result.isThrottlingLikely ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  }`}>
                    {result.isThrottlingLikely ? 'Traffic Shaping Detected' : 'No Severe Throttling'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div>
                    <span className="text-[11px] text-slate-400">Multi-stream Download</span>
                    <div className="text-xl font-bold text-white font-mono">{result.downloadMBps} MB/s</div>
                  </div>

                  <div>
                    <span className="text-[11px] text-slate-400">Single-stream Download</span>
                    <div className="text-xl font-bold text-cyan-400 font-mono">{result.singleStreamMBps} MB/s</div>
                  </div>

                  <div>
                    <span className="text-[11px] text-slate-400">Throttling Ratio</span>
                    <div className="text-xl font-bold text-amber-400 font-mono">{result.throttlingRatio}x</div>
                  </div>
                </div>

                <button
                  onClick={() => generateIspComplaintPdf(result, ispName, userCity)}
                  className="w-full bg-gradient-to-r from-rose-600 via-red-600 to-orange-600 hover:from-rose-500 hover:to-orange-500 text-white font-extrabold text-sm py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-xl transition"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Free Official ISP Complaint Report (PDF)</span>
                </button>
              </div>

              <AdSlot slotType="rectangle" title="File FCC / Regulatory Consumer Broadband Complaint Guide" />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
