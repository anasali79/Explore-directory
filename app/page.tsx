import type { Metadata } from 'next'
import { DirectoryHome } from '@/components/directory'
import { getPublishedProfiles } from '@/lib/directory-data'

export const dynamic = 'force-dynamic'

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
}

export default async function Home() {
  const profiles = await getPublishedProfiles()
  return <DirectoryHome profiles={profiles} />
}