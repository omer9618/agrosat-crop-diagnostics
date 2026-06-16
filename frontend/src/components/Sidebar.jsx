export default function Sidebar({ fields, selectedField, onSelectField, cropData, loading }) {
  const getStatus = (id) => id === selectedField && cropData ? cropData.ai_insights.status : null

  const statusDot = { Healthy: 'bg-emerald-500', Warning: 'bg-amber-400', Critical: 'bg-red-500' }
  const statusText = { Healthy: 'text-emerald-700', Warning: 'text-amber-700', Critical: 'text-red-700' }

  return (
    <aside className="w-14 lg:w-60 flex-shrink-0 bg-surface border-r border-outline-v/40 flex flex-col py-4 gap-1">

      <div className="hidden lg:block px-4 pb-3 mb-1">
        <div className="label-caps">Monitored Fields</div>
      </div>

      {fields.map(field => {
        const isActive = field.id === selectedField
        const status   = getStatus(field.id)

        return (
          <button
            key={field.id}
            onClick={() => onSelectField(field.id)}
            className={`
              relative flex items-center gap-3 mx-2 px-3 py-3 rounded-xl text-left transition-all duration-200
              ${isActive
                ? 'bg-emerald-50 border border-emerald-200 shadow-card'
                : 'hover:bg-surface-mid border border-transparent text-on-surface-v hover:text-on-surface'
              }
            `}
          >
            {/* Active bar */}
            {isActive && (
              <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-emerald-500 rounded-r-full"/>
            )}

            {/* Icon */}
            <div className={`
              w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0 transition-colors
              ${isActive ? 'bg-emerald-100' : 'bg-surface-mid'}
            `}>
              {field.emoji}
            </div>

            {/* Labels */}
            <div className="hidden lg:flex flex-col flex-1 min-w-0">
              <span className={`text-sm font-semibold truncate ${isActive ? 'text-primary' : ''}`}>
                {field.label}
              </span>
              <span className="text-xs text-on-surface-v">{field.crop}</span>
            </div>

            {/* Status */}
            {isActive && !loading && status && (
              <div className="hidden lg:flex items-center gap-1.5 flex-shrink-0">
                <span className={`w-2 h-2 rounded-full ${statusDot[status] || 'bg-outline'}`}/>
                <span className={`text-xs font-bold ${statusText[status] || 'text-outline'}`}>{status}</span>
              </div>
            )}
            {isActive && loading && (
              <div className="hidden lg:block w-3.5 h-3.5 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin flex-shrink-0"/>
            )}
          </button>
        )
      })}

      {/* Bottom card */}
      <div className="hidden lg:block mt-auto mx-2 glass-card-sm p-4">
        <div className="label-caps mb-3">Satellite</div>
        <div className="space-y-2">
          {[['SAT', 'SAT-7'],['ALT', '523 km'],['PASS', '14 min']].map(([k, v]) => (
            <div key={k} className="flex justify-between items-center text-xs">
              <span className="text-outline">{k}</span>
              <span className="font-bold font-display text-primary">{v}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 progress-track">
          <div className="progress-fill" style={{ width: '72%' }}/>
        </div>
        <div className="text-xs text-outline mt-1">Orbit 72%</div>
      </div>
    </aside>
  )
}
