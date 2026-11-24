import type { Metadata } from 'next'
import { Shield, Heart, Users, EyeOff, Lock, Flag, AlertTriangle, CheckCircle, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { SiteFooter, SiteHeader } from '@/components/site-chrome'

export const metadata: Metadata = {
  title: 'Trust & Safety | Avaani',
  description: 'Our commitment to safety, privacy, and ethical standards. Learn about our 18+ policy, consent-based profiles, reporting tools, and community guidelines.',
  robots: { index: true, follow: true },
}

const safetyPillars = [
  {
    icon: Shield,
    title: 'Strict 18+ Policy',
    description: 'Every member and companion must be 18 or older. We verify age at registration and require explicit confirmation. No exceptions.',
  },
  {
    icon: Heart,
    title: 'Consent-Based Profiles',
    description: 'Companions publish profiles only with explicit, informed consent. They control what information is shared and can request removal at any time.',
  },
  {
    icon: Users,
    title: 'Verified Identities',
    description: 'We verify the identity of every companion during onboarding. However, we do not conduct background checks and make no guarantees about character or conduct.',
  },
  {
    icon: Lock,
    title: 'Privacy Protected',
    description: 'Personal contact details are shared only at the companion\'s discretion. We never sell or share data with third parties. See our Privacy Policy for details.',
  },
  {
    icon: Flag,
    title: 'Report & Block',
    description: 'Every profile has a report button. We investigate all reports promptly. Inappropriate or illegal content results in immediate removal and potential authorities notification.',
  },
  {
    icon: AlertTriangle,
    title: 'No False Guarantees',
    description: 'We don\'t promise "verified" badges that imply background checks. We don\'t fabricate reviews or testimonials. Transparency over marketing.',
  },
]

const guidelines = [
  { title: 'For Clients', items: [
    'Always meet in a public place for the first encounter.',
    'Inform a trusted friend or family member of your plans.',
    'Respect the companion\'s boundaries and stated availability.',
    'Never send money to someone you haven\'t met in person.',
    'Report any pressure, coercion, or suspicious behaviour immediately.',
    'Understand that an enquiry does not guarantee a booking.',
  ]},
  { title: 'For Companions', items: [
    'Only share contact information you\'re comfortable with.',
    'Screen enquiries before meeting — trust your instincts.',
    'Set clear boundaries and communicate them upfront.',
    'Never feel obligated to accept an engagement.',
    'Report any client who makes you feel unsafe.',
    'Keep your profile information current and accurate.',
  ]},
  { title: 'Platform Standards', items: [
    'Zero tolerance for human trafficking, exploitation, or minors.',
    'No explicit sexual content or solicitation on profiles.',
    'No fake profiles, fabricated reviews, or misleading claims.',
    'All profiles reviewed by our editorial team before publication.',
    'Immediate removal of any profile violating our terms.',
    'Cooperation with law enforcement when required.',
  ]},
]

export default function TrustSafetyPage() {
  return (
    <>
      <SiteHeader activePath="/trust-safety" />
      <main className="content-page">
        <section className="content-page-hero">
          <span className="eyebrow">TRUST & SAFETY / AVAANI</span>
          <h1>Your safety.<br/>Our <em>priority.</em></h1>
          <p>
            Avaani is built on trust, transparency, and respect. We\'re committed to creating a safe,
            ethical platform for meaningful connections. Here\'s how we protect our community.
          </p>
        </section>

        <section className="trust-section" style={{ marginTop: '60px' }}>
          <h2 style={{ font: '500 clamp(32px, 4vw, 42px)/1.1 var(--font-serif)', letterSpacing: '-0.04em', margin: '0 0 12px', textAlign: 'center', color: 'var(--foreground)' }}>
            Our Safety Pillars
          </h2>
          <p style={{ color: 'var(--muted-foreground)', fontSize: '16px', lineHeight: '1.8', maxWidth: '600px', margin: '0 auto 48px', textAlign: 'center' }}>
            Six principles that guide every decision we make.
          </p>
          <div className="trust-grid">
            {safetyPillars.map(({ icon: Icon, title, description }, idx) => (
              <div key={idx} className="trust-card">
                <div style={{ width: '48px', height: '48px', color: 'var(--primary)' }}>
                  <Icon size={24} />
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: '80px', paddingTop: '60px', borderTop: '1px solid var(--border)' }}>
          <h2 style={{ font: '500 clamp(32px, 4vw, 42px)/1.1 var(--font-serif)', letterSpacing: '-0.04em', margin: '0 0 12px', textAlign: 'center', color: 'var(--foreground)' }}>
            Community Guidelines
          </h2>
          <p style={{ color: 'var(--muted-foreground)', fontSize: '16px', lineHeight: '1.8', maxWidth: '600px', margin: '0 auto 48px', textAlign: 'center' }}>
            Shared expectations for a respectful, safe experience.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px' }}>
            {guidelines.map(({ title, items }) => (
              <div key={title} style={{ padding: '28px', border: '1px solid var(--border)', background: 'var(--card)', borderRadius: 'var(--radius-xl)' }}>
                <h3 style={{ font: '500 20px var(--font-serif)', margin: '0 0 20px', color: 'var(--foreground)' }}>{title}</h3>
                <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--muted-foreground)', fontSize: '13px', lineHeight: '1.7' }}>
                  {items.map((item, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <CheckCircle size={16} style={{ flex: 'none', marginTop: '2px', color: 'var(--primary)' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: '80px', paddingTop: '60px', borderTop: '1px solid var(--border)' }}>
          <h2 style={{ font: '500 clamp(32px, 4vw, 42px)/1.1 var(--font-serif)', letterSpacing: '-0.04em', margin: '0 0 12px', textAlign: 'center', color: 'var(--foreground)' }}>
            Important Disclosures
          </h2>
          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ padding: '24px', border: '1px solid var(--border)', background: 'var(--card)', borderRadius: 'var(--radius-lg)' }}>
              <h3 style={{ font: '500 18px var(--font-serif)', margin: '0 0 12px', color: 'var(--foreground)' }}>No Background Checks</h3>
              <p style={{ color: 'var(--muted-foreground)', fontSize: '14px', lineHeight: '1.8', margin: 0 }}>
                We verify identity documents during onboarding, but we do not conduct criminal background checks, credit checks, or reference verification.
                We make no representations about any individual\'s character, history, or suitability. Members are responsible for their own due diligence.
              </p>
            </div>
            <div style={{ padding: '24px', border: '1px solid var(--border)', background: 'var(--card)', borderRadius: 'var(--radius-lg)' }}>
              <h3 style={{ font: '500 18px var(--font-serif)', margin: '0 0 12px', color: 'var(--foreground)' }}>No Payment Processing</h3>
              <p style={{ color: 'var(--muted-foreground)', fontSize: '14px', lineHeight: '1.8', margin: 0 }}>
                Avaani does not process payments, hold funds in escrow, or take commissions. All financial arrangements are strictly between you and the companion.
                We strongly advise against sending money, deposits, or advances to anyone you haven\'t met in person. We are not responsible for any financial losses.
              </p>
            </div>
            <div style={{ padding: '24px', border: '1px solid var(--border)', background: 'var(--card)', borderRadius: 'var(--radius-lg)' }}>
              <h3 style={{ font: '500 18px var(--font-serif)', margin: '0 0 12px', color: 'var(--foreground)' }}>Enquiries ≠ Bookings</h3>
              <p style={{ color: 'var(--muted-foreground)', fontSize: '14px', lineHeight: '1.8', margin: 0 }}>
                Submitting an enquiry through WhatsApp, email, or our contact form does not constitute a booking, contract, or guarantee of availability.
                Companions are independent individuals who choose their engagements. They may decline any enquiry for any reason.
              </p>
            </div>
            <div style={{ padding: '24px', border: '1px solid var(--border)', background: 'var(--card)', borderRadius: 'var(--radius-lg)' }}>
              <h3 style={{ font: '500 18px var(--font-serif)', margin: '0 0 12px', color: 'var(--foreground)' }}>Strictly 18+</h3>
              <p style={{ color: 'var(--muted-foreground)', fontSize: '14px', lineHeight: '1.8', margin: 0 }}>
                You must be 18 years or older to use Avaani. We require age confirmation at registration. Any profile suspected to belong to a minor
                will be immediately removed and reported to relevant authorities. We comply with all applicable laws.
              </p>
            </div>
          </div>
        </section>

        <section className="cta-section" style={{ marginTop: '80px' }}>
          <h2>Have a safety concern?</h2>
          <p>Report suspicious activity, inappropriate behaviour, or any violation of our guidelines. We take every report seriously.</p>
          <div className="cta-buttons">
            <a href="/contact" className="cta-button primary">
              Report a Concern
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <a href="mailto:safety@avaani.in" className="cta-button secondary">
              Email Safety Team
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}