import type { Metadata } from 'next'
import { ArrowUpRight, ArrowRight, MapPin, MessageCircle, Phone, Mail, Shield, Clock, Send } from 'lucide-react'
import { SiteFooter, SiteHeader } from '@/components/site-chrome'
import { ContactPageOptions } from '@/components/contact-options'

export const metadata: Metadata = {
  title: 'Contact | Avaani',
  description: 'Get in touch with Avaani in Lucknow, Uttar Pradesh. We\'re here to answer your questions and discuss your companion needs.',
}

export default function ContactPage() {
  return (
    <>
      <SiteHeader activePath="/contact" />
      <main className="content-page contact-page">
        <section className="content-page-hero">
          <span className="eyebrow">GET IN TOUCH / AVAANI</span>
          <h1>Every meaningful<br/>connection starts<br/>with a <em>hello.</em></h1>
          <p>
            Have a question about our directory, want to discuss a specific occasion,
            or interested in joining as a companion? We\'d love to hear from you.
          </p>
        </section>

        <section className="contact-layout">
          <div className="contact-intro">
            <span className="eyebrow">CONTACT INFORMATION</span>
            <h2>Let\'s start a<br/><em>conversation.</em></h2>
            <p>
              We\'re a small, locally-rooted team based in Lucknow. We personally read every message
              and typically respond within 24 hours during business days.
            </p>

            <div className="contact-place">
              <MapPin size={18} aria-hidden="true" />
              <span>
                <strong>Based in Lucknow</strong>
                <small>Uttar Pradesh, India</small>
              </span>
            </div>

            <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--muted-foreground)' }}>
                <Clock size={18} />
                <span>Mon–Sat: 10:00–19:00 IST</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--muted-foreground)' }}>
                <Shield size={18} />
                <span>Strictly 18+ only</span>
              </div>
            </div>
          </div>

          <ContactPageOptions />
        </section>

        <section style={{ marginTop: '80px', paddingTop: '60px', borderTop: '1px solid var(--border)' }}>
          <h2 style={{ font: '500 clamp(32px, 4vw, 42px)/1.1 var(--font-serif)', letterSpacing: '-0.04em', margin: '0 0 12px', textAlign: 'center', color: 'var(--foreground)' }}>
            <em>Prefer to write?</em>
          </h2>
          <p style={{ color: 'var(--muted-foreground)', fontSize: '16px', lineHeight: '1.8', maxWidth: '600px', margin: '0 auto 48px', textAlign: 'center' }}>
            Send us a message and we\'ll get back to you within 24 hours.
          </p>

          <form className="contact-form" style={{ maxWidth: '600px', margin: '0 auto', display: 'grid', gap: '20px' }} action="https://formspree.io/f/your-form-id" method="POST">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <label style={{ display: 'grid', gap: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--foreground)' }}>Your Name *</span>
                <input type="text" name="name" required placeholder="Your full name" style={{ minHeight: '48px', padding: '0 16px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--card)', color: 'var(--foreground)', fontSize: '14px' }} />
              </label>
              <label style={{ display: 'grid', gap: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--foreground)' }}>Phone / WhatsApp</span>
                <input type="tel" name="phone" placeholder="+91 98765 43210" style={{ minHeight: '48px', padding: '0 16px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--card)', color: 'var(--foreground)', fontSize: '14px' }} />
              </label>
            </div>

            <label style={{ display: 'grid', gap: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--foreground)' }}>Email Address *</span>
              <input type="email" name="email" required placeholder="you@example.com" style={{ minHeight: '48px', padding: '0 16px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--card)', color: 'var(--foreground)', fontSize: '14px' }} />
            </label>

            <label style={{ display: 'grid', gap: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--foreground)' }}>Subject *</span>
              <select name="subject" required style={{ minHeight: '48px', padding: '0 16px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--card)', color: 'var(--foreground)', fontSize: '14px' }}>
                <option value="">Select a topic</option>
                <option value="general">General enquiry</option>
                <option value="booking">Booking & availability</option>
                <option value="profile">Profile submission</option>
                <option value="press">Press & media</option>
                <option value="safety">Safety concern / report</option>
                <option value="other">Other</option>
              </select>
            </label>

            <label style={{ display: 'grid', gap: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--foreground)' }}>Message *</span>
              <textarea name="message" required rows={5} placeholder="Tell us about your occasion, the type of companion you're looking for, or any questions you have..." style={{ minHeight: '140px', padding: '16px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--card)', color: 'var(--foreground)', fontSize: '14px', lineHeight: '1.6', resize: 'vertical', fontFamily: 'inherit' }} />
            </label>

            <button type="submit" className="content-primary-link" style={{ width: 'fit-content', justifySelf: 'start', display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '16px 32px', fontSize: '13px', fontWeight: '600', background: 'var(--primary)', color: 'var(--primary-foreground)', border: '1px solid var(--primary)', borderRadius: 'var(--radius)' }}>
              Send Message
              <Send size={16} aria-hidden="true" />
            </button>

            <p style={{ fontSize: '12px', color: 'var(--muted-foreground)', maxWidth: '400px' }}>
              By submitting this form, you agree to our <a href="/privacy" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Privacy Policy</a> and confirm you are 18 or older.
            </p>
          </form>
        </section>

        <section style={{ marginTop: '80px', paddingTop: '60px', borderTop: '1px solid var(--border)' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ font: '500 clamp(28px, 4vw, 36px)/1.2 var(--font-serif)', letterSpacing: '-0.04em', margin: '0 0 16px', color: 'var(--foreground)' }}>
              Interested in joining <em>Avaani?</em>
            </h2>
            <p style={{ color: 'var(--muted-foreground)', fontSize: '16px', lineHeight: '1.8', margin: '0 0 32px' }}>
              We\'re always looking for exceptional individuals to join our curated directory.
              If you believe you embody the standards of Avaani, we\'d love to hear from you.
            </p>
            <a href="/contact#submit" className="cta-button primary" style={{ display: 'inline-flex' }}>
              Submit Your Profile
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}