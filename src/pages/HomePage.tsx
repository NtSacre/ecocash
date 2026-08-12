import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { OnboardingCarousel } from '@/components/OnboardingCarousel/OnboardingCarousel'
import { Loader } from '@/components/Loader/Loader'
import { useAuthContext } from '@/context/AuthContext'
import { getHomeRouteForUser } from '@/utils/roleRedirect'
import { hasSeenOnboarding, markOnboardingSeen } from '@/utils/onboarding'

export default function HomePage() {
  const navigate = useNavigate()
  const { user, isAuthenticated, isLoading } = useAuthContext()
  const [showOnboarding, setShowOnboarding] = useState(false)

  useEffect(() => {
    if (isLoading) return

    if (isAuthenticated && user) {
      navigate(getHomeRouteForUser(user), { replace: true })
      return
    }

    if (hasSeenOnboarding()) {
      navigate('/login', { replace: true })
      return
    }

    setShowOnboarding(true)
  }, [isLoading, isAuthenticated, user, navigate])

  const handleFinish = () => {
    markOnboardingSeen()
    navigate('/register', { replace: true })
  }

  if (isLoading || !showOnboarding) {
    return <Loader label="Chargement..." />
  }

  return <OnboardingCarousel onFinish={handleFinish} />
}