import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { EmptyState } from '@/components/EmptyState/EmptyState'
import { FileUpload } from '@/components/FileUpload/FileUpload'
import { Loader } from '@/components/Loader/Loader'
import { Modal } from '@/components/Modal/Modal'
import { TopBar } from '@/components/Loader/TopBar/TopBar'
import { usePartnerEducationalPosts } from '@/hooks/usePartnerEducationalPosts'
import { usePartnerEducationalPostMutations } from '@/hooks/usePartnerEducationalPostMutations'
import { useImageUpload, useVideoUpload } from '@/hooks/useMediaUpload'
import { educationalPostFormSchema, type EducationalPostFormValues } from '@/application/validators/educationalPostValidators'
import { truncate } from '@/utils/text'

export default function PartnerEducationalPostsPage() {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [imagePath, setImagePath] = useState<string | null>(null)
  const [videoPath, setVideoPath] = useState<string | null>(null)

  const postsQuery = usePartnerEducationalPosts()
  const { create, remove } = usePartnerEducationalPostMutations()
  const imageUpload = useImageUpload()
  const videoUpload = useVideoUpload()

  const form = useForm<EducationalPostFormValues>({ resolver: zodResolver(educationalPostFormSchema) })

  const closeModal = () => {
    setIsModalOpen(false)
    setImagePath(null)
    setVideoPath(null)
    form.reset()
  }

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await create.mutateAsync({
        ...values,
        image_path: imagePath ?? undefined,
        video_path: videoPath ?? undefined,
      })
      closeModal()
    } catch {
      // erreur affichée via create.isError
    }
  })

  return (
    <div className="text-on-surface">
      <TopBar leftIcon="arrow_back" leftLabel="Retour" onLeftClick={() => navigate('/')} title="Mes publications" />

      <main className="mx-auto max-w-screen-xl space-y-6 px-6 pb-12 pt-24">
        <button
          className="action-gradient flex w-full items-center justify-center gap-3 rounded-full py-4 font-headline text-lg font-bold text-white shadow-lg transition-transform active:scale-95"
          onClick={() => setIsModalOpen(true)}
          type="button"
        >
          + Nouvelle publication
        </button>

        {postsQuery.isLoading && <Loader label="Chargement..." />}

        {postsQuery.data?.length === 0 && (
          <EmptyState description="Partagez des conseils sur le recyclage pour informer les particuliers." icon="menu_book" title="Aucune publication" />
        )}

        <div className="space-y-3">
          {postsQuery.data?.map((post) => (
            <article key={post.id} className="space-y-2 rounded-lg bg-surface-container-lowest p-5 shadow-sm">
              {post.image_path && <img alt={post.title} className="h-40 w-full rounded-lg object-cover" src={post.image_path} />}
              {post.video_path && <video className="h-40 w-full rounded-lg object-cover" controls src={post.video_path} />}
              <p className="font-headline font-bold text-on-surface">{post.title}</p>
              <p className="text-sm text-on-surface-variant">{truncate(post.content, 140)}</p>
              <button
                className="text-sm font-semibold text-error disabled:opacity-60"
                disabled={remove.isPending}
                onClick={() => {
                  if (confirm('Supprimer cette publication ?')) remove.mutate(post.id)
                }}
                type="button"
              >
                Supprimer
              </button>
            </article>
          ))}
        </div>
      </main>

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Nouvelle publication">
        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="ml-1 text-xs font-bold uppercase tracking-widest text-zinc-400">Titre</label>
            <input
              className="mt-2 w-full rounded-lg bg-surface-container-high px-4 py-3 font-medium text-on-surface focus:ring-2 focus:ring-primary/40"
              type="text"
              {...form.register('title')}
            />
            {form.formState.errors.title && <p className="mt-1 text-xs text-error">{form.formState.errors.title.message}</p>}
          </div>

          <div>
            <label className="ml-1 text-xs font-bold uppercase tracking-widest text-zinc-400">Contenu</label>
            <textarea
              className="mt-2 w-full rounded-lg bg-surface-container-high px-4 py-3 font-medium text-on-surface focus:ring-2 focus:ring-primary/40"
              rows={4}
              {...form.register('content')}
            />
            {form.formState.errors.content && <p className="mt-1 text-xs text-error">{form.formState.errors.content.message}</p>}
          </div>

          <FileUpload
            accept="image/jpeg,image/png,image/webp"
            isUploading={imageUpload.isPending}
            kind="image"
            label="Image (optionnel)"
            onRemove={() => setImagePath(null)}
            onUpload={(file) => imageUpload.mutate(file, { onSuccess: setImagePath })}
            value={imagePath}
          />

          <FileUpload
            accept="video/mp4,video/webm,video/quicktime"
            isUploading={videoUpload.isPending}
            kind="video"
            label="Vidéo (optionnel)"
            onRemove={() => setVideoPath(null)}
            onUpload={(file) => videoUpload.mutate(file, { onSuccess: setVideoPath })}
            value={videoPath}
          />

          {create.isError && (
            <p className="rounded-2xl bg-error-container px-4 py-3 text-sm text-on-error-container">
              Impossible de publier. Vérifiez les champs.
            </p>
          )}

          <button
            className="w-full rounded-lg bg-primary py-3 font-headline font-bold text-on-primary disabled:opacity-60"
            disabled={create.isPending || imageUpload.isPending || videoUpload.isPending}
            type="submit"
          >
            {create.isPending ? 'Publication...' : 'Publier'}
          </button>
        </form>
      </Modal>
    </div>
  )
}