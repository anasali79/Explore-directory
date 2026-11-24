'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export function AdminSetupForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [setupKey, setSetupKey] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError('')
    const response = await fetch('/api/admin/setup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, setupKey }),
    })
    const result = await response.json()
    if (!response.ok) {
      setError(result.error || 'Could not create the admin account.')
      setLoading(false)
      return
    }

    const supabase = createClient()
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
    if (signInError) {
      router.replace('/admin/login?created=1')
      return
    }
    router.replace('/admin')
    router.refresh()
  }

  return <form onSubmit={submit} className="admin-form"><label>Admin email<input type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@yourstudio.com"/></label><label>Password <span className="admin-field-hint">12 characters minimum</span><input type="password" autoComplete="new-password" minLength={12} required value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Create a strong password"/></label><label>One-time setup key<input type="password" autoComplete="off" required value={setupKey} onChange={(event) => setSetupKey(event.target.value)} placeholder="Project setup key"/></label>{error && <p className="admin-form-error" role="alert">{error}</p>}<button className="admin-submit" disabled={loading}>{loading ? 'Creating secure account…' : 'Create admin account'}<ArrowRight size={16}/></button></form>
}
