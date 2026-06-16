const FIELD_CONFIGS = {
  'field-alpha': {
    name: 'Field Alpha', lat: '34.052°N', lon: '118.243°W',
    area: '280 ha', crop: 'Winter Wheat', soil: 'Clay Loam pH 6.8',
    // Green field colors
    palette: ['#065f46','#047857','#059669','#10b981','#34d399','#6ee7b7'],
  },
  'field-beta': {
    name: 'Field Beta', lat: '33.448°N', lon: '112.073°W',
    area: '195 ha', crop: 'Upland Cotton', soil: 'Sandy Loam pH 6.2',
    // Amber/orange — warning
    palette: ['#78350f','#92400e','#b45309','#d97706','#fbbf24','#fde68a'],
  },
  'field-gamma': {
    name: 'Field Gamma', lat: '31.768°N', lon: '106.442°W',
    area: '340 ha', crop: 'Maize (Corn)', soil: 'Silty Clay pH 7.1',
    // Red — critical
    palette: ['#7f1d1d','#991b1b','#b91c1c','#dc2626','#ef4444','#fca5a5'],
  },
}

const STATUS_COLORS = {
  Healthy:  { badge: 'bg-emerald-100 text-emerald-700', dot: '#059669' },
  Warning:  { badge: 'bg-amber-100 text-amber-700',   dot: '#d97706' },
  Critical: { badge: 'bg-red-100 text-red-700',       dot: '#dc2626' },
}

export default function FieldMap({ fieldId, status }) {
  const cfg    = FIELD_CONFIGS[fieldId] || FIELD_CONFIGS['field-alpha']
  const sc     = STATUS_COLORS[status]  || STATUS_COLORS.Healthy

  // Build cell grid
  const COLS = 12, ROWS = 5
  const cells = []
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const idx     = (r * 3 + c * 2) % cfg.palette.length
      const opacity = 0.5 + ((r + c) % 4) * 0.12
      cells.push({ r, c, fill: cfg.palette[idx], opacity })
    }
  }

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between flex-wrap gap-3 pb-4 mb-4 border-b border-surface-high">
        <div>
          <div className="label-caps mb-1">Satellite Field View</div>
          <h2 className="font-display font-bold text-lg text-on-surface">False-Color NDVI Composite</h2>
        </div>
        <div className="flex items-center gap-4 text-sm text-on-surface-v">
          <span>📍 {cfg.lat}</span>
          <span>📐 {cfg.area}</span>
          <span className={`chip text-xs ${sc.badge}`}>{status}</span>
        </div>
      </div>

      {/* SVG Map */}
      <div className="rounded-2xl overflow-hidden border border-outline-v/30">
        <svg viewBox="0 0 720 160" className="w-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="720" height="160" fill="#e9efe9"/>

          {/* Field cells */}
          {cells.map(({ r, c, fill, opacity }) => (
            <rect key={`${r}-${c}`} x={c*58+20} y={r*26+16} width={52} height={20} rx={4}
              fill={fill} opacity={opacity}/>
          ))}

          {/* Irrigation channels */}
          {[42, 68, 94, 120].map(y => (
            <line key={y} x1={20} y1={y} x2={716} y2={y}
              stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeDasharray="4 8"/>
          ))}

          {/* Scan beam */}
          <rect x={0} y={0} width={6} height={160} rx={3} fill="rgba(52,211,153,0.5)">
            <animateTransform attributeName="transform" type="translate"
              values="-10,0;730,0;-10,0" dur="3.5s" repeatCount="indefinite"/>
          </rect>

          {/* Crosshair */}
          <g stroke="rgba(255,255,255,0.7)" strokeWidth="1">
            <line x1="354" y1="88" x2="344" y2="88"/>
            <line x1="366" y1="88" x2="376" y2="88"/>
            <line x1="360" y1="82" x2="360" y2="72"/>
            <line x1="360" y1="94" x2="360" y2="104"/>
          </g>
          <circle cx="360" cy="88" r="4" fill={sc.dot} opacity="0.9">
            <animate attributeName="r" values="3;8;3" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.9;0.2;0.9" dur="2s" repeatCount="indefinite"/>
          </circle>
          <circle cx="360" cy="88" r="3" fill="white"/>

          {/* Label */}
          <rect x={0} y={148} width={720} height={12} fill="rgba(23,29,25,0.15)"/>
          <text x={18} y={157} fill="rgba(255,255,255,0.7)" fontSize="7" fontFamily="'Be Vietnam Pro', sans-serif" fontWeight="600">
            {cfg.name} · {cfg.crop} · {cfg.soil} · {new Date().toISOString().split('T')[0]}
          </text>
        </svg>
      </div>

      {/* Meta row */}
      <div className="mt-4 grid grid-cols-3 gap-4">
        {[
          ['Coordinates', `${cfg.lat} / ${cfg.lon}`],
          ['Field Area',  cfg.area],
          ['Soil Class',  cfg.soil],
        ].map(([k, v]) => (
          <div key={k} className="bg-surface-low rounded-xl p-3">
            <div className="label-caps mb-1">{k}</div>
            <div className="text-sm font-medium text-on-surface">{v}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
