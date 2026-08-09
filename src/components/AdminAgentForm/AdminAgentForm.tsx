import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Select } from '@/components/Select/Select'
import { createAgentSchema, type CreateAgentFormValues } from '@/application/validators/adminAgentValidators'
import type { IUser } from '@/core/interfaces/IUser'

interface AdminAgentFormProps {
  initialValues?: IUser
  onSubmit: (values: CreateAgentFormValues) => Promise<void>
  isSubmitting: boolean
}

const STATUS_OPTIONS = [
  { value: 'active', label: 'Actif' },
  { value: 'suspended', label: 'Suspendu' },
]

export function AdminAgentForm({ initialValues, onSubmit, isSubmitting }: AdminAgentFormProps) {
  const form = useForm<CreateAgentFormValues>({
    resolver: zodResolver(createAgentSchema),
    defaultValues: initialValues
      ? {
          name: initialValues.name,
          email: initialValues.email ?? undefined,
          phone: initialValues.phone,
          coverage_zone: initialValues.coverage_zone ?? undefined,
        }
      : undefined,
  })

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
      <div>
        <label className="ml-1 text-xs font-bold uppercase tracking-widest text-zinc-400">Nom complet</label>
        <input
          className="mt-2 w-full rounded-lg bg-surface-container-high px-4 py-3 font-medium text-on-surface focus:ring-2 focus:ring-primary/40"
          type="text"
          {...form.register('name')}
        />
        {form.formState.errors.name && <p className="mt-1 text-xs text-error">{form.formState.errors.name.message}</p>}
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
        <label className="ml-1 text-xs font-bold uppercase tracking-widest text-zinc-400">Zone de couverture (optionnel)</label>
        <input
          className="mt-2 w-full rounded-lg bg-surface-container-high px-4 py-3 font-medium text-on-surface focus:ring-2 focus:ring-primary/40"
          placeholder="Ex: Dakar Plateau"
          type="text"
          {...form.register('coverage_zone')}
        />
      </div>

      {initialValues && (
        <Select
          label="Statut"
          onChange={(v) => form.setValue('status', v as CreateAgentFormValues['status'])}
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