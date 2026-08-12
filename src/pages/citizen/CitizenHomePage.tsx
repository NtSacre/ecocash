import { useNavigate } from 'react-router-dom'

import { useAuthContext } from '@/context/AuthContext'
import { avatars, homeActivities } from '@/shared/config/mockContent'
import { TopBar } from '@/components/Loader/TopBar/TopBar'
import { MaterialIcon } from '@/components/Loader/MaterialIcon/MaterialIcon'

export default function CitizenHomePage() {
  const navigate = useNavigate()
  const { user } = useAuthContext()

  return (
    <div className="text-on-surface">
      <TopBar  title="EcoCash Senegal" />

      <main className="mx-auto flex w-full max-w-screen-xl flex-col gap-8 px-6 pt-24">
        <section className="space-y-1 pt-2">
          <h2 className="font-headline text-3xl font-extrabold tracking-tight text-primary">
            Bonjour {user?.name ?? ''}
          </h2>
          <p className="font-medium text-on-surface-variant">
            Prêt à recycler aujourd&apos;hui ?
          </p>
        </section>

        <section>
          <div className="group flex items-center rounded-full bg-surface-container-high px-6 py-4 shadow-sm transition-all duration-300 focus-within:bg-surface-container-lowest">
            <MaterialIcon className="mr-3 text-on-surface-variant" name="search" />
            <input
              className="w-full border-none bg-transparent font-medium text-on-surface placeholder:text-on-surface-variant/60 focus:ring-0"
              placeholder="Rechercher des centres de collecte..."
              type="text"
            />
            <button
              className="rounded-full p-2 transition-colors hover:bg-surface-container-highest"
              type="button"
            >
              <MaterialIcon className="text-primary" name="mic" />
            </button>
          </div>
        </section>

        <section className="flex justify-center py-2">
          <button
            className="action-gradient flex w-full items-center justify-center gap-4 rounded-full py-6 shadow-xl transition-transform duration-200 active:scale-95"
            onClick={() => navigate('/app/annonces')}
            type="button"
          >
            <MaterialIcon className="text-3xl text-white" name="add_circle" />
            <span className="font-headline text-2xl font-extrabold tracking-tight text-white">
              Vendre
            </span>
          </button>
        </section>

        <section className="space-y-4 pb-8">
          <div className="flex items-center justify-between">
            <h4 className="font-headline text-xl font-bold text-on-surface">
              Activités récentes
            </h4>
            <button className="text-sm font-semibold text-primary" type="button">
              Voir tout
            </button>
          </div>
          <div className="space-y-3">
            {homeActivities.map((activity) => (
              <article
                key={activity.id}
                className="flex items-center justify-between rounded-lg border border-outline-variant/10 bg-surface-container-lowest p-5 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full ${activity.iconClass}`}
                  >
                    <MaterialIcon name={activity.icon} />
                  </div>
                  <div>
                    <p className="font-bold text-on-surface">{activity.title}</p>
                    <p className="text-xs font-medium text-on-surface-variant">{activity.meta}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-headline text-lg font-extrabold text-primary">
                    {activity.amount}
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-green-600">
                    {activity.status}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}