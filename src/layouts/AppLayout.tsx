import { Outlet } from 'react-router-dom'
import { BottomNav } from '@/components/Loader/BottomNav/BottomNav'
import { useAuthContext } from '@/context/AuthContext'
import { getNavItemsForRole } from '@/core/constants/navigation'
import { getPrimaryRole } from '@/utils/primaryRole'

export function AppLayout() {
  const { user } = useAuthContext()
  const navItems = getNavItemsForRole(user ? getPrimaryRole(user) : null)

  return (
    <div className="min-h-screen pb-24 text-on-surface">
      <Outlet />
      <BottomNav items={navItems} />
    </div>
  )
}