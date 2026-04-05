import { basePrompts } from './base.js'
import { countryOverlays } from './countries.js'

export function getSystemPrompt(documentType: string, country: string): string {
  const base = basePrompts[documentType]
  if (!base) {
    return basePrompts['medical-bill'] // Fallback
  }

  const overlay = countryOverlays[country]?.[documentType] || ''

  return `${base}

${overlay ? `\n\nCOUNTRY-SPECIFIC REGULATIONS (${country}):\n${overlay}` : ''}

For each flag return ONLY a valid JSON array of objects with this structure:
{
  "flag_title": "",
  "severity": "high|medium|low",
  "plain_english": "",
  "estimated_impact": "",
  "regulation_cited": "",
  "recommended_action": ""
}

Return ONLY valid JSON array. No preamble. No explanation outside JSON. If no issues found, return an empty array [].`
}
