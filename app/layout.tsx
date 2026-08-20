import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import SessionProvider from '@/components/SessionProvider'
import WhatsAppButton from '@/components/WhatsAppButton'
import Script from 'next/script'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.a786satta.com'),

  title: 'A786 Satta – Satta 786, Ghaziabad, Gali & Disawar Results',

  description:
    'A786 Satta provides updated Satta 786, Ghaziabad, Gali and Disawar results, daily charts and market updates in one place.',

  keywords: [
    'A786 Satta',
    'Satta 786',
    'Satta Results',
    'Satta Charts',
    'Ghaziabad Satta',
    'Ghaziabad Satta Result',
    'Ghaziabad Satta Chart',
    'Satta Ghaziabad',
    'Gali Satta',
    'Gali Result',
    'Gali Satta Result',
    'Disawar Satta',
    'Disawar Result',
    'Disawar Satta Result',
    'Gali Disawar Satta',
    'Gali Disawar Satta Result',
    'Delhi Disawar Satta',
    'Faridabad Result',
  ],

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: 'https://www.a786satta.com/',
  },

  openGraph: {
    type: 'website',
    url: 'https://www.a786satta.com/',
    title: 'A786 Satta – Satta 786, Ghaziabad, Gali & Disawar Results',
    description:
      'A786 Satta provides updated Satta 786, Ghaziabad, Gali and Disawar results, daily charts and market updates.',
    siteName: 'A786 Satta',
    locale: 'en_IN',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'A786 Satta Results and Charts',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'A786 Satta – Satta 786, Ghaziabad, Gali & Disawar Results',
    description:
      'A786 Satta provides updated Satta 786, Ghaziabad, Gali and Disawar results, daily charts and market updates.',
    images: ['/og-image.jpg'],
  },

  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },

  verification: {
    google: 'FQnDbziZqpv5K3pyLiPOpDQc9m9g2aKl6anLQmQx8xk',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#FFE000',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;600;700&display=swap"
          rel="stylesheet"
        />

        {/* WebSite Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'A786 Satta',
              alternateName: 'A786Satta',
              url: 'https://www.a786satta.com/',
            }),
          }}
        />
      </head>

      <body>
        <SessionProvider>
          {children}
        </SessionProvider>

        {/* WhatsApp Button */}
        <WhatsAppButton
          phone="919485519859"
          message="Hello! I have a query about A786 results."
        />

        {/* Toast Notifications */}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: '#111100',
              color: '#FFE000',
              border: '1px solid #FFE000',
              fontFamily: 'Rajdhani, sans-serif',
              fontWeight: 600,
            },
          }}
        />

        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-2S9DL0HKFJ"
        />

        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];

              function gtag() {
                dataLayer.push(arguments);
              }

              gtag('js', new Date());

              gtag('config', 'G-2S9DL0HKFJ');
            `,
          }}
        />
      </body>
    </html>
  )
}