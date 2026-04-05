import { Shield, FileSearch, Brain, Scale } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold mb-6">About JargonScan</h1>

        <div className="prose prose-invert max-w-none space-y-6 text-brand-gray-300">
          <p className="text-lg text-brand-gray-400">
            Every year, billions of dollars in errors, overcharges, and violations hide in the fine print
            of medical bills, debt collection letters, insurance denials, and other consumer documents.
            Most people don't have the time, expertise, or energy to catch them.
          </p>

          <p>
            JargonScan is an AI-powered document audit tool that reads your documents and flags what
            doesn't look right — in plain English.
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-12">
            {[
              { icon: FileSearch, title: 'What we do', desc: 'We scan consumer documents for potential errors, overcharges, and violations of consumer protection laws.' },
              { icon: Brain, title: 'How it works', desc: 'Our AI analyzes your document against published rates, regulations, and standard practices specific to your document type and country.' },
              { icon: Scale, title: 'What we are NOT', desc: 'We are not a law firm. We do not provide legal advice or legal representation. Our findings are for informational purposes only.' },
              { icon: Shield, title: 'Your privacy', desc: 'Documents are encrypted in transit, processed by AI, and permanently deleted after analysis. We never use your data for training.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card">
                <Icon className="w-8 h-8 text-brand-red mb-3" />
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-brand-gray-400 text-sm">{desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-white">Supported document types</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Medical Bills</li>
            <li>Debt Collection Letters</li>
            <li>Insurance Denials</li>
            <li>HOA Fines</li>
            <li>Landlord/Tenant Disputes</li>
            <li>Bank Fees</li>
            <li>Airline/Travel Claims</li>
          </ul>

          <h2 className="text-2xl font-bold text-white">Supported countries</h2>
          <p>
            United States, United Kingdom, Australia, Canada, New Zealand, Ireland, and South Africa.
            Each country scan includes regulations specific to that jurisdiction.
          </p>

          <div className="card bg-brand-gray-900 mt-12">
            <p className="text-brand-gray-500 text-sm">
              <strong className="text-brand-gray-400">Important disclaimer:</strong> JargonScan is not a law firm and does not provide legal advice.
              The information provided by JargonScan is for informational purposes only and should not be construed as legal advice on any matter.
              Consult a qualified attorney or professional for advice regarding your specific situation.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
