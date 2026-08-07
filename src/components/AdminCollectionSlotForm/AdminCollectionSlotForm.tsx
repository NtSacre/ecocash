import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Select } from '@/components/Select/Select'
import { DAY_OF_WEEK_LABELS } from '@/utils/weekday'
import { collectionSlotFormSchema, type CollectionSlotFormValues } from '@/application/validators/adminCollectionSlotValidators'
import type { ICollectionSlot } from '@/core/interfaces/ICollectionSlot'

interface AdminCollectionSlotFormProps {
  initialValues?: ICollectionSlot
  onSubmit: (values: CollectionSlotFormValues) => Promise<void>
  isSubmitting: boolean
}

const DAY_OPTIONS = Object.entries(DAY_OF_WEEK_LABELS).map(([value, label]) => ({ value: Number(value), label }))

export function AdminCollectionSlotForm({ initialValues, onSubmit, isSubmitting }: AdminCollectionSlotFormProps) {
  const form = useForm<CollectionSlotFormValues>({
    resolver: zodResolver(collectionSlotFormSchema),
    defaultValues: initialValues
      ? {
          label: initialValues.label,
          day_of_week: initialValues.day_of_week,
          start_time: initialValues.start_time.slice(0, 5),
          end_time: initialValues.end_time.slice(0, 5),
          zone: initialValues.zone ?? undefined,
          capacity: initialValues.capacity,
        }
      : { capacity: 10 },
  })

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
      <Select
        error={form.formState.errors.day_of_week?.message}
        label="Jour de la semaine"
        onChange={(v) => form.setValue('day_of_week', Number(v))}
        options={DAY_OPTIONS}
        placeholder="Choisir un jour"
        value={form.watch('day_of_week')}
      />

      <div>
        <label className="ml-1 text-xs font-bold uppercase tracking-widest text-zinc-400">Libellé de la période</label>
        <input
          className="mt-2 w-full rounded-lg bg-surface-container-high px-4 py-3 font-medium text-on-surface focus:ring-2 focus:ring-primary/40"
          placeholder="Ex: Matin, Après-midi, Soirée"
          type="text"
          {...form.register('label')}
        />
        {form.formState.errors.label && <p className="mt-1 text-xs text-error">{form.formState.errors.label.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="ml-1 text-xs font-bold uppercase tracking-widest text-zinc-400">Heure début</label>
          <input
            className="mt-2 w-full rounded-lg bg-surface-container-high px-3 py-3 font-medium text-on-surface focus:ring-2 focus:ring-primary/40"
            type="time"
            {...form.register('start_time')}
          />
        </div>
        <div>
          <label className="ml-1 text-xs font-bold uppercase tracking-widest text-zinc-400">Heure fin</label>
          <input
            className="mt-2 w-full rounded-lg bg-surface-container-high px-3 py-3 font-medium text-on-surface focus:ring-2 focus:ring-primary/40"
            type="time"
            {...form.register('end_time')}
          />
          {form.formState.errors.end_time && <p className="mt-1 text-xs text-error">{form.formState.errors.end_time.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="ml-1 text-xs font-bold uppercase tracking-widest text-zinc-400">Zone (optionnel)</label>
          <input
            className="mt-2 w-full rounded-lg bg-surface-container-high px-3 py-3 font-medium text-on-surface focus:ring-2 focus:ring-primary/40"
            placeholder="Ex: Dakar Plateau"
            type="text"
            {...form.register('zone')}
          />
        </div>
        <div>
          <label className="ml-1 text-xs font-bold uppercase tracking-widest text-zinc-400">Capacité</label>
          <input
            className="mt-2 w-full rounded-lg bg-surface-container-high px-3 py-3 font-medium text-on-surface focus:ring-2 focus:ring-primary/40"
            type="number"
            {...form.register('capacity', { valueAsNumber: true })}
          />
        </div>
      </div>

      <button
        className="w-full rounded-lg bg-primary py-3 font-headline font-bold text-on-primary disabled:opacity-60"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
      </button>
    </form>
  )
}