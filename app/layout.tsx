import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import SessionProvider from '@/components/SessionProvider'
import WhatsAppButton from '@/components/WhatsAppButton'
import Script from 'next/script'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.a786satta.com'),

  title: 'A786 Satta Result Today | Live Gali Disawar Faridabad Ghaziabad Result',
  description:
    'Check A786 Satta Result Today with live Gali, Disawar, Faridabad and Ghaziabad results, updated charts, old record charts, jodi charts and daily market updates in one place.',

  keywords: [
    'A786 satta',
    'satta results',
    'satta charts',
    'Disawar result',
    'delhi disawar satta',
    'disawar satta result',
    'gali disawar satta',
    'Faridabad result',
    'ghaziabad satta chart',
    'ghaziabad satta result',
    'disawar satta result',
    'gali disawar satta result',
    'gali disawar satta',
    'ghaziabad satta',
    'satta ghaziabad​',
  ],

  robots: 'index, follow',

  alternates: {
    canonical: 'https://www.a786satta.com/',
  },

  openGraph: {
    type: 'website',
    url: 'https://www.a786satta.com/',
    title: 'A786 Satta Results & Charts',
    description:
      'Latest results, charts and fast updates available online.',
    siteName: 'A786 Satta',
    locale: 'en_IN',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'A786 Satta Results Preview',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'A786 Satta Results & Charts',
    description:
      'Check latest results and charts with fast updates.',
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
      </head>

      <body>
        <SessionProvider>{children}</SessionProvider>

        <WhatsAppButton
          phone="919485519859"
          message="Hello! I have a query about A786 results."
        />

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
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-2S9DL0HKFJ');
            `,
          }}
        />

        {/* Breadcrumb Schema */}
        <Script
          id="breadcrumb-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://www.a786satta.com/"
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Blog",
                  item: "https://www.a786satta.com/blog"
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Kuber City",
                  item: "https://www.a786satta.com/chart/kuber-city"
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Noida City",
                  item: "https://www.a786satta.com/chart/noida-city"
                },
                {
                  "@type": "ListItem",
                  position: 5,
                  name: "Sadar Bazar",
                  item: "https://www.a786satta.com/chart/sadar-bazar"
                },
                {
                  "@type": "ListItem",
                  position: 6,
                  name: "Gwalior",
                  item: "https://www.a786satta.com/chart/gwalior"
                },
                {
                  "@type": "ListItem",
                  position: 7,
                  name: "Delhi Bazar",
                  item: "https://www.a786satta.com/chart/delhi-bazar"
                },
                {
                  "@type": "ListItem",
                  position: 8,
                  name: "Shri Ganesh",
                  item: "https://www.a786satta.com/chart/shri-ganesh"
                },
                {
                  "@type": "ListItem",
                  position: 9,
                  name: "Faridabad",
                  item: "https://www.a786satta.com/chart/faridabad"
                },
                {
                  "@type": "ListItem",
                  position: 10,
                  name: "Alwar",
                  item: "https://www.a786satta.com/chart/alwar"
                },
                {
                  "@type": "ListItem",
                  position: 11,
                  name: "Gali",
                  item: "https://www.a786satta.com/chart/gali"
                },
                {
                  "@type": "ListItem",
                  position: 12,
                  name: "Disawar",
                  item: "https://www.a786satta.com/chart/disawar"
                }
              ]
            }),
          }}
        />
      </body>
    </html>
  )
}
