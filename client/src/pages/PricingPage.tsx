import { Link } from 'react-router-dom'
import { TIERS } from '../lib/constants'
import { Check } from 'lucide-react'

export default function PricingPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Simple, transparent pricing</h1>
          <p className="text-brand-gray-400 text-lg">Pay per scan. No subscription. No hidden fees.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {TIERS.map((tier, i) => (
            <div key={tier.id} className={`card ${i === 2 ? 'border-brand-red/50 ring-1 ring-brand-red/20 relative' : ''}`}>
              {i === 2 && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-red text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-bold mb-1">{tier.name}</h3>
              <div className="text-4xl font-bold mb-2">${tier.price.toFixed(2)}</div>
              <p className="text-brand-gray-500 text-sm mb-6">per document scan</p>
              <p className="text-brand-gray-400 text-sm mb-6">{tier.description}</p>
              <ul className="space-y-3 mb-8">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-brand-red mt-0.5 shrink-0" />
                    <span className="text-brand-gray-300">{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/scan"
                className={`block text-center ${i === 2 ? 'btn-primary' : 'btn-secondary'} w-full`}
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-16 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently asked questions</h2>
          <div className="space-y-4">
            {[
              { q: 'Is this legal advice?', a: 'No. JargonScan is a document analysis tool that flags potential issues based on publicly available consumer protection laws. We are not a law firm and do not provide legal advice. Always consult a qualified professional for legal guidance.' },
              { q: 'What happens to my documents?', a: 'Your documents are encrypted during upload, processed by our AI, and permanently deleted from our servers after analysis is complete. We never use your data for AI training.' },
              { q: 'Can I get a refund?', a: 'If our system fails to process your document or produces no results, we will refund your payment in full. Contact support@jargonscan.com.' },
              { q: 'Which file formats are supported?', a: 'We support PDF, JPG, PNG, and HEIC files up to 10MB. For best results, upload clear, legible documents.' },
            ].map(({ q, a }) => (
              <div key={q} className="card">
                <h3 className="font-semibold mb-2">{q}</h3>
                <p className="text-brand-gray-400 text-sm">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
