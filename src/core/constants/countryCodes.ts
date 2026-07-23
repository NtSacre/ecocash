export interface CountryCode {
  code: string
  label: string
  flag: string
}

export const COUNTRY_CODES: CountryCode[] = [
  { code: '+221', label: 'Sénégal', flag: '🇸🇳' },
  { code: '+225', label: "Côte d'Ivoire", flag: '🇨🇮' },
  { code: '+223', label: 'Mali', flag: '🇲🇱' },
  { code: '+224', label: 'Guinée', flag: '🇬🇳' },
]

export const DEFAULT_COUNTRY_CODE = COUNTRY_CODES[0]