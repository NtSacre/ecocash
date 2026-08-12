interface ToggleSwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
  description?: string
}

export function ToggleSwitch({ checked, onChange, label, description }: ToggleSwitchProps) {
  return (
    <button
      className="flex w-full items-center justify-between gap-4 rounded-lg bg-surface-container-lowest p-4 text-left shadow-sm"
      onClick={() => onChange(!checked)}
      type="button"
    >
      <div>
        <p className="text-sm font-bold text-on-surface">{label}</p>
        {description && <p className="text-xs text-on-surface-variant">{description}</p>}
      </div>
      <span
        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${checked ? 'bg-primary' : 'bg-surface-container-high'}`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-surface-container-lowest shadow-sm transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`}
        />
      </span>
    </button>
  )
}