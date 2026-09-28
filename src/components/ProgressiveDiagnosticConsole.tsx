'use client';

import React, { useEffect, useRef } from 'react';
import { DiagnosticStage } from '@/lib/speedTestEngine';
import { CheckCircle2, Loader2, Terminal, Cpu } from 'lucide-react';

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
  const logContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll terminal log to bottom on new messages
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [consoleLog]);

  const steps: Array<{ id: DiagnosticStage; name: string }> = [
    { id: 'STAGE_PING', name: 'Idle Latency & Jitter Baseline' },
    { id: 'STAGE_DOWNLOAD', name: 'Multi-Stream Download Throughput' },
    { id: 'STAGE_UPLOAD', name: 'Upload Capacity & Stream Saturation' },
    { id: 'STAGE_BUFFERBLOAT', name: 'Bufferbloat & Loaded Latency' },
    { id: 'STAGE_YOUTUBE', name: 'YouTube 4K CDN Streaming Inspection' },
    { id: 'STAGE_GAME_MATRIX', name: 'Regional Game Datacenter Probing' },
  ];

  const stageOrder: DiagnosticStage[] = [
    'IDLE',
    'STAGE_PING',
    'STAGE_DOWNLOAD',
    'STAGE_UPLOAD',
    'STAGE_BUFFERBLOAT',
    'STAGE_YOUTUBE',
    'STAGE_GAME_MATRIX',
    'COMPLETED'
  ];

  const getStepStatus = (stepId: DiagnosticStage) => {
    const currentIndex = stageOrder.indexOf(currentStage);
    const stepIndex = stageOrder.indexOf(stepId);

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
        <div className="space-y-1.5 sm:space-y-2 mb-4">
          {steps.map((step, idx) => {
            const status = getStepStatus(step.id);
            return (
              <div
                key={step.id}
                className={`flex items-center justify-between p-2 rounded-lg text-xs transition ${
                  status === 'active'
                    ? 'bg-cyan-950/70 border border-cyan-500/50 text-cyan-300 font-bold shadow-sm glow-cyan'
                    : status === 'completed'
                    ? 'bg-slate-950/50 text-slate-300'
                    : 'text-slate-500 opacity-60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-[10px] text-slate-500">0{idx + 1}.</span>
                  <span className="truncate">{step.name}</span>
                </div>
                <div className="flex-shrink-0 ml-2">
                  {status === 'completed' && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  )}
                  {status === 'active' && (
                    <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                  )}
                  {status === 'pending' && (
                    <span className="text-[10px] text-slate-600 font-mono">WAIT</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Terminal Log Stream */}
      <div
        ref={logContainerRef}
        className="bg-slate-950 border border-slate-800 rounded-lg p-3 font-mono text-[11px] text-slate-300 h-32 overflow-y-auto scanline relative"
      >
        <div className="text-slate-500 text-[10px] border-b border-slate-900 pb-1 mb-1.5 flex items-center justify-between sticky top-0 bg-slate-950 z-10">
          <span className="flex items-center gap-1">
            <Cpu className="w-3 h-3 text-cyan-400" /> Real-time telemetry log
          </span>
          {isTesting ? (
            <span className="text-emerald-400 font-bold flex items-center gap-1 animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> LIVE
            </span>
          ) : (
            <span className="text-slate-600 font-mono">STANDBY</span>
          )}
        </div>
        {consoleLog.length === 0 ? (
          <div className="text-slate-500 italic py-4 text-center">
            Click &quot;Start 40-Second Diagnostic&quot; to begin deep packet inspection...
          </div>
        ) : (
          consoleLog.map((line, index) => (
            <div key={index} className="leading-tight py-0.5 text-cyan-400/90 flex gap-2 break-all">
              <span className="text-slate-600 select-none">&gt;</span>
              <span>{line}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
