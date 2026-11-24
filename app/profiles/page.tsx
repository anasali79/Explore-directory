import type { Metadata } from 'next'
import { ProfileDirectory } from '@/components/directory'
import { getPublishedProfiles } from '@/lib/directory-data'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Discover Companions | Avaani',
  description: 'Browse our curated directory of distinguished companions in Lucknow. Filter by category, neighbourhood, and find your perfect match.',
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Discover Companions | Avaani',
    description: 'Browse our curated directory of distinguished companions in Lucknow.',
    type: 'website',
  },
}

export default async function ProfilesPage() {
  const profiles = await getPublishedProfiles()
  return <ProfileDirectory profiles={profiles} />
}