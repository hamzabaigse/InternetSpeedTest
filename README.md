# SpeedNetHub — SEO Network Diagnostic & ISP Intelligence Hub

SpeedNetHub transforms standard 10-second speed tests into a high-RPM, low-competition **Search-Engine-Optimized Network Diagnostic & ISP Intelligence Hub**.

## 🚀 Key Features

### 1. High-RPM, Low-Competition SEO Architecture
- **Application-Specific Landing Pages (Programmatic SEO)**:
  - `/test-youtube-4k-streaming-speed` — Tests YouTube CDN edge nodes (`googlevideo-edge-ord03`) and answers *"Will my connection buffer at 4K 60fps?"*
  - `/zoom-call-reliability-test` — Runs a 15-second UDP packet jitter test and outputs a *"Zoom Call Drop Probability"* score.
  - `/can-i-stream-on-twitch-calculator` — Analyzes upload throughput stability and calculates recommended OBS bitrate.
- **Gaming & Server-Ping Directory**:
  - `/valorant-ping-checker` — Real-time ping map to Riot Games Valorant clusters (US East, US West, EU Central, Tokyo).
  - `/roblox-latency-test` — Roblox latency & rubberbanding diagnostic.
  - `/fortnite-packet-loss-diagnostic` — Epic Games AWS packet loss matrix.
- **Programmatic ISP Comparison Directory**:
  - `/isp` — Master ISP directory index.
  - `/isp/[city]/[isp]` — Programmatic city & ISP pages (e.g. `/isp/chicago/comcast-xfinity-review-real-speeds`) displaying peak-hour throttling statistics (8 PM – 11 PM), customer ratings, crowdsourced reviews, and competitor fiber/5G ad banners.

---

### 2. Retention & AdSense Optimization Strategy
- **4-Stage Progressive Diagnostic Console**: Extends dwell time to 40+ seconds by running raw throughput, bufferbloat check, YouTube 4K CDN buffer test, VoIP audio jitter, and regional game cluster latency map.
- **Interactive Results Tabs & Active Refresh**: Switching between *Overview*, *YouTube Streaming*, *Gaming Hub*, and *Router Tweaks* triggers ad viewability refreshes.
- **High-Intent "Fix It" Action Cards**: Contextual native affiliate cards (SQM Gaming Routers, ExitLag / ExpressVPN, CAT8 Ethernet Cables).
- **Speed Degradation Monitor (Background Tab Utility)**: Continuous background pinger at `/background-monitor` alerting remote workers if their connection drops.

---

### 3. Advanced Diagnostic & Complaint Tools
- **ISP Throttling Proof Generator (Exportable PDF Report)**: Generates an official downloadable PDF report at `/tools/isp-throttling-report` formatted for ISP support tickets and FCC/regulatory filings.
- **YouTube "Actual Bitrate vs. Speed" Inspector**: Tests direct Google Video CDN chunk delivery rate at `/tools/youtube-inspector`.
- **Work From Home Stability Score**: Composite grade ($A+$ to $F$) at `/tools/wfh-stability-score` for remote workers.

---

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ & npm

### Installation
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Build Production Bundle
```bash
npm run build
npm start
```
