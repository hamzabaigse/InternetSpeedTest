'use client';

import React from 'react';
import Link from 'next/link';
import { Activity, ShieldAlert, Tv, Gamepad2, FileText, MonitorCheck, MapPin } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center text-slate-950 font-black text-xl shadow-md glow-cyan group-hover:scale-105 transition transform">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-extrabold text-white text-base tracking-tight flex items-center gap-1.5">
              SpeedNet<span className="text-cyan-400">Hub</span>
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border border-emerald-500/30">
                100% FREE HUB
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block">Free ISP Intelligence &amp; Network Telemetry</p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 text-xs font-medium text-slate-300">
          <Link href="/" className="hover:text-cyan-400 transition flex items-center gap-1">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>Speed Test</span>
          </Link>

          <Link href="/test-youtube-4k-streaming-speed" className="hover:text-cyan-400 transition flex items-center gap-1">
            <Tv className="w-3.5 h-3.5 text-blue-400" />
            <span>YouTube 4K Test</span>
          </Link>

          <Link href="/valorant-ping-checker" className="hover:text-cyan-400 transition flex items-center gap-1">
            <Gamepad2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Game Ping Hub</span>
          </Link>

          <Link href="/isp" className="hover:text-cyan-400 transition flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>ISP Directory</span>
          </Link>

          <Link href="/tools/isp-throttling-report" className="hover:text-cyan-400 transition flex items-center gap-1">
            <FileText className="w-3.5 h-3.5 text-rose-400" />
            <span>Throttling PDF Report</span>
          </Link>

          <Link href="/background-monitor" className="hover:text-cyan-400 transition flex items-center gap-1">
            <MonitorCheck className="w-3.5 h-3.5 text-indigo-400" />
            <span>Background Monitor</span>
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/tools/isp-throttling-report"
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs px-3.5 py-2 rounded-lg transition shadow-md flex items-center gap-1.5"
          >
            <ShieldAlert className="w-4 h-4" />
            <span className="hidden sm:inline">Free PDF Complaint</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
