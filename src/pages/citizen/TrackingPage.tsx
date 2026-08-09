import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge } from '@/components/Badge/Badge'
import { EmptyState } from '@/components/EmptyState/EmptyState'
import { Loader } from '@/components/Loader/Loader'
import { SlotPickerModal } from '@/components/SlotPickerModal/SlotPickerModal'
import { TopBar } from '@/components/Loader/TopBar/TopBar'
import { useAuthContext } from '@/context/AuthContext'
import { useMyResponses } from '@/hooks/useMyResponses'
import { useIncomingResponses } from '@/hooks/useIncomingResponses'
import { useSelectSlot } from '@/hooks/useSelectSlot'
import { UserRole } from '@/core/enums/UserRole'
import { getPrimaryRole } from '@/utils/primaryRole'
import { RESPONSE_STATUS_LABEL, RESPONSE_STATUS_TONE } from '@/core/constants/responseStatus'
import { formatCurrency } from '@/utils/currency'
import { formatDateLabel } from '@/utils/weekday'
import type { IListingResponse } from '@/core/interfaces/IListingResponse'

type Tab = 'mine' | 'incoming'

export default function TrackingPage() {
  const navigate = useNavigate()
  const { user } = useAuthContext()
  const isPartner = user ? getPrimaryRole(user) === UserRole.Partner : false

  const [tab, setTab] = useState<Tab>('mine')
  const [activeResponseId, setActiveResponseId] = useState<number | null>(null)

  const myResponsesQuery = useMyResponses(!!user)
  const incomingQuery = useIncomingResponses(isPartner && tab === 'incoming')
  const selectSlot = useSelectSlot()

  const handleSlotSelect = async (slotId: number, date: string) => {
    if (!activeResponseId) return
    try {
      await selectSlot.mutateAsync({ responseId: activeResponseId, slotId, date })
      setActiveResponseId(null)
    } catch {
      // erreur silencieuse, modal reste ouvert pour réessayer
    }
  }

  const renderResponseCard = (response: IListingResponse, showBuyerName: boolean) => (
    <article key={response.id} className="space-y-3 rounded-lg bg-surface-container-lowest p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary">{response.listing.material.name}</p>
          <p className="font-headline font-bold text-on-surface">{response.listing.title}</p>
          {showBuyerName && response.particulier && (
            <p className="text-xs text-on-surface-variant">De : {response.particulier.name} · {response.particulier.phone}</p>
          )}
          <p className="text-xs text-on-surface-variant">
            {response.quantity_offered} {response.listing.material.unit} proposé
            {response.quantity_collected ? ` · ${response.quantity_collected} ${response.listing.material.unit} collecté` : ''}
          </p>
        </div>
        <Badge label={RESPONSE_STATUS_LABEL[response.status]} tone={RESPONSE_STATUS_TONE[response.status]} />
      </div>

      {!showBuyerName && response.status === 'pending' && (
        <button
          className="w-full rounded-full bg-primary py-3 text-sm font-bold text-on-primary transition-transform active:scale-[0.98]"
          onClick={() => setActiveResponseId(response.id)}
          type="button"
        >
          Choisir un créneau
        </button>
      )}

      {response.status === 'slot_selected' && response.slot && response.collection_date && (
        <p className="text-sm capitalize text-on-surface-variant">
          Rendez-vous : {formatDateLabel(response.collection_date)} · {response.slot.start_time.slice(0, 5)}-{response.slot.end_time.slice(0, 5)}
        </p>
      )}

      {response.payment && (
        <p className="text-sm font-bold text-primary">
          {response.payment.status === 'paid' ? 'Payé' : 'Paiement'} : {formatCurrency(response.payment.net_amount)}
        </p>
      )}
    </article>
  )

  return (
    <div className="text-on-surface">
      <TopBar title="Suivi" />

      <main className="mx-auto max-w-screen-xl space-y-4 px-6 pb-12 pt-24">
        {isPartner && (
          <div className="flex gap-2 rounded-full bg-surface-container-high p-1">
            <button
              className={`flex-1 rounded-full py-3 text-sm font-bold transition-colors ${tab === 'mine' ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant'}`}
              onClick={() => setTab('mine')}
              type="button"
            >
              Mes réponses
            </button>
            <button
              className={`flex-1 rounded-full py-3 text-sm font-bold transition-colors ${tab === 'incoming' ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant'}`}
              onClick={() => setTab('incoming')}
              type="button"
            >
              Réponses reçues
            </button>
          </div>
        )}

        {tab === 'mine' && (
          <>
            {myResponsesQuery.isLoading && <Loader label="Chargement..." />}
            {myResponsesQuery.data?.length === 0 && (
              <EmptyState description="Répondez à une annonce pour commencer à vendre." icon="inbox" title="Aucune réponse pour le moment" />
            )}
            {myResponsesQuery.data?.map((r) => renderResponseCard(r, false))}
          </>
        )}

        {tab === 'incoming' && isPartner && (
          <>
            {incomingQuery.isLoading && <Loader label="Chargement..." />}
            {incomingQuery.data?.length === 0 && (
              <EmptyState description="Personne n'a encore répondu à vos annonces." icon="move_to_inbox" title="Aucune réponse reçue" />
            )}
            {incomingQuery.data?.map((r) => renderResponseCard(r, true))}
          </>
        )}
      </main>

      <SlotPickerModal
        isOpen={activeResponseId !== null}
        isSubmitting={selectSlot.isPending}
        onClose={() => setActiveResponseId(null)}
        onSelect={handleSlotSelect}
      />
    </div>
  )
}