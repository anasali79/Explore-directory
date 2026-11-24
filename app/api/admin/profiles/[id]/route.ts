import { NextResponse } from 'next/server'
import { requireAdminResponse, validateProfile } from '@/lib/admin-api'

type Context = { params: Promise<{ id: string }> }

export async function PATCH(request: Request, { params }: Context) {
  const access = await requireAdminResponse()
  if ('response' in access) return access.response
  let body: unknown
  try { body = await request.json() } catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }) }
  const profile = validateProfile(body)
  if (!profile) return NextResponse.json({ error: 'Check the profile details and image path.' }, { status: 400 })
  const { id } = await params
  const { data, error } = await access.service.from('directory_profiles').update(profile).eq('id', id).select('*').maybeSingle()
  if (error) return NextResponse.json({ error: error.code === '23505' ? 'A profile with that URL slug already exists.' : 'Could not update this profile.' }, { status: 400 })
  if (!data) return NextResponse.json({ error: 'Profile not found.' }, { status: 404 })
  return NextResponse.json({ profile: data })
}

export async function DELETE(_request: Request, { params }: Context) {
  const access = await requireAdminResponse()
  if ('response' in access) return access.response
  const { id } = await params
  const { error } = await access.service.from('directory_profiles').delete().eq('id', id)
  if (error) return NextResponse.json({ error: 'Could not delete this profile.' }, { status: 500 })
  return NextResponse.json({ success: true })
}
