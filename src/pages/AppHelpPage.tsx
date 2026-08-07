import { useNavigate } from 'react-router-dom'
import { EmptyState } from '@/components/EmptyState/EmptyState'
import { TopBar } from '@/components/Loader/TopBar/TopBar'

export default function AppHelpPage() {
  const navigate = useNavigate()

  return (
    <div className="text-on-surface">
      <TopBar
        leftIcon="arrow_back"
        leftLabel="Retour"
        onLeftClick={() => navigate('/')}
        title="Aide"
      />
      <main className="mx-auto max-w-screen-xl px-6 pt-24">
        <EmptyState
          description="Le centre d'aide arrive bientôt."
          icon="help_outline"
          title="En cours de préparation"
        />
      </main>
    </div>
  )
}
