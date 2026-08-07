import { useState } from 'react'
import { Modal } from '@/components/Modal/Modal'
import { EmptyState } from '@/components/EmptyState/EmptyState'
import { Loader } from '@/components/Loader/Loader'
import { MaterialIcon } from '@/components/Loader/MaterialIcon/MaterialIcon'
import { useCollectionSlots } from '@/hooks/useCollectionSlots'
import { DAY_OF_WEEK_LABELS, formatDateLabel, getNextOccurrences } from '@/utils/weekday'
import type { ICollectionSlot } from '@/core/interfaces/ICollectionSlot'

interface SlotPickerModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (slotId: number, date: string) => void
  isSubmitting: boolean
}

export function SlotPickerModal({ isOpen, onClose, onSelect, isSubmitting }: SlotPickerModalProps) {
  const [selectedSlot, setSelectedSlot] = useState<ICollectionSlot | null>(null)
  const slotsQuery = useCollectionSlots()

  const handleClose = () => {
    setSelectedSlot(null)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={selectedSlot ? 'Choisir une date' : 'Choisir un créneau'}>
      {!selectedSlot && (
        <div className="space-y-3">
          {slotsQuery.isLoading && <Loader label="Chargement des créneaux..." />}

          {slotsQuery.data?.length === 0 && (
            <EmptyState description="EcoCash publie de nouveaux créneaux régulièrement." icon="event_busy" title="Aucun créneau disponible" />
          )}

          {slotsQuery.data?.map((slot) => (
            <button
              key={slot.id}
              className="flex w-full items-center justify-between rounded-lg bg-surface-container-lowest p-4 text-left shadow-sm transition-transform active:scale-[0.98]"
              onClick={() => setSelectedSlot(slot)}
              type="button"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-container/10">
                  <MaterialIcon className="text-primary" name="event" />
                </div>
                <div>
                  <p className="text-sm font-bold text-on-surface">
                    {DAY_OF_WEEK_LABELS[slot.day_of_week]} · {slot.label}
                  </p>
                  <p className="text-xs text-on-surface-variant">
                    {slot.start_time.slice(0, 5)} - {slot.end_time.slice(0, 5)}
                    {slot.zone ? ` · ${slot.zone}` : ''}
                  </p>
                </div>
              </div>
              <MaterialIcon className="text-on-surface-variant" name="chevron_right" />
            </button>
          ))}
        </div>
      )}

      {selectedSlot && (
        <div className="space-y-3">
          <button
            className="mb-2 flex items-center gap-1 text-sm font-semibold text-on-surface-variant"
            onClick={() => setSelectedSlot(null)}
            type="button"
          >
            <MaterialIcon className="text-lg" name="arrow_back" />
            {DAY_OF_WEEK_LABELS[selectedSlot.day_of_week]} · {selectedSlot.label}
          </button>

          {getNextOccurrences(selectedSlot.day_of_week, 4).map((date) => (
            <button
              key={date}
              className="flex w-full items-center justify-between rounded-lg bg-surface-container-lowest p-4 text-left capitalize shadow-sm transition-transform active:scale-[0.98] disabled:opacity-60"
              disabled={isSubmitting}
              onClick={() => onSelect(selectedSlot.id, date)}
              type="button"
            >
              <span className="text-sm font-semibold text-on-surface">{formatDateLabel(date)}</span>
              <MaterialIcon className="text-on-surface-variant" name="chevron_right" />
            </button>
          ))}
        </div>
      )}
    </Modal>
  )
}