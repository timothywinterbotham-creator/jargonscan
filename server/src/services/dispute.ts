interface Flag {
  flag_title: string
  severity: string
  plain_english: string
  estimated_impact: string
  regulation_cited: string
  recommended_action: string
}

interface Scan {
  id: string
  documentType: string
  country: string
}

const DOC_TYPE_LABELS: Record<string, string> = {
  'medical-bill': 'Medical Bill',
  'debt-collection': 'Debt Collection Letter',
  'insurance-denial': 'Insurance Denial',
  'hoa-fine': 'HOA Fine',
  'landlord-dispute': 'Landlord/Tenant Notice',
  'bank-fee': 'Bank Fee',
  'airline-claim': 'Airline/Travel Claim',
}

const RECIPIENT_LABELS: Record<string, string> = {
  'medical-bill': 'Billing Department',
  'debt-collection': 'Collections Manager',
  'insurance-denial': 'Claims Department',
  'hoa-fine': 'HOA Board / Management Company',
  'landlord-dispute': 'Property Manager / Landlord',
  'bank-fee': 'Customer Service Department',
  'airline-claim': 'Customer Relations Department',
}

export function generateDisputeLetter(scan: Scan, flags: Flag[]): string {
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const docLabel = DOC_TYPE_LABELS[scan.documentType] || 'Document'
  const recipient = RECIPIENT_LABELS[scan.documentType] || 'To Whom It May Concern'
  const highFlags = flags.filter(f => f.severity === 'high')
  const mediumFlags = flags.filter(f => f.severity === 'medium')
  const allDisputableFlags = [...highFlags, ...mediumFlags]

  let letter = `${today}

To: ${recipient}

RE: Formal Dispute — ${docLabel}
Reference: JargonScan Report #${scan.id.substring(0, 8).toUpperCase()}

Dear ${recipient},

I am writing to formally dispute the following items identified in the ${docLabel.toLowerCase()} I received. After careful review, I have identified ${allDisputableFlags.length} item(s) that appear to contain errors, overcharges, or potential violations of applicable regulations.

I respectfully request that you review and address each of the following issues:

`

  allDisputableFlags.forEach((flag, i) => {
    letter += `--- Issue ${i + 1}: ${flag.flag_title} ---
Severity: ${flag.severity.toUpperCase()}
Description: ${flag.plain_english}
${flag.estimated_impact ? `Estimated Impact: ${flag.estimated_impact}` : ''}
${flag.regulation_cited ? `Applicable Regulation: ${flag.regulation_cited}` : ''}
${flag.recommended_action ? `Requested Action: ${flag.recommended_action}` : ''}

`
  })

  letter += `I request that you:

1. Provide a detailed, itemized response to each issue raised above
2. Correct any errors identified and issue an adjusted statement
3. Confirm receipt of this dispute in writing within 30 days
4. Cease any collection activity on disputed amounts until resolved

${scan.documentType === 'debt-collection' ? `Please note: Under applicable debt collection laws, you are required to cease collection efforts on the disputed amounts until you have provided adequate verification of the debt.\n\n` : ''}${scan.documentType === 'medical-bill' ? `Please note: I am requesting an itemized statement with all CPT/HCPCS codes, descriptions, and individual charges if not already provided.\n\n` : ''}I reserve all rights under applicable consumer protection laws. If this matter is not resolved satisfactorily, I may file complaints with the relevant regulatory authorities.

Please respond to this dispute within 30 days of receipt.

Sincerely,

[YOUR NAME]
[YOUR ADDRESS]
[YOUR PHONE NUMBER]
[YOUR EMAIL]

---
This dispute letter was generated with assistance from JargonScan (jargonscan.com).
JargonScan is not a law firm and does not provide legal advice.
This letter is for informational purposes only. Consult a qualified professional for legal guidance.
`

  return letter
}
