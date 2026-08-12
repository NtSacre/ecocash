const STORAGE_KEY = 'ecocash_onboarding_seen'

export function hasSeenOnboarding(): boolean {
  return localStorage.getItem(STORAGE_KEY) === 'true'
}

export function markOnboardingSeen(): void {
  localStorage.setItem(STORAGE_KEY, 'true')
}