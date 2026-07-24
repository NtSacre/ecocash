import { useNavigate } from 'react-router-dom'
import { EmptyState } from '@/components/EmptyState/EmptyState'
import { TopBar } from '@/components/Loader/TopBar/TopBar'

export default function PartnerListingsPage() {
  const navigate = useNavigate()

  return (
    <div className="text-on-surface">
      <TopBar leftIcon="arrow_back" leftLabel="Retour" onLeftClick={() => navigate('/app')} title="Mes annonces" />
      <main className="mx-auto max-w-screen-xl px-6 pt-24">
        <EmptyState
          description="La création et la gestion des annonces arrivent bientôt."
          icon="construction"
          title="En cours de construction"
        />
      </main>
    </div>
  )
}