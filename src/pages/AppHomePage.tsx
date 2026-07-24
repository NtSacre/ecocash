import { useAuthContext } from '@/context/AuthContext'
import { UserRole } from '@/core/enums/UserRole'
import { getPrimaryRole } from '@/utils/primaryRole'
import CitizenHomePage from '@/pages/citizen/CitizenHomePage'
import PartnerHomePage from '@/pages/partner/PartnerHomePage'
import AgentHomePage from '@/pages/agent/AgentHomePage'

export default function AppHomePage() {
  const { user } = useAuthContext()
  const role = user ? getPrimaryRole(user) : null

  if (role === UserRole.Partner) return <PartnerHomePage />
  if (role === UserRole.Agent) return <AgentHomePage />

  return <CitizenHomePage />
}