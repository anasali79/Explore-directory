'use client'

import Link from 'next/link'
import { ArrowUpRight, Menu, X, MapPin, Phone, MessageCircle, Mail } from 'lucide-react'
import { useState, useEffect } from 'react'

type SiteHeaderProps = { activePath?: string }

const navigation = [
  { label: 'Home', href: '/' },
  { label: 'Directory', href: '/profiles' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
]

const footerNavigation = {
  Explore: [
    { label: 'All Profiles', href: '/profiles' },
    { label: 'Featured', href: '/profiles?featured=true' },
    { label: 'By Neighbourhood', href: '/profiles#neighbourhoods' },
  ],
  About: [
    { label: 'Our Story', href: '/about' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Trust & Safety', href: '/trust-safety' },
  ],
  Contact: [
    { label: 'Get in Touch', href: '/contact' },
    { label: 'Submit a Profile', href: '/contact#submit' },
    { label: 'Press & Media', href: '/contact#press' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Safety Guidelines', href: '/safety' },
  ],
}

// Inline SVG brand icons (since lucide-react doesn't include brand icons)
function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function TwitterIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
    </svg>
  )
}

function LinkedinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com', icon: InstagramIcon },
  { label: 'Twitter', href: 'https://twitter.com', icon: TwitterIcon },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: LinkedinIcon },
  { label: 'Email', href: 'mailto:hello@example.com', icon: Mail },
]

function Brand() {
  return (
    <Link href="/" className="brand" aria-label="Avaani home">
      <span className="brand-mark">A<span>.</span></span>
      <span>AVAANI<small>LUCKNOW'S PREMIER DIRECTORY</small></span>
    </Link>
  )
}

export function SiteHeader({ activePath = '' }: SiteHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`} id="top" role="banner">
      <div className="header-inner">
        <Brand />
        <nav className={mobileMenuOpen ? 'mobile-open' : ''} aria-label="Main navigation" role="navigation">
          {navigation.map((item) => {
            const active = activePath === item.href || (item.href === '/profiles' && activePath.startsWith('/profile/'))
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={active ? 'active' : ''}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
        <Link href="/profiles" className="header-cta" onClick={() => setMobileMenuOpen(false)}>
          Explore directory
          <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
        <button
          className="mobile-menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-controls="main-navigation"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  )
}

export function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-main">
        <div className="footer-brand-block">
          <Brand />
          <p>
            Lucknow's curated directory of distinguished companions and social-event partners.
            Connecting discerning individuals with exceptional company for memorable occasions.
          </p>
        </div>

        <nav className="footer-column" aria-label="Explore">
          <h4>Explore</h4>
          <ul>
            {footerNavigation.Explore.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="footer-column" aria-label="About">
          <h4>About</h4>
          <ul>
            {footerNavigation.About.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="footer-column" aria-label="Contact">
          <h4>Contact</h4>
          <ul>
            {footerNavigation.Contact.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="footer-column" aria-label="Legal">
          <h4>Legal</h4>
          <ul>
            {footerNavigation.Legal.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="footer-bottom">
        <div className="footer-location">
          <span className="eyebrow">ROOTED IN</span>
          <strong>Lucknow, India</strong>
          <span>Uttar Pradesh</span>
        </div>

        <div className="footer-bottom-links">
          <p className="copyright">© {currentYear} AVAANI. ALL RIGHTS RESERVED.</p>
          <nav className="footer-social" aria-label="Social links">
            {socialLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
              >
                <item.icon size={16} />
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}