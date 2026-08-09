export const DAY_OF_WEEK_LABELS: Record<number, string> = {
  1: 'Lundi',
  2: 'Mardi',
  3: 'Mercredi',
  4: 'Jeudi',
  5: 'Vendredi',
  6: 'Samedi',
  7: 'Dimanche',
}

/**
 * Retourne les N prochaines dates (format YYYY-MM-DD) tombant sur le jour
 * de semaine donné (1=Lundi...7=Dimanche, norme ISO — même convention que
 * Carbon::isoWeekday() côté backend, pour rester cohérent).
 */
export function getNextOccurrences(dayOfWeek: number, count = 4): string[] {
  const dates: string[] = []
  const today = new Date()
  const cursor = new Date(today)

  const isoToday = today.getDay() === 0 ? 7 : today.getDay()
  let diff = dayOfWeek - isoToday
  if (diff < 0) diff += 7
  cursor.setDate(today.getDate() + diff)

  for (let i = 0; i < count; i++) {
    dates.push(cursor.toISOString().slice(0, 10))
    cursor.setDate(cursor.getDate() + 7)
  }

  return dates
}

export function formatDateLabel(isoDate: string): string {
  // Gère les deux formats possibles : "2026-08-10" (date simple)
  // ou "2026-08-10T00:00:00.000000Z" (datetime complet renvoyé si le
  // backend caste collection_date en Carbon).
  const date = isoDate.includes('T') ? new Date(isoDate) : new Date(`${isoDate}T00:00:00`)
  return date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}