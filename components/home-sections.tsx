'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Compass, MapPin, Palette, Sparkles, WandSparkles } from 'lucide-react'
import type { DirectoryProfile } from '@/lib/directory-data'

const disciplines = [
  { name: 'Artists', note: 'New perspectives, made visible.', icon: Palette },
  { name: 'Designers', note: 'Spaces and ideas with a point of view.', icon: Compass },
  { name: 'Makers', note: 'Good things, made by hand.', icon: WandSparkles },
  { name: 'Culture', note: 'The voices moving the city forward.', icon: Sparkles },
]

export function ExploreByDiscipline({ profiles, onSelectCategory }: { profiles: DirectoryProfile[]; onSelectCategory: (category: string) => void }) {
  function selectCategory(category: string) {
    onSelectCategory(category)
    document.getElementById('directory')?.scrollIntoView({ behavior: 'smooth' })
  }

  return <section className="explore-section" aria-labelledby="explore-heading"><div className="explore-heading"><div><span className="eyebrow">A GOOD PLACE TO BEGIN</span><h2 id="explore-heading">Follow what<br/><em>moves you.</em></h2></div><p>Start with a discipline, stay for the people. There&apos;s always something new around the corner.</p></div><div className="discipline-grid">{disciplines.map((item, index) => {
    const Icon = item.icon
    const count = profiles.filter((profile) => profile.category === item.name).length
    return <button className="discipline-card" key={item.name} onClick={() => selectCategory(item.name)}><span className="discipline-index">0{index + 1}</span><span className="discipline-icon"><Icon size={19} strokeWidth={1.5}/></span><span className="discipline-name">{item.name}<ArrowUpRight size={15}/></span><span className="discipline-note">{item.note}</span><span className="discipline-count">{count.toString().padStart(2, '0')} PEOPLE</span></button>
  })}</div></section>
}

export function FeaturedVoices({ profiles }: { profiles: DirectoryProfile[] }) {
  const featured = profiles.filter((profile) => profile.featured).slice(-3)
  if (!featured.length) return null

  return <section className="featured-voices-section"><div className="featured-heading"><div><span className="eyebrow">A FEW TO KNOW</span><h2>On our <em>radar.</em></h2></div><Link href="/profiles" className="text-link">Meet everyone <ArrowRight size={15}/></Link></div><div className="featured-voices-grid">{featured.map((profile, index) => <Link className={`featured-voice featured-voice-${index + 1}`} key={profile.slug} href={`/profile/${profile.slug}`}><div className="featured-voice-image"><Image src={profile.image} alt={`Portrait of ${profile.name}`} fill sizes="(max-width: 700px) 88vw, 30vw"/></div><div className="featured-voice-copy"><span>{profile.category} <span>/</span> {profile.location}</span><h3>{profile.name}</h3><p>{profile.specialty}</p><ArrowUpRight className="featured-voice-arrow" size={17}/></div></Link>)}</div></section>
}

export function NeighborhoodNotes({ profiles }: { profiles: DirectoryProfile[] }) {
  const allNeighborhoods = Array.from(new Set(profiles.map((profile) => profile.location)))
  const neighborhoods = allNeighborhoods.slice(0, 6)
  const disciplinesCount = new Set(profiles.map((profile) => profile.category)).size

  return <section className="neighborhood-notes"><div className="neighborhood-copy"><span className="eyebrow">THE CITY, UP CLOSE</span><h2>Lucknow is better<br/>when you <em>look closer.</em></h2><p>From the old lanes of Chowk to the open skies of Gomti Nagar, the best stories are usually just around the corner.</p><Link href="/profiles" className="neighborhood-link">Find your next favourite <ArrowUpRight size={15}/></Link></div><div className="neighborhood-aside"><div className="neighborhood-stats"><div><strong>{profiles.length.toString().padStart(2, '0')}</strong><span>LOCAL VOICES</span></div><div><strong>{allNeighborhoods.length.toString().padStart(2, '0')}</strong><span>NEIGHBOURHOODS</span></div><div><strong>{disciplinesCount.toString().padStart(2, '0')}</strong><span>DISCIPLINES</span></div></div><div className="neighborhood-list"><span className="eyebrow"><MapPin size={12}/> A FEW PLACES IN GOOD COMPANY</span><div>{neighborhoods.map((neighborhood) => <span key={neighborhood}>{neighborhood}</span>)}</div></div></div></section>
}
