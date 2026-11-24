'use client'

import React, { useEffect, useState } from 'react'
import { ShieldAlert, AlertTriangle, ArrowRight, XCircle } from 'lucide-react'

const AGE_STORAGE_KEY = 'avaani_age_verified'

export function AgeVerification() {
  const [mounted, setMounted] = useState(false)
  const [status, setStatus] = useState<'checking' | 'prompt' | 'accepted' | 'rejected'>('checking')
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const accepted =
        window.localStorage.getItem(AGE_STORAGE_KEY) === 'true' ||
        window.sessionStorage.getItem(AGE_STORAGE_KEY) === 'true'
      setStatus(accepted ? 'accepted' : 'prompt')
    } catch {
      setStatus('prompt')
    }
  }, [])

  // Lock body scroll when prompt is visible or rejected
  useEffect(() => {
    if (!mounted) return
    if (status === 'prompt' || status === 'rejected') {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = originalOverflow
      }
    }
  }, [mounted, status])

  const accept = () => {
    setIsClosing(true)
    try {
      window.localStorage.setItem(AGE_STORAGE_KEY, 'true')
      window.sessionStorage.setItem(AGE_STORAGE_KEY, 'true')
    } catch {
      // ignore storage errors
    }
    setTimeout(() => {
      setStatus('accepted')
      setIsClosing(false)
    }, 250)
  }

  const reject = () => {
    setStatus('rejected')
    // "no bhar" - redirect user immediately away from the website
    setTimeout(() => {
      window.location.href = 'https://www.google.com'
    }, 1200)
  }

  if (!mounted || status === 'checking' || status === 'accepted') {
    return null
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-modal-title"
      className={`fixed inset-0 z-[99999] flex items-center justify-center p-4 transition-all duration-300 ${
        isClosing ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Blurred dark overlay */}
      <div className="absolute inset-0 bg-[#090807]/92 backdrop-blur-xl transition-opacity duration-300" />

      {/* Ambient luxury glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[480px] h-[480px] bg-amber-500/10 rounded-full blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 left-1/2 -translate-x-1/2 w-[480px] h-[480px] bg-rose-500/10 rounded-full blur-[120px]" />

      {/* Modal card */}
      <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-[#12100e] p-6 sm:p-8 shadow-2xl shadow-black/90 text-white">
        {status === 'rejected' ? (
          <div className="py-8 text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 border border-red-500/20 text-red-400">
              <XCircle className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white">Access Not Permitted</h2>
            <p className="text-sm text-stone-400 max-w-sm mx-auto">
              You must be at least 18 years of age to access this website. Redirecting you away...
            </p>
            <div className="pt-2">
              <a
                href="https://www.google.com"
                className="inline-flex items-center gap-2 text-xs text-amber-400 hover:text-amber-300 underline underline-offset-4"
              >
                Click here if you are not redirected automatically
              </a>
            </div>
          </div>
        ) : (
          <div className="space-y-6 text-center sm:text-left">
            {/* Header Badge */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500/20 to-rose-500/20 border border-amber-500/30 text-amber-400 shadow-inner">
                <ShieldAlert className="h-7 w-7" />
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-black text-white ring-2 ring-[#12100e]">
                  18+
                </span>
              </div>
              <div className="space-y-1">
                <span className="inline-block text-[11px] font-semibold tracking-wider text-amber-400/90 uppercase">
                  Age Verification Required
                </span>
                <h2 id="age-modal-title" className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Are you 18 or older?
                </h2>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2.5 rounded-xl bg-white/[0.03] border border-white/5 p-4 text-xs sm:text-sm text-stone-300 leading-relaxed text-left">
              <p>
                This website contains adult companion profiles, lifestyle directories, and media intended exclusively for consenting adults.
              </p>
              <div className="flex items-start gap-2 pt-1 text-[11px] sm:text-xs text-stone-400">
                <AlertTriangle className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
                <span>
                  Please confirm that you are <strong>at least 18 years old</strong> (or of legal age in your jurisdiction) to proceed.
                </span>
              </div>
            </div>

            {/* Action Buttons: Accept = Andar, Reject = Bhar */}
            <div className="flex flex-col-reverse sm:flex-row items-stretch gap-3 pt-2">
              <button
                type="button"
                onClick={reject}
                className="flex-1 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-medium text-stone-300 transition-all hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                No, I am Under 18 (Exit)
              </button>
              <button
                type="button"
                onClick={accept}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-3 text-sm font-bold text-stone-950 shadow-lg shadow-amber-500/20 transition-all hover:from-amber-400 hover:to-amber-500 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <span>Yes, I am 18+ (Enter)</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* Footer note */}
            <p className="text-[11px] text-stone-500 text-center">
              Your preference is remembered for future visits on this device.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
