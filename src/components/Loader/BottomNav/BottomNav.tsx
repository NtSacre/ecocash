import { NavLink } from 'react-router-dom'
import { MaterialIcon } from '@/components/Loader/MaterialIcon/MaterialIcon'

export interface BottomNavItem {
  to: string
  label: string
  icon: string
  filled?: boolean
  end?: boolean
}

interface BottomNavProps {
  items: BottomNavItem[]
}

export function BottomNav({ items }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full border-t border-outline-variant/10 bg-white/95 shadow-[0_-8px_24px_rgba(0,0,0,0.04)] backdrop-blur-lg">
      <div
        className="mx-auto flex max-w-screen-xl items-stretch px-1 pt-2"
        style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
      >
        {items.map((item) => (
          <NavLink
            key={item.to}
            className={({ isActive }) =>
              [
                'flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-2xl px-1 py-1.5 transition-transform active:scale-90',
                isActive ? 'text-primary' : 'text-on-surface-variant',
              ].join(' ')
            }
            end={item.end}
            to={item.to}
          >
            {({ isActive }) => (
              <>
                <span
                  className={[
                    'flex h-9 w-9 items-center justify-center rounded-full transition-colors',
                    isActive ? 'bg-secondary-container' : '',
                  ].join(' ')}
                >
                  <MaterialIcon className="text-xl" filled={item.filled && isActive} name={item.icon} />
                </span>
                <span className="w-full truncate px-0.5 text-center text-[9px] font-bold uppercase leading-tight tracking-wide">
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}