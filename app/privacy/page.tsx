import type { Metadata } from 'next'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { SiteFooter, SiteHeader } from '@/components/site-chrome'

export const metadata: Metadata = {
  title: 'Privacy Policy | Avaani',
  description: 'Avaani\'s privacy policy explaining how we collect, use, and protect your personal information.',
  robots: { index: true, follow: true },
}

const sections = [
  {
    title: 'Information We Collect',
    content: `We collect information you provide directly to us:

    • Account information: name, email, phone number, password (hashed)
    • Profile information: for companions — photos, bio, location, interests, availability, languages, education, profession
    • Communication data: messages sent through our contact forms, enquiry submissions
    • Usage data: pages visited, time spent, device information, IP address
    • Cookies and similar technologies: for analytics, authentication, and preferences`
  },
  {
    title: 'How We Use Your Information',
    content: `We use your information to:

    • Provide and maintain the directory service
    • Process companion applications and manage profiles
    • Facilitate connections between clients and companions
    • Send service-related communications (not marketing without consent)
    • Improve our platform and user experience
    • Ensure safety and comply with legal obligations
    • Prevent fraud and abuse`
  },
  {
    title: 'Information Sharing',
    content: `We do not sell your personal information. We may share data only in these limited circumstances:

    • With the companion you enquire about (your contact details and message)
    • With service providers who operate our platform (hosting, analytics, email)
    • When required by law, court order, or government request
    • To protect safety, rights, or property of Avaani, our users, or the public
    • In connection with a merger, acquisition, or sale of assets (with notice)`
  },
  {
    title: 'Data Retention',
    content: `• Account data: retained while your account is active
    • Companion profiles: retained while published, plus 30 days after removal
    • Enquiry messages: retained for 90 days for safety review
    • Analytics data: aggregated and anonymized after 12 months
    • You may request deletion of your data at any time`
  },
  {
    title: 'Your Rights',
    content: `Under applicable data protection laws, you may have the right to:

    • Access your personal data
    • Correct inaccurate data
    • Request deletion of your data
    • Restrict or object to processing
    • Data portability
    • Withdraw consent where processing is based on consent
    • Lodge a complaint with a supervisory authority

    To exercise these rights, contact us at privacy@avaani.in`
  },
  {
    title: 'Cookies',
    content: `We use essential cookies for authentication and security, and analytics cookies (Vercel Analytics) to understand site usage. You can disable non-essential cookies in your browser settings, though some features may not work.`
  },
  {
    title: 'Security',
    content: `We implement reasonable technical and organizational measures to protect your data, including:

    • HTTPS encryption for all data in transit
    • Supabase\'s enterprise-grade database security
    • Role-based access control for admin functions
    • Regular security reviews

    However, no internet transmission is 100% secure. We cannot guarantee absolute security.`
  },
  {
    title: 'Age Restriction',
    content: `Avaani is strictly for individuals 18 years or older. We do not knowingly collect information from minors. If you believe a minor has provided data, contact us immediately for removal.`
  },
  {
    title: 'Changes to This Policy',
    content: `We may update this policy periodically. Material changes will be notified via email or a prominent notice on our site. Continued use after changes constitutes acceptance.`
  },
  {
    title: 'Contact Us',
    content: `For privacy questions or requests:

    Email: privacy@avaani.in
    Address: Lucknow, Uttar Pradesh, India

    We respond to all requests within 30 days as required by law.`
  },
]

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader activePath="/privacy" />
      <main className="content-page">
        <section className="content-page-hero">
          <span className="eyebrow">LEGAL / AVAANI</span>
          <h1>Privacy<br/><em>Policy.</em></h1>
          <p>Last updated: January 2025. Your trust matters. Here\'s how we protect your information.</p>
        </section>

        <section style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {sections.map(({ title, content }) => (
            <article key={title} style={{ padding: '32px', border: '1px solid var(--border)', background: 'var(--card)', borderRadius: 'var(--radius-xl)' }}>
              <h2 style={{ font: '500 24px var(--font-serif)', margin: '0 0 16px', color: 'var(--foreground)' }}>{title}</h2>
              <div style={{ color: 'var(--muted-foreground)', fontSize: '14px', lineHeight: '1.85', whiteSpace: 'pre-line' }}>
                {content}
              </div>
            </article>
          ))}
        </section>

        <section className="cta-section" style={{ marginTop: '80px' }}>
          <h2>Questions about privacy?</h2>
          <p>We\'re happy to explain any part of this policy in more detail.</p>
          <div className="cta-buttons">
            <a href="mailto:privacy@avaani.in" className="cta-button primary">
              Email Privacy Team
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