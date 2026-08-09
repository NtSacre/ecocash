import { Loader } from '@/components/Loader/Loader'
import { KpiCard } from '@/components/KpiCard/KpiCard'
import { AgentWorkloadBar } from '@/components/AgentWorkloadBar/AgentWorkloadBar'
import { useAdminStats } from '@/hooks/useAdminStats'
import { formatCurrency } from '@/utils/currency'
import { formatQuantity } from '@/utils/quantity'

const MAX_AGENT_LOAD = 5

export default function DashboardPage() {
  const statsQuery = useAdminStats()
  const stats = statsQuery.data

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-headline text-2xl font-bold text-on-surface">Tableau de bord</h1>
        <p className="mt-1 text-on-surface-variant">Vue d&apos;ensemble de la plateforme EcoCash.</p>
      </div>

      {statsQuery.isLoading && <Loader label="Chargement des statistiques..." />}

      {stats && (
        <>
          <section>
            <h2 className="mb-4 font-headline text-lg font-bold text-on-surface">Nécessite votre attention</h2>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              <KpiCard
                icon="hourglass_empty"
                label="En attente de créneau"
                tone="warning"
                value={stats.operations.awaiting_slot}
              />
              <KpiCard
                icon="assignment_late"
                label="En attente d'assignation"
                linkTo="/dashboard/assignations"
                tone="warning"
                value={stats.operations.awaiting_assignment}
              />
              <KpiCard
                icon="local_shipping"
                label="Collectes en cours"
                value={stats.operations.in_progress}
              />
              <KpiCard
                icon="fact_check"
                label="Livraisons à valider (partenaire)"
                tone="warning"
                value={stats.operations.awaiting_partner_validation}
              />
            </div>
          </section>

          <section>
            <h2 className="mb-4 font-headline text-lg font-bold text-on-surface">Volume & activité</h2>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              <KpiCard icon="campaign" label="Annonces actives" linkTo="/dashboard/annonces" value={stats.listings.active} />
              <KpiCard icon="pause_circle" label="Annonces suspendues" value={stats.listings.suspended} />
              <KpiCard icon="scale" label="Total collecté" tone="primary" value={`${formatQuantity(stats.volume.total_collected)} kg`} />
              <KpiCard icon="check_circle" label="Collectes complétées" tone="primary" value={stats.volume.completed_collections} />
            </div>
          </section>

          <section>
            <h2 className="mb-4 font-headline text-lg font-bold text-on-surface">Finances</h2>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              <KpiCard icon="savings" label="Commission totale" tone="primary" value={formatCurrency(stats.finance.total_commission)} />
              <KpiCard icon="payments" label="Payé aux particuliers" value={formatCurrency(stats.finance.total_paid_to_citizens)} />
              <KpiCard
                icon="pending"
                label="Paiements en attente"
                linkTo="/dashboard/paiements"
                tone="warning"
                value={stats.finance.pending_payments_count}
              />
              <KpiCard icon="account_balance_wallet" label="Montant en attente" tone="warning" value={formatCurrency(stats.finance.pending_payments_amount)} />
            </div>
          </section>

          <section>
            <h2 className="mb-4 font-headline text-lg font-bold text-on-surface">Croissance</h2>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              <KpiCard icon="handshake" label="Partenaires (total)" linkTo="/dashboard/partenaires" value={stats.partners.total} />
              <KpiCard icon="trending_up" label="Nouveaux partenaires ce mois" tone="primary" value={stats.partners.new_this_month} />
              <KpiCard icon="groups" label="Particuliers (total)" value={stats.citizens.total} />
              <KpiCard icon="trending_up" label="Nouveaux particuliers ce mois" tone="primary" value={stats.citizens.new_this_month} />
            </div>
          </section>

          {stats.agent_workload.length > 0 && (
            <section>
              <h2 className="mb-4 font-headline text-lg font-bold text-on-surface">Charge des agents</h2>
              <div className="space-y-4 rounded-lg bg-surface-container-lowest p-6 shadow-sm">
                {stats.agent_workload.map((agent) => (
                  <AgentWorkloadBar key={agent.id} activeLoad={agent.active_load} maxLoad={MAX_AGENT_LOAD} name={agent.name} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  )
}