import Header from '@/components/frontend/Header'
import Footer from '@/components/frontend/Footer'

export const metadata = { title: 'Disclaimer | A786' }

export default function DisclaimerPage() {
  return (
    <div className="min-h-dvh grid-bg">
      <Header />
      <main className="px-3 pb-6">
        <div className="py-3 text-center my-4" style={{ background: 'linear-gradient(90deg, #854d0e 0%, #FFD700 40%, #FFC107 60%, #854d0e 100%)' }}>
          <h1 className="font-display text-2xl tracking-widest text-bg">DISCLAIMER</h1>
        </div>
        {[
          { t: 'For Entertainment Only', c: 'This website is intended solely for entertainment and informational purposes. The content, including A786 results and charts, is provided as general information only and should not be used for any other purpose.' },
          { t: 'No Gambling Promotion', c: 'This website does not promote, encourage, or facilitate gambling in any form. We do not accept bets, process payments, or provide any gambling services. We only display publicly available result information.' },
          { t: 'Legal Disclaimer', c: 'Gambling may be illegal in your state, country, or jurisdiction. It is the sole responsibility of the user to ensure they are complying with all applicable local laws before accessing this website. We accept no liability for any illegal use of this website.' },
          { t: 'No Guarantee of Accuracy', c: 'While we strive to provide accurate and timely results, we make no warranties or representations about the accuracy, completeness, or timeliness of any information on this website. All content is provided "as is" without warranty of any kind.' },
          { t: 'No Liability', c: 'Under no circumstances shall this website, its owners, or its operators be liable for any direct, indirect, incidental, or consequential damages arising from the use or inability to use this website or its content.' },
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
