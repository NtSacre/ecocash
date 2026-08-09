import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Select } from '@/components/Select/Select'
import { createPartnerSchema, type CreatePartnerFormValues } from '@/application/validators/adminPartnerValidators'
import type { IUser } from '@/core/interfaces/IUser'

interface AdminPartnerFormProps {
  initialValues?: IUser
  onSubmit: (values: CreatePartnerFormValues) => Promise<void>
  isSubmitting: boolean
}

const STATUS_OPTIONS = [
  { value: 'active', label: 'Actif' },
  { value: 'pending', label: 'En attente' },
  { value: 'suspended', label: 'Suspendu' },
]

export function AdminPartnerForm({ initialValues, onSubmit, isSubmitting }: AdminPartnerFormProps) {
  const form = useForm<CreatePartnerFormValues>({
    resolver: zodResolver(createPartnerSchema),
    defaultValues: initialValues
      ? {
          name: initialValues.name,
          email: initialValues.email ?? undefined,
          phone: initialValues.phone,
          company_name: initialValues.partner_profile?.company_name ?? '',
          description: initialValues.partner_profile?.description ?? undefined,
          address: initialValues.partner_profile?.address ?? undefined,
        }
      : undefined,
  })

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
      <div>
        <label className="ml-1 text-xs font-bold uppercase tracking-widest text-zinc-400">Nom du contact</label>
        <input
          className="mt-2 w-full rounded-lg bg-surface-container-high px-4 py-3 font-medium text-on-surface focus:ring-2 focus:ring-primary/40"
          type="text"
          {...form.register('name')}
        />
        {form.formState.errors.name && <p className="mt-1 text-xs text-error">{form.formState.errors.name.message}</p>}
      </div>

      <div>
        <label className="ml-1 text-xs font-bold uppercase tracking-widest text-zinc-400">Nom de la société</label>
        <input
          className="mt-2 w-full rounded-lg bg-surface-container-high px-4 py-3 font-medium text-on-surface focus:ring-2 focus:ring-primary/40"
          type="text"
          {...form.register('company_name')}
        />
        {form.formState.errors.company_name && (
          <p className="mt-1 text-xs text-error">{form.formState.errors.company_name.message}</p>
        )}
      </div>

      <div>
        <label className="ml-1 text-xs font-bold uppercase tracking-widest text-zinc-400">Téléphone</label>
        <input
          className="mt-2 w-full rounded-lg bg-surface-container-high px-4 py-3 font-medium text-on-surface focus:ring-2 focus:ring-primary/40"
          placeholder="+221770000000"
          type="tel"
          {...form.register('phone')}
        />
        {form.formState.errors.phone && <p className="mt-1 text-xs text-error">{form.formState.errors.phone.message}</p>}
      </div>

      <div>
        <label className="ml-1 text-xs font-bold uppercase tracking-widest text-zinc-400">Email (optionnel)</label>
        <input
          className="mt-2 w-full rounded-lg bg-surface-container-high px-4 py-3 font-medium text-on-surface focus:ring-2 focus:ring-primary/40"
          type="email"
          {...form.register('email')}
        />
      </div>

      <div>
        <label className="ml-1 text-xs font-bold uppercase tracking-widest text-zinc-400">Adresse (optionnel)</label>
        <input
          className="mt-2 w-full rounded-lg bg-surface-container-high px-4 py-3 font-medium text-on-surface focus:ring-2 focus:ring-primary/40"
          type="text"
          {...form.register('address')}
        />
      </div>

      {initialValues && (
        <Select
          label="Statut"
          onChange={(v) => form.setValue('status', v as CreatePartnerFormValues['status'])}
          options={STATUS_OPTIONS}
          value={form.watch('status') ?? initialValues.status}
        />
      )}

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