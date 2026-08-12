import { NavLink } from 'react-router-dom'
import { MaterialIcon } from '@/components/Loader/MaterialIcon/MaterialIcon'
import { ADMIN_NAV_ITEMS } from '@/core/constants/adminNav'

export function AdminSidebar() {
  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-outline-variant/10 bg-surface-container-lowest">
      <div className="flex items-center gap-2 px-6 py-6">
        <MaterialIcon className="text-2xl text-primary" name="eco" />
        <span className="font-headline text-lg font-black tracking-tight text-primary">EcoCash Admin</span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3">
        {ADMIN_NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            className={({ isActive }) =>
              [
                'flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold transition-colors',
                isActive
                  ? 'bg-secondary-container text-on-secondary-container'
                  : 'text-on-surface-variant hover:bg-surface-container-high',
              ].join(' ')
            }
            end={item.end}
            to={item.to}
          >
            <MaterialIcon className="text-xl" name={item.icon} />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}