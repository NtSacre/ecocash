import { useState } from 'react'
import { Badge } from '@/components/Badge/Badge'
import { Loader } from '@/components/Loader/Loader'
import { Modal } from '@/components/Modal/Modal'
import { Table, type TableColumn } from '@/components/Table/Table'
import { AdminListingForm } from '@/components/AdminListingForm/AdminListingForm'
import { useAdminListings } from '@/hooks/useAdminListings'
import { useAdminListingMutations } from '@/hooks/useAdminListingMutations'
import { formatCurrency } from '@/utils/currency'
import type { IListing, ListingStatus } from '@/core/interfaces/IListing'
import type { AdminListingFormValues } from '@/application/validators/adminListingValidators'

const STATUS_TONE: Record<ListingStatus, 'primary' | 'neutral' | 'warning'> = {
  active: 'primary',
  suspended: 'warning',
  closed: 'neutral',
}

const STATUS_LABEL: Record<ListingStatus, string> = {
  active: 'Active',
  suspended: 'Suspendue',
  closed: 'Terminée',
}

export default function AdminListingsPage() {
  const [statusFilter, setStatusFilter] = useState<ListingStatus | undefined>(undefined)
  const [formModal, setFormModal] = useState<'create' | IListing | null>(null)

  const listingsQuery = useAdminListings(statusFilter ? { status: statusFilter } : {})
  const { create, update, remove, suspend, renew } = useAdminListingMutations()

const handleSubmit = async (values: AdminListingFormValues & { image_path?: string }) => {
  if (formModal === 'create') {
    await create.mutateAsync(values)
  } else if (formModal) {
    await update.mutateAsync({ id: formModal.id, payload: values })
  }
  setFormModal(null)
}

  const columns: TableColumn<IListing>[] = [
    { header: 'Titre', render: (l) => l.title },
    { header: 'Partenaire', render: (l) => l.partner.partner_profile?.company_name ?? l.partner.name },
    { header: 'Matière', render: (l) => l.material.name },
    { header: 'Prix', render: (l) => formatCurrency(l.unit_price) },
    { header: 'Statut', render: (l) => <Badge label={STATUS_LABEL[l.status]} tone={STATUS_TONE[l.status]} /> },
    {
      header: 'Actions',
      render: (l) => (
        <div className="flex gap-2">
          <button className="font-semibold text-primary" onClick={() => setFormModal(l)} type="button">
            Éditer
          </button>
          {l.status === 'active' && (
            <button
              className="font-semibold text-error"
              disabled={suspend.isPending}
              onClick={() => suspend.mutate(l.id)}
              type="button"
            >
              Suspendre
            </button>
          )}
          {l.status === 'suspended' && (
            <button
              className="font-semibold text-primary"
              disabled={renew.isPending}
              onClick={() => renew.mutate({ id: l.id, payload: {} })}
              type="button"
            >
              Renouveler
            </button>
          )}
          <button
            className="font-semibold text-on-surface-variant"
            disabled={remove.isPending}
            onClick={() => {
              if (confirm('Supprimer définitivement cette annonce ?')) remove.mutate(l.id)
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
        <h1 className="font-headline text-2xl font-bold text-on-surface">Annonces</h1>
        <button
          className="rounded-lg bg-primary px-5 py-3 font-headline font-bold text-on-primary"
          onClick={() => setFormModal('create')}
          type="button"
        >
          + Créer une annonce
        </button>
      </div>

      <div className="flex gap-2">
        {(['active', 'suspended', 'closed'] as ListingStatus[]).map((status) => (
          <button
            key={status}
            className={`rounded-full px-4 py-2 text-sm font-bold ${statusFilter === status ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface-variant'}`}
            onClick={() => setStatusFilter(statusFilter === status ? undefined : status)}
            type="button"
          >
            {STATUS_LABEL[status]}
          </button>
        ))}
      </div>

      {listingsQuery.isLoading && <Loader label="Chargement..." />}

      {listingsQuery.data && (
        <Table columns={columns} data={listingsQuery.data.data} rowKey={(l) => l.id} />
      )}

      <Modal isOpen={formModal !== null} onClose={() => setFormModal(null)} title={formModal === 'create' ? 'Créer une annonce' : 'Éditer l\'annonce'}>
        <AdminListingForm
          initialValues={formModal !== 'create' ? (formModal ?? undefined) : undefined}
          isSubmitting={create.isPending || update.isPending}
          onSubmit={handleSubmit}
        />
      </Modal>
    </div>
  )
}