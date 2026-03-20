export const dynamic = 'force-dynamic'

import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin-login')

  return (
    <div className="min-h-dvh bg-bg flex flex-col">
      <AdminSidebar user={session.user as any} />
      <main className="flex-1 px-3 pb-24 pt-4 max-w-2xl mx-auto w-full">
        {children}
      </main>
    </div>
  )
}
