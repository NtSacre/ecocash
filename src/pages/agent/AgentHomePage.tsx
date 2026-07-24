import { TopBar } from '@/components/Loader/TopBar/TopBar'
import { useAuthContext } from '@/context/AuthContext'

export default function AgentHomePage() {
  const { user } = useAuthContext()

  return (
    <div className="text-on-surface">
      <TopBar title="EcoCash Agent" />
      <main className="mx-auto max-w-screen-xl px-6 pt-24">
        <h2 className="font-headline text-3xl font-extrabold tracking-tight text-primary">
          Bonjour {user?.name ?? ''}
        </h2>
        <p className="mt-1 font-medium text-on-surface-variant">
          Vos collectes du jour s&apos;afficheront ici.
        </p>
      </main>
    </div>
  )
}