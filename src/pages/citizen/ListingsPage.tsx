import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge } from '@/components/Badge/Badge'
import { Card } from '@/components/Card/Card'
import { EmptyState } from '@/components/EmptyState/EmptyState'
import { Loader } from '@/components/Loader/Loader'
import { MaterialIcon } from '@/components/Loader/MaterialIcon/MaterialIcon'
import { TopBar } from '@/components/Loader/TopBar/TopBar'
import { useAuthContext } from '@/context/AuthContext'
import { useActiveListings } from '@/hooks/useActiveListings'
import { useMyResponses } from '@/hooks/useMyResponses'
import { formatCurrency } from '@/utils/currency'
import { remainingQuantity } from '@/utils/quantity'

export default function ListingsPage() {
  const navigate = useNavigate()
  const { user } = useAuthContext()

  const listingsQuery = useActiveListings()
  const responsesQuery = useMyResponses(!!user)

  const respondedListingIds = useMemo(
    () => new Set((responsesQuery.data ?? []).map((r) => r.listing_id)),
    [responsesQuery.data]
  )

  return (
    <div className="text-on-surface">
      <TopBar
        leftIcon="arrow_back"
        leftLabel="Retour"
        onLeftClick={() => navigate('/')}
        title="Annonces"
      />

      <main className="mx-auto max-w-screen-xl space-y-6 px-6 pb-12 pt-24">
        {listingsQuery.isLoading && <Loader label="Chargement des annonces..." />}

        {listingsQuery.isError && (
          <EmptyState
            description="Vérifiez votre connexion et réessayez."
            icon="error_outline"
            title="Impossible de charger les annonces"
          />
        )}

        {listingsQuery.data?.data.length === 0 && (
          <EmptyState
            description="Revenez plus tard, de nouvelles annonces seront publiées."
            icon="campaign"
            title="Aucune annonce active pour le moment"
          />
        )}

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {listingsQuery.data?.data.map((listing) => {
            const hasResponded = respondedListingIds.has(listing.id)
            const remaining = remainingQuantity(listing)

            return (
              <Card
                key={listing.id}
                badge={hasResponded ? <Badge label="Déjà répondu" tone="primary" /> : undefined}
                description={`${remaining} ${listing.material.unit} restant · min ${listing.min_quantity_per_response} ${listing.material.unit}`}
                footer={
                  <span className="font-headline text-lg font-extrabold text-primary">
                    {formatCurrency(listing.unit_price)} / {listing.material.unit}
                  </span>
                }
                imageFallbackIcon={
                  <MaterialIcon className="text-4xl text-on-surface-variant/40" name="recycling" />
                }
                onClick={() => navigate(`/app/annonces/${listing.id}`)}
                subtitle={listing.partner.partner_profile?.company_name ?? listing.partner.name}
                title={listing.material.name}
              />
            )
          })}
        </div>
      </main>
    </div>
  )
}
