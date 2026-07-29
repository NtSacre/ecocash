import { useNavigate, useParams } from 'react-router-dom'
import { EmptyState } from '@/components/EmptyState/EmptyState'
import { Loader } from '@/components/Loader/Loader'
import { MaterialIcon } from '@/components/Loader/MaterialIcon/MaterialIcon'
import { TopBar } from '@/components/Loader/TopBar/TopBar'
import { useCollectionSlots } from '@/hooks/useCollectionSlots'
import { useSelectSlot } from '@/hooks/useSelectSlot'

export default function SlotSelectionPage() {
  const { responseId } = useParams<{ responseId: string }>()
  const navigate = useNavigate()

  const slotsQuery = useCollectionSlots()
  const selectSlot = useSelectSlot()

  const handleSelect = async (slotId: number) => {
    if (!responseId) return
    try {
      await selectSlot.mutateAsync({ responseId: Number(responseId), slotId })
      navigate('/app/suivi')
    } catch {
      // erreur affichée via selectSlot.isError
    }
  }

  return (
    <div className="text-on-surface">
      <TopBar leftIcon="arrow_back" leftLabel="Retour" onLeftClick={() => navigate('/app/suivi')} title="Choisir un créneau" />

      <main className="mx-auto max-w-md space-y-4 px-6 pb-12 pt-24">
        {slotsQuery.isLoading && <Loader label="Chargement des créneaux..." />}

        {slotsQuery.data?.length === 0 && (
          <EmptyState description="Revenez plus tard, EcoCash publie de nouveaux créneaux régulièrement." icon="event_busy" title="Aucun créneau disponible" />
        )}

        {selectSlot.isError && (
          <p className="rounded-2xl bg-error-container px-4 py-3 text-sm text-on-error-container">
            Ce créneau n'est plus disponible. Choisissez-en un autre.
          </p>
        )}

        {slotsQuery.data?.map((slot) => (
          <button
            key={slot.id}
            className="flex w-full items-center justify-between rounded-lg bg-surface-container-lowest p-5 text-left shadow-sm transition-transform active:scale-[0.98] disabled:opacity-60"
            disabled={selectSlot.isPending}
            onClick={() => handleSelect(slot.id)}
            type="button"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-container/10">
                <MaterialIcon className="text-primary" name="event" />
              </div>
              <div>
                <p className="font-bold text-on-surface">{slot.label}</p>
                <p className="text-xs text-on-surface-variant">
                  {slot.date} · {slot.start_time.slice(0, 5)} - {slot.end_time.slice(0, 5)}
                  {slot.zone ? ` · ${slot.zone}` : ''}
                </p>
              </div>
            </div>
            <MaterialIcon className="text-on-surface-variant" name="chevron_right" />
          </button>
        ))}
      </main>
    </div>
  )
}