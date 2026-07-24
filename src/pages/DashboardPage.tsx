import { Link } from 'react-router-dom'

export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="font-headline text-2xl font-bold">Tableau de bord</h1>
      <Link className="mt-4 inline-block font-semibold text-primary" to="/dashboard/annonces">
        Gérer les annonces →
      </Link>
    </div>
  )
}