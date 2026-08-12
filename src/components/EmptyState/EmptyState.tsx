import { MaterialIcon } from "../Loader/MaterialIcon/MaterialIcon"

interface EmptyStateProps {
  icon: string
  title: string
  description?: string
}

export function EmptyState({ icon, title, description }: EmptyStateProps) {
  return (
    <div className="soft-card flex flex-col items-center gap-3 rounded-lg bg-surface-container-lowest/70 p-10 text-center">
      <MaterialIcon className="text-4xl text-on-surface-variant/50" name={icon} />
      <p className="font-headline text-lg font-bold text-on-surface">{title}</p>
      {description && <p className="text-sm text-on-surface-variant">{description}</p>}
    </div>
  )
}