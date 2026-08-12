import { useState } from 'react'

import { OnboardingCarousel } from '@/components/OnboardingCarousel/OnboardingCarousel'
import { useAuthContext } from '@/context/AuthContext'
import { UserRole } from '@/core/enums/UserRole'
import { getPrimaryRole } from '@/utils/primaryRole'
import { hasSeenOnboarding, markOnboardingSeen } from '@/utils/onboarding'

import CitizenHomePage from '@/pages/citizen/CitizenHomePage'
import PartnerHomePage from '@/pages/partner/PartnerHomePage'
import AgentHomePage from '@/pages/agent/AgentHomePage'

export default function AppHomePage() {
  const { user } = useAuthContext()

  const [showOnboarding, setShowOnboarding] = useState(
    () => !hasSeenOnboarding()
  )

  const role = user ? getPrimaryRole(user) : null

  const handleFinishOnboarding = () => {
    markOnboardingSeen()
    setShowOnboarding(false)
  }

  if (showOnboarding) {
    return (
      <OnboardingCarousel
        onFinish={handleFinishOnboarding}
      />
    )
  }

  if (role === UserRole.Partner) {
    return <PartnerHomePage />
  }

  if (role === UserRole.Agent) {
    return <AgentHomePage />
  }

  return <CitizenHomePage />
}