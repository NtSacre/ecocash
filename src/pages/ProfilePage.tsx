import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TopBar } from '@/components/Loader/TopBar/TopBar'
import { MaterialIcon } from '@/components/Loader/MaterialIcon/MaterialIcon'
import { OtpChannelSelect } from '@/components/OtpChannelSelect/OtpChannelSelect'
import { useAuthContext } from '@/context/AuthContext'
import { useLogout } from '@/hooks/useLogout'
import { useUpdateProfile } from '@/hooks/useUpdateProfile'
import { useImageUpload } from '@/hooks/useMediaUpload'
import { UserRole } from '@/core/enums/UserRole'
import { getPrimaryRole } from '@/utils/primaryRole'
import { profileFormSchema, type ProfileFormValues } from '@/application/validators/profileValidators'
import type { OtpChannel } from '@/core/interfaces/IAuth'

export default function ProfilePage() {
  const { user } = useAuthContext()
  const logout = useLogout()
  const updateProfile = useUpdateProfile()
  const imageUpload = useImageUpload()
  const [isEditing, setIsEditing] = useState(false)

  const isAgent = user ? getPrimaryRole(user) === UserRole.Agent : false

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user?.name ?? '',
      email: user?.email ?? '',
      mobile_money_number: user?.mobile_money_number ?? '',
      coverage_zone: user?.coverage_zone ?? '',
      preferred_otp_channel: 'email',
    },
  })

  const handleAvatarUpload = (file: File) => {
    imageUpload.mutate(file, {
      onSuccess: (url) => updateProfile.mutate({ avatar: url }),
    })
  }

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await updateProfile.mutateAsync({
        ...values,
        email: values.email || undefined,
      })
      setIsEditing(false)
    } catch {
      // erreur affichée via updateProfile.isError
    }
  })

  return (
    <div className="text-on-surface">
      <TopBar title="Mon compte" />

      <main className="mx-auto max-w-md space-y-6 px-6 pb-12 pt-24">
        <section className="flex flex-col items-center gap-4 rounded-lg bg-surface-container-lowest p-8 text-center shadow-sm">
          {user?.avatar ? (
            <div className="relative">
              <img alt="Avatar" className="h-24 w-24 rounded-full object-cover" src={user.avatar} />
              <label className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-primary text-white shadow-md">
                <MaterialIcon className="text-base" name="edit" />
                <input
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleAvatarUpload(e.target.files[0])}
                  type="file"
                />
              </label>
            </div>
          ) : (
            <label className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-full border-2 border-dashed border-outline-variant/30 bg-surface-container-high">
              <MaterialIcon className="text-2xl text-on-surface-variant" name="add_a_photo" />
              <input
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleAvatarUpload(e.target.files[0])}
                type="file"
              />
            </label>
          )}

          {!isEditing && (
            <div>
              <p className="font-headline text-lg font-bold text-on-surface">{user?.name}</p>
              <p className="text-sm text-on-surface-variant">{user?.phone}</p>
              {user?.email && <p className="text-sm text-on-surface-variant">{user.email}</p>}
              {user?.mobile_money_number && (
                <p className="text-xs text-on-surface-variant">Mobile Money : {user.mobile_money_number}</p>
              )}
              {isAgent && user?.coverage_zone && (
                <p className="text-xs text-on-surface-variant">Zone : {user.coverage_zone}</p>
              )}
            </div>
          )}
        </section>

        {!isEditing && (
          <button
            className="w-full rounded-full bg-secondary-container py-3 font-headline font-bold text-on-secondary-container transition-transform active:scale-[0.98]"
            onClick={() => setIsEditing(true)}
            type="button"
          >
            Modifier mes informations
          </button>
        )}

        {isEditing && (
          <form className="space-y-4" onSubmit={onSubmit}>
            <div>
              <label className="ml-1 text-xs font-bold uppercase tracking-widest text-zinc-400">Nom complet</label>
              <input
                className="mt-2 w-full rounded-lg bg-surface-container-high px-4 py-3 font-medium text-on-surface focus:ring-2 focus:ring-primary/40"
                type="text"
                {...form.register('name')}
              />
              {form.formState.errors.name && <p className="mt-1 text-xs text-error">{form.formState.errors.name.message}</p>}
            </div>

            <div>
              <label className="ml-1 text-xs font-bold uppercase tracking-widest text-zinc-400">Email (optionnel)</label>
              <input
                className="mt-2 w-full rounded-lg bg-surface-container-high px-4 py-3 font-medium text-on-surface focus:ring-2 focus:ring-primary/40"
                type="email"
                {...form.register('email')}
              />
              {form.formState.errors.email && <p className="mt-1 text-xs text-error">{form.formState.errors.email.message}</p>}
            </div>

            <div>
              <label className="ml-1 text-xs font-bold uppercase tracking-widest text-zinc-400">
                Numéro Mobile Money (pour être payé)
              </label>
              <input
                className="mt-2 w-full rounded-lg bg-surface-container-high px-4 py-3 font-medium text-on-surface focus:ring-2 focus:ring-primary/40"
                placeholder="+221770000000"
                type="tel"
                {...form.register('mobile_money_number')}
              />
            </div>

            {isAgent && (
              <div>
                <label className="ml-1 text-xs font-bold uppercase tracking-widest text-zinc-400">Zone de couverture</label>
                <input
                  className="mt-2 w-full rounded-lg bg-surface-container-high px-4 py-3 font-medium text-on-surface focus:ring-2 focus:ring-primary/40"
                  placeholder="Ex: Dakar Plateau"
                  type="text"
                  {...form.register('coverage_zone')}
                />
              </div>
            )}

            <OtpChannelSelect
              onChange={(channel: OtpChannel) => form.setValue('preferred_otp_channel', channel)}
              value={form.watch('preferred_otp_channel') ?? 'email'}
            />

            {updateProfile.isError && (
              <p className="rounded-2xl bg-error-container px-4 py-3 text-sm text-on-error-container">
                Impossible d'enregistrer — vérifiez vos informations.
              </p>
            )}

            <div className="space-y-2">
              <button
                className="w-full rounded-full bg-primary py-3 font-headline font-bold text-on-primary disabled:opacity-60"
                disabled={updateProfile.isPending}
                type="submit"
              >
                {updateProfile.isPending ? 'Enregistrement...' : 'Enregistrer'}
              </button>
              <button
                className="w-full rounded-full py-3 text-sm font-bold text-on-surface-variant"
                onClick={() => setIsEditing(false)}
                type="button"
              >
                Annuler
              </button>
            </div>
          </form>
        )}

        {!isEditing && (
          <button
            className="w-full rounded-full bg-error-container py-4 font-headline font-bold text-on-error-container transition-transform active:scale-[0.98] disabled:opacity-60"
            disabled={logout.isPending}
            onClick={() => logout.mutate()}
            type="button"
          >
            {logout.isPending ? 'Déconnexion...' : 'Se déconnecter'}
          </button>
        )}
      </main>
    </div>
  )
}