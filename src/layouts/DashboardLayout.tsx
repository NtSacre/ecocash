import { Outlet } from 'react-router-dom'

export function DashboardLayout() {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r border-outline-variant/10 bg-white">
        {/* Sidebar à construire : nav par rôle (admin/partenaire/agent) */}
      </aside>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  )
}