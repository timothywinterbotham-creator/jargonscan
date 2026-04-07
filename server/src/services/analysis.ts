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

export async function generateSummary(
  text: string,
  documentType: string,
  country: string
): Promise<string> {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    system: `You are a plain-language document summarizer for JargonScan. Your job is to explain what this document says in simple, everyday English — no jargon, no legal terms. Write as if explaining to someone with no background in ${documentType.replace('-', ' ')} documents. Be concise but thorough. Cover: what the document is, who sent it, what they're asking for, key amounts/dates, and anything the reader should pay attention to. Use short paragraphs. Do NOT list errors or flags — just summarize what the document says.`,
    messages: [
      {
        role: 'user',
        content: `Please provide a plain-English summary of this document:\n\n${text}`,
      },
    ],
  })

  const content = response.content[0]
  return content.type === 'text' ? content.text : 'Unable to generate summary.'
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
