'use client';

import React, { useEffect, useRef } from 'react';
import { speedToLogScalePercent } from '@/lib/speedTestEngine';
import { ArrowDownCircle, ArrowUpCircle, Zap } from 'lucide-react';

interface SpeedometerCanvasProps {
  valueMbps: number; // Raw speed in Mbps
  unitMode: 'Mbps' | 'MBps'; // Megabits vs Megabytes choice
  isTesting: boolean;
  stageName?: string;
  activePhase?: 'download' | 'upload' | 'ping' | 'other';
}

export const SpeedometerCanvas: React.FC<SpeedometerCanvasProps> = ({
  valueMbps,
  unitMode = 'Mbps',
  isTesting,
  stageName = 'Ready',
  activePhase = 'download',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const currentAnglePercentRef = useRef<number>(0);
  const prevPhaseRef = useRef<string>(activePhase);

  // Whenever activePhase changes (e.g., switching from download to upload), reset needle to 0!
  useEffect(() => {
    if (prevPhaseRef.current !== activePhase) {
      currentAnglePercentRef.current = 0;
      prevPhaseRef.current = activePhase;
    }
  }, [activePhase]);

  // Compute display speed based on unit choice
  const displayVal = unitMode === 'MBps' ? valueMbps / 8 : valueMbps;
  const displayUnit = unitMode === 'MBps' ? 'MB/s' : 'Mbps';
  const altVal = unitMode === 'MBps' ? valueMbps : valueMbps / 8;
  const altUnit = unitMode === 'MBps' ? 'Megabits/sec' : 'Megabytes/sec';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height * 0.72;
      const radius = Math.min(width, height) * 0.44;

      ctx.clearRect(0, 0, width, height);

      const startAngle = Math.PI * 0.82;
      const endAngle = Math.PI * 2.18;

      // Outer track background arc
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.strokeStyle = '#172033';
      ctx.lineWidth = 18;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Logarithmic scale percent target based on Mbps baseline
      const targetPercent = speedToLogScalePercent(valueMbps);

      // Smooth LERP spring physics on needle angle
      currentAnglePercentRef.current += (targetPercent - currentAnglePercentRef.current) * 0.18;
      const currentPercent = Math.max(0, currentAnglePercentRef.current);

      const activeAngle = startAngle + (endAngle - startAngle) * currentPercent;

      // Glowing active progress gradient
      if (currentPercent > 0.001) {
        const gradient = ctx.createLinearGradient(0, 0, width, 0);
        if (activePhase === 'upload') {
          gradient.addColorStop(0, '#a855f7');
          gradient.addColorStop(1, '#ec4899');
        } else {
          gradient.addColorStop(0, '#06b6d4');
          gradient.addColorStop(1, '#3b82f6');
        }

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, startAngle, activeAngle);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 18;
        ctx.lineCap = 'round';
        ctx.stroke();
      }

      // Ticks adapted dynamically according to unit mode choice
      const ticks = unitMode === 'MBps'
        ? [
            { label: '0', valMbps: 0 },
            { label: '1', valMbps: 8 },
            { label: '2', valMbps: 16 },
            { label: '8', valMbps: 64 },
            { label: '15', valMbps: 120 },
            { label: '35', valMbps: 280 },
            { label: '65', valMbps: 520 },
            { label: '95', valMbps: 760 },
            { label: '125', valMbps: 1000 },
          ]
        : [
            { label: '0', valMbps: 0 },
            { label: '5', valMbps: 5 },
            { label: '10', valMbps: 10 },
            { label: '50', valMbps: 50 },
            { label: '100', valMbps: 100 },
            { label: '250', valMbps: 250 },
            { label: '500', valMbps: 500 },
            { label: '750', valMbps: 750 },
            { label: '1000', valMbps: 1000 },
          ];

      ticks.forEach((tick) => {
        const p = speedToLogScalePercent(tick.valMbps);
        const a = startAngle + (endAngle - startAngle) * p;
        const innerR = radius - 16;
        const outerR = radius - 24;

        const x1 = centerX + Math.cos(a) * innerR;
        const y1 = centerY + Math.sin(a) * innerR;
        const x2 = centerX + Math.cos(a) * outerR;
        const y2 = centerY + Math.sin(a) * outerR;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 2;
        ctx.stroke();

        const textR = radius - 38;
        const tx = centerX + Math.cos(a) * textR;
        const ty = centerY + Math.sin(a) * textR;

        ctx.fillStyle = '#94a3b8';
        ctx.font = 'bold 11px system-ui, -apple-system, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(tick.label, tx, ty);
      });

      // Needle
      const needleX = centerX + Math.cos(activeAngle) * (radius - 10);
      const needleY = centerY + Math.sin(activeAngle) * (radius - 10);

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(needleX, needleY);
      ctx.strokeStyle = activePhase === 'upload' ? '#c084fc' : '#38bdf8';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Dark Center Knob
      ctx.beginPath();
      ctx.arc(centerX, centerY, 8, 0, Math.PI * 2);
      ctx.fillStyle = '#0f172a';
      ctx.fill();
      ctx.strokeStyle = activePhase === 'upload' ? '#c084fc' : '#38bdf8';
      ctx.lineWidth = 3;
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [valueMbps, isTesting, unitMode, activePhase]);

  return (
    <div className="w-full flex flex-col items-center justify-center p-1 sm:p-2">
      {/* Sleek Ookla-Style Dial Face */}
      <canvas
        ref={canvasRef}
        width={380}
        height={240}
        className="w-full max-w-[310px] sm:max-w-[380px] h-[195px] sm:h-[240px]"
      />

      {/* Speed Readout Below Meter */}
      <div className="flex flex-col items-center justify-center text-center mt-1 sm:mt-2">
        <div className="text-3xl sm:text-5xl font-black text-white tracking-tight flex items-baseline gap-1.5 font-mono">
          <span>{displayVal.toFixed(2)}</span>
          <span className="text-xs sm:text-base font-bold text-cyan-400 font-sans">{displayUnit}</span>
        </div>

        {/* Dual Conversion Subtitle */}
        <div className="text-[11px] sm:text-xs text-slate-400 font-mono mt-0.5">
          ({altVal.toFixed(2)} {altUnit})
        </div>

        {/* Active Stage Badge */}
        <div className="mt-2.5 inline-flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 sm:px-4 py-1 rounded-full text-[11px] sm:text-xs font-bold text-slate-200 shadow-md">
          {activePhase === 'download' && <ArrowDownCircle className="w-3.5 h-3.5 text-cyan-400 animate-bounce" />}
          {activePhase === 'upload' && <ArrowUpCircle className="w-3.5 h-3.5 text-purple-400 animate-bounce" />}
          {activePhase === 'ping' && <Zap className="w-3.5 h-3.5 text-amber-400" />}
          <span>{stageName} ({displayUnit})</span>
        </div>
      </div>
    </div>
  );
};
