'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { ArrowRight, ArrowUpRight, MapPin, Search, Sparkles, Shield, Heart, Users, Star, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import type { DirectoryProfile } from '@/lib/directory-data'
import { ProfileContactActions } from '@/components/profile-contact-actions'
import { ProfileLocationFilters, type DirectoryLocation } from '@/components/profile-location-filters'
import { SiteFooter, SiteHeader } from '@/components/site-chrome'

function ProfileCard({ profile, index }: { profile: DirectoryProfile, index: number }) {
  const [photoIndex, setPhotoIndex] = useState(0)
  const photos = profile.galleryImages && profile.galleryImages.length > 0 ? profile.galleryImages : [profile.image]

  const handleCardClick = () => {
    window.location.href = `/profile/${profile.slug}`;
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  return (
    <article className={`profile-card profile-card-${index + 1}`} onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <div className="profile-card-image">
        <div className="portrait-wrap">
          <Image
            key={photoIndex}
            src={photos[photoIndex]}
            alt={`Portrait of ${profile.name} - Photo ${photoIndex + 1}`}
            fill
            sizes="(max-width: 860px) 100vw, 380px"
            className="portrait"
            priority={index < 2}
          />
          <div className="portrait-overlay" />

          {/* Photo Counter */}
          {photos.length > 1 && (
            <span className="card-photo-counter">
              {photoIndex + 1} / {photos.length}
            </span>
          )}

          {/* Card Photo Navigation Arrows */}
          {photos.length > 1 && (
            <div className="card-photo-nav" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="card-photo-arrow card-photo-prev"
                onClick={handlePrevPhoto}
                aria-label="Previous photo"
              >
                <ChevronLeft size={16} aria-hidden="true" />
              </button>
              <button
                type="button"
                className="card-photo-arrow card-photo-next"
                onClick={handleNextPhoto}
                aria-label="Next photo"
              >
                <ChevronRight size={16} aria-hidden="true" />
              </button>
            </div>
          )}

          {/* Card Photo Dots */}
          {photos.length > 1 && (
            <div className="card-photo-dots" onClick={(e) => e.stopPropagation()}>
              {photos.map((_, pIdx) => (
                <span
                  key={pIdx}
                  className={`card-photo-dot ${pIdx === photoIndex ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setPhotoIndex(pIdx);
                  }}
                />
              ))}
            </div>
          )}

          {profile.featured && (
            <span className="featured-tag">
              <Sparkles size={11} aria-hidden="true" />
              Featured Companion
            </span>
          )}
          <span className="portrait-location-badge">
            <MapPin size={12} aria-hidden="true" />
            {profile.location} · {profile.city}
          </span>
          {profile.availability && (
            <span className="portrait-availability-badge">
              {profile.availability}
            </span>
          )}
        </div>
      </div>
      <div className="card-content">
        <div className="card-header">
          <div className="card-meta-top">
            <span className="eyebrow">{profile.category}</span>
            <div className="card-meta-badges">
              {profile.age && <span className="card-age-tag">{profile.age} YRS</span>}
              <span className="card-city-tag">VERIFIED COMPANION</span>
            </div>
          </div>
          <div className="card-title-row">
            <h3 className="card-name">{profile.name}</h3>
            {profile.specialty && (
              <span className="card-specialty">{profile.specialty}</span>
            )}
          </div>
        </div>
        <p className="card-description">{profile.description}</p>
        {(profile.interests?.length || profile.languages?.length) ? (
          <div className="card-tags-row">
            {profile.interests?.slice(0, 3).map((item, i) => (
              <span key={i} className="card-tag-pill">✦ {item}</span>
            ))}
            {profile.languages?.length ? (
              <span className="card-tag-pill">🗣 {profile.languages.slice(0, 2).join(', ')}</span>
            ) : null}
          </div>
        ) : null}
        <div className="card-actions" onClick={handleContactClick}>
          <ProfileContactActions name={profile.name} phone={profile.phone} whatsapp={profile.whatsapp} />
          <Link href={`/profile/${profile.slug}`} className="card-view-btn" onClick={(e) => e.stopPropagation()}>
            View Full Profile & Gallery <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </article>
  )
}

export function DirectoryHome({ profiles }: { profiles: DirectoryProfile[] }) {
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState<DirectoryLocation>({ neighbourhood: '', city: '' })
  const filtered = useMemo(() => profiles.filter((profile) => {
    const term = query.toLowerCase().trim()
    const matchesQuery = !term || `${profile.name} ${profile.category} ${profile.location} ${profile.city} ${profile.description}`.toLowerCase().includes(term)
    const matchesLocation = (!location.neighbourhood || profile.location === location.neighbourhood) && (!location.city || profile.city === location.city)
    return matchesQuery && matchesLocation
  }), [profiles, query, location])

  const featuredProfiles = profiles.filter(p => p.featured).slice(0, 3)
  const categories = [...new Set(profiles.map(p => p.category))]
  const neighbourhoods = [...new Set(profiles.map(p => p.location))].filter(Boolean)

  return (
    <>
      <SiteHeader activePath="/" />
      <main>
        {/* Hero Section */}
        <section className="hero-shell" aria-labelledby="hero-heading">
          <div className="hero-content">
            <div className="hero-kicker">
              <span className="live-dot" aria-hidden="true" />
              Lucknow's Premier Directory
            </div>
            <h1 id="hero-heading">
              Distinguished companions<br />
              <em>for memorable occasions</em>
            </h1>
            <p className="hero-description">
              Avaani connects discerning individuals with exceptional companions for cultural events,
              corporate gatherings, travel, and intimate occasions. Every profile is thoughtfully curated.
            </p>
            <form className="hero-search" onSubmit={(event) => {
              event.preventDefault();
              document.getElementById('directory')?.scrollIntoView({ behavior: 'smooth' })
            }}>
              <Search size={18} aria-hidden="true" />
              <label className="sr-only" htmlFor="directory-search">Search companions by name, category, or neighbourhood</label>
              <input
                id="directory-search"
                placeholder="Search by name, category, or neighbourhood"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
              <span className="search-divider" aria-hidden="true" />
              <span className="search-city">
                <MapPin size={15} aria-hidden="true" />
                Lucknow
              </span>
              <button type="submit" aria-label="Search directory">
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </form>
            <div className="hero-footnote">
              <span>Strictly 18+</span>
              <span>Consent-based profiles</span>
              <span>Privacy protected</span>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="hero-frame">
              <Image
                src={featuredProfiles[0]?.image || '/portraits/priya.jpg'}
                alt=""
                fill
                priority
                sizes="(max-width: 900px) 45vw, 37vw"
                className="hero-image"
              />
              <div className="frame-caption">
                <span>01 / {profiles.length.toString().padStart(2, '0')}</span>
                <span>Curated Companions</span>
              </div>
            </div>
            <div className="hero-stamp">
              A city<br />
              of <i>refined</i><br />
              connections.
            </div>
            <span className="hero-orbit orbit-one" aria-hidden="true" />
            <span className="hero-orbit orbit-two" aria-hidden="true" />
          </div>
          <div className="hero-index" aria-hidden="true">26°50&apos;N&nbsp;&nbsp; 80°56&apos;E</div>
        </section>

        {/* Trust Indicators */}
        <section className="trust-section" aria-labelledby="trust-heading" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 42px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', textAlign: 'center' }}>
            {[
              { icon: Shield, title: 'Verified Profiles', desc: 'Each companion is carefully reviewed' },
              { icon: Heart, title: 'Consent Based', desc: 'Profiles published with explicit permission' },
              { icon: Users, title: 'Discreet & Private', desc: 'Your privacy is our priority' },
              { icon: Star, title: 'Curated Selection', desc: 'Only the finest companions featured' },
            ].map((item, idx) => {
              const Icon = item.icon
              return (
                <div key={idx} style={{ padding: '32px 24px', border: '1px solid var(--glass-border)', borderRadius: '20px', background: 'var(--glass-bg)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', boxShadow: 'var(--glass-shadow)', transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ width: '56px', height: '56px', margin: '0 auto 16px', background: 'rgba(171, 130, 62, 0.1)', border: '1px solid rgba(171, 130, 62, 0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                    <Icon size={24} />
                  </div>
                  <h3 style={{ font: '600 20px var(--font-serif)', margin: '0 0 10px', color: 'var(--foreground)' }}>{item.title}</h3>
                  <p style={{ color: 'var(--muted-foreground)', fontSize: '13px', lineHeight: '1.8', margin: 0 }}>{item.desc}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Directory Section */}
        <section className="directory-section" id="directory">
          <div className="section-heading">
            <div>
              <span className="eyebrow section-label">THE DIRECTORY <span>—</span> LUCKNOW</span>
              <h2>Companions worth<br className="mobile-break" /> knowing<span className="period">.</span></h2>
            </div>
            <p>Thoughtfully selected. Locally rooted.<br />Meet the people making moments memorable.</p>
          </div>
          <ProfileLocationFilters profiles={profiles} value={location} onChange={setLocation} />
          <div className="result-count">{filtered.length} companions</div>

          {filtered.length ? (
            <div className="profile-grid" role="list">
              {filtered.map((profile, index) => (
                <ProfileCard key={profile.slug} profile={profile} index={index} />
              ))}
            </div>
          ) : (
            <div className="empty-state" role="status">
              <Search size={48} aria-hidden="true" />
              <h3>No companions match your search.</h3>
              <p>Try another name, category, or neighbourhood.</p>
              <button onClick={() => { setQuery(''); setLocation({ neighbourhood: '', city: '' }) }}>
                Clear filters
              </button>
            </div>
          )}

          <div className="browse-more">
            <span>Lucknow\'s most refined directory.</span>
            <Link href="/profiles" className="text-link">
              View all companions <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </section>

        {/* Featured Categories */}
        <section className="explore-section" style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 42px' }}>
          <div className="featured-heading" style={{ marginBottom: '40px' }}>
            <div>
              <span className="eyebrow">BROWSE BY CATEGORY</span>
              <h2 style={{ font: '500 clamp(36px, 5vw, 48px)/1 var(--font-serif)', letterSpacing: '-0.04em', margin: '16px 0 0', color: 'var(--foreground)' }}>
                Find your <em>perfect match</em>
              </h2>
            </div>
          </div>
          <div className="category-row" style={{ borderTop: 'none', borderBottom: 'none', padding: '0', marginBottom: '32px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {categories.map((category, idx) => (
              <Link
                key={category}
                href={`/profiles?category=${encodeURIComponent(category)}`}
                className={`category-pill ${idx === 0 ? 'active' : ''}`}
                style={{ textDecoration: 'none' }}
              >
                {category}
              </Link>
            ))}
          </div>
        </section>

        {/* How Enquiries Work */}
        <section className="manifesto" id="how-it-works" style={{ marginTop: '0' }}>
          <div className="manifesto-top">
            <span className="eyebrow">HOW ENQUIRIES WORK</span>
            <span className="manifesto-number">AVAANI / 001</span>
          </div>
          <p style={{ textAlign: 'left', maxWidth: 'none', margin: '32px 0 40px', fontSize: 'clamp(20px, 2.5vw, 28px)', lineHeight: '1.5' }}>
            <em>Simple, respectful, and transparent.</em> No hidden fees. No pressure.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginTop: '24px' }}>
            {[
              { icon: Search, title: 'Discover', desc: 'Browse profiles and find someone who matches your occasion.' },
              { icon: MessageCircle, title: 'Enquire', desc: 'Send a respectful enquiry via WhatsApp or the contact form.' },
              { icon: Users, title: 'Connect', desc: 'Discuss details directly. No platform interference.' },
              { icon: Heart, title: 'Enjoy', desc: 'Experience memorable company for your occasion.' },
            ].map((step, idx) => {
              const StepIcon = step.icon
              return (
                <div key={idx} style={{ textAlign: 'center', padding: '28px 20px', background: 'var(--glass-bg)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid var(--glass-border)', borderRadius: '20px', boxShadow: 'var(--glass-shadow)', transition: 'all 0.3s ease' }}>
                  <div style={{ width: '56px', height: '56px', margin: '0 auto 16px', background: 'rgba(171, 130, 62, 0.1)', border: '1px solid rgba(171, 130, 62, 0.22)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                    <StepIcon size={24} />
                  </div>
                  <h4 style={{ font: '600 20px var(--font-serif)', margin: '0 0 8px', color: 'var(--foreground)' }}>{step.title}</h4>
                  <p style={{ color: 'var(--muted-foreground)', fontSize: '13px', lineHeight: '1.8', margin: 0 }}>{step.desc}</p>
                </div>
              )
            })}
          </div>
          <div className="manifesto-bottom" style={{ marginTop: '28px' }}>
            <span>No online payments. Direct connections only.</span>
            <Link href="/contact" className="text-link">Have questions? <ArrowUpRight size={15} aria-hidden="true" /></Link>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section" id="faq">
          <div className="faq-heading">
            <span className="eyebrow">FREQUENTLY ASKED QUESTIONS</span>
            <h2>Your questions,<br /><em>answered honestly.</em></h2>
            <p>We believe in transparency. Here are the questions we hear most often.</p>
          </div>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <FAQItem key={index} faq={faq} index={index} />
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section" style={{ marginTop: '80px' }}>
          <h2>Ready to find your<br /><em>perfect companion?</em></h2>
          <p>Browse our curated directory and connect with exceptional individuals for your next occasion.</p>
          <div className="cta-buttons">
            <Link href="/profiles" className="cta-button primary">
              Explore Directory
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link href="/contact" className="cta-button secondary">
              Contact Us
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}

const faqs = [
  {
    q: 'What is Avaani?',
    a: 'Avaani is Lucknow\'s premier curated directory connecting discerning individuals with exceptional companions for cultural events, corporate gatherings, travel, and intimate occasions. We are a platform for introductions only.'
  },
  {
    q: 'How does the enquiry process work?',
    a: 'When you find a companion you\'d like to meet, you can send an enquiry via WhatsApp or our contact form. The companion receives your message directly and will respond if interested and available. There are no platform fees or commissions.'
  },
  {
    q: 'How can someone contact a companion?',
    a: 'Each profile includes WhatsApp and email contact options. Some profiles also display a phone number if the companion has chosen to share it. All communication happens directly between you and the companion.'
  },
  {
    q: 'Are online payments supported?',
    a: 'No. Avaani does not process payments, hold funds, or take commissions. Any financial arrangements are strictly between you and the companion. We strongly advise against sending money to anyone you haven\'t met in person.'
  },
  {
    q: 'How is profile information submitted?',
    a: 'Companions apply through our submission process. Our editorial team reviews each application for completeness, authenticity, and alignment with our standards. Approved profiles are published with the companion\'s explicit consent.'
  },
  {
    q: 'How can a profile be updated or removed?',
    a: 'Companions can request updates or removal at any time by contacting us. We process removal requests within 24 hours. Updated information is reviewed before publication.'
  },
  {
    q: 'How are companions reviewed?',
    a: 'We verify identity and review submitted information for authenticity. However, we do not conduct background checks, and we make no guarantees about any individual\'s character or conduct. Members are responsible for their own due diligence.'
  },
  {
    q: 'What are the safety guidelines?',
    a: 'We require all members to be 18+. We encourage meeting in public places first, informing a trusted person of your plans, and trusting your instincts. Report any concerning behaviour immediately using the report function on each profile.'
  },
  {
    q: 'Is registration mandatory to browse?',
    a: 'No. You can browse the directory freely without an account. Registration is only required for companions who wish to be listed, and for admin access.'
  },
  {
    q: 'How can someone report suspicious activity?',
    a: 'Each profile has a report button. You can also email us directly at safety@avaani.in. We take all reports seriously and investigate promptly. Inappropriate or illegal content will result in immediate removal.'
  },
]

function FAQItem({ faq, index }: { faq: { q: string; a: string }, index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <details className={`faq-item ${open ? 'open' : ''}`}>
      <summary className="faq-question" onClick={(e) => { e.preventDefault(); setOpen(!open) }}>
        <span>{faq.q}</span>
        <span className="faq-icon" aria-hidden="true">
          <ArrowRight size={20} style={{ transform: open ? 'rotate(90deg)' : 'rotate(-90deg)' }} />
        </span>
      </summary>
      <div className="faq-answer">
        <p>{faq.a}</p>
      </div>
    </details>
  )
}

export function ProfileDirectory({ profiles }: { profiles: DirectoryProfile[] }) {
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState<DirectoryLocation>({ neighbourhood: '', city: '' })
  const results = profiles.filter((profile) => {
    const matchesQuery = `${profile.name} ${profile.category} ${profile.location} ${profile.city} ${profile.description}`.toLowerCase().includes(query.trim().toLowerCase())
    const matchesLocation = (!location.neighbourhood || profile.location === location.neighbourhood) && (!location.city || profile.city === location.city)
    return matchesQuery && matchesLocation
  })
  return (
    <>
      <SiteHeader activePath="/profiles" />
      <main className="listing-page">
        <div className="listing-intro">
          <span className="eyebrow">THE DIRECTORY / LUCKNOW</span>
          <h1>Find your<br /><em>perfect companion.</em></h1>
          <p>Thoughtfully curated. Locally rooted. Strictly 18+.</p>
          <label className="listing-search">
            <Search size={17} aria-hidden="true" />
            <span className="sr-only">Search the directory</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Name, category, neighbourhood" />
          </label>
          <ProfileLocationFilters profiles={profiles} value={location} onChange={setLocation} />
        </div>
        <div className="listing-count">SHOWING {results.length.toString().padStart(2, '0')} OF {profiles.length.toString().padStart(2, '0')} COMPANIONS</div>
        {results.length ? (
          <div className="profile-grid listing-grid" role="list">
            {results.map((profile, index) => <ProfileCard key={profile.slug} profile={profile} index={index} />)}
          </div>
        ) : (
          <div className="empty-state" role="status">
            <Search size={48} aria-hidden="true" />
            <h3>No companions match your search.</h3>
            <p>Try changing your search or location.</p>
            <button onClick={() => { setQuery(''); setLocation({ neighbourhood: '', city: '' }) }}>
              Clear filters
            </button>
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  )
}