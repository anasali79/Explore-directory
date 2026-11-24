import type { Metadata } from 'next'
import { Shield, AlertTriangle, CheckCircle, XCircle, Phone, MessageCircle, MapPin, User, Heart, Lock, ArrowUpRight, Flag } from 'lucide-react'
import Link from 'next/link'
import { SiteFooter, SiteHeader } from '@/components/site-chrome'

export const metadata: Metadata = {
  title: 'Safety Guidelines | Avaani',
  description: 'Essential safety guidelines for clients and companions using Avaani. Learn how to stay safe, report concerns, and protect your privacy.',
  robots: { index: true, follow: true },
}

const clientGuidelines = [
  { title: 'Before Meeting', items: [
    'Thoroughly read the companion\'s full profile — interests, availability, boundaries, and location',
    'Verify the companion has recent photos and complete profile information',
    'Communicate clearly about the occasion, date, time, duration, and expectations',
    'Discuss and agree on meeting location — always choose a public place for the first meeting',
    'Inform a trusted friend or family member: who, where, when, and expected return time',
    'Share the companion\'s profile link with your trusted contact',
    'Arrange your own transportation to and from the meeting',
    'Trust your instincts — if something feels off, don\'t proceed',
  ]},
  { title: 'During the Meeting', items: [
    'Meet in the agreed public location — do not change venues without mutual agreement',
    'Stay aware of your surroundings and alcohol consumption',
    'Respect the companion\'s stated boundaries — physical, conversational, and temporal',
    'Keep your phone accessible and charged',
    'Check in with your trusted contact at agreed intervals',
    'If you feel unsafe at any point, leave immediately and contact your trusted person',
  ]},
  { title: 'Financial Safety', items: [
    'Never send money, deposits, advances, or gifts before meeting in person',
    'Be wary of requests for "verification fees," "travel deposits," or "booking confirmations"',
    'Avaani does not process payments — any request claiming to be from "Avaani payments" is fraudulent',
    'Discuss financial arrangements transparently and only after meeting',
    'Report anyone pressuring you for money immediately',
  ]},
]

const companionGuidelines = [
  { title: 'Profile Safety', items: [
    'Only share contact information you\'re comfortable making public (WhatsApp, email, or phone)',
    'Use a dedicated email/phone for Avaani if possible',
    'Do not share home address, workplace details, or family information',
    'Use professional photos that don\'t reveal identifiable locations',
    'Set clear boundaries in your profile: availability, occasion types, duration preferences',
    'Update your profile promptly when circumstances change',
  ]},
  { title: 'Screening Enquiries', items: [
    'Trust your instincts — you are not obligated to respond to every enquiry',
    'Look for respectful, specific messages that mention the occasion and date',
    'Be wary of vague enquiries, pressure for immediate response, or refusal to share basic info',
    'Consider a brief video call before meeting for the first time',
    'Verify the client\'s identity if possible (LinkedIn, company email, etc.)',
    'Decline any enquiry that makes you uncomfortable — no explanation needed',
  ]},
  { title: 'Meeting Safety', items: [
    'Always meet in a public place first — hotel lobby, upscale restaurant, cafe',
    'Share meeting details (who, where, when) with a trusted person',
    'Arrange your own transportation — do not accept rides from clients',
    'Set a check-in schedule with your trusted contact',
    'Have an exit strategy — know the venue layout and exits',
    'Carry a personal safety device if legal in your jurisdiction',
    'If anything feels wrong, leave immediately and contact your trusted person',
  ]},
]

const platformProtections = [
  { icon: Shield, title: 'Identity Verification', desc: 'All companions verify identity documents during onboarding. Clients see verified status indicators.' },
  { icon: Lock, title: 'Privacy Controls', desc: 'Companions choose which contact details to display. Personal data never sold or shared with third parties.' },
  { icon: Flag, title: 'Report & Block', desc: 'Report button on every profile. We investigate within 24 hours. Serious violations = immediate removal + authorities.' },
  { icon: AlertTriangle, title: 'No Fake Profiles', desc: 'Editorial review for every profile. No bots, no scraped content, no fabricated reviews or testimonials.' },
  { icon: Heart, title: 'Consent-Based', desc: 'Profiles published only with explicit consent. Companions can pause or remove anytime. No pressure.' },
  { icon: User, title: '18+ Enforcement', desc: 'Age verification at registration. Suspected minor profiles = immediate removal + law enforcement notification.' },
]

const emergencyResources = [
  { title: 'Emergency', number: '112', desc: 'India\'s unified emergency number (police, fire, medical)' },
  { title: 'Women\'s Helpline', number: '181', desc: '24/7 support for women in distress' },
  { title: 'Police', number: '100', desc: 'Direct police emergency line' },
  { title: 'Cyber Crime', number: '1930', desc: 'National cyber crime reporting portal' },
  { title: 'Child Protection', number: '1098', desc: 'Childline India Foundation' },
]

