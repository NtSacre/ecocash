import { useNavigate } from 'react-router-dom'
import { TopBar } from '@/components/Loader/TopBar/TopBar'

export default function AppTermsPage() {
  const navigate = useNavigate()

  return (
    <div className="text-on-surface">
      <TopBar leftIcon="arrow_back" leftLabel="Retour" onLeftClick={() => navigate('/')} title="Conditions d'utilisation" />

      <main className="mx-auto max-w-md space-y-4 px-6 pb-12 pt-24">
        <p className="rounded-lg bg-error-container/60 px-4 py-3 text-xs text-on-error-container">
          ⚠️ Texte provisoire à usage de développement uniquement — ne constitue pas des conditions
          d'utilisation valides juridiquement. À remplacer par un texte rédigé par un juriste avant mise
          en production.
        </p>

        <div className="space-y-3 text-sm text-on-surface-variant">
          <p>
            En utilisant EcoCash, vous acceptez que la plateforme mette en relation particuliers et
            partenaires pour la collecte de matières recyclables, moyennant une commission prélevée sur
            chaque transaction réussie.
          </p>
          <p>
            Les paiements sont effectués par Mobile Money après validation de la livraison par le
            partenaire. EcoCash ne garantit pas les délais de paiement au-delà de ce processus.
          </p>
          <p>
            Les utilisateurs s'engagent à fournir des informations exactes lors de leur inscription et à
            respecter les rendez-vous de collecte convenus.
          </p>
        </div>
      </main>
    </div>
  )
}