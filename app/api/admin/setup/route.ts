import { timingSafeEqual } from 'node:crypto'
import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/admin'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const expectedKey = process.env.ADMIN_SETUP_KEY
  if (!expectedKey) return NextResponse.json({ error: 'Admin setup is not configured.' }, { status: 503 })

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  if (!body || typeof body !== 'object') return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  const { setupKey, email, password } = body as Record<string, unknown>
  if (typeof setupKey !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
    return NextResponse.json({ error: 'Enter the setup key, email, and password.' }, { status: 400 })
  }

  const supplied = Buffer.from(setupKey)
  const expected = Buffer.from(expectedKey)
  if (supplied.length !== expected.length || !timingSafeEqual(supplied, expected)) {
    return NextResponse.json({ error: 'The setup key is not valid.' }, { status: 403 })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.length < 12 || password.length > 128) {
    return NextResponse.json({ error: 'Use a valid email and a password with at least 12 characters.' }, { status: 400 })
  }

  const service = createServiceClient()
  const { data: existing, error: checkError } = await service.from('admin_access').select('slot').eq('slot', true).maybeSingle()
  if (checkError) return NextResponse.json({ error: 'Could not verify admin setup status.' }, { status: 503 })
  if (existing) return NextResponse.json({ error: 'Initial admin setup is already complete. Sign in instead.' }, { status: 409 })

  const { data: created, error: createError } = await service.auth.admin.createUser({
    email: email.trim().toLowerCase(),
    password,
    email_confirm: true,
  })
  if (createError || !created.user) return NextResponse.json({ error: 'Could not create this admin account. Check the email and try again.' }, { status: 400 })

  const { error: claimError } = await service.from('admin_access').insert({ slot: true, user_id: created.user.id })
  if (claimError) {
    await service.auth.admin.deleteUser(created.user.id)
    if (claimError.code === '23505') return NextResponse.json({ error: 'Initial admin setup is already complete. Sign in instead.' }, { status: 409 })
    return NextResponse.json({ error: 'Could not finish admin setup. Please try again.' }, { status: 500 })
  }

  return NextResponse.json({ success: true }, { status: 201 })
}
