import { Link } from 'react-router-dom'

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="font-headline text-2xl font-bold text-on-surface">Accès refusé</h1>
      <p className="text-on-surface-variant">
        Vous n&apos;avez pas les droits nécessaires pour accéder à cette page.
      </p>
      <Link className="font-semibold text-primary" to="/">
        Retour à l&apos;accueil
      </Link>
    </div>
  )
}