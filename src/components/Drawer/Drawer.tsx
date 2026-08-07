import { createPortal } from 'react-dom'
import type { ReactNode } from 'react'
import { MaterialIcon } from '@/components/Loader/MaterialIcon/MaterialIcon'

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export function Drawer({ isOpen, onClose, children }: DrawerProps) {
  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-[60] flex">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative flex h-full w-72 max-w-[80%] flex-col bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-outline-variant/10 px-5 py-4">
          <span className="font-headline text-lg font-bold text-on-surface">Menu</span>
          <button className="rounded-full p-1 hover:bg-surface-container-high" onClick={onClose} type="button">
            <MaterialIcon name="close" />
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  )
}