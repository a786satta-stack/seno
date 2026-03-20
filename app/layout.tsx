import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import SessionProvider from '@/components/SessionProvider'
import WhatsAppButton from '@/components/WhatsAppButton'

export const metadata: Metadata = {
  title: 'A786 — Live Satta Results Today',
  description: 'Live A786 satta results for Disawar, Faridabad, Ghaziabad, Delhi Bazar and more. Fast and accurate.',
  keywords: 'a786, satta king, satta result, disawar result, faridabad result, a786 satta',
  robots: 'index, follow',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/favicon.svg',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#FFE000',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>

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
      </body>
    </html>
  )
}
