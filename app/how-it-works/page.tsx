import type { Metadata } from 'next'
import { ArrowRight, Search, MessageCircle, Users, Heart, CheckCircle, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { SiteFooter, SiteHeader } from '@/components/site-chrome'

export const metadata: Metadata = {
  title: 'How It Works | Avaani',
  description: 'Learn how to find and connect with companions on Avaani. Simple, respectful, and transparent process from discovery to meeting.',
  robots: { index: true, follow: true },
}

const steps = [
  {
    number: '01',
    title: 'Discover',
    description: 'Browse our curated directory of companions in Lucknow. Filter by category — Social Companions, Event Partners, Travel Companions, or Cultural Companions — or by neighbourhood.',
    icon: Search,
    details: [
      'View professional portraits and detailed profiles',
      'Read about interests, personality, and availability',
      'See languages spoken, education, and background',
      'Filter by Gomti Nagar, Hazratganj, Indira Nagar, and more',
    ],
  },
  {
    number: '02',
    title: 'Enquire',
    description: 'When you find someone who matches your occasion, send a respectful enquiry. Use WhatsApp, email, or phone — whatever the companion has shared.',
    icon: MessageCircle,
    details: [
      'Click the WhatsApp button for instant messaging',
      'Use the contact form for detailed enquiries',
      'Call directly if a phone number is provided',
      'Mention the occasion, date, and any preferences',
    ],
  },
  {
    number: '03',
    title: 'Connect',
    description: 'The companion receives your message directly. They\'ll respond if interested and available. No platform interference — just two people connecting.',
    icon: Users,
    details: [
      'Direct communication — no middleman',
      'Discuss details, expectations, and boundaries',
      'Confirm availability and logistics',
      'Both parties must feel comfortable proceeding',
    ],
  },
  {
    number: '04',
    title: 'Enjoy',
    description: 'Meet for your occasion and experience memorable company. Whether it\'s a cultural evening, business gala, weekend getaway, or intimate dinner — the connection is yours.',
    icon: Heart,
    details: [
      'Meet in a public place first for safety',
      'Respect agreed-upon boundaries and timing',
      'No platform fees or commissions ever',
      'Share feedback to help our community',
    ],
  },
]

const importantNotes = [
  { icon: CheckCircle, title: 'No platform fees', desc: 'We never charge commissions or take a percentage of any arrangement.' },
  { icon: CheckCircle, title: 'No payment processing', desc: 'We don\'t handle money. All financial matters are strictly between you and the companion.' },
  { icon: CheckCircle, title: 'Enquiries ≠ Bookings', desc: 'Sending an enquiry doesn\'t guarantee a booking. Companions choose their engagements freely.' },
  { icon: CheckCircle, title: '18+ only', desc: 'Strictly for adults. Age verified at registration for all members.' },
  { icon: CheckCircle, title: 'Consent-based', desc: 'Every companion publishes their profile with explicit, informed consent.' },
  { icon: CheckCircle, title: 'Privacy protected', desc: 'We never share your contact details without your permission.' },
]

export default function HowItWorksPage() {
  return (
    <>
      <SiteHeader activePath="/how-it-works" />
      <main className="content-page">
        <section className="content-page-hero">
          <span className="eyebrow">HOW IT WORKS / AVAANI</span>
          <h1>Four steps to<br/><em>memorable company.</em></h1>
          <p>
            Simple, respectful, and transparent. From discovering the right companion to enjoying
            your occasion — we make the introduction, you make the connection.
          </p>
        </section>

        <section style={{ marginTop: '60px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
            {steps.map((step, idx) => (
              <div key={step.number} style={{ position: 'relative', padding: '32px 24px', border: '1px solid var(--border)', background: 'var(--card)', borderRadius: '16px', transition: 'all 0.3s ease' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <span style={{ font: '500 32px var(--font-serif)', color: 'var(--primary)', letterSpacing: '-0.05em' }}>{step.number}</span>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(201, 169, 110, 0.12)', border: '1px solid rgba(201, 169, 110, 0.25)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <step.icon size={22} />
                  </div>
                </div>
                <h3 style={{ font: '500 22px var(--font-serif)', margin: '0 0 12px', color: 'var(--foreground)' }}>{step.title}</h3>
                <p style={{ color: 'var(--muted-foreground)', fontSize: '14px', lineHeight: '1.7', margin: '0 0 20px', fontWeight: 300 }}>{step.description}</p>
                <ul style={{ margin: 0, paddingLeft: '0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {step.details.map((detail, dIdx) => (
                    <li key={dIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: 'var(--muted-foreground)', lineHeight: '1.6' }}>
                      <CheckCircle size={16} style={{ flex: 'none', marginTop: '2px', color: 'var(--primary)' }} />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: '80px', paddingTop: '60px', borderTop: '1px solid var(--border)' }}>
          <h2 style={{ font: '500 clamp(32px, 4vw, 42px)/1.1 var(--font-serif)', letterSpacing: '-0.04em', margin: '0 0 12px', textAlign: 'center', color: 'var(--foreground)' }}>
            <em>Important</em> things to know
          </h2>
          <p style={{ color: 'var(--muted-foreground)', fontSize: '16px', lineHeight: '1.8', maxWidth: '600px', margin: '0 auto 48px', textAlign: 'center', fontWeight: 300 }}>
            We believe in radical transparency. Here&apos;s what makes Avaani different.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            {importantNotes.map(({ icon: Icon, title, desc }) => (
              <div key={title} style={{ textAlign: 'center', padding: '28px 24px', border: '1px solid var(--border)', background: 'var(--card)', borderRadius: '16px', transition: 'all 0.3s ease' }}>
                <div style={{ width: '48px', height: '48px', margin: '0 auto 16px', background: 'rgba(201, 169, 110, 0.12)', border: '1px solid rgba(201, 169, 110, 0.25)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                  <Icon size={22} />
                </div>
                <h3 style={{ font: '500 18px var(--font-serif)', margin: '0 0 8px', color: 'var(--foreground)' }}>{title}</h3>
                <p style={{ color: 'var(--muted-foreground)', fontSize: '13px', lineHeight: '1.8', margin: 0, fontWeight: 300 }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: '80px', paddingTop: '60px', borderTop: '1px solid var(--border)' }}>
          <h2 style={{ font: '500 clamp(32px, 4vw, 42px)/1.1 var(--font-serif)', letterSpacing: '-0.04em', margin: '0 0 12px', textAlign: 'center', color: 'var(--foreground)' }}>
            Tips for a great experience
          </h2>
          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
            {[
              { title: 'Before You Enquire', items: ['Read the full profile carefully', 'Note the companion\'s stated availability', 'Check location compatibility', 'Prepare a respectful, specific message'] },
              { title: 'When Messaging', items: ['Introduce yourself briefly', 'Mention the occasion and date', 'Be clear about expectations', 'Respect stated boundaries'] },
              { title: 'Safety First', items: ['Meet in public first', 'Tell a friend your plans', 'Trust your instincts', 'Report any concerns immediately'] },
              { title: 'After Meeting', items: ['Be punctual and respectful', 'Honour agreed arrangements', 'Leave feedback if helpful', 'Recommend us if you enjoyed it'] },
            ].map(({ title, items }) => (
              <div key={title} style={{ padding: '24px', border: '1px solid var(--border)', background: 'var(--card)', borderRadius: 'var(--radius-lg)' }}>
                <h3 style={{ font: '500 18px var(--font-serif)', margin: '0 0 16px', color: 'var(--foreground)' }}>{title}</h3>
                <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px', color: 'var(--muted-foreground)', fontSize: '13px', lineHeight: '1.7' }}>
                  {items.map((item, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)', flex: 'none', marginTop: '6px' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="cta-section" style={{ marginTop: '80px' }}>
          <h2>Ready to find<br/><em>your companion?</em></h2>
          <p>Start browsing our curated directory of distinguished companions in Lucknow.</p>
          <div className="cta-buttons">
            <Link href="/profiles" className="cta-button primary">
              Explore Directory
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link href="/contact" className="cta-button secondary">
              Have Questions?
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}