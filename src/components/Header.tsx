'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Activity, ShieldAlert, Tv, Gamepad2, FileText, MonitorCheck, MapPin, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '/', label: 'Speed Test', icon: Activity, color: 'text-cyan-400' },
  { href: '/test-youtube-4k-streaming-speed', label: 'YouTube 4K Test', icon: Tv, color: 'text-blue-400' },
  { href: '/valorant-ping-checker', label: 'Game Ping Hub', icon: Gamepad2, color: 'text-emerald-400' },
  { href: '/isp', label: 'ISP Directory', icon: MapPin, color: 'text-amber-400' },
  { href: '/tools/isp-throttling-report', label: 'Throttling PDF Report', icon: FileText, color: 'text-rose-400' },
  { href: '/background-monitor', label: 'Background Monitor', icon: MonitorCheck, color: 'text-indigo-400' },
];

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          {NAV_LINKS.map(({ href, label, icon: Icon, color }) => (
            <Link key={href} href={href} className="hover:text-cyan-400 transition flex items-center gap-1">
              <Icon className={`w-3.5 h-3.5 ${color}`} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/tools/isp-throttling-report"
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs px-3.5 py-2 rounded-lg transition shadow-md flex items-center gap-1.5"
          >
            <ShieldAlert className="w-4 h-4" />
            <span className="hidden sm:inline">Free PDF Complaint</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg bg-slate-900 border border-slate-800 text-slate-200 hover:text-cyan-400 hover:border-cyan-500/40 transition"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {isMenuOpen && (
        <nav
          id="mobile-nav"
          className="lg:hidden border-t border-slate-800/80 bg-slate-950/95 backdrop-blur-md px-4 py-3 flex flex-col gap-1"
        >
          {NAV_LINKS.map(({ href, label, icon: Icon, color }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-900 hover:text-cyan-400 transition"
            >
              <Icon className={`w-4 h-4 ${color}`} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};
