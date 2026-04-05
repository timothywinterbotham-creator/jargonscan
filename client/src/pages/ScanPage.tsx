import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDropzone } from 'react-dropzone'
import { Upload, FileText, X, Check } from 'lucide-react'
import { DOCUMENT_TYPES, COUNTRIES, TIERS } from '../lib/constants'
import type { DocumentType, CountryCode, TierId } from '../lib/constants'
import { api } from '../lib/api'

export default function ScanPage() {
  const navigate = useNavigate()
  const [docType, setDocType] = useState<DocumentType | ''>('')
  const [country, setCountry] = useState<CountryCode>('US')
  const [tier, setTier] = useState<TierId>('full-dispute')
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onDrop = useCallback((accepted: File[]) => {
    if (accepted.length > 0) {
      setFile(accepted[0])
      setError('')
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/heic': ['.heic'],
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
  })

  const handleSubmit = async () => {
    if (!file || !docType) {
      setError('Please select a document type and upload a file.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('documentType', docType)
      formData.append('country', country)
      formData.append('tier', tier)

      const { scan } = await api.createScan(formData)

      // Redirect to payment
      const { url } = await api.createCheckout({ scanId: scan.id, tier })
      window.location.href = url
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Scan a Document</h1>
        <p className="text-brand-gray-400 mb-8">
          Upload your document and our AI will scan it for errors, violations, and overcharges.
        </p>

        {/* Document type */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-3">Document Type</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {DOCUMENT_TYPES.map((dt) => (
              <button
                key={dt.id}
                onClick={() => setDocType(dt.id)}
                className={`card !p-3 text-left text-sm transition-all ${
                  docType === dt.id
                    ? 'border-brand-red bg-brand-red/5'
                    : 'hover:border-brand-gray-600'
                }`}
              >
                <div className="flex items-center gap-2">
                  {docType === dt.id && <Check className="w-4 h-4 text-brand-red shrink-0" />}
                  <span className={docType === dt.id ? 'text-white' : 'text-brand-gray-400'}>{dt.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Country */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-3">Country</label>
          <div className="flex flex-wrap gap-2">
            {COUNTRIES.map((c) => (
              <button
                key={c.code}
                onClick={() => setCountry(c.code)}
                className={`card !px-4 !py-2 text-sm transition-all ${
                  country === c.code
                    ? 'border-brand-red bg-brand-red/5'
                    : 'hover:border-brand-gray-600'
                }`}
              >
                <span>{c.flag} {c.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* File upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-3">Upload Document</label>
          {file ? (
            <div className="card flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-brand-red" />
                <div>
                  <p className="font-medium text-sm">{file.name}</p>
                  <p className="text-brand-gray-500 text-xs">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <button onClick={() => setFile(null)} className="text-brand-gray-500 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div
              {...getRootProps()}
              className={`card border-dashed border-2 cursor-pointer text-center py-12 transition-colors ${
                isDragActive ? 'border-brand-red bg-brand-red/5' : 'border-brand-gray-700 hover:border-brand-gray-500'
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="w-10 h-10 text-brand-gray-500 mx-auto mb-3" />
              <p className="text-brand-gray-400 mb-1">
                {isDragActive ? 'Drop your document here' : 'Drag & drop your document here'}
              </p>
              <p className="text-brand-gray-600 text-sm">PDF, JPG, PNG, or HEIC — up to 10MB</p>
            </div>
          )}
        </div>

        {/* Tier selection */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-3">Scan Tier</label>
          <div className="space-y-3">
            {TIERS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTier(t.id)}
                className={`card w-full text-left transition-all ${
                  tier === t.id
                    ? 'border-brand-red bg-brand-red/5'
                    : 'hover:border-brand-gray-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-brand-gray-400 text-sm">{t.description}</div>
                  </div>
                  <div className="text-xl font-bold">${t.price.toFixed(2)}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading || !file || !docType}
          className="btn-primary w-full text-lg !py-4"
        >
          {loading ? 'Processing...' : `Scan Document — $${TIERS.find(t => t.id === tier)?.price.toFixed(2)}`}
        </button>

        <p className="text-brand-gray-600 text-xs text-center mt-4">
          Your document is encrypted during upload and deleted after analysis.
        </p>
      </div>
    </div>
  )
}
