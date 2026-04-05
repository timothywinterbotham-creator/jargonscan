import { Link } from 'react-router-dom'
import { Shield, Upload, Zap, FileCheck, ArrowRight, Stethoscope, FileWarning, ShieldX, Building2, Home, Landmark, Plane } from 'lucide-react'
import { TIERS, COUNTRIES } from '../lib/constants'

const DOC_TYPES = [
  { icon: Stethoscope, label: 'Medical Bills' },
  { icon: FileWarning, label: 'Debt Collection' },
  { icon: ShieldX, label: 'Insurance Denials' },
  { icon: Building2, label: 'HOA Fines' },
  { icon: Home, label: 'Landlord Disputes' },
  { icon: Landmark, label: 'Bank Fees' },
  { icon: Plane, label: 'Airline Claims' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-red/5 to-transparent" />
        <div className="max-w-5xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-brand-red/10 border border-brand-red/20 rounded-full px-4 py-1.5 mb-6">
            <Shield className="w-4 h-4 text-brand-red" />
            <span className="text-sm text-brand-red font-medium">AI-Powered Document Audit</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            They hide it in the<br />
            <span className="text-brand-red">jargon.</span>{' '}
            We find it.
          </h1>
          <p className="text-xl text-brand-gray-400 max-w-2xl mx-auto mb-10">
            Upload your medical bills, debt letters, insurance denials, and more.
            Our AI scans for errors, violations, and overcharges — in plain English.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/scan" className="btn-primary text-lg !px-8 !py-4 inline-flex items-center gap-2 justify-center">
              Upload Your Document <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/pricing" className="btn-secondary text-lg !px-8 !py-4 inline-flex items-center justify-center">
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Document type ticker */}
      <section className="py-8 border-y border-brand-gray-800 overflow-hidden">
        <div className="flex animate-ticker">
          {[...DOC_TYPES, ...DOC_TYPES].map((doc, i) => (
            <div key={i} className="flex items-center gap-3 px-8 shrink-0">
              <doc.icon className="w-5 h-5 text-brand-red" />
              <span className="text-brand-gray-400 font-medium whitespace-nowrap">{doc.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            How it works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Upload, title: 'Upload', desc: 'Upload your document — PDF or photo. Select the document type and your country.' },
              { icon: Zap, title: 'AI Scans', desc: 'Our AI analyzes your document against consumer protection laws and known billing patterns.' },
              { icon: FileCheck, title: 'Get Results', desc: 'Receive plain English flags with severity ratings, estimated impact, and recommended actions.' },
            ].map((step, i) => (
              <div key={i} className="card text-center">
                <div className="w-14 h-14 rounded-full bg-brand-red/10 flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-7 h-7 text-brand-red" />
                </div>
                <div className="text-brand-gray-500 text-sm font-mono mb-2">Step {i + 1}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-brand-gray-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Document types */}
      <section className="py-20 px-4 bg-brand-darker">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            What we scan
          </h2>
          <p className="text-brand-gray-400 text-center mb-12 max-w-2xl mx-auto">
            From hospital bills to airline claims, we check your documents against publicly available consumer protection laws.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {DOC_TYPES.map((doc, i) => (
              <Link key={i} to="/scan" className="card hover:border-brand-red/30 transition-colors text-center group">
                <doc.icon className="w-8 h-8 text-brand-gray-500 group-hover:text-brand-red transition-colors mx-auto mb-3" />
                <span className="text-sm font-medium">{doc.label}</span>
              </Link>
            ))}
            <div className="card text-center flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-brand-red">7</span>
              <span className="text-sm text-brand-gray-400">Countries</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Simple pricing
          </h2>
          <p className="text-brand-gray-400 text-center mb-12">
            Pay per scan. No subscription required.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {TIERS.map((tier, i) => (
              <div key={tier.id} className={`card ${i === 2 ? 'border-brand-red/50 ring-1 ring-brand-red/20' : ''}`}>
                {i === 2 && (
                  <div className="text-brand-red text-xs font-semibold uppercase tracking-wider mb-2">Most Popular</div>
                )}
                <h3 className="text-xl font-bold mb-1">{tier.name}</h3>
                <div className="text-3xl font-bold mb-4">${tier.price.toFixed(2)}</div>
                <p className="text-brand-gray-400 text-sm mb-6">{tier.description}</p>
                <ul className="space-y-2 mb-6">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-brand-gray-300">
                      <span className="text-brand-red mt-0.5">&#10003;</span> {f}
                    </li>
                  ))}
                </ul>
                <Link to="/scan" className={i === 2 ? 'btn-primary w-full text-center block' : 'btn-secondary w-full text-center block'}>
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Countries */}
      <section className="py-20 px-4 bg-brand-darker">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Available worldwide
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {COUNTRIES.map((c) => (
              <div key={c.code} className="card !px-6 !py-3 inline-flex items-center gap-2">
                <span className="text-2xl">{c.flag}</span>
                <span className="font-medium">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Stop overpaying. Start scanning.
          </h2>
          <p className="text-brand-gray-400 mb-8">
            The average American medical bill contains at least one error. Don't pay for someone else's mistake.
          </p>
          <Link to="/scan" className="btn-primary text-lg !px-8 !py-4 inline-flex items-center gap-2">
            Scan Your First Document <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
