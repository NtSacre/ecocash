import { useState } from 'react'
import { Badge } from '@/components/Badge/Badge'
import { EmptyState } from '@/components/EmptyState/EmptyState'
import { Loader } from '@/components/Loader/Loader'
import { Select } from '@/components/Select/Select'
import { usePendingAssignments } from '@/hooks/usePendingAssignments'
import { useAdminCollections } from '@/hooks/useAdminCollections'
import { useAssignAgent } from '@/hooks/useAssignAgent'
import { useAdminAgents } from '@/hooks/useAdminAgents'
import { useRetryAutoAssign } from '@/hooks/useRetryAutoAssign'
import { formatDateLabel } from '@/utils/weekday'
import type { CollectionStatus } from '@/core/interfaces/ICollection'

type Tab = 'pending' | 'assigned'

const STATUS_LABEL: Record<CollectionStatus, string> = {
  assigned: 'Assignée',
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

export default function AdminAssignmentsPage() {
  const [tab, setTab] = useState<Tab>('pending')
  const [selectedAgent, setSelectedAgent] = useState<Record<number, number>>({})

  const pendingQuery = usePendingAssignments()
  const collectionsQuery = useAdminCollections()
  const agentsQuery = useAdminAgents()
  const assignAgent = useAssignAgent()
  const retryAutoAssign = useRetryAutoAssign()

  const handleAssign = (responseId: number) => {
    const agentId = selectedAgent[responseId]
    if (!agentId) return
    assignAgent.mutate({ responseId, agentId })
  }

  // Seules les collectes pas encore "collectées" peuvent être réassignées —
  // au-delà, la matière a déjà été récupérée, changer d'agent n'a plus de sens.
  const reassignableStatuses: CollectionStatus[] = ['assigned', 'in_progress']

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-2xl font-bold text-on-surface">Assignations d&apos;agents</h1>
        <button
          className="rounded-lg bg-secondary-container px-4 py-2 text-sm font-bold text-on-secondary-container disabled:opacity-60"
          disabled={retryAutoAssign.isPending}
          onClick={() => retryAutoAssign.mutate()}
          type="button"
        >
          {retryAutoAssign.isPending ? 'Traitement...' : "Relancer l'assignation auto"}
        </button>
      </div>

      {retryAutoAssign.data && (
  <div className="space-y-2 rounded-lg bg-surface-container-high p-4">
    <p className="text-sm font-semibold text-on-surface">{retryAutoAssign.data.message}</p>
    {retryAutoAssign.data.still_pending.length > 0 && (
      <ul className="space-y-1">
        {retryAutoAssign.data.still_pending.map((item: { response_id: number; listing_title: string; reason: string }) => (
          <li key={item.response_id} className="text-xs text-on-surface-variant">
            <span className="font-semibold">{item.listing_title}</span> — {item.reason}
          </li>
        ))}
      </ul>
    )}
  </div>
)}

      <div className="flex gap-2 rounded-full bg-surface-container-high p-1">
        <button
          className={`flex-1 rounded-full py-3 text-sm font-bold transition-colors ${tab === 'pending' ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant'}`}
          onClick={() => setTab('pending')}
          type="button"
        >
          En attente ({pendingQuery.data?.length ?? 0})
        </button>
        <button
          className={`flex-1 rounded-full py-3 text-sm font-bold transition-colors ${tab === 'assigned' ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant'}`}
          onClick={() => setTab('assigned')}
          type="button"
        >
          Assignées ({collectionsQuery.data?.length ?? 0})
        </button>
      </div>

      {tab === 'pending' && (
        <>
          {pendingQuery.isLoading && <Loader label="Chargement..." />}

          {pendingQuery.data?.length === 0 && (
            <EmptyState description="Aucune réponse en attente d'assignation pour le moment." icon="assignment_turned_in" title="Tout est assigné" />
          )}

          <div className="space-y-3">
            {pendingQuery.data?.map((response) => (
              <div key={response.id} className="flex flex-col gap-4 rounded-lg bg-surface-container-lowest p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-primary">{response.listing.material.name}</p>
                  <p className="font-headline font-bold text-on-surface">{response.listing.title}</p>
                  {response.collection_date && (
                    <p className="text-xs capitalize text-on-surface-variant">{formatDateLabel(response.collection_date)}</p>
                  )}
                </div>

                <div className="flex items-end gap-3">
                  <div className="w-48">
                    <Select
                      label="Agent"
                      onChange={(v) => setSelectedAgent((prev) => ({ ...prev, [response.id]: Number(v) }))}
                      options={(agentsQuery.data ?? []).map((a) => ({ value: a.id, label: a.name }))}
                      placeholder="Choisir"
                      value={selectedAgent[response.id]}
                    />
                  </div>
                  <button
                    className="rounded-lg bg-primary px-4 py-3 text-sm font-bold text-on-primary disabled:opacity-60"
                    disabled={!selectedAgent[response.id] || assignAgent.isPending}
                    onClick={() => handleAssign(response.id)}
                    type="button"
                  >
                    Assigner
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === 'assigned' && (
        <>
          {collectionsQuery.isLoading && <Loader label="Chargement..." />}

          {collectionsQuery.data?.length === 0 && (
            <EmptyState description="Aucune collecte assignée pour le moment." icon="local_shipping" title="Rien à afficher" />
          )}

          <div className="space-y-3">
            {collectionsQuery.data?.map((collection) => {
              const { response } = collection
              const canReassign = reassignableStatuses.includes(collection.status)

              return (
                <div key={collection.id} className="flex flex-col gap-4 rounded-lg bg-surface-container-lowest p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="mb-1 flex items-center gap-2">
                      <p className="text-xs font-bold uppercase tracking-widest text-primary">{response.listing.material.name}</p>
                      <Badge label={STATUS_LABEL[collection.status]} tone={STATUS_TONE[collection.status]} />
                    </div>
                    <p className="font-headline font-bold text-on-surface">{response.listing.title}</p>
                    <p className="text-xs text-on-surface-variant">
                      {response.particulier.name} · {response.particulier.phone}
                    </p>
                    {response.collection_date && (
                      <p className="text-xs capitalize text-on-surface-variant">{formatDateLabel(response.collection_date)}</p>
                    )}
                  </div>

                 {canReassign ? (
  <div className="flex flex-col items-end gap-2">
    <p className="text-xs text-on-surface-variant">
      Actuellement : <span className="font-bold text-on-surface">{collection.agent.name}</span>
    </p>
    <div className="flex items-end gap-3">
      <div className="w-48">
        <Select
          label="Réassigner à"
          onChange={(v) => setSelectedAgent((prev) => ({ ...prev, [response.id]: Number(v) }))}
          options={(agentsQuery.data ?? []).map((a) => ({ value: a.id, label: a.name }))}
          placeholder="Choisir un agent"
          value={selectedAgent[response.id]}
        />
      </div>
      <button
        className="rounded-lg bg-primary px-4 py-3 text-sm font-bold text-on-primary disabled:opacity-60"
        disabled={!selectedAgent[response.id] || assignAgent.isPending}
        onClick={() => handleAssign(response.id)}
        type="button"
      >
        Réassigner
      </button>
    </div>
  </div>
) : (
  <div className="text-right">
    <p className="text-xs font-semibold text-on-surface-variant">Agent</p>
    <p className="text-sm font-bold text-on-surface">{collection.agent.name}</p>
  </div>
)}
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}