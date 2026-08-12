import { useNavigate } from 'react-router-dom'
import { MaterialIcon } from '@/components/Loader/MaterialIcon/MaterialIcon'
import { TopBar } from '@/components/Loader/TopBar/TopBar'
import { SUPPORT_CONTACT } from '@/core/constants/appInfo'

const FAQ_ITEMS = [
  {
    question: 'Comment répondre à une annonce ?',
    answer: 'Ouvrez une annonce dans "Annonces", indiquez la quantité que vous pouvez fournir, puis choisissez un créneau de collecte.',
  },
  {
    question: 'Quand suis-je payé ?',
    answer: 'Le paiement Mobile Money est déclenché une fois que le partenaire valide la livraison de votre matière collectée.',
  },
  {
    question: "Puis-je changer le créneau choisi ?",
    answer: 'Contactez le support si vous devez modifier un créneau déjà confirmé.',
  },
]

export default function AppHelpPage() {
  const navigate = useNavigate()

  return (
    <div className="text-on-surface">
      <TopBar leftIcon="arrow_back" leftLabel="Retour" onLeftClick={() => navigate('/')} title="Aide" />

      <main className="mx-auto max-w-md space-y-6 px-6 pb-12 pt-24">
        <p className="rounded-lg bg-tertiary-container/20 px-4 py-3 text-xs text-on-surface-variant">
          Contenu provisoire — sera complété avec de vraies questions fréquentes.
        </p>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item) => (
            <div key={item.question} className="rounded-lg bg-surface-container-lowest p-4 shadow-sm">
              <p className="text-sm font-bold text-on-surface">{item.question}</p>
              <p className="mt-1 text-sm text-on-surface-variant">{item.answer}</p>
            </div>
          ))}
        </div>

        <a
          className="flex items-center justify-center gap-2 rounded-full bg-primary py-3 font-headline font-bold text-on-primary"
          href={`mailto:${SUPPORT_CONTACT.email}`}
        >
          <MaterialIcon name="mail" />
          Contacter le support
        </a>
      </main>
    </div>
  )
}