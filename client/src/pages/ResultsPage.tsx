import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { AlertTriangle, AlertCircle, Info, Download, ArrowLeft, FileText, Shield } from 'lucide-react'
import { api } from '../lib/api'
import { DOCUMENT_TYPES, COUNTRIES } from '../lib/constants'

interface Flag {
  id: string
  flag_title: string
  severity: 'high' | 'medium' | 'low'
  plain_english: string
  estimated_impact: string
  regulation_cited: string
  recommended_action: string
}

interface ScanResult {
  id: string
  documentType: string
  country: string
  tier: string
  status: string
  summary: string | null
  flags: Flag[]
  createdAt: string
}

const severityConfig = {
  high: { icon: AlertTriangle, color: 'severity-high', label: 'High' },
  medium: { icon: AlertCircle, color: 'severity-medium', label: 'Medium' },
  low: { icon: Info, color: 'severity-low', label: 'Low' },
}

export default function ResultsPage() {
  const { scanId } = useParams()
  const [scan, setScan] = useState<ScanResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState<'flags' | 'summary'>('flags')

  useEffect(() => {
    if (!scanId) return
    api.getScan(scanId)
      .then(({ scan }) => setScan(scan))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [scanId])

  const handleDownloadDispute = async () => {
    if (!scanId) return
    const res = await api.getDisputeLetter(scanId)
    if (!res.ok) return
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `dispute-letter-${scanId}.pdf`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-brand-red border-t-transparent rounded-full" />
      </div>
    )
  }

  if (error || !scan) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="card max-w-md text-center">
          <AlertTriangle className="w-10 h-10 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
          <p className="text-brand-gray-400 mb-4">{error || 'Scan not found'}</p>
          <Link to="/scan" className="btn-primary inline-block">Try Again</Link>
        </div>
      </div>
    )
  }

  const docType = DOCUMENT_TYPES.find(d => d.id === scan.documentType)
  const countryObj = COUNTRIES.find(c => c.code === scan.country)
  const highCount = scan.flags.filter(f => f.severity === 'high').length
  const mediumCount = scan.flags.filter(f => f.severity === 'medium').length
  const lowCount = scan.flags.filter(f => f.severity === 'low').length

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link to="/dashboard" className="text-brand-gray-400 hover:text-white text-sm inline-flex items-center gap-1 mb-4">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Scan Results</h1>
              <p className="text-brand-gray-400 mt-1">
                {docType?.label} &middot; {countryObj?.flag} {countryObj?.name} &middot;{' '}
                {new Date(scan.createdAt).toLocaleDateString()}
              </p>
            </div>
            {scan.tier === 'full-dispute' && scan.flags.length > 0 && (
              <button onClick={handleDownloadDispute} className="btn-primary inline-flex items-center gap-2 shrink-0">
                <Download className="w-4 h-4" /> Download Dispute Letter
              </button>
            )}
          </div>
        </div>

        {/* Severity counts */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="card text-center">
            <div className="text-2xl font-bold text-red-400">{highCount}</div>
            <div className="text-brand-gray-500 text-sm">High Severity</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-yellow-400">{mediumCount}</div>
            <div className="text-brand-gray-500 text-sm">Medium</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-blue-400">{lowCount}</div>
            <div className="text-brand-gray-500 text-sm">Low</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 border-b border-brand-gray-800">
          <button
            onClick={() => setActiveTab('flags')}
            className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'flags'
                ? 'border-brand-red text-white'
                : 'border-transparent text-brand-gray-500 hover:text-brand-gray-300'
            }`}
          >
            <Shield className="w-4 h-4" />
            Issues Found ({scan.flags.length})
          </button>
          <button
            onClick={() => setActiveTab('summary')}
            className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'summary'
                ? 'border-brand-red text-white'
                : 'border-transparent text-brand-gray-500 hover:text-brand-gray-300'
            }`}
          >
            <FileText className="w-4 h-4" />
            Plain English Summary
          </button>
        </div>

        {/* Tab content */}
        {activeTab === 'summary' ? (
          <div className="card">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-brand-red" />
              What This Document Says (No Jargon)
            </h3>
            {scan.summary ? (
              <div className="text-brand-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                {scan.summary}
              </div>
            ) : (
              <p className="text-brand-gray-500 text-sm italic">
                Summary not available for this scan. Summaries are generated for new scans automatically.
              </p>
            )}
          </div>
        ) : (
          <>
            {/* Flags */}
            {scan.flags.length === 0 ? (
              <div className="card text-center py-12">
                <Info className="w-10 h-10 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">No issues found</h3>
                <p className="text-brand-gray-400">Your document appears to be in order. No flags were detected.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {scan.flags
                  .sort((a, b) => {
                    const order = { high: 0, medium: 1, low: 2 }
                    return order[a.severity] - order[b.severity]
                  })
                  .map((flag) => {
                    const config = severityConfig[flag.severity]
                    const Icon = config.icon
                    return (
                      <div key={flag.id} className={`card border ${config.color}`}>
                        <div className="flex items-start gap-3">
                          <Icon className="w-5 h-5 mt-0.5 shrink-0" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold">{flag.flag_title}</h3>
                              <span className={`text-xs px-2 py-0.5 rounded-full border ${config.color} font-medium`}>
                                {config.label}
                              </span>
                            </div>

                            {(scan.tier === 'full' || scan.tier === 'full-dispute') && (
                              <>
                                <p className="text-brand-gray-300 text-sm mb-3">{flag.plain_english}</p>

                                {flag.estimated_impact && (
                                  <div className="text-sm mb-2">
                                    <span className="text-brand-gray-500">Estimated Impact:</span>{' '}
                                    <span className="font-semibold text-white">{flag.estimated_impact}</span>
                                  </div>
                                )}

                                <div className="text-sm mb-2">
                                  <span className="text-brand-gray-500">Regulation:</span>{' '}
                                  <span className="text-brand-gray-300">{flag.regulation_cited}</span>
                                </div>

                                <div className="text-sm">
                                  <span className="text-brand-gray-500">Recommended Action:</span>{' '}
                                  <span className="text-brand-gray-300">{flag.recommended_action}</span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
              </div>
            )}
          </>
        )}

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-brand-gray-900 border border-brand-gray-800 rounded-lg">
          <p className="text-brand-gray-500 text-xs leading-relaxed">
            <strong className="text-brand-gray-400">Disclaimer:</strong> JargonScan is not a law firm and does not provide legal advice.
            These findings are for informational purposes only. Consult a qualified professional for legal guidance.
            Document data is deleted after analysis is complete.
          </p>
        </div>

        {/* Resources (full-dispute tier) */}
        {scan.tier === 'full-dispute' && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Helpful Resources</h2>
            <div className="card">
              <p className="text-brand-gray-400 text-sm mb-4">
                Based on your document type and location, here are some resources that may help:
              </p>
              <div className="space-y-3" id="resources-list">
                <p className="text-brand-gray-500 text-sm">
                  Resources for your area will appear here after your scan is processed.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
