import { useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { MaterialIcon } from '@/components/Loader/MaterialIcon/MaterialIcon'
import { Drawer } from '@/components/Drawer/Drawer'
import { AppDrawerContent } from '@/components/AppDrawerContent/AppDrawerContent'

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
  leftIcon = 'arrow_back',
  leftLabel = 'Retour',
  onLeftClick,
  avatar,
  rightNode,
  titleClassName = '',
}: TopBarProps) {
  const navigate = useNavigate()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-xl shadow-sm">
        <div className="mx-auto flex w-full max-w-screen-xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            {onLeftClick ? (
              <button
                aria-label={leftLabel}
                className="rounded-full p-2 text-primary transition-transform duration-200 active:scale-95"
                onClick={onLeftClick}
                type="button"
              >
                <MaterialIcon className="text-2xl" name={leftIcon} />
              </button>
            ) : (
              <button
                aria-label="Ouvrir le menu"
                className="rounded-full p-2 text-primary transition-transform duration-200 active:scale-95"
                onClick={() => setIsDrawerOpen(true)}
                type="button"
              >
                <MaterialIcon className="text-2xl" name="menu" />
              </button>
            )}
            <h1 className={`font-headline text-xl font-black tracking-tight text-primary ${titleClassName}`.trim()}>
              {title}
            </h1>
          </div>

          {rightNode ?? (
            <button
              aria-label="Mon compte"
              className="h-10 w-10 overflow-hidden rounded-full border-2 border-primary/10 bg-surface-container-high transition-transform active:scale-90"
              onClick={() => navigate('/app/profil')}
              type="button"
            >
              {avatar ? (
                <img alt="Profil utilisateur" className="h-full w-full object-cover" src={avatar} />
              ) : (
                <MaterialIcon
                  className="flex h-full w-full items-center justify-center text-on-surface-variant"
                  name="account_circle"
                />
              )}
            </button>
          )}
        </div>
      </header>

      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <AppDrawerContent onNavigate={() => setIsDrawerOpen(false)} />
      </Drawer>
    </>
  )
}