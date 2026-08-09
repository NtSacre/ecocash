import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Select } from '@/components/Select/Select'
import { FileUpload } from '@/components/FileUpload/FileUpload'
import { useMaterials } from '@/hooks/useMaterials'
import { useImageUpload } from '@/hooks/useMediaUpload'
import { partnerListingFormSchema, type PartnerListingFormValues } from '@/application/validators/partnerListingValidators'

interface PartnerListingFormProps {
  onSubmit: (values: PartnerListingFormValues & { image_path?: string }) => Promise<void>
  isSubmitting: boolean
  initialValues?: Partial<PartnerListingFormValues> & { image_path?: string }
  submitLabel?: string
}

export function PartnerListingForm({
  onSubmit,
  isSubmitting,
  initialValues,
  submitLabel = "Publier l'annonce",
}: PartnerListingFormProps) {
  const form = useForm<PartnerListingFormValues>({
    resolver: zodResolver(partnerListingFormSchema),
    defaultValues: initialValues,
  })

  const materialsQuery = useMaterials()
  const imageUpload = useImageUpload()
  const [imagePath, setImagePath] = useState<string | null>(initialValues?.image_path ?? null)

  useEffect(() => {
    if (initialValues) {
      form.reset(initialValues)
      setImagePath(initialValues.image_path ?? null)
    }
  }, [initialValues, form])

  const handleSubmit = form.handleSubmit((values) => onSubmit({ ...values, image_path: imagePath ?? undefined }))

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <Select
        error={form.formState.errors.material_id?.message}
        label="Matière"
        onChange={(v) => form.setValue('material_id', Number(v))}
        options={(materialsQuery.data ?? []).map((m) => ({ value: m.id, label: `${m.name} (${m.unit})` }))}
        placeholder="Choisir une matière"
        value={form.watch('material_id')}
      />

      <div>
        <label className="ml-1 text-xs font-bold uppercase tracking-widest text-zinc-400">Titre</label>
        <input
          className="mt-2 w-full rounded-lg bg-surface-container-high px-4 py-3 font-medium text-on-surface focus:ring-2 focus:ring-primary/40"
          type="text"
          {...form.register('title')}
        />
        {form.formState.errors.title && <p className="mt-1 text-xs text-error">{form.formState.errors.title.message}</p>}
      </div>

      <div>
        <label className="ml-1 text-xs font-bold uppercase tracking-widest text-zinc-400">Description</label>
        <textarea
          className="mt-2 w-full rounded-lg bg-surface-container-high px-4 py-3 font-medium text-on-surface focus:ring-2 focus:ring-primary/40"
          rows={2}
          {...form.register('description')}
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="ml-1 text-xs font-bold uppercase tracking-widest text-zinc-400">Qté cible</label>
          <input
            className="mt-2 w-full rounded-lg bg-surface-container-high px-3 py-3 font-medium text-on-surface focus:ring-2 focus:ring-primary/40"
            step="0.01"
            type="number"
            {...form.register('target_quantity', { valueAsNumber: true })}
          />
        </div>
        <div>
          <label className="ml-1 text-xs font-bold uppercase tracking-widest text-zinc-400">Prix/unité</label>
          <input
            className="mt-2 w-full rounded-lg bg-surface-container-high px-3 py-3 font-medium text-on-surface focus:ring-2 focus:ring-primary/40"
            step="0.01"
            type="number"
            {...form.register('unit_price', { valueAsNumber: true })}
          />
        </div>
        <div>
          <label className="ml-1 text-xs font-bold uppercase tracking-widest text-zinc-400">Qté min</label>
          <input
            className="mt-2 w-full rounded-lg bg-surface-container-high px-3 py-3 font-medium text-on-surface focus:ring-2 focus:ring-primary/40"
            step="0.01"
            type="number"
            {...form.register('min_quantity_per_response', { valueAsNumber: true })}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="ml-1 text-xs font-bold uppercase tracking-widest text-zinc-400">Date début</label>
          <input
            className="mt-2 w-full rounded-lg bg-surface-container-high px-3 py-3 font-medium text-on-surface focus:ring-2 focus:ring-primary/40"
            type="date"
            {...form.register('start_date')}
          />
        </div>
        <div>
          <label className="ml-1 text-xs font-bold uppercase tracking-widest text-zinc-400">Date fin</label>
          <input
            className="mt-2 w-full rounded-lg bg-surface-container-high px-3 py-3 font-medium text-on-surface focus:ring-2 focus:ring-primary/40"
            type="date"
            {...form.register('end_date')}
          />
          {form.formState.errors.end_date && <p className="mt-1 text-xs text-error">{form.formState.errors.end_date.message}</p>}
        </div>
      </div>

      <FileUpload
        accept="image/jpeg,image/png,image/webp"
        isUploading={imageUpload.isPending}
        kind="image"
        label="Photo de l'annonce (optionnel)"
        onRemove={() => setImagePath(null)}
        onUpload={(file) => imageUpload.mutate(file, { onSuccess: setImagePath })}
        value={imagePath}
      />

      <button
        className="w-full rounded-lg bg-primary py-3 font-headline font-bold text-on-primary disabled:opacity-60"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? 'Enregistrement...' : submitLabel}
      </button>
    </form>
  )
}