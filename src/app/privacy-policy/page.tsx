import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ShieldCheck } from 'lucide-react';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://speed-net.online';
const path = '/privacy-policy';
const title = 'Privacy Policy';
const description = 'How SpeedNetHub collects, uses, and protects data from network diagnostic tests, cookies, and advertising partners.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${baseUrl}${path}` },
  openGraph: { title, description, url: `${baseUrl}${path}`, type: 'website' },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-dark-bg text-slate-100 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 bg-cyan-500/10 border border-cyan-500/30 rounded-xl flex items-center justify-center text-cyan-400 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Privacy Policy</h1>
            <p className="text-xs text-slate-400 mt-1">Last updated: September 28, 2026</p>
          </div>
        </div>

        <div className="space-y-6 text-sm text-slate-300 leading-relaxed bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <p>
            SpeedNetHub (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), operating at{' '}
            <a href="https://speed-net.online" className="text-cyan-400 underline">https://speed-net.online</a>,
            provides free browser-based network diagnostic tools. We respect your privacy and are committed to protecting
            any information collected through our website. This Privacy Policy details our practices regarding network test data,
            cookies, and third-party advertising.
          </p>

          <section>
            <h2 className="text-white font-bold text-base mb-2">1. Network Diagnostic Data Collection</h2>
            <p>
              When you initiate an internet speed test, ping check, or ISP audit:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-300">
              <li>Our test engines measure your download bandwidth, upload capacity, round-trip latency, and jitter.</li>
              <li>Your IP address is used temporarily to determine your geographic region and closest test server node.</li>
              <li>SpeedNetHub does not require registration, login, or personal identifiers to access any diagnostic tool.</li>
              <li>Generated test results are processed locally in your web browser.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-bold text-base mb-2">2. Google AdSense &amp; Third-Party Advertising (Mandatory Policy Disclosures)</h2>
            <p>
              SpeedNetHub is supported by advertising revenue, including services provided by Google AdSense. In accordance with
              Google&apos;s advertising policies:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-2 text-slate-300">
              <li>
                <strong>Third-party vendors, including Google, use cookies</strong> to serve ads based on a user&apos;s prior visits
                to our website or other websites across the internet.
              </li>
              <li>
                <strong>Google&apos;s use of advertising cookies</strong> (such as the DoubleClick cookie) enables it and its partners
                to serve ads to our users based on their visit to our site and/or other sites on the Internet.
              </li>
              <li>
                <strong>Users may opt out of personalized advertising</strong> by visiting{' '}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 underline hover:text-cyan-300"
                >
                  Google Ads Settings
                </a>.
              </li>
              <li>
                Alternatively, you can opt out of a third-party vendor&apos;s use of cookies for personalized advertising by visiting{' '}
                <a
                  href="https://www.aboutads.info/choices/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 underline hover:text-cyan-300"
                >
                  www.aboutads.info
                </a>.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-bold text-base mb-2">3. Cookies &amp; Web Beacons</h2>
            <p>
              Cookies are small data files stored on your device. We and our advertising partners use cookies to remember preferences,
              measure ad delivery effectiveness, and protect against fraudulent traffic. You can choose to disable or selectively turn off
              cookies in your browser settings, though this may affect how you interact with other sites.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-base mb-2">4. CCPA &amp; GDPR Compliance</h2>
            <p>
              Under the California Consumer Privacy Act (CCPA) and European Union General Data Protection Regulation (GDPR), users have
              the right to access, rectify, or request deletion of personal information, as well as the right to opt out of the sale or sharing
              of personal information for targeted advertising through the opt-out links provided above.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-base mb-2">5. Children&apos;s Privacy (COPPA)</h2>
            <p>
              SpeedNetHub does not knowingly collect personally identifiable information from children under the age of 13.
              Our diagnostic tools are intended for general audiences.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-base mb-2">6. Contact Information</h2>
            <p>
              If you have any questions about this Privacy Policy, your data, or our advertising practices, please contact us at:
            </p>
            <p className="mt-2 text-white font-medium">
              Email: <a href="mailto:support@speed-net.online" className="text-cyan-400 underline">support@speed-net.online</a>
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
