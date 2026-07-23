// ⚠️ Hypothèse basée sur UserRequest::rules() : in_array($role_id, [2, 3])
// pour l'auto-inscription. À confirmer avec le seeder réel des rôles.
export const ROLE_IDS = {
  ADMIN: 1,
  PARTNER: 2,
  AGENT: 3,
  CITIZEN: 4,
} as const