import Anthropic from '@anthropic-ai/sdk'
import { getSystemPrompt } from '../prompts/index.js'

const client = new Anthropic()

interface AnalysisFlag {
  flag_title: string
  severity: 'high' | 'medium' | 'low'
  plain_english: string
  estimated_impact: string
  regulation_cited: string
  recommended_action: string
}

export async function analyzeDocument(
  text: string,
  documentType: string,
  country: string,
  tier: string
): Promise<AnalysisFlag[]> {
  const systemPrompt = getSystemPrompt(documentType, country)

  const tierInstruction = tier === 'basic'
    ? '\n\nIMPORTANT: This is a BASIC scan. Return ONLY flag_title and severity for each flag. Leave plain_english, estimated_impact, regulation_cited, and recommended_action as empty strings.'
    : ''

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    system: systemPrompt + tierInstruction,
    messages: [
      {
        role: 'user',
        content: `Please analyze the following document and identify any potential issues, errors, overcharges, or violations:\n\n${text}`,
      },
    ],
  })

  const content = response.content[0]
  if (content.type !== 'text') {
    return []
  }

  try {
    // Extract JSON from response — handle potential markdown code blocks
    let jsonStr = content.text.trim()
    if (jsonStr.startsWith('```')) {
      jsonStr = jsonStr.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '')
    }
    const flags: AnalysisFlag[] = JSON.parse(jsonStr)
    return Array.isArray(flags) ? flags : []
  } catch {
    console.error('Failed to parse AI response:', content.text.substring(0, 200))
    return []
  }
}
