'use client';

import React, { useEffect, useRef } from 'react';
import { speedToLogScalePercent } from '@/lib/speedTestEngine';
import { ArrowDownCircle, ArrowUpCircle, Zap } from 'lucide-react';

interface SpeedometerCanvasProps {
  value: number; // live speed or ping value
  unit?: string;
  isTesting: boolean;
  stageName?: string;
  displayMode?: 'Mbps' | 'MBps';
  activePhase?: 'download' | 'upload' | 'ping' | 'other';
}

export const SpeedometerCanvas: React.FC<SpeedometerCanvasProps> = ({
  value,
  unit = 'Mbps',
  isTesting,
  stageName = 'Ready',
  displayMode = 'Mbps',
  activePhase = 'download',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const currentAnglePercentRef = useRef<number>(0);

  const displayVal = displayMode === 'MBps' && unit === 'Mbps' ? value / 8 : value;
  const displayUnit = unit === 'Mbps' ? (displayMode === 'MBps' ? 'MB/s' : 'Mbps') : unit;

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
      ctx.strokeStyle = '#172033'; // sleek dark slate
      ctx.lineWidth = 18;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Target percent using logarithmic scale mapping
      const targetPercent = unit === 'Mbps' ? speedToLogScalePercent(value) : Math.min(1.0, value / 200);

      // Smooth LERP spring physics on needle angle
      currentAnglePercentRef.current += (targetPercent - currentAnglePercentRef.current) * 0.18;
      const currentPercent = currentAnglePercentRef.current;

      const activeAngle = startAngle + (endAngle - startAngle) * currentPercent;

      // Draw glowing active progress gradient arc
      if (currentPercent > 0.001) {
        const gradient = ctx.createLinearGradient(0, 0, width, 0);
        if (activePhase === 'upload') {
          gradient.addColorStop(0, '#a855f7'); // purple
          gradient.addColorStop(1, '#ec4899'); // pink
        } else {
          gradient.addColorStop(0, '#06b6d4'); // cyan
          gradient.addColorStop(1, '#3b82f6'); // blue
        }

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, startAngle, activeAngle);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 18;
        ctx.lineCap = 'round';
        ctx.stroke();
      }

      // Clean Logarithmic Tick Marks & Dial Clock Numbers (0, 5, 10, 50, 100, 250, 500, 750, 1000)
      const ticks = [
        { label: '0', val: 0 },
        { label: '5', val: 5 },
        { label: '10', val: 10 },
        { label: '50', val: 50 },
        { label: '100', val: 100 },
        { label: '250', val: 250 },
        { label: '500', val: 500 },
        { label: '750', val: 750 },
        { label: '1000', val: 1000 },
      ];

      ticks.forEach((tick) => {
        const p = speedToLogScalePercent(tick.val);
        const a = startAngle + (endAngle - startAngle) * p;
        const innerR = radius - 16;
        const outerR = radius - 24;

        const x1 = centerX + Math.cos(a) * innerR;
        const y1 = centerY + Math.sin(a) * innerR;
        const x2 = centerX + Math.cos(a) * outerR;
        const y2 = centerY + Math.sin(a) * outerR;

        // Tick line
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Clock Number Label Text
        const textR = radius - 38;
        const tx = centerX + Math.cos(a) * textR;
        const ty = centerY + Math.sin(a) * textR;

        ctx.fillStyle = '#94a3b8';
        ctx.font = 'bold 11px system-ui, -apple-system, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(tick.label, tx, ty);
      });

      // Draw Sleek Needle
      const needleX = centerX + Math.cos(activeAngle) * (radius - 10);
      const needleY = centerY + Math.sin(activeAngle) * (radius - 10);

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(needleX, needleY);
      ctx.strokeStyle = activePhase === 'upload' ? '#c084fc' : '#38bdf8';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Dark Metallic Knob Center
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
  }, [value, isTesting, unit, activePhase]);

  return (
    <div className="w-full flex flex-col items-center justify-center p-2">
      {/* Clean & Sleek Dial Face (No text clutter inside dial) */}
      <canvas
        ref={canvasRef}
        width={380}
        height={240}
        className="w-[380px] h-[240px] max-w-full"
      />

      {/* Prominent Speed Readout Positioned Directly Below Meter */}
      <div className="flex flex-col items-center justify-center text-center mt-2">
        {/* Large Speed Number */}
        <div className="text-4xl sm:text-6xl font-black text-white tracking-tight flex items-baseline gap-2 font-mono">
          <span>{displayVal.toFixed(2)}</span>
          <span className="text-sm sm:text-base font-bold text-cyan-400 font-sans">{displayUnit}</span>
        </div>

        {/* Megabytes conversion sub-display */}
        {unit === 'Mbps' && (
          <div className="text-xs text-slate-400 font-mono mt-1">
            ({(value / 8).toFixed(2)} Megabytes/sec)
          </div>
        )}

        {/* Active Stage Indicator Badge */}
        <div className="mt-3 inline-flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-1 rounded-full text-xs font-bold text-slate-200 shadow-md">
          {activePhase === 'download' && <ArrowDownCircle className="w-4 h-4 text-cyan-400 animate-bounce" />}
          {activePhase === 'upload' && <ArrowUpCircle className="w-4 h-4 text-purple-400 animate-bounce" />}
          {activePhase === 'ping' && <Zap className="w-4 h-4 text-amber-400" />}
          <span>{stageName}</span>
        </div>
      </div>
    </div>
  );
};
