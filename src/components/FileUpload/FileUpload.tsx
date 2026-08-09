import { useRef } from 'react'
import { MaterialIcon } from '@/components/Loader/MaterialIcon/MaterialIcon'

interface FileUploadProps {
  label: string
  accept: string
  kind: 'image' | 'video'
  value: string | null
  onUpload: (file: File) => void
  isUploading: boolean
  onRemove: () => void
}

export function FileUpload({ label, accept, kind, value, onUpload, isUploading, onRemove }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) onUpload(file)
    e.target.value = ''
  }

  return (
    <div>
      <label className="ml-1 text-xs font-bold uppercase tracking-widest text-zinc-400">{label}</label>

      {!value && (
        <button
          className="mt-2 flex w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-outline-variant/30 bg-surface-container-low py-8 transition-colors hover:bg-surface-container-high disabled:opacity-60"
          disabled={isUploading}
          onClick={() => inputRef.current?.click()}
          type="button"
        >
          <MaterialIcon className="text-3xl text-on-surface-variant" name={kind === 'image' ? 'add_photo_alternate' : 'video_call'} />
          <span className="text-sm font-semibold text-on-surface-variant">
            {isUploading ? 'Envoi en cours...' : `Ajouter ${kind === 'image' ? 'une image' : 'une vidéo'}`}
          </span>
        </button>
      )}

      {value && (
        <div className="relative mt-2 overflow-hidden rounded-lg bg-surface-container-high">
          {kind === 'image' ? (
            <img alt={label} className="h-48 w-full object-cover" src={value} />
          ) : (
            <video className="h-48 w-full object-cover" controls src={value} />
          )}
          <button
            className="absolute right-2 top-2 rounded-full bg-black/60 p-1.5 text-white transition-transform active:scale-90"
            onClick={onRemove}
            type="button"
          >
            <MaterialIcon className="text-lg" name="close" />
          </button>
        </div>
      )}

      <input accept={accept} className="hidden" onChange={handleChange} ref={inputRef} type="file" />
    </div>
  )
}