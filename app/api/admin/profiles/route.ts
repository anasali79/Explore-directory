import { NextResponse } from 'next/server'
import { requireAdminResponse, validateProfile } from '@/lib/admin-api'

export async function GET() {
  const access = await requireAdminResponse()
  if ('response' in access) return access.response
  const { data, error } = await access.service.from('directory_profiles').select('*').order('created_at', { ascending: false })
  if (error) return NextResponse.json({ error: 'Could not load profiles.' }, { status: 500 })
  return NextResponse.json({ profiles: data })
}

export async function POST(request: Request) {
  const access = await requireAdminResponse()
  if ('response' in access) return access.response
  let body: unknown
  try { body = await request.json() } catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }) }
  const profile = validateProfile(body)
  if (!profile) return NextResponse.json({ error: 'Check the profile details and image path.' }, { status: 400 })
  const { data, error } = await access.service.from('directory_profiles').insert(profile).select('*').single()
  if (error) return NextResponse.json({ error: error.code === '23505' ? 'A profile with that URL slug already exists.' : 'Could not save this profile.' }, { status: 400 })
  return NextResponse.json({ profile: data }, { status: 201 })
}