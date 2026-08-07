import { useState } from 'react'
import { Badge } from '@/components/Badge/Badge'
import { Loader } from '@/components/Loader/Loader'
import { Modal } from '@/components/Modal/Modal'
import { Table, type TableColumn } from '@/components/Table/Table'
import { AdminCollectionSlotForm } from '@/components/AdminCollectionSlotForm/AdminCollectionSlotForm'
import { useAdminCollectionSlots } from '@/hooks/useAdminCollectionSlots'
import { useAdminCollectionSlotMutations } from '@/hooks/useAdminCollectionSlotMutations'
import type { ICollectionSlot } from '@/core/interfaces/ICollectionSlot'
import type { CollectionSlotFormValues } from '@/application/validators/adminCollectionSlotValidators'
import { DAY_OF_WEEK_LABELS } from '@/utils/weekday'

export default function AdminCollectionSlotsPage() {
  const [formModal, setFormModal] = useState<'create' | ICollectionSlot | null>(null)

  const slotsQuery = useAdminCollectionSlots()
  const { create, update, remove } = useAdminCollectionSlotMutations()

  const handleSubmit = async (values: CollectionSlotFormValues) => {
    if (formModal === 'create') {
      await create.mutateAsync(values)
    } else if (formModal) {
      await update.mutateAsync({ id: formModal.id, payload: values })
    }
    setFormModal(null)
  }

  const columns: TableColumn<ICollectionSlot>[] = [
    { header: 'Libellé', render: (s) => s.label },
    { header: 'Jour', render: (s) => DAY_OF_WEEK_LABELS[s.day_of_week] },
    { header: 'Horaire', render: (s) => `${s.start_time.slice(0, 5)} - ${s.end_time.slice(0, 5)}` },
    { header: 'Zone', render: (s) => s.zone ?? '—' },
    { header: 'Capacité', render: (s) => s.capacity },
    {
      header: 'Statut',
      render: (s) => <Badge label={s.is_available ? 'Disponible' : 'Fermé'} tone={s.is_available ? 'primary' : 'neutral'} />,
    },
    {
      header: 'Actions',
      render: (s) => (
        <div className="flex gap-2">
          <button className="font-semibold text-primary" onClick={() => setFormModal(s)} type="button">
            Éditer
          </button>
          <button
            className="font-semibold text-on-surface-variant"
            disabled={update.isPending}
            onClick={() => update.mutate({ id: s.id, payload: { is_available: !s.is_available } })}
            type="button"
          >
            {s.is_available ? 'Fermer' : 'Réouvrir'}
          </button>
          <button
            className="font-semibold text-error"
            disabled={remove.isPending}
            onClick={() => {
              if (confirm('Supprimer ce créneau ?')) remove.mutate(s.id)
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
        <h1 className="font-headline text-2xl font-bold text-on-surface">Créneaux de collecte</h1>
        <button
          className="rounded-lg bg-primary px-5 py-3 font-headline font-bold text-on-primary"
          onClick={() => setFormModal('create')}
          type="button"
        >
          + Créer un créneau
        </button>
      </div>

      {slotsQuery.isLoading && <Loader label="Chargement..." />}

      {slotsQuery.data && <Table columns={columns} data={slotsQuery.data} rowKey={(s) => s.id} />}

      <Modal isOpen={formModal !== null} onClose={() => setFormModal(null)} title={formModal === 'create' ? 'Créer un créneau' : 'Éditer le créneau'}>
        <AdminCollectionSlotForm
          initialValues={formModal !== 'create' ? (formModal ?? undefined) : undefined}
          isSubmitting={create.isPending || update.isPending}
          onSubmit={handleSubmit}
        />
      </Modal>
    </div>
  )
}