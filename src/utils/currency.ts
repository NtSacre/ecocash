export function formatCurrency(amount: string | number | null): string {
  if (amount === null) return '—'

  const value = typeof amount === 'string' ? parseFloat(amount) : amount
  if (Number.isNaN(value)) return '—'

  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF',
    maximumFractionDigits: 0,
  }).format(value)
}