import { useNavigate } from 'react-router-dom'
import { MaterialIcon } from '@/components/Loader/MaterialIcon/MaterialIcon'
import { TopBar } from '@/components/Loader/TopBar/TopBar'
import { APP_VERSION } from '@/core/constants/appInfo'

export default function AppAboutPage() {
  const navigate = useNavigate()

  return (
    <div className="text-on-surface">
      <TopBar leftIcon="arrow_back" leftLabel="Retour" onLeftClick={() => navigate('/')} title="À propos" />

      <main className="mx-auto max-w-md space-y-6 px-6 pb-12 pt-24 text-center">
        <MaterialIcon className="text-5xl text-primary" name="eco" />
        <h2 className="font-headline text-xl font-bold text-on-surface">EcoCash Sénégal</h2>

        <p className="rounded-lg bg-tertiary-container/20 px-4 py-3 text-xs text-on-surface-variant">
          Texte provisoire — à remplacer par une présentation officielle d'EcoCash.
        </p>

        <p className="text-sm text-on-surface-variant">
          EcoCash connecte particuliers, partenaires et agents de collecte pour valoriser les matières
          recyclables au Sénégal — informer, faciliter la vente, et organiser la collecte de bout en bout.
        </p>

        <p className="text-xs text-on-surface-variant">Version {APP_VERSION}</p>
      </main>
    </div>
  )
}