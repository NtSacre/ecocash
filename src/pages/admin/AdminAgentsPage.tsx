import { useState } from 'react'
import { Loader } from '@/components/Loader/Loader'
import { Modal } from '@/components/Modal/Modal'
import { Table, type TableColumn } from '@/components/Table/Table'
import { AdminAgentForm } from '@/components/AdminAgentForm/AdminAgentForm'
import { useAdminAgents } from '@/hooks/useAdminAgents'
import { useAdminAgentMutations } from '@/hooks/useAdminAgentMutations'
import type { IUser } from '@/core/interfaces/IUser'
import type { CreateAgentFormValues } from '@/application/validators/adminAgentValidators'

export default function AdminAgentsPage() {
  const [formModal, setFormModal] = useState<'create' | IUser | null>(null)

  const agentsQuery = useAdminAgents()
  const { create, update, remove } = useAdminAgentMutations()

  const handleSubmit = async (values: CreateAgentFormValues) => {
    if (formModal === 'create') {
      await create.mutateAsync(values)
    } else if (formModal) {
      await update.mutateAsync({ id: formModal.id, payload: values })
    }
    setFormModal(null)
  }

  const columns: TableColumn<IUser>[] = [
    { header: 'Nom', render: (a) => a.name },
    { header: 'Téléphone', render: (a) => a.phone },
    { header: 'Email', render: (a) => a.email ?? '—' },
    { header: 'Zone', render: (a) => a.coverage_zone ?? '—' },
    {
      header: 'Actions',
      render: (a) => (
        <div className="flex gap-3">
          <button className="font-semibold text-primary" onClick={() => setFormModal(a)} type="button">
            Éditer
          </button>
          <button
            className="font-semibold text-error"
            disabled={remove.isPending}
            onClick={() => {
              if (confirm(`Supprimer ${a.name} ?`)) remove.mutate(a.id)
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
        <h1 className="font-headline text-2xl font-bold text-on-surface">Agents</h1>
        <button
          className="rounded-lg bg-primary px-5 py-3 font-headline font-bold text-on-primary"
          onClick={() => setFormModal('create')}
          type="button"
        >
          + Créer un agent
        </button>
      </div>

      {agentsQuery.isLoading && <Loader label="Chargement..." />}

      {agentsQuery.data && <Table columns={columns} data={agentsQuery.data} rowKey={(a) => a.id} />}

      {remove.isError && (
        <p className="rounded-2xl bg-error-container px-4 py-3 text-sm text-on-error-container">
          Impossible de supprimer — cet agent a des collectes actives. Réassignez-les d'abord depuis Assignations.
        </p>
      )}

      <Modal isOpen={formModal !== null} onClose={() => setFormModal(null)} title={formModal === 'create' ? 'Créer un agent' : "Éditer l'agent"}>
        {(create.isError || update.isError) && (
          <p className="mb-4 rounded-2xl bg-error-container px-4 py-3 text-sm text-on-error-container">
            Ce téléphone ou cet email est déjà utilisé.
          </p>
        )}
        <AdminAgentForm
          initialValues={formModal !== 'create' ? (formModal ?? undefined) : undefined}
          isSubmitting={create.isPending || update.isPending}
          onSubmit={handleSubmit}
        />
      </Modal>
    </div>
  )
}