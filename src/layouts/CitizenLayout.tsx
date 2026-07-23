import { Outlet } from 'react-router-dom'

import { CITIZEN_NAV_ITEMS } from '@/core/constants/navigation'
import { BottomNav } from '@/components/Loader/BottomNav/BottomNav'

export function CitizenLayout() {
  return (
    <div className="min-h-screen pb-32 text-on-surface">
      <Outlet />
      <BottomNav items={CITIZEN_NAV_ITEMS} />
    </div>
  )
}