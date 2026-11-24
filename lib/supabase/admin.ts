import 'server-only'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/server'

export function createServiceClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-key'

  return createSupabaseClient(
    supabaseUrl,
    serviceKey,
    { auth: { autoRefreshToken: false, persistSession: false } },
  )
}

export async function getAdminUser() {
  try {
    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error || !user) return null

    const service = createServiceClient()
    const { data: admin, error: adminError } = await service
      .from('admin_access')
      .select('user_id')
      .eq('user_id', user.id)
      .maybeSingle()

    return adminError || !admin ? null : user
  } catch {
    return null
  }
}
