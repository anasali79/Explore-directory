import type { Metadata } from 'next'
import { ArrowRight, Heart, Users, Sparkles, MapPin, Shield } from 'lucide-react'
import Link from 'next/link'
import { SiteFooter, SiteHeader } from '@/components/site-chrome'

export const metadata: Metadata = {
  title: 'About Avaani | Lucknow\'s Premier Companion Directory',
  description: 'Learn about Avaani\'s story, mission, and the team behind Lucknow\'s curated directory of distinguished companions.',
  robots: { index: true, follow: true },
}

const team = [
  { name: 'Founder', role: 'Vision & Strategy', initials: 'AS' },
  { name: 'Editorial Lead', role: 'Profile Curation', initials: 'RK' },
  { name: 'Community Manager', role: 'Safety & Support', initials: 'PM' },
  { name: 'Operations', role: 'Platform Management', initials: 'SK' },
]

export default function AboutPage() {
  return (
    <>
      <SiteHeader activePath="/about" />
      <main className="content-page">
        <section className="content-page-hero">
          <span className="eyebrow">OUR STORY / AVAANI</span>
          <h1>Good company<br/>is <em>everything.</em></h1>
          <p>
            Avaani was born from a simple belief: the right person can transform an ordinary moment
            into an extraordinary memory. In a city as culturally rich as Lucknow, finding that person
            should be effortless, safe, and dignified.
          </p>
          <Link href="/profiles" className="content-primary-link">
            Meet our companions
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </section>

        <section className="service-list" style={{ marginTop: '60px' }}>
          <article className="service-card" style={{ gridTemplateColumns: '50px minmax(0, 1fr)', borderTop: 'none', paddingTop: '0' }}>
            <span className="service-icon">
              <Heart size={22} strokeWidth={1.5} aria-hidden="true" />
            </span>
            <div>
              <h2>Why Avaani Exists</h2>
              <p>
                Lucknow has always been a city of tehzeeb — culture, courtesy, and meaningful connection.
                Yet finding refined companionship for cultural events, business gatherings, travel, or
                intimate occasions remained fragmented, unsafe, or purely transactional.
              </p>
              <p style={{ marginTop: '12px' }}>
                We created Avaani to change that. A curated directory where every profile is real,
                every companion is consenting, and every connection begins with respect.
              </p>
            </div>
          </article>

          <article className="service-card">
            <span className="service-number">01</span>
            <span className="service-icon">
              <Sparkles size={22} strokeWidth={1.5} aria-hidden="true" />
            </span>
            <div>
              <h2>Curated, Not Crowded</h2>
              <p>
                We don\'t maximize volume. We maximize quality. Every companion is reviewed by our
                editorial team for authenticity, sophistication, and alignment with our standards.
                You\'ll find a select few exceptional people — not hundreds of anonymous profiles.
              </p>
            </div>
            <ArrowRight className="service-arrow" size={18} aria-hidden="true" />
          </article>

          <article className="service-card">
            <span className="service-number">02</span>
            <span className="service-icon">
              <Shield size={22} strokeWidth={1.5} aria-hidden="true" />
            </span>
            <div>
              <h2>Safety by Design</h2>
              <p>
                18+ verification. Consent-based publishing. Report tools on every profile.
                No payment processing. No fake reviews. No misleading badges. We\'re transparent
                about what we do — and what we don\'t — verify.
              </p>
            </div>
            <ArrowRight className="service-arrow" size={18} aria-hidden="true" />
          </article>

          <article className="service-card">
            <span className="service-number">03</span>
            <span className="service-icon">
              <Users size={22} strokeWidth={1.5} aria-hidden="true" />
            </span>
            <div>
              <h2>Direct Connections</h2>
              <p>
                No platform fees. No commissions. No middlemen. When you find someone, you connect
                directly via WhatsApp, email, or phone. We make the introduction — you take it from there.
              </p>
            </div>
            <ArrowRight className="service-arrow" size={18} aria-hidden="true" />
          </article>

          <article className="service-card">
            <span className="service-number">04</span>
            <span className="service-icon">
              <MapPin size={22} strokeWidth={1.5} aria-hidden="true" />
            </span>
            <div>
              <h2>Rooted in Lucknow</h2>
              <p>
                We know this city — its heritage, its venues, its rhythm. Our companions are part of
                Lucknow\'s cultural fabric. Whether it\'s a heritage walk in Chowk, a gala in Gomti Nagar,
                or a weekend in Naimisharanya, they belong here.
              </p>
            </div>
            <ArrowRight className="service-arrow" size={18} aria-hidden="true" />
          </article>
        </section>

        <section style={{ marginTop: '80px', paddingTop: '60px', borderTop: '1px solid var(--border)' }}>
          <h2 style={{ font: '500 clamp(32px, 4vw, 42px)/1.1 var(--font-serif)', letterSpacing: '-0.04em', margin: '0 0 12px', textAlign: 'center', color: 'var(--foreground)' }}>
            Our <em>Team</em>
          </h2>
          <p style={{ color: 'var(--muted-foreground)', fontSize: '16px', lineHeight: '1.8', maxWidth: '600px', margin: '0 auto 48px', textAlign: 'center' }}>
            A small team with a deep commitment to quality and safety.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {team.map((member) => (
              <div key={member.name} style={{ textAlign: 'center', padding: '24px' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--primary)', color: 'var(--primary-foreground)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', font: '500 28px var(--font-serif)' }}>
                  {member.initials}
                </div>
                <h3 style={{ font: '500 18px var(--font-serif)', margin: '0 0 4px', color: 'var(--foreground)' }}>{member.name}</h3>
                <p style={{ color: 'var(--muted-foreground)', fontSize: '13px', margin: 0 }}>{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: '80px', paddingTop: '60px', borderTop: '1px solid var(--border)' }}>
          <h2 style={{ font: '500 clamp(32px, 4vw, 42px)/1.1 var(--font-serif)', letterSpacing: '-0.04em', margin: '0 0 12px', textAlign: 'center', color: 'var(--foreground)' }}>
            Our <em>Values</em>
          </h2>
          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {[
              { icon: Heart, title: 'Respect First', desc: 'Every interaction begins with mutual respect and consent.' },
              { icon: Sparkles, title: 'Quality Over Quantity', desc: 'A smaller directory of exceptional people beats a larger one of strangers.' },
              { icon: Shield, title: 'Transparency Always', desc: 'We\'re honest about what we verify and what we don\'t. No misleading claims.' },
              { icon: Users, title: 'Community Focused', desc: 'We serve Lucknow. Local knowledge, local connections, local care.' },
              { icon: MapPin, title: 'Privacy by Default', desc: 'Your data belongs to you. We never sell it. We protect it.' },
              { icon: ArrowRight, title: 'Continuous Improvement', desc: 'We listen, learn, and evolve. Your feedback shapes our platform.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} style={{ textAlign: 'center', padding: '24px' }}>
                <div style={{ width: '56px', height: '56px', margin: '0 auto 16px', background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-foreground)' }}>
                  <Icon size={24} />
                </div>
                <h3 style={{ font: '500 18px var(--font-serif)', margin: '0 0 8px', color: 'var(--foreground)' }}>{title}</h3>
                <p style={{ color: 'var(--muted-foreground)', fontSize: '13px', lineHeight: '1.8', margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="cta-section" style={{ marginTop: '80px' }}>
          <h2>Ready to experience<br/><em>Avaani?</em></h2>
          <p>Browse our curated directory or get in touch to discuss your specific occasion.</p>
          <div className="cta-buttons">
            <Link href="/profiles" className="cta-button primary">
              Browse Companions
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