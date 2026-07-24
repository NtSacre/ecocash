import { TopBar } from '@/components/Loader/TopBar/TopBar'
import { MaterialIcon } from '@/components/Loader/MaterialIcon/MaterialIcon'
import { useAuthContext } from '@/context/AuthContext'
import { useLogout } from '@/hooks/useLogout'

export default function ProfilePage() {
  const { user } = useAuthContext()
  const logout = useLogout()

  return (
    <div className="text-on-surface">
      <TopBar title="Mon compte" />

      <main className="mx-auto max-w-md space-y-6 px-6 pt-24">
        <section className="flex flex-col items-center gap-3 rounded-lg bg-surface-container-lowest p-8 text-center shadow-sm">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-container/20">
            <MaterialIcon className="text-4xl text-primary" name="account_circle" />
          </div>
          <div>
            <p className="font-headline text-lg font-bold text-on-surface">{user?.name}</p>
            <p className="text-sm text-on-surface-variant">{user?.phone}</p>
            {user?.email && <p className="text-sm text-on-surface-variant">{user.email}</p>}
          </div>
        </section>

        <button
          className="w-full rounded-full bg-error-container py-4 font-headline font-bold text-on-error-container transition-transform active:scale-[0.98] disabled:opacity-60"
          disabled={logout.isPending}
          onClick={() => logout.mutate()}
          type="button"
        >
          {logout.isPending ? 'Déconnexion...' : 'Se déconnecter'}
        </button>
      </main>
    </div>
  )
}