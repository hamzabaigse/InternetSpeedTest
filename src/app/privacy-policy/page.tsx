import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ShieldCheck } from 'lucide-react';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://speednethub.com';
const path = '/privacy-policy';
const title = 'Privacy Policy';
const description = 'How SpeedNetHub collects, uses, and protects data from network diagnostic tests, background monitoring, and advertising.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${baseUrl}${path}` },
  openGraph: { title, description, url: `${baseUrl}${path}`, type: 'website' },
  twitter: { card: 'summary_large_image', title, description },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-dark-bg text-slate-100 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 bg-cyan-500/10 border border-cyan-500/30 rounded-xl flex items-center justify-center text-cyan-400 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Privacy Policy</h1>
            <p className="text-xs text-slate-500 mt-1">Last updated: September 27, 2026</p>
          </div>
        </div>

        <div className="space-y-6 text-sm text-slate-300 leading-relaxed bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <p>
            SpeedNetHub (&quot;we&quot;, &quot;us&quot;) provides free network diagnostic tools, including speed tests, latency checkers,
            and a downloadable ISP complaint report generator. This policy explains what data those tools collect and how it is used.
          </p>

          <section>
            <h2 className="text-white font-bold text-base mb-2">Diagnostic Test Data</h2>
            <p>
              Running a speed test, ping check, or diagnostic report sends small amounts of traffic to our servers (and, for
              specific tools, to third-party CDN endpoints such as Google Video CDN or public game server clusters) to measure
              throughput and latency. Results are processed in your browser and are not tied to an account, since SpeedNetHub
              does not require registration or login for any tool.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-base mb-2">Background Monitor</h2>
            <p>
              The Background Monitor tool runs periodic connectivity checks only while its tab is open in your browser. It stops
              collecting data as soon as the tab is closed and does not run on a server on your behalf.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-base mb-2">Crowdsourced ISP Reviews</h2>
            <p>
              Reviews submitted on ISP comparison pages include the text you enter and a star rating. Avoid including personal
              information in review text, since submitted reviews are displayed publicly.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-base mb-2">Cookies &amp; Advertising</h2>
            <p>
              SpeedNetHub is ad-supported. Third-party advertising partners may use cookies or similar technologies to serve
              relevant ads and measure ad performance. You can control cookie preferences through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-base mb-2">Contact</h2>
            <p>
              Questions about this policy can be sent through the contact details listed on our homepage.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
