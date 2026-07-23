import { MaterialIcon } from '@/components/Loader/MaterialIcon/MaterialIcon'
import type { OtpChannel } from '@/core/interfaces/IAuth'

interface OtpChannelOption {
  value: OtpChannel
  label: string
  icon: string
}

const OPTIONS: OtpChannelOption[] = [
  { value: 'email', label: 'Email', icon: 'mail' },
  { value: 'sms', label: 'SMS', icon: 'sms' },
  { value: 'whatsapp', label: 'WhatsApp', icon: 'chat' },
]

interface OtpChannelSelectProps {
  value: OtpChannel
  onChange: (channel: OtpChannel) => void
}

export function OtpChannelSelect({ value, onChange }: OtpChannelSelectProps) {
  return (
    <div>
      <label className="ml-4 text-xs font-bold uppercase tracking-widest text-zinc-400">
        Recevoir le code par
      </label>
      <div className="mt-2 grid grid-cols-3 gap-2">
        {OPTIONS.map((option) => {
          const isActive = value === option.value

          return (
            <button
              key={option.value}
              className={[
                'flex flex-col items-center gap-1 rounded-lg border-2 py-3 transition-all',
                isActive
                  ? 'border-primary bg-secondary-container/40 text-primary'
                  : 'border-transparent bg-surface-container-high text-on-surface-variant',
              ].join(' ')}
              onClick={() => onChange(option.value)}
              type="button"
            >
              <MaterialIcon className="text-xl" name={option.icon} />
              <span className="text-xs font-semibold">{option.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}