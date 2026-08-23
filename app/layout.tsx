//1

import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import SessionProvider from '@/components/SessionProvider'
import WhatsAppButton from '@/components/WhatsAppButton'
import Script from 'next/script'

const SITE_URL = 'https://www.a786satta.com'
const BRAND_NAME = 'A786 Satta'
const BRAND_ALTERNATE_NAME = 'A786Satta'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  /*
   * PRIMARY BRAND TITLE
   * Keep the exact brand at the beginning.
   */
  title: 'A786 Satta – Satta 786, Ghaziabad, Gali & Disawar Results',

  description:
    'A786 Satta provides updated Satta 786, Ghaziabad, Gali and Disawar results, daily charts and market updates in one place.',

  /*
   * Used by browsers/apps.
   */
  applicationName: BRAND_NAME,

  /*
   * Keep indexing enabled.
   */
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  /*
   * One single canonical homepage URL.
   */
  alternates: {
    canonical: `${SITE_URL}/`,
  },

  /*
   * Open Graph
   */
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/`,
    siteName: BRAND_NAME,

    title:
      'A786 Satta – Satta 786, Ghaziabad, Gali & Disawar Results',

    description:
      'A786 Satta provides updated Satta 786, Ghaziabad, Gali and Disawar results, daily charts and market updates in one place.',

    locale: 'en_IN',

    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'A786 Satta',
      },
    ],
  },

  /*
   * Twitter/X metadata
   */
  twitter: {
    card: 'summary_large_image',

    title:
      'A786 Satta – Satta 786, Ghaziabad, Gali & Disawar Results',

    description:
      'A786 Satta provides updated Satta 786, Ghaziabad, Gali and Disawar results, daily charts and market updates in one place.',

    images: ['/og-image.jpg'],
  },

  /*
   * Icons
   */
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },

  /*
   * Google Search Console verification
   */
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
    <html lang="en-IN">
      <head>
        {/* ================================
            Google Fonts
        ================================= */}
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

        {/* ================================
            WEBSITE / BRAND SCHEMA
        ================================= */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              '@id': `${SITE_URL}/#website`,
              name: BRAND_NAME,
              alternateName: BRAND_ALTERNATE_NAME,
              url: `${SITE_URL}/`,
            }),
          }}
        />

        {/* ================================
            ORGANIZATION SCHEMA
        ================================= */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              '@id': `${SITE_URL}/#organization`,
              name: BRAND_NAME,
              alternateName: BRAND_ALTERNATE_NAME,
              url: `${SITE_URL}/`,
              logo: {
                '@type': 'ImageObject',
                url: `${SITE_URL}/og-image.jpg`,
              },
            }),
          }}
        />
      </head>

      <body>
        <SessionProvider>
          {children}
        </SessionProvider>

        {/* ================================
            WhatsApp Button
        ================================= */}
        <WhatsAppButton
          phone="919485519859"
          message="Hello! I have a query about A786 results."
        />

        {/* ================================
            Toast Notifications
        ================================= */}
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

        {/* ================================
            Google Analytics
        ================================= */}
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
