import { NavLink } from 'react-router-dom'
import { MaterialIcon } from '@/components/Loader/MaterialIcon/MaterialIcon'
import { APP_DRAWER_LINKS } from '@/core/constants/drawerLinks'
import { useAuthContext } from '@/context/AuthContext'
import { useLogout } from '@/hooks/useLogout'

interface AppDrawerContentProps {
  onNavigate: () => void
}

export function AppDrawerContent({ onNavigate }: AppDrawerContentProps) {
  const { user } = useAuthContext()
  const logout = useLogout()

  return (
    <div className="flex flex-1 flex-col justify-between overflow-y-auto">
      <div>
        <div className="border-b border-outline-variant/10 px-5 py-4">
          <p className="font-headline font-bold text-on-surface">{user?.name}</p>
          <p className="text-xs text-on-surface-variant">{user?.phone}</p>
        </div>
        <nav className="flex flex-col gap-1 p-3">
          {APP_DRAWER_LINKS.map((link) => (
            <NavLink
              key={link.to}
              className={({ isActive }) =>
                [
                  'flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold transition-colors',
                  isActive
                    ? 'bg-secondary-container text-on-secondary-container'
                    : 'text-on-surface-variant hover:bg-surface-container-high',
                ].join(' ')
              }
              onClick={onNavigate}
              to={link.to}
            >
              <MaterialIcon className="text-xl" name={link.icon} />
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="border-t border-outline-variant/10 p-3">
        <button
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-error transition-colors hover:bg-error-container/40 disabled:opacity-60"
          disabled={logout.isPending}
          onClick={() => logout.mutate()}
          type="button"
        >
          <MaterialIcon className="text-xl" name="logout" />
          {logout.isPending ? 'Déconnexion...' : 'Se déconnecter'}
        </button>
      </div>
    </div>
  )
}