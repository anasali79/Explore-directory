import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { SmoothScroll } from '@/components/smooth-scroll'
import './globals.css'

export const metadata: Metadata = {
  title: 'Avaani — Lucknow\'s Premier Companion Directory',
  description: 'Discover distinguished companions for cultural events, corporate gatherings, travel, and intimate occasions in Lucknow. Curated. Consent-based. 18+.',
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Avaani — Lucknow\'s Premier Companion Directory',
    description: 'Exceptional company for every occasion. Connect with distinguished companions in Lucknow.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Avaani',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Avaani — Lucknow\'s Premier Companion Directory',
    description: 'Exceptional company for every occasion.',
  },
  icons: { icon: '/icon.svg', apple: '/apple-icon.png' },
  metadataBase: new URL('https://avaani.in'),
  alternates: { canonical: 'https://avaani.in' },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#faf8f5',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN">
      <head>
        <link
          rel="preload"
          href="/fonts/Mont-Regular.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Mont-SemiBold.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Mont-Bold.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Mont-Heavy.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased">
        <SmoothScroll />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}