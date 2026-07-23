import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { EmptyState } from '@/components/EmptyState/EmptyState'
import { Loader } from '@/components/Loader/Loader'
import { MaterialIcon } from '@/components/Loader/MaterialIcon/MaterialIcon'
import { TopBar } from '@/components/Loader/TopBar/TopBar'
import { useListingDetail } from '@/hooks/useListingDetail'
import { useRespondToListing } from '@/hooks/useRespondToListing'
import { createRespondSchema, type RespondFormValues } from '@/application/validators/listingValidators'
import { formatCurrency } from '@/utils/currency'
import { remainingQuantity, toNumber } from '@/utils/quantity'

export default function ListingDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [isResponding, setIsResponding] = useState(false)
  const [success, setSuccess] = useState(false)

  const listingQuery = useListingDetail(id)
  const respondMutation = useRespondToListing(id ?? '')

  const listing = listingQuery.data
  const remaining = listing ? remainingQuantity(listing) : 0
  const min = listing ? toNumber(listing.min_quantity_per_response) : 0

  const form = useForm<RespondFormValues>({
    resolver: zodResolver(createRespondSchema(min, remaining)),
    defaultValues: { quantity_offered: min },
  })

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await respondMutation.mutateAsync(values.quantity_offered)
      setSuccess(true)
      setIsResponding(false)
    } catch {
      // erreur affichée via respondMutation.isError
    }
  })

  if (listingQuery.isLoading) return <Loader label="Chargement de l'annonce..." />

  if (listingQuery.isError || !listing) {
    return (
      <div className="px-6 pt-24">
        <EmptyState description="Cette annonce n'existe plus ou a été retirée." icon="error_outline" title="Annonce introuvable" />
      </div>
    )
  }

  return (
    <div className="text-on-surface">
      <TopBar leftIcon="arrow_back" leftLabel="Retour" onLeftClick={() => navigate('/app/annonces')} title={listing.material.name} />

      <main className="mx-auto max-w-md space-y-8 px-6 pb-12 pt-24">
        <section className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">
            {listing.partner.partner_profile?.company_name ?? listing.partner.name}
          </p>
          <h2 className="font-headline text-2xl font-bold text-on-surface">{listing.title}</h2>
          {listing.description && <p className="text-sm text-on-surface-variant">{listing.description}</p>}
        </section>

        <section className="grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-surface-container-lowest p-4 shadow-sm">
            <p className="text-xs font-semibold text-on-surface-variant">Prix</p>
            <p className="font-headline text-lg font-extrabold text-primary">
              {formatCurrency(listing.unit_price)} / {listing.material.unit}
            </p>
          </div>
          <div className="rounded-lg bg-surface-container-lowest p-4 shadow-sm">
            <p className="text-xs font-semibold text-on-surface-variant">Disponible</p>
            <p className="font-headline text-lg font-extrabold text-on-surface">
              {remaining} {listing.material.unit}
            </p>
          </div>
          <div className="col-span-2 rounded-lg bg-surface-container-lowest p-4 shadow-sm">
            <p className="text-xs font-semibold text-on-surface-variant">Quantité minimale par réponse</p>
            <p className="font-headline text-lg font-extrabold text-on-surface">
              {min} {listing.material.unit}
            </p>
          </div>
        </section>

        {success && (
          <section className="soft-card space-y-3 rounded-lg bg-secondary-container/40 p-6 text-center">
            <MaterialIcon className="text-4xl text-primary" name="check_circle" />
            <p className="font-headline text-lg font-bold text-on-surface">Réponse envoyée</p>
            <p className="text-sm text-on-surface-variant">
              Vous pourrez choisir un créneau de collecte depuis votre suivi.
            </p>
            <button className="font-semibold text-primary" onClick={() => navigate('/app/annonces')} type="button">
              Retour aux annonces
            </button>
          </section>
        )}

        {!success && remaining <= 0 && (
          <EmptyState description="Toute la quantité ciblée a déjà été réservée." icon="check_circle" title="Annonce complète" />
        )}

        {!success && remaining > 0 && !isResponding && (
          <button
            className="action-gradient w-full rounded-full py-5 font-headline text-xl font-extrabold text-white shadow-lg transition-transform active:scale-95"
            onClick={() => setIsResponding(true)}
            type="button"
          >
            Répondre à cette annonce
          </button>
        )}

        {!success && isResponding && (
          <form className="space-y-6" onSubmit={onSubmit}>
            <div className="flex items-center justify-between gap-6 rounded-lg bg-surface-container-lowest p-6 shadow-sm">
              <button
                className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-container-high transition-transform active:scale-90"
                onClick={() => {
                  const current = form.getValues('quantity_offered') || min
                  form.setValue('quantity_offered', Math.max(min, current - 1))
                }}
                type="button"
              >
                <MaterialIcon name="remove" />
              </button>
              <div className="flex-1 text-center">
                <input
                  className="w-full border-none bg-transparent text-center font-headline text-4xl font-extrabold text-on-surface focus:ring-0"
                  step="0.01"
                  type="number"
                  {...form.register('quantity_offered', { valueAsNumber: true })}
                />
                <p className="text-xs text-on-surface-variant">{listing.material.unit}</p>
              </div>
              <button
                className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-container text-white transition-transform active:scale-90"
                onClick={() => {
                  const current = form.getValues('quantity_offered') || min
                  form.setValue('quantity_offered', Math.min(remaining, current + 1))
                }}
                type="button"
              >
                <MaterialIcon name="add" />
              </button>
            </div>

            {form.formState.errors.quantity_offered && (
              <p className="text-center text-xs text-error">{form.formState.errors.quantity_offered.message}</p>
            )}

            {respondMutation.isError && (
              <p className="rounded-2xl bg-error-container px-4 py-3 text-center text-sm text-on-error-container">
                Impossible d'envoyer votre réponse. Réessayez.
              </p>
            )}

            <div className="space-y-3">
              <button
                className="action-gradient w-full rounded-full py-5 font-headline text-lg font-extrabold text-white disabled:opacity-60"
                disabled={respondMutation.isPending}
                type="submit"
              >
                {respondMutation.isPending ? 'Envoi...' : 'Confirmer'}
              </button>
              <button className="w-full rounded-full py-3 text-sm font-bold text-on-surface-variant" onClick={() => setIsResponding(false)} type="button">
                Annuler
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  )
}