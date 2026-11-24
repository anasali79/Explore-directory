'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowLeft, ArrowRight, LockKeyhole } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setLoading(true)
    const supabase = createClient()
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
    if (signInError) {
      setError('Email or password did not match an admin account.')
      setLoading(false)
      return
    }
    router.replace('/admin')
    router.refresh()
  }

  return (
    <main className="admin-auth-page">
      <Link href="/" className="admin-back"><ArrowLeft size={15}/> Back to Avaani</Link>
      <div className="admin-auth-layout">
        <section className="admin-auth-story">
          <span className="admin-mark">A<span>.</span></span>
          <span className="admin-overline">AVAANI / ADMIN DASHBOARD</span>
          <h1>Good things<br/><em>start here.</em></h1>
          <p>A quieter place to keep the directory thoughtful, current and distinctly local.</p>
          <div className="admin-story-rule"><span>PRIVATE ADMIN ACCESS</span><span>LUCKNOW, INDIA</span></div>
        </section>
        <section className="admin-auth-card">
          <div className="admin-card-icon"><LockKeyhole size={19}/></div>
          <span className="admin-overline">EDITOR SIGN IN</span>
          <h2>Welcome back.</h2>
          <p>Sign in to manage the Avaani directory.</p>
          <form onSubmit={submit} className="admin-form">
            <label>Email address<input type="email" autoComplete="username" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@yourstudio.com"/></label>
            <label>Password<input type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Your password"/></label>
            {error && <p className="admin-form-error" role="alert">{error}</p>}
            <button className="admin-submit" disabled={loading}>{loading ? 'Signing in…' : 'Sign in to your desk'}<ArrowRight size={16}/></button>
          </form>
          <div className="admin-auth-foot">
            <span>Access is reserved for the directory administrator.</span>
            <Link href="/admin/setup">First-time setup <ArrowRight size={13}/></Link>
          </div>
        </section>
      </div>
    </main>
  )
}