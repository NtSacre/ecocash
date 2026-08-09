import { FileUpload } from '@/components/FileUpload/FileUpload'
import { TopBar } from '@/components/Loader/TopBar/TopBar'
import { MaterialIcon } from '@/components/Loader/MaterialIcon/MaterialIcon'
import { useAuthContext } from '@/context/AuthContext'
import { useLogout } from '@/hooks/useLogout'
import { useUpdateProfile } from '@/hooks/useUpdateProfile'
import { useImageUpload } from '@/hooks/useMediaUpload'

export default function ProfilePage() {
  const { user } = useAuthContext()
  const logout = useLogout()
  const updateProfile = useUpdateProfile()
  const imageUpload = useImageUpload()

  const handleAvatarUpload = (file: File) => {
    imageUpload.mutate(file, {
      onSuccess: (url) => updateProfile.mutate({ avatar: url }),
    })
  }

  return (
    <div className="text-on-surface">
      <TopBar title="Mon compte" />

      <main className="mx-auto max-w-md space-y-6 px-6 pt-24">
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
            <div className="w-full max-w-[160px]">
              <FileUpload
                accept="image/jpeg,image/png,image/webp"
                isUploading={imageUpload.isPending}
                kind="image"
                label="Photo de profil"
                onRemove={() => {}}
                onUpload={handleAvatarUpload}
                value={null}
              />
            </div>
          )}

          <div>
            <p className="font-headline text-lg font-bold text-on-surface">{user?.name}</p>
            <p className="text-sm text-on-surface-variant">{user?.phone}</p>
            {user?.email && <p className="text-sm text-on-surface-variant">{user.email}</p>}
          </div>
        </section>

        <button
          className="w-full rounded-full bg-error-container py-4 font-headline font-bold text-on-error-container transition-transform active:scale-[0.98] disabled:opacity-60"
          disabled={logout.isPending}
          onClick={() => logout.mutate()}
          type="button"
        >
          {logout.isPending ? 'Déconnexion...' : 'Se déconnecter'}
        </button>
      </main>
    </div>
  )
}