export const DOCUMENT_TYPES = [
  { id: 'medical-bill', label: 'Medical Bill', icon: 'Stethoscope' },
  { id: 'debt-collection', label: 'Debt Collection Letter', icon: 'FileWarning' },
  { id: 'insurance-denial', label: 'Insurance Denial', icon: 'ShieldX' },
  { id: 'hoa-fine', label: 'HOA Fine', icon: 'Building2' },
  { id: 'landlord-dispute', label: 'Landlord/Tenant Dispute', icon: 'Home' },
  { id: 'bank-fee', label: 'Bank Fee', icon: 'Landmark' },
  { id: 'airline-claim', label: 'Airline/Travel Claim', icon: 'Plane' },
  { id: 'other', label: 'Other / Miscellaneous', icon: 'FileQuestion' },
] as const

export const COUNTRIES = [
  { code: 'US', name: 'United States', flag: '\ud83c\uddfa\ud83c\uddf8' },
  { code: 'GB', name: 'United Kingdom', flag: '\ud83c\uddec\ud83c\udde7' },
  { code: 'AU', name: 'Australia', flag: '\ud83c\udde6\ud83c\uddfa' },
  { code: 'CA', name: 'Canada', flag: '\ud83c\udde8\ud83c\udde6' },
  { code: 'NZ', name: 'New Zealand', flag: '\ud83c\uddf3\ud83c\uddff' },
  { code: 'IE', name: 'Ireland', flag: '\ud83c\uddee\ud83c\uddea' },
  { code: 'ZA', name: 'South Africa', flag: '\ud83c\uddff\ud83c\udde6' },
] as const

export const TIERS = [
  {
    id: 'basic',
    name: 'Basic Scan',
    price: 4.99,
    priceId: '', // Set from Stripe
    features: ['Flag detection', 'Identifies potential issues'],
    description: 'Flag detection only \u2014 shows what\'s potentially wrong',
  },
  {
    id: 'full',
    name: 'Full Report',
    price: 9.99,
    priceId: '',
    features: ['Everything in Basic', 'Plain English explanations', 'Severity ratings', 'Estimated financial impact'],
    description: 'Flags + plain English explanation + severity ratings',
  },
  {
    id: 'full-dispute',
    name: 'Full Report + Dispute',
    price: 14.99,
    priceId: '',
    features: ['Everything in Full Report', 'Dispute letter template', 'Local resource directory', 'Recommended next steps'],
    description: 'Everything above + dispute letter template + local resource directory',
  },
] as const

export type DocumentType = typeof DOCUMENT_TYPES[number]['id']
export type CountryCode = typeof COUNTRIES[number]['code']
export type TierId = typeof TIERS[number]['id']
