import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { EmptyState } from '@/components/EmptyState/EmptyState'
import { Loader } from '@/components/Loader/Loader'
import { Modal } from '@/components/Modal/Modal'
import { TopBar } from '@/components/Loader/TopBar/TopBar'
import { Card } from '@/components/Card/Card'
import { MaterialIcon } from '@/components/Loader/MaterialIcon/MaterialIcon'
import { usePartnerProducts } from '@/hooks/usePartnerProducts'
import { useCreateProduct } from '@/hooks/useCreateProduct'
import {
  partnerProductFormSchema,
  type PartnerProductFormValues,
} from '@/application/validators/partnerProductValidators'
import { formatCurrency } from '@/utils/currency'

import { useUpdateProduct } from '@/hooks/useUpdateProduct'
import { useDeleteProduct } from '@/hooks/useDeleteProduct'
import type { IProduct } from '@/core/interfaces/IProduct'
import { FileUpload } from '@/components/FileUpload/FileUpload'
import { useImageUpload } from '@/hooks/useMediaUpload'

export default function PartnerProductsPage() {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null)

  const productsQuery = usePartnerProducts()
  const createProduct = useCreateProduct()
  const updateProduct = useUpdateProduct()
  const deleteProduct = useDeleteProduct()

  const imageUpload = useImageUpload()
  const [imagePath, setImagePath] = useState<string | null>(null)

  const form = useForm<PartnerProductFormValues>({
    resolver: zodResolver(partnerProductFormSchema),
  })

  useEffect(() => {
    if (editingProduct) {
      form.reset({
        name: editingProduct.name,
        description: editingProduct.description ?? '',
        price: editingProduct.price ? Number(editingProduct.price) : undefined,
      })
      setImagePath(editingProduct.image_path ?? null)
    } else {
      form.reset({
        name: '',
        description: '',
        price: undefined,
      })
      setImagePath(null)
    }
  }, [editingProduct])

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      const payload = { ...values, image_path: imagePath ?? undefined }

      if (editingProduct) {
        await updateProduct.mutateAsync({ id: editingProduct.id, payload })
      } else {
        await createProduct.mutateAsync(payload)
      }

      form.reset()
      setImagePath(null)
      setEditingProduct(null)
      setIsModalOpen(false)
    } catch {
      // erreur affichée via createProduct.isError / updateProduct.isError
    }
  })

  function handleEdit(product: IProduct) {
    setEditingProduct(product)
    setIsModalOpen(true)
  }

  async function handleDelete(product: IProduct) {
    if (!confirm(`Supprimer "${product.name}" ?`)) return

    await deleteProduct.mutateAsync(product.id)
  }

  return (
    <div className="text-on-surface">
      <TopBar
        leftIcon="arrow_back"
        leftLabel="Retour"
        onLeftClick={() => navigate('/app')}
        title="Mes produits"
      />

      <main className="mx-auto max-w-screen-xl space-y-6 px-6 pb-12 pt-24">
        <button
          className="action-gradient flex w-full items-center justify-center gap-3 rounded-full py-4 font-headline text-lg font-bold text-white shadow-lg transition-transform active:scale-95"
          onClick={() => setIsModalOpen(true)}
          type="button"
        >
          + Ajouter un produit
        </button>

        {productsQuery.isLoading && <Loader label="Chargement..." />}

        {productsQuery.data?.length === 0 && (
          <EmptyState
            description="Ajoutez vos produits recyclés ou réutilisables pour leur donner de la visibilité."
            icon="inventory_2"
            title="Aucun produit"
          />
        )}

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {productsQuery.data?.map((product) => (
            <Card
              key={product.id}
              description={product.description ?? undefined}
              footer={
                <div className="space-y-3">
                  <span className="block font-headline text-lg font-extrabold text-primary">
                    {formatCurrency(product.price)}
                  </span>

                  <div className="flex gap-2">
                    <button
                      className="flex-1 rounded-lg bg-primary px-3 py-2 text-white"
                      onClick={() => handleEdit(product)}
                      type="button"
                    >
                      Modifier
                    </button>

                    <button
                      className="flex-1 rounded-lg bg-error px-3 py-2 text-white"
                      onClick={() => handleDelete(product)}
                      type="button"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              }
              imageFallbackIcon={
                <MaterialIcon className="text-4xl text-on-surface-variant/40" name="inventory_2" />
              }
              imageUrl={product.image_path}
              subtitle={product.is_available ? 'Disponible' : 'Indisponible'}
              title={product.name}
            />
          ))}
        </div>
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingProduct(null)
          form.reset()
          setImagePath(null)
        }}
        title={editingProduct ? 'Modifier le produit' : 'Ajouter un produit'}
      >
        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="ml-1 text-xs font-bold uppercase tracking-widest text-zinc-400">
              Nom
            </label>
            <input
              className="mt-2 w-full rounded-lg bg-surface-container-high px-4 py-3 font-medium text-on-surface focus:ring-2 focus:ring-primary/40"
              type="text"
              {...form.register('name')}
            />
            {form.formState.errors.name && (
              <p className="mt-1 text-xs text-error">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="ml-1 text-xs font-bold uppercase tracking-widest text-zinc-400">
              Description
            </label>
            <textarea
              className="mt-2 w-full rounded-lg bg-surface-container-high px-4 py-3 font-medium text-on-surface focus:ring-2 focus:ring-primary/40"
              rows={2}
              {...form.register('description')}
            />
          </div>

          <div>
            <label className="ml-1 text-xs font-bold uppercase tracking-widest text-zinc-400">
              Prix (optionnel)
            </label>
            <input
              className="mt-2 w-full rounded-lg bg-surface-container-high px-4 py-3 font-medium text-on-surface focus:ring-2 focus:ring-primary/40"
              step="0.01"
              type="number"
              {...form.register('price', { valueAsNumber: true })}
            />
          </div>

          <FileUpload
            accept="image/jpeg,image/png,image/webp"
            isUploading={imageUpload.isPending}
            kind="image"
            label="Image du produit (optionnel)"
            onRemove={() => setImagePath(null)}
            onUpload={(file) => imageUpload.mutate(file, { onSuccess: setImagePath })}
            value={imagePath}
          />

          {(createProduct.isError || updateProduct.isError) && (
            <p className="rounded-2xl bg-error-container px-4 py-3 text-sm text-on-error-container">
              {editingProduct ? 'Impossible de modifier le produit.' : "Impossible d'ajouter le produit."}
            </p>
          )}

          <button
            className="w-full rounded-lg bg-primary py-3 font-headline font-bold text-on-primary disabled:opacity-60"
            disabled={createProduct.isPending || updateProduct.isPending}
            type="submit"
          >
            {editingProduct
              ? updateProduct.isPending
                ? 'Modification...'
                : 'Modifier'
              : createProduct.isPending
                ? 'Ajout...'
                : 'Ajouter'}
          </button>
        </form>
      </Modal>
    </div>
  )
}