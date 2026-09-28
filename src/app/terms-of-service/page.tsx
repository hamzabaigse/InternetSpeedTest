import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FileText, Shield } from 'lucide-react';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://speed-net.online';
const title = 'Terms of Service';
const description = 'Terms and Conditions for using SpeedNetHub network testing and diagnostic tools.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${baseUrl}/terms-of-service` },
  openGraph: { title, description, url: `${baseUrl}/terms-of-service`, type: 'website' },
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-dark-bg text-slate-100 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 bg-cyan-500/10 border border-cyan-500/30 rounded-xl flex items-center justify-center text-cyan-400 shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Terms of Service</h1>
            <p className="text-xs text-slate-400 mt-1">Last updated: September 28, 2026</p>
          </div>
        </div>

        <div className="space-y-6 text-sm text-slate-300 leading-relaxed bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <section>
            <h2 className="text-white font-bold text-base mb-2">1. Agreement to Terms</h2>
            <p>
              By accessing and using SpeedNetHub (&quot;the Service&quot;, accessible via speed-net.online), you agree to be bound
              by these Terms of Service. If you do not agree with any part of these terms, please discontinue use of the site immediately.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-base mb-2">2. Description of Service</h2>
            <p>
              SpeedNetHub provides free, browser-based network diagnostic utilities including multi-stream download throughput,
              upload bandwidth testing, bufferbloat analysis, gaming server cluster ping measurements, and downloadable ISP compliance audits.
              The Service is provided free of charge for informational, diagnostic, and educational purposes.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-base mb-2">3. Acceptable Use Policy</h2>
            <p>
              You agree to use the Service in compliance with all applicable local, national, and international laws. You agree not to:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-300">
              <li>Launch automated Denial of Service (DoS) attacks or intentionally flood test endpoints.</li>
              <li>Scrape, reverse-engineer, or attempt to compromise server infrastructure.</li>
              <li>Misrepresent network audit results in fraudulent or deceptive legal filings.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-bold text-base mb-2">4. Accuracy of Network Diagnostics &amp; Disclaimer</h2>
            <p>
              Network throughput and latency can fluctuate based on Wi-Fi interference, local network congestion, hardware performance,
              and ISP peering routes. Diagnostic results are estimates provided on an &quot;as-is&quot; and &quot;as-available&quot; basis
              without warranties of any kind.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-base mb-2">5. Third-Party Advertisements</h2>
            <p>
              SpeedNetHub is an ad-supported free utility. Third-party advertising services (including Google AdSense) may serve ads
              on the Service. We do not endorse or assume liability for third-party products, offers, or external websites linked
              through advertising units.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-base mb-2">6. Limitation of Liability</h2>
            <p>
              In no event shall SpeedNetHub or its operators be held liable for any direct, indirect, incidental, or consequential
              damages resulting from the use or inability to use the Service or reliance upon generated speed test data.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-base mb-2">7. Contact Information</h2>
            <p>
              If you have any questions or feedback regarding these Terms, please reach out to us at{' '}
              <a href="mailto:support@speed-net.online" className="text-cyan-400 underline hover:text-cyan-300">
                support@speed-net.online
              </a>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
