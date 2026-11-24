import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { createServiceClient } from '@/lib/supabase/admin'
import { AdminSetupForm } from '@/components/admin-setup-form'

export const dynamic = 'force-dynamic'

export default async function AdminSetupPage() {
  const service = createServiceClient()
  const { data: admin, error } = await service.from('admin_access').select('slot').eq('slot', true).maybeSingle()
  if (admin) redirect('/admin/login')

  return (
    <main className="admin-auth-page">
      <Link href="/" className="admin-back"><ArrowLeft size={15}/> Back to Avaani</Link>
      <div className="admin-auth-layout">
        <section className="admin-auth-story">
          <span className="admin-mark">A<span>.</span></span>
          <span className="admin-overline">AVAANI / ADMIN DASHBOARD</span>
          <h1>Make room<br/>for <em>good work.</em></h1>
          <p>Create the first administrator account to begin curating the directory.</p>
          <div className="admin-story-rule"><span>ONE-TIME SETUP</span><span>PRIVATE ADMIN ACCESS</span></div>
        </section>
        <section className="admin-auth-card">
          <div className="admin-card-icon">01</div>
          <span className="admin-overline">INITIAL ADMIN</span>
          <h2>Set up your desk.</h2>
          <p>The setup key keeps account creation private. This page closes after the first admin is created.</p>
          {error ? <div className="admin-form-error" role="alert">Admin setup is temporarily unavailable. Please try again later.</div> : <AdminSetupForm/>}
          <div className="admin-auth-foot">
            <span>Already have an account?</span>
            <Link href="/admin/login">Sign in <ArrowLeft size={13}/></Link>
          </div>
        </section>
      </div>
    </main>
  )
}