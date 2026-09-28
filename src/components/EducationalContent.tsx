'use client';

import React, { useState } from 'react';
import { 
  Wifi, 
  ArrowDownCircle, 
  ArrowUpCircle, 
  Clock, 
  Zap, 
  Tv, 
  Gamepad2, 
  Briefcase, 
  HelpCircle, 
  ChevronDown, 
  CheckCircle2, 
  AlertCircle,
  Router,
  Layers
} from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "What is the difference between Megabits (Mbps) and Megabytes (MB/s)?",
    answer: "Internet service providers (ISPs) advertise connection speeds in Megabits per second (Mbps). However, file downloads, operating systems, and browsers measure file sizes in Megabytes (MB/s). Because 1 Byte contains 8 bits, you must divide your Mbps speed by 8 to determine your real-world download speed. For example, a 100 Mbps fiber plan downloads a 1 GB movie at roughly 12.5 MB/s."
  },
  {
    question: "Why does my speed test result differ from what I pay my ISP for?",
    answer: "Several factors reduce your speed compared to your advertised ISP tier: (1) Wi-Fi signal loss and distance from your wireless router; (2) Wi-Fi interference from neighboring networks; (3) router hardware bottlenecks handling multiple connected devices; (4) network overhead and packet encryption; and (5) ISP throttling during peak neighborhood congestion hours."
  },
  {
    question: "What is Bufferbloat and why does it cause gaming lag?",
    answer: "Bufferbloat occurs when your Wi-Fi router excessively buffers packets during large uploads or downloads, creating high latency spikes (loaded ping). Even with gigabit download speeds, bufferbloat can cause your ping to jump from 15ms to over 300ms while someone in your household streams video or uploads files. Enabling Smart Queue Management (SQM) on your router eliminates bufferbloat."
  },
  {
    question: "What internet speed do I need for smooth 4K Ultra HD streaming?",
    answer: "Netflix, YouTube, and Disney+ recommend a minimum consistent download speed of 25 Mbps per concurrent 4K stream. For households with multiple simultaneous 4K TVs, remote workers, and active downloads, a plan of at least 100 Mbps to 200 Mbps is recommended to prevent buffering."
  },
  {
    question: "How does Ping (Latency) affect online gaming performance?",
    answer: "Ping measures the time (in milliseconds) required for a packet of data to travel from your computer to the game server and back. A ping below 20ms is considered esports-grade; 20ms–50ms is excellent; 50ms–100ms is acceptable; and ping above 100ms leads to noticeable hit registration delays, rubberbanding, and input latency."
  },
  {
    question: "Why should I use Ethernet instead of Wi-Fi for speed testing?",
    answer: "Ethernet CAT6 cables provide dedicated, interference-free full-duplex transmission with zero packet loss and sub-millisecond local latency. Wi-Fi signals degrade through walls, floors, and distance, which can introduce up to 40% speed variance that is unrelated to your actual ISP fiber connection."
  }
];

