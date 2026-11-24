import type { Metadata } from 'next'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { SiteFooter, SiteHeader } from '@/components/site-chrome'

export const metadata: Metadata = {
  title: 'Terms of Service | Avaani',
  description: 'Avaani\'s terms of service governing use of our companion directory platform.',
  robots: { index: true, follow: true },
}

const sections = [
  {
    title: 'Acceptance of Terms',
    content: `By accessing or using Avaani ("the Platform"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree, do not use the Platform.

    We may update these Terms at any time. Material changes will be posted on this page with an updated effective date. Continued use constitutes acceptance.`
  },
  {
    title: 'Eligibility',
    content: `You must be at least 18 years old to use Avaani. By using the Platform, you represent and warrant that you are 18+ and have the legal capacity to enter into these Terms.

    Access from jurisdictions where this service is prohibited is not permitted. You are responsible for compliance with local laws.`
  },
  {
    title: 'Platform Description',
    content: `Avaani is a curated introduction directory connecting clients with companions for social, cultural, and professional occasions in Lucknow, India.

    Key clarifications:
    • We are an introduction service only — not an agency, employer, or marketplace
    • We do not provide companionship services ourselves
    • We do not process payments, hold funds, or take commissions
    • Companions are independent individuals, not our employees or contractors
    • All arrangements are strictly between the client and the companion`
  },
  {
    title: 'Companion Profiles',
    content: `Companion profiles are published with the companion\'s explicit, informed consent. Companions control their profile content and may request updates or removal at any time.

    We verify identity documents during onboarding but do not conduct background checks. We make no representations about any companion\'s character, history, skills, or suitability. Clients are responsible for their own due diligence.`
  },
  {
    title: 'Client Responsibilities',
    content: `As a client, you agree to:

    • Be 18+ and legally capable of contracting
    • Communicate respectfully and honestly
    • Respect companions\' stated boundaries, availability, and preferences
    • Not send money, deposits, or advances to anyone you haven\'t met
    • Meet in public places for initial encounters
    • Not use the Platform for illegal activities, harassment, or exploitation
    • Report any safety concerns immediately
    • Understand that enquiries do not guarantee bookings`
  },
  {
    title: 'Companion Responsibilities',
    content: `As a companion, you agree to:

    • Be 18+ and legally capable of contracting
    • Provide accurate, current information in your profile
    • Only publish content you own or have rights to use
    • Respond to enquiries professionally and timely
    • Honour agreed arrangements or communicate changes promptly
    • Not solicit illegal services or explicit content
    • Maintain your own safety screening practices
    • Request profile updates or removal through proper channels`
  },
  {
    title: 'Prohibited Conduct',
    content: `The following are strictly prohibited:

    • Any activity involving minors (under 18)
    • Human trafficking, exploitation, or coercion
    • Explicit sexual content or solicitation on profiles
    • Fake profiles, impersonation, or identity fraud
    • Harassment, threats, or abusive behaviour
    • Unauthorized scraping, data mining, or automation
    • Attempting to circumvent Platform features or security
    • Using the Platform for any illegal purpose

    Violations result in immediate account termination and may be reported to law enforcement.`
  },
  {
    title: 'Intellectual Property',
    content: `Avaani owns all Platform content, design, branding, and technology (excluding companion-provided content). Companions grant us a non-exclusive license to display their profile content on the Platform.

    You may not reproduce, distribute, or create derivative works from Platform content without written permission.`
  },
  {
    title: 'Disclaimers',
    content: `THE PLATFORM IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.

    We do not warrant that:
    • The Platform will be uninterrupted or error-free
    • Companions will respond to enquiries or accept engagements
    • Any companion is suitable for any particular occasion
    • Information on profiles is complete or accurate

    We are not liable for any direct, indirect, incidental, special, or consequential damages arising from use of the Platform, including but not limited to personal injury, financial loss, or emotional distress.`
  },
  {
    title: 'Limitation of Liability',
    content: `To the maximum extent permitted by law, Avaani\'s total liability for any claims arising from these Terms or your use of the Platform shall not exceed the amount you paid to Avaani in the 12 months preceding the claim (which is typically zero, as we charge no platform fees).

    This limitation applies regardless of the legal theory (contract, tort, negligence, etc.) and even if we were advised of the possibility of such damages.`
  },
  {
    title: 'Indemnification',
    content: `You agree to indemnify, defend, and hold harmless Avaani, its officers, directors, employees, and agents from any claims, damages, losses, or expenses (including reasonable legal fees) arising from:

    • Your breach of these Terms
    • Your use of the Platform
    • Your interactions with other users
    • Your violation of any law or third-party rights`
  },
  {
    title: 'Termination',
    content: `We may suspend or terminate your access at any time, with or without notice, for violation of these Terms or any other reason. Upon termination, your right to use the Platform ceases immediately.

    Companions may request profile removal at any time. We process removal requests within 24 hours.`
  },
  {
    title: 'Governing Law & Disputes',
    content: `These Terms are governed by the laws of India. Any disputes will be resolved in the courts of Lucknow, Uttar Pradesh.

    We encourage informal resolution first. Contact us at legal@avaani.in to discuss any concerns.`
  },
  {
    title: 'Contact',
    content: `Questions about these Terms?

    Email: legal@avaani.in
    Address: Lucknow, Uttar Pradesh, India`
  },
]

export default function TermsPage() {
  return (
    <>
      <SiteHeader activePath="/terms" />
      <main className="content-page">
        <section className="content-page-hero">
          <span className="eyebrow">LEGAL / AVAANI</span>
          <h1>Terms of<br/><em>Service.</em></h1>
          <p>Last updated: January 2025. Please read carefully before using Avaani.</p>
        </section>

        <section style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
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
          <h2>Questions about our terms?</h2>
          <p>We\'re happy to clarify any part of these terms.</p>
          <div className="cta-buttons">
            <a href="mailto:legal@avaani.in" className="cta-button primary">
              Email Legal Team
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