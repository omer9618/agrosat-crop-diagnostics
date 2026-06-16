import { useState, useEffect } from 'react'

const STATUS_CONFIG = {
  Healthy: {
    icon: '✅',
    accent: 'bg-emerald-50 border-emerald-200',
    titleColor: 'text-emerald-700',
    badge: 'chip-healthy',
    label: 'No intervention required',
    barColor: 'from-emerald-400 to-lime-400',
  },
  Warning: {
    icon: '⚠️',
    accent: 'bg-amber-50 border-amber-200',
    titleColor: 'text-amber-700',
    badge: 'chip-warning',
    label: 'Intervention recommended',
    barColor: 'from-amber-400 to-yellow-300',
  },
  Critical: {
    icon: '🚨',
    accent: 'bg-red-50 border-red-100',
    titleColor: 'text-red-700',
    badge: 'chip-critical',
    label: 'Immediate action required',
    barColor: 'from-red-500 to-orange-400',
  },
}

function StreamText({ text }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    setDisplayed('')
    setDone(false)
    let i = 0
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
      } else {
        setDone(true)
        clearInterval(interval)
      }
    }, 10)
    return () => clearInterval(interval)
  }, [text])

  return (
    <p className="text-sm text-on-surface-v leading-relaxed">
      {displayed}
      {!done && <span className="animate-pulse text-emerald-500 font-bold">|</span>}
    </p>
  )
}

export default function AiInsightsPanel({ insights }) {
  const cfg = STATUS_CONFIG[insights.status] || STATUS_CONFIG.Healthy

  return (
    <div className={`glass-card h-full flex flex-col border ${cfg.accent} overflow-hidden`}>
      {/* Accent bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${cfg.barColor}`}/>

      <div className="p-5 flex flex-col flex-1 gap-4">

        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="label-caps mb-1">AI Agronomist</div>
            <h2 className="font-display font-bold text-lg text-on-surface">Diagnostic Report</h2>
          </div>
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${cfg.accent}`}>
            {cfg.icon}
          </div>
        </div>

        {/* Status badge */}
        <div className="flex items-center gap-2">
          <span className={`chip ${cfg.badge} text-sm`}>{insights.status}</span>
          <span className="text-xs text-on-surface-v">{cfg.label}</span>
        </div>

        {/* Recommendation */}
        <div className="flex-1 bg-surface-low rounded-xl p-4 overflow-y-auto" style={{ minHeight: 120 }}>
          <div className={`label-caps mb-2 ${cfg.titleColor}`}>Recommendation</div>
          <StreamText text={insights.recommendation} />
        </div>

        {/* Meta */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          {[
            ['Engine', 'AgroSat AI v2.1'],
            ['Confidence', '94.2%'],
            ['Bands', 'NIR+RED+SWIR'],
            ['Generated', new Date().toLocaleDateString()],
          ].map(([k, v]) => (
            <div key={k} className="bg-surface-low rounded-xl p-2.5">
              <div className="label-caps mb-0.5">{k}</div>
              <div className={`font-display font-bold text-sm ${cfg.titleColor}`}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
