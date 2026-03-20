import Header from '@/components/frontend/Header'
import Footer from '@/components/frontend/Footer'

export const metadata = { title: 'Privacy Policy | A786' }

export default function PrivacyPage() {
  return (
    <div className="min-h-dvh grid-bg">
      <Header />
      <main className="px-3 pb-6">
        <div className="py-3 text-center my-4" style={{ background: 'linear-gradient(90deg, #854d0e 0%, #FFD700 40%, #FFC107 60%, #854d0e 100%)' }}>
          <h1 className="font-display text-2xl tracking-widest text-bg">PRIVACY POLICY</h1>
        </div>
        {[
          { t: 'Information We Collect', c: 'We do not collect any personally identifiable information unless you voluntarily provide it by contacting us. We may collect anonymous usage data such as page views and device type to improve the website experience.' },
          { t: 'How We Use Information', c: 'Any information collected is used solely to improve website performance and user experience. We do not sell, trade, or rent your personal information to third parties under any circumstances.' },
          { t: 'Cookies', c: 'This website may use cookies to enhance your browsing experience. You can disable cookies in your browser settings. Disabling cookies will not affect your ability to view results or charts on this website.' },
          { t: 'Third Party Links', c: 'Our website may contain links to third-party websites. We are not responsible for the privacy practices of those websites. We encourage users to read the privacy policy of every website they visit.' },
          { t: 'Data Security', c: 'We implement reasonable security measures to protect any information you provide. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.' },
          { t: 'Changes to This Policy', c: 'We reserve the right to update this privacy policy at any time. Changes will be posted on this page. Continued use of the website after changes are posted constitutes acceptance of the updated policy.' },
        ].map((s, i) => (
          <div key={i}>
            <div className="py-2.5 px-4 mt-4" style={{ background: 'linear-gradient(90deg, #854d0e 0%, #FFD700 40%, #FFC107 60%, #854d0e 100%)' }}>
              <h2 className="font-display text-lg tracking-wide text-bg">{s.t}</h2>
            </div>
            <div className="bg-surface border-x border-b border-border px-4 py-4">
              <p className="text-text text-sm leading-relaxed">{s.c}</p>
            </div>
          </div>
        ))}
      </main>
      <Footer />
    </div>
  )
}
