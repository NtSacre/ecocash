import { EmptyState } from '@/components/EmptyState/EmptyState'

interface UnderConstructionProps {
  title: string
}

export function UnderConstruction({ title }: UnderConstructionProps) {
  return (
    <div className="space-y-6">
      <h1 className="font-headline text-2xl font-bold text-on-surface">{title}</h1>
      <EmptyState description="Cette section arrive bientôt." icon="construction" title="En cours de construction" />
    </div>
  )
}