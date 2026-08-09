import { Link } from 'react-router-dom'
import { MaterialIcon } from '@/components/Loader/MaterialIcon/MaterialIcon'

interface KpiCardProps {
  label: string
  value: string | number
  icon: string
  tone?: 'primary' | 'warning' | 'neutral'
  linkTo?: string
}

const TONE_CLASSES: Record<NonNullable<KpiCardProps['tone']>, string> = {
  primary: 'bg-primary-container/10 text-primary',
  warning: 'bg-tertiary-container/20 text-tertiary',
  neutral: 'bg-surface-container-high text-on-surface-variant',
}

export function KpiCard({ label, value, icon, tone = 'neutral', linkTo }: KpiCardProps) {
  const content = (
    <div className="flex items-center gap-4 rounded-lg bg-surface-container-lowest p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className={`flex h-12 w-12 items-center justify-center rounded-full ${TONE_CLASSES[tone]}`}>
        <MaterialIcon className="text-2xl" name={icon} />
      </div>
      <div>
        <p className="font-headline text-2xl font-extrabold text-on-surface">{value}</p>
        <p className="text-xs font-semibold text-on-surface-variant">{label}</p>
      </div>
    </div>
  )

  return linkTo ? <Link to={linkTo}>{content}</Link> : content
}