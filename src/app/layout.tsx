import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SpeedNetHub — SEO Network Diagnostic & ISP Intelligence Hub',
  description: 'Search-Engine-Optimized Network Diagnostic Hub testing YouTube 4K streaming buffer rates, game datacenter ping matrix, bufferbloat, and ISP throttling.',
  keywords: ['internet speed test', 'youtube 4k buffer test', 'valorant ping checker', 'bufferbloat test', 'isp throttling proof report', 'zoom call reliability'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-dark-bg text-slate-100 min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
