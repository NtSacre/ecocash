import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from '@/components/Loader/Loader'
import { Modal } from '@/components/Modal/Modal'
import { Table, type TableColumn } from '@/components/Table/Table'
import { useAdminAgents } from '@/hooks/useAdminAgents'
import { useCreateAgent } from '@/hooks/useCreateAgent'
import { createAgentSchema, type CreateAgentFormValues } from '@/application/validators/adminAgentValidators'
import type { IUser } from '@/core/interfaces/IUser'

export default function AdminAgentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const agentsQuery = useAdminAgents()
  const createAgent = useCreateAgent()

  const form = useForm<CreateAgentFormValues>({ resolver: zodResolver(createAgentSchema) })

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await createAgent.mutateAsync({ ...values, email: values.email || undefined })
      form.reset()
      setIsModalOpen(false)
    } catch {
      // erreur affichée via createAgent.isError
    }
  })

  const columns: TableColumn<IUser>[] = [
    { header: 'Nom', render: (a) => a.name },
    { header: 'Téléphone', render: (a) => a.phone },
    { header: 'Email', render: (a) => a.email ?? '—' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-2xl font-bold text-on-surface">Agents</h1>
        <button
          className="rounded-lg bg-primary px-5 py-3 font-headline font-bold text-on-primary"
          onClick={() => setIsModalOpen(true)}
          type="button"
        >
          + Créer un agent
        </button>
      </div>

      {agentsQuery.isLoading && <Loader label="Chargement..." />}

      {agentsQuery.data && <Table columns={columns} data={agentsQuery.data} rowKey={(a) => a.id} />}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Créer un agent">
        <form className="space-y-4" onSubmit={onSubmit}>
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

          {createAgent.isError && (
            <p className="rounded-2xl bg-error-container px-4 py-3 text-sm text-on-error-container">
              Ce téléphone ou cet email est déjà utilisé.
            </p>
          )}

          <button
            className="w-full rounded-lg bg-primary py-3 font-headline font-bold text-on-primary disabled:opacity-60"
            disabled={createAgent.isPending}
            type="submit"
          >
            {createAgent.isPending ? 'Création...' : 'Créer'}
          </button>
        </form>
      </Modal>
    </div>
  )
}