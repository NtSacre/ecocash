export interface OnboardingSlide {
  icon: string
  title: string
  description: string
}

export const ONBOARDING_SLIDES: OnboardingSlide[] = [
  {
    icon: 'recycling',
    title: 'Recyclez, gagnez de l\'argent',
    description:
      "Vendez vos matières recyclables aux partenaires près de chez vous et soyez payé directement par Mobile Money.",
  },
  {
    icon: 'campaign',
    title: 'Trouvez des annonces autour de vous',
    description:
      "Consultez les annonces des partenaires, proposez votre quantité, et choisissez un créneau qui vous arrange.",
  },
  {
    icon: 'local_shipping',
    title: 'Collecte organisée, suivi en temps réel',
    description:
      "Un agent EcoCash passe récupérer votre matière au jour choisi. Suivez chaque étape depuis l'application.",
  },
  {
    icon: 'handshake',
    title: 'Particuliers, partenaires, agents',
    description:
      "Ensemble, pour valoriser les matières recyclables et construire un Sénégal plus propre.",
  },
]