import { Link } from 'react-router-dom'
import { Shield } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-brand-darker border-t border-brand-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-6 h-6 text-brand-red" />
              <span className="text-lg font-bold">JargonScan</span>
            </div>
            <p className="text-brand-gray-500 text-sm">
              They hide it in the jargon. We find it.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-brand-gray-400">Product</h4>
            <div className="space-y-2">
              <Link to="/scan" className="block text-brand-gray-500 hover:text-white text-sm transition-colors">Scan Document</Link>
              <Link to="/pricing" className="block text-brand-gray-500 hover:text-white text-sm transition-colors">Pricing</Link>
              <Link to="/about" className="block text-brand-gray-500 hover:text-white text-sm transition-colors">About</Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-brand-gray-400">Legal</h4>
            <div className="space-y-2">
              <Link to="/terms" className="block text-brand-gray-500 hover:text-white text-sm transition-colors">Terms of Service</Link>
              <Link to="/privacy" className="block text-brand-gray-500 hover:text-white text-sm transition-colors">Privacy Policy</Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-brand-gray-400">Support</h4>
            <div className="space-y-2">
              <a href="mailto:support@jargonscan.com" className="block text-brand-gray-500 hover:text-white text-sm transition-colors">support@jargonscan.com</a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-brand-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-brand-gray-600 text-xs">
              &copy; {new Date().getFullYear()} JargonScan. All rights reserved.
            </p>
            <p className="text-brand-gray-600 text-xs text-center">
              JargonScan is not a law firm and does not provide legal advice. Findings are for informational purposes only.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
