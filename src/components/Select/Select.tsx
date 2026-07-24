interface SelectOption {
  value: string | number
  label: string
}

interface SelectProps {
  label: string
  value: string | number | undefined
  onChange: (value: string) => void
  options: SelectOption[]
  placeholder?: string
  error?: string
}

export function Select({ label, value, onChange, options, placeholder, error }: SelectProps) {
  return (
    <div>
      <label className="ml-1 text-xs font-bold uppercase tracking-widest text-zinc-400">{label}</label>
      <select
        className="mt-2 w-full rounded-lg bg-surface-container-high px-4 py-3 font-medium text-on-surface focus:ring-2 focus:ring-primary/40"
        onChange={(e) => onChange(e.target.value)}
        value={value ?? ''}
      >
        <option disabled value="">
          {placeholder ?? 'Sélectionner...'}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="ml-1 mt-1 text-xs text-error">{error}</p>}
    </div>
  )
}