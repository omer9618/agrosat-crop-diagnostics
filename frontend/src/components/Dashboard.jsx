import { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import MetricCards from './MetricCards'
import NdviChart from './NdviChart'
import AiInsightsPanel from './AiInsightsPanel'
import FieldMap from './FieldMap'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const FIELDS = [
  { id: 'field-alpha', label: 'Field Alpha', crop: 'Wheat',  emoji: '🌾' },
  { id: 'field-beta',  label: 'Field Beta',  crop: 'Cotton', emoji: '🌿' },
  { id: 'field-gamma', label: 'Field Gamma', crop: 'Maize',  emoji: '🌽' },
]

export default function Dashboard({ onBackToLanding }) {
  const [selectedField, setSelectedField] = useState('field-alpha')
  const [cropData, setCropData]           = useState(null)
  const [loading, setLoading]             = useState(true)
  const [error, setError]                 = useState(null)
  const [lastUpdated, setLastUpdated]     = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`${API_BASE}/api/crop-health/${selectedField}`, { signal: controller.signal })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        setCropData(data)
        setLastUpdated(new Date())
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
    return () => controller.abort()
  }, [selectedField])

  const fieldMeta = FIELDS.find(f => f.id === selectedField)
  const status    = cropData?.ai_insights?.status ?? null

  const statusChip = status === 'Healthy' ? 'chip-healthy'
    : status === 'Warning' ? 'chip-warning'
    : 'chip-critical'

  return (
    <div className="min-h-screen bg-surface flex flex-col">

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-20 bg-surface/90 backdrop-blur-glass border-b border-outline-v/40 px-4 py-3 lg:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToLanding}
            className="flex items-center gap-1.5 text-sm font-medium text-on-surface-v hover:text-primary transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            <span className="hidden sm:inline">Back</span>
          </button>

          <div className="w-px h-5 bg-outline-v"/>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M12 2C6 2 3 8 3 12s3 6 6 8M12 2c6 0 9 6 9 10s-3 6-6 8M12 2v20"/>
              </svg>
            </div>
            <span className="font-display font-bold text-lg text-on-surface tracking-tight hidden sm:inline">
              Agro<span className="text-gradient-green">Sat</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 glass-card-sm px-3 py-1.5 text-sm font-medium text-emerald-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"/>
            Live
          </div>
          {lastUpdated && (
            <span className="hidden lg:block text-xs text-outline">
              Updated {lastUpdated.toLocaleTimeString()}
            </span>
          )}
          {status && (
            <span className={`chip ${statusChip} text-xs`}>{status}</span>
          )}
        </div>
      </header>

      {/* ── Layout ──────────────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar fields={FIELDS} selectedField={selectedField} onSelectField={setSelectedField} cropData={cropData} loading={loading}/>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6 bg-surface-low">

          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center justify-center min-h-96 gap-6">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-4 border-surface-high"/>
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-emerald-500 animate-spin"/>
                <div className="absolute inset-3 rounded-full bg-emerald-50 flex items-center justify-center text-xl">
                  🛰️
                </div>
              </div>
              <div>
                <p className="text-center font-display font-bold text-on-surface">Acquiring satellite data</p>
                <p className="text-center text-sm text-on-surface-v mt-1">{fieldMeta?.label}</p>
              </div>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="flex flex-col items-center justify-center min-h-96 gap-5">
              <div className="glass-card p-10 max-w-md w-full text-center">
                <div className="text-5xl mb-4">📡</div>
                <h3 className="font-display font-bold text-xl text-on-surface mb-2">Cannot reach backend</h3>
                <p className="text-sm text-on-surface-v mb-1">
                  Make sure FastAPI is running at <code className="bg-surface-mid px-1.5 py-0.5 rounded text-primary">localhost:8000</code>
                </p>
                <p className="text-xs text-outline mb-6">{error}</p>
                <button
                  onClick={() => setSelectedField(f => f)}
                  className="btn-primary text-sm py-2.5"
                >
                  Retry Connection
                </button>
              </div>
            </div>
          )}

          {/* Dashboard */}
          {!loading && !error && cropData && (
            <div className="space-y-5 max-w-6xl mx-auto">

              {/* Page header */}
              <div className="flex items-start justify-between flex-wrap gap-3">
                <div>
                  <div className="label-caps mb-1">Diagnostic Report</div>
                  <h1 className="font-display font-black text-3xl text-on-surface">
                    {fieldMeta?.emoji} {fieldMeta?.label}
                    <span className="ml-3 text-lg font-normal text-on-surface-v font-sans">
                      {cropData.crop_type}
                    </span>
                  </h1>
                </div>
                <span className={`chip ${statusChip} text-sm py-2 px-4`}>{status}</span>
              </div>

              <MetricCards cropData={cropData}/>

              <div className="grid lg:grid-cols-5 gap-5">
                <div className="lg:col-span-3">
                  <NdviChart historicalData={cropData.historical_ndvi} status={cropData.ai_insights.status}/>
                </div>
                <div className="lg:col-span-2">
                  <AiInsightsPanel insights={cropData.ai_insights}/>
                </div>
              </div>

              <FieldMap fieldId={selectedField} status={cropData.ai_insights.status}/>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
