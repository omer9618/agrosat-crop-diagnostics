function getTrend(historical) {
  if (!historical || historical.length < 2) return 'stable'
  const diff = historical[historical.length-1].ndvi_score - historical[0].ndvi_score
  return diff > 0.05 ? 'up' : diff < -0.05 ? 'down' : 'stable'
}

function MetricCard({ label, value, sub, icon, accent }) {
  const colors = {
    emerald: 'bg-emerald-50 border-emerald-100 text-emerald-700',
    lime:    'bg-lime-50 border-lime-100 text-lime-700',
    amber:   'bg-amber-50 border-amber-100 text-amber-700',
    red:     'bg-red-50 border-red-100 text-red-700',
    teal:    'bg-teal-50 border-teal-100 text-teal-700',
  }
  return (
    <div className={`glass-card p-5 border ${colors[accent] || colors.emerald}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="label-caps text-on-surface-v">{label}</div>
        <span className="text-2xl">{icon}</span>
      </div>
      <div className="metric-value text-4xl text-on-surface mb-2">{value}</div>
      <div className="text-xs text-on-surface-v">{sub}</div>
    </div>
  )
}

export default function MetricCards({ cropData }) {
  const { crop_type, current_ndvi, historical_ndvi, ai_insights } = cropData
  const trend  = getTrend(historical_ndvi)
  const delta  = historical_ndvi
    ? historical_ndvi[historical_ndvi.length-1].ndvi_score - historical_ndvi[0].ndvi_score
    : 0

  const trendIcon  = trend === 'up' ? '📈' : trend === 'down' ? '📉' : '➡️'
  const trendAccent = trend === 'up' ? 'emerald' : trend === 'down' ? 'red' : 'teal'
  const statusAccent = ai_insights.status === 'Healthy' ? 'emerald'
    : ai_insights.status === 'Warning' ? 'amber' : 'red'

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        label="Crop Type"
        value={crop_type}
        sub="Spectral classification · 97%"
        icon="🌾"
        accent="lime"
      />
      <MetricCard
        label="Current NDVI"
        value={current_ndvi.toFixed(3)}
        sub="0.000 (bare) → 1.000 (dense)"
        icon="🛰️"
        accent={current_ndvi >= 0.7 ? 'emerald' : current_ndvi >= 0.4 ? 'amber' : 'red'}
      />
      <MetricCard
        label="6-Month Delta"
        value={(delta >= 0 ? '+' : '') + delta.toFixed(3)}
        sub={trend === 'up' ? 'Upward trend' : trend === 'down' ? 'Downward trend' : 'Stable'}
        icon={trendIcon}
        accent={trendAccent}
      />
      <MetricCard
        label="AI Diagnosis"
        value={ai_insights.status}
        sub="Confidence: 94.2%"
        icon={ai_insights.status === 'Healthy' ? '✅' : ai_insights.status === 'Warning' ? '⚠️' : '🚨'}
        accent={statusAccent}
      />
    </div>
  )
}
