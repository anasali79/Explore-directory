'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowDownRight, ArrowUpRight, Check, ChevronDown, CirclePlus, Eye, EyeOff, LogOut, Pencil, Search, ShieldCheck, Trash2, X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import type { DirectoryProfile } from '@/lib/directory-data'

type EditableProfile = Omit<DirectoryProfile, 'id'>
const blankProfile: EditableProfile = {
  slug: '',
  name: '',
  category: 'Social Companions',
  location: '',
  country: 'India',
  state: 'Uttar Pradesh',
  city: 'Lucknow',
  description: '',
  image: '/portraits/priya.png',
  specialty: '',
  featured: false,
  published: true,
  galleryImages: [],
  interests: [],
  personality: '',
  languages: [],
  availability: '',
  age: undefined,
  height: '',
  education: '',
  profession: '',
  email: '',
  phone: '',
  whatsapp: '',
}

const categoryOptions = ['Social Companions', 'Event Partners', 'Travel Companions', 'Cultural Companions']

export function AdminDashboard({ initialProfiles, email }: { initialProfiles: DirectoryProfile[]; email: string }) {
  const router = useRouter()
  const [profiles, setProfiles] = useState(initialProfiles)
  const [selected, setSelected] = useState<DirectoryProfile | null>(null)
  const [draft, setDraft] = useState<EditableProfile>(blankProfile)
  const [query, setQuery] = useState('')
  const [saving, setSaving] = useState(false)
  const [notice, setNotice] = useState('')
  const [error, setError] = useState('')
  const filtered = useMemo(() => profiles.filter((profile) => `${profile.name} ${profile.category} ${profile.location}`.toLowerCase().includes(query.trim().toLowerCase())), [profiles, query])
  const publishedCount = profiles.filter((profile) => profile.published).length

  function startNew() {
    setSelected(null)
    setDraft(blankProfile)
    setError('')
    setNotice('')
  }

  function startEdit(profile: DirectoryProfile) {
    setSelected(profile)
    setDraft({
      slug: profile.slug,
      name: profile.name,
      category: profile.category,
      location: profile.location,
      country: profile.country,
      state: profile.state,
      city: profile.city,
      description: profile.description,
      image: profile.image,
      specialty: profile.specialty,
      featured: profile.featured,
      published: profile.published !== false,
      galleryImages: profile.galleryImages || [],
      interests: profile.interests || [],
      personality: profile.personality || '',
      languages: profile.languages || [],
      availability: profile.availability || '',
      age: profile.age,
      height: profile.height || '',
      education: profile.education || '',
      profession: profile.profession || '',
      email: profile.email || '',
      phone: profile.phone || '',
      whatsapp: profile.whatsapp || '',
    })
    setError('')
    setNotice('')
  }

  function updateDraft<K extends keyof EditableProfile>(key: K, value: EditableProfile[K]) {
    setDraft((current) => ({ ...current, [key]: value }))
  }

  function updateArrayField<K extends keyof EditableProfile>(key: K, value: string) {
    setDraft((current) => ({
      ...current,
      [key]: value.split(',').map(s => s.trim()).filter(Boolean)
    }))
  }

  async function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setError('')
    const endpoint = selected ? `/api/admin/profiles/${selected.id}` : '/api/admin/profiles'
    const response = await fetch(endpoint, { method: selected ? 'PATCH' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(draft) })
    const result = await response.json()
    if (!response.ok) {
      setError(result.error || 'Could not save this profile.')
      setSaving(false)
      return
    }
    setProfiles((current) => selected ? current.map((item) => item.id === selected.id ? result.profile : item) : [result.profile, ...current])
    setSelected(result.profile)
    setDraft({
      slug: result.profile.slug,
      name: result.profile.name,
      category: result.profile.category,
      location: result.profile.location,
      country: result.profile.country,
      state: result.profile.state,
      city: result.profile.city,
      description: result.profile.description,
      image: result.profile.image,
      specialty: result.profile.specialty,
      featured: result.profile.featured,
      published: result.profile.published,
      galleryImages: result.profile.galleryImages || [],
      interests: result.profile.interests || [],
      personality: result.profile.personality || '',
      languages: result.profile.languages || [],
      availability: result.profile.availability || '',
      age: result.profile.age,
      height: result.profile.height || '',
      education: result.profile.education || '',
      profession: result.profile.profession || '',
      email: result.profile.email || '',
      phone: result.profile.phone || '',
      whatsapp: result.profile.whatsapp || '',
    })
    setNotice('Profile saved. Your public directory is up to date.')
    setSaving(false)
  }

  async function deleteProfile(profile: DirectoryProfile) {
    if (!window.confirm(`Remove ${profile.name} from the directory?`)) return
    setError('')
    const response = await fetch(`/api/admin/profiles/${profile.id}`, { method: 'DELETE' })
    if (!response.ok) {
      const result = await response.json()
      setError(result.error || 'Could not remove this profile.')
      return
    }
    setProfiles((current) => current.filter((item) => item.id !== profile.id))
    if (selected?.id === profile.id) startNew()
    setNotice(`${profile.name} has been removed.`)
  }

  async function signOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.replace('/admin/login')
    router.refresh()
  }

  return <div className="admin-shell">
    <aside className="admin-sidebar">
      <a className="admin-brand" href="/"><span className="admin-mark">A<span>.</span></span><span>AVAANI<small>ADMIN DASHBOARD</small></span></a>
      <div className="admin-side-label">WORKSPACE</div>
      <a className="admin-nav-item active" href="#profiles"><span className="admin-nav-dot"/>Directory Profiles<span className="admin-nav-count">{profiles.length.toString().padStart(2, '0')}</span></a>
      <a className="admin-nav-item" href="/" target="_blank" rel="noreferrer"><Eye size={15}/>View Public Site<ArrowUpRight size={13}/></a>
      <div className="admin-sidebar-bottom">
        <div className="admin-secure-note">
          <ShieldCheck size={17}/>
          <div><strong>Private workspace</strong><span>Only your admin account can edit the directory.</span></div>
        </div>
        <button className="admin-signout" onClick={signOut}><LogOut size={15}/>Sign out</button>
      </div>
    </aside>
    <main className="admin-main" id="profiles">
      <header className="admin-topbar">
        <div className="admin-breadcrumb"><span>AVAANI</span><span>/</span><strong>DIRECTORY</strong></div>
        <div className="admin-account"><span className="admin-avatar">{email.slice(0, 1).toUpperCase()}</span><span>{email}</span><ChevronDown size={14}/></div>
      </header>
      <section className="admin-content">
        <div className="admin-page-heading">
          <div><span className="admin-overline">EDITORIAL DESK / LUCKNOW</span><h1>Manage Companions<br/><em>easy to find.</em></h1><p>Shape the directory, one thoughtful profile at a time.</p></div>
          <button className="admin-primary-button" onClick={startNew}><CirclePlus size={16}/>Add a profile</button>
        </div>
        <div className="admin-metrics">
          <div><span>ALL PROFILES</span><strong>{profiles.length.toString().padStart(2, '0')}</strong><small>People in your directory</small></div>
          <div><span>PUBLISHED</span><strong>{publishedCount.toString().padStart(2, '0')}</strong><small>Visible to your community</small></div>
          <div><span>FEATURED</span><strong>{profiles.filter((profile) => profile.featured).length.toString().padStart(2, '0')}</strong><small>Selected for the homepage</small></div>
        </div>
        <div className="admin-workspace">
          <section className="admin-profile-panel">
            <div className="admin-panel-heading">
              <div><span className="admin-overline">YOUR PEOPLE</span><h2>Directory <span>{profiles.length.toString().padStart(2, '0')}</span></h2></div>
              <label className="admin-search"><Search size={15}/><span className="sr-only">Search profiles</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search names or places"/></label>
            </div>
            <div className="admin-profile-list">
              {filtered.length ? filtered.map((profile) => <article key={profile.id} className={selected?.id === profile.id ? 'admin-profile-row selected' : 'admin-profile-row'}>
                <button className="admin-profile-open" onClick={() => startEdit(profile)}>
                  <span className="admin-thumb"><Image src={profile.image} alt="" fill sizes="48px"/></span>
                  <span className="admin-profile-meta"><strong>{profile.name}</strong><small>{profile.category} · {profile.location}, {profile.city}</small></span>
                  <span className={profile.published ? 'admin-status published' : 'admin-status draft'}>{profile.published ? 'LIVE' : 'DRAFT'}</span>
                </button>
                <button className="admin-icon-button" aria-label={`Edit ${profile.name}`} onClick={() => startEdit(profile)}><Pencil size={14}/></button>
              </article>) : <p className="admin-empty">No profiles match that search.</p>}
            </div>
          </section>
          <section className="admin-editor-panel">
            <div className="admin-editor-heading">
              <div><span className="admin-overline">{selected ? 'PROFILE DETAILS' : 'NEW ENTRY'}</span><h2>{selected ? 'Edit profile' : 'Add someone new'}</h2></div>
              {selected && <button className="admin-icon-button" aria-label="Clear editor" onClick={startNew}><X size={16}/></button>}
            </div>
            <form className="admin-editor-form" onSubmit={saveProfile}>
              <label>Full name
                <input required maxLength={100} value={draft.name} onChange={(event) => updateDraft('name', event.target.value)} placeholder="e.g. Aditi Sharma"/>
              </label>
              <div className="admin-field-row">
                <label>Category
                  <select value={draft.category} onChange={(event) => updateDraft('category', event.target.value)}>{categoryOptions.map((category) => <option key={category}>{category}</option>)}</select>
                </label>
                <label>Neighbourhood
                  <input required maxLength={100} value={draft.location} onChange={(event) => updateDraft('location', event.target.value)} placeholder="e.g. Hazratganj"/>
                </label>
              </div>
              <div className="admin-field-row">
                <label>Age
                  <input type="number" min="18" max="99" value={draft.age || ''} onChange={(event) => updateDraft('age', event.target.value ? parseInt(event.target.value) : undefined)} placeholder="e.g. 28"/>
                </label>
                <label>Height
                  <input maxLength={20} value={draft.height || ''} onChange={(event) => updateDraft('height', event.target.value)} placeholder="e.g. 5'6&quot;"/>
                </label>
              </div>
              <label>Short introduction
                <textarea required rows={3} maxLength={1000} value={draft.description} onChange={(event) => updateDraft('description', event.target.value)} placeholder="What makes them special?"/>
              </label>
              <div className="admin-field-row">
                <label>Specialty
                  <input maxLength={100} value={draft.specialty} onChange={(event) => updateDraft('specialty', event.target.value)} placeholder="e.g. Cultural events"/>
                </label>
                <label>URL slug
                  <input required maxLength={120} pattern="[a-z0-9]+(-[a-z0-9]+)*" value={draft.slug} onChange={(event) => updateDraft('slug', event.target.value)} placeholder="aditi-sharma"/>
              </label>
              </div>
              <label>Portrait image
                <input required maxLength={500} value={draft.image} onChange={(event) => updateDraft('image', event.target.value)} placeholder="/portraits/aditi.png"/>
                <small className="admin-hint">Use an image path from your site, such as /portraits/priya.png.</small>
              </label>
              <label>Gallery images (comma-separated)
                <input value={(draft.galleryImages || []).join(', ')} onChange={(event) => updateArrayField('galleryImages', event.target.value)} placeholder="/portraits/aditi-2.png, /portraits/aditi-3.png"/>
                <small className="admin-hint">Additional photos for the lightbox gallery. Separate with commas.</small>
              </label>
              <div className="admin-field-row">
                <label>Interests (comma-separated)
                  <input value={(draft.interests || []).join(', ')} onChange={(event) => updateArrayField('interests', event.target.value)} placeholder="Wine, Art, Travel"/>
                </label>
                <label>Languages (comma-separated)
                  <input value={(draft.languages || []).join(', ')} onChange={(event) => updateArrayField('languages', event.target.value)} placeholder="English, Hindi"/>
                </label>
              </div>
              <label>Personality
                <textarea rows={3} maxLength={500} value={draft.personality || ''} onChange={(event) => updateDraft('personality', event.target.value)} placeholder="Describe their personality and character..."/>
              </label>
              <div className="admin-field-row">
                <label>Education
                  <input maxLength={100} value={draft.education || ''} onChange={(event) => updateDraft('education', event.target.value)} placeholder="e.g. Master's in Literature"/>
                </label>
                <label>Profession
                  <input maxLength={100} value={draft.profession || ''} onChange={(event) => updateDraft('profession', event.target.value)} placeholder="e.g. Consultant"/>
                </label>
              </div>
              <label>Availability
                <input maxLength={200} value={draft.availability || ''} onChange={(event) => updateDraft('availability', event.target.value)} placeholder="e.g. Evenings and weekends"/>
              </label>
              <div className="admin-field-row">
                <label>Email
                  <input type="email" value={draft.email || ''} onChange={(event) => updateDraft('email', event.target.value)} placeholder="aditi@example.com"/>
                </label>
                <label>Phone
                  <input type="tel" value={draft.phone || ''} onChange={(event) => updateDraft('phone', event.target.value)} placeholder="+91 98765 43210"/>
                </label>
              </div>
              <label>WhatsApp
                <input type="tel" value={draft.whatsapp || ''} onChange={(event) => updateDraft('whatsapp', event.target.value)} placeholder="+91 98765 43210"/>
              </label>
              <div className="admin-toggles">
                <label className="admin-toggle">
                  <input type="checkbox" checked={draft.featured} onChange={(event) => updateDraft('featured', event.target.checked)}/>
                  <span><strong>Homepage feature</strong><small>Mark as a selected profile</small></span>
                </label>
                <label className="admin-toggle">
                  <input type="checkbox" checked={draft.published !== false} onChange={(event) => updateDraft('published', event.target.checked)}/>
                  <span><strong>Published</strong><small>Visible on the public site</small></span>{draft.published ? <Eye size={15}/> : <EyeOff size={15}/>}
                </label>
              </div>
              {error && <p className="admin-form-error" role="alert">{error}</p>}
              {notice && <p className="admin-form-success" role="status"><Check size={15}/>{notice}</p>}
              <div className="admin-editor-actions">
                <button className="admin-save-button" type="submit" disabled={saving}>{saving ? 'Saving…' : selected ? 'Save changes' : 'Add to directory'}<ArrowDownRight size={15}/></button>
                {selected && <button className="admin-delete-button" type="button" onClick={() => deleteProfile(selected)}><Trash2 size={14}/>Remove</button>}
              </div>
            </form>
          </section>
        </div>
        <div className="admin-bottom-note">
          <span>Curated with care, in Lucknow.</span>
          <a href="/" target="_blank" rel="noreferrer">Open public directory <ArrowUpRight size={13}/></a>
        </div>
      </section>
    </main>
  </div>
}