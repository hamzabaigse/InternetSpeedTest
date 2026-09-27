'use client';

import React from 'react';
import { DiagnosticStage } from '@/lib/speedTestEngine';
import { CheckCircle2, Loader2, Terminal, ShieldCheck, Cpu } from 'lucide-react';

interface DiagnosticConsoleProps {
  currentStage: DiagnosticStage;
  progressPercent: number;
  consoleLog: string[];
  isTesting: boolean;
}

export const ProgressiveDiagnosticConsole: React.FC<DiagnosticConsoleProps> = ({
  currentStage,
  progressPercent,
  consoleLog,
  isTesting,
}) => {
  const steps = [
    { id: 'STAGE_1_RAW_THROUGHPUT', name: 'Raw Throughput & Multi-Stream' },
    { id: 'STAGE_2_BUFFERBLOAT_CHECK', name: 'Bufferbloat Latency Spike Check' },
    { id: 'STAGE_3_YOUTUBE_4K_BUFFER', name: 'YouTube 4K CDN Chunk Delivery' },
    { id: 'STAGE_4_VOIP_UDP_CHECK', name: 'VoIP Jitter & Drop Probability' },
    { id: 'STAGE_5_GAME_LATENCY_MAP', name: 'Regional Game Datacenter Map' },
  ];

  const getStepStatus = (stepId: string) => {
    const stageOrder = [
      'IDLE',
      'STAGE_1_RAW_THROUGHPUT',
      'STAGE_2_BUFFERBLOAT_CHECK',
      'STAGE_3_YOUTUBE_4K_BUFFER',
      'STAGE_4_VOIP_UDP_CHECK',
      'STAGE_5_GAME_LATENCY_MAP',
      'COMPLETED'
    ];
    const currentIndex = stageOrder.indexOf(currentStage);
    const stepIndex = stageOrder.indexOf(stepId as any);

    if (currentStage === 'COMPLETED' || stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'active';
    return 'pending';
  };

  return (
    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-xl flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Progressive Diagnostic Console
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-cyan-400 font-bold">{progressPercent}%</span>
            <div className="w-20 sm:w-28 bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Diagnostic Steps Checklist */}
        <div className="space-y-2 mb-4">
          {steps.map((step, idx) => {
            const status = getStepStatus(step.id);
            return (
              <div
                key={step.id}
                className={`flex items-center justify-between p-2 rounded-lg text-xs transition ${
                  status === 'active'
                    ? 'bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 font-semibold'
                    : status === 'completed'
                    ? 'bg-slate-950/40 text-slate-300'
                    : 'text-slate-500 opacity-60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-[10px] text-slate-500">0{idx + 1}.</span>
                  <span>{step.name}</span>
                </div>
                <div>
                  {status === 'completed' && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  )}
                  {status === 'active' && (
                    <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                  )}
                  {status === 'pending' && (
                    <span className="text-[10px] text-slate-600 font-mono">NEXT</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Terminal Log Stream */}
      <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 font-mono text-[11px] text-slate-300 h-32 overflow-y-auto scanline relative">
        <div className="text-slate-500 text-[10px] border-b border-slate-900 pb-1 mb-1.5 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <Cpu className="w-3 h-3 text-cyan-400" /> Real-time telemetry log
          </span>
          <span className="text-emerald-400 font-bold">LIVE STREAM</span>
        </div>
        {consoleLog.length === 0 ? (
          <div className="text-slate-500 italic py-4 text-center">
            Click &quot;Start 40-Second Diagnostic&quot; to begin deep packet inspection...
          </div>
        ) : (
          consoleLog.map((line, index) => (
            <div key={index} className="leading-tight py-0.5 text-cyan-400/90 flex gap-2">
              <span className="text-slate-600 select-none">&gt;</span>
              <span>{line}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
