import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Badge } from '@/components/Badge/Badge'
import { Loader } from '@/components/Loader/Loader'
import { Modal } from '@/components/Modal/Modal'
import { Table, type TableColumn } from '@/components/Table/Table'
import { useAdminPartners } from '@/hooks/useAdminPartners'
import { useApprovePartner } from '@/hooks/useApprovePartner'
import { useCreatePartner } from '@/hooks/useCreatePartner'
import { createPartnerSchema, type CreatePartnerFormValues } from '@/application/validators/adminPartnerValidators'
import type { IUser } from '@/core/interfaces/IUser'

export default function AdminPartnersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const partnersQuery = useAdminPartners()
  const approve = useApprovePartner()
  const createPartner = useCreatePartner()

  const form = useForm<CreatePartnerFormValues>({ resolver: zodResolver(createPartnerSchema) })

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await createPartner.mutateAsync({ ...values, email: values.email || undefined })
      form.reset()
      setIsModalOpen(false)
    } catch {
      // erreur affichée via createPartner.isError
    }
  })

  const columns: TableColumn<IUser>[] = [
    { header: 'Nom', render: (p) => p.name },
    { header: 'Société', render: (p) => p.partner_profile?.company_name ?? '—' },
    { header: 'Téléphone', render: (p) => p.phone },
    { header: 'Email', render: (p) => p.email ?? '—' },
    {
      header: 'Statut',
      render: (p) => (
        <Badge label={p.status === 'active' ? 'Actif' : p.status} tone={p.status === 'active' ? 'primary' : 'warning'} />
      ),
    },
    {
      header: 'Actions',
      render: (p) =>
        p.status === 'pending' ? (
          <button
            className="font-semibold text-primary disabled:opacity-60"
            disabled={approve.isPending}
            onClick={() => approve.mutate(p.id)}
            type="button"
          >
            Approuver
          </button>
        ) : (
          <span className="text-on-surface-variant">—</span>
        ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-2xl font-bold text-on-surface">Partenaires</h1>
        <button
          className="rounded-lg bg-primary px-5 py-3 font-headline font-bold text-on-primary"
          onClick={() => setIsModalOpen(true)}
          type="button"
        >
          + Créer un partenaire
        </button>
      </div>

      {partnersQuery.isLoading && <Loader label="Chargement..." />}

      {partnersQuery.data && <Table columns={columns} data={partnersQuery.data} rowKey={(p) => p.id} />}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Créer un partenaire">
        <form className="space-y-4" onSubmit={onSubmit}>
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

          {createPartner.isError && (
            <p className="rounded-2xl bg-error-container px-4 py-3 text-sm text-on-error-container">
              Ce téléphone ou cet email est déjà utilisé.
            </p>
          )}

          <button
            className="w-full rounded-lg bg-primary py-3 font-headline font-bold text-on-primary disabled:opacity-60"
            disabled={createPartner.isPending}
            type="submit"
          >
            {createPartner.isPending ? 'Création...' : 'Créer'}
          </button>
        </form>
      </Modal>
    </div>
  )
}