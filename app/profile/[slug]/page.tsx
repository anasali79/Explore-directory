import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ArrowUpRight, MapPin, Calendar, ChevronLeft, ChevronRight, X, MapPin as MapPinIcon } from 'lucide-react'
import { getProfileBySlug, getPublishedProfiles } from '@/lib/directory-data'
import { ProfileContactActions } from '@/components/profile-contact-actions'
import { ProfileGallery } from '@/components/profile-gallery'
import { SiteFooter, SiteHeader } from '@/components/site-chrome'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const profile = await getProfileBySlug(slug)
  if (!profile) return { title: 'Profile not found | Avaani', robots: { index: false, follow: false } }
  return {
    title: `${profile.name} | Avaani`,
    description: profile.description,
    robots: { index: false, follow: false },
    openGraph: {
      title: `${profile.name} | Avaani`,
      description: profile.description,
      type: 'website',
      images: profile.image ? [`https://avaani.in${profile.image}`] : [],
    },
  }
}

export default async function ProfilePage({ params }: Props) {
  const { slug } = await params
  const profile = await getProfileBySlug(slug)
  if (!profile) notFound()

  const allProfiles = await getPublishedProfiles()
  const related = allProfiles
    .filter((item) => item.slug !== slug && (item.category === profile.category || item.location === profile.location))
    .slice(0, 3)

  const galleryImages = profile.galleryImages && profile.galleryImages.length > 0
    ? profile.galleryImages
    : [profile.image]

  return (
    <>
      <SiteHeader activePath="/profiles" />
      <main className="profile-detail">
        <div className="detail-crumb">
          <Link href="/profiles">DIRECTORY</Link>
          <span aria-hidden="true">/</span>
          <span>{profile.category.toUpperCase()}</span>
          <span aria-hidden="true">/</span>
          <span>{profile.name.toUpperCase()}</span>
        </div>

        <div className="detail-layout">
          {/* Left Column - Gallery */}
          <div className="detail-photo-column">
            <ProfileGallery images={galleryImages} profileName={profile.name} />
          </div>

          {/* Right Column - Details */}
          <div className="detail-copy">
            <span className="eyebrow">{profile.category} / {profile.city.toUpperCase()}</span>
            <h1>{profile.name}<span aria-hidden="true">.</span></h1>

            <div className="detail-location">
              <MapPin size={14} aria-hidden="true" />
              {profile.location}, {profile.city}
            </div>

            <div className="detail-rule" />

            <span className="eyebrow">ABOUT</span>
            <p className="detail-bio">{profile.description}</p>

            {profile.availability && (
              <>
                <div className="detail-rule" style={{ marginTop: '32px' }} />
                <span className="eyebrow">AVAILABILITY</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '16px', padding: '16px', background: 'var(--accent)', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
                  <Calendar size={18} color="var(--primary)" />
                  <span style={{ color: 'var(--foreground)', fontSize: '13px', lineHeight: '1.6' }}>{profile.availability}</span>
                </div>
              </>
            )}

            {/* Contact Actions */}
            <ProfileContactActions name={profile.name} phone={profile.phone} whatsapp={profile.whatsapp} />

            <Link href="/profiles" className="detail-link">
              Explore more companions
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>

            <p className="demo-note">An Avaani directory profile. All profiles are published with explicit consent. 18+ only.</p>
          </div>
        </div>

        {/* Similar Profiles */}
        {related.length > 0 && (
          <section className="related" aria-labelledby="related-heading">
            <span className="eyebrow">SIMILAR COMPANIONS</span>
            <h2 id="related-heading">More {profile.category.toLowerCase()}<span aria-hidden="true">.</span></h2>
            <div className="related-grid" role="list">
              {related.map((item) => (
                <Link key={item.slug} href={`/profile/${item.slug}`} className="related-card" aria-label={`View ${item.name}'s profile`}>
                  <div className="related-photo">
                    <Image
                      src={item.image}
                      alt={`Portrait of ${item.name}`}
                      fill
                      sizes="(max-width: 700px) 45vw, 24vw"
                    />
                  </div>
                  <span>
                    {item.name}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </span>
                  <small>{item.location} · {item.city}</small>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </>
  )
}