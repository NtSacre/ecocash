import { useNavigate } from 'react-router-dom'
import { EmptyState } from '@/components/EmptyState/EmptyState'
import { TopBar } from '@/components/Loader/TopBar/TopBar'

export default function AppTermsPage() {
  const navigate = useNavigate()

  return (
    <div className="text-on-surface">
      <TopBar
        leftIcon="arrow_back"
        leftLabel="Retour"
        onLeftClick={() => navigate('/')}
        title="Conditions d'utilisation"
      />
      <main className="mx-auto max-w-screen-xl px-6 pt-24">
        <EmptyState
          description="Le texte des conditions d'utilisation arrive bientôt."
          icon="description"
          title="En cours de préparation"
        />
      </main>
    </div>
  )
}
