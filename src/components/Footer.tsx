'use client';

import React from 'react';
import Link from 'next/link';
import { Activity, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800/80 text-slate-300 text-xs mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-cyan-500 rounded flex items-center justify-center text-slate-950 font-black">
                <Activity className="w-4 h-4 text-slate-950" />
              </div>
              <span className="font-extrabold text-white text-base">SpeedNetHub</span>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed mb-3">
              The Search-Engine-Optimized Network Diagnostic &amp; ISP Intelligence Hub. Diagnosing YouTube 4K buffer rates, game cluster latency, bufferbloat, and ISP traffic shaping.
            </p>
            <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>FCC Neutrality Audit Compliant</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-2">Application Hubs</h4>
            <ul className="space-y-1">
              <li><Link href="/test-youtube-4k-streaming-speed" className="block py-1.5 text-slate-300 hover:text-cyan-400 transition">YouTube 4K Streaming Speed</Link></li>
              <li><Link href="/zoom-call-reliability-test" className="block py-1.5 text-slate-300 hover:text-cyan-400 transition">Zoom Call Reliability Checker</Link></li>
              <li><Link href="/can-i-stream-on-twitch-calculator" className="block py-1.5 text-slate-300 hover:text-cyan-400 transition">Twitch OBS Bitrate Calculator</Link></li>
              <li><Link href="/tools/youtube-inspector" className="block py-1.5 text-slate-300 hover:text-cyan-400 transition">YouTube Bitrate vs Speed Inspector</Link></li>
              <li><Link href="/tools/wfh-stability-score" className="block py-1.5 text-slate-300 hover:text-cyan-400 transition">Work From Home Stability Grade</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-2">Game Server Pings</h4>
            <ul className="space-y-1">
              <li><Link href="/valorant-ping-checker" className="block py-1.5 text-slate-300 hover:text-cyan-400 transition">Valorant Ping Checker (Riot US/EU)</Link></li>
              <li><Link href="/roblox-latency-test" className="block py-1.5 text-slate-300 hover:text-cyan-400 transition">Roblox Latency Diagnostic</Link></li>
              <li><Link href="/fortnite-packet-loss-diagnostic" className="block py-1.5 text-slate-300 hover:text-cyan-400 transition">Fortnite Packet Loss Matrix</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-2">ISP Comparison Directory</h4>
            <ul className="space-y-1">
              <li><Link href="/isp/chicago/comcast-xfinity-review-real-speeds" className="block py-1.5 text-slate-300 hover:text-cyan-400 transition">Comcast Xfinity Real Speeds (Chicago)</Link></li>
              <li><Link href="/isp/new-york/verizon-fios-real-speeds" className="block py-1.5 text-slate-300 hover:text-cyan-400 transition">Verizon Fios Real Speeds (NYC)</Link></li>
              <li><Link href="/isp/dallas/att-fiber-review-real-speeds" className="block py-1.5 text-slate-300 hover:text-cyan-400 transition">AT&amp;T Fiber Benchmark (Dallas)</Link></li>
              <li><Link href="/isp/los-angeles/spectrum-speed-test" className="block py-1.5 text-slate-300 hover:text-cyan-400 transition">Spectrum Throttling Audit (LA)</Link></li>
              <li><Link href="/tools/isp-throttling-report" className="block py-1.5 text-slate-300 hover:text-cyan-400 transition">Download Official Complaint PDF</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-300 gap-3">
          <div>© {new Date().getFullYear()} SpeedNetHub. All rights reserved. Designed for maximum ad viewability &amp; network transparency.</div>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="py-1 text-slate-300 hover:text-cyan-400 transition">Privacy Policy</Link>
            <Link href="/terms-of-service" className="py-1 text-slate-300 hover:text-cyan-400 transition">Terms of Service</Link>
            <Link href="/isp" className="py-1 text-slate-300 hover:text-cyan-400 transition">ISP Directory</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
