'use client'

import React, { useEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Phone, X, ArrowUpRight, CheckCheck, Sparkles, ShieldCheck } from 'lucide-react'

export interface ContactModalProps {
  type: 'whatsapp' | 'call'
  name: string
  number: string
  message?: string
  targetUrl: string
  onClose: () => void
}

export function FullScreenContactModal({
  type,
  name,
  number,
  message,
  targetUrl,
  onClose
}: ContactModalProps) {
  const [mounted, setMounted] = useState(false)
  const [closing, setClosing] = useState(false)
  const [progress, setProgress] = useState(0)
  const hasTriggeredRedirect = useRef(false)

  // Ensure DOM is ready for portal
  useEffect(() => {
    setMounted(true)
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleDismiss()
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  // Animation timer & redirect
  useEffect(() => {
    if (!mounted) return

    const duration = 1400 // 1.4 seconds smooth animation
    const intervalTime = 30
    const step = (intervalTime / duration) * 100

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step
        if (next >= 100) {
          clearInterval(progressTimer)
          return 100
        }
        return next
      })
    }, intervalTime)

    const redirectTimer = setTimeout(() => {
      if (!hasTriggeredRedirect.current) {
        hasTriggeredRedirect.current = true
        executeNavigation()
      }
    }, duration)

    return () => {
      clearInterval(progressTimer)
      clearTimeout(redirectTimer)
    }
  }, [mounted, targetUrl, type])

  const executeNavigation = () => {
    if (type === 'whatsapp') {
      try {
        const newTab = window.open(targetUrl, '_blank', 'noopener,noreferrer')
        if (!newTab || newTab.closed || typeof newTab.closed === 'undefined') {
          window.location.href = targetUrl
        }
      } catch {
        window.location.href = targetUrl
      }
    } else {
      window.location.href = targetUrl
    }

    // Auto close overlay shortly after redirecting so site remains interactive
    setTimeout(() => {
      handleDismiss()
    }, 1200)
  }

  const handleDismiss = () => {
    setClosing(true)
    setTimeout(() => {
      onClose()
    }, 280)
  }

  const handleManualAction = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!hasTriggeredRedirect.current) {
      hasTriggeredRedirect.current = true
      executeNavigation()
    }
  }

  if (!mounted) return null

  const isWp = type === 'whatsapp'

  const content = (
    <div
      className={`fsa-overlay ${isWp ? 'fsa-overlay-wp' : 'fsa-overlay-call'} ${
        closing ? 'fsa-fade-out' : 'fsa-fade-in'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label={isWp ? `Connecting to WhatsApp for ${name}` : `Calling ${name}`}
      onClick={handleDismiss}
    >
      {/* Background Ripple Blast Rings */}
      <div className="fsa-ambient-glow" />
      <div className="fsa-ripple-ring fsa-ring-1" />
      <div className="fsa-ripple-ring fsa-ring-2" />
      <div className="fsa-ripple-ring fsa-ring-3" />

      {/* Main Glass Floating Card */}
      <div
        className={`fsa-card ${isWp ? 'fsa-card-wp' : 'fsa-card-call'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          className="fsa-close-btn"
          onClick={handleDismiss}
          aria-label="Cancel and close animation"
        >
          <X size={18} />
        </button>

        {/* Status Pill */}
        <div className="fsa-status-pill">
          <span className="fsa-live-dot" />
          <span>{isWp ? 'CONNECTING TO WHATSAPP DIRECT' : 'INITIATING SECURE CALL'}</span>
        </div>

        {/* Main Hero Icon Pod */}
        <div className="fsa-icon-zone">
          <div className="fsa-icon-pulse-wave wave-1" />
          <div className="fsa-icon-pulse-wave wave-2" />
          <div className={`fsa-icon-pod ${isWp ? 'fsa-icon-wp' : 'fsa-icon-call'}`}>
            {isWp ? (
              <svg
                viewBox="0 0 24 24"
                width="38"
                height="38"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="fsa-wp-svg"
              >
                <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
              </svg>
            ) : (
              <Phone size={36} className="fsa-phone-svg" />
            )}
          </div>
        </div>

        {/* Profile Info & Header */}
        <div className="fsa-heading-zone">
          <span className="fsa-badge-verified">
            <ShieldCheck size={13} />
            Verified Direct Contact
          </span>
          <h2 className="fsa-companion-name">{name}</h2>
          <span className="fsa-number-badge">{number}</span>
        </div>

        {/* Conditional Centerpiece: Predefined Message Preview (WhatsApp) or Audio Visualizer (Call) */}
        {isWp ? (
          <div className="fsa-wp-message-box">
            <div className="fsa-wp-message-header">
              <span className="fsa-wp-dot" />
              <span>PRE-CONFIGURED MESSAGE</span>
              <Sparkles size={12} className="fsa-sparkle-icon" />
            </div>
            <div className="fsa-wp-bubble">
              <p className="fsa-wp-text">
                &ldquo;{message || `Hi ${name}, I just saw your profile on Avaani and would like to connect with you.`}&rdquo;
              </p>
              <div className="fsa-wp-meta">
                <span className="fsa-wp-time">Just now</span>
                <CheckCheck size={14} className="fsa-wp-ticks" />
              </div>
            </div>
          </div>
        ) : (
          <div className="fsa-call-visualizer-box">
            <div className="fsa-call-status-text">
              <span className="fsa-ringing-indicator">Ringing</span>
              <span className="fsa-call-sub">Direct encrypted voice line</span>
            </div>
            <div className="fsa-audio-waves" aria-hidden="true">
              <span className="fsa-bar bar-1" />
              <span className="fsa-bar bar-2" />
              <span className="fsa-bar bar-3" />
              <span className="fsa-bar bar-4" />
              <span className="fsa-bar bar-5" />
              <span className="fsa-bar bar-6" />
              <span className="fsa-bar bar-7" />
            </div>
          </div>
        )}

        {/* Progress Bar & Countdown Indicator */}
        <div className="fsa-progress-zone">
          <div className="fsa-progress-track">
            <div
              className={`fsa-progress-fill ${isWp ? 'fill-wp' : 'fill-call'}`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="fsa-progress-caption">
            <span>{isWp ? 'Opening WhatsApp chat...' : 'Connecting to dialer...'}</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Quick Action Button */}
        <div className="fsa-actions-zone">
          <a
            href={targetUrl}
            target={isWp ? '_blank' : undefined}
            rel={isWp ? 'noopener noreferrer' : undefined}
            className={`fsa-primary-btn ${isWp ? 'btn-wp' : 'btn-call'}`}
            onClick={handleManualAction}
          >
            <span>{isWp ? 'Open WhatsApp Now' : 'Call Directly Now'}</span>
            <ArrowUpRight size={17} />
          </a>
          <button type="button" className="fsa-cancel-link" onClick={handleDismiss}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )

  return createPortal(content, document.body)
}
