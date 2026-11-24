import { NextResponse } from 'next/server'
import { getAdminUser, createServiceClient } from '@/lib/supabase/admin'

export async function requireAdminResponse() {
  const user = await getAdminUser()
  if (!user) return { response: NextResponse.json({ error: 'Admin access required.' }, { status: 403 }) }
  return { user, service: createServiceClient() }
}

export function validateProfile(value: unknown) {
  if (!value || typeof value !== 'object') return null
  const input = value as Record<string, unknown>
  const text = (key: string, max: number) => typeof input[key] === 'string' && input[key].trim().length > 0 && input[key].trim().length <= max
  if (!text('name', 100) || !text('category', 60) || !text('location', 100) || !text('country', 100) || !text('state', 100) || !text('city', 100) || !text('description', 1000) || !text('specialty', 100) || !text('image', 500)) return null
  const image = (input.image as string).trim()
  if (!image.startsWith('/') || image.startsWith('//') || image.includes('..')) return null

  const slugInput = typeof input.slug === 'string' && input.slug.trim()
    ? input.slug.trim().toLowerCase()
    : (input.name as string).trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slugInput) || slugInput.length > 120) return null

  // Helper for array fields (comma-separated strings)
  const arrayField = (key: string) => {
    if (typeof input[key] === 'string') {
      return input[key].split(',').map(s => s.trim()).filter(Boolean)
    }
    if (Array.isArray(input[key])) {
      return input[key].filter(v => typeof v === 'string' && v.trim().length > 0)
    }
    return []
  }

  return {
    slug: slugInput,
    name: (input.name as string).trim(),
    category: (input.category as string).trim(),
    location: (input.location as string).trim(),
    country: (input.country as string).trim(),
    state: (input.state as string).trim(),
    city: (input.city as string).trim(),
    description: (input.description as string).trim(),
    image,
    specialty: (input.specialty as string).trim(),
    featured: input.featured === true,
    published: input.published !== false,
    gallery_images: arrayField('galleryImages'),
    interests: arrayField('interests'),
    personality: typeof input.personality === 'string' ? input.personality.trim() : '',
    languages: arrayField('languages'),
    availability: typeof input.availability === 'string' ? input.availability.trim() : '',
    age: typeof input.age === 'number' && input.age >= 18 && input.age <= 99 ? input.age : null,
    height: typeof input.height === 'string' ? input.height.trim() : '',
    education: typeof input.education === 'string' ? input.education.trim() : '',
    profession: typeof input.profession === 'string' ? input.profession.trim() : '',
    email: typeof input.email === 'string' && input.email.includes('@') ? input.email.trim() : '',
    phone: typeof input.phone === 'string' ? input.phone.trim() : '',
    whatsapp: typeof input.whatsapp === 'string' ? input.whatsapp.trim() : '',
    updated_at: new Date().toISOString(),
  }
}