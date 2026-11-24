'use client'

import { useEffect, useState } from 'react'
import { ShieldCheck, TriangleAlert } from 'lucide-react'

const AGE_STORAGE_KEY = 'avaani-age-verified'

export function AgeVerification() {
  const [status, setStatus] = useState<'checking' | 'prompt' | 'accepted' | 'rejected'>('checking')

  useEffect(() => {
    const accepted = window.sessionStorage.getItem(AGE_STORAGE_KEY) === 'true'
    setStatus(accepted ? 'accepted' : 'prompt')
  }, [])

  useEffect(() => {
    if (status !== 'prompt' && status !== 'rejected') return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [status])

  const accept = () => {
    window.sessionStorage.setItem(AGE_STORAGE_KEY, 'true')
    setStatus('accepted')
  }

  const reject = () => {
    setStatus('rejected')
  }

  if (status === 'checking' || status === 'accepted') return null

  if (status === 'rejected') {
    return (
      <div className="age-gate" role="dialog" aria-modal="true" aria-labelledby="age-rejected-title">
        <div className="age-gate-card age-gate-rejected" role="document">
          <div className="age-gate-icon age-gate-icon-warning" aria-hidden="true">
            <TriangleAlert size={30} />
          </div>
          <p className="age-gate-kicker">ACCESS NOT PERMITTED</p>
          <h2 id="age-rejected-title">You must be 18 or older</h2>
          <p className="age-gate-copy">
            This website contains adult-orientated content and is not available to minors.
          </p>
          <button type="button" className="age-gate-button age-gate-button-secondary" onClick={() => setStatus('prompt')}>
            Go back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="age-gate" role="dialog" aria-modal="true" aria-labelledby="age-gate-title" aria-describedby="age-gate-description">
      <div className="age-gate-card" role="document">
        <div className="age-gate-icon" aria-hidden="true">
          <ShieldCheck size={32} />
        </div>
        <p className="age-gate-kicker">AGE VERIFICATION</p>
        <h2 id="age-gate-title">Are you 18 or older?</h2>
        <p id="age-gate-description" className="age-gate-copy">
          This website is intended only for adults aged 18 and above. Please confirm your age before continuing.
        </p>
        <div className="age-gate-actions">
          <button type="button" className="age-gate-button age-gate-button-primary" onClick={accept}>
            Yes, I am 18+
          </button>
          <button type="button" className="age-gate-button age-gate-button-secondary" onClick={reject}>
            No, I am under 18
          </button>
        </div>
        <p className="age-gate-note">By continuing, you confirm that you meet the minimum age requirement.</p>
      </div>
    </div>
  )
}
