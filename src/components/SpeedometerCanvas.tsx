'use client';

import React, { useEffect, useRef } from 'react';
import { speedToLogScalePercent } from '@/lib/speedTestEngine';

interface SpeedometerCanvasProps {
  value: number; // live speed or value
  unit?: string;
  isTesting: boolean;
  stageName?: string;
  displayMode?: 'Mbps' | 'MBps';
}

export const SpeedometerCanvas: React.FC<SpeedometerCanvasProps> = ({
  value,
  unit = 'Mbps',
  isTesting,
  stageName = 'Ready',
  displayMode = 'Mbps',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Smooth needle animation state (Linear Interpolation LERP)
  const currentAnglePercentRef = useRef<number>(0);

  const displayVal = displayMode === 'MBps' && unit === 'Mbps' ? value / 8 : value;
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
      const centerY = height * 0.62;
      const radius = Math.min(width, height) * 0.42;

      ctx.clearRect(0, 0, width, height);

      // Telemetry background wave
      if (isTesting) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.12)';
        ctx.lineWidth = 2;
        waveOffset += 0.04;
        for (let x = 0; x < width; x += 5) {
          const y = height * 0.82 + Math.sin(x * 0.02 + waveOffset) * 10;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      const startAngle = Math.PI * 0.82;
      const endAngle = Math.PI * 2.18;

      // Outer track arc
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 16;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Target percent using logarithmic scale mapping
      const targetPercent = unit === 'Mbps' ? speedToLogScalePercent(value) : Math.min(1.0, value / 200);

      // Smooth LERP (spring physics on needle angle)
      currentAnglePercentRef.current += (targetPercent - currentAnglePercentRef.current) * 0.15;
      const currentPercent = currentAnglePercentRef.current;

      const activeAngle = startAngle + (endAngle - startAngle) * currentPercent;

      // Draw glowing active progress gradient
      if (currentPercent > 0.001) {
        const gradient = ctx.createLinearGradient(0, 0, width, 0);
        gradient.addColorStop(0, '#06b6d4');
        gradient.addColorStop(0.5, '#3b82f6');
        gradient.addColorStop(1, '#8b5cf6');

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, startAngle, activeAngle);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 16;
        ctx.lineCap = 'round';
        ctx.stroke();
      }

      // Ookla Logarithmic Tick Marks: 0, 5, 10, 50, 100, 250, 500, 750, 1000
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
        const innerR = radius - 18;
        const outerR = radius - 24;

        const x1 = centerX + Math.cos(a) * innerR;
        const y1 = centerY + Math.sin(a) * innerR;
        const x2 = centerX + Math.cos(a) * outerR;
        const y2 = centerY + Math.sin(a) * outerR;

        // Tick line
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Tick Label Text
        const textR = radius - 36;
        const tx = centerX + Math.cos(a) * textR;
        const ty = centerY + Math.sin(a) * textR;

        ctx.fillStyle = '#94a3b8';
        ctx.font = 'bold 10px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(tick.label, tx, ty);
      });

      // Draw Needle
      const needleX = centerX + Math.cos(activeAngle) * (radius - 8);
      const needleY = centerY + Math.sin(activeAngle) * (radius - 8);

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(needleX, needleY);
      ctx.strokeStyle = isTesting ? '#06b6d4' : '#94a3b8';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Knob
      ctx.beginPath();
      ctx.arc(centerX, centerY, 7, 0, Math.PI * 2);
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
  }, [value, isTesting, unit]);

  return (
    <div className="relative w-full flex flex-col items-center justify-center p-2">
      <canvas
        ref={canvasRef}
        width={360}
        height={250}
        className="w-[360px] h-[250px] max-w-full"
      />

      {/* Digital HUD Display */}
      <div className="absolute top-[52%] flex flex-col items-center justify-center pointer-events-none text-center">
        <div className="text-4xl sm:text-5xl font-black text-white tracking-tight flex items-baseline gap-1 font-mono">
          <span>{displayVal.toFixed(2)}</span>
          <span className="text-xs sm:text-sm font-bold text-cyan-400 font-sans">{displayUnit}</span>
        </div>

        {unit === 'Mbps' && (
          <div className="text-[10px] text-slate-400 font-mono mt-0.5">
            ({(value / 8).toFixed(2)} Megabytes/sec)
          </div>
        )}

        <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-300 mt-1.5 bg-slate-900/90 px-3 py-0.5 rounded border border-slate-800">
          {stageName}
        </div>
      </div>
    </div>
  );
};
