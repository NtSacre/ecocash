import { Outlet } from 'react-router-dom'
import { AdminSidebar } from '@/components/AdminSidebar/AdminSidebar'
import { AdminHeader } from '@/components/AdminHeader/AdminHeader'

export function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-surface">
      <AdminSidebar />
      <div className="flex flex-1 flex-col">
        <AdminHeader />
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}