import 'server-only'
import { createClient } from '@/lib/supabase/server'
import { demoProfiles } from '@/lib/demo-profiles'

export type DirectoryProfile = {
  id?: string
  slug: string
  name: string
  category: string
  location: string
  country: string
  state: string
  city: string
  description: string
  image: string
  specialty: string
  featured: boolean
  published?: boolean
  // New fields for enhanced profiles
  galleryImages?: string[]
  interests?: string[]
  personality?: string
  languages?: string[]
  availability?: string
  age?: number
  height?: string
  education?: string
  profession?: string
  email?: string
  phone?: string
  whatsapp?: string
}

function mapDemoProfile(p: typeof demoProfiles[0]): DirectoryProfile {
  return {
    slug: p.slug,
    name: p.name,
    category: p.category,
    location: p.location,
    country: 'India',
    state: 'Uttar Pradesh',
    city: 'Lucknow',
    description: p.description,
    image: p.image,
    specialty: p.specialty,
    featured: p.featured ?? false,
    published: true,
    galleryImages: p.galleryImages,
    interests: p.interests,
    personality: p.personality,
    languages: p.languages,
    availability: p.availability,
    age: p.age,
    height: p.height,
    education: p.education,
    profession: p.profession,
    email: p.email,
    phone: p.phone,
    whatsapp: p.whatsapp,
  }
}

export async function getPublishedProfiles(): Promise<DirectoryProfile[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('directory_profiles')
      .select('id, slug, name, category, location, country, state, city, description, image, specialty, featured, gallery_images, interests, personality, languages, availability, age, height, education, profession, email, phone, whatsapp, published')
      .eq('published', true)
      .order('created_at', { ascending: true })

    if (error) throw new Error('Could not load the public directory.')
    if (data && data.length > 0) {
      return data as DirectoryProfile[]
    }
  } catch {
    // Fallback to demo profiles if Supabase is not configured
  }
  return demoProfiles.map(mapDemoProfile)
}

export async function getProfileBySlug(slug: string): Promise<DirectoryProfile | null> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('directory_profiles')
      .select('id, slug, name, category, location, country, state, city, description, image, specialty, featured, gallery_images, interests, personality, languages, availability, age, height, education, profession, email, phone, whatsapp, published')
      .eq('slug', slug)
      .eq('published', true)
      .single()

    if (error || !data) throw new Error('Profile not found')
    return data as DirectoryProfile
  } catch {
    // Fallback to demo profiles
    const demo = demoProfiles.find(p => p.slug === slug)
    return demo ? mapDemoProfile(demo) : null
  }
}