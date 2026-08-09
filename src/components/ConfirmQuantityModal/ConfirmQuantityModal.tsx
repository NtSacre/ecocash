import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Modal } from '@/components/Modal/Modal'
import { createConfirmQuantitySchema, type ConfirmQuantityFormValues } from '@/application/validators/agentCollectionValidators'

interface ConfirmQuantityModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (quantity: number) => Promise<void>
  isSubmitting: boolean
  offeredQuantity: number
  unit: string
}

export function ConfirmQuantityModal({
  isOpen,
  onClose,
  onConfirm,
  isSubmitting,
  offeredQuantity,
  unit,
}: ConfirmQuantityModalProps) {
  const form = useForm<ConfirmQuantityFormValues>({
    resolver: zodResolver(createConfirmQuantitySchema(offeredQuantity)),
    defaultValues: { quantity_collected: offeredQuantity },
  })

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await onConfirm(values.quantity_collected)
      form.reset()
    } catch {
      // erreur remontée par l'appelant
    }
  })

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirmer la quantité collectée">
      <form className="space-y-4" onSubmit={onSubmit}>
        <p className="text-sm text-on-surface-variant">
          Quantité proposée par le particulier : <strong>{offeredQuantity} {unit}</strong>
        </p>

        <div>
          <label className="ml-1 text-xs font-bold uppercase tracking-widest text-zinc-400">
            Quantité réellement collectée ({unit})
          </label>
          <input
            className="mt-2 w-full rounded-lg bg-surface-container-high px-4 py-3 text-center font-headline text-2xl font-extrabold text-on-surface focus:ring-2 focus:ring-primary/40"
            step="0.01"
            type="number"
            {...form.register('quantity_collected', { valueAsNumber: true })}
          />
          {form.formState.errors.quantity_collected && (
            <p className="mt-1 text-center text-xs text-error">{form.formState.errors.quantity_collected.message}</p>
          )}
        </div>

        <button
          className="w-full rounded-lg bg-primary py-3 font-headline font-bold text-on-primary disabled:opacity-60"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? 'Confirmation...' : 'Confirmer'}
        </button>
      </form>
    </Modal>
  )
}