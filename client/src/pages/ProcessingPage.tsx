import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Shield, FileSearch, Brain, CheckCircle } from 'lucide-react'
import { api } from '../lib/api'

const STEPS = [
  { icon: FileSearch, label: 'Extracting text from document...' },
  { icon: Brain, label: 'Analyzing against consumer protection laws...' },
  { icon: Shield, label: 'Generating findings report...' },
  { icon: CheckCircle, label: 'Complete!' },
]

export default function ProcessingPage() {
  const { scanId } = useParams()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (!scanId) return

    const poll = setInterval(async () => {
      try {
        const { scan } = await api.getScan(scanId)
        if (scan.status === 'completed') {
          setStep(3)
          clearInterval(poll)
          setTimeout(() => navigate(`/results/${scanId}`), 1000)
        } else if (scan.status === 'analyzing') {
          setStep(1)
        } else if (scan.status === 'generating') {
          setStep(2)
        } else if (scan.status === 'failed') {
          clearInterval(poll)
          navigate(`/results/${scanId}`)
        }
      } catch {
        // Keep polling
      }
    }, 2000)

    // Animate steps if still waiting
    const timer = setInterval(() => {
      setStep((s) => (s < 2 ? s + 1 : s))
    }, 4000)

    return () => {
      clearInterval(poll)
      clearInterval(timer)
    }
  }, [scanId, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full border-2 border-brand-red/20 animate-ping" />
          <div className="absolute inset-2 rounded-full border-2 border-brand-red/40 animate-pulse" />
          <div className="absolute inset-4 rounded-full bg-brand-red/10 flex items-center justify-center">
            <Shield className="w-8 h-8 text-brand-red animate-scan-pulse" />
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-2">Scanning your document</h2>
        <p className="text-brand-gray-400 mb-8">This usually takes 15-30 seconds</p>

        <div className="space-y-4">
          {STEPS.map((s, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 transition-all duration-500 ${
                i <= step ? 'opacity-100' : 'opacity-20'
              }`}
            >
              <s.icon className={`w-5 h-5 shrink-0 ${
                i < step ? 'text-green-400' : i === step ? 'text-brand-red' : 'text-brand-gray-600'
              }`} />
              <span className={`text-sm ${
                i <= step ? 'text-white' : 'text-brand-gray-600'
              }`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
