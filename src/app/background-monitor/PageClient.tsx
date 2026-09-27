'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AdSlot } from '@/components/AdSlot';
import { MonitorCheck, Play, Pause, Bell, Activity, Clock, ShieldCheck, CheckCircle2, AlertTriangle } from 'lucide-react';

interface PingEvent {
  time: string;
  pingMs: number;
  status: 'Normal' | 'High Latency' | 'Timeout';
}

export default function BackgroundMonitorPage() {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [intervalMinutes, setIntervalMinutes] = useState(1); // 1-minute interval for live demo
  const [history, setHistory] = useState<PingEvent[]>([]);
  const [dropAlerts, setDropAlerts] = useState(0);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (isMonitoring) {
      const runPingCheck = async () => {
        const timeStr = new Date().toLocaleTimeString();
        const t0 = performance.now();
        let pingVal = 0;
        let status: 'Normal' | 'High Latency' | 'Timeout' = 'Normal';

        try {
          await fetch('/api/ping', { cache: 'no-store' });
          pingVal = Math.round(performance.now() - t0);
          if (pingVal > 80) status = 'High Latency';
        } catch {
          pingVal = 999;
          status = 'Timeout';
          setDropAlerts((prev) => prev + 1);
        }

        setHistory((prev) => [
          { time: timeStr, pingMs: pingVal, status },
          ...prev.slice(0, 24),
        ]);
      };

      runPingCheck();
      timerId = setInterval(runPingCheck, intervalMinutes * 60 * 1000);
    }

    return () => clearInterval(timerId);
  }, [isMonitoring, intervalMinutes]);

  return (
    <div className="min-h-screen bg-dark-bg text-slate-100 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8">
        <AdSlot slotType="leaderboard" />

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center justify-center text-emerald-400">
              <MonitorCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Background Tab Utility</span>
              <h1 className="text-xl sm:text-3xl font-extrabold text-white">
                Continuous Network Speed &amp; Degradation Monitor
              </h1>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
            Keep this tab open while working from home. Pings your connection in the background every minute and alerts you immediately if your ISP drops connection or experiences latency spikes.
          </p>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${isMonitoring ? 'bg-emerald-400 animate-ping' : 'bg-slate-600'}`} />
              <span className="text-xs font-bold text-white">
                Status: {isMonitoring ? 'Continuous Monitoring Active' : 'Monitor Paused'}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMonitoring(!isMonitoring)}
                className={`px-6 py-3 rounded-xl font-bold text-xs flex items-center gap-2 transition shadow-lg ${
                  isMonitoring
                    ? 'bg-rose-950 border border-rose-500/40 text-rose-300 hover:bg-rose-900'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 glow-emerald'
                }`}
              >
                {isMonitoring ? (
                  <>
                    <Pause className="w-4 h-4" />
                    <span>Pause Monitoring</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>Start Background Tab Monitor</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Telemetry Log Stream */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" /> Continuous Latency Log
              </h3>
              <span className="text-xs text-rose-400 font-semibold flex items-center gap-1">
                <Bell className="w-3.5 h-3.5" /> Drop Alerts: {dropAlerts}
              </span>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 max-h-72 overflow-y-auto space-y-2 font-mono text-xs">
              {history.length === 0 ? (
                <div className="text-slate-500 italic text-center py-6">
                  Click &quot;Start Background Tab Monitor&quot; to begin tracking continuous network health...
                </div>
              ) : (
                history.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between border-b border-slate-900 pb-1.5">
                    <span className="text-slate-400">{item.time}</span>
                    <span className="text-cyan-300 font-bold">{item.pingMs} ms</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.status === 'Normal' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                ))
              )}
            </div>

            <AdSlot slotType="rectangle" title="Mesh Wi-Fi & Continuous Network Hardware" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
