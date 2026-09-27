'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AdSlot } from '@/components/AdSlot';
import { SpeedometerCanvas } from '@/components/SpeedometerCanvas';
import { OoklaHeaderHud } from '@/components/OoklaHeaderHud';
import { ProgressiveDiagnosticConsole } from '@/components/ProgressiveDiagnosticConsole';
import { InteractiveReportTabs } from '@/components/InteractiveReportTabs';
import { runFullDiagnostic, DiagnosticResult, DiagnosticStage } from '@/lib/speedTestEngine';
import { Activity, Play, RefreshCw, Zap, ShieldCheck, FileText, Info } from 'lucide-react';
import { generateIspComplaintPdf } from '@/lib/pdfGenerator';
import confetti from 'canvas-confetti';

export default function Home() {
  const [isTesting, setIsTesting] = useState(false);
  const [stage, setStage] = useState<DiagnosticStage>('IDLE');
  const [progress, setProgress] = useState(0);
  const [gaugeValue, setGaugeValue] = useState(0);
  const [smoothedDownload, setSmoothedDownload] = useState<number | undefined>(undefined);
  const [smoothedUpload, setSmoothedUpload] = useState<number | undefined>(undefined);
  const [idlePing, setIdlePing] = useState<number | undefined>(undefined);
  const [downloadLoadedPing, setDownloadLoadedPing] = useState<number | undefined>(undefined);
  const [uploadLoadedPing, setUploadLoadedPing] = useState<number | undefined>(undefined);
  
  const [gaugeUnit, setGaugeUnit] = useState<'Mbps' | 'ms' | 'Score'>('Mbps');
  const [unitMode, setUnitMode] = useState<'Mbps' | 'MBps'>('Mbps');
  const [consoleLog, setConsoleLog] = useState<string[]>([]);
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [tabRefreshCounter, setTabRefreshCounter] = useState(0);

  const startDiagnostic = async () => {
    setIsTesting(true);
    setResult(null);
    setConsoleLog([]);
    setProgress(0);
    setGaugeValue(0);
    setSmoothedDownload(undefined);
    setSmoothedUpload(undefined);
    setIdlePing(undefined);
    setDownloadLoadedPing(undefined);
    setUploadLoadedPing(undefined);

    try {
      const finalResult = await runFullDiagnostic((data) => {
        setStage(data.stage);
        setProgress(data.stagePercent);
        setGaugeValue(data.gaugeValue);
        
        if (data.smoothedDownloadMbps !== undefined) setSmoothedDownload(data.smoothedDownloadMbps);
        if (data.smoothedUploadMbps !== undefined) setSmoothedUpload(data.smoothedUploadMbps);
        if (data.idlePingMs !== undefined) setIdlePing(data.idlePingMs);
        if (data.downloadLoadedPingMs !== undefined) setDownloadLoadedPing(data.downloadLoadedPingMs);
        if (data.uploadLoadedPingMs !== undefined) setUploadLoadedPing(data.uploadLoadedPingMs);

        setGaugeUnit(data.gaugeUnit);
        setConsoleLog((prev) => [...prev.slice(-15), data.consoleMessage]);
      });

      setResult(finalResult);
      setStage('COMPLETED');
      setIsTesting(false);
      
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch (err) {
      console.error(err);
      setIsTesting(false);
      setStage('IDLE');
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-slate-100 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <AdSlot slotType="leaderboard" refreshTrigger={stage} />

        {/* Hero Title */}
        <div className="text-center my-6">
          <div className="inline-flex items-center gap-2 bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold px-3 py-1 rounded-full mb-3 shadow-inner">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Search-Engine-Optimized Network Diagnostic &amp; ISP Intelligence Hub</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Comprehensive 40-Second Network Intelligence Test
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto mt-2">
            Measures real-time download/upload throughput, YouTube 4K CDN buffer rate, bufferbloat latency spikes, and game datacenters.
          </p>

          {/* Unit Toggle Switch */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-cyan-400" /> Display Unit:
            </span>
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-1 flex gap-1">
              <button
                onClick={() => setUnitMode('Mbps')}
                className={`px-3 py-1 rounded-md text-xs font-bold transition ${
                  unitMode === 'Mbps'
                    ? 'bg-cyan-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Mbps (Megabits/s - ISP Standard)
              </button>
              <button
                onClick={() => setUnitMode('MBps')}
                className={`px-3 py-1 rounded-md text-xs font-bold transition ${
                  unitMode === 'MBps'
                    ? 'bg-cyan-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                MB/s (Megabytes/s - File Download)
              </button>
            </div>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <Activity className="w-48 h-48 text-cyan-400" />
              </div>

              {/* Ookla-Inspired Top Header HUD (Download, Upload, Ping, 5-Dot Ratings) */}
              <OoklaHeaderHud
                downloadMbps={result?.downloadMbps ?? smoothedDownload}
                uploadMbps={result?.uploadMbps ?? smoothedUpload}
                idlePingMs={result?.idlePingMs ?? idlePing}
                downloadLoadedPingMs={result?.downloadLoadedPingMs ?? downloadLoadedPing}
                uploadLoadedPingMs={result?.uploadLoadedPingMs ?? uploadLoadedPing}
                categoryScores={result?.categoryScores}
                isTesting={isTesting}
                stage={stage}
              />

              {/* Speedometer Gauge & Start Button */}
              <div className="flex flex-col items-center justify-center">
                <SpeedometerCanvas
                  value={gaugeValue}
                  unit={gaugeUnit}
                  displayMode={unitMode}
                  isTesting={isTesting}
                  stageName={stage === 'IDLE' ? 'Ready' : stage.replace('STAGE_', 'Step ')}
                />

                <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={startDiagnostic}
                    disabled={isTesting}
                    className={`px-8 py-3.5 rounded-xl font-black text-sm tracking-wide flex items-center gap-2 shadow-xl transition transform hover:-translate-y-0.5 ${
                      isTesting
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white glow-cyan'
                    }`}
                  >
                    {isTesting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
                        <span>Diagnosing ({progress}%)...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-current text-white" />
                        <span>{result ? 'Run Diagnostic Again' : 'Start 40-Second Diagnostic'}</span>
                      </>
                    )}
                  </button>

                  {result && (
                    <button
                      onClick={() => generateIspComplaintPdf(result)}
                      className="px-5 py-3.5 bg-rose-950/80 hover:bg-rose-900 border border-rose-500/40 text-rose-300 font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg transition"
                    >
                      <FileText className="w-4 h-4 text-rose-400" />
                      <span>Export ISP Complaint PDF</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            <ProgressiveDiagnosticConsole
              currentStage={stage}
              progressPercent={progress}
              consoleLog={consoleLog}
              isTesting={isTesting}
            />

            <AdSlot slotType="rectangle" title="Upgrade to SQM Gaming Router to Eliminate Bufferbloat" />
          </div>

          <div className="lg:col-span-4 sticky top-20">
            <AdSlot slotType="half-page" refreshTrigger={tabRefreshCounter} />
          </div>
        </div>

        {/* Unlocked Detailed Intelligence Report */}
        {result && (
          <div className="mt-8 animate-fadeIn">
            <div className="bg-slate-950/80 border border-cyan-500/30 rounded-2xl p-6 shadow-2xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-800 pb-4 mb-6 gap-4">
                <div>
                  <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Diagnostic Completed</div>
                  <h2 className="text-xl font-extrabold text-white">Full Network Intelligence Report</h2>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span>WFH Score: {result.wfhGrade}</span>
                  </div>
                </div>
              </div>

              <InteractiveReportTabs
                result={result}
                onTabChange={() => setTabRefreshCounter((prev) => prev + 1)}
              />
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
