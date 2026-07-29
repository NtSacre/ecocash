import { useNavigate } from 'react-router-dom'
import { Badge } from '@/components/Badge/Badge'
import { EmptyState } from '@/components/EmptyState/EmptyState'
import { Loader } from '@/components/Loader/Loader'
import { TopBar } from '@/components/Loader/TopBar/TopBar'
import { useMyResponses } from '@/hooks/useMyResponses'
import { useAuthContext } from '@/context/AuthContext'
import { RESPONSE_STATUS_LABEL, RESPONSE_STATUS_TONE } from '@/core/constants/responseStatus'
import { formatCurrency } from '@/utils/currency'

export default function TrackingPage() {
  const navigate = useNavigate()
  const { user } = useAuthContext()
  const responsesQuery = useMyResponses(!!user)

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
                onClick={() => navigate(`/app/reponses/${response.id}/creneau`)}
                type="button"
              >
                Choisir un créneau
              </button>
            )}

            {response.status === 'slot_selected' && response.slot && (
              <p className="text-sm text-on-surface-variant">
                Créneau : {response.slot.label} · {response.slot.date}
              </p>
            )}

            {response.payment && (
              <p className="text-sm font-bold text-primary">
                {response.payment.status === 'paid' ? 'Payé' : 'Paiement'} : {formatCurrency(response.payment.net_amount)}
              </p>
            )}
          </article>
        ))}
      </main>
    </div>
  )
}