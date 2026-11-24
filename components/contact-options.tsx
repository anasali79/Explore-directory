'use client'

import { useState } from 'react'
import { Phone, MessageCircle, Mail, ArrowUpRight } from 'lucide-react'
import { FullScreenContactModal, type ContactModalProps } from '@/components/full-screen-contact-modal'

export function ContactPageOptions() {
  const [activeModal, setActiveModal] = useState<ContactModalProps | null>(null)

  const phoneNumber = '+91 98765 43210'
  const telUrl = 'tel:+919876543210'

  const predefinedMessage = 'Hi Avaani Concierge, I just saw your companion directory and would like to enquire about arrangements.'
  const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(predefinedMessage)}`

  const handleCallClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setActiveModal({
      type: 'call',
      name: 'Avaani Concierge',
      number: phoneNumber,
      targetUrl: telUrl,
      onClose: () => setActiveModal(null),
    })
  }

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setActiveModal({
      type: 'whatsapp',
      name: 'Avaani Concierge',
      number: phoneNumber,
      message: predefinedMessage,
      targetUrl: whatsappUrl,
      onClose: () => setActiveModal(null),
    })
  }

  return (
    <>
      <div className="contact-options">
        <h3 style={{ font: '500 24px var(--font-serif)', margin: '0 0 24px', color: 'var(--foreground)' }}>
          Ways to reach us
        </h3>

        <a className="contact-option" href={telUrl} onClick={handleCallClick}>
          <span className="contact-option-icon">
            <Phone size={20} aria-hidden="true" />
          </span>
          <span>
            <small>GIVE US A CALL</small>
            <strong>{phoneNumber}</strong>
          </span>
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>

        <a
          className="contact-option"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleWhatsAppClick}
        >
          <span className="contact-option-icon whatsapp">
            <MessageCircle size={20} aria-hidden="true" />
          </span>
          <span>
            <small>WHATSAPP US</small>
            <strong>Start a chat</strong>
          </span>
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>

        <a className="contact-option" href="mailto:hello@avaani.in">
          <span className="contact-option-icon">
            <Mail size={20} aria-hidden="true" />
          </span>
          <span>
            <small>SEND AN EMAIL</small>
            <strong>hello@avaani.in</strong>
          </span>
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>

        <p className="contact-note">
          We&apos;re a curated introduction service, not a marketplace. We don&apos;t process payments
          or take commissions. All arrangements are direct between you and the companion.
        </p>
      </div>

      {activeModal && <FullScreenContactModal {...activeModal} />}
    </>
  )
}
