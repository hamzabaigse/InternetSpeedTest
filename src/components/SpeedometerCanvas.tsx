'use client';

import React, { useEffect, useRef } from 'react';

interface SpeedometerCanvasProps {
  value: number; // live speed or value
  runningAvg?: number; // running average speed
  maxValue?: number;
  unit?: string;
  isTesting: boolean;
  stageName?: string;
  displayMode?: 'Mbps' | 'MBps'; // Megabits vs Megabytes
}

export const SpeedometerCanvas: React.FC<SpeedometerCanvasProps> = ({
  value,
  runningAvg,
  maxValue = 500,
  unit = 'Mbps',
  isTesting,
  stageName = 'Ready to Diagnose',
  displayMode = 'Mbps',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Convert value according to displayMode
  const displayVal = displayMode === 'MBps' && unit === 'Mbps' ? value / 8 : value;
  const displayAvg = runningAvg !== undefined ? (displayMode === 'MBps' && unit === 'Mbps' ? runningAvg / 8 : runningAvg) : undefined;
  const displayUnit = unit === 'Mbps' ? (displayMode === 'MBps' ? 'MB/s' : 'Mbps') : unit;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let waveOffset = 0;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height * 0.65;
      const radius = Math.min(width, height) * 0.4;

      ctx.clearRect(0, 0, width, height);

      // Telemetry wave
      if (isTesting) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.15)';
        ctx.lineWidth = 2;
        waveOffset += 0.05;
        for (let x = 0; x < width; x += 5) {
          const y = height * 0.85 + Math.sin(x * 0.02 + waveOffset) * 12;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Outer Arc Track
      const startAngle = Math.PI * 0.85;
      const endAngle = Math.PI * 2.15;

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 14;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Active progress arc
      const clampedValue = Math.min(Math.max(value, 0), maxValue);
      const percent = clampedValue / maxValue;
      const currentAngle = startAngle + (endAngle - startAngle) * percent;

      if (percent > 0) {
        const gradient = ctx.createLinearGradient(0, 0, width, 0);
        gradient.addColorStop(0, '#06b6d4');
        gradient.addColorStop(0.5, '#3b82f6');
        gradient.addColorStop(1, '#10b981');

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, startAngle, currentAngle);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 14;
        ctx.lineCap = 'round';
        ctx.stroke();
      }

      // Ticks
      const ticks = 10;
      for (let i = 0; i <= ticks; i++) {
        const tickPercent = i / ticks;
        const tickAngle = startAngle + (endAngle - startAngle) * tickPercent;
        const innerR = radius - 18;
        const outerR = radius - 24;

        const x1 = centerX + Math.cos(tickAngle) * innerR;
        const y1 = centerY + Math.sin(tickAngle) * innerR;
        const x2 = centerX + Math.cos(tickAngle) * outerR;
        const y2 = centerY + Math.sin(tickAngle) * outerR;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = i % 2 === 0 ? '#64748b' : '#334155';
        ctx.lineWidth = i % 2 === 0 ? 2 : 1;
        ctx.stroke();
      }

      // Needle
      const needleAngle = currentAngle;
      const needleLen = radius - 10;
      const needleX = centerX + Math.cos(needleAngle) * needleLen;
      const needleY = centerY + Math.sin(needleAngle) * needleLen;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(needleX, needleY);
      ctx.strokeStyle = isTesting ? '#06b6d4' : '#94a3b8';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Knob
      ctx.beginPath();
      ctx.arc(centerX, centerY, 8, 0, Math.PI * 2);
      ctx.fillStyle = '#0f172a';
      ctx.fill();
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 3;
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [value, maxValue, isTesting]);

  return (
    <div className="relative w-full flex flex-col items-center justify-center p-4">
      <canvas
        ref={canvasRef}
        width={340}
        height={240}
        className="w-[340px] h-[240px] max-w-full"
      />
      {/* Digital HUD Overlay */}
      <div className="absolute top-[48%] flex flex-col items-center justify-center pointer-events-none text-center">
        {/* Real-time Instantaneous Speed */}
        <div className="text-4xl sm:text-5xl font-black text-white tracking-tight flex items-baseline gap-1 font-mono">
          <span>{displayVal.toFixed(1)}</span>
          <span className="text-xs sm:text-sm font-bold text-cyan-400 font-sans">{displayUnit}</span>
        </div>

        {/* Live vs Running Average Pill */}
        {isTesting && displayAvg !== undefined && unit === 'Mbps' && (
          <div className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/90 border border-emerald-500/40 px-2 py-0.5 rounded mt-1 shadow">
            Avg: {displayAvg.toFixed(1)} {displayUnit}
          </div>
        )}

        {/* Unit explanation tooltip */}
        {unit === 'Mbps' && (
          <div className="text-[9px] text-slate-400 font-mono mt-0.5">
            ({(value / 8).toFixed(1)} Megabytes/sec)
          </div>
        )}

        <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-300 mt-1.5 bg-slate-900/90 px-2.5 py-0.5 rounded border border-slate-800">
          {stageName}
        </div>
      </div>
    </div>
  );
};
