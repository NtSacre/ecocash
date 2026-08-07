import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge } from '@/components/Badge/Badge'
import { EmptyState } from '@/components/EmptyState/EmptyState'
import { Loader } from '@/components/Loader/Loader'
import { Modal } from '@/components/Modal/Modal'
import { PartnerListingForm } from '@/components/PartnerListingForm/PartnerListingForm'
import { TopBar } from '@/components/Loader/TopBar/TopBar'
import { usePartnerListings } from '@/hooks/usePartnerListings'
import { usePartnerListingMutations } from '@/hooks/usePartnerListingMutations'
import { formatCurrency } from '@/utils/currency'
import type { ListingStatus } from '@/core/interfaces/IListing'
import type { PartnerListingFormValues } from '@/application/validators/partnerListingValidators'
import type { IListing } from '@/core/interfaces/IListing'

const STATUS_LABEL: Record<ListingStatus, string> = {
  active: 'Active',
  suspended: 'Suspendue',
  closed: 'Terminée',
}

const STATUS_TONE: Record<ListingStatus, 'primary' | 'neutral' | 'warning'> = {
  active: 'primary',
  suspended: 'warning',
  closed: 'neutral',
}

export default function PartnerListingsPage() {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingListing, setEditingListing] = useState<IListing | null>(null)

  const listingsQuery = usePartnerListings()
  const { create, update, remove, suspend, renew } = usePartnerListingMutations()
  const handleSubmit = async (values: PartnerListingFormValues) => {
    try {
      if (editingListing) {
        await update.mutateAsync({
          id: editingListing.id,
          payload: values,
        })
      } else {
        await create.mutateAsync(values)
      }

      setEditingListing(null)
      setIsModalOpen(false)
    } catch {
      //
    }
  }

  function handleEdit(listing: IListing) {
    setEditingListing(listing)
    setIsModalOpen(true)
  }

  async function handleDelete(listing: IListing) {
    if (!confirm(`Supprimer "${listing.title}" ?`)) {
      return
    }

    await remove.mutateAsync(listing.id)
  }

  return (
    <div className="text-on-surface">
      <TopBar
        leftIcon="arrow_back"
        leftLabel="Retour"
        onLeftClick={() => navigate('/')}
        title="Mes annonces"
      />

      <main className="mx-auto max-w-screen-xl space-y-6 px-6 pb-12 pt-24">
        <button
          className="action-gradient flex w-full items-center justify-center gap-3 rounded-full py-4 font-headline text-lg font-bold text-white shadow-lg transition-transform active:scale-95"
          onClick={() => {
            setEditingListing(null)
            setIsModalOpen(true)
          }}
          type="button"
        >
          + Créer une annonce
        </button>

        {listingsQuery.isLoading && <Loader label="Chargement..." />}

        {listingsQuery.data?.length === 0 && (
          <EmptyState
            description="Créez votre première annonce pour commencer à collecter."
            icon="campaign"
            title="Aucune annonce"
          />
        )}

        <div className="space-y-3">
          {listingsQuery.data?.map((listing) => (
            <article
              key={listing.id}
              className="space-y-2 rounded-lg bg-surface-container-lowest p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-primary">
                    {listing.material.name}
                  </p>
                  <p className="font-headline font-bold text-on-surface">{listing.title}</p>
                  <p className="text-xs text-on-surface-variant">
                    {listing.reserved_quantity}/{listing.target_quantity} {listing.material.unit}{' '}
                    réservé · {formatCurrency(listing.unit_price)}/{listing.material.unit}
                  </p>
                </div>
                <Badge label={STATUS_LABEL[listing.status]} tone={STATUS_TONE[listing.status]} />
              </div>

              <div className="flex gap-4 pt-1">
                <button
                  className="text-sm font-semibold text-primary"
                  onClick={() => handleEdit(listing)}
                  type="button"
                >
                  Modifier
                </button>

                <button
                  className="text-sm font-semibold text-error"
                  onClick={() => handleDelete(listing)}
                  type="button"
                >
                  Supprimer
                </button>
                {listing.status === 'active' && (
                  <button
                    className="text-sm font-semibold text-error disabled:opacity-60"
                    disabled={suspend.isPending}
                    onClick={() => suspend.mutate(listing.id)}
                    type="button"
                  >
                    Suspendre
                  </button>
                )}
                {listing.status === 'suspended' && (
                  <button
                    className="text-sm font-semibold text-primary disabled:opacity-60"
                    disabled={renew.isPending}
                    onClick={() => renew.mutate({ id: listing.id, payload: {} })}
                    type="button"
                  >
                    Renouveler
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingListing(null)
        }}
        title={editingListing ? 'Modifier une annonce' : 'Créer une annonce'}
      >
        {create.isError && (
          <p className="mb-4 rounded-2xl bg-error-container px-4 py-3 text-sm text-on-error-container">
            Impossible de créer l'annonce. Vérifiez les champs.
          </p>
        )}
        <PartnerListingForm
          initialValues={
            editingListing
              ? {
                  material_id: editingListing.material.id,
                  title: editingListing.title,
                  description: editingListing.description ?? '',
                  target_quantity: Number(editingListing.target_quantity),
                  unit_price: Number(editingListing.unit_price),
                  min_quantity_per_response: Number(editingListing.min_quantity_per_response),
                  start_date: editingListing.start_date ?? '',
                  end_date: editingListing.end_date ?? '',
                }
              : undefined
          }
          submitLabel={editingListing ? "Modifier l'annonce" : "Publier l'annonce"}
          isSubmitting={create.isPending || update.isPending}
          onSubmit={handleSubmit}
        />
      </Modal>
    </div>
  )
}
