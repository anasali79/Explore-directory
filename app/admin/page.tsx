import { redirect } from 'next/navigation'
import { AdminDashboard } from '@/components/admin-dashboard'
import { getAdminUser, createServiceClient } from '@/lib/supabase/admin'
import type { DirectoryProfile } from '@/lib/directory-data'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const user = await getAdminUser()
  if (!user) redirect('/admin/login')
  const service = createServiceClient()
  const { data, error } = await service.from('directory_profiles').select('*').order('created_at', { ascending: false })
  if (error) throw new Error('Could not load the directory management workspace.')
  return <AdminDashboard initialProfiles={(data ?? []) as DirectoryProfile[]} email={user.email ?? 'Admin'} />
}
