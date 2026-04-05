import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Shield, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-brand-darker/80 backdrop-blur-xl border-b border-brand-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-brand-red" />
            <span className="text-xl font-bold">JargonScan</span>
            <span className="bg-brand-red/10 border border-brand-red/30 text-brand-red text-[10px] font-semibold px-1.5 py-0.5 rounded-full leading-none">BETA</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/pricing" className="text-brand-gray-400 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link to="/about" className="text-brand-gray-400 hover:text-white transition-colors">
              About
            </Link>
            {user ? (
              <>
                <Link to="/dashboard" className="text-brand-gray-400 hover:text-white transition-colors">
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="text-brand-gray-400 hover:text-white transition-colors">
                  Log out
                </button>
              </>
            ) : (
              <Link to="/login" className="text-brand-gray-400 hover:text-white transition-colors">
                Log in
              </Link>
            )}
            <Link to="/scan" className="btn-primary text-sm !py-2 !px-4">
              Scan Document
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link to="/pricing" className="block py-2 text-brand-gray-400 hover:text-white" onClick={() => setMobileOpen(false)}>Pricing</Link>
            <Link to="/about" className="block py-2 text-brand-gray-400 hover:text-white" onClick={() => setMobileOpen(false)}>About</Link>
            {user ? (
              <>
                <Link to="/dashboard" className="block py-2 text-brand-gray-400 hover:text-white" onClick={() => setMobileOpen(false)}>Dashboard</Link>
                <button onClick={() => { handleLogout(); setMobileOpen(false) }} className="block py-2 text-brand-gray-400 hover:text-white">Log out</button>
              </>
            ) : (
              <Link to="/login" className="block py-2 text-brand-gray-400 hover:text-white" onClick={() => setMobileOpen(false)}>Log in</Link>
            )}
            <Link to="/scan" className="block btn-primary text-center text-sm !py-2" onClick={() => setMobileOpen(false)}>Scan Document</Link>
          </div>
        )}
      </div>
    </nav>
  )
}
