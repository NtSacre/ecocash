import { useNavigate } from 'react-router-dom'
import { Badge } from '@/components/Badge/Badge'
import { EmptyState } from '@/components/EmptyState/EmptyState'
import { Loader } from '@/components/Loader/Loader'
import { TopBar } from '@/components/Loader/TopBar/TopBar'
import { useMyResponses } from '@/hooks/useMyResponses'
import { useAuthContext } from '@/context/AuthContext'
import { RESPONSE_STATUS_LABEL, RESPONSE_STATUS_TONE } from '@/core/constants/responseStatus'
import { formatCurrency } from '@/utils/currency'
import { useState } from 'react'
import { SlotPickerModal } from '@/components/SlotPickerModal/SlotPickerModal'
import { useSelectSlot } from '@/hooks/useSelectSlot'
import { formatDateLabel } from '@/utils/weekday'

export default function TrackingPage() {
  const navigate = useNavigate()
  const { user } = useAuthContext()
  const responsesQuery = useMyResponses(!!user)

  const [activeResponseId, setActiveResponseId] = useState<number | null>(null)
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

  return (
    <div className="text-on-surface">
      <TopBar title="Suivi" />

      <main className="mx-auto max-w-screen-xl space-y-4 px-6 pb-12 pt-24">
        {responsesQuery.isLoading && <Loader label="Chargement..." />}

        {responsesQuery.data?.length === 0 && (
          <EmptyState description="Répondez à une annonce pour commencer à vendre." icon="inbox" title="Aucune réponse pour le moment" />
        )}

        {responsesQuery.data?.map((response) => (
          <article key={response.id} className="space-y-3 rounded-lg bg-surface-container-lowest p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-primary">
                  {response.listing.material.name}
                </p>
                <p className="font-headline font-bold text-on-surface">{response.listing.title}</p>
                <p className="text-xs text-on-surface-variant">
                  {response.quantity_offered} {response.listing.material.unit} proposé
                  {response.quantity_collected ? ` · ${response.quantity_collected} ${response.listing.material.unit} collecté` : ''}
                </p>
              </div>
              <Badge label={RESPONSE_STATUS_LABEL[response.status]} tone={RESPONSE_STATUS_TONE[response.status]} />
            </div>

           {response.status === 'pending' && (
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
        ))}

        <SlotPickerModal
  isOpen={activeResponseId !== null}
  isSubmitting={selectSlot.isPending}
  onClose={() => setActiveResponseId(null)}
  onSelect={handleSlotSelect}
/>
      </main>
    </div>
  )
}