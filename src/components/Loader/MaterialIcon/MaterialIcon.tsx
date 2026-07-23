interface MaterialIconProps {
  name: string
  className?: string
  filled?: boolean
}

export function MaterialIcon({ name, className = '', filled = false }: MaterialIconProps) {
  return (
    <span
      aria-hidden="true"
      className={`material-symbols-outlined ${filled ? 'filled-icon' : ''} ${className}`.trim()}
    >
      {name}
    </span>
  )
}