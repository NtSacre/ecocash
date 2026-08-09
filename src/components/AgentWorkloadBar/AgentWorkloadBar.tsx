interface AgentWorkloadBarProps {
  name: string
  activeLoad: number
  maxLoad: number
}

export function AgentWorkloadBar({ name, activeLoad, maxLoad }: AgentWorkloadBarProps) {
  const percentage = Math.min(100, (activeLoad / maxLoad) * 100)
  const isNearCapacity = activeLoad >= maxLoad

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold text-on-surface">{name}</span>
        <span className={`font-bold ${isNearCapacity ? 'text-error' : 'text-on-surface-variant'}`}>
          {activeLoad}/{maxLoad}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-surface-container-high">
        <div
          className={`h-full rounded-full transition-all ${isNearCapacity ? 'bg-error' : 'bg-primary'}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}