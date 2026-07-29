import { createPortal } from 'react-dom'
import type { ReactNode } from 'react'
import { MaterialIcon } from '@/components/Loader/MaterialIcon/MaterialIcon'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-headline text-lg font-bold text-on-surface">{title}</h3>
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