export const EducationalContent: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <article
      style={{ contentVisibility: 'auto', containIntrinsicSize: '0 1200px' }}
      className="w-full mt-14 space-y-12 text-slate-200"
    >
      {/* Section 1: Core Metrics Explained */}
      <section className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-cyan-500/10 border border-cyan-500/30 rounded-xl flex items-center justify-center text-cyan-400">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              Understanding Your Network Diagnostic Metrics
            </h2>
            <p className="text-xs text-slate-400">How to interpret download speed, upload throughput, latency, and bufferbloat</p>
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed mb-6">
          A modern internet speed test is much more than a simple bandwidth counter. Reliable network performance depends on the harmony between raw data throughput and low-latency packet transmission. Below is a comprehensive breakdown of the core telemetry metrics measured by SpeedNetHub.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Download */}
          <div className="bg-slate-950/70 border border-slate-800 p-5 rounded-xl">
            <div className="flex items-center gap-2.5 text-cyan-400 font-bold text-base mb-2">
              <ArrowDownCircle className="w-5 h-5" />
              <h3>Download Speed (Mbps &amp; MB/s)</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Download speed indicates how quickly your connection fetches data from cloud servers to your device. High download speeds are vital for streaming high-bitrate 4K content, updating game libraries (Steam, Epic Games), and downloading massive CAD/software assets without delay.
            </p>
          </div>

          {/* Upload */}
          <div className="bg-slate-950/70 border border-slate-800 p-5 rounded-xl">
            <div className="flex items-center gap-2.5 text-blue-400 font-bold text-base mb-2">
              <ArrowUpCircle className="w-5 h-5" />
              <h3>Upload Speed (Mbps &amp; MB/s)</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Upload speed reflects how fast your computer transmits data to the internet. It governs crystal-clear Zoom and Google Meet video broadcasts, Twitch and YouTube live streaming, cloud backup syncs (OneDrive, Google Drive), and responsive multiplayer gaming inputs.
            </p>
          </div>

          {/* Idle Latency */}
          <div className="bg-slate-950/70 border border-slate-800 p-5 rounded-xl">
            <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-base mb-2">
              <Clock className="w-5 h-5" />
              <h3>Idle Latency (Ping in ms)</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Ping is the round-trip reaction time of your connection measured under an unloaded network. Lower ping values mean instant response times in online gaming, faster website rendering, and responsive real-time voice communications without audio delay.
            </p>
          </div>

          {/* Loaded Latency / Bufferbloat */}
          <div className="bg-slate-950/70 border border-slate-800 p-5 rounded-xl">
            <div className="flex items-center gap-2.5 text-amber-400 font-bold text-base mb-2">
              <Zap className="w-5 h-5" />
              <h3>Loaded Ping &amp; Bufferbloat Spikes</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Loaded ping measures latency while your connection is fully saturated with downloads or uploads. An increase of more than 30ms during saturation indicates router bufferbloat, which produces sudden lag and rubberbanding in online games and frozen video frames during conference calls.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Internet Speed Requirement Matrix */}
      <section className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center justify-center text-emerald-400">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              Recommended Internet Speeds by Online Activity
            </h2>
            <p className="text-xs text-slate-400">Find the optimal bandwidth tier tailored to your household and daily usage</p>
          </div>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/40">
                <th className="py-3 px-4">Activity / Use Case</th>
                <th className="py-3 px-4">Recommended Download</th>
                <th className="py-3 px-4">Recommended Upload</th>
                <th className="py-3 px-4">Ideal Latency (Ping)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition">
                <td className="py-3 px-4 flex items-center gap-2 font-medium text-white">
                  <Tv className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <span>4K Ultra HD Streaming (Netflix, YouTube)</span>
                </td>
                <td className="py-3 px-4 text-emerald-400 font-bold">25–50 Mbps</td>
                <td className="py-3 px-4">5 Mbps</td>
                <td className="py-3 px-4">&lt; 80 ms</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition">
                <td className="py-3 px-4 flex items-center gap-2 font-medium text-white">
                  <Gamepad2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Competitive Gaming (Valorant, CS2, Fortnite)</span>
                </td>
                <td className="py-3 px-4 text-emerald-400 font-bold">15–30 Mbps</td>
                <td className="py-3 px-4">10 Mbps</td>
                <td className="py-3 px-4 text-emerald-400 font-bold">&lt; 30 ms</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition">
                <td className="py-3 px-4 flex items-center gap-2 font-medium text-white">
                  <Briefcase className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>Remote Work &amp; HD Video Calls (Zoom, Teams)</span>
                </td>
                <td className="py-3 px-4 text-emerald-400 font-bold">25–50 Mbps</td>
                <td className="py-3 px-4 text-emerald-400 font-bold">15–25 Mbps</td>
                <td className="py-3 px-4">&lt; 50 ms</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition">
                <td className="py-3 px-4 flex items-center gap-2 font-medium text-white">
                  <Wifi className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span>Multi-Device Household (4+ Active Users)</span>
                </td>
                <td className="py-3 px-4 text-emerald-400 font-bold">200–500 Mbps</td>
                <td className="py-3 px-4 text-emerald-400 font-bold">50–100 Mbps</td>
                <td className="py-3 px-4">&lt; 40 ms</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 3: Megabits vs Megabytes Formula */}
      <section className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl">
        <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
          The Math Behind Speeds: Megabits (Mbps) vs Megabytes (MB/s)
        </h2>
        <p className="text-xs text-slate-400 mb-6">Why your 100 Mbps internet plan downloads files at 12.5 MB/s</p>

        <div className="bg-slate-950/80 border border-cyan-500/20 rounded-xl p-5 mb-6">
          <div className="text-sm font-semibold text-cyan-300 mb-2">The Standard 8:1 Conversion Formula</div>
          <div className="text-base sm:text-lg font-mono text-white bg-slate-900 px-4 py-2.5 rounded-lg border border-slate-800 inline-block">
            Download Speed (MB/s) = Advertised Speed (Mbps) ÷ 8
          </div>
          <p className="text-xs text-slate-300 mt-3 leading-relaxed">
            In digital computing, 1 Byte consists of 8 individual bits. Networking equipment and telecom providers communicate transmission rates in bits (Mbps), while operating systems like Windows and macOS display file transfers in Bytes (MB/s).
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-xl">
            <div className="text-xs text-slate-400 font-medium">50 Mbps Plan</div>
            <div className="text-base font-extrabold text-cyan-400 mt-1">6.25 MB/s</div>
            <div className="text-[10px] text-slate-500">Max Download Rate</div>
          </div>
          <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-xl">
            <div className="text-xs text-slate-400 font-medium">100 Mbps Plan</div>
            <div className="text-base font-extrabold text-cyan-400 mt-1">12.5 MB/s</div>
            <div className="text-[10px] text-slate-500">Max Download Rate</div>
          </div>
          <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-xl">
            <div className="text-xs text-slate-400 font-medium">300 Mbps Plan</div>
            <div className="text-base font-extrabold text-cyan-400 mt-1">37.5 MB/s</div>
            <div className="text-[10px] text-slate-500">Max Download Rate</div>
          </div>
          <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-xl">
            <div className="text-xs text-slate-400 font-medium">1000 Mbps (Gigabit)</div>
            <div className="text-base font-extrabold text-cyan-400 mt-1">125 MB/s</div>
            <div className="text-[10px] text-slate-500">Max Download Rate</div>
          </div>
        </div>
      </section>

      {/* Section 4: 6 Actionable Steps to Boost Your Internet */}
      <section className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-indigo-500/10 border border-indigo-500/30 rounded-xl flex items-center justify-center text-indigo-400">
            <Router className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              6 Practical Ways to Improve Your Internet Speed &amp; Latency
            </h2>
            <p className="text-xs text-slate-400">Proven technical steps you can take today to eliminate lag and boost throughput</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3 bg-slate-950/60 border border-slate-800 p-4 rounded-xl">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-white">1. Switch to a Wired Ethernet (CAT6) Connection</h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Direct Ethernet cabling completely removes wireless interference, RF signal fading, and Wi-Fi congestion. For competitive gaming, large file uploads, and home office workstations, Ethernet provides maximum speed and the lowest possible latency.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-slate-950/60 border border-slate-800 p-4 rounded-xl">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-white">2. Use the 5 GHz or 6 GHz Wi-Fi Band Instead of 2.4 GHz</h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                The 2.4 GHz band is crowded with microwaves, Bluetooth devices, and neighbor Wi-Fi signals. Connecting your devices to 5 GHz or Wi-Fi 6 (6 GHz) provides wider channel width and exponentially higher throughput.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-slate-950/60 border border-slate-800 p-4 rounded-xl">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-white">3. Configure Ultra-Fast Anycast DNS Resolvers</h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Default ISP DNS servers often introduce lookup latency and unoptimized routing. Changing your router or device DNS to Cloudflare (1.1.1.1) or Google Public DNS (8.8.8.8) speeds up domain resolution and website loading times.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-slate-950/60 border border-slate-800 p-4 rounded-xl">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-white">4. Enable Smart Queue Management (SQM) on Your Router</h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                SQM algorithms such as CAKE or FQ-CoDel automatically manage packet queues to ensure time-sensitive traffic (voice and gaming) is prioritized over heavy downloads, completely eliminating bufferbloat latency spikes.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-slate-950/60 border border-slate-800 p-4 rounded-xl">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-white">5. Restart Modem and Router Hardware Regularly</h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Network modems and routers accumulate state tables, memory cache fragments, and stale DHCP leases over time. A bi-weekly restart clears device memory and forces renegotiation of clean frequency channels with your ISP.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-slate-950/60 border border-slate-800 p-4 rounded-xl">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-white">6. Audit Background Bandwidth Consumers</h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Check Task Manager (Windows) or Activity Monitor (macOS) for background processes like Steam game auto-updates, cloud synchronization clients, and torrent seeding that quietly saturate your upload connection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Interactive Frequently Asked Questions */}
      <section className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-center justify-center text-rose-400">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              Frequently Asked Questions (FAQ)
            </h2>
            <p className="text-xs text-slate-400">Direct answers to the most common questions regarding network diagnostics</p>
          </div>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="border border-slate-800 bg-slate-950/60 rounded-xl overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-slate-900/50 transition focus:outline-none"
                >
                  <span className="text-xs sm:text-sm font-bold text-white">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform flex-shrink-0 ${
                      isOpen ? 'transform rotate-180 text-cyan-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 pt-1 text-xs text-slate-300 leading-relaxed border-t border-slate-800/40">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </article>
  );
};
