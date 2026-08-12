import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge } from '@/components/Badge/Badge'
import { ConfirmQuantityModal } from '@/components/ConfirmQuantityModal/ConfirmQuantityModal'
import { EmptyState } from '@/components/EmptyState/EmptyState'
import { Loader } from '@/components/Loader/Loader'
import { TopBar } from '@/components/Loader/TopBar/TopBar'
import { useAssignedCollections } from '@/hooks/useAssignedCollections'
import { useAgentCollectionMutations } from '@/hooks/useAgentCollectionMutations'
import { DAY_OF_WEEK_LABELS, formatDateLabel } from '@/utils/weekday'
import { toNumber } from '@/utils/quantity'
import type { CollectionStatus, ICollection } from '@/core/interfaces/ICollection'

const STATUS_LABEL: Record<CollectionStatus, string> = {
  assigned: 'À démarrer',
  in_progress: 'En cours',
  collected: 'Collecté',
  delivered: 'Livré',
  validated: 'Validé',
}

const STATUS_TONE: Record<CollectionStatus, 'primary' | 'neutral' | 'warning'> = {
  assigned: 'warning',
  in_progress: 'neutral',
  collected: 'neutral',
  delivered: 'primary',
  validated: 'primary',
}

export default function AgentCollectionsPage() {
  const navigate = useNavigate()
  const [confirmTarget, setConfirmTarget] = useState<ICollection | null>(null)

  const collectionsQuery = useAssignedCollections()
  const { start, confirm, deliver } = useAgentCollectionMutations()

  const handleConfirm = async (quantity: number) => {
    if (!confirmTarget) return
    await confirm.mutateAsync({ id: confirmTarget.id, quantity })
    setConfirmTarget(null)
  }

  return (
    <div className="text-on-surface">
      <TopBar leftIcon="arrow_back" leftLabel="Retour" onLeftClick={() => navigate('/')} title="Mes collectes" />

      <main className="mx-auto max-w-screen-xl space-y-4 px-6 pb-12 pt-24">
        {collectionsQuery.isLoading && <Loader label="Chargement..." />}

        {collectionsQuery.data?.length === 0 && (
          <EmptyState description="Les collectes qui vous seront assignées apparaîtront ici." icon="local_shipping" title="Aucune collecte assignée" />
        )}

        {collectionsQuery.data?.map((collection) => {
          const { response } = collection
          return (
            <article key={collection.id} className="space-y-3 rounded-lg bg-surface-container-lowest p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-primary">
                    {response.listing.material.name}
                  </p>
                  <p className="font-headline font-bold text-on-surface">{response.particulier.name}</p>
                  <p className="text-xs text-on-surface-variant">{response.particulier.phone}</p>
                </div>
                <Badge label={STATUS_LABEL[collection.status]} tone={STATUS_TONE[collection.status]} />
              </div>

              {response.slot && response.collection_date && (
                <p className="text-sm capitalize text-on-surface-variant">
                  {formatDateLabel(response.collection_date)} · {response.slot.start_time.slice(0, 5)}-{response.slot.end_time.slice(0, 5)}
                </p>
              )}

              <p className="text-sm text-on-surface-variant">
                Quantité proposée : {response.quantity_offered} {response.listing.material.unit}
                {collection.quantity_collected ? ` · collecté : ${collection.quantity_collected} ${response.listing.material.unit}` : ''}
              </p>

              {collection.status === 'assigned' && (
                <button
                  className="w-full rounded-full bg-primary py-3 text-sm font-bold text-on-primary transition-transform active:scale-[0.98] disabled:opacity-60"
                  disabled={start.isPending}
                  onClick={() => start.mutate(collection.id)}
                  type="button"
                >
                  {start.isPending ? 'Démarrage...' : 'Démarrer la collecte'}
                </button>
              )}

              {collection.status === 'in_progress' && (
                <button
                  className="w-full rounded-full bg-primary py-3 text-sm font-bold text-on-primary transition-transform active:scale-[0.98]"
                  onClick={() => setConfirmTarget(collection)}
                  type="button"
                >
                  Confirmer la quantité collectée
                </button>
              )}

              {collection.status === 'collected' && (
                <button
                  className="w-full rounded-full bg-primary py-3 text-sm font-bold text-on-primary transition-transform active:scale-[0.98] disabled:opacity-60"
                  disabled={deliver.isPending}
                  onClick={() => deliver.mutate(collection.id)}
                  type="button"
                >
                  {deliver.isPending ? 'Livraison...' : 'Marquer comme livré au partenaire'}
                </button>
              )}

              {(collection.status === 'delivered' || collection.status === 'validated') && (
                <p className="text-center text-xs font-semibold text-on-surface-variant">
                  En attente de validation par le partenaire
                </p>
              )}
            </article>
          )
        })}
      </main>

      {confirmTarget && (
        <ConfirmQuantityModal
          isOpen={confirmTarget !== null}
          isSubmitting={confirm.isPending}
          offeredQuantity={toNumber(confirmTarget.response.quantity_offered)}
          onClose={() => setConfirmTarget(null)}
          onConfirm={handleConfirm}
          unit={confirmTarget.response.listing.material.unit}
        />
      )}
    </div>
  )
}