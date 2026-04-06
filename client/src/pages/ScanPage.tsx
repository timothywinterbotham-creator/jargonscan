import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDropzone } from 'react-dropzone'
import { Upload, FileText, X, Check, AlertCircle } from 'lucide-react'
import { DOCUMENT_TYPES, COUNTRIES } from '../lib/constants'
import type { DocumentType, CountryCode } from '../lib/constants'
import { api } from '../lib/api'

export default function ScanPage() {
  const navigate = useNavigate()
  const [docType, setDocType] = useState<DocumentType | ''>('')
  const [country, setCountry] = useState<CountryCode>('US')
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [attempted, setAttempted] = useState(false)

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
    maxSize: 10 * 1024 * 1024,
  })

  const handleSubmit = async () => {
    setAttempted(true)

    if (!file || !docType) {
      setError(!docType && !file
        ? 'Please select a document type and upload a file.'
        : !docType
        ? 'Please select a document type above.'
        : 'Please upload a document.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('documentType', docType)
      formData.append('country', country)
      formData.append('tier', 'full-dispute')

      const { scan } = await api.createScan(formData)
      await api.triggerAnalysis(scan.id)
      navigate(`/processing/${scan.id}`)
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  const missingDocType = !docType
  const missingFile = !file
  const showDocTypeHint = missingDocType && (attempted || file !== null)
  const showFileHint = missingFile && (attempted || docType !== '')

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Scan a Document</h1>
        <p className="text-brand-gray-400 mb-8">
          Upload your document and our AI will scan it for errors, violations, and overcharges.
        </p>

        {/* Step 1: Document type */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
              docType ? 'bg-green-500/20 text-green-400' : 'bg-brand-red/20 text-brand-red'
            }`}>1</span>
            <label className="text-sm font-medium">Select Document Type</label>
            {showDocTypeHint && (
              <span className="flex items-center gap-1 text-amber-400 text-xs animate-pulse">
                <AlertCircle className="w-3.5 h-3.5" />
                Please select a category
              </span>
            )}
            {docType && <Check className="w-4 h-4 text-green-400" />}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {DOCUMENT_TYPES.map((dt) => (
              <button
                key={dt.id}
                onClick={() => setDocType(dt.id)}
                className={`card !p-3 text-left text-sm transition-all ${
                  docType === dt.id
                    ? 'border-brand-red bg-brand-red/5'
                    : showDocTypeHint
                    ? 'border-amber-500/50 hover:border-amber-400'
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

        {/* Step 2: Country */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold bg-green-500/20 text-green-400">2</span>
            <label className="text-sm font-medium">Select Country</label>
            <Check className="w-4 h-4 text-green-400" />
          </div>
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

        {/* Step 3: File upload */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
              file ? 'bg-green-500/20 text-green-400' : 'bg-brand-red/20 text-brand-red'
            }`}>3</span>
            <label className="text-sm font-medium">Upload Document</label>
            {showFileHint && (
              <span className="flex items-center gap-1 text-amber-400 text-xs animate-pulse">
                <AlertCircle className="w-3.5 h-3.5" />
                Please upload a file
              </span>
            )}
            {file && <Check className="w-4 h-4 text-green-400" />}
          </div>
          {file ? (
            <div className="card flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-brand-red" />
                <div>
                  <p className="font-medium text-sm">{file.name}</p>
                  <p className="text-brand-gray-500 text-xs">{(file.size / 1024).toFixed(1)} KB</p>
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
                isDragActive ? 'border-brand-red bg-brand-red/5'
                : showFileHint ? 'border-amber-500/50 hover:border-amber-400'
                : 'border-brand-gray-700 hover:border-brand-gray-500'
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

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full text-lg !py-4 rounded-lg font-semibold transition-all ${
            loading
              ? 'bg-brand-red/50 text-white/50 cursor-not-allowed'
              : missingDocType || missingFile
              ? 'bg-brand-red/70 text-white hover:bg-brand-red cursor-pointer'
              : 'bg-brand-red text-white hover:bg-red-600 cursor-pointer'
          }`}
        >
          {loading ? 'Scanning...' : missingDocType || missingFile ? 'Scan Document' : 'Scan Document'}
        </button>

        {/* Checklist hint under button when incomplete */}
        {(missingDocType || missingFile) && !loading && (
          <div className="mt-3 text-center text-xs text-brand-gray-500">
            {missingDocType && missingFile
              ? 'Select a document type and upload a file to continue'
              : missingDocType
              ? 'Select a document type above to continue'
              : 'Upload a document above to continue'}
          </div>
        )}

        <p className="text-brand-gray-600 text-xs text-center mt-4">
          Your document is encrypted during upload and deleted after analysis.
        </p>
      </div>
    </div>
  )
}
