import Header from '@/components/frontend/Header'
import Footer from '@/components/frontend/Footer'

export const metadata = {
  title: 'Contact Us | A786',
  description: 'Contact the A786 results team for inquiries, feedback or support.',
}

export default function ContactPage() {
  return (
    <div className="min-h-dvh grid-bg">
      <Header />
      <main className="px-3 pb-6">
        {/* Alert banner */}
        <div
          className="py-3 px-4 my-4 rounded-xl border border-primary/40 text-sm font-mono leading-relaxed"
          style={{ background: '#1a1200', color: '#FFD700' }}
        >
          For inquiries, feedback, or support regarding A786 results, charts, or site features, reach out via the contact details below. The team responds promptly during business hours to assist with general questions only — no gambling advice or financial transactions provided.
        </div>

        {/* Page title */}
        <div
          className="py-3 text-center mb-4"
          style={{ background: 'linear-gradient(90deg, #854d0e 0%, #FFD700 40%, #FFC107 60%, #854d0e 100%)' }}
        >
          <h1 className="font-display text-2xl tracking-widest text-bg">CONTACT US</h1>
        </div>

        {/* Contact card */}
        <div className="sk-card rounded-2xl overflow-hidden">
          <div className="px-4 py-6 space-y-6 text-center">
            {/* Email */}
            <div>
              <p className="text-muted text-xs font-mono uppercase tracking-widest mb-2">Email Us</p>
              <a
                href="mailto:a786satta@gmail.com"
                className="font-mono text-primary text-lg font-bold"
                style={{ color: '#FFD700' }}
              >
                a786satta@gmail.com
              </a>
              <p className="text-muted text-xs font-mono mt-1">Contact for any info at the above email</p>
            </div>

            <div className="border-t border-border" />

            {/* WhatsApp */}
            <div>
              <p className="text-muted text-xs font-mono uppercase tracking-widest mb-3">WhatsApp</p>
              <a
                href="https://wa.me/919485519859"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full font-bold text-white"
                style={{ background: '#25D366', boxShadow: '0 4px 14px rgba(37,211,102,0.4)' }}
              >
                <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="16" r="16" fill="#25D366"/>
                  <path d="M16 6C10.477 6 6 10.477 6 16c0 1.846.497 3.574 1.364 5.062L6 26l5.09-1.335A9.96 9.96 0 0 0 16 26c5.523 0 10-4.477 10-10S21.523 6 16 6Z" fill="white"/>
                  <path d="M21.8 19.4c-.3-.15-1.766-.87-2.04-.97-.273-.1-.472-.15-.67.15-.198.3-.768.97-.94 1.17-.173.198-.347.223-.647.075-.3-.15-1.267-.467-2.413-1.488-.892-.795-1.494-1.777-1.669-2.077-.174-.3-.018-.462.13-.61.134-.134.3-.348.45-.522.15-.174.2-.298.3-.497.1-.198.05-.373-.025-.522-.075-.15-.67-1.613-.918-2.21-.242-.578-.487-.5-.67-.51-.173-.008-.372-.01-.57-.01-.2 0-.522.075-.795.373-.273.298-1.042 1.018-1.042 2.483s1.067 2.88 1.216 3.078c.15.198 2.1 3.205 5.087 4.493.71.307 1.265.49 1.697.627.713.227 1.362.195 1.875.118.572-.085 1.766-.722 2.015-1.42.25-.698.25-1.297.174-1.42-.074-.124-.273-.198-.572-.348Z" fill="#25D366"/>
                </svg>
                <div className="text-left">
                  <div style={{ fontSize: '15px', fontWeight: 700 }}>Chat on WhatsApp</div>
                  <div style={{ fontSize: '11px', opacity: 0.9 }}>Click to open chat</div>
                </div>
              </a>
            </div>

            <div className="border-t border-border" />

            {/* Note */}
            <div className="bg-surface-2 rounded-xl px-4 py-3">
              <p className="text-muted text-xs font-mono leading-relaxed">
                ⚠️ We only provide result information. We do not offer gambling tips, predictions, or financial advice. Please do not ask for leak numbers or guaranteed results.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
