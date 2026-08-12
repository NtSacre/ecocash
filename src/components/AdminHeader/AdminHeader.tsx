import { MaterialIcon } from '@/components/Loader/MaterialIcon/MaterialIcon'
import { useAuthContext } from '@/context/AuthContext'
import { useLogout } from '@/hooks/useLogout'

export function AdminHeader() {
  const { user } = useAuthContext()
  const logout = useLogout()

  return (
    <header className="flex items-center justify-between border-b border-outline-variant/10 bg-surface-container-lowest px-8 py-4">
      <div />
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-bold text-on-surface">{user?.name}</p>
          <p className="text-xs text-on-surface-variant">Super Admin</p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-container/20">
          <MaterialIcon className="text-primary" name="account_circle" />
        </div>
        <button
          className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-error"
          disabled={logout.isPending}
          onClick={() => logout.mutate()}
          title="Se déconnecter"
          type="button"
        >
          <MaterialIcon name="logout" />
        </button>
      </div>
    </header>
  )
}