export default function SafetyPage() {
  return (
    <>
      <SiteHeader activePath="/safety" />
      <main className="content-page">
        <section className="content-page-hero">
          <span className="eyebrow">SAFETY GUIDELINES / AVAANI</span>
          <h1>Your safety<br/>is <em>non-negotiable.</em></h1>
          <p>
            Whether you\'re a client seeking companionship or a companion offering your time,
            these guidelines help protect everyone. Read them. Share them. Follow them.
          </p>
        </section>

        <section style={{ marginTop: '60px' }}>
          <h2 style={{ font: '500 clamp(32px, 4vw, 42px)/1.1 var(--font-serif)', letterSpacing: '-0.04em', margin: '0 0 12px', textAlign: 'center', color: 'var(--foreground)' }}>
            Platform Protections
          </h2>
          <p style={{ color: 'var(--muted-foreground)', fontSize: '16px', lineHeight: '1.8', maxWidth: '600px', margin: '0 auto 48px', textAlign: 'center' }}>
            What Avaani does to keep you safe.
          </p>
          <div className="trust-grid">
            {platformProtections.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="trust-card">
                <div style={{ width: '48px', height: '48px', color: 'var(--primary)' }}>
                  <Icon size={24} />
                </div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: '80px', paddingTop: '60px', borderTop: '1px solid var(--border)' }}>
          <h2 style={{ font: '500 clamp(32px, 4vw, 42px)/1.1 var(--font-serif)', letterSpacing: '-0.04em', margin: '0 0 12px', textAlign: 'center', color: 'var(--foreground)' }}>
            For <em>Clients</em>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {clientGuidelines.map(({ title, items }) => (
              <div key={title} style={{ padding: '28px 24px', border: '1px solid var(--border)', background: 'var(--card)', borderRadius: 'var(--radius-xl)' }}>
                <h3 style={{ font: '500 18px var(--font-serif)', margin: '0 0 20px', color: 'var(--foreground)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle size={20} color="var(--primary)" />
                  {title}
                </h3>
                <ul style={{ margin: 0, paddingLeft: '0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--muted-foreground)', fontSize: '13px', lineHeight: '1.7' }}>
                  {items.map((item, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)', flex: 'none', marginTop: '6px' }} />
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
            For <em>Companions</em>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {companionGuidelines.map(({ title, items }) => (
              <div key={title} style={{ padding: '28px 24px', border: '1px solid var(--border)', background: 'var(--card)', borderRadius: 'var(--radius-xl)' }}>
                <h3 style={{ font: '500 18px var(--font-serif)', margin: '0 0 20px', color: 'var(--foreground)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Shield size={20} color="var(--primary)" />
                  {title}
                </h3>
                <ul style={{ margin: 0, paddingLeft: '0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--muted-foreground)', fontSize: '13px', lineHeight: '1.7' }}>
                  {items.map((item, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)', flex: 'none', marginTop: '6px' }} />
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
            <em>Red Flags</em> — Report Immediately
          </h2>
          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            {[
              'Requests for money, deposits, or "verification fees" before meeting',
              'Pressure to meet in private locations or change agreed venues',
              'Refusal to share basic information or verify identity',
              'Aggressive, demanding, or disrespectful communication',
              'Requests for explicit content or services not discussed',
              'Claims of being "from Avaani" asking for payments',
              'Inconsistent profile details or evasive answers',
              'Attempts to isolate you from friends/family or disable phone',
              'Anyone appearing under 18 or unable to verify age',
              'Threats, coercion, or any form of pressure',
            ].map((flag, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '16px', background: 'var(--destructive) / 5%', border: '1px solid var(--destructive) / 20%', borderRadius: 'var(--radius)' }}>
                <XCircle size={20} style={{ flex: 'none', color: 'var(--destructive)', marginTop: '2px' }} />
                <span style={{ color: 'var(--foreground)', fontSize: '13px', lineHeight: '1.6' }}>{flag}</span>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: '80px', paddingTop: '60px', borderTop: '1px solid var(--border)' }}>
          <h2 style={{ font: '500 clamp(32px, 4vw, 42px)/1.1 var(--font-serif)', letterSpacing: '-0.04em', margin: '0 0 12px', textAlign: 'center', color: 'var(--foreground)' }}>
            Emergency <em>Resources</em>
          </h2>
          <p style={{ color: 'var(--muted-foreground)', fontSize: '16px', lineHeight: '1.8', maxWidth: '600px', margin: '0 auto 48px', textAlign: 'center' }}>
            Save these numbers. Share them. Hope you never need them.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', maxWidth: '900px', margin: '0 auto' }}>
            {emergencyResources.map(({ title, number, desc }) => (
              <a key={title} href={`tel:${number}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px', border: '1px solid var(--border)', background: 'var(--card)', borderRadius: 'var(--radius-lg)', textDecoration: 'none', transition: 'all 0.2s' }}>
                <span style={{ font: '500 36px var(--font-serif)', color: 'var(--primary)', letterSpacing: '-0.05em' }}>{number}</span>
                <span style={{ font: '500 14px var(--font-serif)', marginTop: '4px', color: 'var(--foreground)' }}>{title}</span>
                <span style={{ fontSize: '12px', color: 'var(--muted-foreground)', marginTop: '4px', textAlign: 'center' }}>{desc}</span>
              </a>
            ))}
          </div>
        </section>

        <section className="cta-section" style={{ marginTop: '80px' }}>
          <h2>Need to report<br/><em>a concern?</em></h2>
          <p>Use the report button on any profile, or contact our safety team directly. We respond within 24 hours.</p>
          <div className="cta-buttons">
            <a href="mailto:safety@avaani.in" className="cta-button primary">
              Report a Safety Concern
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <Link href="/contact" className="cta-button secondary">
              General Contact
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}