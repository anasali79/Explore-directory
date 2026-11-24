import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Calendar, Users, Heart, Shield, MapPin, Sparkles } from 'lucide-react'
import { SiteFooter, SiteHeader } from '@/components/site-chrome'

export const metadata: Metadata = {
  title: 'Services | Avaani',
  description: 'Discover Avaani\'s curated companion services for cultural events, corporate gatherings, travel, and intimate occasions in Lucknow.',
}

const services = [
  {
    number: '01',
    title: 'Social Companionship',
    description: 'Elegant companions for intimate dinners, theatre evenings, gallery openings, and private gatherings. Individuals who bring warmth, conversation, and cultural awareness to every occasion.',
    icon: Heart,
    features: ['Fine dining companions', 'Cultural event partners', 'Private gathering guests', 'Weekend companionship'],
  },
  {
    number: '02',
    title: 'Event Partnerships',
    description: 'Professional companions for corporate galas, charity fundraisers, product launches, and networking events. Polished individuals who understand protocol and elevate your professional presence.',
    icon: Users,
    features: ['Corporate gala partners', 'Networking event companions', 'Conference attendees', 'Award ceremony dates'],
  },
  {
    number: '03',
    title: 'Travel Companionship',
    description: 'Experienced travel partners for weekend getaways, heritage tours, destination weddings, and international trips. Knowledgeable companions who enhance every journey.',
    icon: Calendar,
    features: ['Weekend getaway partners', 'Heritage tour companions', 'Destination event dates', 'Extended travel companions'],
  },
  {
    number: '04',
    title: 'Cultural Experiences',
    description: 'Culturally grounded companions for heritage walks, museum visits, classical music evenings, poetry gatherings, and traditional arts events in Lucknow.',
    icon: Sparkles,
    features: ['Heritage walk guides', 'Classical arts companions', 'Literary event partners', 'Cultural festival dates'],
  },
]

const values = [
  {
    icon: Shield,
    title: 'Safety First',
    description: 'All companions are verified adults who publish profiles with explicit consent. We encourage safe meeting practices and provide reporting tools.',
  },
  {
    icon: MapPin,
    title: 'Locally Rooted',
    description: 'Based in Lucknow, we understand the city\'s culture, venues, and social landscape. Our companions are part of this community.',
  },
  {
    icon: Sparkles,
    title: 'Curated Quality',
    description: 'Every profile is reviewed by our editorial team. We prioritize authenticity, sophistication, and genuine connection over volume.',
  },
  {
    icon: Users,
    title: 'Direct Connections',
    description: 'No platform fees, no commissions, no interference. You connect directly with companions via WhatsApp, email, or phone.',
  },
]

export default function ServicesPage() {
  return (
    <>
      <SiteHeader activePath="/services" />
      <main className="content-page services-page">
        <section className="content-page-hero">
          <span className="eyebrow">OUR SERVICES / AVAANI</span>
          <h1>Exceptional company<br/>for <em>every occasion.</em></h1>
          <p>
            From intimate dinners to corporate galas, weekend getaways to heritage walks.
            Avaani connects you with companions who elevate the moment.
          </p>
          <Link href="/contact" className="content-primary-link">
            Discuss your needs
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </section>

        <section className="service-list" aria-label="Avaani services">
          {services.map(({ number, title, description, icon: Icon, features }) => (
            <article className="service-card" key={number}>
              <span className="service-number">{number}</span>
              <span className="service-icon">
                <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
              </span>
              <div>
                <h2>{title}</h2>
                <p>{description}</p>
                <ul style={{ margin: '16px 0 0', paddingLeft: '20px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px 24px', color: 'var(--muted-foreground)', fontSize: '12px', lineHeight: '1.8' }}>
                  {features.map((feature, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)' }} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <ArrowRight className="service-arrow" size={18} aria-hidden="true" />
            </article>
          ))}
        </section>

        <section className="services-note">
          <span className="eyebrow">OUR APPROACH</span>
          <p>Avaani is built around the belief that meaningful connections happen when quality meets intention.</p>
          <Link href="/profiles" className="content-text-link">
            Meet our companions
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </section>

        <section style={{ marginTop: '80px', paddingTop: '60px', borderTop: '1px solid var(--border)' }}>
          <h2 style={{ font: '500 clamp(32px, 4vw, 42px)/1.1 var(--font-serif)', letterSpacing: '-0.04em', margin: '0 0 12px', textAlign: 'center', color: 'var(--foreground)' }}>
            Why choose <em>Avaani?</em>
          </h2>
          <p style={{ color: 'var(--muted-foreground)', fontSize: '16px', lineHeight: '1.8', maxWidth: '600px', margin: '0 auto 48px', textAlign: 'center' }}>
            We\'re not a marketplace. We\'re a curated introduction service with standards.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {values.map(({ icon: Icon, title, description }) => (
              <div key={title} style={{ textAlign: 'center', padding: '24px' }}>
                <div style={{ width: '56px', height: '56px', margin: '0 auto 16px', background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-foreground)' }}>
                  <Icon size={24} />
                </div>
                <h3 style={{ font: '500 18px var(--font-serif)', margin: '0 0 10px', color: 'var(--foreground)' }}>{title}</h3>
                <p style={{ color: 'var(--muted-foreground)', fontSize: '13px', lineHeight: '1.8', margin: 0 }}>{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="cta-section" style={{ marginTop: '80px' }}>
          <h2>Ready to find the right<br/><em>companion for your occasion?</em></h2>
          <p>Browse our directory or contact us to discuss your specific needs.</p>
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