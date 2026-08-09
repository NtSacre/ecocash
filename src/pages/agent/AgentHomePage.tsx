import { useNavigate } from 'react-router-dom'
import { MaterialIcon } from '@/components/Loader/MaterialIcon/MaterialIcon'
import { TopBar } from '@/components/Loader/TopBar/TopBar'
import { useAuthContext } from '@/context/AuthContext'
import { useAssignedCollections } from '@/hooks/useAssignedCollections'

export default function AgentHomePage() {
  const navigate = useNavigate()
  const { user } = useAuthContext()
  const collectionsQuery = useAssignedCollections()

  const pendingCount = collectionsQuery.data?.filter((c) => c.status === 'assigned').length ?? 0
  const inProgressCount = collectionsQuery.data?.filter((c) => c.status === 'in_progress').length ?? 0

  return (
    <div className="text-on-surface">
      <TopBar title="EcoCash Agent" />

      <main className="mx-auto max-w-screen-xl space-y-8 px-6 pt-24">
        <section className="space-y-1">
          <h2 className="font-headline text-3xl font-extrabold tracking-tight text-primary">
            Bonjour {user?.name ?? ''}
          </h2>
          <p className="font-medium text-on-surface-variant">Voici vos collectes du moment.</p>
        </section>

        <section className="grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-surface-container-lowest p-5 shadow-sm">
            <p className="font-headline text-3xl font-extrabold text-primary">{pendingCount}</p>
            <p className="text-xs font-semibold text-on-surface-variant">À démarrer</p>
          </div>
          <div className="rounded-lg bg-surface-container-lowest p-5 shadow-sm">
            <p className="font-headline text-3xl font-extrabold text-on-surface">{inProgressCount}</p>
            <p className="text-xs font-semibold text-on-surface-variant">En cours</p>
          </div>
        </section>

        <section className="flex justify-center py-2">
          <button
            className="action-gradient flex w-full items-center justify-center gap-4 rounded-full py-6 shadow-xl transition-transform duration-200 active:scale-95"
            onClick={() => navigate('/app/collectes')}
            type="button"
          >
            <MaterialIcon className="text-3xl text-white" name="local_shipping" />
            <span className="font-headline text-2xl font-extrabold tracking-tight text-white">Voir mes collectes</span>
          </button>
        </section>
      </main>
    </div>
  )
}