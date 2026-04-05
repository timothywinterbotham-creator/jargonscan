import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FileText, Clock, ArrowRight, CreditCard } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { api } from '../lib/api'
import { DOCUMENT_TYPES, COUNTRIES } from '../lib/constants'

interface Scan {
  id: string
  documentType: string
  country: string
  tier: string
  status: string
  createdAt: string
  _count: { flags: number }
}

export default function DashboardPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [scans, setScans] = useState<Scan[]>([])
  const [credits, setCredits] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    Promise.all([
      api.getScans().then(({ scans }) => setScans(scans)),
      api.getCredits().then(({ balance }) => setCredits(balance)).catch(() => {}),
    ]).finally(() => setLoading(false))
  }, [user, navigate])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-brand-red border-t-transparent rounded-full" />
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
            <p className="text-brand-gray-400 mt-1">{user?.email}</p>
          </div>
          <Link to="/scan" className="btn-primary inline-flex items-center gap-2">
            New Scan <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div className="card">
            <div className="text-2xl font-bold">{scans.length}</div>
            <div className="text-brand-gray-500 text-sm">Total Scans</div>
          </div>
          <div className="card">
            <div className="text-2xl font-bold text-brand-red">
              {scans.reduce((sum, s) => sum + (s._count?.flags || 0), 0)}
            </div>
            <div className="text-brand-gray-500 text-sm">Issues Found</div>
          </div>
          <div className="card">
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-brand-gray-500" />
              <div className="text-2xl font-bold">{credits}</div>
            </div>
            <div className="text-brand-gray-500 text-sm">Credits</div>
          </div>
        </div>

        {/* Scan history */}
        <h2 className="text-xl font-bold mb-4">Scan History</h2>
        {scans.length === 0 ? (
          <div className="card text-center py-12">
            <FileText className="w-10 h-10 text-brand-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No scans yet</h3>
            <p className="text-brand-gray-400 mb-4">Upload your first document to get started.</p>
            <Link to="/scan" className="btn-primary inline-block">Scan Document</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {scans.map((scan) => {
              const docType = DOCUMENT_TYPES.find(d => d.id === scan.documentType)
              const country = COUNTRIES.find(c => c.code === scan.country)
              return (
                <Link
                  key={scan.id}
                  to={scan.status === 'completed' ? `/results/${scan.id}` : `/processing/${scan.id}`}
                  className="card flex items-center justify-between hover:border-brand-gray-600 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <FileText className="w-8 h-8 text-brand-gray-500" />
                    <div>
                      <div className="font-medium">{docType?.label || scan.documentType}</div>
                      <div className="text-brand-gray-500 text-sm flex items-center gap-2">
                        <span>{country?.flag} {country?.name}</span>
                        <span>&middot;</span>
                        <Clock className="w-3 h-3" />
                        <span>{new Date(scan.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      scan.status === 'completed'
                        ? 'bg-green-500/10 text-green-400 border border-green-500/30'
                        : scan.status === 'failed'
                          ? 'bg-red-500/10 text-red-400 border border-red-500/30'
                          : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30'
                    }`}>
                      {scan.status}
                    </span>
                    {scan._count?.flags > 0 && (
                      <span className="text-sm font-medium text-brand-red">{scan._count.flags} flags</span>
                    )}
                    <ArrowRight className="w-4 h-4 text-brand-gray-500" />
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
