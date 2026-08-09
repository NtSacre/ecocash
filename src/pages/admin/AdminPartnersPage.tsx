import { useState } from 'react'
import { Badge } from '@/components/Badge/Badge'
import { Loader } from '@/components/Loader/Loader'
import { Modal } from '@/components/Modal/Modal'
import { Table, type TableColumn } from '@/components/Table/Table'
import { AdminPartnerForm } from '@/components/AdminPartnerForm/AdminPartnerForm'
import { useAdminPartners } from '@/hooks/useAdminPartners'
import { useApprovePartner } from '@/hooks/useApprovePartner'
import { useAdminPartnerMutations } from '@/hooks/useAdminPartnerMutations'
import type { IUser } from '@/core/interfaces/IUser'
import type { CreatePartnerFormValues } from '@/application/validators/adminPartnerValidators'

export default function AdminPartnersPage() {
  const [formModal, setFormModal] = useState<'create' | IUser | null>(null)

  const partnersQuery = useAdminPartners()
  const approve = useApprovePartner()
  const { create, update, remove } = useAdminPartnerMutations()

  const handleSubmit = async (values: CreatePartnerFormValues) => {
    if (formModal === 'create') {
      await create.mutateAsync(values)
    } else if (formModal) {
      await update.mutateAsync({ id: formModal.id, payload: values })
    }
    setFormModal(null)
  }

  const columns: TableColumn<IUser>[] = [
    { header: 'Nom', render: (p) => p.name },
    { header: 'Société', render: (p) => p.partner_profile?.company_name ?? '—' },
    { header: 'Téléphone', render: (p) => p.phone },
    { header: 'Email', render: (p) => p.email ?? '—' },
    {
      header: 'Statut',
      render: (p) => (
        <Badge
          label={p.status === 'active' ? 'Actif' : p.status === 'pending' ? 'En attente' : 'Suspendu'}
          tone={p.status === 'active' ? 'primary' : 'warning'}
        />
      ),
    },
    {
      header: 'Actions',
      render: (p) => (
        <div className="flex gap-3">
          {p.status === 'pending' && (
            <button
              className="font-semibold text-primary disabled:opacity-60"
              disabled={approve.isPending}
              onClick={() => approve.mutate(p.id)}
              type="button"
            >
              Approuver
            </button>
          )}
          <button className="font-semibold text-primary" onClick={() => setFormModal(p)} type="button">
            Éditer
          </button>
          <button
            className="font-semibold text-error"
            disabled={remove.isPending}
            onClick={() => {
              if (confirm(`Supprimer ${p.name} ?`)) remove.mutate(p.id)
            }}
            type="button"
          >
            Supprimer
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-2xl font-bold text-on-surface">Partenaires</h1>
        <button
          className="rounded-lg bg-primary px-5 py-3 font-headline font-bold text-on-primary"
          onClick={() => setFormModal('create')}
          type="button"
        >
          + Créer un partenaire
        </button>
      </div>

      {partnersQuery.isLoading && <Loader label="Chargement..." />}

      {partnersQuery.data && <Table columns={columns} data={partnersQuery.data} rowKey={(p) => p.id} />}

      {remove.isError && (
        <p className="rounded-2xl bg-error-container px-4 py-3 text-sm text-on-error-container">
          Impossible de supprimer — ce partenaire a des annonces associées. Suspendez-le plutôt via "Éditer".
        </p>
      )}

      <Modal isOpen={formModal !== null} onClose={() => setFormModal(null)} title={formModal === 'create' ? 'Créer un partenaire' : 'Éditer le partenaire'}>
        {(create.isError || update.isError) && (
          <p className="mb-4 rounded-2xl bg-error-container px-4 py-3 text-sm text-on-error-container">
            Ce téléphone ou cet email est déjà utilisé.
          </p>
        )}
        <AdminPartnerForm
          initialValues={formModal !== 'create' ? (formModal ?? undefined) : undefined}
          isSubmitting={create.isPending || update.isPending}
          onSubmit={handleSubmit}
        />
      </Modal>
    </div>
  )
}