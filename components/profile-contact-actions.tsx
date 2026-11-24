'use client'

import { useState } from 'react'
import { ArrowUpRight, MessageCircle, Phone } from 'lucide-react'
import { FullScreenContactModal, type ContactModalProps } from '@/components/full-screen-contact-modal'

type Props = {
  name: string
  className?: string
  phone?: string
  whatsapp?: string
}

export function ProfileContactActions({ name, className = '', phone, whatsapp }: Props) {
  const [activeModal, setActiveModal] = useState<ContactModalProps | null>(null)

  const phoneDigits = phone?.replace(/\D/g, '') || '919876543210'
  const whatsappDigits = whatsapp?.replace(/\D/g, '') || phoneDigits

  // Predefined custom message as requested: "Hi, I just viewed your profile..."
  const predefinedMessage = `Hi ${name ? `${name}, ` : ''}I just viewed your profile on Avaani and would like to connect with you.`

  const whatsappUrl = `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(predefinedMessage)}`
  const telUrl = phone ? `tel:${phone}` : `tel:+${phoneDigits}`

  const handleCallClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setActiveModal({
      type: 'call',
      name,
      number: phone || `+${phoneDigits}`,
      targetUrl: telUrl,
      onClose: () => setActiveModal(null),
    })
  }

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setActiveModal({
      type: 'whatsapp',
      name,
      number: whatsapp || phone || '+91 98765 43210',
      message: predefinedMessage,
      targetUrl: whatsappUrl,
      onClose: () => setActiveModal(null),
    })
  }

  return (
    <>
      <div className={`detail-contact-actions ${className}`.trim()} aria-label={`Contact ${name}`}>
        {phone && (
          <a
            className="detail-contact-action call-action"
            href={telUrl}
            onClick={handleCallClick}
            aria-label={`Call ${name} at ${phone}`}
          >
            <Phone size={17} aria-hidden="true" />
            <span>
              <strong>Call</strong>
              <small>{phone}</small>
            </span>
          </a>
        )}
        {whatsapp && (
          <a
            className="detail-contact-action whatsapp-action"
            href={whatsappUrl}
            onClick={handleWhatsAppClick}
            aria-label={`WhatsApp ${name}`}
          >
            <MessageCircle size={17} aria-hidden="true" />
            <span>
              <strong>WhatsApp</strong>
              <small>{whatsapp}</small>
            </span>
            <ArrowUpRight className="contact-external-icon" size={14} aria-hidden="true" />
          </a>
        )}
        {!phone && !whatsapp && (
          <a
            className="detail-contact-action whatsapp-action"
            href={whatsappUrl}
            onClick={handleWhatsAppClick}
            aria-label={`WhatsApp ${name} (default)`}
          >
            <MessageCircle size={17} aria-hidden="true" />
            <span>
              <strong>WhatsApp</strong>
              <small>+91 98765 43210</small>
            </span>
            <ArrowUpRight className="contact-external-icon" size={14} aria-hidden="true" />
          </a>
        )}
      </div>

      {activeModal && <FullScreenContactModal {...activeModal} />}
    </>
  )
}
