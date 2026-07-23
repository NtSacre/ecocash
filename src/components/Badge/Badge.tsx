interface BadgeProps {
  label: string
  tone?: 'primary' | 'neutral' | 'warning'
}

const TONE_CLASSES: Record<NonNullable<BadgeProps['tone']>, string> = {
  primary: 'bg-secondary-container text-on-secondary-container',
  neutral: 'bg-surface-container-high text-on-surface-variant',
  warning: 'bg-tertiary-container text-on-tertiary-container',
}

export function Badge({ label, tone = 'neutral' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${TONE_CLASSES[tone]}`}
    >
      {label}
    </span>
  )
}