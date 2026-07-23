import type { ReactNode } from 'react'
import { MaterialIcon } from '../MaterialIcon/MaterialIcon'

interface TopBarProps {
  title: string
  leftIcon?: string
  leftLabel?: string
  onLeftClick?: () => void
  avatar?: string
  rightNode?: ReactNode
  titleClassName?: string
}

export function TopBar({
  title,
  leftIcon = 'menu',
  leftLabel = 'Navigation',
  onLeftClick,
  avatar,
  rightNode,
  titleClassName = '',
}: TopBarProps) {
  return (
    <header className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex w-full max-w-screen-xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            aria-label={leftLabel}
            className="rounded-full p-2 text-primary transition-transform duration-200 active:scale-95"
            onClick={onLeftClick}
            type="button"
          >
            <MaterialIcon className="text-2xl" name={leftIcon} />
          </button>
          <h1 className={`font-headline text-xl font-black tracking-tight text-primary ${titleClassName}`.trim()}>
            {title}
          </h1>
        </div>
        {rightNode ?? (
          <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-primary/10 bg-surface-container-high">
            {avatar && <img alt="Profil utilisateur" className="h-full w-full object-cover" src={avatar} />}
          </div>
        )}
      </div>
    </header>
  )
}