import Header from '@/components/frontend/Header'
import Footer from '@/components/frontend/Footer'

export const metadata = {
  title: 'Terms and Conditions | A786',
  description: 'Terms and conditions for using the A786 results website.',
}

const SECTIONS = [
  {
    title: 'Terms and Conditions',
    content: 'This website offers an information-sharing platform regarding A786 results, charts, and other related materials solely for entertainment purposes. By accessing the website, users agree to these terms, which govern usage and may be updated at any time without prior notice.',
    isIntro: true,
  },
  {
    title: 'User Eligibility and Conduct',
    content: 'Users must be of legal age as per applicable local laws and must access the website responsibly. Any unauthorized activities such as scraping without permission, hacking, spamming, or posting illegal content are strictly prohibited. This website reserves the right to ban user accounts or IP addresses that violate these rules.',
  },
  {
    title: 'Content Accuracy and No Warranties',
    content: 'All information displayed on the website, including results and charts, is provided on an "as is" basis without any guarantees of accuracy, timeliness, or completeness. Users access the content at their own risk, and independent verification is advised. This website holds no liability for errors, omissions, or decisions made based on the site\'s content.',
  },
  {
    title: 'Intellectual Property and Restrictions',
    content: 'All content, logos, and materials available on this website are the intellectual property of the website. Unauthorized reproduction, redistribution, or commercial use is prohibited. Limited fair use is allowed for personal, non-commercial viewing. Any external links provided do not imply endorsement.',
  },
  {
    title: 'Limitation of Liability and Termination',
    content: 'This website disclaims all liability for indirect or consequential damages, losses related to gambling activities, or actions of third parties. The website reserves the right to terminate services at any time, and any fees paid are non-refundable. These terms are governed by Indian law, and any disputes shall be subject to the jurisdiction of the courts of Delhi.',
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-dvh grid-bg">
      <Header />
      <main className="px-3 pb-6">
        {/* Alert banner */}
        <div
          className="py-3 px-4 my-4 rounded-xl border border-primary/40 text-sm font-mono leading-relaxed"
          style={{ background: '#1a1200', color: '#FFD700' }}
        >
          This website disclaims all liability for indirect or consequential damages, losses related to gambling activities, or actions of third parties. The website reserves the right to terminate services at any time, and any fees paid are non-refundable. These terms are governed by Indian law, and any disputes shall be subject to the jurisdiction of the courts of Delhi.
        </div>

        {/* Page title */}
        <div
          className="py-3 text-center mb-0"
          style={{ background: 'linear-gradient(90deg, #854d0e 0%, #FFD700 40%, #FFC107 60%, #854d0e 100%)' }}
        >
          <h1 className="font-display text-2xl tracking-widest text-bg">TERMS AND CONDITIONS</h1>
        </div>

        {/* Sections */}
        {SECTIONS.map((s, i) => (
          <div key={i}>
            {!s.isIntro && (
              <div
                className="py-2.5 px-4 mt-4"
                style={{ background: 'linear-gradient(90deg, #854d0e 0%, #FFD700 40%, #FFC107 60%, #854d0e 100%)' }}
              >
                <h2 className="font-display text-lg tracking-wide text-bg">{s.title}</h2>
              </div>
            )}
            <div className="bg-surface border-x border-b border-border px-4 py-4">
              <p className="text-text text-sm leading-relaxed">{s.content}</p>
            </div>
          </div>
        ))}
      </main>
      <Footer />
    </div>
  )
}
