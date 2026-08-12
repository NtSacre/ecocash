import { useNavigate } from 'react-router-dom'
import { MaterialIcon } from '@/components/Loader/MaterialIcon/MaterialIcon'
import { TopBar } from '@/components/Loader/TopBar/TopBar'
import { useAuthContext } from '@/context/AuthContext'

export default function PartnerHomePage() {
  const navigate = useNavigate()
  const { user } = useAuthContext()

  return (
    <div className="text-on-surface">
      <TopBar title="EcoCash Partenaire" />

      <main className="mx-auto flex w-full max-w-screen-xl flex-col gap-8 px-6 pt-24">
        <section className="space-y-1 pt-2">
          <h2 className="font-headline text-3xl font-extrabold tracking-tight text-primary">
            Bonjour {user?.name ?? ''}
          </h2>
          <p className="font-medium text-on-surface-variant">
            {user?.status === 'pending'
              ? 'Votre compte est en attente de validation par EcoCash.'
              : 'Gérez vos annonces de collecte.'}
          </p>
        </section>

        {user?.status !== 'pending' && (
          <section className="flex justify-center py-2">
            <button
              className="action-gradient flex w-full items-center justify-center gap-4 rounded-full py-6 shadow-xl transition-transform duration-200 active:scale-95"
              onClick={() => navigate('/app/mes-annonces')}
              type="button"
            >
              <MaterialIcon className="text-3xl text-white" name="add_circle" />
              <span className="font-headline text-2xl font-extrabold tracking-tight text-white">
                Créer une annonce
              </span>
            </button>
          </section>
        )}

        <button
          className="flex items-center justify-between rounded-lg bg-secondary-container/40 p-5 text-left transition-transform active:scale-[0.98]"
          onClick={() => navigate('/app/annonces')}
          type="button"
        >
          <div>
            <p className="font-headline text-base font-bold text-on-secondary-container">Marché</p>
            <p className="text-xs text-on-secondary-container/80">Annonces des autres partenaires</p>
          </div>
          <span className="rounded-full bg-surface-container-lowest p-3 shadow-sm">
            <MaterialIcon className="text-primary" name="arrow_forward" />
          </span>
        </button>

        <button
          className="flex items-center justify-between rounded-lg bg-tertiary-container/20 p-5 text-left transition-transform active:scale-[0.98]"
          onClick={() => navigate('/app/mes-produits')}
          type="button"
        >
          <div>
            <p className="font-headline text-base font-bold text-on-surface">Mes produits</p>
            <p className="text-xs text-on-surface-variant">Produits recyclés à mettre en avant</p>
          </div>
          <span className="rounded-full bg-surface-container-lowest p-3 shadow-sm">
            <MaterialIcon className="text-primary" name="arrow_forward" />
          </span>
        </button>

        <button
          className="flex items-center justify-between rounded-lg bg-primary-container/10 p-5 text-left transition-transform active:scale-[0.98]"
          onClick={() => navigate('/app/mes-publications')}
          type="button"
        >
          <div>
            <p className="font-headline text-base font-bold text-on-surface">Mes publications</p>
            <p className="text-xs text-on-surface-variant">Contenus éducatifs sur le recyclage</p>
          </div>
          <span className="rounded-full bg-surface-container-lowest p-3 shadow-sm">
            <MaterialIcon className="text-primary" name="arrow_forward" />
          </span>
        </button>
      </main>
    </div>
  )
}