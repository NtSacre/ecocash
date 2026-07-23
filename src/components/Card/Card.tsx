import type { ReactNode } from 'react'

interface CardProps {
  imageUrl?: string | null
  imageFallbackIcon?: ReactNode
  badge?: ReactNode
  title: string
  subtitle?: string
  description?: string
  footer?: ReactNode
  onClick?: () => void
}

export function Card({ imageUrl, imageFallbackIcon, badge, title, subtitle, description, footer, onClick }: CardProps) {
  const isInteractive = !!onClick

  return (
    <article
      className={[
        'overflow-hidden rounded-lg bg-surface-container-lowest shadow-sm transition-shadow',
        isInteractive ? 'cursor-pointer hover:shadow-md active:scale-[0.99]' : '',
      ].join(' ')}
      onClick={onClick}
    >
      <div className="relative flex h-40 w-full items-center justify-center bg-surface-container-high">
        {imageUrl ? (
          <img alt={title} className="h-full w-full object-cover" src={imageUrl} />
        ) : (
          imageFallbackIcon
        )}
        {badge && <div className="absolute left-3 top-3">{badge}</div>}
      </div>
      <div className="space-y-1 p-5">
        {subtitle && (
          <p className="text-[10px] font-bold uppercase tracking-widest text-primary">{subtitle}</p>
        )}
        <h3 className="font-headline text-lg font-bold text-on-surface">{title}</h3>
        {description && <p className="text-sm text-on-surface-variant">{description}</p>}
        {footer && <div className="pt-2">{footer}</div>}
      </div>
    </article>
  )
}