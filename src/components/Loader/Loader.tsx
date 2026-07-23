export function Loader({ label = 'Chargement...' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-surface-container-high border-t-primary" />
      <p className="text-sm font-medium text-on-surface-variant">{label}</p>
    </div>
  )
}