import { Link } from 'react-router-dom'
import { MaterialIcon } from '@/components/Loader/MaterialIcon/MaterialIcon'
import { Loader } from '@/components/Loader/Loader'
import { StatCard } from '@/components/StatCard/StatCard'
import { ADMIN_NAV_ITEMS } from '@/core/constants/adminNav'
import { useAdminStats } from '@/hooks/useAdminStats'

export default function DashboardPage() {
  const statsQuery = useAdminStats()
  const shortcuts = ADMIN_NAV_ITEMS.filter((item) => item.to !== '/dashboard')

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-2xl font-bold text-on-surface">Tableau de bord</h1>
        <p className="mt-1 text-on-surface-variant">Vue d&apos;ensemble de la plateforme EcoCash.</p>
      </div>

      {statsQuery.isLoading && <Loader label="Chargement des statistiques..." />}

      {statsQuery.data && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          <StatCard icon="campaign" label="Annonces actives" value={statsQuery.data.listings.active} />
          <StatCard icon="pause_circle" label="Annonces suspendues" tone="warning" value={statsQuery.data.listings.suspended} />
          <StatCard icon="check_circle" label="Annonces terminées" value={statsQuery.data.listings.closed} />
          <StatCard icon="handshake" label="Partenaires" value={statsQuery.data.partners.total} />
          <StatCard icon="hourglass_top" label="Partenaires en attente" tone="warning" value={statsQuery.data.partners.pending} />
          <StatCard icon="badge" label="Agents" value={statsQuery.data.agents} />
          <StatCard icon="groups" label="Particuliers" value={statsQuery.data.citizens} />
        </div>
      )}

      <div>
        <h2 className="mb-4 font-headline text-lg font-bold text-on-surface">Accès rapide</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shortcuts.map((item) => (
            <Link
              key={item.to}
              className="flex items-center gap-4 rounded-lg bg-surface-container-lowest p-5 shadow-sm transition-shadow hover:shadow-md"
              to={item.to}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-container/10">
                <MaterialIcon className="text-2xl text-primary" name={item.icon} />
              </div>
              <div>
                <p className="font-headline font-bold text-on-surface">{item.label}</p>
                <p className="text-xs text-on-surface-variant">Gérer</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}