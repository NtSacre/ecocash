import { NavLink } from 'react-router-dom'
import { MaterialIcon } from '../MaterialIcon/MaterialIcon'

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
    <nav className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around rounded-t-[3rem] border-t border-outline-variant/10 bg-white/90 px-4 pb-6 pt-3 backdrop-blur-lg shadow-[0_-8px_24px_rgba(0,0,0,0.04)]">
      {items.map((item) => (
        <NavLink
          key={item.to}
          className={({ isActive }) =>
            [
              'flex flex-col items-center justify-center px-5 py-2 text-[10px] font-semibold uppercase tracking-wider transition-transform duration-150 active:scale-90',
              isActive
                ? 'rounded-full bg-secondary-container text-on-secondary-container'
                : 'text-on-surface-variant hover:text-primary',
            ].join(' ')
          }
          end={item.end}
          to={item.to}
        >
          {({ isActive }) => (
            <>
              <MaterialIcon className="text-xl" filled={item.filled && isActive} name={item.icon} />
              <span className="mt-1">{item.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}