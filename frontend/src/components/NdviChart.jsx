import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine,
} from 'recharts'

const STATUS_PALETTE = {
  Healthy:  { stroke: '#059669', fill: '#059669', stop1: 'rgba(5,150,105,0.2)', stop2: 'rgba(5,150,105,0.02)' },
  Warning:  { stroke: '#d97706', fill: '#d97706', stop1: 'rgba(217,119,6,0.2)',  stop2: 'rgba(217,119,6,0.02)' },
  Critical: { stroke: '#dc2626', fill: '#dc2626', stop1: 'rgba(220,38,38,0.2)',  stop2: 'rgba(220,38,38,0.02)' },
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  const v = payload[0]?.value
  const color = v >= 0.7 ? '#059669' : v >= 0.4 ? '#d97706' : '#dc2626'
  const txt   = v >= 0.7 ? 'Dense canopy — Healthy' : v >= 0.4 ? 'Moderate — Warning zone' : 'Sparse — Critical stress'
  return (
    <div className="glass-card-sm px-4 py-3 shadow-glass-lg">
      <div className="label-caps mb-1">{label}</div>
      <div className="metric-value text-3xl" style={{ color }}>{v?.toFixed(3)}</div>
      <div className="text-xs text-on-surface-v mt-1">{txt}</div>
    </div>
  )
}

export default function NdviChart({ historicalData, status }) {
  const p   = STATUS_PALETTE[status] || STATUS_PALETTE.Healthy
  const avg = historicalData
    ? (historicalData.reduce((s, d) => s + d.ndvi_score, 0) / historicalData.length).toFixed(3)
    : 0

  return (
    <div className="glass-card p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="label-caps mb-1">Historical NDVI Trend</div>
          <h2 className="font-display font-bold text-lg text-on-surface">6-Month Vegetation Index</h2>
        </div>
        <div className="glass-card-sm px-3 py-2 text-center">
          <div className="label-caps mb-0.5">Average</div>
          <div className="font-display font-bold text-primary">{avg}</div>
        </div>
      </div>

      <div className="flex-1" style={{ minHeight: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={historicalData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="ndviGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={p.fill} stopOpacity={0.25}/>
                <stop offset="95%" stopColor={p.fill} stopOpacity={0.02}/>
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 8" stroke="rgba(23,29,25,0.06)" vertical={false}/>

            <XAxis
              dataKey="month"
              tick={{ fill: '#6d7a72', fontSize: 11, fontFamily: "'Be Vietnam Pro', sans-serif" }}
              tickLine={false}
              axisLine={{ stroke: '#bccac0' }}
            />
            <YAxis
              domain={[0, 1]}
              tick={{ fill: '#6d7a72', fontSize: 11, fontFamily: "'Be Vietnam Pro', sans-serif" }}
              tickLine={false}
              axisLine={false}
              tickCount={5}
            />
            <Tooltip content={<CustomTooltip />} />

            <ReferenceLine
              y={parseFloat(avg)}
              stroke="rgba(23,29,25,0.15)"
              strokeDasharray="4 4"
              label={{ value: `avg ${avg}`, fill: '#6d7a72', fontSize: 9, position: 'insideTopRight' }}
            />
            <ReferenceLine
              y={0.3}
              stroke="rgba(220,38,38,0.2)"
              strokeDasharray="2 6"
              label={{ value: 'Critical', fill: 'rgba(220,38,38,0.5)', fontSize: 9, position: 'insideBottomRight' }}
            />

            <Area
              type="monotone"
              dataKey="ndvi_score"
              stroke={p.stroke}
              strokeWidth={2.5}
              fill="url(#ndviGrad)"
              dot={{ fill: '#ffffff', stroke: p.stroke, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: p.fill, stroke: '#ffffff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-surface-high flex gap-6 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"/>
          <span className="text-on-surface-v">0.7+ Healthy</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500"/>
          <span className="text-on-surface-v">0.3–0.7 Warning</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500"/>
          <span className="text-on-surface-v">&lt;0.3 Critical</span>
        </div>
      </div>
    </div>
  )
}
