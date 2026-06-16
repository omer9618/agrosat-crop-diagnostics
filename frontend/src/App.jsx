import { useState } from 'react'
import LandingPage from './components/LandingPage'
import Dashboard from './components/Dashboard'

/**
 * Root application — manages which "page" is active.
 * LandingPage → Dashboard (no router needed for this showcase).
 */
export default function App() {
  const [currentPage, setCurrentPage] = useState('landing') // 'landing' | 'dashboard'

  return (
    <div className="min-h-screen" style={{backgroundColor:'#f5fbf5'}}>
      {currentPage === 'landing' ? (
        <LandingPage onEnterDashboard={() => setCurrentPage('dashboard')} />
      ) : (
        <Dashboard onBackToLanding={() => setCurrentPage('landing')} />
      )}
    </div>
  )
}
